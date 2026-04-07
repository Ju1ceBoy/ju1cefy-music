import { useState, useEffect, useRef } from 'react'
import type { Album, Playlist } from '../../music/model/types'
import './AlbumGrid.css'

type SortMode = 'default' | 'title' | 'artist'

type AlbumGridProps = {
  albums: Album[]
  currentAlbumId: number
  likedAlbumIds: number[]
  playlists: Playlist[]
  sortMode: SortMode
  title: string
  emptyMessage: string
  onAlbumClick: (album: Album) => void
  onToggleLike: (albumId: number) => void
  onAddToPlaylist: (albumId: number, playlistId: number) => void
  onSortChange: (mode: SortMode) => void
}

type ContextMenuState = {
  albumId: number
  x: number
  y: number
} | null

function AlbumGrid({
  albums,
  currentAlbumId,
  likedAlbumIds,
  playlists,
  sortMode,
  title,
  emptyMessage,
  onAlbumClick,
  onToggleLike,
  onAddToPlaylist,
  onSortChange,
}: AlbumGridProps) {
  const [contextMenu, setContextMenu] = useState<ContextMenuState>(null)
  const [showPlaylistSub, setShowPlaylistSub] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const handleContextMenu = (e: React.MouseEvent, albumId: number) => {
    e.preventDefault()
    setShowPlaylistSub(false)
    setContextMenu({ albumId, x: e.clientX, y: e.clientY })
  }

  useEffect(() => {
    if (!contextMenu) return

    const close = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setContextMenu(null)
      }
    }
    window.addEventListener('mousedown', close)
    return () => window.removeEventListener('mousedown', close)
  }, [contextMenu])

  useEffect(() => {
    if (!contextMenu) return
    const close = () => setContextMenu(null)
    window.addEventListener('scroll', close, true)
    return () => window.removeEventListener('scroll', close, true)
  }, [contextMenu])

  const contextAlbum = contextMenu ? albums.find((a) => a.id === contextMenu.albumId) : null
  const isContextLiked = contextMenu ? likedAlbumIds.includes(contextMenu.albumId) : false

  return (
    <section className="main-view">
      <div className="section-header">
        <h2 className="section-title">{title}</h2>
        <select
          className="sort-select"
          value={sortMode}
          onChange={(e) => onSortChange(e.target.value as SortMode)}
        >
          <option value="default">Default</option>
          <option value="title">Title A-Z</option>
          <option value="artist">Artist A-Z</option>
        </select>
      </div>

      {albums.length === 0 ? (
        <p className="empty-state">{emptyMessage}</p>
      ) : (
        <div className="album-grid">
          {albums.map((album) => {
            const isLiked = likedAlbumIds.includes(album.id)

            return (
              <article
                key={album.id}
                className={`album-card ${currentAlbumId === album.id ? 'active' : ''}`}
                onClick={() => onAlbumClick(album)}
                onContextMenu={(e) => handleContextMenu(e, album.id)}
              >
                <button
                  className={`like-badge ${isLiked ? 'liked' : ''}`}
                  onClick={(event) => {
                    event.stopPropagation()
                    onToggleLike(album.id)
                  }}
                >
                  {isLiked ? '♥' : '♡'}
                </button>

                <img
                  className="album-cover"
                  src={album.coverUrl}
                  alt={album.title}
                  style={{ backgroundColor: album.color }}
                />
                <h3 className="album-title">{album.title}</h3>
                <p className="album-artist">{album.artist}</p>
              </article>
            )
          })}
        </div>
      )}

      {contextMenu && contextAlbum && (
        <div
          ref={menuRef}
          className="ctx-menu"
          style={{ top: contextMenu.y, left: contextMenu.x }}
        >
          <button
            className="ctx-item"
            onClick={() => { onAlbumClick(contextAlbum); setContextMenu(null) }}
          >
            ▶ Play
          </button>
          <button
            className="ctx-item"
            onClick={() => { onToggleLike(contextMenu.albumId); setContextMenu(null) }}
          >
            {isContextLiked ? '♥ Unlike' : '♡ Like'}
          </button>
          <div className="ctx-separator" />
          <button
            className="ctx-item ctx-sub-trigger"
            onMouseEnter={() => setShowPlaylistSub(true)}
            onClick={() => setShowPlaylistSub((p) => !p)}
          >
            + Add to playlist ›
          </button>
          {showPlaylistSub && (
            <div className="ctx-submenu">
              {playlists.map((pl) => (
                <button
                  key={pl.id}
                  className="ctx-item"
                  onClick={() => {
                    onAddToPlaylist(contextMenu.albumId, pl.id)
                    setContextMenu(null)
                  }}
                >
                  {pl.name}
                  {pl.albumIds.includes(contextMenu.albumId) && ' ✓'}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  )
}

export default AlbumGrid
