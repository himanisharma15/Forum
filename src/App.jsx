import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import FeedPage from './pages/FeedPage'
import PostDetailPage from './pages/PostDetailPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import './App.css'

function App() {
  const theme = useSelector((state) => state.auth.theme)
  const user = useSelector((state) => state.auth.user)
  useEffect(() => {
    // Apply theme class on the body so CSS selectors targeting body.dark-theme work
    if (theme === 'dark') {
      document.body.classList.add('dark-theme')
      document.body.classList.remove('light-theme')
    } else {
      document.body.classList.add('light-theme')
      document.body.classList.remove('dark-theme')
    }

    return () => {
      document.body.classList.remove('dark-theme')
      document.body.classList.remove('light-theme')
    }
  }, [theme])

  return (
    <div className={`app ${theme === 'dark' ? 'dark-theme' : 'light-theme'}`}>
      <Router>
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/feed" element={<FeedPage />} />
            <Route path="/posts/:id" element={<PostDetailPage />} />
            <Route path="/" element={user ? <Navigate to="/feed" /> : <Navigate to="/login" />} />
          </Routes>
        </main>
      </Router>
    </div>
  )
}

export default App
