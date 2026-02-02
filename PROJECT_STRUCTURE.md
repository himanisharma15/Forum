# Project Structure

## Complete File Tree

```
forum1/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx              # Navigation header with user menu
│   │   ├── Navbar.css              # Navbar styles
│   │   ├── PostCard.jsx            # Post list item component
│   │   ├── PostCard.css            # Post card styles
│   │   ├── NewPostForm.jsx         # Create post form (useRef for focus)
│   │   ├── NewPostForm.css         # Form styles with char counters
│   │   ├── CommentSection.jsx      # Comment container (lazy loads comments)
│   │   ├── CommentSection.css      # Comment section styles
│   │   ├── CommentList.jsx         # Comment list display component
│   │   └── CommentList.css         # Comment list styles
│   │
│   ├── pages/
│   │   ├── FeedPage.jsx            # Main feed with infinite scroll
│   │   ├── FeedPage.css            # Feed page styles
│   │   ├── PostDetailPage.jsx      # Single post detail view
│   │   ├── PostDetailPage.css      # Post detail styles
│   │   ├── LoginPage.jsx           # Login authentication form
│   │   ├── LoginPage.css           # Login form styles
│   │   ├── SignupPage.jsx          # Registration form
│   │   └── SignupPage.css          # Signup form styles
│   │
│   ├── store/
│   │   ├── index.js                # Redux store configuration
│   │   └── slices/
│   │       └── authSlice.js        # Auth state (user, token, theme)
│   │
│   ├── services/
│   │   └── api.js                  # API calls for posts, comments, users
│   │
│   ├── hooks/
│   │   └── useAuth.js              # Custom auth hook
│   │
│   ├── App.jsx                     # Root app component with routing
│   ├── App.css                     # App container styles
│   ├── index.css                   # Global styles and CSS variables
│   ├── main.jsx                    # React entry point
│   └── config.js                   # Constants and configuration
│
├── index.html                      # HTML template
├── vite.config.js                  # Vite configuration
├── package.json                    # Dependencies and scripts
├── db.json                         # JSON Server database
├── api.rest                        # REST API test requests
├── .gitignore                      # Git ignore rules
├── .env.example                    # Environment variables template
│
├── README.md                       # Full documentation
├── QUICKSTART.md                   # Quick start guide
├── FEATURES.md                     # Feature documentation
├── PROJECT_STRUCTURE.md            # This file
└── setup.sh                        # Setup script
```

## File Descriptions

### Root Files

| File | Purpose |
|------|---------|
| `index.html` | HTML entry point for React app |
| `package.json` | NPM dependencies and scripts |
| `vite.config.js` | Vite build tool configuration |
| `db.json` | JSON Server database with seed data |
| `.gitignore` | Git ignore patterns |
| `.env.example` | Environment variables template |

### Source Code Structure

#### Components (`src/components/`)
Self-contained, reusable UI components:

- **Navbar** - Header with logo, navigation links, user menu, theme toggle
- **PostCard** - Post preview card with author info, excerpt, tags, likes
- **NewPostForm** - Form to create new posts (uses useRef for focus)
- **CommentSection** - Expandable comment container with lazy loading
- **CommentList** - Renders list of comments with like buttons

#### Pages (`src/pages/`)
Full-page components for routing:

- **FeedPage** - Paginated post feed with infinite scroll
- **PostDetailPage** - Full post view with comments
- **LoginPage** - Authentication form
- **SignupPage** - User registration form

#### State Management (`src/store/`)
Redux Toolkit setup:

- **index.js** - Combines all reducers into store
- **authSlice.js** - Auth reducer with user, token, theme

#### Services (`src/services/`)
- **api.js** - All API endpoints for posts, comments, users

#### Hooks (`src/hooks/`)
- **useAuth.js** - Custom hook for authentication actions

#### Configuration
- **App.jsx** - Root component with React Router setup
- **main.jsx** - React DOM render entry
- **index.css** - Global styles with CSS variables
- **config.js** - Constants and configuration values

### Component Relationships

```
App (Router)
├── Navbar
│   ├── Theme Toggle
│   ├── User Menu
│   └── Logout Button
│
└── Routes
    ├── LoginPage
    ├── SignupPage
    ├── FeedPage
    │   ├── NewPostForm (useRef)
    │   └── PostCard[]
    │       └── onLike
    │
    └── PostDetailPage
        ├── Like Button
        └── CommentSection (lazy)
            └── CommentList
                ├── Comment Item[]
                └── Like Comment Button
```

### State Flow

```
Redux Store (Global)
├── auth.user              (User object)
├── auth.token             (JWT token)
├── auth.theme             (light/dark)
└── auth.isAuthenticated   (boolean)

React Query (Server State)
├── posts                  (infinite paginated posts)
├── posts/:id             (single post detail)
└── comments/:postId      (comments for post)

Component Local State
├── form inputs           (useState)
├── expanded sections     (useState)
└── optimistic UI states  (useState)
```

### Data Flow

```
User Action
    ↓
Component Handler
    ↓
Redux Action or Mutation
    ↓
API Call (services/api.js)
    ↓
JSON Server (db.json)
    ↓
Response
    ↓
Query/Redux Update
    ↓
Component Re-render
```

### Styling Architecture

**Global Styles** (`index.css`):
- CSS variables for colors
- Base styles for elements
- Dark/light theme support
- Animations and utilities

**Component Styles** (`.css` files):
- BEM naming convention
- Responsive breakpoints
- Component-specific styling
- Theme-aware styles

**Theme System**:
```css
/* Light theme (default) */
:root { --primary-color: #007bff; }

/* Dark theme (via body.dark-theme) */
body.dark-theme { color: var(--light-text); }
```

### API Endpoints Structure

```
postsAPI/
├── getPosts(page, limit)
├── getPostById(id)
├── createPost(post)
├── updatePost(id, updates)
└── deletePost(id)

commentsAPI/
├── getCommentsByPostId(postId)
├── createComment(comment)
├── updateComment(id, updates)
└── deleteComment(id)

usersAPI/
├── login(email, password)
├── signup(userData)
├── getUserById(id)
└── updateUser(id, updates)
```

### Build & Runtime

**Development**:
- Vite dev server: `npm run dev` (port 5173)
- JSON Server: `npm run server:dev` (port 3001)
- Both: `npm run dev:all`

**Production**:
- Build: `npm run build` (creates dist/)
- Preview: `npm run preview`
- Deploy dist/ folder to hosting

### Key Technologies

```
Frontend Framework: React 18
Build Tool: Vite 5
Router: React Router 6
State: Redux Toolkit + React Query
Styling: CSS with Variables
Backend: JSON Server + JSON Server Auth
```

### Package Dependencies

**Production**:
- react: UI library
- react-dom: DOM rendering
- react-router-dom: Client routing
- @tanstack/react-query: Server state
- @reduxjs/toolkit: State management
- react-redux: Redux integration
- json-server: Mock backend
- json-server-auth: JWT auth

**Development**:
- @vitejs/plugin-react: React support
- vite: Build tool
- nodemon: Auto-restart
- concurrently: Run multiple commands

### Naming Conventions

**Files**:
- Components: PascalCase (PostCard.jsx)
- Services: camelCase (api.js)
- Styles: match component name (.css)

**Functions**:
- Components: PascalCase (FeedPage)
- Hooks: camelCase with 'use' prefix (useAuth)
- Handlers: camelCase with 'handle' prefix (handleSubmit)

**Selectors**:
- Query keys: ['posts'], ['comments', postId]
- Redux: state.auth.user, state.auth.theme

### Performance Optimizations

- **Code Splitting**: lazy() for CommentList
- **Data Caching**: React Query staleTime & gcTime
- **Pagination**: Load 10 posts at a time
- **Optimistic Updates**: Instant UI feedback
- **Lazy Comments**: Load only when expanded

### Testing Approach

Test Areas:
1. Component rendering
2. User interactions
3. API integration
4. Auth flow
5. Theme persistence
6. Infinite scroll

Sample Test Locations:
- Components: `__tests__/components/`
- Pages: `__tests__/pages/`
- Services: `__tests__/services/`
- Hooks: `__tests__/hooks/`

## Quick Reference

### To Add a New Feature

1. **New Page**: Create in `src/pages/`, add route in `App.jsx`
2. **New Component**: Create in `src/components/`
3. **New API Endpoint**: Add in `src/services/api.js`
4. **New Global State**: Add slice in `src/store/slices/`
5. **New Hook**: Create in `src/hooks/`

### To Modify Styling

1. Update CSS variables in `src/index.css`
2. Add theme-specific styles with `body.dark-theme`
3. Use BEM naming in component CSS files

### To Add Database Records

1. Edit `db.json` directly
2. Restart JSON Server
3. Data automatically available via API

---

See README.md for complete documentation.
