import { NavLink } from 'react-router-dom'

const Footer = () => {
  const navItems = [
    {
      label: 'Home',
      to: '/',
      icon: (
        <svg width='22' height='22' viewBox='0 0 24 24' fill='none' aria-hidden='true'>
          <path
            d='M4 11.2 12 5l8 6.2V20a1 1 0 0 1-1 1h-4.5v-6h-5v6H5a1 1 0 0 1-1-1Z'
            stroke='currentColor'
            strokeWidth='1.6'
            strokeLinejoin='round'
          />
        </svg>
      )
    },
    {
      label: 'Coins',
      to: '/coins',
      icon: (
        <svg width='22' height='22' viewBox='0 0 24 24' fill='none' aria-hidden='true'>
          <path
            d='M4 16.5 9 12l4 3 7-6.5M4 19h16'
            stroke='currentColor'
            strokeWidth='1.6'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      )
    },
    {
      label: 'Contract',
      to: '/contract',
      icon: (
        <svg width='22' height='22' viewBox='0 0 24 24' fill='none' aria-hidden='true'>
          <path
            d='M6 7a3 3 0 0 1 3-3h3a3 3 0 1 1 0 6H9A3 3 0 0 1 6 7Zm6 10a3 3 0 0 0 3 3h3a3 3 0 0 0 0-6h-3a3 3 0 0 0-3 3Z'
            stroke='currentColor'
            strokeWidth='1.6'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      )
    },
    {
      label: 'Finance',
      to: '/finance',
      icon: (
        <svg width='22' height='22' viewBox='0 0 24 24' fill='none' aria-hidden='true'>
          <path
            d='M4 12h16M12 4v16M7 7l10 10M17 7 7 17'
            stroke='currentColor'
            strokeWidth='1.6'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      )
    },
    {
      label: 'Mine',
      to: '/mine',
      icon: (
        <svg width='22' height='22' viewBox='0 0 24 24' fill='none' aria-hidden='true'>
          <path
            d='M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm-7 8a7 7 0 0 1 14 0Z'
            stroke='currentColor'
            strokeWidth='1.6'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      )
    }
  ]

  return (
    <footer className='fixed bottom-3 left-1/2 z-20 w-[92%] max-w-screen-sm -translate-x-1/2 text-white'>
      <div className='md:px-4'>
        <div className='rounded-full border border-white/10 bg-[#2a2a2a]/90 px-6 py-3 backdrop-blur'>
          <div className='flex items-center justify-between'>
            {navItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `flex flex-col items-center gap-1 text-[11px] ${isActive ? 'text-[#a6f36a]' : 'text-[#94a3b8]'}`
                }
              >
                {({ isActive }) => {
                  return (
                    <>
                      <span
                        className={`flex h-9 w-9 items-center justify-center rounded-2xl ${isActive ? 'bg-[#2f2f2f]' : 'bg-transparent'
                          }`}
                      >
                        {item.icon}
                      </span>
                      {item.label}
                    </>
                  )
                }}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
