import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { useDispatch } from 'react-redux'
import { setUser } from '../store/slices/authSlice'
import { usersAPI } from '../services/api'
import './LoginPage.css'

function LoginPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState('')

  const loginMutation = useMutation({
    mutationFn: async () => {
      return usersAPI.login(formData.email, formData.password)
    },
    onSuccess: (data) => {
      dispatch(setUser({ user: data.user, token: data.accessToken }))
      navigate('/feed')
    },
    onError: (err) => {
      setError(err.message || 'Login failed. Please check your credentials.')
    },
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setError('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields')
      return
    }
    loginMutation.mutate()
  }

  return (
    <div className="auth-container fade-in">
      <div className="auth-box">
        <div className="auth-header">
          <h1>🗨️ Forum</h1>
          <h2>Welcome Back</h2>
          <p>Sign in to your account to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button
            type="submit"
            className="btn btn-primary auth-button"
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="auth-footer">
          <p>Don't have an account?</p>
          <a href="/signup" className="auth-link">
            Create one now
          </a>
        </div>

        <div className="demo-users">
          <p className="demo-title">Demo Credentials:</p>
          <ul>
            <li>Email: jane@example.com</li>
            <li>Password: password123</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
