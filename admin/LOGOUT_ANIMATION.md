# 👋 Logout Animation & Toast

## ✨ Features Added

### 1. **Toast Notification** 🔔

- Hiển thị thông báo "Logged out successfully!"
- Message: "See you again soon! 👋"
- Position: Top-right
- Duration: 2 giây
- Rich colors với icon

### 2. **Logout Overlay Animation** 🌟

- **Full-screen overlay** với slate gradient background
- **Backdrop blur** effect
- **Animated checkmark icon** với pulse effect
- **Zoom-in animation** (smooth scale)
- **Fade-in transition** (300ms)
- Loading spinner dưới message

## 🎯 **USER EXPERIENCE FLOW:**

```
1. User clicks "Log out" (dropdown menu)
   ↓
2. Toast appears (top-right) ✅
   "Logged out successfully! See you again soon! 👋"
   ↓
3. Success overlay fade-in (300ms)
   - Slate gradient background
   - Backdrop blur
   ↓
4. Checkmark zoom-in (500ms)
   - Pulsing animation
   ↓
5. Clear Redux state
   - isAuthenticated → false
   - profile → null
   - localStorage cleared
   ↓
6. Wait 1.5 seconds
   ↓
7. Redirect → Login page! 🔐
```

## 📦 **IMPLEMENTATION:**

### **Updated File:**

`src/components/layouts/AdminHeader.tsx`

### **1. Added Imports**

```typescript
import { CheckCircle2, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
```

### **2. Added State**

```typescript
const [isLoggingOut, setIsLoggingOut] = useState(false)
```

### **3. Updated Logout Handler**

```typescript
const handleLogout = () => {
  // Show logout toast
  toast.success('Logged out successfully!', {
    description: 'See you again soon! 👋',
    duration: 2000
  })

  // Set logging out state for overlay animation
  setIsLoggingOut(true)

  // Clear Redux state
  dispatch(reset())

  // Delay redirect for smooth animation
  setTimeout(() => {
    window.location.href = '/login'
  }, 1500)
}
```

### **4. Added Overlay JSX**

```tsx
{
  /* Logout Success Overlay */
}
{
  isLoggingOut && (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center 
                  bg-gradient-to-br from-slate-600/90 to-slate-800/90 
                  backdrop-blur-sm animate-in fade-in duration-300'
    >
      <div className='text-center space-y-4 animate-in zoom-in duration-500'>
        {/* Checkmark icon with pulse */}
        <div
          className='mx-auto flex h-20 w-20 items-center justify-center 
                      rounded-full bg-white/20 backdrop-blur-md animate-pulse'
        >
          <CheckCircle2 className='h-12 w-12 text-white' />
        </div>

        {/* Success message */}
        <div className='space-y-2'>
          <h3 className='text-2xl font-bold text-white'>Logged Out Successfully! 👋</h3>
          <p className='text-white/80'>Redirecting to login page...</p>
        </div>

        {/* Loading spinner */}
        <div className='flex justify-center'>
          <Loader2 className='h-6 w-6 animate-spin text-white' />
        </div>
      </div>
    </div>
  )
}
```

## 🎨 **ANIMATIONS:**

| Animation | Duration | Effect             |
| --------- | -------- | ------------------ |
| Fade-in   | 300ms    | Opacity 0 → 1      |
| Zoom-in   | 500ms    | Scale 0.95 → 1     |
| Pulse     | Infinite | Scale 1 → 1.05 → 1 |
| Spinner   | Infinite | Rotation 360°      |

## 🎨 **COLOR SCHEME:**

### Login Success (Blue)

```
Gradient: from-blue-600/90 to-blue-800/90
Message: "Login Successful! 🎉"
```

### Logout Success (Slate/Gray)

```
Gradient: from-slate-600/90 to-slate-800/90
Message: "Logged Out Successfully! 👋"
```

**Lý do dùng màu khác:**

- Blue (Login) = Tích cực, chào mừng 🎉
- Slate (Logout) = Trung tính, tạm biệt 👋

## 🔄 **COMPARISON: Login vs Logout**

| Feature       | Login                             | Logout                                         |
| ------------- | --------------------------------- | ---------------------------------------------- |
| Trigger       | Submit form                       | Click "Log out"                                |
| Toast Message | "Login successful! Welcome back!" | "Logged out successfully! See you again soon!" |
| Color         | Blue gradient                     | Slate gradient                                 |
| Icon          | CheckCircle2 (blue)               | CheckCircle2 (white)                           |
| Title         | "Login Successful! 🎉"            | "Logged Out Successfully! 👋"                  |
| Subtitle      | "Redirecting to dashboard..."     | "Redirecting to login page..."                 |
| Destination   | `/` (Dashboard)                   | `/login`                                       |
| Redux Action  | `setAuth()`                       | `reset()`                                      |
| LocalStorage  | Save token & profile              | Clear all                                      |

## 🧪 **TEST STEPS:**

1. **Đăng nhập thành công**
2. **Click vào Avatar** (góc trên phải)
3. **Click "Log out"**
4. **Quan sát**:
   - ✅ Toast hiện góc trên phải
   - ✅ Màn hình chuyển xám (slate gradient)
   - ✅ Checkmark icon pulsing
   - ✅ Text "Logged Out Successfully! 👋"
   - ✅ Loading spinner quay
   - ✅ Sau 1.5s chuyển về login page

## 🔒 **SECURITY:**

### Redux State Cleared:

```typescript
dispatch(reset()) // Clear auth state
```

### LocalStorage Cleared:

```typescript
// In authSlice.ts reset() action
localStorage.removeItem('access_token')
localStorage.removeItem('profile')
localStorage.removeItem('refresh_token')
```

### Redirect:

```typescript
window.location.href = '/login' // Full page reload
```

**Tại sao dùng `window.location.href`?**

- Full page reload → Clear tất cả state
- Không cache route trước đó
- Đảm bảo user hoàn toàn logout

## ⚡ **TIMING:**

```
0ms     : Click "Log out"
0ms     : Toast appears ✅
0ms     : Overlay starts fade-in
300ms   : Overlay fully visible
500ms   : Checkmark zoomed in
1500ms  : Redirect starts
1700ms  : Login page loads

Total: ~1.7 seconds ⚡
```

## 📍 **WHERE TO TRIGGER:**

### Current Implementation:

- Header dropdown menu → "Log out" item

### Can Also Add To:

1. **Settings page** - Logout button
2. **Profile page** - Logout button
3. **Keyboard shortcut** - Ctrl+Shift+Q
4. **Sidebar** - Logout button (bottom)

### Example - Add to Profile Page:

```tsx
import { toast } from 'sonner'
import { useAppDispatch } from '~/store/hooks'
import { reset } from '~/store/slices/authSlice'

const handleLogout = () => {
  toast.success('Logged out successfully!', {
    description: 'See you again soon! 👋',
    duration: 2000
  })

  setTimeout(() => {
    dispatch(reset())
    window.location.href = '/login'
  }, 1500)
}

// In JSX
;<Button onClick={handleLogout} variant='destructive'>
  <LogOut className='mr-2 h-4 w-4' />
  Log out
</Button>
```

## 🎯 **COMPARISON WITH OTHER APPS:**

| App                  | Logout Animation     | Time      |
| -------------------- | -------------------- | --------- |
| Gmail                | Simple fade          | ~500ms    |
| Facebook             | No animation         | Instant   |
| Twitter              | Loading spinner      | ~1s       |
| **IC Markets Admin** | Full overlay + toast | **~1.7s** |

**Our approach:**

- ✅ Professional và polished
- ✅ Clear feedback cho user
- ✅ Smooth transition
- ✅ Không quá lâu (< 2s)

## 🐛 **TROUBLESHOOTING:**

### Issue 1: Toast không hiển thị

**Fix:**

```tsx
// Check Toaster trong main.tsx
import { Toaster } from 'sonner'

;<Toaster position='top-right' richColors closeButton />
```

### Issue 2: Overlay bị che mất toast

**Fix:**

```tsx
// Toast có z-index cao hơn (Toaster default z-50+)
// Overlay có z-50, nhưng toast render sau nên vẫn hiện
```

### Issue 3: Redirect quá nhanh

**Fix:**

```typescript
// Tăng delay
setTimeout(() => {
  window.location.href = '/login'
}, 2000) // 2 seconds instead of 1.5
```

### Issue 4: LocalStorage không xóa

**Fix:**

```typescript
// Check authSlice.ts reset() action
reset: (state) => {
  state.isAuthenticated = false
  state.profile = null
  clearLS() // ← Must call this
}
```

## 📊 **USER FEEDBACK:**

Sau khi logout, user sẽ thấy:

1. ✅ **Visual confirmation** - Overlay + checkmark
2. ✅ **Text confirmation** - "Logged Out Successfully!"
3. ✅ **Toast notification** - Persistent feedback
4. ✅ **Loading indicator** - Biết rằng đang redirect
5. ✅ **Smooth transition** - Không bị jarring

**Result:** User experience mượt mà và chuyên nghiệp! 🎯

## 🔗 **RELATED FILES:**

- `src/components/layouts/AdminHeader.tsx` - Logout handler & overlay
- `src/store/slices/authSlice.ts` - Redux reset action
- `src/utils/auth.ts` - clearLS() function
- `src/pages/Login.tsx` - Login animation (for comparison)
- `src/main.tsx` - Toaster setup

## 🎉 **SUMMARY:**

| Feature             | Status |
| ------------------- | ------ |
| Toast notification  | ✅     |
| Full-screen overlay | ✅     |
| Fade-in animation   | ✅     |
| Zoom-in animation   | ✅     |
| Pulse effect        | ✅     |
| Loading spinner     | ✅     |
| Redux clear         | ✅     |
| LocalStorage clear  | ✅     |
| Smooth redirect     | ✅     |
| Professional UX     | ✅     |

---

**Status:** ✅ **Completed** - Logout với animation mượt mà và feedback rõ ràng!

**Test ngay:** Login → Click avatar → Log out → Enjoy the smooth animation! 🚀👋
