import { useEffect, useRef } from 'react'
import './Header.css'

type HeaderProps = {
  username: string
  searchQuery: string
  searchFocusSignal: number
  onSearchChange: (value: string) => void
}

function Header({ username, searchQuery, searchFocusSignal, onSearchChange }: HeaderProps) {
  const searchInputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (!searchInputRef.current) return
    searchInputRef.current.focus()
    searchInputRef.current.select()
  }, [searchFocusSignal])

  return (
    <header className="header">
      <div className="header-left">
        <button className="nav-btn">{'<'}</button>
        <button className="nav-btn">{'>'}</button>
      </div>

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

      <button className="profile-btn">{username}</button>
    </header>
  )
}

export default Header
