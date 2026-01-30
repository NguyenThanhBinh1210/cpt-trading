import { useNavigate } from 'react-router-dom'
import banner from '~/assets/logob0b3bfc6.png'
import coinbase from '~/assets/coinbase.jpg'
import metamask from '~/assets/metamask.jpg'
import imtoken from '~/assets/imtoken.png'
import trust from '~/assets/trust.jpg'
const WalletLogin = () => {
  const navigate = useNavigate()

  const wallets = [
    { name: 'Coinbase', icon: coinbase },
    { name: 'MetaMask', icon: metamask },
    { name: 'imToken', icon: imtoken },
    { name: 'TrustWallet', icon: trust }
  ]

  return (
    <div className='px-4 pb-10 pt-4 text-white'>
      <div className='relative flex items-center justify-center pb-4 mt-4'>
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
      </div>

      <div className='mt-2 flex items-center justify-center'>
        <img src={banner} alt='Wallet banner' className=' object-contain' />
      </div>

      <div className='mt-6 space-y-4'>
        {wallets.map((wallet) => (
          <button
            key={wallet.name}
            type='button'
            className='flex w-full items-center justify-between rounded-2xl bg-[#f3f4f6] px-4 py-3 text-left text-[#111827]'
          >
            <div className='flex items-center gap-3'>
              <span className='flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl bg-white'>
                <img src={wallet.icon} alt={wallet.name} className='h-full w-full object-cover' />
              </span>
              <span className='text-base font-semibold'>{wallet.name}</span>
            </div>
            <span className='text-sm text-[#6b7280]'>connect</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default WalletLogin
