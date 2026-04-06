export type Album = {
  id: number
  title: string
  artist: string
  color: string
  trackUrl: string
  coverUrl: string
}

export type Playlist = {
  id: number
  name: string
  albumIds: number[]
}
