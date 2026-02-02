import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import { commentsAPI } from '../services/api'
import './CommentList.css'

function CommentList({ comments, postId }) {
  const queryClient = useQueryClient()
  const user = useSelector((state) => state.auth.user)
  const [likedComments, setLikedComments] = useState({})

  const likeCommentMutation = useMutation({
    mutationFn: async (commentId) => {
      const comment = comments.find((c) => c.id === commentId)
      const isLiked = comment.likedBy?.includes(user.id)
      const newLikes = isLiked
        ? comment.likedBy.filter((id) => id !== user.id)
        : [...(comment.likedBy || []), user.id]

      return commentsAPI.updateComment(commentId, {
        likes: newLikes.length,
        likedBy: newLikes,
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] })
    },
  })

  const handleLikeComment = (commentId) => {
    setLikedComments((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }))
    likeCommentMutation.mutate(commentId)
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

  if (!comments || comments.length === 0) {
    return <div className="no-comments">No comments yet. Be the first to reply!</div>
  }

  return (
    <div className="comment-list">
      {comments.map((comment) => {
        const authorAvatar = comment?.author?.avatar || 'https://api.dicebear.com/7.x/initials/svg?seed=unknown'
        const authorName = comment?.author?.displayName || comment?.author?.username || 'Unknown'

        return (
          <div key={comment.id} className="comment fade-in">
            <img src={authorAvatar} alt={authorName} className="comment-avatar" />
            <div className="comment-content">
              <div className="comment-header">
                <strong className="comment-author">{authorName}</strong>
                <span className="comment-time">{timeAgo(comment.createdAt)}</span>
              </div>
              <p className="comment-text">{comment.content}</p>
              <button
                className={`like-comment-btn ${
                  likedComments[comment.id] || comment.likedBy?.includes(user?.id) ? 'liked' : ''
                }`}
                onClick={() => handleLikeComment(comment.id)}
                disabled={likeCommentMutation.isPending}
              >
                {likedComments[comment.id] || comment.likedBy?.includes(user?.id) ? '❤️' : '🤍'} {comment.likes || 0}
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default CommentList
