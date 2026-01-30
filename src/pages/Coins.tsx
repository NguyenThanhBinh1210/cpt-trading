import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

type OrderRow = {
  price: string
  qty: string
}

type CoinData = {
  symbol: string
  price: string
  priceChangePercent: string
}

const Coins = () => {
  const navigate = useNavigate()
  const [side, setSide] = useState<'buy' | 'sell'>('buy')
  const [priceType, setPriceType] = useState<'Market price' | 'Price limit'>('Market price')
  const [showPriceSheet, setShowPriceSheet] = useState(false)
  const [percent, setPercent] = useState(0)
  const [showCoinMenu, setShowCoinMenu] = useState(false)
  const [coins, setCoins] = useState<CoinData[]>([])
  const [selectedPair, setSelectedPair] = useState('ETH/USDT')
  const [coinData, setCoinData] = useState<CoinData | null>(null)
  const [orderBook, setOrderBook] = useState<{ bids: OrderRow[]; asks: OrderRow[] }>({
    bids: [],
    asks: []
  })
  const depthWsRef = useRef<WebSocket | null>(null)

  const sellOrders = orderBook.asks
  const buyOrders = orderBook.bids

  const maxQty = Math.max(...sellOrders.map((row) => Number(row.qty)), ...buyOrders.map((row) => Number(row.qty)), 1)

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        interface BinanceTicker {
          symbol: string
          lastPrice: string
          priceChangePercent: string
        }
        const response = await axios.get<BinanceTicker[]>('https://api.binance.com/api/v3/ticker/24hr')
        const list = response.data
          .filter((item) => item.symbol.endsWith('USDT'))
          .map((item) => ({
            symbol: item.symbol.replace('USDT', '/USDT'),
            price: Number(item.lastPrice).toFixed(4),
            priceChangePercent: Number(item.priceChangePercent).toFixed(2)
          }))
          .slice(0, 50)
        setCoins(list)
      } catch (error) {
        console.error('Error fetching coins:', error)
      }
    }
    fetchCoins()
  }, [])

  useEffect(() => {
    const fetchCoinData = async () => {
      try {
        const symbol = selectedPair.replace('/', '')
        const response = await axios.get(`https://api.binance.com/api/v3/ticker/24hr?symbol=${symbol}`)
        const data = response.data
        setCoinData({
          symbol: data.symbol.replace('USDT', '/USDT'),
          price: Number(data.lastPrice).toFixed(4),
          priceChangePercent: Number(data.priceChangePercent).toFixed(2)
        })
      } catch (error) {
        console.error('Error fetching coin data:', error)
      }
    }

    fetchCoinData()
    const intervalId = setInterval(fetchCoinData, 5000)
    return () => clearInterval(intervalId)
  }, [selectedPair])

  useEffect(() => {
    const symbol = selectedPair.replace('/', '')
    const fetchDepth = async () => {
      try {
        interface DepthResponse {
          bids: [string, string][]
          asks: [string, string][]
        }
        const response = await axios.get<DepthResponse>(`https://api.binance.com/api/v3/depth?symbol=${symbol}&limit=5`)
        setOrderBook({
          bids: response.data.bids.map(([price, qty]) => ({ price, qty })),
          asks: response.data.asks.map(([price, qty]) => ({ price, qty }))
        })
      } catch (error) {
        console.error('Error fetching order book:', error)
      }
    }

    fetchDepth()

    if (depthWsRef.current) {
      depthWsRef.current.close()
    }

    const depthWs = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@depth5@100ms`)
    depthWs.onmessage = (event) => {
      const payload = JSON.parse(event.data) as { b: [string, string][]; a: [string, string][] }
      setOrderBook({
        bids: payload.b.map(([price, qty]) => ({ price, qty })),
        asks: payload.a.map(([price, qty]) => ({ price, qty }))
      })
    }
    depthWsRef.current = depthWs

    return () => {
      depthWs.close()
    }
  }, [selectedPair])

  return (
    <div className='bg-[#1f1f1f] px-4 pb-10 pt-4 text-white'>
      <div className='flex items-center justify-between'>
        <button type='button' className='text-white/70' onClick={() => setShowCoinMenu(true)}>
          <svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
            <path d='M3 6h18M3 12h18M3 18h18' stroke='currentColor' strokeWidth='2' strokeLinecap='round' />
          </svg>
        </button>
        <div className='flex items-center gap-2 text-sm'>
          <span>{coinData?.symbol || selectedPair}</span>
          <span className={Number(coinData?.priceChangePercent ?? 0) >= 0 ? 'text-green-400' : 'text-red-500'}>
            {coinData?.priceChangePercent ?? '0.00'}%
          </span>
        </div>
        <div className='flex items-center gap-3 text-white/70'>
          <button type='button'>
            <svg width='20' height='20' viewBox='0 0 24 24' fill='none'>
              <path d='M7 6v12M17 6v12M4 10h6M14 14h6' stroke='currentColor' strokeWidth='1.6' strokeLinecap='round' />
            </svg>
          </button>
          <button type='button'>
            <svg width='20' height='20' viewBox='0 0 24 24' fill='none'>
              <path d='M5 4h9l5 5v11H5V4Z' stroke='currentColor' strokeWidth='1.6' />
              <path d='M14 4v5h5' stroke='currentColor' strokeWidth='1.6' />
            </svg>
          </button>
        </div>
      </div>

      <div
        className={`mt-4 text-2xl font-semibold ${Number(coinData?.priceChangePercent ?? 0) >= 0 ? 'text-green-400' : 'text-red-500'
          }`}
      >
        {coinData?.price ?? '0.00'}
      </div>

      <div className='mt-4 grid grid-cols-3 text-xs text-white/60'>
        <div>Price</div>
        <div className='text-center'>Quantity</div>
        <div className='text-right'>Price</div>
      </div>

      <div className='mt-2 grid grid-cols-3 gap-2 text-xs'>
        <div className='space-y-1'>
          {sellOrders.map((row) => (
            <div key={row.price} className='relative overflow-hidden rounded-sm'>
              <div
                className='absolute right-0 top-0 h-full bg-[#5a2a2a]'
                style={{ width: `${(Number(row.qty) / maxQty) * 100}%` }}
              />
              <div className='relative z-10 text-red-400'>{row.price}</div>
            </div>
          ))}
        </div>
        <div className='grid grid-cols-2 gap-2 text-center text-white/60'>
          <div className='space-y-1'>
            {sellOrders.map((row) => (
              <div className='text-right' key={`sell-${row.price}`}>
                {row.qty}
              </div>
            ))}
          </div>
          <div className='space-y-1'>
            {buyOrders.map((row) => (
              <div className='text-left' key={`buy-${row.price}`}>
                {row.qty}
              </div>
            ))}
          </div>
        </div>
        <div className='space-y-1 text-right'>
          {buyOrders.map((row) => (
            <div key={row.price} className='relative overflow-hidden rounded-sm'>
              <div
                className='absolute left-0 top-0 h-full bg-[#1f4a3f]'
                style={{ width: `${(Number(row.qty) / maxQty) * 100}%` }}
              />
              <div className='relative z-10 text-[#2dd4bf]'>{row.price}</div>
            </div>
          ))}
        </div>
      </div>

      <div className='mt-4 flex items-center gap-3'>
        <button
          type='button'
          onClick={() => setSide('buy')}
          className={`rounded-full px-6 py-2 text-sm font-semibold ${side === 'buy' ? 'bg-[#2dd4bf] text-[#0f172a]' : 'bg-[#2f2f2f] text-white/70'
            }`}
        >
          Purchase
        </button>
        <button
          type='button'
          onClick={() => setSide('sell')}
          className={`rounded-full px-6 py-2 text-sm font-semibold ${side === 'sell' ? 'bg-[#ef4444] text-white' : 'bg-[#2f2f2f] text-white/70'
            }`}
        >
          Sell
        </button>
        <button
          type='button'
          onClick={() => setShowPriceSheet(true)}
          className='flex items-center gap-2 rounded-full bg-[#2f2f2f] px-4 py-2 text-sm text-white/70'
        >
          <span>{priceType}</span>
          <svg width='14' height='14' viewBox='0 0 24 24' fill='none'>
            <path d='M6 9l6 6 6-6' stroke='currentColor' strokeWidth='1.6' strokeLinecap='round' />
          </svg>
        </button>
      </div>

      <div className='mt-4 rounded-2xl bg-[#3a3a3a] px-4 py-4 text-sm text-white/70'>
        <div className='text-white/50'>Price</div>
        <div className='mt-2 text-white/50'>Trade at the current best price</div>
        <div className='mt-3 h-px w-full bg-white/10' />
        <div className='mt-3 flex items-center justify-between'>
          <span>Quantity</span>
          <span className='text-red-400'>Handling fee:0.001%</span>
        </div>
        <div className='mt-2 text-white'>0</div>
      </div>

      <div className='mt-4 flex items-center gap-3 text-xs text-white/70'>
        <div className='relative h-2 flex-1 rounded-full bg-[#2f2f2f]'>
          <div className='absolute left-0 top-0 h-full rounded-full bg-[#2dd4bf]' style={{ width: `${percent}%` }} />
          <span
            className='absolute top-1/2 flex h-6 min-w-[32px] -translate-y-1/2 items-center justify-center rounded-full border-2 border-[#2dd4bf] bg-[#1f1f1f] px-1 text-[10px] text-white'
            style={{ left: `calc(${percent}% - 8px)` }}
            aria-hidden='true'
          >
            {percent}%
          </span>
          <input
            type='range'
            min={0}
            max={100}
            value={percent}
            onChange={(event) => setPercent(Number(event.target.value))}
            className='absolute inset-0 h-full w-full cursor-pointer opacity-0'
            aria-label='Percent'
          />
        </div>
      </div>

      <div className='mt-4 text-xs text-white/60'>
        <div className='flex items-center justify-between'>
          <span>Available</span>
          <span>0USDT</span>
        </div>
        <div className='mt-2 flex items-center justify-between'>
          <span>Transaction volume</span>
          <span>0USDT</span>
        </div>
      </div>

      <button
        type='button'
        className={`mt-4 w-full rounded-2xl py-3 text-base font-semibold text-white ${side === 'buy' ? 'bg-[#2dd4bf]' : 'bg-[#ef4444]'
          }`}
      >
        {side === 'buy' ? 'Buy' : 'Sell'}
      </button>

      <div className='mt-6 flex items-center justify-between text-sm text-white/70'>
        <span>Current order</span>
        <button type='button' className='text-white/50' onClick={() => navigate('/coin-commission')}>
          See more&gt;&gt;
        </button>
      </div>

      {showPriceSheet && (
        <>
          <div className='fixed inset-0 z-40 bg-black/60' onClick={() => setShowPriceSheet(false)} />
          <div className='fixed inset-x-0 bottom-0 z-50 rounded-t-2xl bg-[#2f2f2f] px-4 pb-6 pt-4 text-white'>
            <div className='flex items-center justify-between text-sm text-white/60'>
              <button type='button' onClick={() => setShowPriceSheet(false)}>
                Cancel
              </button>
              <button type='button' onClick={() => setShowPriceSheet(false)} className='text-[#b7f14a]'>
                Confirm
              </button>
            </div>
            <div className='mt-6 space-y-4 text-center text-base'>
              {['Market price', 'Price limit'].map((option) => (
                <button
                  key={option}
                  type='button'
                  onClick={() => setPriceType(option as typeof priceType)}
                  className='block w-full text-white/80'
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      {showCoinMenu && (
        <>
          <div className='fixed inset-0 z-40 bg-black/60' onClick={() => setShowCoinMenu(false)} />
          <div className='fixed left-0 top-0 z-50 h-full w-72 bg-[#2a2a2a] text-white'>
            <div className='px-4 py-3 text-sm text-white/60'>USDT</div>
            <div className='overflow-y-auto px-4 pb-6'>
              {coins.map((coin) => {
                const isPositive = Number(coin.priceChangePercent) >= 0
                return (
                  <button
                    key={coin.symbol}
                    type='button'
                    onClick={() => {
                      setSelectedPair(coin.symbol)
                      setShowCoinMenu(false)
                    }}
                    className='flex w-full items-center justify-between border-b border-white/10 py-3 text-left'
                  >
                    <span className='text-white/80'>{coin.symbol}</span>
                    <span className={isPositive ? 'text-green-400' : 'text-red-500'}>
                      {isPositive ? '+' : ''}
                      {coin.priceChangePercent}%
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Coins
