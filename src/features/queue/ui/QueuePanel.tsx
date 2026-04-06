import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import type { Album } from '../../music/model/types'
import './QueuePanel.css'

type QueuePanelProps = {
  queue: Album[]
  currentAlbumId: number
  isOpen: boolean
  onClose: () => void
  onSelectAlbum: (album: Album) => void
  onReorder: (queue: Album[]) => void
}

type SortableItemProps = {
  album: Album
  isActive: boolean
  onClick: () => void
}

function SortableItem({ album, isActive, onClick }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: album.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`queue-item ${isActive ? 'active' : ''}`}
    >
      <span className="drag-handle" {...attributes} {...listeners}>
        ⠿
      </span>
      <button className="queue-item-content" onClick={onClick}>
        <span className="queue-item-title">{album.title}</span>
        <span className="queue-item-artist">{album.artist}</span>
      </button>
    </div>
  )
}

function QueuePanel({ queue, currentAlbumId, isOpen, onClose, onSelectAlbum, onReorder }: QueuePanelProps) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return

    const oldIndex = queue.findIndex((a) => a.id === active.id)
    const newIndex = queue.findIndex((a) => a.id === over.id)
    onReorder(arrayMove(queue, oldIndex, newIndex))
  }

  const handleItemClick = (album: Album) => {
    onSelectAlbum(album)
    onClose()
  }

  const queueContent = (
    <>
      <div className="queue-header">
        <h3 className="queue-title">Queue</h3>
        <button className="queue-close-btn" onClick={onClose}>✕</button>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={queue.map((a) => a.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="queue-list">
            {queue.map((album) => (
              <SortableItem
                key={album.id}
                album={album}
                isActive={album.id === currentAlbumId}
                onClick={() => handleItemClick(album)}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </>
  )

  return (
    <>
      {/* Desktop: static sidebar */}
      <aside className="queue-panel queue-desktop">
        {queueContent}
      </aside>

      {/* Mobile: bottom drawer */}
      {isOpen && (
        <div className="queue-drawer-overlay" onClick={onClose}>
          <aside
            className="queue-panel queue-mobile"
            onClick={(e) => e.stopPropagation()}
          >
            {queueContent}
          </aside>
        </div>
      )}
    </>
  )
}

export default QueuePanel
