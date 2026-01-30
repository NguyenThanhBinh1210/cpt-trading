# 🎨 Admin Layout Guide

## 📋 Tổng quan

Admin Layout đã được tạo với các tính năng hiện đại và responsive hoàn toàn, sử dụng **Shadcn UI** components.

## ✨ Tính năng

### 🎯 Core Features:
- ✅ **Responsive Design** - Tự động adapt cho mobile, tablet, và desktop
- ✅ **Collapsible Sidebar** - Thu gọn/mở rộng sidebar trên desktop
- ✅ **Mobile Menu** - Sidebar dạng drawer cho mobile
- ✅ **Dark Mode** - Hỗ trợ chế độ tối/sáng
- ✅ **Notification System** - Dropdown thông báo với badge count
- ✅ **User Profile Menu** - Dropdown menu cho user actions
- ✅ **Search Bar** - Thanh tìm kiếm toàn cục
- ✅ **Navigation Badge** - Hiển thị số lượng items chưa đọc
- ✅ **Smooth Animations** - Transitions mượt mà

### 📦 Components Created:

#### 1. **AdminSidebar** (`src/components/layouts/AdminSidebar.tsx`)
Sidebar với các tính năng:
- Navigation menu với icons
- Active state highlighting
- Badge notifications
- Quick actions section
- Help section ở footer
- Collapsible mode

#### 2. **AdminHeader** (`src/components/layouts/AdminHeader.tsx`)
Header với các tính năng:
- Search bar
- Dark mode toggle
- Notification dropdown
- User profile dropdown
- Mobile menu button

#### 3. **HomeLayout** (`src/layouts/HomeLayout.tsx`)
Main layout wrapper với:
- Desktop sidebar (collapsible)
- Mobile sidebar (sheet/drawer)
- Header bar
- Content area với background

#### 4. **Dashboard** (`src/pages/Dashboard.tsx`)
Demo dashboard page với:
- Stats cards với trend indicators
- Recent orders table
- Overview progress bars
- Activity timeline
- Beautiful charts visualization

## 🎨 Cấu trúc Layout

```
┌─────────────────────────────────────────┐
│              AdminHeader                │
│  [Menu] [Search] [Dark] [Bell] [User]  │
├────────┬────────────────────────────────┤
│        │                                │
│ Admin  │       Main Content             │
│ Side   │                                │
│ bar    │   {children}                   │
│        │                                │
│        │                                │
└────────┴────────────────────────────────┘
```

## 🚀 Sử dụng

### Cấu trúc hiện tại:

Layout đã được áp dụng trong routing:

```tsx
// src/routes/useRouteElements.tsx
{
  path: '/',
  element: (
    <HomeLayout>
      <Dashboard />
    </HomeLayout>
  )
}
```

### Thêm routes mới:

```tsx
// Thêm route mới sử dụng admin layout
{
  path: '/users',
  element: (
    <HomeLayout>
      <UsersPage />
    </HomeLayout>
  )
}
```

## 🎯 Customization

### 1. Thay đổi Navigation Menu

Chỉnh sửa `navigationItems` trong `AdminSidebar.tsx`:

```tsx
const navigationItems = [
  {
    title: 'Your Page',
    href: '/your-page',
    icon: YourIcon,
    badge: '5' // optional
  },
  // ... more items
]
```

### 2. Thay đổi Logo

Trong `AdminSidebar.tsx`:

```tsx
<Link to='/' className='flex items-center gap-2 font-semibold'>
  <img src='/your-logo.png' alt='Logo' />
  <span className='text-lg'>Your Brand</span>
</Link>
```

### 3. Custom Colors

Chỉnh sửa CSS variables trong `src/styles/index.css`:

```css
:root {
  --primary: 222.2 47.4% 11.2%;
  --secondary: 210 40% 96.1%;
  /* ... more colors */
}
```

### 4. Sidebar Width

Trong `AdminSidebar.tsx`:

```tsx
className={cn(
  'relative flex h-screen flex-col border-r bg-card transition-all duration-300',
  collapsed ? 'w-16' : 'w-80' // Thay đổi từ w-64 thành w-80
)}
```

### 5. Thêm Footer

Trong `HomeLayout.tsx`:

```tsx
<main className='flex-1 overflow-y-auto bg-muted/40'>
  <div className='min-h-full p-4 md:p-6 lg:p-8'>
    {children}
  </div>
  <footer className='border-t p-4'>
    <p className='text-center text-sm text-muted-foreground'>
      © 2025 Your Company. All rights reserved.
    </p>
  </footer>
</main>
```

## 🎨 Tính năng nâng cao

### Dark Mode Persistent

Thêm localStorage để lưu trữ theme preference:

```tsx
// src/components/layouts/AdminHeader.tsx

const [isDarkMode, setIsDarkMode] = useState(() => {
  return localStorage.getItem('theme') === 'dark'
})

const toggleDarkMode = () => {
  const newMode = !isDarkMode
  setIsDarkMode(newMode)
  document.documentElement.classList.toggle('dark')
  localStorage.setItem('theme', newMode ? 'dark' : 'light')
}

// Trong useEffect
useEffect(() => {
  if (isDarkMode) {
    document.documentElement.classList.add('dark')
  }
}, [])
```

### Notification Real-time

Tích hợp với API hoặc WebSocket:

```tsx
const [notifications, setNotifications] = useState([])

useEffect(() => {
  // Fetch notifications from API
  fetchNotifications().then(setNotifications)
  
  // Or setup WebSocket
  const ws = new WebSocket('ws://your-api.com')
  ws.onmessage = (event) => {
    const newNotification = JSON.parse(event.data)
    setNotifications(prev => [newNotification, ...prev])
  }
}, [])
```

### User Authentication

Tích hợp với auth system:

```tsx
// src/components/layouts/AdminHeader.tsx
import { useAuth } from '~/contexts/auth.context'

const AdminHeader = () => {
  const { user, logout } = useAuth()
  
  return (
    // ... existing code
    <DropdownMenuLabel>
      <div className='flex flex-col space-y-1'>
        <p className='text-sm font-medium'>{user.name}</p>
        <p className='text-xs text-muted-foreground'>{user.email}</p>
      </div>
    </DropdownMenuLabel>
    // ... logout button với onClick={logout}
  )
}
```

### Breadcrumbs

Thêm breadcrumbs vào header:

```tsx
// src/components/layouts/Breadcrumb.tsx
import { Link, useLocation } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

export default function Breadcrumb() {
  const location = useLocation()
  const paths = location.pathname.split('/').filter(Boolean)
  
  return (
    <nav className='flex items-center space-x-1 text-sm'>
      <Link to='/' className='hover:text-foreground'>Home</Link>
      {paths.map((path, index) => (
        <div key={path} className='flex items-center'>
          <ChevronRight className='h-4 w-4' />
          <Link 
            to={`/${paths.slice(0, index + 1).join('/')}`}
            className='capitalize hover:text-foreground'
          >
            {path}
          </Link>
        </div>
      ))}
    </nav>
  )
}
```

Thêm vào `AdminHeader.tsx`:

```tsx
<header>
  {/* ... existing code */}
  <Breadcrumb />
</header>
```

## 📱 Responsive Breakpoints

Layout sử dụng Tailwind breakpoints:

- **Mobile**: `< 768px` - Full width content, sidebar as drawer
- **Tablet**: `768px - 1024px` - Sidebar visible, có thể collapse
- **Desktop**: `> 1024px` - Full layout với sidebar expanded

## 🎯 Navigation Icons

Sử dụng icons từ `lucide-react`:

```tsx
import { 
  Home, 
  Users, 
  Settings,
  // ... more icons
} from 'lucide-react'
```

Xem tất cả icons tại: https://lucide.dev

## 🔧 Troubleshooting

### Sidebar không hiển thị trên mobile:
- Kiểm tra `Sheet` component được import đúng
- Xem console để check lỗi

### Dark mode không hoạt động:
- Đảm bảo `tailwind.config.js` có `darkMode: ['class']`
- Kiểm tra CSS variables trong `index.css`

### Navigation không highlight đúng:
- Kiểm tra `useLocation()` hook
- So sánh `location.pathname` với `item.href`

### Icons không hiển thị:
- Đảm bảo đã cài `lucide-react`
- Import đúng tên icon

## 📚 Tài liệu tham khảo

- [Shadcn UI](https://ui.shadcn.com)
- [Lucide Icons](https://lucide.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [React Router](https://reactrouter.com)

## 🎨 Preview

### Desktop View:
- Sidebar: 256px (có thể collapse thành 64px)
- Header: 64px height
- Content: Flexible với padding

### Mobile View:
- Full width content
- Hamburger menu button
- Sidebar as drawer (Sheet)

---

Chúc bạn xây dựng admin panel tuyệt vời! 🚀

