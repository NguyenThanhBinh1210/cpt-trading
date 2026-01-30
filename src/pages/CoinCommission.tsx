import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const CoinCommission = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<'all' | 'history'>('all')
  const [side, setSide] = useState<'Buy' | 'Sell'>('Buy')
  const [showSideSheet, setShowSideSheet] = useState(false)

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
        <div className='flex items-center gap-4 text-sm'>
          <button
            type='button'
            onClick={() => setActiveTab('all')}
            className={`pb-1 ${activeTab === 'all' ? 'text-green-400 border-b-2 border-green-400' : 'text-white/60'}`}
          >
            All commissions
          </button>
          <button
            type='button'
            onClick={() => setActiveTab('history')}
            className={`pb-1 ${
              activeTab === 'history' ? 'text-green-400 border-b-2 border-green-400' : 'text-white/60'
            }`}
          >
            Historical commission
          </button>
        </div>
        <button type='button' onClick={() => setShowSideSheet(true)} className='absolute right-0 text-sm text-white/70'>
          {side}
          <svg width='14' height='14' viewBox='0 0 24 24' fill='none' className='inline-block ml-1'>
            <path d='M6 9l6 6 6-6' stroke='currentColor' strokeWidth='1.6' strokeLinecap='round' />
          </svg>
        </button>
      </div>

      <div className='mt-6 text-center text-sm text-white/50'>No more</div>

      {showSideSheet && (
        <>
          <div className='fixed inset-0 z-40 bg-black/60' onClick={() => setShowSideSheet(false)} />
          <div className='fixed inset-x-0 bottom-0 z-50 rounded-t-2xl bg-[#2f2f2f] px-4 pb-6 pt-4 text-white'>
            <div className='flex items-center justify-between text-sm text-white/60'>
              <button type='button' onClick={() => setShowSideSheet(false)}>
                Cancel
              </button>
              <button type='button' onClick={() => setShowSideSheet(false)} className='text-[#b7f14a]'>
                Confirm
              </button>
            </div>
            <div className='mt-6 space-y-4 text-center text-base'>
              {(['Buy', 'Sell'] as const).map((option) => (
                <button
                  key={option}
                  type='button'
                  onClick={() => setSide(option)}
                  className='block w-full text-white/80'
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default CoinCommission
