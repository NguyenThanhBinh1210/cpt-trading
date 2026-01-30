import { useState } from 'react'
import { Link } from 'react-router-dom'
import imageSrc from '~/assets/aianh.jpg'

const Finance = () => {
  const [activeTab, setActiveTab] = useState<'mining' | 'ieo'>('mining')
  const products = [
    { title: '180MH/S', rate: '0.3', min: '100.00' },
    { title: '540MH/S', rate: '0.6', min: '1000.00' },
    { title: '720MH/S', rate: '0.8', min: '5000.00' },
    { title: '10TH/S', rate: '1', min: '10000.00' },
    { title: '15TH/S', rate: '1.3', min: '30000.00' },
    { title: '20TH/S', rate: '1.6', min: '50000.00' },
    { title: '50TH/S', rate: '2.2', min: '300000.00' }
  ]
  const ieoLaunchpad = [
    {
      title: 'EBUN ICO',
      status: 'Drawing lots',
      action: 'Participate in activities',
      amountLeft: '73199992 EBUN',
      totalAmount: '73200000 EBUN',
      remaining: '0.00%'
    },
    {
      title: 'ETF ICO',
      status: 'In progress',
      action: 'Participate in activities',
      amountLeft: '37542932 ETF',
      totalAmount: '50000000 ETF',
      remaining: '24.91%'
    }
  ]

  return (
    <div className='   text-white'>
      <div className='sticky top-0 z-10 bg-[#1f1f1f] pt-4 pb-4'>
        <div className='flex items-center justify-evenly text-lg font-semibold text-white/70'>
          <button
            type='button'
            onClick={() => setActiveTab('mining')}
            className={activeTab === 'mining' ? 'text-white' : ''}
          >
            AI&Mining
          </button>
          <button type='button' onClick={() => setActiveTab('ieo')} className={activeTab === 'ieo' ? 'text-white' : ''}>
            IEO Launchpad
          </button>
        </div>

        <p className='text-sm text-white/60 px-2 mt-4'>
          Our advanced AI supercomputing investment products can help you achieve stable profits in the market
        </p>
      </div>

      <section className='rounded-md  p-4'>
        <div className='mb-4 flex items-center justify-between'>
          <h2 className='text-base font-semibold text-white'>Featured Products</h2>
          <Link
            to='/earnings-details'
            className='flex items-center justify-center rounded-xl bg-[#1f1f1f] text-white/60'
          >
            <svg width='30' height='30' viewBox='0 0 24 24' fill='none' aria-hidden='true'>
              <path
                d='M8 4h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z'
                stroke='currentColor'
                strokeWidth='1.6'
              />
              <path d='M10 9h4M10 13h6' stroke='currentColor' strokeWidth='1.6' strokeLinecap='round' />
            </svg>
          </Link>
        </div>

        <div className='space-y-4'>
          {activeTab === 'mining' ? (
            <>
              {products.map((product) => (
                <div key={product.title} className='rounded-xl bg-[#3a3a3a] px-5 py-5 text-white'>
                  <div className='text-center text-xl font-semibold'>{product.title}</div>
                  <div className='my-4 border-t border-white/10' />
                  <div className='flex items-center gap-4'>
                    <img src={imageSrc} alt='Product' className='h-16 w-16 rounded-xl object-cover' />
                    <div className='flex-1'>
                      <div className='text-sm text-white/70'>USDT</div>
                      <div className='mt-2 text-sm text-white/70'>Average Daily Return: {product.rate} %</div>
                      <div className='text-sm text-white/70'>Minimum Purchase Amount {product.min}</div>
                    </div>
                  </div>
                  <Link
                    to='/purchase'
                    className='mt-5 block w-full rounded-xl bg-[#2dd4bf] px-6 py-3 text-center text-base font-semibold text-white'
                  >
                    Purchase
                  </Link>
                </div>
              ))}
              <div className='pt-2 text-center text-sm text-white/40'>No more</div>
            </>
          ) : (
            <>
              {ieoLaunchpad.map((item) => (
                <div key={item.title} className='rounded-xl bg-[#3a3a3a] px-5 py-5 text-white'>
                  <div className='flex items-center justify-between'>
                    <div className='text-xl font-semibold'>{item.title}</div>
                    <Link
                      to='/ieo-purchase'
                      className='rounded-md bg-[#2dd4bf] px-4 py-2 text-sm font-semibold text-white'
                    >
                      {item.action}
                    </Link>
                  </div>
                  <button
                    type='button'
                    className='mt-3 rounded-md border border-[#2dd4bf] px-2 py-0.5 text-sm text-[#2dd4bf]'
                  >
                    {item.status}
                  </button>
                  <div className='mt-4 text-sm text-white/90 flex items-center justify-between '>
                    {item.amountLeft} / <span className='text-gray-400'>{item.totalAmount} </span>
                    <span className='ml-2 text-white/80'>Remaining: {item.remaining}</span>
                  </div>
                  <div className='mt-4 h-3 w-full rounded-full bg-white/10'>
                    <div
                      className='h-3 rounded-full bg-[#2dd4bf] text-center relative text-[10px] text-white'
                      style={{ width: item.remaining }}
                    >
                      <div className='absolute top-0 right-0 translate-x-1/2 rounded-md scale-150 -translate-y-0.5 px-1 w-max bg-[#2dd4bf]'>
                        <span className='text-[7px] '>{item.remaining}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className='pt-2 text-center text-sm text-white/40'>No more</div>
            </>
          )}
        </div>
      </section>
    </div>
  )
}

export default Finance
