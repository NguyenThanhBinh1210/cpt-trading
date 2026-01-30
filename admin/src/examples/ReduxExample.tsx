/**
 * Redux Usage Example Component
 *
 * This file demonstrates how to use Redux in components
 * after migrating from Context API.
 */

import { useAppSelector, useAppDispatch } from '~/store/hooks'
import { setAuth, setIsAuthenticated, setProfile, reset } from '~/store/slices/authSlice'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function ReduxExample() {
  // ✅ Reading state from Redux
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)
  const profile = useAppSelector((state) => state.auth.profile)

  // ✅ Getting dispatch function
  const dispatch = useAppDispatch()

  // ✅ Example: Set authentication state
  const handleLogin = () => {
    dispatch(
      setAuth({
        isAuthenticated: true,
        profile: {
          username: 'adminuser',
          email: 'admin@icmarkets.com',
          name: 'Admin User'
        }
      })
    )
  }

  // ✅ Example: Update only authentication status
  const handleToggleAuth = () => {
    dispatch(setIsAuthenticated(!isAuthenticated))
  }

  // ✅ Example: Update only profile
  const handleUpdateProfile = () => {
    dispatch(
      setProfile({
        username: 'updatedadmin',
        email: 'updated@icmarkets.com',
        name: 'Updated Admin'
      })
    )
  }

  // ✅ Example: Reset (logout)
  const handleLogout = () => {
    dispatch(reset())
  }

  return (
    <div className='container mx-auto p-6'>
      <Card>
        <CardHeader>
          <CardTitle>Redux Toolkit Example</CardTitle>
          <CardDescription>
            This component demonstrates how to use Redux after migrating from Context API
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          {/* Display State */}
          <div className='rounded-lg border p-4'>
            <h3 className='mb-2 font-semibold'>Current State:</h3>
            <div className='space-y-1 text-sm'>
              <p>
                <strong>Authenticated:</strong> {isAuthenticated ? '✅ Yes' : '❌ No'}
              </p>
              <p>
                <strong>Profile:</strong> {profile ? JSON.stringify(profile, null, 2) : 'null'}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className='flex flex-wrap gap-2'>
            <Button onClick={handleLogin} variant='default'>
              Login (Set Auth + Profile)
            </Button>
            <Button onClick={handleToggleAuth} variant='secondary'>
              Toggle Auth Status
            </Button>
            <Button onClick={handleUpdateProfile} variant='outline'>
              Update Profile
            </Button>
            <Button onClick={handleLogout} variant='destructive'>
              Logout (Reset)
            </Button>
          </div>

          {/* Code Examples */}
          <div className='mt-6 space-y-4'>
            <div>
              <h4 className='mb-2 font-semibold'>📖 Reading State:</h4>
              <pre className='rounded-lg bg-slate-100 p-3 text-xs dark:bg-slate-900'>
                {`const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)
const profile = useAppSelector((state) => state.auth.profile)`}
              </pre>
            </div>

            <div>
              <h4 className='mb-2 font-semibold'>📝 Dispatching Actions:</h4>
              <pre className='rounded-lg bg-slate-100 p-3 text-xs dark:bg-slate-900'>
                {`const dispatch = useAppDispatch()

// Login
dispatch(setAuth({ isAuthenticated: true, profile: userData }))

// Toggle auth
dispatch(setIsAuthenticated(!isAuthenticated))

// Update profile
dispatch(setProfile(newProfile))

// Logout
dispatch(reset())`}
              </pre>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
