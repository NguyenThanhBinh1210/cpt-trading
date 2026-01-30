import { useNavigate } from 'react-router-dom'
import imageSrc from '~/assets/aianh.jpg'

const Purchase = () => {
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
        <h1 className='text-base font-semibold'>Purchase</h1>
      </div>

      <div className='flex items-center gap-4'>
        <img src={imageSrc} alt='Product' className='h-16 w-16 rounded-xl object-cover' />
        <div className='flex-1 space-y-2'>
          <div className='text-xl font-semibold'>180MH/S</div>
          <div className='flex items-center gap-3 text-sm text-white/70'>
            <span>USDT</span>
            <span className='rounded-full bg-[#2dd4bf] px-4 py-1 text-xs text-white'>
              Average Daily Return:0.3%
            </span>
          </div>
        </div>
      </div>

      <div className='mt-6 rounded-3xl bg-[#3a3a3a] px-5 py-4 text-white/70'>
        <div className='flex items-center justify-between border-b border-white/10 py-4 text-sm'>
          <span>Minimum Purchase Amount</span>
          <span className='text-white'>100.00</span>
        </div>
        <div className='flex items-center justify-between border-b border-white/10 py-4 text-sm'>
          <span>Settlement Period/Days</span>
          <span className='text-white'>3</span>
        </div>
        <div className='flex items-center justify-between border-b border-white/10 py-4 text-sm'>
          <span>Maximum Capital</span>
          <span className='text-white'>9999.00</span>
        </div>
        <div className='flex items-center justify-between py-4 text-sm text-white/50'>
          <input type="text" placeholder='Please enter the lock amount' className='w-full rounded-md bg-transparent placeholder:text-white/70 focus:outline-none' />

        </div>
      </div>

      <button
        type='button'
        className='mt-6 w-full rounded-2xl bg-[#2dd4bf] px-6 py-3 text-base font-semibold text-white'
      >
        Purchase
      </button>

      <div className='mt-6 rounded-2xl bg-[#3a3a3a] px-5 py-4 text-white/70'>
        <div className='text-sm font-semibold text-white'>Product description</div>
        <p className='mt-3 text-sm leading-6 text-white/70'>
          Advanced AI Quantitative uses USDT to host super AI computing power mining machines, and obtains
          mining income through AI super intelligent platform mining pool. Super AI smart financial management,
          daily yield 0.3%. Fund limit 100 to 9999
        </p>
      </div>
    </div>
  )
}

export default Purchase
