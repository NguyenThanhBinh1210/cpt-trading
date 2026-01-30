import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Checkbox } from '@/components/ui/checkbox'
import { Eye, EyeOff, Lock, User, AlertCircle, Loader2, CheckCircle2, Copy, KeyRound } from 'lucide-react'
import { useAppDispatch } from '~/store/hooks'
import { setAuth } from '~/store/slices/authSlice'
import {
  saveAccessToken,
  saveProfile,
  setRefreshTokenToLS,
  getRememberMeFromLS,
  saveRememberMeToLS
} from '~/utils/auth'
import { loginAPI } from '~/apis/auth.api'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

// Validation schema
const loginSchema = z.object({
  username: z.string().min(3, { message: 'Username must be at least 3 characters' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' })
})

type LoginFormData = z.infer<typeof loginSchema>

const Login = () => {
  const dispatch = useAppDispatch()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isRedirecting, setIsRedirecting] = useState(false)
  const [rememberMe, setRememberMe] = useState(getRememberMeFromLS()) // Load from localStorage
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: ''
    }
  })

  // Demo credentials
  const demoCredentials = {
    username: 'dev001',
    password: 'abc@123'
  }

  // Auto-fill demo credentials
  const handleUseDemoCredentials = () => {
    setValue('username', demoCredentials.username)
    setValue('password', demoCredentials.password)
    toast.success('Demo credentials filled!', {
      description: 'Click "Sign in" to login',
      duration: 2000
    })
  }

  // Copy to clipboard
  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    toast.success(`${type} copied!`, {
      description: 'Paste it into the form',
      duration: 1500
    })
  }

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true)
    setError(null)

    try {
      // Trim whitespace from username and password
      const trimmedUsername = data.username.trim()
      const trimmedPassword = data.password.trim()

      // Call real API
      console.log('🔵 Calling API with:', { username: trimmedUsername })
      const response = await loginAPI({
        username: trimmedUsername,
        password: trimmedPassword
      })

      console.log('🔵 Full API Response:', response)
      console.log('🔵 response.ok:', response.ok)
      console.log('🔵 response.user:', response.user)
      console.log('🔵 response.token:', response.token)

      if (response.ok && response.user && response.token) {
        console.log('🟢 Login successful! Processing data...')
        console.log('🟢 User data:', response.user)
        console.log('🟢 Token:', response.token)

        // Map API response to profile format
        const profile = {
          id: response.user.id,
          username: response.user.username,
          email: response.user.email,
          name: response.user.name || response.user.username,
          avatar:
            response.user.avatar ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(
              response.user.name || response.user.username
            )}&background=0D8ABC&color=fff`,
          role: response.user.role as 'admin' | 'user',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }

        console.log('🟢 Mapped profile:', profile)
        console.log('🟢 Remember me:', rememberMe)

        // Save to localStorage or sessionStorage based on rememberMe
        if (rememberMe) {
          console.log('🟡 Saving to localStorage (persistent)...')
          saveAccessToken(response.token, true)
          saveProfile(profile, true)
          if (response.refreshToken) {
            setRefreshTokenToLS(response.refreshToken, true)
          }
          console.log('🟡 Token saved to localStorage:', localStorage.getItem('access_token'))
        } else {
          console.log('🟡 Saving to sessionStorage (temporary)...')
          saveAccessToken(response.token, false)
          saveProfile(profile, false)
          if (response.refreshToken) {
            setRefreshTokenToLS(response.refreshToken, false)
          }
          console.log('🟡 Token saved to sessionStorage:', sessionStorage.getItem('access_token'))
        }

        // Update Redux state
        dispatch(
          setAuth({
            isAuthenticated: true,
            profile: profile
          })
        )

        console.log('✅ Redux updated successfully')
        console.log('✅ Token saved:', response.token.substring(0, 20) + '...')
        console.log('✅ Profile saved:', profile)

        // Show success toast with remember me info
        toast.success('Login successful!', {
          description: rememberMe
            ? `Welcome back, ${profile.name}! 🎉 (Stay signed in)`
            : `Welcome back, ${profile.name}! 🎉`,
          duration: 2000
        })

        // Set redirecting state for smooth animation
        setIsRedirecting(true)

        // Delay redirect for smooth transition
        setTimeout(() => {
          console.log('🔄 Redirecting to dashboard...')
          window.location.href = '/'
        }, 1500)
      } else {
        setError(response.message || 'Login failed. Please try again.')
      }
    } catch (err) {
      // Handle different error types
      if (err instanceof AxiosError) {
        if (err.response) {
          // Server responded with error
          const errorMessage = err.response.data?.message || err.response.data?.error
          if (err.response.status === 401) {
            setError('Invalid username or password')
          } else if (err.response.status === 403) {
            setError('Account is locked or suspended')
          } else if (err.response.status === 404) {
            setError('User not found')
          } else {
            setError(errorMessage || 'An error occurred. Please try again.')
          }
        } else if (err.request) {
          // Request made but no response
          setError('Cannot connect to server. Please check your internet connection.')
        } else {
          setError('An error occurred. Please try again.')
        }
      } else {
        setError('An unexpected error occurred. Please try again.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4'>
      <div className='absolute inset-0 bg-[url("/grid.svg")] bg-center opacity-10' />

      {/* Success Overlay */}
      {isRedirecting && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-600/90 to-blue-800/90 backdrop-blur-sm animate-in fade-in duration-300'>
          <div className='text-center space-y-4 animate-in zoom-in duration-500'>
            <div className='mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white/20 backdrop-blur-md animate-pulse'>
              <CheckCircle2 className='h-12 w-12 text-white' />
            </div>
            <div className='space-y-2'>
              <h3 className='text-2xl font-bold text-white'>Login Successful! 🎉</h3>
              <p className='text-white/80'>Redirecting to dashboard...</p>
            </div>
            <div className='flex justify-center'>
              <Loader2 className='h-6 w-6 animate-spin text-white' />
            </div>
          </div>
        </div>
      )}

      <Card className='relative w-full max-w-md shadow-2xl'>
        <CardHeader className='space-y-1 text-center'>
          <div className='mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600'>
            <Lock className='h-8 w-8 text-white' />
          </div>
          <CardTitle className='text-2xl font-bold'>IC Markets Admin</CardTitle>
          <CardDescription>Sign in to your admin account</CardDescription>
        </CardHeader>

        <CardContent>
          {/* Demo Credentials Card */}
          <Alert className='mb-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 dark:from-blue-950 dark:to-indigo-950 dark:border-blue-800'>
            <KeyRound className='h-4 w-4 text-blue-600 dark:text-blue-400' />
            <AlertDescription className='space-y-3'>
              <div className='flex items-center justify-between'>
                <span className='font-semibold text-blue-900 dark:text-blue-100'>🧪 Demo Credentials for Testing</span>
                <Button
                  type='button'
                  size='sm'
                  variant='outline'
                  onClick={handleUseDemoCredentials}
                  className='h-7 text-xs bg-white dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-900'
                  disabled={isLoading || isRedirecting}
                >
                  <Copy className='mr-1 h-3 w-3' />
                  Auto Fill
                </Button>
              </div>

              <div className='space-y-2 text-sm'>
                <div className='flex items-center justify-between bg-white dark:bg-slate-800 rounded-md p-2 border border-blue-200 dark:border-blue-700'>
                  <div className='flex items-center gap-2'>
                    <User className='h-3 w-3 text-blue-600 dark:text-blue-400' />
                    <span className='text-gray-600 dark:text-gray-400'>Username:</span>
                    <code className='font-mono font-semibold text-blue-700 dark:text-blue-300'>
                      {demoCredentials.username}
                    </code>
                  </div>
                  <Button
                    type='button'
                    size='sm'
                    variant='ghost'
                    onClick={() => handleCopy(demoCredentials.username, 'Username')}
                    className='h-6 w-6 p-0'
                    disabled={isLoading || isRedirecting}
                  >
                    <Copy className='h-3 w-3' />
                  </Button>
                </div>

                <div className='flex items-center justify-between bg-white dark:bg-slate-800 rounded-md p-2 border border-blue-200 dark:border-blue-700'>
                  <div className='flex items-center gap-2'>
                    <Lock className='h-3 w-3 text-blue-600 dark:text-blue-400' />
                    <span className='text-gray-600 dark:text-gray-400'>Password:</span>
                    <code className='font-mono font-semibold text-blue-700 dark:text-blue-300'>
                      {demoCredentials.password}
                    </code>
                  </div>
                  <Button
                    type='button'
                    size='sm'
                    variant='ghost'
                    onClick={() => handleCopy(demoCredentials.password, 'Password')}
                    className='h-6 w-6 p-0'
                    disabled={isLoading || isRedirecting}
                  >
                    <Copy className='h-3 w-3' />
                  </Button>
                </div>
              </div>
            </AlertDescription>
          </Alert>

          <form onSubmit={handleSubmit(onSubmit)} className='space-y-4' autoComplete='off'>
            {/* Error Alert */}
            {error && (
              <Alert variant='destructive'>
                <AlertCircle className='h-4 w-4' />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Username Field */}
            <div className='space-y-2'>
              <Label htmlFor='username'>Username</Label>
              <div className='relative'>
                <User className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
                <Input
                  id='username'
                  type='text'
                  placeholder='Enter your username'
                  className='pl-10'
                  {...register('username', {
                    setValueAs: (value) => value.trim()
                  })}
                  disabled={isLoading}
                  autoComplete='off'
                  onBlur={(e) => {
                    e.target.value = e.target.value.trim()
                  }}
                />
              </div>
              {errors.username && <p className='text-sm text-red-500'>{errors.username.message}</p>}
            </div>

            {/* Password Field */}
            <div className='space-y-2'>
              <Label htmlFor='password'>Password</Label>
              <div className='relative'>
                <Lock className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
                <Input
                  id='password'
                  type={showPassword ? 'text' : 'password'}
                  placeholder='••••••••'
                  className='pl-10 pr-10'
                  {...register('password')}
                  disabled={isLoading}
                  autoComplete='new-password'
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground'
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff className='h-4 w-4' /> : <Eye className='h-4 w-4' />}
                </button>
              </div>
              {errors.password && <p className='text-sm text-red-500'>{errors.password.message}</p>}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className='flex items-center justify-between'>
              <div className='flex items-center space-x-2'>
                <Checkbox
                  id='remember'
                  checked={rememberMe}
                  onCheckedChange={(checked) => {
                    const newValue = checked as boolean
                    setRememberMe(newValue)
                    saveRememberMeToLS(newValue) // Save to localStorage when changed
                  }}
                  disabled={isLoading}
                />
                <Label htmlFor='remember' className='text-sm font-normal cursor-pointer'>
                  Remember me
                </Label>
              </div>
              <Button type='button' variant='link' className='px-0 text-sm' disabled={isLoading}>
                Forgot password?
              </Button>
            </div>

            {/* Submit Button */}
            <Button type='submit' className='w-full' disabled={isLoading || isRedirecting}>
              {isLoading ? (
                <>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  Signing in...
                </>
              ) : isRedirecting ? (
                <>
                  <CheckCircle2 className='mr-2 h-4 w-4' />
                  Success!
                </>
              ) : (
                'Sign in'
              )}
            </Button>
          </form>

          {/* Footer */}
          <div className='mt-6 text-center text-sm text-muted-foreground'>
            <p>© 2024 IC Markets. All rights reserved.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Login
