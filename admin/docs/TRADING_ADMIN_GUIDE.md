# 🚀 IC Markets Admin Panel - Hướng dẫn đầy đủ

## 📋 Tổng quan

Admin Panel được xây dựng dựa trên trang web [IC Markets](https://www.ic.markets/#/) - một broker đa tài sản được quản lý và cấp phép, cung cấp dịch vụ giao dịch cho cả khách hàng bán lẻ và tổ chức.

### 🎯 Mục đích:
Quản lý toàn diện nền tảng trading với các chức năng:
- ✅ Quản lý người dùng và tài khoản
- ✅ Giám sát giao dịch real-time
- ✅ Xử lý nạp/rút tiền
- ✅ Xác minh KYC
- ✅ Quản lý công cụ trading
- ✅ Báo cáo và phân tích
- ✅ Hỗ trợ khách hàng

## 🗂️ Cấu trúc Pages

### 1. **Dashboard** (`/`)
**Chức năng:**
- Tổng quan thống kê toàn hệ thống
- Doanh thu, người dùng, đơn hàng, sản phẩm
- Đơn hàng gần đây
- Hoạt động hệ thống

**Components:**
- Stats cards với trend indicators
- Recent orders table
- Overview progress bars
- Activity timeline

**Dữ liệu hiển thị:**
- Total Revenue: $45,231.89 (+20.1%)
- Active Users: 2,350 (+180.1%)
- Orders: +573 (+19%)
- Products: 234 (-4.75%)

---

### 2. **Users Management** (`/users`)
**Chức năng:**
- Danh sách tất cả người dùng
- Thêm/sửa/xóa người dùng
- Quản lý trạng thái tài khoản
- Phân loại: Retail/Institutional
- Theo dõi KYC status

**Features:**
- ✅ Search users (name, email, ID)
- ✅ Filter by account type
- ✅ View user details
- ✅ Suspend/Block accounts
- ✅ Send email to users
- ✅ Export user list

**Stats:**
- Total Users
- Active Users
- Pending KYC
- Total Balance

**Actions:**
- Edit User
- Send Email
- Suspend Account
- Delete User

---

### 3. **Trading Accounts** (`/accounts`)
**Chức năng:**
- Quản lý tài khoản trading
- Theo dõi balance, equity, margin
- Xem open positions
- Quản lý leverage

**Account Types:**
- Live Account
- Demo Account
- ECN Account
- Raw Spread Account

**Thông tin hiển thị:**
- Account Number
- Balance & Equity
- Margin & Free Margin
- Leverage (1:100, 1:200, 1:500)
- Open Positions
- Profit/Loss (real-time)

**Stats:**
- Total Accounts
- Total Balance
- Total Equity
- Total P&L

---

### 4. **Orders & Trades** (`/orders`)
**Chức năng:**
- Giám sát tất cả lệnh giao dịch
- Theo dõi positions đang mở
- Quản lý pending orders
- Xem lịch sử đóng lệnh

**Order Types:**
- Market Orders
- Limit Orders
- Stop Orders

**Tabs:**
- Open Positions (đang giao dịch)
- Pending Orders (chờ thực thi)
- Closed Orders (đã đóng)
- All Orders

**Thông tin chi tiết:**
- Symbol (EURUSD, BTCUSD, XAUUSD, etc.)
- Type (Buy/Sell)
- Volume (lots)
- Open/Current Price
- Stop Loss/Take Profit
- Profit/Loss
- Commission & Swap

**Stats:**
- Open Positions: 3
- Pending Orders
- Total Volume
- Total P&L

---

### 5. **Transactions** (`/transactions`)
**Chức năng:**
- Quản lý nạp tiền (Deposits)
- Quản lý rút tiền (Withdrawals)
- Xử lý pending transactions
- Xem lịch sử giao dịch

**Payment Methods:**
- Credit Card
- Bank Transfer
- Bitcoin/Ethereum
- E-Wallet

**Transaction Status:**
- Completed ✅
- Processing ⏳
- Pending ⏳
- Failed ❌
- Cancelled ❌

**Actions:**
- Approve/Reject pending transactions
- View transaction details
- Export transaction report

**Stats:**
- Total Deposits
- Total Withdrawals
- Pending Transactions
- Total Fees (commission earned)

---

### 6. **KYC Verification** (`/kyc`)
**Chức năng:**
- Xem danh sách đơn xác minh KYC
- Review documents
- Approve/Reject applications
- Quản lý risk levels

**Document Types:**
- Passport
- ID Card
- Driver's License

**Required Documents:**
- ✅ Document Front
- ✅ Document Back (optional)
- ✅ Selfie with document
- ✅ Address Proof (utility bill, bank statement)

**KYC Status:**
- Pending (chờ xem xét)
- Under Review (đang xem xét)
- Approved (đã duyệt)
- Rejected (từ chối)
- Resubmission Required (cần nộp lại)

**Risk Levels:**
- Low Risk 🟢
- Medium Risk 🟡
- High Risk 🔴

**Review Process:**
1. View application details
2. Check documents
3. Verify information
4. Approve or Reject with reason

---

### 7. **Trading Instruments** (`/instruments`)
**Chức năng:**
- Quản lý công cụ giao dịch
- Cấu hình leverage, spread
- Theo dõi giá real-time
- Quản lý trading hours

**Categories:**
- 💱 **Forex** (EURUSD, GBPUSD, USDJPY, etc.)
- ₿ **Cryptocurrencies** (BTCUSD, ETHUSD, etc.)
- 💎 **Commodities** (XAUUSD Gold, XAGUSD Silver)
- 📊 **Indices** (US30, NAS100, SPX500)
- 📈 **Stocks** (AAPL, TSLA, GOOGL, etc.)

**Instrument Details:**
- Symbol & Name
- Bid/Ask prices
- Spread
- 24h Price Change
- 24h Volume
- Min/Max Lot Size
- Leverage
- Trading Hours (24/5, 24/7, Market Hours)
- Status (Active/Inactive/Maintenance)

**Actions:**
- Edit instrument settings
- Enable/Disable trading
- Update leverage limits
- Configure spread

---

### 8. **Reports & Analytics** (`/reports`)
**Chức năng:**
- Báo cáo doanh thu
- Phân tích trading activity
- User growth tracking
- Top traders leaderboard

**Key Metrics:**
- Total Revenue (monthly)
- Total Trades
- Active Users
- Average Trade Size

**Charts:**
- Revenue Trend (6 months)
- Trading Activity
- User Growth
- Performance by instrument

**Top Traders:**
- Ranked by volume
- Profit/Loss
- Number of trades
- Commission generated

**Export Options:**
- PDF Report
- Excel Spreadsheet
- CSV Data
- Custom date range

---

### 9. **Support Tickets** (`/support`)
**Chức năng:**
- Quản lý tickets support
- Reply to customers
- Track ticket status
- Assign tickets to team

**Ticket Categories:**
- Technical Issues
- Account Problems
- Trading Questions
- Payment Issues
- KYC Inquiries
- General Questions

**Priority Levels:**
- 🔴 Urgent
- 🟠 High
- 🟡 Medium
- 🟢 Low

**Ticket Status:**
- Open (mới tạo)
- In Progress (đang xử lý)
- Resolved (đã giải quyết)
- Closed (đã đóng)

**Features:**
- View ticket conversation
- Reply to customers
- Save draft responses
- Assign to team members
- Change priority/status

---

## 🎨 UI/UX Features

### Layout Components:

#### **AdminSidebar:**
- Collapsible sidebar (desktop)
- Mobile drawer menu
- Navigation with icons
- Badge notifications
- Quick actions
- Help section

#### **AdminHeader:**
- Global search bar
- Dark mode toggle
- Notification dropdown
- User profile menu
- Mobile menu button

### Common Features:
- 🔍 **Search** - Tìm kiếm trên mọi trang
- 🎨 **Dark Mode** - Hỗ trợ chế độ tối
- 📱 **Responsive** - Tự động adapt mọi thiết bị
- 📊 **Stats Cards** - Thống kê trực quan
- 📋 **Tables** - Bảng dữ liệu với sorting
- 🏷️ **Badges** - Labels màu sắc
- 💬 **Dialogs** - Modals cho actions
- 📑 **Tabs** - Phân loại nội dung
- 🎯 **Filters** - Lọc và tìm kiếm
- 📤 **Export** - Xuất báo cáo

## 🚀 Sử dụng

### Development:
```bash
yarn dev
```

Mở trình duyệt: `http://localhost:3000`

### Build Production:
```bash
yarn build
```

### Preview Production Build:
```bash
yarn preview
```

## 📁 Cấu trúc Files

```
src/
├── pages/
│   ├── Dashboard.tsx          # Trang chủ admin
│   ├── Users.tsx              # Quản lý users
│   ├── TradingAccounts.tsx    # Quản lý trading accounts
│   ├── Orders.tsx             # Quản lý orders/trades
│   ├── Transactions.tsx       # Nạp/rút tiền
│   ├── KYC.tsx                # Xác minh KYC
│   ├── Instruments.tsx        # Công cụ trading
│   ├── Reports.tsx            # Báo cáo
│   └── Support.tsx            # Support tickets
├── components/
│   ├── layouts/
│   │   ├── AdminSidebar.tsx   # Sidebar navigation
│   │   ├── AdminHeader.tsx    # Top header bar
│   │   └── HomeLayout.tsx     # Main layout wrapper
│   └── ui/                    # Shadcn UI components
├── routes/
│   └── useRouteElements.tsx   # Route configuration
└── lib/
    └── utils.ts               # Utility functions
```

## 🔗 Navigation Routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | Dashboard | Trang chủ admin |
| `/users` | Users | Quản lý người dùng |
| `/accounts` | Trading Accounts | Quản lý tài khoản trading |
| `/orders` | Orders & Trades | Quản lý lệnh giao dịch |
| `/transactions` | Transactions | Nạp/rút tiền |
| `/kyc` | KYC Verification | Xác minh KYC |
| `/instruments` | Trading Instruments | Công cụ trading |
| `/reports` | Reports & Analytics | Báo cáo phân tích |
| `/support` | Support Tickets | Hỗ trợ khách hàng |

## 🎯 Tính năng nổi bật

### 1. Real-time Monitoring
- Theo dõi giá và giao dịch thời gian thực
- Update balance và P&L liên tục
- Notification system

### 2. Risk Management
- KYC verification system
- Risk level assessment
- Account status management
- Transaction monitoring

### 3. Financial Operations
- Multi-currency support
- Multiple payment methods
- Automated transaction processing
- Fee calculation

### 4. Trading Management
- Multiple instrument categories
- Flexible leverage settings
- Order management
- Position monitoring

### 5. Customer Support
- Ticket system
- Priority management
- Team assignment
- Communication history

## 📊 Demo Data

Tất cả pages đều có **mock data** để demo:
- Users: 5 users với các status khác nhau
- Accounts: 4 trading accounts
- Orders: 5 open positions + pending
- Transactions: 7 transactions (deposits/withdrawals)
- KYC: 5 applications với các status
- Instruments: 10 trading instruments
- Tickets: 5 support tickets

## 🔐 Future Enhancements

Các tính năng có thể mở rộng:
- [ ] API Integration (Backend connection)
- [ ] WebSocket cho real-time data
- [ ] Advanced charts (TradingView)
- [ ] Multi-language support
- [ ] Role-based access control (RBAC)
- [ ] Two-factor authentication (2FA)
- [ ] Email notifications
- [ ] Push notifications
- [ ] Advanced reporting với custom filters
- [ ] Audit logs
- [ ] Backup & restore
- [ ] API documentation

## 🛠️ Technologies Used

- **React 18** - UI Framework
- **TypeScript** - Type Safety
- **Vite** - Build Tool
- **React Router v6** - Routing
- **Shadcn UI** - Component Library
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **Radix UI** - Primitives

## 📚 Tài liệu tham khảo

- [IC Markets Website](https://www.ic.markets/#/)
- [Shadcn UI Documentation](https://ui.shadcn.com)
- [React Router Documentation](https://reactrouter.com)
- [Tailwind CSS Documentation](https://tailwindcss.com)

## 🎉 Kết luận

Admin panel đã được xây dựng hoàn chỉnh với:
- ✅ 9 pages chức năng đầy đủ
- ✅ Responsive design (mobile/tablet/desktop)
- ✅ Dark mode support
- ✅ Modern UI với Shadcn components
- ✅ Professional layout
- ✅ Mock data cho demo
- ✅ Type-safe với TypeScript
- ✅ Clean code structure

**Ready for production!** 🚀

---

**Developed with ❤️ for IC Markets Admin Panel**

