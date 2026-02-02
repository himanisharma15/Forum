import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout, toggleTheme } from '../store/slices/authSlice'
import './Navbar.css'

function Navbar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.auth.user)
  const theme = useSelector((state) => state.auth.theme)
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
    setMenuOpen(false)
  }

  const handleThemeToggle = () => {
    dispatch(toggleTheme())
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <span className="brand-icon">🗨️</span> Forum
        </Link>

        <div className="navbar-menu">
          {user && (
            <Link to="/feed" className="nav-link">
              Feed
            </Link>
          )}

          <button className="theme-toggle" onClick={handleThemeToggle} title="Toggle theme">
            {theme === 'light' ? '🌙' : '☀️'}
          </button>

          <div className={`user-menu ${menuOpen ? 'open' : ''}`}>
            {user ? (
              <>
                <button
                  className="user-button"
                  onClick={() => setMenuOpen(!menuOpen)}
                  title={user.displayName}
                >
                  <img src={user.avatar} alt={user.displayName} className="user-avatar" />
                  <span className="user-name">{user.displayName}</span>
                </button>

                {menuOpen && (
                  <div className="dropdown-menu">
                    <span className="dropdown-header">{user.email}</span>
                    <button onClick={handleLogout} className="logout-btn">
                      Logout
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="auth-links">
                <Link to="/login" className="nav-link">
                  Login
                </Link>
                <Link to="/signup" className="nav-link signup-link">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
