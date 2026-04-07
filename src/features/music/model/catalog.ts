import type { Album, Playlist } from './types'

export const menuItems = ['Home', 'Search', 'Your Library']

export const playlists: Playlist[] = [
  { id: 1, name: 'Daily Mix 1', albumIds: [1, 8, 15, 22, 29, 34] },
  { id: 2, name: 'Daily Mix 2', albumIds: [2, 9, 16, 23, 30, 35] },
  { id: 3, name: 'Chill Hits', albumIds: [7, 8, 9, 10, 11, 12, 13, 14, 15, 16] },
  { id: 4, name: 'Jazz Lounge', albumIds: [17, 18, 19, 20, 21, 22, 23, 24, 25, 26] },
  { id: 5, name: 'Sleepy Vibes', albumIds: [27, 28, 29, 30, 31, 32, 33, 34, 35, 36] },
  { id: 6, name: 'Coding Focus', albumIds: [1, 3, 7, 12, 19, 25, 31] },
  { id: 7, name: 'Late Night', albumIds: [5, 6, 27, 28, 29, 33, 36] },
  { id: 8, name: 'Morning Coffee', albumIds: [1, 2, 17, 18, 20, 24] },
]

export const albums: Album[] = [
  // --- Original 6 ---
  { id: 1, title: 'Jazzy Afternoon', artist: 'Warm Keys', color: '#c4a35a', trackUrl: '/tracks/track-1.mp3', coverUrl: '/covers/cover-1.jpg' },
  { id: 2, title: 'Velvet Café', artist: 'Soft Groove', color: '#6b4226', trackUrl: '/tracks/track-2.mp3', coverUrl: '/covers/cover-2.jpg' },
  { id: 3, title: 'Coffee Shop Haze', artist: 'Mellow Beat', color: '#2d46b9', trackUrl: '/tracks/track-3.mp3', coverUrl: '/covers/cover-3.jpg' },
  { id: 4, title: 'Sleepy Clouds', artist: 'Dream Dust', color: '#8d67ab', trackUrl: '/tracks/track-4.mp3', coverUrl: '/covers/cover-4.jpg' },
  { id: 5, title: 'Midnight Rain', artist: 'Lo-Fi Luna', color: '#1a1a2e', trackUrl: '/tracks/track-5.mp3', coverUrl: '/covers/cover-5.jpg' },
  { id: 6, title: 'Dreamy Haze', artist: 'Pillow Soft', color: '#509bf5', trackUrl: '/tracks/track-6.mp3', coverUrl: '/covers/cover-6.jpg' },

  // --- Chill (7-16) ---
  { id: 7, title: 'Sunset Boulevard', artist: 'Chill Tape', color: '#e8976b', trackUrl: '/tracks/track-7.mp3', coverUrl: '/covers/cover-7.jpg' },
  { id: 8, title: 'Snowfall', artist: 'Arctic Breeze', color: '#a3c4d9', trackUrl: '/tracks/track-8.mp3', coverUrl: '/covers/cover-8.jpg' },
  { id: 9, title: 'Neon Glow', artist: 'Night Pulse', color: '#e04f9a', trackUrl: '/tracks/track-9.mp3', coverUrl: '/covers/cover-9.jpg' },
  { id: 10, title: 'Paper Planes', artist: 'Sky Drifter', color: '#7db8c9', trackUrl: '/tracks/track-10.mp3', coverUrl: '/covers/cover-10.jpg' },
  { id: 11, title: 'Golden Hour', artist: 'Amber Tone', color: '#d4a843', trackUrl: '/tracks/track-11.mp3', coverUrl: '/covers/cover-11.jpg' },
  { id: 12, title: 'Rainy Window', artist: 'Glass Drops', color: '#5a7d9a', trackUrl: '/tracks/track-12.mp3', coverUrl: '/covers/cover-12.jpg' },
  { id: 13, title: 'Vinyl Crackle', artist: 'Retro Haze', color: '#8b6b47', trackUrl: '/tracks/track-13.mp3', coverUrl: '/covers/cover-13.jpg' },
  { id: 14, title: 'Rooftop View', artist: 'City Lights', color: '#3a3a5c', trackUrl: '/tracks/track-14.mp3', coverUrl: '/covers/cover-14.jpg' },
  { id: 15, title: 'Warm Blanket', artist: 'Cozy Beats', color: '#c97b5e', trackUrl: '/tracks/track-15.mp3', coverUrl: '/covers/cover-15.jpg' },
  { id: 16, title: 'Cloud Nine', artist: 'Float Away', color: '#b8c5e2', trackUrl: '/tracks/track-16.mp3', coverUrl: '/covers/cover-16.jpg' },

  // --- Jazzy (17-26) ---
  { id: 17, title: 'Blue Note', artist: 'Sax & Soul', color: '#2b4570', trackUrl: '/tracks/track-17.mp3', coverUrl: '/covers/cover-17.jpg' },
  { id: 18, title: 'Piano Bar', artist: 'Ivory Keys', color: '#d4c5a9', trackUrl: '/tracks/track-18.mp3', coverUrl: '/covers/cover-18.jpg' },
  { id: 19, title: 'Swing Low', artist: 'Brass Echo', color: '#a67c52', trackUrl: '/tracks/track-19.mp3', coverUrl: '/covers/cover-19.jpg' },
  { id: 20, title: 'Bourbon Street', artist: 'Delta Jazz', color: '#6e4b3a', trackUrl: '/tracks/track-20.mp3', coverUrl: '/covers/cover-20.jpg' },
  { id: 21, title: 'Trumpet Glow', artist: 'Miles Away', color: '#cc8844', trackUrl: '/tracks/track-21.mp3', coverUrl: '/covers/cover-21.jpg' },
  { id: 22, title: 'Smooth Satin', artist: 'Velvet Jazz', color: '#5c3d6e', trackUrl: '/tracks/track-22.mp3', coverUrl: '/covers/cover-22.jpg' },
  { id: 23, title: 'Late Set', artist: 'Club Noir', color: '#1e1e3a', trackUrl: '/tracks/track-23.mp3', coverUrl: '/covers/cover-23.jpg' },
  { id: 24, title: 'Sunday Brunch', artist: 'Café Trio', color: '#e6c88a', trackUrl: '/tracks/track-24.mp3', coverUrl: '/covers/cover-24.jpg' },
  { id: 25, title: 'Walking Bass', artist: 'Groove Lab', color: '#4a6741', trackUrl: '/tracks/track-25.mp3', coverUrl: '/covers/cover-25.jpg' },
  { id: 26, title: 'Harlem Nights', artist: 'Big Band Lo-Fi', color: '#8b3a3a', trackUrl: '/tracks/track-26.mp3', coverUrl: '/covers/cover-26.jpg' },

  // --- Sleepy (27-36) ---
  { id: 27, title: 'Starlit Path', artist: 'Moon Dust', color: '#2a2a4a', trackUrl: '/tracks/track-27.mp3', coverUrl: '/covers/cover-27.jpg' },
  { id: 28, title: 'Feather Fall', artist: 'Silk Pillow', color: '#c4b8d9', trackUrl: '/tracks/track-28.mp3', coverUrl: '/covers/cover-28.jpg' },
  { id: 29, title: 'Deep Breath', artist: 'Still Water', color: '#4a8b7f', trackUrl: '/tracks/track-29.mp3', coverUrl: '/covers/cover-29.jpg' },
  { id: 30, title: 'Lullaby Loop', artist: 'Cradle Tone', color: '#7a6b8a', trackUrl: '/tracks/track-30.mp3', coverUrl: '/covers/cover-30.jpg' },
  { id: 31, title: 'Foggy Morning', artist: 'Grey Mist', color: '#9a9a9a', trackUrl: '/tracks/track-31.mp3', coverUrl: '/covers/cover-31.jpg' },
  { id: 32, title: 'Candlelight', artist: 'Warm Glow', color: '#d4a050', trackUrl: '/tracks/track-32.mp3', coverUrl: '/covers/cover-32.jpg' },
  { id: 33, title: 'Ocean Floor', artist: 'Deep Blue', color: '#1a4a6b', trackUrl: '/tracks/track-33.mp3', coverUrl: '/covers/cover-33.jpg' },
  { id: 34, title: 'Snow Globe', artist: 'Crystal Air', color: '#e0e8f0', trackUrl: '/tracks/track-34.mp3', coverUrl: '/covers/cover-34.jpg' },
  { id: 35, title: 'Quiet Garden', artist: 'Zen Leaf', color: '#5a8a5a', trackUrl: '/tracks/track-35.mp3', coverUrl: '/covers/cover-35.jpg' },
  { id: 36, title: 'Twilight Drift', artist: 'Evening Star', color: '#6b3a7a', trackUrl: '/tracks/track-36.mp3', coverUrl: '/covers/cover-36.jpg' },
]
