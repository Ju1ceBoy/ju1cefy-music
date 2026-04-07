import { useEffect, useState } from 'react'
import AlbumGrid from '../features/browse/ui/AlbumGrid'
import Header from '../features/navigation/ui/Header'
import Player from '../features/player/ui/Player'
import Sidebar from '../features/navigation/ui/Sidebar'
import QueuePanel from '../features/queue/ui/QueuePanel'
import NowPlaying from '../features/player/ui/NowPlaying'
import { albums, menuItems, playlists as defaultPlaylists } from '../features/music/model/catalog'
import { useAudioPlayer } from '../features/player/hooks/useAudioPlayer'
import type { Album, Playlist } from '../features/music/model/types'
import './App.css'

type SidebarView = 'Home' | 'Search' | 'Your Library'
type Theme = 'dark' | 'light'
type SortMode = 'default' | 'title' | 'artist'

function App() {
  type RepeatMode = 'off' | 'all' | 'one'

  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem('theme') as Theme) || 'dark'
  })
  const [repeatMode, setRepeatMode] = useState<RepeatMode>('off')
  const [replayTick, setReplayTick] = useState(0)
  const [currentAlbum, setCurrentAlbum] = useState<Album>(albums[0])
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.7)
  const [isMuted, setIsMuted] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchFocusSignal, setSearchFocusSignal] = useState(0)
  const [isShuffle, setIsShuffle] = useState(false)
  const [sortMode, setSortMode] = useState<SortMode>('default')
  const [activeView, setActiveView] = useState<SidebarView>('Home')
  const [activePlaylistId, setActivePlaylistId] = useState<number | null>(null)
  const [userPlaylists, setUserPlaylists] = useState<Playlist[]>(() => {
    try {
      const raw = localStorage.getItem('playlists')
      return raw ? (JSON.parse(raw) as Playlist[]) : defaultPlaylists
    } catch {
      return defaultPlaylists
    }
  })
  const [isQueueOpen, setIsQueueOpen] = useState(false)
  const [isNowPlayingOpen, setIsNowPlayingOpen] = useState(false)
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
    document.documentElement.dataset.theme = theme
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    localStorage.setItem('likedAlbumIds', JSON.stringify(likedAlbumIds))
  }, [likedAlbumIds])

  useEffect(() => {
    localStorage.setItem('playlists', JSON.stringify(userPlaylists))
  }, [userPlaylists])

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

  const activePlaylist = userPlaylists.find((p) => p.id === activePlaylistId) ?? null

  const baseAlbums = (() => {
    if (activePlaylistId !== null && activePlaylist) {
      return albums.filter((a) => activePlaylist.albumIds.includes(a.id))
    }
    if (activeView === 'Your Library') {
      return albums.filter((a) => likedAlbumIds.includes(a.id))
    }
    return albums
  })()

  const displayedAlbums = (() => {
    const filtered = baseAlbums.filter((album) => {
      const q = searchQuery.trim().toLowerCase()
      if (!q) return true
      return album.title.toLowerCase().includes(q) || album.artist.toLowerCase().includes(q)
    })
    if (sortMode === 'title') return [...filtered].sort((a, b) => a.title.localeCompare(b.title))
    if (sortMode === 'artist') return [...filtered].sort((a, b) => a.artist.localeCompare(b.artist))
    return filtered
  })()

  const handleAddToPlaylist = (albumId: number, playlistId: number) => {
    setUserPlaylists((prev) =>
      prev.map((pl) => {
        if (pl.id !== playlistId) return pl
        const has = pl.albumIds.includes(albumId)
        return {
          ...pl,
          albumIds: has
            ? pl.albumIds.filter((id) => id !== albumId)
            : [...pl.albumIds, albumId],
        }
      })
    )
    const pl = userPlaylists.find((p) => p.id === playlistId)
    const has = pl?.albumIds.includes(albumId)
    setToastMessage(has ? `Removed from ${pl?.name}` : `Added to ${pl?.name}`)
    setToastKey((prev) => prev + 1)
  }

  const toggleLikeAlbum = (albumId: number) => {
    const isLiked = likedAlbumIds.includes(albumId)

    setLikedAlbumIds((prev) => (isLiked ? prev.filter((id) => id !== albumId) : [...prev, albumId]))
    setToastMessage(isLiked ? 'Removed from Your Library' : 'Added to Your Library')
    setToastKey((prev) => prev + 1)
  }

  const [queue, setQueue] = useState<Album[]>(() => {
    return [...albums.slice(1)]
  })

  useEffect(() => {
    const idx = getAlbumIndex(currentAlbum.id)
    setQueue([
      ...albums.slice(idx + 1),
      ...albums.slice(0, idx),
    ])
  }, [currentAlbum.id])

  const sectionTitle = (() => {
    if (activePlaylist) return activePlaylist.name
    if (activeView === 'Your Library') return 'Your Library'
    if (activeView === 'Search') return 'Search Results'
    return 'Made for you'
  })()

  const emptyMessage = (() => {
    if (activePlaylist) {
      return searchQuery.trim()
        ? 'В плейлисте ничего не найдено по этому запросу.'
        : 'В этом плейлисте пока нет треков.'
    }
    if (activeView === 'Your Library') {
      return searchQuery.trim()
        ? 'В избранном ничего не найдено по этому запросу.'
        : 'В библиотеке пока нет избранных треков.'
    }
    return 'Ничего не найдено. Попробуй другой запрос.'
  })()

  const handleMenuItemClick = (item: string) => {
    const nextView = item as SidebarView
    setActiveView(nextView)
    setActivePlaylistId(null)

    if (nextView === 'Search') {
      setSearchFocusSignal((prev) => prev + 1)
    }
  }

  const handlePlaylistClick = (playlist: Playlist) => {
    setActivePlaylistId(playlist.id)
    setActiveView('Home')
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
        playlists={userPlaylists}
        activeMenuItem={activeView}
        activePlaylistId={activePlaylistId}
        onMenuItemClick={handleMenuItemClick}
        onPlaylistClick={handlePlaylistClick}
      />

      <main className="content">
        <Header
          username="Ju1ceBoy"
          searchQuery={searchQuery}
          searchFocusSignal={searchFocusSignal}
          theme={theme}
          onSearchChange={setSearchQuery}
          onToggleTheme={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}
        />

        <div className="content-body">
          <AlbumGrid
            albums={displayedAlbums}
            currentAlbumId={currentAlbum.id}
            likedAlbumIds={likedAlbumIds}
            playlists={userPlaylists}
            sortMode={sortMode}
            title={sectionTitle}
            emptyMessage={emptyMessage}
            onAlbumClick={handleAlbumClick}
            onToggleLike={toggleLikeAlbum}
            onAddToPlaylist={handleAddToPlaylist}
            onSortChange={setSortMode}
          />

          <QueuePanel
            queue={queue}
            currentAlbumId={currentAlbum.id}
            isOpen={isQueueOpen}
            onClose={() => setIsQueueOpen(false)}
            onSelectAlbum={handleAlbumClick}
            onReorder={setQueue}
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
        onToggleQueue={() => setIsQueueOpen((prev) => !prev)}
        onOpenNowPlaying={() => setIsNowPlayingOpen(true)}
      />

      {isNowPlayingOpen && (
        <NowPlaying
          currentAlbum={currentAlbum}
          isPlaying={isPlaying}
          currentTime={currentTime}
          duration={duration}
          isCurrentLiked={likedAlbumIds.includes(currentAlbum.id)}
          repeatMode={repeatMode}
          isShuffle={isShuffle}
          onTogglePlay={() => setIsPlaying((prev) => !prev)}
          onPrev={goToPrev}
          onNext={goToNext}
          onSeek={seekTo}
          onToggleShuffle={() => setIsShuffle((prev) => !prev)}
          onToggleRepeat={toggleRepeatMode}
          onToggleLikeCurrent={() => toggleLikeAlbum(currentAlbum.id)}
          onClose={() => setIsNowPlayingOpen(false)}
        />
      )}

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
