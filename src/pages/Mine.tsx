import { useState } from 'react'
import { Link } from 'react-router-dom'

const Mine = () => {
  const [showAssets, setShowAssets] = useState(true)
  const quickActions = [
    {
      label: 'Recharge',
      to: '/recharge',
      icon: (
        <svg width='22' height='22' viewBox='0 0 24 24' fill='none' aria-hidden='true'>
          <path
            d='M12 4a8 8 0 1 0 8 8'
            stroke='currentColor'
            strokeWidth='1.6'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M12 7v6m0-6 2.5 2.5M12 7 9.5 9.5'
            stroke='currentColor'
            strokeWidth='1.6'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      )
    },
    {
      label: 'Withdraw',
      to: '/withdraw',
      icon: (
        <svg width='22' height='22' viewBox='0 0 24 24' fill='none' aria-hidden='true'>
          <path
            d='M12 20a8 8 0 1 0-8-8'
            stroke='currentColor'
            strokeWidth='1.6'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path d='M12 17v-6m0 6-2.5-2.5M12 17l2.5-2.5' stroke='currentColor' strokeWidth='1.6' strokeLinecap='round' />
        </svg>
      )
    },
    {
      label: 'Transfer',
      to: '/transfer',
      icon: (
        <svg width='22' height='22' viewBox='0 0 24 24' fill='none' aria-hidden='true'>
          <path
            d='M4 8h12m0 0-3-3m3 3-3 3M20 16H8m0 0 3 3m-3-3 3-3'
            stroke='currentColor'
            strokeWidth='1.6'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      )
    },
    {
      label: 'Exchange',
      to: '/exchange',
      icon: (
        <svg width='22' height='22' viewBox='0 0 24 24' fill='none' aria-hidden='true'>
          <path
            d='M7 7h8m0 0-2.5-2.5M15 7 12.5 9.5M17 17H9m0 0 2.5-2.5M9 17l2.5 2.5'
            stroke='currentColor'
            strokeWidth='1.6'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      )
    }
  ]

  const accountCenter = [
    {
      label: 'Referral link',
      to: '/referral-link',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
        </svg>

      )
    },
    {
      label: 'Security center',
      to: '/security-center',
      icon: (
        <svg width='18' height='18' viewBox='0 0 24 24' fill='none' aria-hidden='true'>
          <path
            d='M12 3 4 6v6c0 5 8 9 8 9s8-4 8-9V6l-8-3Z'
            stroke='currentColor'
            strokeWidth='1.6'
            strokeLinejoin='round'
          />
        </svg>
      )
    },
    {
      label: 'Bind the withdrawal address',
      to: '/bind-withdrawal-address',
      icon: (
        <svg width='18' height='18' viewBox='0 0 24 24' fill='none' aria-hidden='true'>
          <path
            d='M12 21s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11Z'
            stroke='currentColor'
            strokeWidth='1.6'
            strokeLinejoin='round'
          />
          <circle cx='12' cy='10' r='2.5' stroke='currentColor' strokeWidth='1.6' />
        </svg>
      )
    }
  ]

  const universal = [
    {
      label: 'Service',
      to: '/service',
      icon: (
        <svg width='18' height='18' viewBox='0 0 24 24' fill='none' aria-hidden='true'>
          <path d='M4 6h16v10a2 2 0 0 1-2 2H8l-4 3V6Z' stroke='currentColor' strokeWidth='1.6' strokeLinejoin='round' />
        </svg>
      )
    },
    {
      label: 'White paper',
      icon: (
        <svg width='18' height='18' viewBox='0 0 24 24' fill='none' aria-hidden='true'>
          <path
            d='M7 4h7l4 4v12a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Z'
            stroke='currentColor'
            strokeWidth='1.6'
          />
          <path d='M14 4v4h4' stroke='currentColor' strokeWidth='1.6' />
        </svg>
      )
    },
    {
      label: 'Submit a work order',
      to: '/work-order',
      icon: (
        <svg width='18' height='18' viewBox='0 0 24 24' fill='none' aria-hidden='true'>
          <path d='M7 4h10v16H7z' stroke='currentColor' strokeWidth='1.6' strokeLinejoin='round' />
          <path d='M9 9h6M9 13h6M9 17h4' stroke='currentColor' strokeWidth='1.6' strokeLinecap='round' />
        </svg>
      )
    },
    {
      label: 'Download App',
      href: 'https://m.cptesing.com/app/',
      icon: (
        <svg width='18' height='18' viewBox='0 0 24 24' fill='none' aria-hidden='true'>
          <path
            d='M12 3v10m0 0 3-3m-3 3-3-3M5 15v3a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-3'
            stroke='currentColor'
            strokeWidth='1.6'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      )
    },
    {
      label: 'Other',
      to: '/other',
      icon: (
        <svg width='18' height='18' viewBox='0 0 24 24' fill='none' aria-hidden='true'>
          <path d='M12 8.5a3.5 3.5 0 1 0 3.5 3.5 3.5 3.5 0 0 0-3.5-3.5Z' stroke='currentColor' strokeWidth='1.6' />
          <path
            d='M19.4 12a7.5 7.5 0 0 0-.1-1.2l2-1.5-2-3.4-2.4.9a7.5 7.5 0 0 0-2.1-1.2l-.3-2.5h-4l-.3 2.5a7.5 7.5 0 0 0-2.1 1.2l-2.4-.9-2 3.4 2 1.5a7.5 7.5 0 0 0 0 2.4l-2 1.5 2 3.4 2.4-.9a7.5 7.5 0 0 0 2.1 1.2l.3 2.5h4l.3-2.5a7.5 7.5 0 0 0 2.1-1.2l2.4.9 2-3.4-2-1.5c.1-.4.1-.8.1-1.2Z'
            stroke='currentColor'
            strokeWidth='1.6'
            strokeLinejoin='round'
          />
        </svg>
      )
    }
  ]

  return (
    <div className='space-y-6 px-2 pt-4 text-white'>
      <div className='flex items-center justify-between'>
        <Link to='/login' className='rounded-2xl bg-[#2dd4bf] px-6 py-3 text-sm font-semibold text-[#0f172a]'>
          Go to login
        </Link>
        <div>
          <div>
            thanhbinh@gmail.com
          </div>
          <div className='flex items-center gap-2 text-white/70 text-xs'>
            <span>UID: 1423423</span> <span>Credit score: 100</span>
          </div>
        </div>
        <Link
          to='/language'
          className='flex h-12 w-12 items-center justify-center rounded-2xl bg-[#2a2a2a]'
          aria-label='Language'
        >
          <svg width='22' height='22' viewBox='0 0 24 24' fill='none' aria-hidden='true'>
            <circle cx='12' cy='12' r='9' stroke='currentColor' strokeWidth='1.6' />
            <path
              d='M3 12h18M12 3a15.3 15.3 0 0 1 0 18M12 3a15.3 15.3 0 0 0 0 18'
              stroke='currentColor'
              strokeWidth='1.6'
              strokeLinecap='round'
            />
          </svg>
        </Link>
      </div>

      <section className='rounded-3xl bg-gradient-to-b from-[#4f6a2b] to-[#2c3b1b] px-5 py-4'>
        <div className='flex items-start justify-between'>
          <div className='text-sm text-white/90'>My assets(USDT)</div>
          <button
            type='button'
            className='text-white/80'
            onClick={() => setShowAssets((prev) => !prev)}
            aria-label={showAssets ? 'Hide balance' : 'Show balance'}
          >
            <svg width='20' height='20' viewBox='0 0 24 24' fill='none' aria-hidden='true'>
              <path d='M2 12s4-6 10-6 10 6 10 6-4 6-10 6-10-6-10-6Z' stroke='currentColor' strokeWidth='1.6' />
              <circle cx='12' cy='12' r='3' stroke='currentColor' strokeWidth='1.6' />
            </svg>
          </button>
        </div>
        <div className='mt-5 text-center text-3xl font-semibold text-white'>{showAssets ? '0' : '******'}</div>
        <div className='mt-4 flex items-center justify-between text-sm text-white/70'>
          <span>Available:</span>
          <div className='flex items-center gap-2'>
            <span>{showAssets ? '0' : '******'}</span>
            <svg width='18' height='18' viewBox='0 0 24 24' fill='none' aria-hidden='true' className='text-white/40'>
              <path d='M9 6l6 6-6 6' stroke='currentColor' strokeWidth='1.6' strokeLinecap='round' />
            </svg>
          </div>
        </div>
      </section>

      <section className='grid grid-cols-4 gap-3 text-center text-sm text-white/90'>
        {quickActions.map((action) => {
          const content = (
            <>
              <div className='flex h-12 w-12 items-center justify-center rounded-2xl bg-[#3a3a3a] text-white'>
                {action.icon}
              </div>
              <span>{action.label}</span>
            </>
          )

          if (action.to) {
            return (
              <Link key={action.label} to={action.to} className='flex flex-col items-center gap-3'>
                {content}
              </Link>
            )
          }

          return (
            <div key={action.label} className='flex flex-col items-center gap-3'>
              {content}
            </div>
          )
        })}
      </section>

      <div>
        <div className='mb-3 text-base text-white/80'>Account center</div>
        <div className='space-y-3 rounded-3xl bg-[#3b3b35] p-4'>
          {accountCenter.map((item) => {
            const row = (
              <div className='flex items-center justify-between text-white/90'>
                <div className='flex items-center gap-3'>
                  <span className='flex h-9 w-9 items-center justify-center rounded-2xl bg-[#2f2f2a] text-white/80'>
                    {item.icon}
                  </span>
                  {item.label}
                </div>
                <svg
                  width='18'
                  height='18'
                  viewBox='0 0 24 24'
                  fill='none'
                  aria-hidden='true'
                  className='text-white/40'
                >
                  <path d='M9 6l6 6-6 6' stroke='currentColor' strokeWidth='1.6' strokeLinecap='round' />
                </svg>
              </div>
            )

            if (item.to) {
              return (
                <Link key={item.label} to={item.to} className='block'>
                  {row}
                </Link>
              )
            }

            return <div key={item.label}>{row}</div>
          })}
        </div>
      </div>

      <div>
        <div className='mb-3 text-base text-white/80'>Universal</div>
        <div className='space-y-3 rounded-3xl bg-[#3b3b35] p-4'>
          {universal.map((item) => {
            const row = (
              <div className='flex items-center justify-between text-white/90'>
                <div className='flex items-center gap-3'>
                  <span className='flex h-9 w-9 items-center justify-center rounded-2xl bg-[#2f2f2a] text-white/80'>
                    {item.icon}
                  </span>
                  {item.label}
                </div>
                <svg
                  width='18'
                  height='18'
                  viewBox='0 0 24 24'
                  fill='none'
                  aria-hidden='true'
                  className='text-white/40'
                >
                  <path d='M9 6l6 6-6 6' stroke='currentColor' strokeWidth='1.6' strokeLinecap='round' />
                </svg>
              </div>
            )

            if (item.to) {
              return (
                <Link key={item.label} to={item.to} className='block'>
                  {row}
                </Link>
              )
            }

            if (item.href) {
              return (
                <a key={item.label} href={item.href} target='_blank' rel='noreferrer' className='block'>
                  {row}
                </a>
              )
            }

            return <div key={item.label}>{row}</div>
          })}
        </div>
      </div>
    </div>
  )
}

export default Mine
