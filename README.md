# Ju1cefy — Spotify Clone

A fully functional Spotify-inspired music player built from scratch with **React** and **TypeScript**.

![React](https://img.shields.io/badge/React-19-61dafb?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178c6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-8-646cff?logo=vite)

## Features

- **Music playback** — play, pause, next/previous track with HTML5 Audio API
- **Progress bar** — seek through tracks with real-time time display
- **Volume control** — adjustable volume slider with mute/unmute toggle
- **Repeat modes** — off / repeat all / repeat one
- **Shuffle** — randomized track order
- **Search** — live filtering of albums by title or artist
- **Keyboard shortcuts** — `⌘K` / `Ctrl+K` to focus search, `Esc` to clear
- **Likes** — heart tracks with `localStorage` persistence
- **Queue panel** — view upcoming tracks and jump to any
- **Responsive design** — adapts to desktop, tablet, and mobile
- **Toast notifications** — animated feedback for like/unlike actions

## Tech Stack

| Layer | Technology |
|-------|------------|
| UI | React 19, JSX |
| Language | TypeScript |
| Build | Vite 8 |
| Styling | CSS (Grid, Flexbox, Media Queries, Animations) |
| Audio | HTML5 Audio API |
| State | React hooks (`useState`, `useEffect`, `useRef`) |
| Persistence | `localStorage` |

## Project Structure

```
src/
├── app/                    # App root component and global styles
├── features/
│   ├── browse/ui/          # Album grid component
│   ├── music/model/        # Data types and track catalog
│   ├── navigation/ui/      # Sidebar and Header components
│   ├── player/
│   │   ├── hooks/          # useAudioPlayer custom hook
│   │   └── ui/             # Player component
│   └── queue/ui/           # Queue panel component
├── assets/                 # Images, icons, favicon
├── index.css               # Global reset styles
└── main.tsx                # Entry point
```

## Getting Started

```bash
# Clone the repository
git clone https://github.com/ju1ceboy/spotify-clone.git
cd spotify-clone

# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Build

```bash
npm run build
npm run preview
```

## Music Credits

Lo-fi hip-hop tracks used in this project are sourced from open repositories with free licenses. All tracks are royalty-free and used for educational/demo purposes.

## License

This project is open source and available under the [MIT License](LICENSE).
