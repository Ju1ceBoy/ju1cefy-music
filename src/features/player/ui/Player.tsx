import type { Album } from '../../music/model/types'
import './Player.css'

type PlayerProps = {
  currentAlbum: Album
  isPlaying: boolean
  currentTime: number
  duration: number
  volume: number
  isMuted: boolean
  onTogglePlay: () => void
  onPrev: () => void
  onNext: () => void
  onSeek: (value: string) => void
  onVolumeChange: (value: string) => void
  onToggleMute: () => void
  onToggleShuffle: () => void
  isShuffle: boolean
  repeatMode: 'off' | 'all' | 'one'
  onToggleRepeat: () => void
  isCurrentLiked: boolean
  onToggleLikeCurrent: () => void
  onToggleQueue: () => void
}

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00'
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${String(secs).padStart(2, '0')}`
}

const IconShuffle = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 3 21 3 21 8" />
    <line x1="4" y1="20" x2="21" y2="3" />
    <polyline points="21 16 21 21 16 21" />
    <line x1="15" y1="15" x2="21" y2="21" />
    <line x1="4" y1="4" x2="9" y2="9" />
  </svg>
)

const IconPrev = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <rect x="3" y="5" width="3" height="14" rx="1" />
    <path d="M21 5.5a1 1 0 0 0-1.5-.86l-10 6a1 1 0 0 0 0 1.72l10 6A1 1 0 0 0 21 17.5V5.5Z" />
  </svg>
)

const IconNext = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <rect x="18" y="5" width="3" height="14" rx="1" />
    <path d="M3 5.5a1 1 0 0 1 1.5-.86l10 6a1 1 0 0 1 0 1.72l-10 6A1 1 0 0 1 3 17.5V5.5Z" />
  </svg>
)

const IconPlay = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6 4a1 1 0 0 1 1.5-.86l12 8a1 1 0 0 1 0 1.72l-12 8A1 1 0 0 1 6 20V4Z" />
  </svg>
)

const IconPause = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <rect x="5" y="3" width="5" height="18" rx="1" />
    <rect x="14" y="3" width="5" height="18" rx="1" />
  </svg>
)

const IconRepeat = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="17 1 21 5 17 9" />
    <path d="M3 11V9a4 4 0 0 1 4-4h14" />
    <polyline points="7 23 3 19 7 15" />
    <path d="M21 13v2a4 4 0 0 1-4 4H3" />
  </svg>
)

const IconVolume = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" stroke="none" />
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
  </svg>
)

const IconVolumeMute = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" stroke="none" />
    <line x1="23" y1="9" x2="17" y2="15" />
    <line x1="17" y1="9" x2="23" y2="15" />
  </svg>
)

const IconQueue = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="8" y1="6" x2="21" y2="6" />
    <line x1="8" y1="12" x2="21" y2="12" />
    <line x1="8" y1="18" x2="21" y2="18" />
    <line x1="3" y1="6" x2="3.01" y2="6" />
    <line x1="3" y1="12" x2="3.01" y2="12" />
    <line x1="3" y1="18" x2="3.01" y2="18" />
  </svg>
)

function Player({
  currentAlbum,
  isPlaying,
  currentTime,
  duration,
  volume,
  isMuted,
  onTogglePlay,
  onPrev,
  onNext,
  onSeek,
  onVolumeChange,
  onToggleMute,
  onToggleShuffle,
  isShuffle,
  repeatMode,
  onToggleRepeat,
  isCurrentLiked,
  onToggleLikeCurrent,
  onToggleQueue,
}: PlayerProps) {
  const repeatLabel = repeatMode === 'one' ? '1' : ''

  return (
    <footer className="player">
      <div className="player-track-info">
        <img
          className="player-cover"
          src={currentAlbum.coverUrl}
          alt={currentAlbum.title}
          style={{ backgroundColor: currentAlbum.color }}
        />
        <div>
          <p className="player-title">{currentAlbum.title}</p>
          <p className="player-artist">{currentAlbum.artist}</p>
        </div>
      </div>

      <div className="player-center">
        <div className="player-controls">
          <button
            className={`control-btn ${isShuffle ? 'active-control' : ''}`}
            onClick={onToggleShuffle}
            title="Shuffle"
          >
            <IconShuffle />
          </button>
          <button className="control-btn" onClick={onPrev} title="Previous">
            <IconPrev />
          </button>
          <button className="play-btn" onClick={onTogglePlay} title={isPlaying ? 'Pause' : 'Play'}>
            {isPlaying ? <IconPause /> : <IconPlay />}
          </button>
          <button className="control-btn" onClick={onNext} title="Next">
            <IconNext />
          </button>
          <button
            className={`control-btn ${repeatMode !== 'off' ? 'active-control' : ''}`}
            onClick={onToggleRepeat}
            title={`Repeat: ${repeatMode}`}
          >
            <IconRepeat />
            {repeatLabel && <span className="repeat-badge">{repeatLabel}</span>}
          </button>
        </div>

        <div className="progress-row">
          <span className="time-label">{formatTime(currentTime)}</span>
          <input
            className="progress-input"
            type="range"
            min={0}
            max={duration || 0}
            step={0.1}
            value={Math.min(currentTime, duration || 0)}
            onChange={(event) => onSeek(event.target.value)}
          />
          <span className="time-label">{formatTime(duration)}</span>
        </div>
      </div>

      <div className="player-right">
        <button
          className={`icon-btn ${isCurrentLiked ? 'liked-btn' : ''}`}
          onClick={onToggleLikeCurrent}
          title={isCurrentLiked ? 'Unlike' : 'Like'}
        >
          {isCurrentLiked ? '♥' : '♡'}
        </button>
        <button className="icon-btn desktop-only" onClick={onToggleMute} title={isMuted ? 'Unmute' : 'Mute'}>
          {isMuted ? <IconVolumeMute /> : <IconVolume />}
        </button>
        <input
          className="volume-input desktop-only"
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={(event) => onVolumeChange(event.target.value)}
        />
        <button className="icon-btn queue-toggle-btn" onClick={onToggleQueue} title="Queue">
          <IconQueue />
        </button>
      </div>
    </footer>
  )
}

export default Player
