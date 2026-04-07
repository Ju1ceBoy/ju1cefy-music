import { useState } from 'react'
import type { Album } from '../../music/model/types'
import './NowPlaying.css'

type NowPlayingProps = {
  currentAlbum: Album
  isPlaying: boolean
  currentTime: number
  duration: number
  isCurrentLiked: boolean
  repeatMode: 'off' | 'all' | 'one'
  isShuffle: boolean
  onTogglePlay: () => void
  onPrev: () => void
  onNext: () => void
  onSeek: (value: string) => void
  onToggleShuffle: () => void
  onToggleRepeat: () => void
  onToggleLikeCurrent: () => void
  onClose: () => void
}

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00'
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${String(secs).padStart(2, '0')}`
}

function NowPlaying({
  currentAlbum,
  isPlaying,
  currentTime,
  duration,
  isCurrentLiked,
  repeatMode,
  isShuffle,
  onTogglePlay,
  onPrev,
  onNext,
  onSeek,
  onToggleShuffle,
  onToggleRepeat,
  onToggleLikeCurrent,
  onClose,
}: NowPlayingProps) {
  const [isClosing, setIsClosing] = useState(false)

  const handleClose = () => {
    setIsClosing(true)
  }

  const handleAnimationEnd = () => {
    if (isClosing) onClose()
  }

  return (
    <div
      className={`now-playing-overlay ${isClosing ? 'closing' : ''}`}
      onAnimationEnd={handleAnimationEnd}
    >
      <div className="now-playing">
        <button className="np-close" onClick={handleClose}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>

        <img
          className="np-cover"
          src={currentAlbum.coverUrl}
          alt={currentAlbum.title}
          style={{ backgroundColor: currentAlbum.color }}
        />

        <div className="np-info">
          <h2 className="np-title">{currentAlbum.title}</h2>
          <p className="np-artist">{currentAlbum.artist}</p>
        </div>

        <div className="np-progress">
          <input
            className="np-progress-input"
            type="range"
            min={0}
            max={duration || 0}
            step={0.1}
            value={Math.min(currentTime, duration || 0)}
            onChange={(e) => onSeek(e.target.value)}
          />
          <div className="np-times">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        <div className="np-controls">
          <button
            className={`np-btn ${isShuffle ? 'np-active' : ''}`}
            onClick={onToggleShuffle}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="16 3 21 3 21 8" />
              <line x1="4" y1="20" x2="21" y2="3" />
              <polyline points="21 16 21 21 16 21" />
              <line x1="15" y1="15" x2="21" y2="21" />
              <line x1="4" y1="4" x2="9" y2="9" />
            </svg>
          </button>

          <button className="np-btn" onClick={onPrev}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <rect x="3" y="5" width="3" height="14" rx="1" />
              <path d="M21 5.5a1 1 0 0 0-1.5-.86l-10 6a1 1 0 0 0 0 1.72l10 6A1 1 0 0 0 21 17.5V5.5Z" />
            </svg>
          </button>

          <button className="np-play-btn" onClick={onTogglePlay}>
            {isPlaying ? (
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                <rect x="5" y="3" width="5" height="18" rx="1" />
                <rect x="14" y="3" width="5" height="18" rx="1" />
              </svg>
            ) : (
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 4a1 1 0 0 1 1.5-.86l12 8a1 1 0 0 1 0 1.72l-12 8A1 1 0 0 1 6 20V4Z" />
              </svg>
            )}
          </button>

          <button className="np-btn" onClick={onNext}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <rect x="18" y="5" width="3" height="14" rx="1" />
              <path d="M3 5.5a1 1 0 0 1 1.5-.86l10 6a1 1 0 0 1 0 1.72l-10 6A1 1 0 0 1 3 17.5V5.5Z" />
            </svg>
          </button>

          <button
            className={`np-btn ${repeatMode !== 'off' ? 'np-active' : ''}`}
            onClick={onToggleRepeat}
            style={{ position: 'relative' }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="17 1 21 5 17 9" />
              <path d="M3 11V9a4 4 0 0 1 4-4h14" />
              <polyline points="7 23 3 19 7 15" />
              <path d="M21 13v2a4 4 0 0 1-4 4H3" />
            </svg>
            {repeatMode === 'one' && <span className="np-repeat-badge">1</span>}
          </button>
        </div>

        <button
          className={`np-like-btn ${isCurrentLiked ? 'np-liked' : ''}`}
          onClick={onToggleLikeCurrent}
        >
          {isCurrentLiked ? '♥' : '♡'}
        </button>
      </div>
    </div>
  )
}

export default NowPlaying
