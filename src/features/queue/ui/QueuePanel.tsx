import type { Album } from '../../music/model/types'
import './QueuePanel.css'

type QueuePanelProps = {
  queue: Album[]
  currentAlbumId: number
  onSelectAlbum: (album: Album) => void
}

function QueuePanel({ queue, currentAlbumId, onSelectAlbum }: QueuePanelProps) {
  return (
    <aside className="queue-panel">
      <h3 className="queue-title">Queue</h3>

      <div className="queue-list">
        {queue.map((album, index) => (
          <button
            key={`${album.id}-${index}`}
            className={`queue-item ${album.id === currentAlbumId ? 'active' : ''}`}
            onClick={() => onSelectAlbum(album)}
          >
            <span className="queue-item-title">{album.title}</span>
            <span className="queue-item-artist">{album.artist}</span>
          </button>
        ))}
      </div>
    </aside>
  )
}

export default QueuePanel
