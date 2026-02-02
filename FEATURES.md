# Feature Documentation

## Overview
Community Forum App is a full-featured social discussion platform built with modern React technologies.

## Feature List

### 1. Feed Page ✅
**File**: `src/pages/FeedPage.jsx`

Features:
- Display paginated list of posts (10 posts per page)
- Infinite scroll with "Load More" button
- Post cards with:
  - Author avatar and name
  - Post title and excerpt
  - Tags
  - View count
  - Like count
  - Comment count
  - Time posted
- React Query automatic caching
- Loading states and error handling

**Technical Details**:
- Uses `useInfiniteQuery` for pagination
- Implements `getNextPageParam` for custom pagination logic
- Automatic data refetching on stale time
- Optimistic UI updates for likes

### 2. Post Detail Page ✅
**File**: `src/pages/PostDetailPage.jsx`

Features:
- Full post content display
- Author information with avatar
- Full post metadata (views, likes, comments)
- Like button with counter
- Comment section (lazy loaded)
- Back to feed navigation
- Time posted with edit indicator

**Technical Details**:
- Uses `useQuery` for single post fetching
- Mutation for like updates
- Comment section with lazy loading
- Error boundary with fallback

### 3. New Post Form ✅
**File**: `src/components/NewPostForm.jsx`

Features:
- Collapsible form (toggle button)
- Auto-focus on title input using `useRef`
- Character counters:
  - Title: 200 character limit
  - Content: 5000 character limit
- Tag input (comma-separated)
- Real-time validation
- Submit with loading state
- Success/error feedback

**Key Implementation**:
```javascript
const titleRef = useRef(null)
// Auto-focus when form opens
setTimeout(() => titleRef.current?.focus(), 0)
```

**Technical Details**:
- Form state with `useState`
- `useMutation` for creating posts
- Optimistic updates via query invalidation
- Automatic form reset after successful submission

### 4. Comments (Lazy Loading) ✅
**Files**: 
- `src/components/CommentSection.jsx` (container)
- `src/components/CommentList.jsx` (display)

Features:
- Comments hidden by default (lazy loaded)
- Expandable comment section
- Add new comments form
- Comment author info with avatar
- Time posted
- Like button per comment
- Nested loading with Suspense
- Empty state message

**Lazy Loading Implementation**:
```javascript
// Comments only fetch when isExpanded is true
const { data: comments } = useQuery({
  queryFn: () => commentsAPI.getCommentsByPostId(postId),
  enabled: isExpanded, // Only fetch when needed
})

// Lazy load CommentList component
const CommentList = lazy(() => import('./CommentList'))

// Suspense fallback while loading
<Suspense fallback={<LoadingSpinner />}>
  <CommentList comments={comments} />
</Suspense>
```

**Technical Details**:
- `useQuery` with `enabled` option
- `lazy()` and `Suspense` for code splitting
- `useMutation` for comment creation
- Optimistic UI updates

### 5. Like/Reply Buttons ✅
**Implementations**:
- Post likes: `PostCard.jsx`
- Comment likes: `CommentList.jsx`
- Post detail like: `PostDetailPage.jsx`

Features:
- Visual feedback (filled vs empty heart)
- Like count display
- Instant UI update (optimistic)
- Disable button while pending
- Like tracking per user

**Technical Details**:
```javascript
const likeMutation = useMutation({
  mutationFn: async () => {
    const newLikes = isLiked
      ? post.likedBy.filter(id => id !== user.id)
      : [...post.likedBy, user.id]
    
    return postsAPI.updatePost(post.id, {
      likes: newLikes.length,
      likedBy: newLikes,
    })
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['posts'] })
  },
})
```

### 6. Routing ✅
**File**: `src/App.jsx`
**Router**: React Router v6

Routes:
- `/` - Root (redirects to /feed or /login)
- `/login` - Login page
- `/signup` - Signup page
- `/feed` - Posts feed (protected)
- `/posts/:id` - Post detail (protected)

**Protected Routes**:
- Automatic redirect to login if not authenticated
- useNavigate for programmatic navigation
- Persistent auth via Redux + localStorage

### 7. Global State (Redux Toolkit) ✅
**Files**:
- `src/store/index.js` - Store configuration
- `src/store/slices/authSlice.js` - Auth reducer

**State Structure**:
```javascript
{
  auth: {
    user: { id, email, displayName, avatar, ... },
    token: "jwt-token-here",
    theme: "light" | "dark",
    isAuthenticated: boolean
  }
}
```

**Actions**:
- `setUser` - Login/signup
- `logout` - Logout user
- `toggleTheme` - Switch theme
- `setTheme` - Set specific theme

**Persistence**:
- Auth data persists in localStorage
- Theme preference persists
- Auto-load on app start

### 8. useRef Hook ✅
**File**: `src/components/NewPostForm.jsx`

Implementation:
- Auto-focus title input when form opens
- DOM element reference without re-renders
- Deferred focus using setTimeout
- Improves UX by focusing user attention

```javascript
const titleRef = useRef(null)

// In render:
<input ref={titleRef} ... />

// On toggle:
const toggleForm = () => {
  setShowForm(!showForm)
  if (!showForm) {
    setTimeout(() => titleRef.current?.focus(), 0)
  }
}
```

### 9. Infinite Scroll / Pagination ✅
**File**: `src/pages/FeedPage.jsx`

Features:
- Load 10 posts per page
- "Load More" button
- Automatic next page calculation
- Loading state during fetch
- Seamless data concatenation

**Implementation**:
```javascript
const { data, hasNextPage, fetchNextPage, isFetchingNextPage } 
  = useInfiniteQuery({
  queryKey: ['posts'],
  queryFn: ({ pageParam = 1 }) => 
    postsAPI.getPosts(pageParam, 10),
  getNextPageParam: (lastPage, pages) => {
    return lastPage.length === 10 
      ? pages.length + 1 
      : null
  },
})
```

### 10. Dark/Light Theme ✅
**Files**: All CSS files with theme support

Features:
- Toggle via navbar button (🌙/☀️)
- Persistent preference (localStorage)
- CSS variables for theming
- Smooth transitions
- Body class: `light-theme` or `dark-theme`

**CSS Variables**:
```css
:root {
  --primary-color: #007bff;
  --light-bg: #f8f9fa;
  --dark-bg: #1a1a1a;
  --light-text: #e0e0e0;
  /* ... more variables */
}

body.dark-theme {
  background-color: var(--dark-bg);
  color: var(--light-text);
}
```

**Redux Integration**:
- Store theme in Redux
- Dispatch `toggleTheme` action
- Sync with localStorage
- Load on app initialization

### 11. React Query Features ✅

**Caching Strategy**:
- staleTime: 5 minutes
- gcTime: 10 minutes (cache time)
- retry: 1 attempt on failure

**Query Keys Structure**:
- `['posts']` - All posts (infinite query)
- `['posts', id]` - Single post
- `['comments', postId]` - Comments for post

**Mutations**:
- `createPost` - Create new post
- `updatePost` - Update like count
- `createComment` - Add comment
- `likeComment` - Like a comment

**Query Invalidation**:
```javascript
queryClient.invalidateQueries({ 
  queryKey: ['posts'] 
})
```

### 12. Authentication ✅
**Files**:
- `src/pages/LoginPage.jsx`
- `src/pages/SignupPage.jsx`
- `src/hooks/useAuth.js`
- `src/store/slices/authSlice.js`

Features:
- JWT token-based auth
- Login form with validation
- Signup form with validation
- Password confirmation
- Error messages
- Demo credentials available
- Persistent sessions
- Auto-generate avatar

**API Integration**:
```javascript
const { login, signup } = useAuth()

// Login
await login(email, password)

// Signup
await signup({ email, password, username, displayName })
```

### 13. Responsive Design ✅

Breakpoints:
- Desktop: > 768px
- Mobile: ≤ 768px
- Small: ≤ 480px

Responsive Components:
- Navbar (collapsible on mobile)
- Post cards (adjusted padding)
- Forms (full width on mobile)
- Comments (optimized spacing)

## Performance Optimizations

1. **React Query**
   - Automatic caching
   - Stale time management
   - Background refetching
   - Garbage collection

2. **Lazy Loading**
   - Comments load on demand
   - Code splitting with lazy()
   - Suspense boundaries

3. **Optimistic Updates**
   - UI updates before server response
   - Rollback on error
   - Better perceived performance

4. **Memoization**
   - useCallback for stable functions
   - Prevents unnecessary re-renders

5. **Pagination**
   - Infinite scroll prevents loading all posts
   - Batched requests (10 per page)

## Error Handling

**API Errors**:
- Try-catch in mutations
- User-friendly error messages
- Error boundaries in components
- Retry logic built into React Query

**Form Validation**:
- Required field checks
- Email format validation
- Password strength validation
- Real-time character counting

**Network Errors**:
- Retry configuration
- Fallback UI states
- Error message display

## Browser Compatibility

Tested and working on:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Accessibility

Features:
- Semantic HTML
- ARIA labels on interactive elements
- Keyboard navigation
- Color contrast compliance
- Theme respects system preferences

## Code Quality

Best Practices:
- Functional components with hooks
- Custom hooks for reusability
- Proper error handling
- Clean component separation
- DRY principles
- Meaningful variable names
- Inline documentation

---

## Summary

This Forum App demonstrates modern React development with:
- ✅ Advanced state management (Redux + React Query)
- ✅ Routing with protected routes
- ✅ Lazy loading and code splitting
- ✅ Optimistic updates
- ✅ Persistent authentication
- ✅ Theme system
- ✅ Responsive design
- ✅ API integration
- ✅ Error handling
- ✅ Performance optimization
