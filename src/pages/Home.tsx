import { useState } from 'react'
import aboutImage from '~/assets/phone-demof94b84d4.png'
import homeBanner from '~/assets/home-banner7a91a485.png'
import btcIcon from '~/assets/bitcoin.png'
const Home = () => {
  const [activeMarket, setActiveMarket] = useState<'usdt' | 'derivatives'>('usdt')
  const quickActions = [
    {
      label: 'Service',
      icon: (
        <svg width='22' height='22' viewBox='0 0 24 24' fill='none' aria-hidden='true'>
          <path
            d='M7 8h6M7 12h10M7 16h5M5 6a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3H9l-4 3V6Z'
            stroke='currentColor'
            strokeWidth='1.6'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      )
    },
    {
      label: 'Verified',
      icon: (
        <svg width='22' height='22' viewBox='0 0 24 24' fill='none' aria-hidden='true'>
          <circle cx='12' cy='12' r='9' stroke='currentColor' strokeWidth='1.6' />
          <path
            d='m8.5 12.5 2.4 2.4 4.6-5.3'
            stroke='currentColor'
            strokeWidth='1.6'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      )
    },
    {
      label: 'Recharge',
      icon: (
        <svg width='22' height='22' viewBox='0 0 24 24' fill='none' aria-hidden='true'>
          <rect x='4' y='6' width='16' height='12' rx='2.5' stroke='currentColor' strokeWidth='1.6' />
          <path d='M12 10v4M10 12h4' stroke='currentColor' strokeWidth='1.6' strokeLinecap='round' />
        </svg>
      )
    },
    {
      label: 'Regulatory',
      icon: (
        <svg width='22' height='22' viewBox='0 0 24 24' fill='none' aria-hidden='true'>
          <path
            d='M6 9h12M7 9a5 5 0 0 1 10 0m-8 0v6h6V9'
            stroke='currentColor'
            strokeWidth='1.6'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path d='M5 9h14v8a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2Z' stroke='currentColor' strokeWidth='1.6' />
        </svg>
      )
    },
    {
      label: 'Loan',
      icon: (
        <svg width='22' height='22' viewBox='0 0 24 24' fill='none' aria-hidden='true'>
          <circle cx='12' cy='12' r='9' stroke='currentColor' strokeWidth='1.6' />
          <path d='M8 9h5m-2.5 0v6m-2 0h5' stroke='currentColor' strokeWidth='1.6' strokeLinecap='round' />
        </svg>
      )
    }
  ]

  const marketCards = [
    { pair: 'BTC/USDT', price: '88046.22', change: '-0.30%' },
    { pair: 'ETH/USDT', price: '2933.7', change: '-0.86%' },
    { pair: 'BCH/USDT', price: '576.6', change: '-0.90%' },
    { pair: 'XRP/USDT', price: '1.87509', change: '-0.19%' },
    { pair: 'TRUMP/USDT', price: '4.6532', change: '-1.28%' }
  ]

  const marketList = [
    { name: 'BTC', pair: 'BTC/USDT', price: '88046.22', change: '-0.30%', color: '#f59e0b', icon: btcIcon },
    { name: 'XRP', pair: 'XRP/USDT', price: '1.87509', change: '-0.19%', color: '#64748b', icon: btcIcon },
    { name: 'TRUMP', pair: 'TRUMP/USDT', price: '4.6532', change: '-1.28%', color: '#f43f5e', icon: btcIcon }
  ]

  const derivativesList = [
    { name: 'XAUUSD', price: '5501.29', change: '-1.02%', trend: 'down' },
    { name: 'EURUSD', price: '1.19644', change: '-0.21%', trend: 'down' },
    { name: 'UKOil', price: '70.357', change: '+2.93%', trend: 'up' },
    { name: 'USOil', price: '66.278', change: '+3.08%', trend: 'up' },
    { name: 'XAGUSD', price: '119.366', change: '+0.83%', trend: 'up' },
    { name: 'JPYUSD', price: '153.121', change: '+0.10%', trend: 'up' },
    { name: 'AUDUSD', price: '0.70709', change: '-0.27%', trend: 'down' }
  ] as const

  return (
    <div className='space-y-6'>
      <img src={homeBanner} alt='home banner' className='' />

      <section className='grid grid-cols-5 gap-2 text-center text-[11px] text-[#cbd5e1]'>
        {quickActions.map((item) => (
          <div key={item.label} className='flex flex-col items-center gap-2'>
            <div className='flex h-11 w-11 items-center justify-center rounded-full bg-[#2a2a2a] text-[#a6f36a]'>
              {item.icon}
            </div>
            <span className='leading-tight'>{item.label}</span>
            {item.label === 'Regulatory' && <span className='-mt-2 text-[10px]'>Information</span>}
          </div>
        ))}
      </section>

      <section className=' overflow-x-auto pb-2 pr-4'>
        <div className='flex gap-3'>
          {marketCards.map((card) => (
            <div
              key={card.pair}
              className='min-w-[38%] flex-1 rounded-2xl bg-gradient-to-b from-[#4c6a2b] to-[#2c3b1b] p-4 text-center shadow'
            >
              <div className='text-xs font-semibold text-white/90'>{card.pair}</div>
              <div className='mt-3 text-lg font-semibold text-[#f87171]'>{card.price}</div>
              <div className='mt-2 text-xs text-[#f87171]'>↓ {card.change}</div>
            </div>
          ))}
        </div>
      </section>

      <section className='flex items-center gap-6 text-lg font-semibold text-[#94a3b8]'>
        <button
          type='button'
          onClick={() => setActiveMarket('usdt')}
          className={`relative ${activeMarket === 'usdt' ? 'text-[#a6f36a]' : ''}`}
        >
          USDT
          {activeMarket === 'usdt' && <span className='absolute -bottom-2 left-0 h-1 w-10 rounded-full bg-[#a6f36a]' />}
        </button>
        <button
          type='button'
          onClick={() => setActiveMarket('derivatives')}
          className={`relative ${activeMarket === 'derivatives' ? 'text-[#a6f36a]' : ''}`}
        >
          Derivatives
          {activeMarket === 'derivatives' && (
            <span className='absolute -bottom-2 left-0 h-1 w-14 rounded-full bg-[#a6f36a]' />
          )}
        </button>
      </section>

      {activeMarket === 'usdt' ? (
        <section className='space-y-3'>
          {marketList.map((asset) => (
            <div key={asset.name} className='flex items-center justify-between rounded-2xl bg-[#2a2a2a] px-4 py-4'>
              <div className='flex items-center gap-3'>
                <div
                  className='flex h-11 w-11 items-center justify-center rounded-full text-sm font-semibold text-white'
                  style={{ backgroundColor: asset.color }}
                >
                  <img src={asset.icon} alt={asset.name} className='h-full w-full object-cover' />
                </div>
                <div>
                  <div className='text-sm font-semibold text-white'>{asset.name}</div>
                  <div className='text-xs text-[#94a3b8]'>{asset.pair}</div>
                </div>
              </div>
              <div className='text-right'>
                <div className='text-sm font-semibold text-white'>{asset.price}</div>
                <div className='text-xs text-[#f87171]'>↓ {asset.change}</div>
              </div>
            </div>
          ))}
        </section>
      ) : (
        <section className='space-y-3'>
          {derivativesList.map((asset) => {
            const isUp = asset.trend === 'up'
            const accent = isUp ? '#35d0a0' : '#f87171'
            return (
              <div key={asset.name} className='flex items-center justify-between rounded-2xl bg-[#2a2a2a] px-4 py-5'>
                <div>
                  <div className='text-base font-semibold text-white'>{asset.name}</div>
                  <div className='mt-2 text-sm text-[#cbd5e1]'>{asset.price}</div>
                </div>
                <div className='flex items-center gap-3 text-sm font-semibold' style={{ color: accent }}>
                  <svg width='56' height='18' viewBox='0 0 56 18' fill='none' aria-hidden='true'>
                    <path
                      d={isUp ? 'M2 12l10-4 8 6 10-7 8 5 6-3' : 'M2 6l10 4 8-6 10 7 8-5 6 3'}
                      stroke={accent}
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                  <span className='text-base'>{isUp ? '↑' : '↓'}</span>
                  <span>{asset.change}</span>
                </div>
              </div>
            )
          })}
        </section>
      )}

      <section className='rounded-3xl bg-[#2a2a2a] p-6 text-[#e2e8f0]'>
        <h2 className='text-xl font-semibold text-white'>About Us</h2>
        <p className='mt-4 text-sm leading-6 text-[#cbd5e1]'>
          We are a leading trading platform dedicated to providing safe, efficient and reliable digital asset trading
          services. Our mission is to provide advanced cryptocurrency trading experiences to global users and promote
          the development and innovation of the digital asset market.
        </p>
        <div className='mt-5 flex justify-center'>
          <img src={aboutImage} alt='About platform' className='h-36 w-36 rounded-2xl object-cover ' />
        </div>
        <p className='mt-5 text-sm leading-6 text-[#cbd5e1]'>
          In the field of digital currency, we are committed to becoming a leading innovator and industry benchmark. Our
          vision is to build a world-leading digital asset trading platform through technological innovation and service
          excellence, providing users with the best trading experience and the most comprehensive selection of digital
          assets.
        </p>
      </section>
    </div>
  )
}

export default Home
