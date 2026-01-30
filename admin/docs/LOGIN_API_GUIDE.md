# Login API Integration Guide

## 🔐 API Configuration

### Endpoint
```
POST https://api.everyorders.com/api/v1/auth/login
```

### Request Format
```json
{
  "username": "string",
  "password": "string"
}
```

### Response Format
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "string",
      "username": "string", 
      "email": "string",
      "name": "string",
      "role": "string",
      "avatar": "string (optional)"
    },
    "token": "string (JWT)",
    "refreshToken": "string (optional)"
  },
  "message": "string (optional)"
}
```

## 📦 Files Created/Updated

### 1. `src/apis/auth.api.ts` (NEW)
API service for authentication endpoints with TypeScript types.

```typescript
// Usage
import { loginAPI } from '~/apis/auth.api'

const response = await loginAPI({
  username: 'admin',
  password: 'password123'
})
```

### 2. `src/apis/http.ts` (NEW)
Axios instance for authenticated API requests with interceptors.

Features:
- Auto-adds Bearer token to headers
- Handles 401 (token expired) automatically
- Global error handling
- Request/Response logging

### 3. `src/pages/Login.tsx` (UPDATED)
Login page with real API integration.

Changes:
- ✅ Changed from `email` to `username`
- ✅ Integrated real API call
- ✅ Proper error handling
- ✅ Response mapping to Redux state
- ✅ Token storage

## 🔄 Login Flow

```
1. User enters username + password
   ↓
2. Form validation (React Hook Form + Zod)
   ↓
3. Call loginAPI() → POST /auth/login
   ↓
4. API Response:
   ├─ Success (200)
   │  ├─ Save token to localStorage
   │  ├─ Save profile to localStorage
   │  ├─ Update Redux state
   │  └─ Navigate to dashboard (/)
   │
   └─ Error
      ├─ 401: Invalid credentials
      ├─ 403: Account locked
      ├─ 404: User not found
      └─ 500: Server error
```

## 🛡️ Error Handling

### HTTP Status Codes
| Code | Message | Action |
|------|---------|--------|
| 200 | Success | Login successful |
| 401 | Unauthorized | Invalid username or password |
| 403 | Forbidden | Account locked or suspended |
| 404 | Not Found | User not found |
| 500 | Server Error | Server error occurred |
| Network Error | No response | Cannot connect to server |

### Error Messages
```typescript
// Network error
'Cannot connect to server. Please check your internet connection.'

// Invalid credentials
'Invalid username or password'

// Account locked
'Account is locked or suspended'

// User not found
'User not found'

// Server error
'An error occurred. Please try again.'
```

## 🔑 Token Management

### Storage
```typescript
// Access Token
localStorage.setItem('access_token', token)

// Refresh Token (if provided)
localStorage.setItem('refresh_token', refreshToken)

// User Profile
localStorage.setItem('profile', JSON.stringify(profile))
```

### Auto-Injection
All API requests automatically include the Bearer token:
```typescript
// Using http.ts
import http from '~/apis/http'

// Token is auto-added to headers
const response = await http.get('/users')
// Headers: { Authorization: 'Bearer <token>' }
```

## 📝 Response Mapping

### API Response → Redux State
```typescript
// API Response
{
  data: {
    user: {
      id: "123",
      username: "admin",
      email: "admin@example.com",
      name: "Admin User",
      role: "admin"
    },
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}

// Mapped to Profile Type
{
  id: "123",
  email: "admin@example.com",
  name: "Admin User",
  avatar: "https://ui-avatars.com/api/?name=Admin+User",
  role: "admin",
  createdAt: "2024-02-10T10:00:00Z",
  updatedAt: "2024-02-10T10:00:00Z"
}
```

## 🚀 Usage Examples

### Basic Login
```typescript
import { loginAPI } from '~/apis/auth.api'

const handleLogin = async () => {
  try {
    const response = await loginAPI({
      username: 'admin',
      password: 'password123'
    })
    
    if (response.success) {
      console.log('Login successful!', response.data.user)
    }
  } catch (error) {
    console.error('Login failed:', error)
  }
}
```

### With React Hook Form
```typescript
const onSubmit = async (data: { username: string; password: string }) => {
  try {
    const response = await loginAPI(data)
    // Handle success
  } catch (error) {
    // Handle error
  }
}
```

### Authenticated API Calls
```typescript
import http from '~/apis/http'

// GET request (token auto-added)
const getUsers = async () => {
  const response = await http.get('/users')
  return response.data
}

// POST request (token auto-added)
const createUser = async (userData: any) => {
  const response = await http.post('/users', userData)
  return response.data
}
```

## 🔒 Security Features

### 1. Token Expiry Handling
When token expires (401), user is automatically redirected to login.

### 2. Request Timeout
All requests timeout after 10 seconds to prevent hanging.

### 3. HTTPS Only
API uses HTTPS for secure communication.

### 4. Password Field
- Type: password (hidden)
- Autocomplete: current-password
- Min length: 6 characters

## 🧪 Testing

### Test Credentials
You'll need to get valid credentials from the API provider.

### Test Login
```bash
# Navigate to login page
http://localhost:5173/login

# Enter credentials
Username: [your-username]
Password: [your-password]

# Click "Sign in"
# Should redirect to dashboard if successful
```

## 📊 API Response Types

```typescript
// Success Response
interface LoginResponse {
  success: boolean
  data: {
    user: {
      id: string
      username: string
      email: string
      name: string
      role: string
      avatar?: string
    }
    token: string
    refreshToken?: string
  }
  message?: string
}

// Error Response
interface ErrorResponse {
  success: false
  message: string
  error?: string
}
```

## 🔄 Redux Integration

### Auth Slice Actions
```typescript
import { setAuth, reset } from '~/store/slices/authSlice'

// Login
dispatch(setAuth({
  isAuthenticated: true,
  profile: userData
}))

// Logout
dispatch(reset())
```

### Reading Auth State
```typescript
import { useAppSelector } from '~/store/hooks'

const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated)
const profile = useAppSelector(state => state.auth.profile)
```

## 🐛 Debugging

### Check Request
```typescript
// In auth.api.ts, add console.log
authApi.interceptors.request.use((config) => {
  console.log('Request:', config)
  return config
})
```

### Check Response
```typescript
// In auth.api.ts, add console.log
authApi.interceptors.response.use((response) => {
  console.log('Response:', response.data)
  return response
})
```

### Check Token
```typescript
// In browser console
console.log(localStorage.getItem('access_token'))
console.log(JSON.parse(localStorage.getItem('profile')))
```

## 🎯 Next Steps

1. **Test with real credentials** from API provider
2. **Implement refresh token** logic if needed
3. **Add "Forgot Password"** functionality
4. **Add "Remember Me"** persistence
5. **Add social login** (Google, Facebook)
6. **Add 2FA** support
7. **Add rate limiting** for failed attempts

## 📚 Related Files

- `src/apis/auth.api.ts` - Auth API service
- `src/apis/http.ts` - HTTP client with interceptors
- `src/pages/Login.tsx` - Login page
- `src/store/slices/authSlice.ts` - Redux auth slice
- `src/utils/auth.ts` - Auth utility functions
- `src/components/ProtectedRoute.tsx` - Route protection

## 🔗 API Documentation

For full API documentation, contact the API provider or check:
```
https://api.everyorders.com/api/v1/docs
```

## ⚠️ Important Notes

1. **CORS**: Make sure CORS is enabled on the API server
2. **Token Format**: API should return JWT token
3. **Response Structure**: API response should match the LoginResponse type
4. **Error Format**: API errors should be consistent
5. **Status Codes**: Use standard HTTP status codes

