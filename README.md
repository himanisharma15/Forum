# Community Forum App

A modern, feature-rich forum application built with **React**, **Vite**, **React Query**, **Redux Toolkit**, and **React Router**.

## Features

### 🚀 Core Features
- **Feed Page**: Scrollable list of posts with infinite scroll loading
- **Post Detail Page**: Full post view with comments section
- **New Post Form**: Create posts with title, content, and tags
- **Comments**: Add and view comments on posts (lazy-loaded)
- **Like/Reply Buttons**: Like posts and comments with instant UI updates
- **Authentication**: Login/signup with persistent session
- **Dark/Light Theme**: Toggle theme with persistent preference

### 🎯 Technical Features
- **React Query**: Server state management with caching and synchronization
- **Redux Toolkit**: Global state management (auth, theme)
- **React Router**: Client-side navigation
- **Lazy Loading**: Comments load only when needed
- **useRef**: Auto-focus on form inputs
- **Responsive Design**: Mobile-friendly UI
- **Error Handling**: Comprehensive error messages
- **Loading States**: Smooth loading indicators

## Project Structure

```
forum1/
├── src/
│   ├── components/          # Reusable components
│   │   ├── Navbar.jsx      # Navigation header
│   │   ├── PostCard.jsx    # Post list item
│   │   ├── NewPostForm.jsx # Post creation form (useRef)
│   │   ├── CommentSection.jsx # Comment container (lazy loaded)
│   │   └── CommentList.jsx # Comment list display
│   ├── pages/              # Page components
│   │   ├── FeedPage.jsx    # Posts feed with infinite scroll
│   │   ├── PostDetailPage.jsx # Individual post view
│   │   ├── LoginPage.jsx   # Login form
│   │   └── SignupPage.jsx  # Registration form
│   ├── store/              # Redux setup
│   │   ├── index.js        # Store configuration
│   │   └── slices/         # Redux slices
│   │       └── authSlice.js # Auth state management
│   ├── services/           # API calls
│   │   └── api.js          # REST API service
│   ├── hooks/              # Custom hooks
│   │   └── useAuth.js      # Auth utilities
│   ├── App.jsx             # App root component
│   ├── App.css             # App styles
│   ├── index.css           # Global styles
│   └── main.jsx            # Entry point
├── index.html              # HTML template
├── vite.config.js          # Vite configuration
├── db.json                 # JSON Server database
├── api.rest                # REST API test file
├── package.json            # Dependencies
└── README.md               # This file
```

## Installation

### Prerequisites
- Node.js 16+ and npm

### Setup Steps

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Ensure db.json comments section exists** (already included)

## Development

### Start Development Servers

**Option 1: Run both servers together**
```bash
npm run dev:all
```

**Option 2: Run servers separately**

Terminal 1 - Frontend:
```bash
npm run dev
```

Terminal 2 - Backend:
```bash
npm run server:dev
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## API Endpoints

The app connects to a JSON Server backend (port 3001) with the following endpoints:

### Authentication
- `POST /login` - User login
- `POST /signup` - User registration

### Posts
- `GET /posts` - Get all posts (paginated)
- `GET /posts/:id` - Get single post
- `POST /posts` - Create new post
- `PATCH /posts/:id` - Update post
- `DELETE /posts/:id` - Delete post

### Comments
- `GET /comments?postId=:id` - Get comments for a post
- `POST /comments` - Create comment
- `PATCH /comments/:id` - Update comment
- `DELETE /comments/:id` - Delete comment

### Users
- `GET /users` - Get all users
- `GET /users/:id` - Get user profile
- `PATCH /users/:id` - Update user profile

## Demo Credentials

Use these credentials to test the app:

```
Email: jane@example.com
Password: password123
```

Or create a new account via the signup page.

## Key Technologies

| Technology | Purpose |
|------------|---------|
| **React 18** | UI library |
| **Vite** | Fast build tool and dev server |
| **React Router v6** | Client-side routing |
| **React Query v5** | Server state management, caching |
| **Redux Toolkit** | Global state (auth, theme) |
| **JSON Server Auth** | Mock backend with authentication |

## Component Details

### NewPostForm.jsx
- Uses `useRef` to auto-focus title input
- Form toggles between hidden/visible states
- Character counters for title (200) and content (5000)
- Optimistic updates via React Query

### CommentSection.jsx
- **Lazy Loading**: Comments only load when section expands
- Uses `Suspense` with `lazy()` for CommentList component
- Comments hidden by default to improve initial load time

### PostCard.jsx
- Instant like updates with optimistic UI
- Time-ago formatting
- Shows tags and view count
- Responsive grid layout

### Authentication
- Persistent sessions via localStorage
- Redux store syncs with localStorage on app start
- Automatic redirect for unauthenticated users

## Styling

- CSS modules with dark/light theme support
- CSS variables for consistent theming
- Responsive design (mobile-first approach)
- Smooth animations and transitions
- Accessible color contrast

## Performance Optimizations

1. **React Query**: Automatic caching and refetching
2. **Lazy Loading**: Comments load only on demand
3. **Infinite Scroll**: Posts load in batches (10 per page)
4. **Suspense**: Smooth fallback for async components
5. **Memoization**: Prevents unnecessary re-renders

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Troubleshooting

### Can't connect to backend?
- Ensure JSON Server is running on port 3001
- Check if `npm run server:dev` is active

### Posts not loading?
- Verify `db.json` file exists
- Check browser console for API errors
- Ensure you're logged in

### Theme not persisting?
- Check if localStorage is enabled
- Try clearing cache and logging in again

## Future Enhancements

- [ ] User profiles and follow system
- [ ] Search and filtering
- [ ] Post edit/delete by author
- [ ] Nested comment threads
- [ ] Notifications
- [ ] User rankings/badges
- [ ] Post categories
- [ ] Real-time updates with WebSockets

## License

ISC

## Support

For issues or questions, check the API responses in browser DevTools (Network tab).
