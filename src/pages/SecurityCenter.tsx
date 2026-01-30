import { useNavigate, Link } from 'react-router-dom'

const SecurityCenter = () => {
  const navigate = useNavigate()

  const items = [
    { label: 'Login password', to: '/reset-password' },
    { label: 'Transaction password', to: '/reset-password' }
  ]

  return (
    <div className='px-3 pt-4 text-white'>
      <div className='relative flex items-center justify-center pb-3'>
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
        <h1 className='text-lg font-semibold'>Security center</h1>
      </div>

      <div className='mt-4 divide-y divide-white/10 rounded-3xl bg-[#2a2a2a]'>
        {items.map((item) => (
          <Link key={item.label} to={item.to} className='flex items-center justify-between px-5 py-4 text-white/90'>
            <span>{item.label}</span>
            <div className='flex items-center gap-3 text-white/60'>
              <span>Revise</span>
              <svg width='16' height='16' viewBox='0 0 24 24' fill='none' aria-hidden='true'>
                <path d='M9 6l6 6-6 6' stroke='currentColor' strokeWidth='1.6' strokeLinecap='round' />
              </svg>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default SecurityCenter
