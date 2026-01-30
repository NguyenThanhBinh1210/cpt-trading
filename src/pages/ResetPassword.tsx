import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ResetPassword = () => {
  const navigate = useNavigate()
  const [showOld, setShowOld] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  return (
    <div className='px-3 pt-4 text-white'>
      <div className='relative flex items-center justify-center pb-3'>
        <button
          type='button'
          onClick={() => navigate(-1)}
          className='absolute left-0 flex h-10 w-10 items-center justify-center rounded-full bg-[#2a2a2a] text-white/80'
          aria-label='Back'
        >
          <svg width='18' height='18' viewBox='0 0 24 24' fill='none' aria-hidden='true'>
            <path d='M15 6l-6 6 6 6' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' />
          </svg>
        </button>
        <h1 className='text-lg font-semibold'>Reset Password</h1>
      </div>

      <div className='mt-6 space-y-4'>
        <div className='relative'>
          <input
            type={showOld ? 'text' : 'password'}
            placeholder='Please enter old password'
            className='h-12 w-full rounded-full bg-[#3b3b35] px-5 pr-12 text-sm text-white/90 placeholder:text-white/40'
          />
          <button
            type='button'
            onClick={() => setShowOld((prev) => !prev)}
            className='absolute right-4 top-1/2 -translate-y-1/2 text-white/40'
            aria-label={showOld ? 'Hide password' : 'Show password'}
          >
            <svg width='20' height='20' viewBox='0 0 24 24' fill='none' aria-hidden='true'>
              <path d='M3 12s4-6 9-6 9 6 9 6-4 6-9 6-9-6-9-6Z' stroke='currentColor' strokeWidth='1.6' />
              <circle cx='12' cy='12' r='3' stroke='currentColor' strokeWidth='1.6' />
            </svg>
          </button>
        </div>
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
            <svg width='20' height='20' viewBox='0 0 24 24' fill='none' aria-hidden='true'>
              <path d='M3 12s4-6 9-6 9 6 9 6-4 6-9 6-9-6-9-6Z' stroke='currentColor' strokeWidth='1.6' />
              <circle cx='12' cy='12' r='3' stroke='currentColor' strokeWidth='1.6' />
            </svg>
          </button>
        </div>
        <div className='relative'>
          <input
            type={showConfirm ? 'text' : 'password'}
            placeholder='Please confirm your password'
            className='h-12 w-full rounded-full bg-[#3b3b35] px-5 pr-12 text-sm text-white/90 placeholder:text-white/40'
          />
          <button
            type='button'
            onClick={() => setShowConfirm((prev) => !prev)}
            className='absolute right-4 top-1/2 -translate-y-1/2 text-white/40'
            aria-label={showConfirm ? 'Hide password' : 'Show password'}
          >
            <svg width='20' height='20' viewBox='0 0 24 24' fill='none' aria-hidden='true'>
              <path d='M3 12s4-6 9-6 9 6 9 6-4 6-9 6-9-6-9-6Z' stroke='currentColor' strokeWidth='1.6' />
              <circle cx='12' cy='12' r='3' stroke='currentColor' strokeWidth='1.6' />
            </svg>
          </button>
        </div>
      </div>

      <button
        type='button'
        className='mt-10 w-full rounded-full bg-[#2dd4bf] px-6 py-3 text-base font-semibold text-[#0f172a]'
      >
        Reset Password
      </button>
    </div>
  )
}

export default ResetPassword
