import { useRef, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import { postsAPI } from '../services/api'
import './NewPostForm.css'

function NewPostForm() {
  const titleRef = useRef(null)
  const queryClient = useQueryClient()
  const user = useSelector((state) => state.auth.user)
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    tags: '',
  })
  const [showForm, setShowForm] = useState(false)

  const createPostMutation = useMutation({
    mutationFn: async () => {
      const tags = formData.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter((tag) => tag)

      return postsAPI.createPost({
        title: formData.title,
        content: formData.content,
        authorId: user.id,
        author: {
          id: user.id,
          username: user.username,
          displayName: user.displayName,
          avatar: user.avatar,
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        likes: 0,
        likedBy: [],
        commentCount: 0,
        tags: tags,
        views: 0,
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      setFormData({ title: '', content: '', tags: '' })
      setShowForm(false)
    },
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.title.trim() && formData.content.trim()) {
      createPostMutation.mutate()
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const toggleForm = () => {
    setShowForm(!showForm)
    if (!showForm) {
      setTimeout(() => titleRef.current?.focus(), 0)
    }
  }

  return (
    <div className="new-post-form-container fade-in">
      {!showForm ? (
        <button className="btn btn-primary form-toggle" onClick={toggleForm}>
          ➕ Create New Post
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="new-post-form">
          <div className="form-group">
            <label htmlFor="title">Title *</label>
            <input
              ref={titleRef}
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="What's on your mind?"
              maxLength={200}
              required
            />
            <span className="char-count">{formData.title.length}/200</span>
          </div>

          <div className="form-group">
            <label htmlFor="content">Content *</label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              placeholder="Share your thoughts, ideas, or questions..."
              rows={6}
              maxLength={5000}
              required
            />
            <span className="char-count">{formData.content.length}/5000</span>
          </div>

          <div className="form-group">
            <label htmlFor="tags">Tags (comma-separated)</label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleInputChange}
              placeholder="e.g., React, JavaScript, Help"
            />
          </div>

          <div className="form-actions">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={createPostMutation.isPending}
            >
              {createPostMutation.isPending ? 'Publishing...' : 'Publish Post'}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={toggleForm}
              disabled={createPostMutation.isPending}
            >
              Cancel
            </button>
          </div>

          {createPostMutation.isError && (
            <div className="error-message">
              Failed to create post. Please try again.
            </div>
          )}
          {createPostMutation.isSuccess && (
            <div className="success-message">Post created successfully!</div>
          )}
        </form>
      )}
    </div>
  )
}

export default NewPostForm
