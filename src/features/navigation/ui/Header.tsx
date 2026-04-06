import { useEffect, useRef } from 'react'
import './Header.css'

type HeaderProps = {
  username: string
  searchQuery: string
  searchFocusSignal: number
  theme: 'dark' | 'light'
  onSearchChange: (value: string) => void
  onToggleTheme: () => void
}

function Header({ username, searchQuery, searchFocusSignal, theme, onSearchChange, onToggleTheme }: HeaderProps) {
  const searchInputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (!searchInputRef.current) return
    searchInputRef.current.focus()
    searchInputRef.current.select()
  }, [searchFocusSignal])

  return (
    <header className="header">
      <div className="search-wrap">
        <input
          ref={searchInputRef}
          className="search-input"
          placeholder="What do you want to play?"
          value={searchQuery}
          onChange={(event) => onSearchChange(event.target.value)}
        />
        <span className="search-shortcut" aria-hidden="true">
          ⌘K / Ctrl+K
        </span>
      </div>

      <div className="header-right">
        <button className="theme-btn" onClick={onToggleTheme}>
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
        <button className="profile-btn">{username}</button>
      </div>
    </header>
  )
}

export default Header
