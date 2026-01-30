import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { Menu, Search, Sun, Moon, LogOut, CheckCircle2, Loader2, User } from 'lucide-react'
import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '~/store/hooks'
import { reset } from '~/store/slices/authSlice'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'

interface AdminHeaderProps {
  onMenuClick: () => void
}

const AdminHeader = ({ onMenuClick }: AdminHeaderProps) => {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const dispatch = useAppDispatch()
  const profile = useAppSelector((state) => state.auth.profile)
  const navigate = useNavigate()

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle('dark')
  }

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

  return (
    <>
      {/* Logout Success Overlay */}
      {isLoggingOut && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-600/90 to-slate-800/90 backdrop-blur-sm animate-in fade-in duration-300'>
          <div className='text-center space-y-4 animate-in zoom-in duration-500'>
            <div className='mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white/20 backdrop-blur-md animate-pulse'>
              <CheckCircle2 className='h-12 w-12 text-white' />
            </div>
            <div className='space-y-2'>
              <h3 className='text-2xl font-bold text-white'>Logged Out Successfully! 👋</h3>
              <p className='text-white/80'>Redirecting to login page...</p>
            </div>
            <div className='flex justify-center'>
              <Loader2 className='h-6 w-6 animate-spin text-white' />
            </div>
          </div>
        </div>
      )}

      <header className='sticky top-0 z-40 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6'>
        {/* Mobile Menu Button */}
        <Button variant='ghost' size='icon' className='md:hidden' onClick={onMenuClick}>
          <Menu className='h-5 w-5' />
        </Button>

        {/* Search Bar */}
        <div className='flex-1'>
          <div className='relative w-full max-w-md'>
            <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
            <Input type='search' placeholder='Search...' className='w-full pl-10 pr-4' />
          </div>
        </div>

        {/* Right Side Actions */}
        <div className='flex items-center gap-2'>
          {/* Dark Mode Toggle */}
          <Button variant='ghost' size='icon' onClick={toggleDarkMode}>
            {isDarkMode ? <Sun className='h-5 w-5' /> : <Moon className='h-5 w-5' />}
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className='relative h-10 w-10 rounded-full'>
                <Avatar>
                  <AvatarImage src='https://github.com/shadcn.png' alt='User' />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='w-56'>
              <DropdownMenuLabel>
                <div className='flex flex-col space-y-1'>
                  <p className='text-sm font-medium leading-none'>{profile?.name || 'Admin User'}</p>
                  <p className='text-xs leading-none text-muted-foreground'>{profile?.email || 'admin@example.com'}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate('/profile')}>
                <User className='mr-2 h-4 w-4' />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className='text-destructive' onClick={handleLogout}>
                <LogOut className='mr-2 h-4 w-4' />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    </>
  )
}

export default AdminHeader
