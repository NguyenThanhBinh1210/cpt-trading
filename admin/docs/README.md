# 📚 IC Markets Admin Panel - Documentation

Welcome to the IC Markets Admin Panel documentation! This folder contains comprehensive guides and documentation for the project.

## 📑 Table of Contents

### 🏗️ Setup & Installation
- **[SHADCN_UI_GUIDE.md](./SHADCN_UI_GUIDE.md)** - Hướng dẫn cài đặt và sử dụng Shadcn UI

### 🎨 Layout & Structure
- **[ADMIN_LAYOUT_GUIDE.md](./ADMIN_LAYOUT_GUIDE.md)** - Hướng dẫn về admin layout (sidebar, header)
- **[TRADING_ADMIN_GUIDE.md](./TRADING_ADMIN_GUIDE.md)** - Hướng dẫn toàn diện về các trang admin

### 🔐 Authentication & Authorization
- **[LOGIN_API_GUIDE.md](./LOGIN_API_GUIDE.md)** - Hướng dẫn tích hợp API login
- **[LOGIN_REDIRECT_FIX.md](./LOGIN_REDIRECT_FIX.md)** - Giải pháp fix redirect sau login
- **[LOGIN_SUCCESS_ANIMATION.md](./LOGIN_SUCCESS_ANIMATION.md)** - Animation và toast cho login
- **[LOGOUT_ANIMATION.md](./LOGOUT_ANIMATION.md)** - Animation và toast cho logout

### 🔧 State Management
- **[REDUX_GUIDE.md](./REDUX_GUIDE.md)** - Hướng dẫn Redux Toolkit setup và usage

### 🐛 Debug & Troubleshooting
- **[DEBUG_LOGIN.md](./DEBUG_LOGIN.md)** - Debug login redirect issues
- **[TEST_API_RESPONSE.md](./TEST_API_RESPONSE.md)** - Test API response structure

## 🚀 Quick Start

### 1. Setup Project
```bash
# Install dependencies
yarn install

# Run development server
yarn dev
```

### 2. Install Shadcn UI Components
```bash
# Install specific components
npx shadcn@latest add button card input
```

### 3. Login to Admin Panel
```
URL: http://localhost:5173/login
Credentials: Get from API provider
```

## 📖 Documentation Categories

### 🎯 For Developers
- Admin Layout Guide
- Redux Setup Guide
- API Integration Guide
- Component Structure

### 🎨 For Designers
- UI Components (Shadcn UI)
- Animation Guidelines
- Color Schemes
- Layout Structure

### 🔧 For DevOps
- API Endpoints
- Environment Setup
- Deployment Guide
- Troubleshooting

## 🛠️ Tech Stack

- **Frontend Framework:** React 18 + TypeScript
- **Build Tool:** Vite
- **UI Library:** Shadcn UI + Tailwind CSS
- **State Management:** Redux Toolkit
- **Routing:** React Router DOM v6
- **API Client:** Axios
- **Form Validation:** React Hook Form + Zod
- **Toast Notifications:** Sonner

## 📊 Project Structure

```
admin/
├── src/
│   ├── apis/          # API services
│   ├── components/    # Reusable components
│   ├── layouts/       # Layout components
│   ├── pages/         # Page components
│   ├── store/         # Redux store
│   ├── hooks/         # Custom hooks
│   ├── utils/         # Utility functions
│   └── types/         # TypeScript types
├── docs/              # 📚 THIS FOLDER - Documentation
└── public/            # Static assets
```

## 🎯 Key Features

### ✅ Implemented
- [x] Admin Layout (Sidebar + Header)
- [x] Dashboard with statistics
- [x] User Management (CRUD)
- [x] Trading Accounts Management
- [x] Orders & Positions
- [x] Transactions (Deposits/Withdrawals)
- [x] KYC Verification
- [x] Instruments Management
- [x] Support Tickets
- [x] Reports & Analytics
- [x] Settings Management
- [x] Profile Management
- [x] Login/Logout with animations
- [x] Protected Routes
- [x] Redux State Management
- [x] API Integration
- [x] Toast Notifications
- [x] Loading Skeletons
- [x] Pagination
- [x] 404 Not Found Page

### 🔮 Future Enhancements
- [ ] Real-time notifications
- [ ] Chart integration
- [ ] Export to PDF/Excel
- [ ] Advanced filtering
- [ ] Batch operations
- [ ] Activity logs
- [ ] Multi-language support
- [ ] Dark mode toggle (functional)

## 📝 Documentation Status

| Document | Status | Last Updated |
|----------|--------|--------------|
| Admin Layout Guide | ✅ Complete | Initial |
| Trading Admin Guide | ✅ Complete | Initial |
| Shadcn UI Guide | ✅ Complete | Initial |
| Redux Guide | ✅ Complete | Nov 2024 |
| Login API Guide | ✅ Complete | Nov 2024 |
| Login Redirect Fix | ✅ Complete | Nov 2024 |
| Login Animation | ✅ Complete | Nov 2024 |
| Logout Animation | ✅ Complete | Nov 2024 |
| Debug Login | ✅ Complete | Nov 2024 |
| Test API Response | ✅ Complete | Nov 2024 |

## 🤝 Contributing

When adding new features:
1. Update relevant documentation
2. Add examples if applicable
3. Update this README if needed
4. Test thoroughly before committing

## 📧 Support

For questions or issues:
- Check the relevant guide in this folder
- Review troubleshooting sections
- Contact the development team

## 🔗 Related Links

- [Shadcn UI Documentation](https://ui.shadcn.com/)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [React Router Documentation](https://reactrouter.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Vite Documentation](https://vitejs.dev/)

---

**Last Updated:** November 2024  
**Version:** 1.0.0  
**Project:** IC Markets Admin Panel
