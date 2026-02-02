import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { postsAPI } from '../services/api'
import CommentSection from '../components/CommentSection'
import './PostDetailPage.css'

function PostDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const user = useSelector((state) => state.auth.user)

  const {
    data: post,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['posts', id],
    queryFn: () => postsAPI.getPostById(id),
  })

  const likePostMutation = useMutation({
    mutationFn: async () => {
      const newLikes = isLiked
        ? post.likedBy.filter((userId) => userId !== user.id)
        : [...(post.likedBy || []), user.id]

      return postsAPI.updatePost(post.id, {
        likes: newLikes.length,
        likedBy: newLikes,
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts', id] })
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })

  if (isLoading) {
    return (
      <div className="post-detail-page">
        <div className="loading-center">
          <div className="spinner"></div>
          <p>Loading post...</p>
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="post-detail-page">
        <button onClick={() => navigate('/feed')} className="back-button">
          ← Back to Feed
        </button>
        <div className="error-message">
          Error loading post: {error?.message || 'Unknown error'}
        </div>
      </div>
    )
  }

  const isLiked = post?.likedBy?.includes(user?.id) || false

  const handleLike = () => {
    likePostMutation.mutate()
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

  const authorAvatar = post?.author?.avatar || 'https://api.dicebear.com/7.x/initials/svg?seed=unknown'
  const authorName = post?.author?.displayName || post?.author?.username || 'Unknown'

  return (
    <div className="container post-detail-page fade-in">
      <button onClick={() => navigate('/feed')} className="back-button">
        ← Back to Feed
      </button>

      <article className="post-detail">
        <header className="post-detail-header">
          <div className="author-section">
            <img src={authorAvatar} alt={authorName} className="author-avatar-large" />
            <div className="author-meta">
              <h4 className="author-name">{authorName}</h4>
              <span className="post-time">
                {timeAgo(post.createdAt)}
                {post.updatedAt !== post.createdAt && ' (edited)'}
              </span>
            </div>
          </div>
          {post.views && <span className="view-badge">👁️ {post.views} views</span>}
        </header>

        <h1 className="post-detail-title">{post.title}</h1>

        {post.tags && post.tags.length > 0 && (
          <div className="post-tags-detail">
            {post.tags.map((tag) => (
              <span key={tag} className="tag-detail">
                #{tag}
              </span>
            ))}
          </div>
        )}

        <div className="post-detail-content">{post.content}</div>

        <div className="post-actions">
          <button
            className={`action-button ${isLiked ? 'liked' : ''}`}
            onClick={handleLike}
            disabled={likePostMutation.isPending}
          >
            {isLiked ? '❤️' : '🤍'} {post.likes || 0} Likes
          </button>
          <span className="comment-count">💬 {post.commentCount || 0} Comments</span>
        </div>

        <CommentSection postId={post.id} />
      </article>
    </div>
  )
}

export default PostDetailPage
