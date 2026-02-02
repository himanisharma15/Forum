import { useQuery, useInfiniteQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { postsAPI } from '../services/api'
import NewPostForm from '../components/NewPostForm'
import PostCard from '../components/PostCard'
import './FeedPage.css'

function FeedPage() {
  const navigate = useNavigate()
  const user = useSelector((state) => state.auth.user)
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)

  // Redirect if not authenticated
  if (!isAuthenticated) {
    navigate('/login')
    return null
  }

  const {
    data,
    isLoading,
    isError,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: ({ pageParam = 1 }) => postsAPI.getPosts(pageParam, 10),
    getNextPageParam: (lastPage, pages) => {
      return lastPage.length === 10 ? pages.length + 1 : null
    },
  })

  const posts = data?.pages.flat() || []

  return (
    <div className="container feed-page fade-in">
      <div className="feed-header">
        <h1>Welcome back, {user?.displayName}! 👋</h1>
        <p className="feed-subtitle">Explore, discuss, and share your ideas with the community</p>
      </div>

      <NewPostForm />

      {isLoading ? (
        <div className="loading-center">
          <div className="spinner"></div>
          <p>Loading posts...</p>
        </div>
      ) : isError ? (
        <div className="error-message">
          Error loading posts: {error?.message || 'Unknown error'}
        </div>
      ) : posts.length === 0 ? (
        <div className="no-posts-message">
          <p>No posts yet. Be the first to create one! 🚀</p>
        </div>
      ) : (
        <>
          <div className="posts-list">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>

          {hasNextPage && (
            <div className="load-more-container">
              <button
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
                className="btn btn-primary"
              >
                {isFetchingNextPage ? 'Loading...' : 'Load More Posts'}
              </button>
            </div>
          )}

          {isFetchingNextPage && (
            <div className="loading-center">
              <div className="spinner"></div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default FeedPage
