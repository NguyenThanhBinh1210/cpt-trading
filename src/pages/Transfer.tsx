import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Transfer = () => {
  const navigate = useNavigate()
  const [fromAccount, setFromAccount] = useState('Coins Account')
  const [toAccount, setToAccount] = useState('Contract Account')
  const [currency, setCurrency] = useState('USDT')
  const [showFromPicker, setShowFromPicker] = useState(false)
  const [showToPicker, setShowToPicker] = useState(false)
  const [showCurrencyPicker, setShowCurrencyPicker] = useState(false)

  const accountOptions = ['Coins Account', 'Contract Account', 'Futures Account', 'Forex Account']

  const currencyOptions = [
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
        <h1 className='text-base font-semibold'>Transfer</h1>
      </div>

      <div className='mt-6 rounded-2xl bg-[#3a3a3a] p-4'>
        <div className='space-y-4'>
          <button
            type='button'
            onClick={() => setShowFromPicker(true)}
            className='flex w-full items-center gap-3 text-left'
          >
            <div className='flex w-2 h-2 items-center justify-center rounded-full bg-[#2dd4bf]' />
            <div className='flex-1 flex items-center gap-2'>
              <div className='text-xs text-white/50'>From</div>
              <div className='text-base text-white/90'>{fromAccount}</div>
            </div>
            <svg width='18' height='18' viewBox='0 0 24 24' fill='none' aria-hidden='true' className='text-white/40'>
              <path d='M9 6l6 6-6 6' stroke='currentColor' strokeWidth='1.6' strokeLinecap='round' />
            </svg>
          </button>
          <div className='ml-1.5 h-[1px]  w-full  bg-white/10' />
          <button
            type='button'
            onClick={() => setShowToPicker(true)}
            className='flex w-full items-center gap-3 text-left'
          >
            <div className='flex w-2 h-2 items-center justify-center rounded-full bg-red-500' />
            <div className='flex-1 flex items-center gap-2'>
              <div className='text-xs text-white/50'>To</div>
              <div className='text-base text-white/90'>{toAccount}</div>
            </div>
            <svg width='18' height='18' viewBox='0 0 24 24' fill='none' aria-hidden='true' className='text-white/40'>
              <path d='M9 6l6 6-6 6' stroke='currentColor' strokeWidth='1.6' strokeLinecap='round' />
            </svg>
          </button>
        </div>
      </div>

      <div className='mt-6'>
        <div className='text-sm text-white/70'>Transfer quantity</div>
        <div className='mt-3 flex items-center justify-between border-b border-white/10 pb-3'>
          <input
            type='text'
            placeholder='Please enter the transfer amount'
            className='flex-1 bg-transparent text-sm text-white/80 placeholder:text-white/40 focus:outline-none'
          />
          <div className='flex items-center gap-3 text-sm text-white/70'>
            <button type='button' onClick={() => setShowCurrencyPicker(true)}>
              {currency}
            </button>
            <span className='h-5 w-px bg-white/20' />
            <button type='button'>All</button>
          </div>
        </div>
        <div className='mt-2 text-xs text-white/50'>Available: 0.00000000{currency}</div>
      </div>

      <button
        type='button'
        className='mt-6 w-full rounded-2xl bg-[#2dd4bf] px-6 py-3 text-base font-semibold text-white'
      >
        Transfer
      </button>

      <div className='mt-8'>
        <div className='text-sm text-white/70'>Transfer record</div>
        <div className='mt-3 text-center text-sm text-white/50'>No more</div>
      </div>

      {/* From Account Picker Modal */}
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
                {accountOptions.map((item) => (
                  <button
                    key={item}
                    type='button'
                    onClick={() => {
                      setFromAccount(item)
                      setShowFromPicker(false)
                    }}
                    className={`block w-full py-3 text-white/80 transition-colors ${fromAccount === item ? 'text-[#a6f36a]' : ''
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

      {/* To Account Picker Modal */}
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
                {accountOptions.map((item) => (
                  <button
                    key={item}
                    type='button'
                    onClick={() => {
                      setToAccount(item)
                      setShowToPicker(false)
                    }}
                    className={`block w-full py-3 text-white/80 transition-colors ${toAccount === item ? 'text-[#a6f36a]' : ''
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

      {/* Currency Picker Modal */}
      {showCurrencyPicker && (
        <div className='fixed inset-0 z-50 flex items-end justify-center'>
          <div
            className='absolute inset-0 bg-black/70'
            onClick={() => setShowCurrencyPicker(false)}
            onTouchStart={(e) => e.stopPropagation()}
          />
          <div
            className='relative z-10 w-full max-w-screen-sm rounded-t-3xl bg-[#1f1f1f] pb-4 text-white'
            onClick={(e) => e.stopPropagation()}
          >
            <div className='flex items-center justify-between px-6 py-4 text-sm text-white/70'>
              <button type='button' onClick={() => setShowCurrencyPicker(false)}>
                Cancel
              </button>
              <button type='button' onClick={() => setShowCurrencyPicker(false)} className='text-[#a6f36a]'>
                Confirm
              </button>
            </div>
            <div className='border-t border-white/10'>
              <div className='max-h-[60vh] overflow-y-auto px-6 py-4 text-center text-base'>
                {currencyOptions.map((item) => (
                  <button
                    key={item}
                    type='button'
                    onClick={() => {
                      setCurrency(item)
                      setShowCurrencyPicker(false)
                    }}
                    className={`block w-full py-3 text-white/80 transition-colors ${currency === item ? 'text-[#a6f36a]' : ''
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

export default Transfer
