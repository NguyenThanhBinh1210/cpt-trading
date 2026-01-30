import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className='flex items-center justify-between px-2 pt-4 text-white '>
      <Link to='/mine'>
        <button
          aria-label='Profile'
          className='flex h-12 w-12 items-center justify-center rounded-2xl bg-[#2a2a2a] text-[#cbd5e1]'
          type='button'
        >
          <svg width='22' height='22' viewBox='0 0 24 24' fill='none' aria-hidden='true'>
            <path
              d='M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm-7 8a7 7 0 0 1 14 0Z'
              stroke='currentColor'
              strokeWidth='1.6'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </button>
      </Link>
      <Link
        to='/language'
        aria-label='Language'
        className='flex h-12 w-12 items-center justify-center rounded-2xl bg-[#2a2a2a] text-[#cbd5e1]'
      >
        <svg width='22' height='22' viewBox='0 0 24 24' fill='none' aria-hidden='true'>
          <path
            d='M3 12h18M12 3a15.3 15.3 0 0 1 0 18M12 3a15.3 15.3 0 0 0 0 18M3.5 8h17M3.5 16h17'
            stroke='currentColor'
            strokeWidth='1.6'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <circle cx='12' cy='12' r='9' stroke='currentColor' strokeWidth='1.6' />
        </svg>
      </Link>
    </header>
  )
}

export default Header
