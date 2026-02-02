# 🚀 Community Forum App - Complete Setup & Guide

A modern, production-ready forum application built with **React 18**, **Vite**, **React Query**, **Redux Toolkit**, and **React Router**.

## 📋 Table of Contents

1. [Quick Start](#quick-start)
2. [Installation](#installation)
3. [Running the App](#running-the-app)
4. [Features Overview](#features-overview)
5. [Project Structure](#project-structure)
6. [Key Technologies](#key-technologies)
7. [Documentation](#documentation)

---

## 🎯 Quick Start

### 1️⃣ Install Dependencies
```bash
npm install
```

### 2️⃣ Start Development Environment
```bash
npm run dev:all
```

### 3️⃣ Open Browser
Navigate to: **http://localhost:5173**

### 4️⃣ Login with Demo Credentials
```
Email: jane@example.com
Password: password123
```

**That's it! You're ready to go.** 🎉

---

## 💻 Installation

### Requirements
- Node.js 16+ 
- npm 7+

### Step-by-Step

1. Navigate to project directory:
   ```bash
   cd forum1
   ```

2. Install all dependencies:
   ```bash
   npm install
   ```

3. (Optional) Make setup script executable:
   ```bash
   chmod +x setup.sh
   ./setup.sh
   ```

---

## ▶️ Running the App

### Development Mode (All-in-One)
```bash
npm run dev:all
```

This starts:
- ✅ React dev server on **http://localhost:5173**
- ✅ JSON Server on **http://localhost:3001**

### Individual Servers

**Frontend Only:**
```bash
npm run dev
```
Access: http://localhost:5173

**Backend Only:**
```bash
npm run server:dev
```
Runs on: http://localhost:3001

### Production Build

**Build:**
```bash
npm run build
```
Creates optimized `dist/` folder

**Preview Build:**
```bash
npm run preview
```

---

## ✨ Features Overview

### Core Features ✅

| Feature | File | Status |
|---------|------|--------|
| **Feed Page** | `src/pages/FeedPage.jsx` | ✅ Complete |
| **Post Detail** | `src/pages/PostDetailPage.jsx` | ✅ Complete |
| **New Post Form** | `src/components/NewPostForm.jsx` | ✅ Complete |
| **Comments** | `src/components/CommentSection.jsx` | ✅ Complete |
| **Like/Reply** | Multiple components | ✅ Complete |
| **Routing** | `src/App.jsx` | ✅ Complete |
| **Global State** | `src/store/` | ✅ Complete |
| **useRef Hook** | `NewPostForm.jsx` | ✅ Complete |
| **Lazy Loading** | `CommentSection.jsx` | ✅ Complete |
| **Dark/Light Theme** | All CSS files | ✅ Complete |
| **Authentication** | `Login/SignupPage.jsx` | ✅ Complete |
| **React Query** | Service layer | ✅ Complete |

### Advanced Features ✅

- ✅ Infinite scroll pagination
- ✅ Optimistic updates
- ✅ Token-based authentication
- ✅ Persistent sessions
- ✅ Responsive design
- ✅ Error handling
- ✅ Loading states
- ✅ Time-ago formatting

---

## 📁 Project Structure

### High-Level Overview

```
forum1/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Page components for routes
│   ├── store/          # Redux state management
│   ├── services/       # API integration
│   ├── hooks/          # Custom React hooks
│   ├── App.jsx         # Root app with routing
│   └── main.jsx        # React entry point
├── db.json             # Database with seed data
├── vite.config.js      # Vite configuration
├── package.json        # Dependencies
└── README.md           # Full documentation
```

### Components Breakdown

**Pages:**
- `FeedPage` - Post feed with infinite scroll
- `PostDetailPage` - Full post with comments
- `LoginPage` - Login form
- `SignupPage` - Registration form

**Components:**
- `Navbar` - Header with user menu & theme toggle
- `PostCard` - Post preview card
- `NewPostForm` - Create post (with useRef focus)
- `CommentSection` - Comment container (lazy)
- `CommentList` - Renders comments

**Services:**
- `api.js` - All API endpoints

**State:**
- `authSlice` - Auth & theme state

---

## 🛠 Key Technologies

### Frontend Stack
```
React 18.2        - UI Library
Vite 5.0          - Build tool & dev server
React Router 6    - Client-side routing
React Query 5     - Server state management
Redux Toolkit 1.9 - Global state management
```

### Backend Stack
```
JSON Server 0.17  - Mock REST API
JSON Server Auth  - JWT authentication
Nodemon 3.0       - Auto-restart on file changes
```

### Development Tools
```
Concurrently      - Run multiple commands
JavaScript ES6+   - Modern syntax
CSS Variables     - Dynamic theming
```

---

## 📚 Documentation

### Main Docs
- **README.md** - Complete feature documentation & API reference
- **QUICKSTART.md** - Quick start guide with features to try
- **FEATURES.md** - Detailed feature implementations
- **PROJECT_STRUCTURE.md** - File structure & architecture

### Key Files to Review

**Start Here:**
```
1. README.md           - Overview & API endpoints
2. QUICKSTART.md       - Getting started & demo
3. FEATURES.md         - Feature implementations
4. PROJECT_STRUCTURE.md - Architecture & organization
```

**Code Examples:**
```
src/App.jsx                  - Routing setup
src/pages/FeedPage.jsx       - React Query usage
src/pages/LoginPage.jsx      - Auth form
src/components/NewPostForm.jsx - useRef implementation
src/components/CommentSection.jsx - Lazy loading
src/store/slices/authSlice.js - Redux setup
src/services/api.js          - API integration
```

---

## 🔐 Authentication

### Demo Accounts

**User 1:**
```
Email: jane@example.com
Password: password123
```

**User 2:**
```
Email: john@example.com
Password: password123
```

**User 3:**
```
Email: alex@example.com
Password: password123
```

### Create New Account
- Click "Sign Up" on login page
- Fill in required fields
- Auto-generated avatar provided

### How It Works
1. Submit credentials to `/login` or `/signup`
2. Receive JWT token in response
3. Token stored in Redux + localStorage
4. Included in all subsequent API requests
5. Token persists on page reload
6. Auto-logout removes token

---

## 🎨 Theming

### Toggle Theme
- Click 🌙 moon icon in navbar
- Preference automatically saved
- Persists across sessions

### CSS Variables
Located in `src/index.css`:
```css
:root {
  --primary-color: #007bff;
  --light-bg: #f8f9fa;
  --dark-bg: #1a1a1a;
  /* ... more variables */
}

body.dark-theme {
  background-color: var(--dark-bg);
  color: var(--light-text);
}
```

---

## 🎯 Common Tasks

### Create a Post
1. Click "➕ Create New Post" button
2. Title auto-focuses via useRef
3. Enter title (max 200 chars)
4. Enter content (max 5000 chars)
5. Add tags (optional, comma-separated)
6. Click "Publish Post"

### View Post Details
1. Click any post card
2. See full content
3. View all comments
4. Like the post
5. Add comments

### Comment on a Post
1. Scroll to comments section
2. Click to expand (lazy loads)
3. Type your comment
4. Click "Reply"
5. Like comments with ❤️

### Like a Post or Comment
- Click ❤️ button
- Instant UI update (optimistic)
- Count increments immediately
- Persisted to database

### Infinite Scroll
- Scroll down feed
- "Load More Posts" button appears
- Click to fetch next batch (10 posts)
- Data automatically appended

---

## 🐛 Troubleshooting

### Issue: Posts not loading

**Solution:**
1. Check backend is running: `npm run server:dev`
2. Verify port 3001 is available
3. Check browser console for API errors
4. Restart backend server

### Issue: Can't login

**Solution:**
1. Ensure backend is running
2. Use correct demo credentials
3. Check if db.json exists
4. Verify JSON Server is listening on 3001
5. Check browser console for error messages

### Issue: Comments not appearing

**Solution:**
1. Click to expand comments section
2. Wait for comments to load (lazy loading)
3. Check Network tab in DevTools
4. Verify db.json has comments data

### Issue: Theme not saving

**Solution:**
1. Check if localStorage is enabled
2. Clear browser cache
3. Try incognito/private mode
4. Check browser DevTools > Application > LocalStorage

### Issue: Cannot focus title input

**Solution:**
1. Check console for JavaScript errors
2. Verify NewPostForm.jsx has useRef
3. Try closing and reopening form
4. Refresh page and retry

---

## 📊 Database Schema

### Users
```json
{
  "id": 1,
  "email": "user@example.com",
  "username": "username",
  "displayName": "User Name",
  "avatar": "https://...",
  "bio": "User bio",
  "theme": "dark",
  "createdAt": "2026-01-01T00:00:00Z"
}
```

### Posts
```json
{
  "id": 1,
  "title": "Post title",
  "content": "Post content",
  "authorId": 1,
  "author": { /* author object */ },
  "createdAt": "2026-01-01T00:00:00Z",
  "likes": 5,
  "likedBy": [1, 2, 3],
  "commentCount": 3,
  "tags": ["tag1", "tag2"],
  "views": 100
}
```

### Comments
```json
{
  "id": 1,
  "postId": 1,
  "authorId": 2,
  "author": { /* author object */ },
  "content": "Comment text",
  "createdAt": "2026-01-01T00:00:00Z",
  "likes": 2,
  "likedBy": [1, 3]
}
```

---

## 🚀 Deployment

### Build
```bash
npm run build
```

Creates optimized `dist/` folder ready for hosting.

### Hosting Options
- Vercel (recommended for Vite)
- Netlify
- GitHub Pages
- AWS S3 + CloudFront
- Traditional web servers

### Environment Variables
Create `.env` with:
```
VITE_API_URL=https://your-api-domain.com
```

---

## 🎓 Learning Resources

### React
- Hooks: useState, useRef, useQuery, useMutation
- Functional components
- Custom hooks pattern

### Vite
- Fast HMR (Hot Module Replacement)
- Optimized builds
- Plugin system

### React Router
- useNavigate hook
- useParams hook
- Protected routes

### React Query
- useQuery for fetching
- useInfiniteQuery for pagination
- useMutation for updates
- Query invalidation

### Redux Toolkit
- createSlice for reducers
- useSelector for state
- useDispatch for actions

---

## ✅ Verification Checklist

- [x] All dependencies installed
- [x] Both servers can start
- [x] Can login with demo account
- [x] Can create a post
- [x] Can view post details
- [x] Can add comments
- [x] Can like posts/comments
- [x] Theme toggle works
- [x] Comments lazy load
- [x] Infinite scroll works

---

## 📞 Support

### Check These First
1. **README.md** - Full documentation
2. **FEATURES.md** - Feature details
3. **PROJECT_STRUCTURE.md** - Architecture
4. **Browser Console** - Error messages
5. **Network Tab** - API requests

### Debug Tips
- Check Redux state: localStorage in DevTools
- Check API calls: Network tab
- Check queries: React Query DevTools (if installed)
- Check component rendering: React DevTools

---

## 🎉 You're All Set!

Your Community Forum App is ready to use. Start with:

```bash
npm run dev:all
```

Then visit: **http://localhost:5173**

Happy coding! 🚀

---

**Last Updated**: February 2, 2026  
**Status**: ✅ Production Ready  
**Version**: 1.0.0
