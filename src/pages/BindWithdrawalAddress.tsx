import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const BindWithdrawalAddress = () => {
  const navigate = useNavigate()
  const currencies = useMemo(() => ['USDT', 'BTC', 'ETH', 'LTC', 'SOL', 'XRP', 'USDC', 'DOGE'], [])
  const chainTypes = useMemo(() => ['ERC20', 'TRC20'], [])
  const [activeCurrency, setActiveCurrency] = useState(currencies[0])
  const [activeChain, setActiveChain] = useState(chainTypes[0])

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
        <h1 className='text-base font-semibold'>Bind the withdrawal address</h1>
      </div>

      <div className='space-y-5'>
        <div>
          <div className='text-sm text-white/80'>Currently selected currency</div>
          <div className='mt-4 -mr-3 overflow-x-auto overflow-y-hidden pr-3'>
            <div className='flex items-center gap-8 whitespace-nowrap'>
              {currencies.map((currency) => {
                const isActive = currency === activeCurrency
                return (
                  <button
                    key={currency}
                    type='button'
                    onClick={() => setActiveCurrency(currency)}
                    className={`relative pb-2 text-base font-semibold ${isActive ? 'text-[#a6f36a]' : 'text-white/50'}`}
                  >
                    {currency}
                    {isActive && <span className='absolute -bottom-1 left-0 h-1 w-8 rounded-full bg-[#a6f36a]' />}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        <div>
          <div className='text-sm text-white/80'>Chain type</div>
          <div className='mt-3 flex items-center gap-6'>
            {chainTypes.map((chain) => {
              const isActive = chain === activeChain
              return (
                <button
                  key={chain}
                  type='button'
                  onClick={() => setActiveChain(chain)}
                  className={`relative pb-2 text-sm font-semibold ${isActive ? 'text-[#a6f36a]' : 'text-white/50'}`}
                >
                  {chain}
                  {isActive && <span className='absolute -bottom-1 left-0 h-1 w-10 rounded-full bg-[#a6f36a]' />}
                </button>
              )
            })}
          </div>
        </div>

        <div>
          <div className='text-sm text-white/80'>Withdrawal address</div>
          <input
            type='text'
            placeholder='Please enter the withdrawal address'
            className='mt-3 h-12 w-full rounded-full bg-[#3b3b35] px-5 text-sm text-white/90 placeholder:text-white/40'
          />
        </div>
      </div>

      <button
        type='button'
        className='mt-5 w-full rounded-full bg-[#2dd4bf] px-6 py-3 text-base font-semibold text-[#0f172a]'
      >
        Binding
      </button>
    </div>
  )
}

export default BindWithdrawalAddress
