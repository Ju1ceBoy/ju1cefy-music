import type { Album } from './types'

export const menuItems = ['Home', 'Search', 'Your Library']

export const playlists = [
  'Daily Mix 1',
  'Daily Mix 2',
  'Chill Hits',
  'Rock Classics',
  'Coding Focus',
]

export const albums: Album[] = [
  {
    id: 1,
    title: 'Jazzy Afternoon',
    artist: 'Warm Keys',
    color: '#c4a35a',
    trackUrl: '/tracks/track-1.mp3',
    coverUrl: '/covers/cover-1.jpg',
  },
  {
    id: 2,
    title: 'Velvet Café',
    artist: 'Soft Groove',
    color: '#6b4226',
    trackUrl: '/tracks/track-2.mp3',
    coverUrl: '/covers/cover-2.jpg',
  },
  {
    id: 3,
    title: 'Coffee Shop Haze',
    artist: 'Mellow Beat',
    color: '#2d46b9',
    trackUrl: '/tracks/track-3.mp3',
    coverUrl: '/covers/cover-3.jpg',
  },
  {
    id: 4,
    title: 'Sleepy Clouds',
    artist: 'Dream Dust',
    color: '#8d67ab',
    trackUrl: '/tracks/track-4.mp3',
    coverUrl: '/covers/cover-4.jpg',
  },
  {
    id: 5,
    title: 'Midnight Rain',
    artist: 'Lo-Fi Luna',
    color: '#1a1a2e',
    trackUrl: '/tracks/track-5.mp3',
    coverUrl: '/covers/cover-5.jpg',
  },
  {
    id: 6,
    title: 'Dreamy Haze',
    artist: 'Pillow Soft',
    color: '#509bf5',
    trackUrl: '/tracks/track-6.mp3',
    coverUrl: '/covers/cover-6.jpg',
  },
]
