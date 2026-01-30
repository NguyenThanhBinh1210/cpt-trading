import { useState } from 'react'
import { Link } from 'react-router-dom'
import banner from '~/assets/login-banner1813deb6.png'

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className='px-4 pb-10 pt-6 text-white'>
      <div className='relative overflow-hidden  '>
        <img src={banner} alt='Welcome banner' className='w-full rounded-2xl object-cover' />
      </div>

      <div className='mt-6 space-y-5'>
        <div>
          <div className='mb-2 text-sm text-white/80'>Account</div>
          <input
            type='text'
            placeholder='Please input Username'
            className='h-12 w-full rounded-full bg-[#3b3b35] px-5 text-sm text-white/90 placeholder:text-white/40'
          />
        </div>

        <div>
          <div className='mb-2 text-sm text-white/80'>Password</div>
          <div className='relative'>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder='Please enter password'
              className='h-12 w-full rounded-full bg-[#3b3b35] px-5 pr-12 text-sm text-white/90 placeholder:text-white/40'
            />
            <button
              type='button'
              onClick={() => setShowPassword((prev) => !prev)}
              className='absolute right-4 top-1/2 -translate-y-1/2 text-white/40'
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <svg width='20' height='20' viewBox='0 0 24 24' fill='none' aria-hidden='true'>
                  <path d='M3 12s4-6 9-6 9 6 9 6-4 6-9 6-9-6-9-6Z' stroke='currentColor' strokeWidth='1.6' />
                  <circle cx='12' cy='12' r='3' stroke='currentColor' strokeWidth='1.6' />
                </svg>
              ) : (
                <svg width='20' height='20' viewBox='0 0 24 24' fill='none' aria-hidden='true'>
                  <path
                    d='M4 4l16 16M9.5 9.5a3.5 3.5 0 0 1 5 5M6.7 6.7C4.4 8.3 3 12 3 12s4 6 9 6a9.7 9.7 0 0 0 4.2-1'
                    stroke='currentColor'
                    strokeWidth='1.6'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        <div className='flex items-center justify-between text-sm text-white/70'>
          <label className='flex items-center gap-2'>
            <input type='checkbox' className='h-4 w-4 rounded border-white/30 bg-transparent' />
            Remember password
          </label>
          <Link to='/forgot-password' className='text-white/50'>
            forget the password?
          </Link>
        </div>
      </div>

      <button
        type='button'
        className='mt-6 w-full rounded-full bg-[#a6f36a] px-6 py-3 text-base font-semibold text-[#0f172a]'
      >
        Log in
      </button>

      <div className='mt-4 flex items-center gap-4 text-xs text-white/40'>
        <span className='flex-1 border-t border-white/10' />
        Or
        <span className='flex-1 border-t border-white/10' />
      </div>

      <Link
        to='/wallet-login'
        className='mt-4 block w-full rounded-full bg-[#a6f36a] px-6 py-3 text-center text-base font-semibold text-[#0f172a]'
      >
        Wallet login
      </Link>

      <div className='mt-4 flex items-center gap-4 text-xs text-white/40'>
        <span className='flex-1 border-t border-white/10' />
        Or
        <span className='flex-1 border-t border-white/10' />
      </div>

      <Link
        to='/register'
        className='mt-4 block w-full rounded-full bg-[#3b3b35] px-6 py-3 text-center text-base font-semibold text-white/80'
      >
        Create an account
      </Link>
    </div>
  )
}

export default Login
