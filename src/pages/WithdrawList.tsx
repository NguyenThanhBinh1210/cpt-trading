import { useNavigate, Link } from 'react-router-dom'
import usdt from '~/assets/usdt.png'
import btc from '~/assets/bitcoin.png'
import eth from '~/assets/eth.png'
import ltc from '~/assets/ltc.png'
import sol from '~/assets/sol.png'
import xrp from '~/assets/xrp.png'
import usdc from '~/assets/usdc.png'
import bnb from '~/assets/bnb.png'
const WithdrawList = () => {
  const navigate = useNavigate()

  const coins = [
    { name: 'USDT', icon: <img src={usdt} alt='usdt' className='w-full h-full object-cover' />, color: 'bg-green-500' },
    { name: 'BTC', icon: <img src={btc} alt='btc' className='w-full h-full object-cover' />, color: 'bg-orange-500' },
    { name: 'ETH', icon: <img src={eth} alt='eth' className='w-full h-full object-cover' />, color: 'bg-gray-600' },
    { name: 'LTC', icon: <img src={ltc} alt='ltc' className='w-full h-full object-cover' />, color: 'bg-blue-500' },
    { name: 'SOL', icon: <img src={sol} alt='sol' className='w-full h-full object-cover' />, color: 'bg-purple-500' },
    { name: 'XRP', icon: <img src={xrp} alt='xrp' className='w-full h-full object-cover' />, color: 'bg-gray-400' },
    { name: 'USDC', icon: <img src={usdc} alt='usdc' className='w-full h-full object-cover' />, color: 'bg-blue-600' },
    { name: 'BNB', icon: <img src={bnb} alt='bnb' className='w-full h-full object-cover' />, color: 'bg-yellow-500' }
  ]

  const getCoinIcon = (coin: typeof coins[0]) => {
    if (coin.name === 'ETH') {
      return (
        <div className='flex h-10 w-10 items-center justify-center rounded-full bg-gray-700 text-white'>
          <svg width='20' height='20' viewBox='0 0 24 24' fill='none' className='text-white'>
            <path
              d='M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5'
              stroke='currentColor'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </div>
      )
    }
    if (coin.name === 'SOL') {
      return (
        <div className='flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 via-purple-500 to-blue-500 text-white'>
          <svg width='20' height='20' viewBox='0 0 24 24' fill='none' className='text-white'>
            <circle cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='1.5' />
            <path d='M8 12l4-4 4 4-4 4-4-4z' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' />
          </svg>
        </div>
      )
    }
    if (coin.name === 'XRP') {
      return (
        <div className='flex h-10 w-10 items-center justify-center rounded-full bg-gray-400 text-white'>
          <span className='text-xl font-bold'>{coin.icon}</span>
        </div>
      )
    }
    if (coin.name === 'BNB') {
      return (
        <div className='flex h-10 w-10 items-center justify-center rounded-full bg-yellow-500 text-white'>
          <svg width='20' height='20' viewBox='0 0 24 24' fill='none' className='text-white'>
            <path
              d='M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5'
              stroke='currentColor'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </div>
      )
    }
    if (coin.name === 'USDC') {
      return (
        <div className='flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white'>
          <span className='text-lg font-bold'>{coin.icon}</span>
        </div>
      )
    }
    return (
      <div className={`flex h-10 w-10 items-center justify-center rounded-full ${coin.color} text-white`}>
        <span className='text-lg font-semibold'>{coin.icon}</span>
      </div>
    )
  }

  return (
    <div className=' pb-10 pt-4 text-white'>
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

      <div className='mt-6 '>
        {coins.map((coin) => (
          <Link
            key={coin.name}
            to={`/withdraw/${coin.name.toLowerCase()}`}
            className='flex items-center justify-between  p-2 py-2 border-b border-white/10'
          >
            <div className='flex items-center gap-3'>
              {getCoinIcon(coin)}
              <span className='text-base text-white/90'>{coin.name} Withdraw</span>
            </div>
            <svg width='18' height='18' viewBox='0 0 24 24' fill='none' aria-hidden='true' className='text-white/40'>
              <path d='M9 6l6 6-6 6' stroke='currentColor' strokeWidth='1.6' strokeLinecap='round' />
            </svg>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default WithdrawList
