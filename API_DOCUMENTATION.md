# API Documentation

## Base URL
```
http://localhost:3001
```

## Authentication

All authenticated endpoints require the `Authorization` header:
```
Authorization: Bearer {jwt-token}
```

Get token from login/signup response and store in localStorage.

---

## Authentication Endpoints

### Login
**POST** `/login`

Request:
```json
{
  "email": "jane@example.com",
  "password": "password123"
}
```

Response (200):
```json
{
  "user": {
    "id": 2,
    "email": "jane@example.com",
    "username": "jane_smith",
    "displayName": "Jane Smith",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=jane_smith",
    "bio": "Full-stack developer",
    "theme": "dark",
    "createdAt": "2025-11-15T14:30:00Z"
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### Signup
**POST** `/signup`

Request:
```json
{
  "email": "newuser@example.com",
  "password": "password123",
  "username": "newuser",
  "displayName": "New User",
  "bio": "User bio (optional)",
  "theme": "light"
}
```

Response (201):
```json
{
  "user": {
    "id": 6,
    "email": "newuser@example.com",
    "username": "newuser",
    "displayName": "New User",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=newuser",
    "bio": "User bio",
    "theme": "light",
    "createdAt": "2026-02-02T12:00:00Z"
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

## Posts Endpoints

### Get All Posts (Paginated)
**GET** `/posts?_page=1&_limit=10&_sort=-createdAt`

Query Parameters:
- `_page` - Page number (default: 1)
- `_limit` - Posts per page (default: 10)
- `_sort` - Sort field (use `-` for descending)

Response (200):
```json
[
  {
    "id": 1,
    "title": "Getting started with React Query",
    "content": "React Query is a powerful library...",
    "authorId": 1,
    "author": {
      "id": 1,
      "username": "john_doe",
      "displayName": "John Doe",
      "avatar": "https://..."
    },
    "createdAt": "2026-01-18T08:30:00Z",
    "updatedAt": "2026-01-18T08:30:00Z",
    "likes": 24,
    "likedBy": [2, 3, 4, 5],
    "commentCount": 5,
    "tags": ["React", "React-Query"],
    "views": 156
  }
]
```

---

### Get Single Post
**GET** `/posts/:id`

Response (200):
```json
{
  "id": 1,
  "title": "Post title",
  "content": "Full post content...",
  "authorId": 1,
  "author": { /* author object */ },
  "createdAt": "2026-01-18T08:30:00Z",
  "updatedAt": "2026-01-18T08:30:00Z",
  "likes": 24,
  "likedBy": [2, 3, 4, 5],
  "commentCount": 5,
  "tags": ["tag1", "tag2"],
  "views": 156
}
```

---

### Create Post
**POST** `/posts`

Authorization: Required ✅

Request:
```json
{
  "title": "My first post",
  "content": "This is the content of my post...",
  "authorId": 1,
  "author": {
    "id": 1,
    "username": "john_doe",
    "displayName": "John Doe",
    "avatar": "https://..."
  },
  "createdAt": "2026-02-02T12:00:00Z",
  "updatedAt": "2026-02-02T12:00:00Z",
  "likes": 0,
  "likedBy": [],
  "commentCount": 0,
  "tags": ["react", "javascript"],
  "views": 0
}
```

Response (201):
```json
{
  "id": 10,
  "title": "My first post",
  "content": "This is the content of my post...",
  /* ... rest of post data ... */
}
```

---

### Update Post
**PATCH** `/posts/:id`

Authorization: Required ✅

Request (Example - Updating likes):
```json
{
  "likes": 25,
  "likedBy": [2, 3, 4, 5, 6]
}
```

Response (200):
```json
{
  "id": 1,
  /* ... updated post data ... */
}
```

---

### Delete Post
**DELETE** `/posts/:id`

Authorization: Required ✅

Response (200):
```json
{}
```

---

## Comments Endpoints

### Get Comments for Post
**GET** `/comments?postId=1`

Query Parameters:
- `postId` - Post ID (required)

Response (200):
```json
[
  {
    "id": 1,
    "postId": 1,
    "authorId": 2,
    "author": {
      "id": 2,
      "username": "jane_smith",
      "displayName": "Jane Smith",
      "avatar": "https://..."
    },
    "content": "Great post! Thanks for sharing.",
    "createdAt": "2026-01-19T10:30:00Z",
    "likes": 3,
    "likedBy": [1, 3, 5]
  }
]
```

---

### Create Comment
**POST** `/comments`

Authorization: Required ✅

Request:
```json
{
  "postId": 1,
  "authorId": 2,
  "author": {
    "id": 2,
    "username": "jane_smith",
    "displayName": "Jane Smith",
    "avatar": "https://..."
  },
  "content": "Great post! Thanks for sharing.",
  "createdAt": "2026-01-19T10:30:00Z",
  "likes": 0,
  "likedBy": []
}
```

Response (201):
```json
{
  "id": 5,
  "postId": 1,
  /* ... comment data ... */
}
```

---

### Update Comment
**PATCH** `/comments/:id`

Authorization: Required ✅

Request (Example - Updating likes):
```json
{
  "likes": 4,
  "likedBy": [1, 3, 5, 6]
}
```

Response (200):
```json
{
  "id": 1,
  /* ... updated comment data ... */
}
```

---

### Delete Comment
**DELETE** `/comments/:id`

Authorization: Required ✅

Response (200):
```json
{}
```

---

## Users Endpoints

### Get All Users
**GET** `/users`

Response (200):
```json
[
  {
    "id": 1,
    "email": "john@example.com",
    "username": "john_doe",
    "displayName": "John Doe",
    "avatar": "https://...",
    "bio": "Software developer",
    "theme": "dark",
    "createdAt": "2025-12-01T10:00:00Z"
  }
]
```

---

### Get Single User
**GET** `/users/:id`

Response (200):
```json
{
  "id": 2,
  "email": "jane@example.com",
  "username": "jane_smith",
  "displayName": "Jane Smith",
  "avatar": "https://...",
  "bio": "Full-stack developer",
  "theme": "dark",
  "createdAt": "2025-11-15T14:30:00Z"
}
```

---

### Update User Profile
**PATCH** `/users/:id`

Authorization: Required ✅

Request:
```json
{
  "displayName": "Jane Updated",
  "bio": "Updated bio",
  "theme": "light"
}
```

Response (200):
```json
{
  "id": 2,
  /* ... updated user data ... */
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "error": "Bad request",
  "message": "Invalid input data"
}
```

### 401 Unauthorized
```json
{
  "error": "Unauthorized",
  "message": "Missing or invalid authentication token"
}
```

### 403 Forbidden
```json
{
  "error": "Forbidden",
  "message": "You don't have permission to access this resource"
}
```

### 404 Not Found
```json
{
  "error": "Not found",
  "message": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal server error",
  "message": "Something went wrong"
}
```

---

## Rate Limiting

No rate limiting in development. Production setup recommended.

---

## CORS

CORS is enabled for all origins in development.

---

## Testing Endpoints

### Using cURL

**Login:**
```bash
curl -X POST http://localhost:3001/login \
  -H "Content-Type: application/json" \
  -d '{"email":"jane@example.com","password":"password123"}'
```

**Get Posts:**
```bash
curl http://localhost:3001/posts?_page=1&_limit=10 \
  -H "Authorization: Bearer {token}"
```

**Create Post:**
```bash
curl -X POST http://localhost:3001/posts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {token}" \
  -d '{
    "title":"My Post",
    "content":"Content here...",
    "authorId":2,
    "author":{"id":2,"username":"jane","displayName":"Jane","avatar":"https://..."},
    "createdAt":"2026-02-02T12:00:00Z",
    "updatedAt":"2026-02-02T12:00:00Z",
    "likes":0,
    "likedBy":[],
    "commentCount":0,
    "tags":["react"],
    "views":0
  }'
```

### Using REST Client (VS Code Extension)

See `api.rest` file in project root for pre-built requests.

---

## Response Headers

```
Content-Type: application/json
X-Powered-By: Express
Access-Control-Allow-Origin: *
```

---

## Pagination

### Request Format
```
GET /posts?_page=1&_limit=10&_sort=-createdAt
```

Parameters:
- `_page`: Current page (starts at 1)
- `_limit`: Items per page
- `_sort`: Sort field (use `-` prefix for descending)

### Response Headers
```
X-Total-Count: 25
Link: <http://localhost:3001/posts?_page=2&_limit=10>; rel="next"
```

---

## Data Types

### Post Object
```typescript
{
  id: number
  title: string (max 200 chars)
  content: string (max 5000 chars)
  authorId: number
  author: {
    id: number
    username: string
    displayName: string
    avatar: string (URL)
  }
  createdAt: ISO8601 timestamp
  updatedAt: ISO8601 timestamp
  likes: number
  likedBy: number[] (user IDs)
  commentCount: number
  tags: string[]
  views: number
}
```

### Comment Object
```typescript
{
  id: number
  postId: number
  authorId: number
  author: {
    id: number
    username: string
    displayName: string
    avatar: string (URL)
  }
  content: string (max 1000 chars)
  createdAt: ISO8601 timestamp
  likes: number
  likedBy: number[] (user IDs)
}
```

### User Object
```typescript
{
  id: number
  email: string
  username: string
  displayName: string
  avatar: string (URL)
  bio: string (optional)
  theme: "light" | "dark"
  createdAt: ISO8601 timestamp
}
```

---

## Code Examples

### JavaScript Fetch

**Login:**
```javascript
const response = await fetch('http://localhost:3001/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'jane@example.com',
    password: 'password123'
  })
})
const data = await response.json()
```

**Get Posts:**
```javascript
const response = await fetch('http://localhost:3001/posts?_page=1&_limit=10', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
})
const posts = await response.json()
```

**Create Post:**
```javascript
const response = await fetch('http://localhost:3001/posts', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    title: 'My Post',
    content: 'Content...',
    authorId: userId,
    author: userObject,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    likes: 0,
    likedBy: [],
    commentCount: 0,
    tags: [],
    views: 0
  })
})
const newPost = await response.json()
```

---

## API Implementation in App

See `src/services/api.js` for all API calls used in the application.

---

**Last Updated**: February 2, 2026  
**API Version**: 1.0  
**Status**: ✅ Active
