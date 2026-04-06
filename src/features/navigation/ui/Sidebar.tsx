import type { Playlist } from '../../music/model/types'
import ju1cefyLogo from '../../../assets/ju1cefy.png'
import './Sidebar.css'

type SidebarProps = {
  menuItems: string[]
  playlists: Playlist[]
  activeMenuItem: string
  activePlaylistId: number | null
  onMenuItemClick: (item: string) => void
  onPlaylistClick: (playlist: Playlist) => void
}

function Sidebar({
  menuItems,
  playlists,
  activeMenuItem,
  activePlaylistId,
  onMenuItemClick,
  onPlaylistClick,
}: SidebarProps) {
  return (
    <aside className="sidebar">
      <div className="logo">
        <img src={ju1cefyLogo} alt="Ju1cefy" className="logo-icon" />
        <h1 className="logo-text">Ju1cefy</h1>
      </div>

      <nav className="menu">
        {menuItems.map((item) => (
          <button
            key={item}
            className={`menu-item ${activeMenuItem === item && activePlaylistId === null ? 'active' : ''}`}
            onClick={() => onMenuItemClick(item)}
          >
            {item}
          </button>
        ))}
      </nav>

      <div className="playlists">
        <p className="playlists-title">Playlists</p>
        {playlists.map((playlist) => (
          <button
            key={playlist.id}
            className={`playlist-item ${activePlaylistId === playlist.id ? 'active' : ''}`}
            onClick={() => onPlaylistClick(playlist)}
          >
            {playlist.name}
          </button>
        ))}
      </div>
    </aside>
  )
}

export default Sidebar
