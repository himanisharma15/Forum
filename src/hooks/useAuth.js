import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUser, logout } from '../store/slices/authSlice'
import { usersAPI } from '../services/api'

export const useAuth = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.user)
  const token = useSelector((state) => state.auth.token)
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)

  const login = useCallback(
    async (email, password) => {
      const data = await usersAPI.login(email, password)
      dispatch(setUser({ user: data.user, token: data.accessToken }))
      return data
    },
    [dispatch]
  )

  const signup = useCallback(
    async (userData) => {
      const data = await usersAPI.signup(userData)
      dispatch(setUser({ user: data.user, token: data.accessToken }))
      return data
    },
    [dispatch]
  )

  const logoutUser = useCallback(() => {
    dispatch(logout())
  }, [dispatch])

  return {
    user,
    token,
    isAuthenticated,
    login,
    signup,
    logout: logoutUser,
  }
}
