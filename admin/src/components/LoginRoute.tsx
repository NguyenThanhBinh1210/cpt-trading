import { Navigate } from 'react-router-dom'
import { useAppSelector } from '~/store/hooks'
import Login from '~/pages/Login'

// Component to handle login redirect if already authenticated
export default function LoginRoute() {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)

  console.log('🔐 LoginRoute check:', { isAuthenticated })

  if (isAuthenticated) {
    console.log('✅ Already authenticated, redirecting to dashboard')
    return <Navigate to='/' replace />
  }

  console.log('📝 Not authenticated, showing login form')
  return <Login />
}
