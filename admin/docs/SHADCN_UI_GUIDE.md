# Hướng dẫn sử dụng Shadcn UI

## 📦 Cài đặt hoàn tất

Dự án của bạn đã được cài đặt Shadcn UI thành công với các cấu hình sau:

### Dependencies đã cài đặt:
- ✅ `class-variance-authority` - Quản lý variants cho components
- ✅ `clsx` - Utility cho className
- ✅ `tailwind-merge` - Merge Tailwind classes
- ✅ `lucide-react` - Icon library
- ✅ `tailwindcss-animate` - Animation plugin

### Components đã có sẵn:
- ✅ Button
- ✅ Card
- ✅ Input
- ✅ Label
- ✅ Dialog
- ✅ Dropdown Menu

## 🎨 Cấu hình

### 1. Path Aliases
Dự án đã được cấu hình với 2 alias:
- `~/*` → `src/*` (alias cũ)
- `@/*` → `src/*` (alias mới cho Shadcn UI)

### 2. CSS Variables
File `src/styles/index.css` đã được cập nhật với các CSS variables cho theme (light/dark mode).

### 3. Tailwind Config
File `tailwind.config.js` đã được cập nhật với:
- Dark mode support
- Custom colors sử dụng CSS variables
- Border radius variables
- Animations cho accordion và các components khác

## 🚀 Sử dụng

### Import components:
```tsx
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
```

### Ví dụ sử dụng Button:
```tsx
<Button>Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
```

### Ví dụ sử dụng Card:
```tsx
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card Description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card Content</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

## 📝 Demo Page

Một trang demo đã được tạo tại `src/pages/ShadcnDemo.tsx` với các ví dụ:
- Button variants
- Form với Input và Label
- Dialog modal
- Dropdown Menu

Để xem demo, bạn cần thêm route cho trang này trong routing của bạn.

## 🎯 Thêm components mới

Để thêm components khác từ Shadcn UI:

```bash
# Thêm một component
npx shadcn@latest add [component-name]

# Ví dụ:
npx shadcn@latest add select
npx shadcn@latest add checkbox
npx shadcn@latest add radio-group
npx shadcn@latest add table
npx shadcn@latest add toast

# Thêm nhiều components cùng lúc
npx shadcn@latest add select checkbox radio-group
```

## 🎨 Dark Mode

Để sử dụng dark mode, thêm class `dark` vào element gốc:

```tsx
// Ví dụ trong App.tsx hoặc component wrapper
<div className="dark">
  {/* Nội dung của bạn */}
</div>
```

Hoặc sử dụng theme provider để quản lý dark mode động.

## 📚 Tài liệu

- [Shadcn UI Documentation](https://ui.shadcn.com)
- [Shadcn UI Components](https://ui.shadcn.com/docs/components)
- [Tailwind CSS](https://tailwindcss.com)
- [Radix UI](https://www.radix-ui.com)

## 🛠️ Utility Functions

File `src/lib/utils.ts` chứa function `cn()` để merge classNames:

```tsx
import { cn } from '@/lib/utils'

<div className={cn(
  "base-classes",
  condition && "conditional-classes",
  "more-classes"
)} />
```

## 🎨 Customization

### Thay đổi colors:
Chỉnh sửa CSS variables trong `src/styles/index.css`

### Thay đổi border radius:
Chỉnh sửa `--radius` variable trong `src/styles/index.css`

### Thêm custom variants:
Chỉnh sửa component trong `src/components/ui/[component-name].tsx`

## ✨ Tips

1. Tất cả components đều có thể customize qua props `className`
2. Sử dụng utility function `cn()` để merge classes một cách thông minh
3. Components được build dựa trên Radix UI nên có accessibility tốt
4. Có thể tự do chỉnh sửa source code của components trong folder `ui`
5. Sử dụng `lucide-react` cho icons: `import { IconName } from 'lucide-react'`

## 🐛 Troubleshooting

### Nếu import không hoạt động:
1. Kiểm tra `tsconfig.json` có path alias `@/*`
2. Kiểm tra `vite.config.ts` có alias resolution
3. Restart dev server

### Nếu styles không hiển thị:
1. Đảm bảo `src/styles/index.css` được import trong `main.tsx`
2. Kiểm tra Tailwind config
3. Clear cache và rebuild

---

Chúc bạn coding vui vẻ! 🚀

