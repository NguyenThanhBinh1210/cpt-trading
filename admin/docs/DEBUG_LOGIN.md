# 🐛 Debug Login Redirect Issue

## 📋 Checklist để kiểm tra

### 1. Mở Browser Console (F12)
Khi bạn đăng nhập, bạn phải thấy các console logs sau theo đúng thứ tự:

```
✅ Login response: { success: true, data: {...} }
✅ Mapped profile: { id, email, name, ... }
✅ Redux updated successfully
✅ Token saved: eyJhbGciOiJIUzI1...
✅ Profile saved: { ... }
🔄 Redirecting to dashboard...
```

**Nếu KHÔNG thấy logs trên:**
- ❌ API call thất bại
- ❌ Response format không đúng
- ❌ Code không chạy đến đoạn đó

### 2. Kiểm tra Network Tab
1. Mở DevTools > Network
2. Đăng nhập
3. Tìm request `POST /auth/login`
4. Click vào request đó
5. Xem Response tab

**Response phải có format:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "...",
      "username": "...",
      "email": "...",
      "name": "...",
      "role": "..."
    },
    "token": "..."
  }
}
```

**Nếu response khác format này:**
- ❌ API không đúng format
- 🔧 Cần update code để map đúng response structure

### 3. Kiểm tra localStorage
Sau khi login, mở Console và chạy:

```javascript
console.log('Token:', localStorage.getItem('access_token'))
console.log('Profile:', localStorage.getItem('profile'))
console.log('Profile parsed:', JSON.parse(localStorage.getItem('profile')))
```

**Phải thấy:**
- ✅ access_token: string dài (JWT token)
- ✅ profile: JSON string với user data

**Nếu null hoặc undefined:**
- ❌ Không save được vào localStorage
- ❌ Code không chạy đến saveAccessTokenToLS()

### 4. Kiểm tra Redux State
Mở Console và chạy:

```javascript
// Check Redux state (nếu có Redux DevTools)
// Hoặc thêm console.log trong ProtectedRoute
```

Trong ProtectedRoute, bạn sẽ thấy logs:
```
🛡️ ProtectedRoute check: { isAuthenticated: true, path: "/" }
✅ Authenticated, rendering protected content
```

**Nếu isAuthenticated: false:**
- ❌ Redux không update được
- ❌ dispatch(setAuth) không hoạt động

### 5. Kiểm tra URL
Sau khi click "Sign in":

**URL phải chuyển từ:**
```
http://localhost:5173/login
```

**Sang:**
```
http://localhost:5173/
```

**Nếu URL không đổi:**
- ❌ window.location.href không hoạt động
- ❌ Có error trong JavaScript

### 6. Kiểm tra Console Errors
Xem có error màu đỏ trong Console không?

**Common errors:**
- CORS error → API server chưa enable CORS
- Network error → API server không chạy
- 401/403 → Credentials sai
- TypeError → Code lỗi

## 🔧 Các Solution dựa trên triệu chứng

### Triệu chứng 1: API call thành công nhưng không redirect

**Kiểm tra:**
```javascript
// Trong src/pages/Login.tsx, line ~58
console.log('API Response:', response)
console.log('Success?', response.success)
console.log('Has data?', response.data)
```

**Nếu response.success = false hoặc response.data = null:**
```typescript
// Fix: Check API response structure
if (response && response.data) {  // Thêm check response
  // ... existing code
}
```

### Triệu chứng 2: Redux dispatch không hoạt động

**Kiểm tra:**
```javascript
// Check Redux store
import { store } from './store'
console.log('Redux State:', store.getState())
```

**Fix:**
```typescript
// Đảm bảo Provider được wrap đúng trong main.tsx
<Provider store={store}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
</Provider>
```

### Triệu chứng 3: window.location.href không redirect

**Try alternative:**
```typescript
// Option 1: Use navigate with location reload
navigate('/')
window.location.reload()

// Option 2: Use href with full URL
window.location.href = window.location.origin + '/'

// Option 3: Use replace
window.location.replace('/')
```

### Triệu chứng 4: API response format khác

**Nếu API trả về format khác, cần update code:**

```typescript
// VÍ DỤ: Nếu API trả về:
{
  "status": "success",
  "result": {
    "userInfo": { ... },
    "accessToken": "..."
  }
}

// Update Login.tsx:
if (response.status === 'success' && response.result) {
  const profile = {
    id: response.result.userInfo.id,
    email: response.result.userInfo.email,
    // ... map fields
  }
  
  saveAccessTokenToLS(response.result.accessToken)
  // ...
}
```

## 🧪 Manual Test Steps

1. **Clear all data first:**
```javascript
localStorage.clear()
// Reload page (F5)
```

2. **Go to login page:**
```
http://localhost:5173/login
```

3. **Open Console (F12)**

4. **Enter credentials and login**

5. **Watch console logs carefully**

6. **Check if URL changes**

7. **Check localStorage**

8. **If redirected, check if Dashboard renders**

## 🎯 Expected Console Output

```
📝 Not authenticated, showing login form
(User enters credentials and clicks Sign in)
✅ Login response: { success: true, data: {...} }
✅ Mapped profile: { id: "1", email: "...", ... }
✅ Redux updated successfully
✅ Token saved: eyJhbG...
✅ Profile saved: { ... }
🔄 Redirecting to dashboard...
(Page reloads)
🛡️ ProtectedRoute check: { isAuthenticated: true, path: "/" }
✅ Authenticated, rendering protected content
```

## 📸 Screenshot Checklist

Please share screenshots of:
1. ✅ Console logs when you login
2. ✅ Network tab showing API request/response
3. ✅ Console showing localStorage contents
4. ✅ Any red errors in console
5. ✅ URL bar before and after login

## 🚨 Common Issues

### Issue 1: CORS Error
```
Access to fetch at 'https://api.everyorders.com/api/v1/auth/login' 
from origin 'http://localhost:5173' has been blocked by CORS policy
```

**Solution:** Contact API provider to enable CORS for localhost:5173

### Issue 2: 401 Unauthorized
```
POST /auth/login 401 (Unauthorized)
```

**Solution:** 
- Check credentials are correct
- Check API endpoint is correct
- Check request body format

### Issue 3: Network Error
```
AxiosError: Network Error
```

**Solution:**
- Check internet connection
- Check API server is running
- Check API URL is correct

### Issue 4: Response format mismatch
```
Cannot read property 'user' of undefined
```

**Solution:**
- Check API response structure
- Update code to match actual API response

## 💡 Quick Fixes to Try

### Fix 1: Simple redirect after delay
```typescript
// In Login.tsx, replace redirect code with:
setTimeout(() => {
  window.location.replace('/')
}, 500)
```

### Fix 2: Use navigate with force reload
```typescript
navigate('/')
setTimeout(() => {
  window.location.reload()
}, 100)
```

### Fix 3: Manual redirect button (temporary)
```typescript
// Add after successful login:
setError('Login successful! Redirecting...')
setTimeout(() => {
  window.location.href = '/'
}, 1000)
```

## 📞 Need Help?

Please provide:
1. Console logs (all of them)
2. Network tab screenshot (API response)
3. localStorage contents
4. Any error messages
5. Browser and version

This will help identify the exact issue!

