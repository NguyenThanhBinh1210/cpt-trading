import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Withdraw = () => {
  const navigate = useNavigate()
  const { currency: currencyParam } = useParams<{ currency: string }>()
  const [currency, setCurrency] = useState(currencyParam?.toUpperCase() || 'SOL')

  useEffect(() => {
    if (currencyParam) {
      setCurrency(currencyParam.toUpperCase())
      if (currencyParam.toUpperCase() === 'USDT') {
        setChainType('TRC20')
      }
    }
  }, [currencyParam])
  const [chainType, setChainType] = useState('TRC20')
  const [showCurrencyPicker, setShowCurrencyPicker] = useState(false)
  const [withdrawalAddress, setWithdrawalAddress] = useState('')
  const [quantity, setQuantity] = useState('')
  const [transactionPassword, setTransactionPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

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

  const chainTypes = ['TRC20', 'ERC20']

  // Minimum withdrawal amounts for different currencies
  const minWithdrawal: Record<string, string> = {
    USDT: '1.0000',
    BTC: '0.0001',
    ETH: '0.001',
    BNB: '0.01',
    SOL: '1.0000',
    ADA: '1.0',
    DOT: '1.0',
    MATIC: '1.0',
    AVAX: '0.1',
    LTC: '0.01',
    XRP: '1.0',
    DOGE: '1.0',
    TRX: '1.0',
    LINK: '0.1',
    UNI: '0.1',
    ATOM: '0.1',
    ETC: '0.01',
    XLM: '1.0',
    ALGO: '1.0',
    VET: '1.0',
    FIL: '0.1',
    ICP: '0.1',
    THETA: '1.0',
    EOS: '0.1',
    AAVE: '0.01'
  }

  // Handling fees for different currencies
  const handlingFee: Record<string, string> = {
    USDT: '0.2',
    BTC: '0.0001',
    ETH: '0.001',
    BNB: '0.01',
    SOL: '0.2',
    ADA: '1.0',
    DOT: '0.1',
    MATIC: '0.1',
    AVAX: '0.01',
    LTC: '0.001',
    XRP: '0.1',
    DOGE: '1.0',
    TRX: '1.0',
    LINK: '0.01',
    UNI: '0.01',
    ATOM: '0.01',
    ETC: '0.001',
    XLM: '0.1',
    ALGO: '0.1',
    VET: '1.0',
    FIL: '0.01',
    ICP: '0.01',
    THETA: '1.0',
    EOS: '0.01',
    AAVE: '0.001'
  }

  const minAmount = minWithdrawal[currency] || '1.0000'
  const fee = handlingFee[currency] || '0.2'

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
        <h1 className='text-base font-semibold'>Withdraw</h1>
      </div>

      <div className='mt-6'>
        <div className='text-base font-semibold text-white'>{currency} Withdraw</div>
        <div className='mt-2 text-sm text-white/70'>Available 0{currency}</div>
      </div>

      <div className=' pt-6'>
        <div className='text-sm text-white/70'>Withdrawal address</div>
        <div className='mt-3 flex items-center justify-between border-b border-white/10 pb-3'>
          <input
            type='text'
            placeholder='Please set your withdrawal address first'
            value={withdrawalAddress}
            onChange={(e) => setWithdrawalAddress(e.target.value)}
            className='flex-1 bg-transparent text-sm text-white/80 placeholder:text-white/40 focus:outline-none'
          />
          <button
            type='button'
            className='ml-3 rounded-lg  px-4 py-2 text-sm font-semibold text-white'
          >
            Set up
          </button>
        </div>
      </div>

      {currency === 'USDT' && (
        <div className=' pt-6'>
          <div className='text-sm text-white/70'>Chain type</div>
          <div className='mt-3 flex gap-3 overflow-x-auto pb-2'>
            {chainTypes.map((chain) => (
              <button
                key={chain}
                type='button'
                onClick={() => setChainType(chain)}
                className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${chainType === chain
                  ? 'bg-[#2dd4bf] text-white'
                  : 'bg-[#3a3a3a] text-white/70 hover:bg-[#3f3f3f]'
                  }`}
              >
                {chain}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className=' pt-6'>
        <div className='text-sm text-white/70'>Quantity</div>
        <div className='mt-3 flex items-center justify-between border-b border-white/10 pb-3'>
          <input
            type='text'
            placeholder={`Minimum withdrawal amount ${minAmount}`}
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
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
      </div>

      <div className=' pt-6'>
        <div className='text-sm text-white/70'>Transaction password</div>
        <div className='mt-3 flex items-center justify-between border-b border-white/10 pb-3'>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder='Please enter transaction password'
            value={transactionPassword}
            onChange={(e) => setTransactionPassword(e.target.value)}
            className='flex-1 bg-transparent text-sm text-white/80 placeholder:text-white/40 focus:outline-none'
          />
          <button
            type='button'
            onClick={() => setShowPassword(!showPassword)}
            className='ml-3 text-white/60'
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
              <svg width='20' height='20' viewBox='0 0 24 24' fill='none' aria-hidden='true'>
                <path
                  d='M1 12s4-6 11-6 11 6 11 6-4 6-11 6-11-6-11-6Z'
                  stroke='currentColor'
                  strokeWidth='1.6'
                />
                <circle cx='12' cy='12' r='3' stroke='currentColor' strokeWidth='1.6' />
                <path d='M1 1l22 22' stroke='currentColor' strokeWidth='1.6' strokeLinecap='round' />
              </svg>
            ) : (
              <svg width='20' height='20' viewBox='0 0 24 24' fill='none' aria-hidden='true'>
                <path d='M2 12s4-6 10-6 10 6 10 6-4 6-10 6-10-6-10-6Z' stroke='currentColor' strokeWidth='1.6' />
                <circle cx='12' cy='12' r='3' stroke='currentColor' strokeWidth='1.6' />
              </svg>
            )}
          </button>
        </div>
      </div>

      <div className='space-y-3 pt-6 text-sm'>
        <div className='flex items-center justify-between text-white/70'>
          <span>Arrival quantity</span>
          <span className='text-white'>0 {currency}</span>
        </div>
        <div className='flex items-center justify-between text-white/70'>
          <span>Handling fee</span>
          <span className='text-white'>{fee} {currency}</span>
        </div>
      </div>

      <button
        type='button'
        className='mt-6 w-full rounded-2xl bg-[#2dd4bf] px-6 py-3 text-base font-semibold text-white'
      >
        Withdraw
      </button>

      <div className='mt-8'>
        <div className='text-sm text-white/70'>Coin withdrawal record</div>
        <div className='mt-3 text-center text-sm text-white/50'>No more</div>
      </div>

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
                      // Reset chain type to default when switching currency
                      if (item === 'USDT') {
                        setChainType('TRC20')
                      }
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

export default Withdraw
