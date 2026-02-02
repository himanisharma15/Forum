# Quick Start Guide

## First Time Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Both Servers
In a terminal, run:
```bash
npm run dev:all
```

This will start:
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:3001

### 3. Login or Create Account
- **Login**: Use `jane@example.com` / `password123`
- **Signup**: Create a new account via signup page

## Features to Try

### Create a Post
1. Go to Feed page
2. Click "➕ Create New Post"
3. Fill in title, content, and optional tags
4. Click "Publish Post"

### View Post Details
1. Click on any post card
2. See full content and metadata
3. Like the post (❤️ button)

### Comment on Posts
1. In post detail, scroll to "Comments" section
2. Click to expand comments (lazy loaded)
3. Type your comment
4. Click "Reply"
5. Like comments with ❤️ button

### Toggle Theme
- Click 🌙 icon in navbar to toggle dark/light theme
- Theme persists on page reload

### Logout
- Click user avatar in navbar
- Click "Logout" button

## Project Structure Overview

```
src/
├── components/    # Reusable UI components
├── pages/         # Page components (Feed, Detail, Auth)
├── store/         # Redux setup & auth state
├── services/      # API calls
├── hooks/         # Custom hooks (useAuth)
└── config.js      # Constants & configuration
```

## Key Features Implemented

✅ **React Query** - Automatic caching & synchronization  
✅ **Redux Toolkit** - Global state (auth, theme)  
✅ **React Router** - Client-side navigation  
✅ **Lazy Loading** - Comments load on demand  
✅ **useRef** - Auto-focus on form inputs  
✅ **Infinite Scroll** - Load posts in batches  
✅ **Dark/Light Theme** - With localStorage persistence  
✅ **Authentication** - Login/signup with JWT  
✅ **Responsive Design** - Mobile-friendly UI  

## Development Tips

### Check API Responses
- Open DevTools (F12)
- Go to Network tab
- Try logging in or creating a post
- See real-time API calls

### Debug Redux State
- Open DevTools
- Go to Console tab
- Type: `window.__REDUX_DEVTOOLS_EXTENSION__` (if installed)
- Or check localStorage: Open Application > LocalStorage

### Monitor React Query Cache
- Check Network tab for prefetching
- Notice stale/fresh state transitions
- See automatic garbage collection

### Test Dark Theme
- Click 🌙 in navbar
- Check browser's Application > LocalStorage
- Look for `theme: "dark"` entry

## Common Issues

### "Cannot GET /feed" Error
- **Fix**: Ensure frontend is running on port 5173
- Run: `npm run dev`

### Posts not loading
- **Fix**: Ensure backend is running on port 3001
- Run: `npm run server:dev`

### Login fails
- **Fix**: Check if backend server is running
- Verify db.json has users data
- Use demo credentials: jane@example.com / password123

### Theme not persisting
- **Fix**: Clear browser cache
- Check if localStorage is enabled
- Try incognito/private mode

## Next Steps

1. ✨ Explore the codebase
2. 🔧 Try modifying components
3. 🚀 Build and deploy
4. 📚 Read the full README.md for more details

## File Organization

**Pages** (Full page components):
- `FeedPage` - Post feed with infinite scroll
- `PostDetailPage` - Individual post with comments
- `LoginPage` - Authentication form
- `SignupPage` - Registration form

**Components** (Reusable pieces):
- `Navbar` - Header with user menu
- `PostCard` - Post preview card
- `NewPostForm` - Create post form
- `CommentSection` - Comment container
- `CommentList` - Comments display

**State Management**:
- Redux for auth & theme
- React Query for server data
- localStorage for persistence

**API Service**:
- Centralized API calls in `services/api.js`
- All endpoints documented
- Error handling included

## Documentation

- **README.md** - Full documentation
- **FEATURES.md** - Feature list & technical details
- **Component comments** - Inline code documentation

Happy coding! 🚀
