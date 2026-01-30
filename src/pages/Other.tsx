import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Other = () => {
  const navigate = useNavigate()
  const [showLogout, setShowLogout] = useState(false)

  return (
    <div className='px-3 pt-4 text-white'>
      <div className='relative flex items-center justify-center pb-4'>
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
        <h1 className='text-base font-semibold lowercase'>other</h1>
      </div>

      <div className='mt-2 rounded-3xl bg-[#2a2a2a]'>
        <button
          type='button'
          onClick={() => setShowLogout(true)}
          className='flex w-full items-center justify-between px-5 py-4 text-white/90'
        >
          <div className='flex items-center gap-3'>
            <span className='flex h-9 w-9 items-center justify-center rounded-2xl bg-[#2f2f2a] text-[#a6f36a]'>
              <svg width='20' height='20' viewBox='0 0 24 24' fill='none' aria-hidden='true'>
                <path
                  d='M4 12h8m0 0-3-3m3 3-3 3M12 4h5a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-5'
                  stroke='currentColor'
                  strokeWidth='1.6'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </span>
            <span className='text-sm'>sign out</span>
          </div>
          <svg width='18' height='18' viewBox='0 0 24 24' fill='none' aria-hidden='true' className='text-white/40'>
            <path d='M9 6l6 6-6 6' stroke='currentColor' strokeWidth='1.6' strokeLinecap='round' />
          </svg>
        </button>
      </div>

      {showLogout && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-6'>
          <div className='w-full max-w-sm overflow-hidden rounded-3xl bg-[#2a2a2a] text-center text-white/80'>
            <div className='px-6 py-5'>
              <div className='text-base font-semibold text-white'>Hint</div>
              <div className='mt-2 text-sm text-white/60'>Whether to log out</div>
            </div>
            <div className='flex divide-x divide-white/10 border-t border-white/10'>
              <button
                type='button'
                onClick={() => setShowLogout(false)}
                className='w-1/2 py-3 text-sm text-white/90'
              >
                Cancel
              </button>
              <button
                type='button'
                onClick={() => setShowLogout(false)}
                className='w-1/2 py-3 text-sm text-[#60a5fa]'
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Other
