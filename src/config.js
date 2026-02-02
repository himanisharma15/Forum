export const COLORS = {
  primary: '#007bff',
  primaryDark: '#0056b3',
  secondary: '#6c757d',
  success: '#28a745',
  danger: '#dc3545',
  warning: '#ffc107',
  light: '#f8f9fa',
  dark: '#212529',
}

export const API_BASE_URL = 'http://localhost:3001'

export const PAGINATION = {
  POSTS_PER_PAGE: 10,
  MAX_TITLE_LENGTH: 200,
  MAX_CONTENT_LENGTH: 5000,
  MAX_COMMENT_LENGTH: 1000,
}

export const TIMEOUTS = {
  FORM_ANIMATION: 300,
  STALE_TIME: 5 * 60 * 1000, // 5 minutes
  CACHE_TIME: 10 * 60 * 1000, // 10 minutes
}

export const AVATAR_SEED = (username) => 
  `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`
