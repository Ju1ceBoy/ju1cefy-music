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
}

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00'
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${String(secs).padStart(2, '0')}`
}

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
}: PlayerProps) {
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
            className={`control-btn ${repeatMode !== 'off' ? 'active-control' : ''}`}
            onClick={onToggleRepeat}
          >
            Repeat: {repeatMode}
          </button>
          <button
            className={`control-btn ${isShuffle ? 'active-control' : ''}`}
            onClick={onToggleShuffle}
          >
            Shuffle
          </button>
          <button className="control-btn" onClick={onPrev}>
            Prev
          </button>
          <button className="play-btn" onClick={onTogglePlay}>
            {isPlaying ? 'Pause' : 'Play'}
          </button>
          <button className="control-btn" onClick={onNext}>
            Next
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
        <button className={`mute-btn ${isCurrentLiked ? 'liked-btn' : ''}`} onClick={onToggleLikeCurrent}>
          {isCurrentLiked ? '♥' : '♡'}
        </button>
        <button className="mute-btn" onClick={onToggleMute}>
          {isMuted ? 'Unmute' : 'Mute'}
        </button>
        <input
          className="volume-input"
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={(event) => onVolumeChange(event.target.value)}
        />
      </div>
    </footer>
  )
}

export default Player
