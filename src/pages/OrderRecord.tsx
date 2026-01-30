import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const OrderRecord = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<'in' | 'closed'>('in')

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
        <h1 className='text-base font-semibold'>Order record</h1>
      </div>

      <div className='mt-4 flex gap-4 text-sm'>
        <button
          type='button'
          onClick={() => setActiveTab('in')}
          className={`pb-1 ${activeTab === 'in' ? 'text-green-500 border-b-2 border-green-500' : 'text-white/70'}`}
        >
          In transaction
        </button>
        <button
          type='button'
          onClick={() => setActiveTab('closed')}
          className={`pb-1 ${activeTab === 'closed' ? 'text-green-500 border-b-2 border-green-500' : 'text-white/70'}`}
        >
          Position closed
        </button>
      </div>

      <div className='mt-4 text-center text-sm text-white/50'>No more</div>
    </div>
  )
}

export default OrderRecord
