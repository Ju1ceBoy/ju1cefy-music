import ju1cefyLogo from '../../../assets/ju1cefy.png'
import './Sidebar.css'

type SidebarProps = {
  menuItems: string[]
  playlists: string[]
  activeMenuItem: string
  onMenuItemClick: (item: string) => void
}

function Sidebar({ menuItems, playlists, activeMenuItem, onMenuItemClick }: SidebarProps) {
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
            className={`menu-item ${activeMenuItem === item ? 'active' : ''}`}
            onClick={() => onMenuItemClick(item)}
          >
            {item}
          </button>
        ))}
      </nav>

      <div className="playlists">
        <p className="playlists-title">Playlists</p>
        {playlists.map((playlist) => (
          <button key={playlist} className="playlist-item">
            {playlist}
          </button>
        ))}
      </div>
    </aside>
  )
}

export default Sidebar
