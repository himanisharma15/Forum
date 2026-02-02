import { lazy, Suspense, useState, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import { commentsAPI } from '../services/api'
import './CommentSection.css'

const CommentList = lazy(() => import('./CommentList'))

function CommentSection({ postId, defaultOpen = false }) {
  const queryClient = useQueryClient()
  const user = useSelector((state) => state.auth.user)
  const [commentText, setCommentText] = useState('')
  const [isExpanded, setIsExpanded] = useState(defaultOpen)
  const [submitError, setSubmitError] = useState(null)

  const { data: comments = [], isLoading } = useQuery({
    queryKey: ['comments', postId],
    queryFn: () => commentsAPI.getCommentsByPostId(postId),
    enabled: isExpanded,
  })

  const createCommentMutation = useMutation({
    mutationFn: async (payload) => {
      if (!user) throw new Error('Not authenticated')
      return commentsAPI.createComment(payload)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] })
      queryClient.invalidateQueries({ queryKey: ['posts', postId] })
      setCommentText('')
      setSubmitError(null)
    },
    onError: (err) => {
      console.error('Create comment error:', err)
      setSubmitError(err?.message || 'Failed to post comment')
    },
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (commentText.trim()) {
      const payload = {
        postId,
        authorId: user?.id,
        author: {
          id: user?.id,
          username: user?.username,
          displayName: user?.displayName,
          avatar: user?.avatar,
        },
        content: commentText,
        createdAt: new Date().toISOString(),
        likes: 0,
        likedBy: [],
      }

      // Use mutateAsync to catch errors inline
      createCommentMutation.mutate(payload)
    }
  }

  useEffect(() => {
    // Helpful debugging: log current auth state when the component mounts
    try {
      console.debug('CommentSection user:', user)
      console.debug('local token:', localStorage.getItem('token'))
    } catch (e) {
      // ignore in non-browser environments
    }
  }, [user])

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div className="comment-section">
      <button className="expand-btn" onClick={toggleExpand}>
        {isExpanded ? '▼' : '▶'} Comments ({comments.length})
      </button>

      {isExpanded && (
        <div className="comments-container">
          {user ? (
            <form onSubmit={handleSubmit} className="comment-form">
              <img src={user.avatar || 'https://api.dicebear.com/7.x/initials/svg?seed=unknown'} alt={user.displayName || 'You'} className="user-avatar-small" />
              <div className="form-wrapper">
                <textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Share your thoughts..."
                  rows={2}
                  maxLength={1000}
                />
                <div className="form-footer">
                  <span className="char-count">{commentText.length}/1000</span>
                  <button
                    type="submit"
                    disabled={!commentText.trim() || createCommentMutation.isPending}
                    className="btn btn-primary btn-small"
                  >
                    {createCommentMutation.isPending ? 'Posting...' : 'Reply'}
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <div className="login-prompt">
              <p>Please <a href="/login">login</a> or <a href="/signup">sign up</a> to post comments.</p>
            </div>
          )}
          {submitError && <div className="error-message" style={{marginTop:8}}>{submitError}</div>}

          {isLoading ? (
            <div className="loading-spinner">
              <div className="spinner"></div>
            </div>
          ) : (
            <Suspense fallback={<div className="loading-spinner"><div className="spinner"></div></div>}>
              <CommentList comments={comments} postId={postId} />
            </Suspense>
          )}
        </div>
      )}
    </div>
  )
}

export default CommentSection
