# Forum App Backend - JSON Server

A JSON Server backend with authentication for a forum application. This backend supports user authentication, posts, comments, and likes functionality.

## Installation

```bash
npm install
```

## Running the Server

### Option 1: Start with Authentication (Recommended)
```bash
npm run start:auth
```

This will start the server on `http://localhost:3001` with built-in authentication support.

### Option 2: Start without Authentication
```bash
npm start
```

### Option 3: Development Mode with Auto-reload
```bash
npm run dev
```

## API Endpoints

### Authentication (json-server-auth)

#### Register
```
POST /auth/signup
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

#### Login
```
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "access_token": "your_jwt_token",
  "user": {
    "id": 1,
    "email": "user@example.com"
  }
}
```

### Users

#### Get All Users
```
GET /users
```

#### Get Single User
```
GET /users/:id
```

#### Update User
```
PATCH /users/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "displayName": "New Name",
  "bio": "Updated bio",
  "theme": "dark"
}
```

### Posts

#### Get All Posts
```
GET /posts
```

#### Get Single Post with Comments
```
GET /posts/:id
GET /posts/:id?_embed=comments
```

#### Create Post
```
POST /posts
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Post Title",
  "content": "Post content here",
  "authorId": 1,
  "tags": ["tag1", "tag2"]
}
```

#### Update Post
```
PATCH /posts/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Updated Title",
  "content": "Updated content"
}
```

#### Delete Post
```
DELETE /posts/:id
Authorization: Bearer {token}
```

#### Get Posts by Author
```
GET /posts?authorId=1
```

#### Get Posts by Tag
```
GET /posts?tags_like=React
```

### Comments

#### Get All Comments
```
GET /comments
```

#### Get Comments for a Post
```
GET /comments?postId=1
```

#### Get Comment with Replies
```
GET /comments/:id?_embed=replies
```

#### Get Comment Replies (Nested Comments)
```
GET /comments?parentCommentId=1
```

#### Create Comment
```
POST /comments
Authorization: Bearer {token}
Content-Type: application/json

{
  "postId": 1,
  "parentCommentId": null,
  "authorId": 1,
  "content": "Comment text here"
}
```

#### Create Reply to Comment
```
POST /comments
Authorization: Bearer {token}
Content-Type: application/json

{
  "postId": 1,
  "parentCommentId": 5,
  "authorId": 1,
  "content": "Reply text here"
}
```

#### Update Comment
```
PATCH /comments/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "content": "Updated comment text"
}
```

#### Delete Comment
```
DELETE /comments/:id
Authorization: Bearer {token}
```

### Likes

#### Get All Likes
```
GET /likes
```

#### Get User's Likes
```
GET /likes?userId=1
```

#### Get Post Likes
```
GET /likes?postId=1&type=post
```

#### Get Comment Likes
```
GET /likes?commentId=1&type=comment
```

#### Add Like
```
POST /likes
Authorization: Bearer {token}
Content-Type: application/json

{
  "userId": 1,
  "postId": 1,
  "type": "post"
}
```

#### Remove Like
```
DELETE /likes/:id
Authorization: Bearer {token}
```

## Database Schema

### Users
```json
{
  "id": 1,
  "email": "john@example.com",
  "password": "hashed_password",
  "username": "john_doe",
  "avatar": "url_to_avatar",
  "displayName": "John Doe",
  "bio": "User bio",
  "createdAt": "2026-01-18T08:30:00Z",
  "theme": "light"
}
```

### Posts
```json
{
  "id": 1,
  "title": "Post Title",
  "content": "Post content",
  "authorId": 1,
  "author": {
    "id": 1,
    "username": "john_doe",
    "displayName": "John Doe",
    "avatar": "url"
  },
  "createdAt": "2026-01-18T08:30:00Z",
  "updatedAt": "2026-01-18T08:30:00Z",
  "likes": 24,
  "likedBy": [2, 3, 4, 5],
  "commentCount": 5,
  "tags": ["React", "Query"],
  "views": 156
}
```

### Comments
```json
{
  "id": 1,
  "postId": 1,
  "parentCommentId": null,
  "authorId": 2,
  "author": {
    "id": 2,
    "username": "jane_smith",
    "displayName": "Jane Smith",
    "avatar": "url"
  },
  "content": "Comment text",
  "createdAt": "2026-01-18T09:15:00Z",
  "updatedAt": "2026-01-18T09:15:00Z",
  "likes": 8,
  "likedBy": [1, 3],
  "replies": 1
}
```

### Likes
```json
{
  "id": 1,
  "userId": 2,
  "postId": 1,
  "type": "post"
}
```

## Test Credentials

### Pre-seeded Users:
- Email: `john@example.com` | Username: `john_doe`
- Email: `jane@example.com` | Username: `jane_smith`
- Email: `alex@example.com` | Username: `alex_developer`
- Email: `sarah@example.com` | Username: `sarah_tech`
- Email: `mike@example.com` | Username: `mike_coder`

All passwords are hashed with bcrypt. You can register new users via the `/auth/signup` endpoint.

## Query Examples

### Pagination
```
GET /posts?_page=1&_limit=10
```

### Sorting
```
GET /posts?_sort=createdAt&_order=desc
```

### Full-text Search
```
GET /posts?q=React
```

### Multiple Filters
```
GET /comments?postId=1&parentCommentId=null
```

### Nested Resources
```
GET /posts/1?_embed=comments
GET /users/1?_embed=posts
```

## Frontend Integration Notes

### React Query Integration
When using React Query with this backend:

```javascript
// Fetching posts with React Query
const { data: posts } = useQuery(['posts'], () => 
  fetch('/api/posts').then(res => res.json())
);

// Mutating data
const mutation = useMutation(newPost => 
  fetch('/api/posts', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}` },
    body: JSON.stringify(newPost)
  })
);
```

### Redux Toolkit Integration
For Redux actions, dispatch API calls that interact with these endpoints:

```javascript
// Create async thunk for fetching posts
export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async () => {
    const response = await fetch('/api/posts');
    return response.json();
  }
);
```

### Context API for User/Theme
Use Context to store the JWT token from login and pass it to API calls:

```javascript
// UserContext
const UserContext = createContext();

// Use token in API calls
const token = useContext(UserContext).token;
```

## Performance Optimization

### Lazy Load Comments
```
GET /posts/:id
GET /comments?postId=:id (load separately)
```

### Pagination for Feed
```
GET /posts?_page=1&_limit=20
```

### Image Lazy Loading
Avatar URLs can be lazy loaded using intersection observer in the frontend.

## License

MIT
