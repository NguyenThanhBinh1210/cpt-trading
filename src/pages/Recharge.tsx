import { useNavigate, Link } from 'react-router-dom'
import usdc from '~/assets/usdc.png'
import usdt from '~/assets/usdt.png'
import eth from '~/assets/eth.png'
import btc from '~/assets/bitcoin.png'
const Recharge = () => {
  const navigate = useNavigate()

  const networks = [
    { label: 'USDC-ERC20', icon: usdc },
    { label: 'USDT-TRC20', icon: usdt },
    { label: 'USDT-ERC20', icon: usdt },
    { label: 'ETH-Ethereum', icon: eth },
    { label: 'BTC-Bitcoin', icon: btc }
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
        <h1 className='text-base font-semibold'>Recharge</h1>
      </div>

      <div className='rounded-3xl bg-[#3a3a3a] '>
        <div className='text-base font-semibold text-white p-4'>Choose Network</div>
        <div className=''>
          {networks.map((network) => (
            <Link
              key={network.label}
              to='/deposit-coins'
              className='flex items-center justify-between rounded-2xl  px-4 py-1.5'
            >
              <div className='flex items-center gap-3'>
                <span className='flex h-10 w-10 items-center justify-center rounded-full bg-[#1f1f1f] text-xs font-semibold text-white/80'>
                  <img src={network.icon} alt={network.label} className='w-full h-full object-cover' />
                </span>
                <span className='text-base text-white/90'>{network.label}</span>
              </div>
              <svg width='18' height='18' viewBox='0 0 24 24' fill='none' aria-hidden='true' className='text-white/40'>
                <path d='M9 6l6 6-6 6' stroke='currentColor' strokeWidth='1.6' strokeLinecap='round' />
              </svg>
            </Link>
          ))}
        </div>
      </div>

      <div className='mt-4 rounded-2xl bg-[#3a3a3a] px-4 py-4 text-white/90'>
        <div className='flex items-center justify-between'>
          <span className='text-base'>Bank Card Recharge</span>
          <svg width='18' height='18' viewBox='0 0 24 24' fill='none' aria-hidden='true' className='text-white/40'>
            <path d='M9 6l6 6-6 6' stroke='currentColor' strokeWidth='1.6' strokeLinecap='round' />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default Recharge
