import { useEffect, useState } from 'react'
import AlbumGrid from '../features/browse/ui/AlbumGrid'
import Header from '../features/navigation/ui/Header'
import Player from '../features/player/ui/Player'
import Sidebar from '../features/navigation/ui/Sidebar'
import QueuePanel from '../features/queue/ui/QueuePanel'
import { albums, menuItems, playlists } from '../features/music/model/catalog'
import { useAudioPlayer } from '../features/player/hooks/useAudioPlayer'
import type { Album } from '../features/music/model/types'
import './App.css'

type SidebarView = 'Home' | 'Search' | 'Your Library'

function App() {
  type RepeatMode = 'off' | 'all' | 'one'

  const [repeatMode, setRepeatMode] = useState<RepeatMode>('off')
  const [replayTick, setReplayTick] = useState(0)
  const [currentAlbum, setCurrentAlbum] = useState<Album>(albums[0])
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.7)
  const [isMuted, setIsMuted] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchFocusSignal, setSearchFocusSignal] = useState(0)
  const [isShuffle, setIsShuffle] = useState(false)
  const [activeView, setActiveView] = useState<SidebarView>('Home')
  const [toastMessage, setToastMessage] = useState('')
  const [toastKey, setToastKey] = useState(0)
  const [likedAlbumIds, setLikedAlbumIds] = useState<number[]>(() => {
    try {
      const raw = localStorage.getItem('likedAlbumIds')
      return raw ? (JSON.parse(raw) as number[]) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('likedAlbumIds', JSON.stringify(likedAlbumIds))
  }, [likedAlbumIds])

  const getAlbumIndex = (albumId: number) => albums.findIndex((album) => album.id === albumId)

  const goToNext = (wrap = true) => {
    setCurrentAlbum((prev) => {
      const currentIndex = getAlbumIndex(prev.id)

      if (isShuffle) {
        if (albums.length <= 1) return prev
        let randomIndex = currentIndex
        while (randomIndex === currentIndex) {
          randomIndex = Math.floor(Math.random() * albums.length)
        }
        return albums[randomIndex]
      }

      if (currentIndex === albums.length - 1) {
        return wrap ? albums[0] : prev
      }

      return albums[currentIndex + 1]
    })

    setIsPlaying(true)
  }

  const goToPrev = () => {
    setCurrentAlbum((prev) => {
      const index = getAlbumIndex(prev.id)
      const prevIndex = (index - 1 + albums.length) % albums.length
      return albums[prevIndex]
    })
    setIsPlaying(true)
  }

  const handleAlbumClick = (album: Album) => {
    setCurrentAlbum(album)
    setIsPlaying(true)
  }

  const handleVolumeChange = (value: string) => {
    const nextVolume = Number(value)
    setVolume(nextVolume)

    if (nextVolume > 0 && isMuted) {
      setIsMuted(false)
    }
  }

  const handleTrackEnded = () => {
    const currentIndex = getAlbumIndex(currentAlbum.id)
    const isLastTrack = currentIndex === albums.length - 1

    if (repeatMode === 'one') {
      setReplayTick((prev) => prev + 1)
      setIsPlaying(true)
      return
    }

    if (repeatMode === 'all') {
      goToNext(true)
      return
    }

    if (isLastTrack) {
      setIsPlaying(false)
      return
    }

    goToNext(false)
  }

  const { audioRef, currentTime, duration, seekTo } = useAudioPlayer({
    trackUrl: currentAlbum.trackUrl,
    isPlaying,
    volume,
    isMuted,
    onEnded: handleTrackEnded,
    replaySignal: replayTick,
  })

  const toggleRepeatMode = () => {
    setRepeatMode((prev) => {
      if (prev === 'off') return 'all'
      if (prev === 'all') return 'one'
      return 'off'
    })
  }

  const libraryAlbums = albums.filter((album) => likedAlbumIds.includes(album.id))
  const searchableAlbums = activeView === 'Your Library' ? libraryAlbums : albums
  const displayedAlbums = searchableAlbums.filter((album) => {
    const q = searchQuery.trim().toLowerCase()
    if (!q) return true
    return album.title.toLowerCase().includes(q) || album.artist.toLowerCase().includes(q)
  })

  const toggleLikeAlbum = (albumId: number) => {
    const isLiked = likedAlbumIds.includes(albumId)

    setLikedAlbumIds((prev) => (isLiked ? prev.filter((id) => id !== albumId) : [...prev, albumId]))
    setToastMessage(isLiked ? 'Removed from Your Library' : 'Added to Your Library')
    setToastKey((prev) => prev + 1)
  }

  const currentIndex = getAlbumIndex(currentAlbum.id)

  const queue = [
    ...albums.slice(currentIndex + 1),
    ...albums.slice(0, currentIndex),
  ]

  const sectionTitle =
    activeView === 'Your Library'
      ? 'Your Library'
      : activeView === 'Search'
        ? 'Search Results'
        : 'Made for you'

  const emptyMessage =
    activeView === 'Your Library'
      ? searchQuery.trim()
        ? 'В избранном ничего не найдено по этому запросу.'
        : 'В библиотеке пока нет избранных треков.'
      : 'Ничего не найдено. Попробуй другой запрос.'

  const handleMenuItemClick = (item: string) => {
    const nextView = item as SidebarView
    setActiveView(nextView)

    if (nextView === 'Search') {
      setSearchFocusSignal((prev) => prev + 1)
    }
  }

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      const isK = event.key.toLowerCase() === 'k'
      const isShortcut = (event.metaKey || event.ctrlKey) && isK
      if (isShortcut) {
        event.preventDefault()
        setActiveView('Search')
        setSearchFocusSignal((prev) => prev + 1)
        return
      }

      if (event.key === 'Escape') {
        const activeElement = document.activeElement
        const isSearchInput =
          activeElement instanceof HTMLInputElement &&
          activeElement.classList.contains('search-input')

        if (!isSearchInput) return

        setSearchQuery('')
        activeElement.blur()
      }
    }

    window.addEventListener('keydown', handleKeydown)

    return () => {
      window.removeEventListener('keydown', handleKeydown)
    }
  }, [])

  useEffect(() => {
    if (!toastMessage) return

    const timeoutId = window.setTimeout(() => {
      setToastMessage('')
    }, 1500)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [toastMessage])

  return (
    <div className="app">
      <Sidebar
        menuItems={menuItems}
        playlists={playlists}
        activeMenuItem={activeView}
        onMenuItemClick={handleMenuItemClick}
      />

      <main className="content">
        <Header
          username="Ju1ceBoy"
          searchQuery={searchQuery}
          searchFocusSignal={searchFocusSignal}
          onSearchChange={setSearchQuery}
        />

        <div className="content-body">
          <AlbumGrid
            albums={displayedAlbums}
            currentAlbumId={currentAlbum.id}
            likedAlbumIds={likedAlbumIds}
            title={sectionTitle}
            emptyMessage={emptyMessage}
            onAlbumClick={handleAlbumClick}
            onToggleLike={toggleLikeAlbum}
          />

          <QueuePanel
            queue={queue}
            currentAlbumId={currentAlbum.id}
            onSelectAlbum={handleAlbumClick}
          />
        </div>
      </main>

      <Player
        currentAlbum={currentAlbum}
        isPlaying={isPlaying}
        currentTime={currentTime}
        duration={duration}
        volume={volume}
        isMuted={isMuted}
        isShuffle={isShuffle}
        repeatMode={repeatMode}
        isCurrentLiked={likedAlbumIds.includes(currentAlbum.id)}
        onTogglePlay={() => setIsPlaying((prev) => !prev)}
        onPrev={goToPrev}
        onNext={goToNext}
        onSeek={seekTo}
        onVolumeChange={handleVolumeChange}
        onToggleMute={() => setIsMuted((prev) => !prev)}
        onToggleShuffle={() => setIsShuffle((prev) => !prev)}
        onToggleRepeat={toggleRepeatMode}
        onToggleLikeCurrent={() => toggleLikeAlbum(currentAlbum.id)}
      />

      <audio ref={audioRef} preload="metadata" />

      {toastMessage && (
        <div key={toastKey} className="toast">
          {toastMessage}
        </div>
      )}
    </div>
  )
}

export default App
