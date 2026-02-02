import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import { postsAPI } from '../services/api'
import './PostCard.css'

function PostCard({ post }) {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const user = useSelector((state) => state.auth.user)
  const [isLiked, setIsLiked] = useState(post.likedBy?.includes(user?.id) || false)

  const likeMutation = useMutation({
    mutationFn: async () => {
      const newLikes = isLiked
        ? post.likedBy.filter((id) => id !== user.id)
        : [...(post.likedBy || []), user.id]

      return postsAPI.updatePost(post.id, {
        likes: newLikes.length,
        likedBy: newLikes,
      })
    },
    onSuccess: () => {
      setIsLiked(!isLiked)
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })

  const handleLike = (e) => {
    e.stopPropagation()
    likeMutation.mutate()
  }

  const handleCardClick = () => {
    navigate(`/posts/${post.id}`)
  }

  const timeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000)
    const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
    }

    for (const [name, value] of Object.entries(intervals)) {
      const interval = Math.floor(seconds / value)
      if (interval >= 1) {
        return `${interval} ${name}${interval > 1 ? 's' : ''} ago`
      }
    }
    return 'just now'
  }

  const authorAvatar = post.author?.avatar || 'https://api.dicebear.com/7.x/initials/svg?seed=unknown'
  const authorName = post.author?.displayName || post.author?.username || 'Unknown'

  return (
    <div className="post-card fade-in" onClick={handleCardClick}>
      <div className="post-header">
        <div className="author-info">
          <img src={authorAvatar} alt={authorName} className="author-avatar" />
          <div className="author-details">
            <h4 className="author-name">{authorName}</h4>
            <span className="post-time">{timeAgo(post.createdAt)}</span>
          </div>
        </div>
        {post.views && <span className="view-count">👁️ {post.views} views</span>}
      </div>

      <h3 className="post-title">{post.title}</h3>

      <p className="post-excerpt">
        {post.content.length > 200 ? `${post.content.substring(0, 200)}...` : post.content}
      </p>

      {post.tags && post.tags.length > 0 && (
        <div className="post-tags">
          {post.tags.map((tag) => (
            <span key={tag} className="tag">
              #{tag}
            </span>
          ))}
        </div>
      )}

      <div className="post-footer">
        <button
          className={`action-btn like-btn ${isLiked ? 'liked' : ''}`}
          onClick={handleLike}
          disabled={likeMutation.isPending}
        >
          {isLiked ? '❤️' : '🤍'} {post.likes || 0}
        </button>
        <button
          className="action-btn comment-btn"
          onClick={(e) => {
            e.stopPropagation()
            navigate(`/posts/${post.id}`)
          }}
        >
          💬 {post.commentCount || 0}
        </button>
      </div>
    </div>
  )
}

export default PostCard
