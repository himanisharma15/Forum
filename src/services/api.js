const API_BASE = 'http://localhost:3001'

const getHeaders = () => {
  const token = localStorage.getItem('token')
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  }
}

// Posts API
export const postsAPI = {
  getPosts: async (page = 1, limit = 10) => {
    const response = await fetch(
      `${API_BASE}/posts?_page=${page}&_limit=${limit}&_sort=-createdAt`,
      { headers: getHeaders() }
    )
    if (!response.ok) throw new Error('Failed to fetch posts')
    return response.json()
  },

  getPostById: async (id) => {
    const response = await fetch(`${API_BASE}/posts/${id}`, {
      headers: getHeaders(),
    })
    if (!response.ok) throw new Error('Failed to fetch post')
    return response.json()
  },

  createPost: async (post) => {
    const response = await fetch(`${API_BASE}/posts`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(post),
    })
    if (!response.ok) throw new Error('Failed to create post')
    return response.json()
  },

  updatePost: async (id, updates) => {
    const response = await fetch(`${API_BASE}/posts/${id}`, {
      method: 'PATCH',
      headers: getHeaders(),
      body: JSON.stringify(updates),
    })
    if (!response.ok) throw new Error('Failed to update post')
    return response.json()
  },

  deletePost: async (id) => {
    const response = await fetch(`${API_BASE}/posts/${id}`, {
      method: 'DELETE',
      headers: getHeaders(),
    })
    if (!response.ok) throw new Error('Failed to delete post')
    return response.json()
  },
}

// Comments API
export const commentsAPI = {
  getCommentsByPostId: async (postId) => {
    const response = await fetch(`${API_BASE}/comments?postId=${postId}`, {
      headers: getHeaders(),
    })
    if (!response.ok) throw new Error('Failed to fetch comments')
    return response.json()
  },

  createComment: async (comment) => {
    const response = await fetch(`${API_BASE}/comments`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(comment),
    })
    if (!response.ok) throw new Error('Failed to create comment')
    return response.json()
  },

  updateComment: async (id, updates) => {
    const response = await fetch(`${API_BASE}/comments/${id}`, {
      method: 'PATCH',
      headers: getHeaders(),
      body: JSON.stringify(updates),
    })
    if (!response.ok) throw new Error('Failed to update comment')
    return response.json()
  },

  deleteComment: async (id) => {
    const response = await fetch(`${API_BASE}/comments/${id}`, {
      method: 'DELETE',
      headers: getHeaders(),
    })
    if (!response.ok) throw new Error('Failed to delete comment')
    return response.json()
  },
}

// Users API
export const usersAPI = {
  login: async (email, password) => {
    const response = await fetch(`${API_BASE}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      const errorMsg = errorData.message || errorData || 'Login failed'
      throw new Error(errorMsg)
    }
    
    return response.json()
  },

  signup: async (userData) => {
    const response = await fetch(`${API_BASE}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    })
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      const errorMsg = errorData.message || errorData || 'Signup failed'
      throw new Error(errorMsg)
    }
    
    return response.json()
  },

  getUserById: async (id) => {
    const response = await fetch(`${API_BASE}/users/${id}`, {
      headers: getHeaders(),
    })
    if (!response.ok) throw new Error('Failed to fetch user')
    return response.json()
  },

  updateUser: async (id, updates) => {
    const response = await fetch(`${API_BASE}/users/${id}`, {
      method: 'PATCH',
      headers: getHeaders(),
      body: JSON.stringify(updates),
    })
    if (!response.ok) throw new Error('Failed to update user')
    return response.json()
  },
}
