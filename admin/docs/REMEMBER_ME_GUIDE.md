# 🔐 Remember Me Feature Guide

## ✨ Overview

Chức năng "Remember Me" cho phép user chọn có muốn duy trì đăng nhập hay không:
- ✅ **Checked**: Token lưu vào `localStorage` (persistent - giữ mãi)
- ❌ **Unchecked**: Token lưu vào `sessionStorage` (temporary - xóa khi đóng browser)

## 🎯 How It Works

### 1. **Remember Me = TRUE (Checked)**
```typescript
// Token được lưu vào localStorage
localStorage.setItem('access_token', token)
localStorage.setItem('profile', JSON.stringify(profile))

// Token sẽ tồn tại cho đến khi:
// - User logout
// - User xóa browser data
// - Token expired (server-side)
```

**Behavior:**
- ✅ Đóng browser → Vẫn đăng nhập
- ✅ Restart máy tính → Vẫn đăng nhập
- ✅ Mở tab mới → Vẫn đăng nhập
- ✅ Persistent across browser sessions

### 2. **Remember Me = FALSE (Unchecked)**
```typescript
// Token được lưu vào sessionStorage
sessionStorage.setItem('access_token', token)
sessionStorage.setItem('profile', JSON.stringify(profile))

// Token sẽ bị xóa khi:
// - Đóng tab/browser
// - User logout
```

**Behavior:**
- ❌ Đóng browser → Phải đăng nhập lại
- ❌ Restart máy tính → Phải đăng nhập lại
- ✅ Mở tab mới (cùng browser session) → Vẫn đăng nhập
- ❌ Not persistent across browser sessions

## 📦 Implementation

### **1. Updated `src/utils/auth.ts`**

#### **New Functions:**
```typescript
// Save token based on rememberMe
export const saveAccessToken = (
  access_token: string, 
  rememberMe: boolean = true
) => {
  if (rememberMe) {
    localStorage.setItem('access_token', access_token)
    sessionStorage.removeItem('access_token')
  } else {
    sessionStorage.setItem('access_token', access_token)
    localStorage.removeItem('access_token')
  }
}

// Save profile based on rememberMe
export const saveProfile = (
  profile: Profile, 
  rememberMe: boolean = true
) => {
  if (rememberMe) {
    localStorage.setItem('profile', JSON.stringify(profile))
    sessionStorage.removeItem('profile')
  } else {
    sessionStorage.setItem('profile', JSON.stringify(profile))
    localStorage.removeItem('profile')
  }
}

// Get token from either storage
export const getAccessTokenFromLS = () => {
  return localStorage.getItem('access_token') || 
         sessionStorage.getItem('access_token') || 
         ''
}

// Get profile from either storage
export const getProfileFromLS = (): Profile | null => {
  const result = localStorage.getItem('profile') || 
                 sessionStorage.getItem('profile')
  return result ? JSON.parse(result) : null
}
```

#### **Updated Clear Function:**
```typescript
// Clear both storages
export const clearLS = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('profile')
  localStorage.removeItem('refresh_token')
  sessionStorage.removeItem('access_token')
  sessionStorage.removeItem('profile')
  sessionStorage.removeItem('refresh_token')
}
```

### **2. Updated `src/pages/Login.tsx`**

#### **Save Based on Remember Me:**
```typescript
const [rememberMe, setRememberMe] = useState(false)

const onSubmit = async (data: LoginFormData) => {
  // ... API call ...
  
  if (response.ok && response.user && response.token) {
    // Save based on rememberMe
    if (rememberMe) {
      console.log('🟡 Saving to localStorage (persistent)...')
      saveAccessToken(response.token, true)
      saveProfile(profile, true)
      if (response.refreshToken) {
        setRefreshTokenToLS(response.refreshToken, true)
      }
    } else {
      console.log('🟡 Saving to sessionStorage (temporary)...')
      saveAccessToken(response.token, false)
      saveProfile(profile, false)
      if (response.refreshToken) {
        setRefreshTokenToLS(response.refreshToken, false)
      }
    }
    
    // Show toast with remember info
    toast.success('Login successful!', {
      description: rememberMe
        ? `Welcome back, ${profile.name}! 🎉 (Stay signed in)`
        : `Welcome back, ${profile.name}! 🎉`,
      duration: 2000
    })
  }
}
```

#### **Remember Me Checkbox:**
```tsx
<div className='flex items-center space-x-2'>
  <Checkbox
    id='remember'
    checked={rememberMe}
    onCheckedChange={(checked) => setRememberMe(checked as boolean)}
    disabled={isLoading}
  />
  <Label htmlFor='remember' className='text-sm font-normal cursor-pointer'>
    Remember me
  </Label>
</div>
```

### **3. Redux Init State (Automatic)**

Redux authSlice already checks both storages:

```typescript
// src/store/slices/authSlice.ts
const initialState: AuthState = {
  isAuthenticated: Boolean(getAccessTokenFromLS()), // ← Checks both
  profile: getProfileFromLS() // ← Checks both
}
```

## 🔄 User Flow

### **Flow 1: Remember Me Checked ✅**
```
1. User login with Remember Me checked
   ↓
2. Token saved to localStorage
   ↓
3. User closes browser
   ↓
4. User opens browser again
   ↓
5. Redux checks: getAccessTokenFromLS()
   ↓
6. Found token in localStorage ✅
   ↓
7. User is automatically logged in!
```

### **Flow 2: Remember Me Unchecked ❌**
```
1. User login without Remember Me
   ↓
2. Token saved to sessionStorage
   ↓
3. User closes browser
   ↓
4. sessionStorage is cleared by browser
   ↓
5. User opens browser again
   ↓
6. Redux checks: getAccessTokenFromLS()
   ↓
7. No token found ❌
   ↓
8. User must login again
```

## 🧪 Testing

### **Test Case 1: Remember Me Checked**

1. **Login:**
   ```
   ☑️ Check "Remember me"
   Enter credentials
   Click "Sign in"
   ```

2. **Verify Storage:**
   ```javascript
   // In browser console
   console.log('localStorage:', localStorage.getItem('access_token'))
   // Should have token ✅
   
   console.log('sessionStorage:', sessionStorage.getItem('access_token'))
   // Should be null ✅
   ```

3. **Test Persistence:**
   ```
   Close all browser windows
   Open browser again
   Navigate to admin URL
   → Should stay logged in ✅
   ```

### **Test Case 2: Remember Me Unchecked**

1. **Login:**
   ```
   ☐ Uncheck "Remember me"
   Enter credentials
   Click "Sign in"
   ```

2. **Verify Storage:**
   ```javascript
   // In browser console
   console.log('localStorage:', localStorage.getItem('access_token'))
   // Should be null ✅
   
   console.log('sessionStorage:', sessionStorage.getItem('access_token'))
   // Should have token ✅
   ```

3. **Test Temporary:**
   ```
   Close browser
   Open browser again
   Navigate to admin URL
   → Should be logged out, redirect to /login ✅
   ```

### **Test Case 3: Switch During Login**

1. **Login with Remember Me:**
   ```
   ☑️ Check "Remember me"
   Login
   Logout
   ```

2. **Login without Remember Me:**
   ```
   ☐ Uncheck "Remember me"
   Login again
   ```

3. **Verify:**
   ```javascript
   // Old localStorage token should be removed
   console.log('localStorage:', localStorage.getItem('access_token'))
   // null ✅
   
   // New sessionStorage token should exist
   console.log('sessionStorage:', sessionStorage.getItem('access_token'))
   // Has token ✅
   ```

## 🔒 Security Considerations

### **localStorage (Remember Me)**

**Pros:**
- ✅ Persistent across browser sessions
- ✅ Better UX for frequent users

**Cons:**
- ⚠️ Token persists until manually cleared
- ⚠️ Vulnerable if computer is shared
- ⚠️ Accessible by any JavaScript (XSS risk)

**Best Practices:**
- Use short-lived tokens (e.g., 7 days)
- Implement refresh token rotation
- Add "Last activity" check
- Warn users on shared computers

### **sessionStorage (No Remember Me)**

**Pros:**
- ✅ Auto-cleared when browser closes
- ✅ More secure for shared computers
- ✅ Better for public computers

**Cons:**
- ❌ User must login again after closing browser
- ❌ Lost if browser crashes

**Best Practices:**
- Default option for login forms
- Recommended for sensitive operations
- Required for public/shared devices

## 🎨 Toast Messages

### **Remember Me = TRUE:**
```
✅ Login successful!
Welcome back, John Doe! 🎉 (Stay signed in)
```

### **Remember Me = FALSE:**
```
✅ Login successful!
Welcome back, John Doe! 🎉
```

## 📊 Comparison Table

| Feature | localStorage | sessionStorage |
|---------|--------------|----------------|
| **Persist after close browser** | ✅ Yes | ❌ No |
| **Persist after restart** | ✅ Yes | ❌ No |
| **Share across tabs** | ✅ Yes | ❌ No (same session only) |
| **Manual clear required** | ✅ Yes | ❌ No (auto-clear) |
| **Storage limit** | ~5-10 MB | ~5-10 MB |
| **Security level** | Medium | Higher |
| **Best for** | Frequent users | Public computers |

## 🐛 Troubleshooting

### Issue 1: Token not persisting with Remember Me
**Check:**
```javascript
// Verify localStorage
console.log(localStorage.getItem('access_token'))

// Check if rememberMe is true
console.log('Remember Me:', rememberMe)
```

**Fix:**
- Ensure checkbox is checked
- Verify `saveAccessToken(token, true)` is called
- Check browser allows localStorage

### Issue 2: Token persisting without Remember Me
**Check:**
```javascript
// Should be in sessionStorage only
console.log('localStorage:', localStorage.getItem('access_token'))
console.log('sessionStorage:', sessionStorage.getItem('access_token'))
```

**Fix:**
- Ensure `saveAccessToken(token, false)` is called
- Verify old localStorage is cleared

### Issue 3: Both storages have tokens
**Fix:**
```javascript
// Clear everything and login again
localStorage.clear()
sessionStorage.clear()
// Then login with desired Remember Me option
```

## 📱 Mobile Considerations

### **iOS Safari:**
- ✅ localStorage works
- ✅ sessionStorage works
- ⚠️ sessionStorage may persist longer than expected

### **Chrome Mobile:**
- ✅ Both work as expected
- ✅ Clears sessionStorage on browser close

### **In-App Browsers (Facebook, Instagram):**
- ⚠️ May have restrictions
- ⚠️ Test thoroughly
- 💡 Recommend using "Remember me" for better UX

## 🔗 Related Files

- `src/utils/auth.ts` - Storage functions
- `src/pages/Login.tsx` - Login form with Remember Me
- `src/store/slices/authSlice.ts` - Redux auth state
- `src/components/layouts/AdminHeader.tsx` - Logout (clears both)

## 💡 Best Practices

### **For Users:**
1. **Personal computer:** ✅ Check "Remember me"
2. **Work computer:** Consider security policy
3. **Public computer:** ❌ Never check "Remember me"
4. **Shared computer:** ❌ Never check "Remember me"

### **For Developers:**
1. Always clear both storages on logout
2. Check both storages when getting token
3. Remove old storage when switching
4. Add warning for shared computers
5. Implement token expiration
6. Use HTTPS only
7. Consider implementing refresh tokens

## 🎯 Future Enhancements

### **Potential Improvements:**
1. **Device fingerprinting** - Detect new devices
2. **Location tracking** - Warn on location change
3. **Auto-logout** - After X days of inactivity
4. **Remember device** - Separate from remember me
5. **2FA integration** - Extra security layer
6. **Session management** - View/revoke active sessions
7. **Trust this device** - Skip 2FA for trusted devices

---

**Status:** ✅ **Implemented** - Remember Me feature working perfectly!

**Test it:** Login with/without "Remember me" and close browser to see the difference! 🎯

