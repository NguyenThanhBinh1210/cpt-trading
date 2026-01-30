import { useNavigate } from 'react-router-dom'

const DepositCoins = () => {
  const navigate = useNavigate()

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
        <h1 className='text-base font-semibold'>Deposit coins</h1>
      </div>

      <div className='rounded-3xl bg-[#3a3a3a] px-5 py-6 text-center'>
        <div className='mx-auto h-40 w-40 rounded-xl bg-[#1f1f1f] p-3'>
          <div className='h-full w-full rounded-lg bg-white' />
        </div>
        <div className='mt-4 text-sm text-white/70'>Currency address</div>
        <div className='mt-2 text-sm text-white/90'>
          0x546dD9d8492e4eeebdA537a9d96B
          <br />
          CFcf8814E1Cc
        </div>
        <button
          type='button'
          className='mt-4 w-full rounded-full bg-[#2dd4bf] px-6 py-3 text-base font-semibold text-white'
        >
          Copy address
        </button>
      </div>

      <div className='mt-6 space-y-4'>
        <div>
          <div className='mb-2 text-sm text-white/80'>Deposit amount</div>
          <input
            type='text'
            placeholder='Deposit amount'
            className='h-12 w-full rounded-full bg-[#3b3b35] px-5 text-sm text-white/90 placeholder:text-white/40'
          />
        </div>

        <div>
          <div className='mb-2 text-sm text-white/80'>Upload certificate</div>
          <div className='flex h-24 w-24 items-center justify-center rounded-2xl bg-[#3b3b35] text-white/60'>
            <svg width='28' height='28' viewBox='0 0 24 24' fill='none' aria-hidden='true'>
              <path
                d='M4 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z'
                stroke='currentColor'
                strokeWidth='1.6'
              />
              <circle cx='12' cy='12' r='3' stroke='currentColor' strokeWidth='1.6' />
            </svg>
          </div>
        </div>
      </div>

      <button
        type='button'
        className='mt-6 w-full rounded-full bg-[#2dd4bf] px-6 py-3 text-base font-semibold text-white'
      >
        Submit transaction screenshot
      </button>
    </div>
  )
}

export default DepositCoins
