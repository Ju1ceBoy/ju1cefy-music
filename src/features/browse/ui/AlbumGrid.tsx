import type { Album } from '../../music/model/types'
import './AlbumGrid.css'

type AlbumGridProps = {
  albums: Album[]
  currentAlbumId: number
  likedAlbumIds: number[]
  title: string
  emptyMessage: string
  onAlbumClick: (album: Album) => void
  onToggleLike: (albumId: number) => void
}

function AlbumGrid({
  albums,
  currentAlbumId,
  likedAlbumIds,
  title,
  emptyMessage,
  onAlbumClick,
  onToggleLike,
}: AlbumGridProps) {
  return (
    <section className="main-view">
      <h2 className="section-title">{title}</h2>

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
    </section>
  )
}

export default AlbumGrid
