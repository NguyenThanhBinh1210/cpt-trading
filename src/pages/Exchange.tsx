import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Exchange = () => {
  const navigate = useNavigate()
  const [fromCurrency, setFromCurrency] = useState('USDT')
  const [toCurrency, setToCurrency] = useState('BTC')
  const [showFromPicker, setShowFromPicker] = useState(false)
  const [showToPicker, setShowToPicker] = useState(false)

  const fromOptions = [
    'USDT',
    'BTC',
    'ETH',
    'BNB',
    'SOL',
    'ADA',
    'DOT',
    'MATIC',
    'AVAX',
    'LTC',
    'XRP',
    'DOGE',
    'TRX',
    'LINK',
    'UNI',
    'ATOM',
    'ETC',
    'XLM',
    'ALGO',
    'VET',
    'FIL',
    'ICP',
    'THETA',
    'EOS',
    'AAVE'
  ]
  const toOptions = [
    'BTC',
    'ETH',
    'BNB',
    'SOL',
    'ADA',
    'DOT',
    'MATIC',
    'AVAX',
    'LTC',
    'XRP',
    'DOGE',
    'TRX',
    'LINK',
    'UNI',
    'ATOM',
    'ETC',
    'XLM',
    'ALGO',
    'VET',
    'FIL',
    'ICP',
    'THETA',
    'EOS',
    'AAVE',
    'USDT'
  ]

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
        <h1 className='text-base font-semibold'>Exchange</h1>
      </div>

      <div className='mt-2 flex items-center justify-between gap-3'>
        <button
          type='button'
          onClick={() => setShowFromPicker(true)}
          className='flex-1 rounded-lg bg-[#3a3a3a] px-4 py-3 text-center text-base text-white/80'
        >
          {fromCurrency}
        </button>
        <div className='flex flex-col items-center gap-2 text-[#a6f36a]'>
          <svg width='26' height='14' viewBox='0 0 26 14' fill='none' aria-hidden='true'>
            <path d='M2 7h22M18 2l4 5-4 5' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' />
          </svg>
          <svg width='26' height='14' viewBox='0 0 26 14' fill='none' aria-hidden='true'>
            <path d='M24 7H2M8 12l-4-5 4-5' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' />
          </svg>
        </div>
        <button
          type='button'
          onClick={() => setShowToPicker(true)}
          className='flex-1 rounded-lg bg-[#3a3a3a] px-4 py-3 text-center text-base text-white/80'
        >
          {toCurrency}
        </button>
      </div>

      <div className='mt-6'>
        <div className='text-sm text-white/70'>Exchange quantity</div>
        <div className='mt-3 flex items-center justify-between border-b border-white/10 pb-3'>
          <input
            type='text'
            placeholder='Please enter exchange'
            className='flex-1 bg-transparent text-sm text-white/80 placeholder:text-white/40 focus:outline-none'
          />
          <div className='flex items-center gap-3 text-sm text-white/70'>
            <span>{fromCurrency}</span>
            <span className='h-5 w-px bg-white/20' />
            <button type='button'>ALL</button>
          </div>
        </div>
      </div>

      <div className='mt-5 grid grid-cols-3 gap-4 text-sm text-white/60'>
        <div>
          <div>Current exchange rate</div>
          <div className='mt-2 text-white'>83869.93</div>
        </div>
        <div>
          <div>AvailableUSDT</div>
          <div className='mt-2 text-white'>0.00000000</div>
        </div>
        <div>
          <div>Expected to be availableBTC</div>
          <div className='mt-2 text-white'>0</div>
        </div>
      </div>

      <button
        type='button'
        className='mt-6 w-full rounded-2xl bg-[#2dd4bf] px-6 py-3 text-base font-semibold text-white'
      >
        Exchange
      </button>

      {showFromPicker && (
        <div className='fixed inset-0 z-50 flex items-end justify-center'>
          <div
            className='absolute inset-0 bg-black/70'
            onClick={() => setShowFromPicker(false)}
            onTouchStart={(e) => e.stopPropagation()}
          />
          <div
            className='relative z-10 w-full max-w-screen-sm rounded-t-3xl bg-[#1f1f1f] pb-4 text-white'
            onClick={(e) => e.stopPropagation()}
          >
            <div className='flex items-center justify-between px-6 py-4 text-sm text-white/70'>
              <button type='button' onClick={() => setShowFromPicker(false)}>
                Cancel
              </button>
              <button type='button' onClick={() => setShowFromPicker(false)} className='text-[#a6f36a]'>
                Confirm
              </button>
            </div>
            <div className='border-t border-white/10'>
              <div className='max-h-[60vh] overflow-y-auto px-6 py-4 text-center text-base'>
                {fromOptions.map((item) => (
                  <button
                    key={item}
                    type='button'
                    onClick={() => {
                      setFromCurrency(item)
                      setShowFromPicker(false)
                    }}
                    className={`block w-full py-3 text-white/80 transition-colors ${fromCurrency === item ? 'text-[#a6f36a]' : ''
                      }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {showToPicker && (
        <div className='fixed inset-0 z-50 flex items-end justify-center'>
          <div
            className='absolute inset-0 bg-black/70'
            onClick={() => setShowToPicker(false)}
            onTouchStart={(e) => e.stopPropagation()}
          />
          <div
            className='relative z-10 w-full max-w-screen-sm rounded-t-3xl bg-[#1f1f1f] pb-4 text-white'
            onClick={(e) => e.stopPropagation()}
          >
            <div className='flex items-center justify-between px-6 py-4 text-sm text-white/70'>
              <button type='button' onClick={() => setShowToPicker(false)}>
                Cancel
              </button>
              <button type='button' onClick={() => setShowToPicker(false)} className='text-[#a6f36a]'>
                Confirm
              </button>
            </div>
            <div className='border-t border-white/10'>
              <div className='max-h-[60vh] overflow-y-auto px-6 py-4 text-center text-base'>
                {toOptions.map((item) => (
                  <button
                    key={item}
                    type='button'
                    onClick={() => {
                      setToCurrency(item)
                      setShowToPicker(false)
                    }}
                    className={`block w-full py-3 text-white/80 transition-colors ${toCurrency === item ? 'text-[#a6f36a]' : ''
                      }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Exchange
