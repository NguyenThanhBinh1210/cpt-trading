import { Navigate, useLocation } from 'react-router-dom'
import { useAppSelector } from '~/store/hooks'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)
  const location = useLocation()

  console.log('🛡️ ProtectedRoute check:', {
    isAuthenticated,
    path: location.pathname
  })

  if (!isAuthenticated) {
    console.log('❌ Not authenticated, redirecting to /login')
    // Redirect to login if not authenticated, save the attempted location
    return <Navigate to='/login' state={{ from: location }} replace />
  }

  console.log('✅ Authenticated, rendering protected content')
  return <>{children}</>
}
