import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const IeoPurchase = () => {
  const navigate = useNavigate()
  const [amount, setAmount] = useState('')

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
        <h1 className='text-base font-semibold'>Purchase</h1>
      </div>

      <div className='rounded-3xl bg-[#3a3a3a] px-5 py-4 text-white/70'>
        <div className='space-y-4 text-sm'>
          <div>
            <div className='text-white/50'>Balance</div>
            <div className='mt-2 text-xl text-white'>0</div>
          </div>
          <div className='border-t border-white/10 pt-4'>
            <div className='text-white/50'>Issue price</div>
            <div className='mt-2 text-base text-[#2dd4bf]'>1 EBUN = 0.0430USDT</div>
          </div>
          <div className='border-t border-white/10 pt-4'>
            <div className='flex items-center justify-between'>
              <span className='text-white/50'>Issue number</span>
              <span className='text-[#2dd4bf]'>73200000 EBUN</span>
            </div>
            <div className='mt-3 flex items-center justify-between'>
              <span className='text-white/50'>The remaining amount</span>
              <span className='text-[#2dd4bf]'>8 EBUN</span>
            </div>
          </div>
          <div className='border-t border-white/10 pt-4'>
            <div className='flex items-center justify-between gap-6'>
              <div className='text-white/50'>Subscription currency</div>
              <div className='text-white'>EBUN</div>
            </div>
            <div className='mt-3 flex items-center justify-between gap-6'>
              <div className='text-white/50'>Estimated launch time</div>
              <div className='text-white'>2026-02-06 00:00:00</div>
            </div>
            <div className='mt-3 flex items-center justify-between gap-6'>
              <div className='text-white/50'>Subscription start time</div>
              <div className='text-white'>2025-12-22 00:00:00</div>
            </div>
            <div className='mt-3 flex items-center justify-between gap-6'>
              <div className='text-white/50'>End of subscription time</div>
              <div className='text-white'>2026-01-29 00:00:00</div>
            </div>
          </div>
          <div className='border-t border-white/10 pt-4 text-white/40'>
            <input
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              placeholder='Please enter the amount'
              className='h-10 w-full rounded-md bg-transparent text-sm text-white/70 placeholder:text-white/30 focus:outline-none'
            />
          </div>
        </div>

        <button
          type='button'
          className='mt-5 w-full rounded-2xl bg-[#2dd4bf] px-6 py-3 text-base font-semibold text-white'
        >
          Subscription now
        </button>
      </div>

      <div className='mt-6 rounded-2xl bg-[#3a3a3a] px-5 py-4 text-white/70'>
        <div className='flex items-center justify-between'>
          <div className='text-sm font-semibold text-white'>Currency introduction</div>
          <button
            type='button'
            className='flex items-center gap-2 rounded-xl bg-[#2dd4bf] px-3 py-2 text-xs font-semibold text-white'
          >
            <svg width='14' height='14' viewBox='0 0 24 24' fill='none' aria-hidden='true'>
              <path d='M12 3v10m0 0 3-3m-3 3-3-3M5 15v3a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-3' stroke='currentColor' strokeWidth='1.6' strokeLinecap='round' strokeLinejoin='round' />
            </svg>
            White paper
          </button>
        </div>
        <p className='mt-3 text-sm leading-6 text-white/70'>
          Across the expansive and ever-evolving blockchain landscape, EBUN stands as the central driving force for
          transformation. It serves as a visionary and inclusive platform where pioneering concepts and transformative
          projects find realization. What sets EBC apart is its unwavering commitment to progress, grounded in the
          collective wisdom and insights of all its ecosystem users and community members.
        </p>
      </div>
    </div>
  )
}

export default IeoPurchase
