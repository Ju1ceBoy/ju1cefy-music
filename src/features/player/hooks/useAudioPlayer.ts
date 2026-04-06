import { useEffect, useRef, useState } from 'react'

type UseAudioPlayerParams = {
  trackUrl: string
  isPlaying: boolean
  volume: number
  isMuted: boolean
  onEnded: () => void
  replaySignal: number
}

export function useAudioPlayer({
  trackUrl,
  isPlaying,
  volume,
  isMuted,
  onEnded,
  replaySignal,
}: UseAudioPlayerParams) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const onEndedRef = useRef(onEnded)

  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    onEndedRef.current = onEnded
  }, [onEnded])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.src = trackUrl
    audio.load()
    setCurrentTime(0)
    setDuration(0)

    if (isPlaying) {
      audio.play().catch(() => {
        // Ошибки autoplay игнорируем на этом этапе
      })
    }
  }, [trackUrl, replaySignal])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.play().catch(() => {
        // Ошибки autoplay игнорируем на этом этапе
      })
    } else {
      audio.pause()
    }
  }, [isPlaying])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.volume = volume
  }, [volume])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.muted = isMuted
  }, [isMuted])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const onTimeUpdate = () => setCurrentTime(audio.currentTime)
    const onLoadedMetadata = () => setDuration(audio.duration || 0)
    const onTrackEnded = () => onEndedRef.current()

    audio.addEventListener('timeupdate', onTimeUpdate)
    audio.addEventListener('loadedmetadata', onLoadedMetadata)
    audio.addEventListener('ended', onTrackEnded)

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate)
      audio.removeEventListener('loadedmetadata', onLoadedMetadata)
      audio.removeEventListener('ended', onTrackEnded)
    }
  }, [])

  const seekTo = (value: string) => {
    const nextTime = Number(value)
    if (!audioRef.current) return

    audioRef.current.currentTime = nextTime
    setCurrentTime(nextTime)
  }

  return {
    audioRef,
    currentTime,
    duration,
    seekTo,
  }
}
