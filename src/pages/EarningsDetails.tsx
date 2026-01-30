import { useNavigate } from 'react-router-dom'

const EarningsDetails = () => {
  const navigate = useNavigate()

  return (
    <div className='px-4 pb-10 pt-4 text-white'>
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
        <h1 className='text-base font-semibold'>Earnings Details</h1>
      </div>

      <div className='mt-4 flex items-center justify-center gap-2 text-sm text-white/50'>
        <span className='inline-flex h-6 w-6 items-center justify-center rounded-full border border-white/20'>
          <span className='h-2 w-2 animate-pulse rounded-full bg-white/40' />
        </span>
        Loading...
      </div>
    </div>
  )
}

export default EarningsDetails
