import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Users, ChevronLeft, TrendingUp, ArrowDownUp, MessageSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface AdminSidebarProps {
  collapsed: boolean
  onToggleCollapse: () => void
}

const navigationItems = [
  {
    title: 'User Management',
    href: '/users',
    icon: Users
  },
  {
    title: 'Buy/Sell Orders',
    href: '/orders',
    icon: TrendingUp
  },
  {
    title: 'Deposit & Withdrawals',
    href: '/transactions',
    icon: ArrowDownUp
  },
  {
    title: 'Message Center',
    href: '/support',
    icon: MessageSquare
  }
]

const AdminSidebar = ({ collapsed, onToggleCollapse }: AdminSidebarProps) => {
  const location = useLocation()

  return (
    <div
      className={cn(
        'relative flex h-screen flex-col border-r bg-card transition-all duration-300',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* Logo Section */}
      <div className='flex h-16 items-center justify-between border-b px-4'>
        {!collapsed && (
          <Link to='/' className='flex items-center gap-2 font-semibold'>
            <div className='flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground'>
              <TrendingUp className='h-5 w-5' />
            </div>
            <span className='text-lg'>IC Markets</span>
          </Link>
        )}
        <Button variant='ghost' size='icon' onClick={onToggleCollapse} className={cn(collapsed && 'mx-auto')}>
          <ChevronLeft className={cn('h-5 w-5 transition-transform', collapsed && 'rotate-180')} />
        </Button>
      </div>

      {/* Navigation */}
      <ScrollArea className='flex-1 px-3 py-4'>
        <div className='space-y-1'>
          {navigationItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.href

            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent',
                  isActive && 'bg-accent text-accent-foreground',
                  collapsed && 'justify-center'
                )}
                title={collapsed ? item.title : ''}
              >
                <Icon className='h-5 w-5 shrink-0' />
                {!collapsed && <span className='flex-1'>{item.title}</span>}
              </Link>
            )
          })}
        </div>
      </ScrollArea>

      {/* Footer */}
      {!collapsed && (
        <div className='border-t p-4'>
          <div className='rounded-lg bg-muted p-3 text-xs'>
            <p className='font-semibold'>IC Markets Admin</p>
            <p className='text-muted-foreground'>Trading Platform v1.0</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminSidebar
