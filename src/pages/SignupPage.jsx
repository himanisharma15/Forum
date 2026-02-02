import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { useDispatch } from 'react-redux'
import { setUser } from '../store/slices/authSlice'
import { usersAPI } from '../services/api'
import './SignupPage.css'

function SignupPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
    displayName: '',
  })
  const [error, setError] = useState('')

  const signupMutation = useMutation({
    mutationFn: async () => {
      // json-server-auth only accepts email and password
      const response = await usersAPI.signup({
        email: formData.email,
        password: formData.password,
      })

      // After signup, update the user record with additional fields
      if (response.user && response.user.id) {
        await usersAPI.updateUser(response.user.id, {
          username: formData.username,
          displayName: formData.displayName,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.username}`,
          theme: 'light',
        })
      }

      return {
        ...response,
        user: {
          ...response.user,
          username: formData.username,
          displayName: formData.displayName,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.username}`,
          theme: 'light',
        },
      }
    },
    onSuccess: (data) => {
      dispatch(setUser({ user: data.user, token: data.accessToken }))
      navigate('/feed')
    },
    onError: (err) => {
      setError(err.message || 'Signup failed. Please try again.')
    },
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setError('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validation
    if (!formData.email || !formData.password || !formData.displayName || !formData.username) {
      setError('Please fill in all required fields')
      return
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    signupMutation.mutate()
  }

  return (
    <div className="auth-container fade-in">
      <div className="auth-box">
        <div className="auth-header">
          <h1>🗨️ Forum</h1>
          <h2>Join Our Community</h2>
          <p>Create an account to get started</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email Address *</label>
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
            <label htmlFor="username">Username *</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="johndoe"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="displayName">Display Name *</label>
            <input
              type="text"
              id="displayName"
              name="displayName"
              value={formData.displayName}
              onChange={handleChange}
              placeholder="John Doe"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password *</label>
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

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password *</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button
            type="submit"
            className="btn btn-primary auth-button"
            disabled={signupMutation.isPending}
          >
            {signupMutation.isPending ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <div className="auth-footer">
          <p>Already have an account?</p>
          <a href="/login" className="auth-link">
            Sign in here
          </a>
        </div>
      </div>
    </div>
  )
}

export default SignupPage
