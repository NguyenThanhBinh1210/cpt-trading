import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import {
  CandlestickSeries,
  createChart,
  type CandlestickData,
  type IChartApi,
  type ISeriesApi,
  type UTCTimestamp
} from 'lightweight-charts'
import { useNavigate } from 'react-router-dom'

interface CoinData {
  symbol: string
  price: string
  priceChangePercent: string
  highPrice: string
  lowPrice: string
  volume: string
}

interface KlineData {
  openTime: number
  open: string
  high: string
  low: string
  close: string
  volume: string
}

const Contract = () => {
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [selectedPair, setSelectedPair] = useState('BTC/USDT')
  const [coinData, setCoinData] = useState<CoinData | null>(null)
  const [klineData, setKlineData] = useState<KlineData[]>([])
  const [timeframe, setTimeframe] = useState('1m')
  const [transactionTab, setTransactionTab] = useState<'in' | 'closed'>('in')
  const [coins, setCoins] = useState<CoinData[]>([])
  const [showOrderSheet, setShowOrderSheet] = useState(false)
  const [orderSide, setOrderSide] = useState<'up' | 'down'>('up')
  const [selectedDuration, setSelectedDuration] = useState(30)
  const [tradingModel, setTradingModel] = useState<'USDT' | 'USDC'>('USDT')
  const [showContractTypeSheet, setShowContractTypeSheet] = useState(false)
  const [contractType, setContractType] = useState<'delivery' | 'perpetual' | 'derivatives'>('delivery')
  const [perpetualSide, setPerpetualSide] = useState<'buy' | 'sell'>('buy')
  const [priceType, setPriceType] = useState<'Market price' | 'Price limit'>('Market price')
  const [leverage, setLeverage] = useState(10)
  const [showPriceTypeSheet, setShowPriceTypeSheet] = useState(false)
  const [showLeverageSheet, setShowLeverageSheet] = useState(false)
  const [perpetualTab, setPerpetualTab] = useState<'in' | 'all'>('in')
  const [perpetualPercent, setPerpetualPercent] = useState(0)
  const [orderBook, setOrderBook] = useState<{
    bids: { price: string; qty: string }[]
    asks: { price: string; qty: string }[]
  }>({
    bids: [],
    asks: []
  })
  const chartContainerRef = useRef<HTMLDivElement | null>(null)
  const chartRef = useRef<IChartApi | null>(null)
  const candleSeriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null)
  const wsRef = useRef<WebSocket | null>(null)
  const depthWsRef = useRef<WebSocket | null>(null)

  useEffect(() => {
    if (!chartContainerRef.current || chartRef.current) {
      return
    }

    const container = chartContainerRef.current
    const chart = createChart(container, {
      width: container.clientWidth,
      height: 220,
      layout: {
        background: { color: '#1a1a1a' },
        textColor: '#9ca3af'
      },
      grid: {
        vertLines: { color: '#2a2a2a' },
        horzLines: { color: '#2a2a2a' }
      },
      rightPriceScale: {
        borderColor: '#2a2a2a'
      },
      timeScale: {
        borderColor: '#2a2a2a'
      },
      crosshair: {
        mode: 1
      }
    })

    const series = chart.addSeries(CandlestickSeries, {
      upColor: '#2dd4bf',
      downColor: '#ef4444',
      borderUpColor: '#2dd4bf',
      borderDownColor: '#ef4444',
      wickUpColor: '#2dd4bf',
      wickDownColor: '#ef4444'
    }) as ISeriesApi<'Candlestick'>

    chartRef.current = chart
    candleSeriesRef.current = series

    const handleResize = () => {
      if (chartContainerRef.current && chartRef.current) {
        chartRef.current.applyOptions({ width: chartContainerRef.current.clientWidth })
      }
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      chart.remove()
      chartRef.current = null
      candleSeriesRef.current = null
    }
  }, [])

  // Fetch coin list
  useEffect(() => {
    const fetchCoins = async () => {
      try {
        interface BinanceTicker {
          symbol: string
          lastPrice: string
          priceChangePercent: string
          highPrice: string
          lowPrice: string
          volume: string
        }
        const response = await axios.get<BinanceTicker[]>('https://api.binance.com/api/v3/ticker/24hr')
        const data = response.data
          .filter((item) => item.symbol.endsWith('USDT'))
          .map((item) => ({
            symbol: item.symbol.replace('USDT', '/USDT'),
            price: parseFloat(item.lastPrice).toFixed(4),
            priceChangePercent: parseFloat(item.priceChangePercent).toFixed(2),
            highPrice: parseFloat(item.highPrice).toFixed(8),
            lowPrice: parseFloat(item.lowPrice).toFixed(8),
            volume: parseFloat(item.volume).toFixed(4)
          }))
          .slice(0, 50)
        setCoins(data)
      } catch (error) {
        console.error('Error fetching coins:', error)
        // Fallback data
        setCoins([
          {
            symbol: 'BTC/USDT',
            price: '84538.26',
            priceChangePercent: '-2.96',
            highPrice: '85100',
            lowPrice: '84000',
            volume: '1234.56'
          },
          {
            symbol: 'ETH/USDT',
            price: '81171.66',
            priceChangePercent: '-3.10',
            highPrice: '82000',
            lowPrice: '81000',
            volume: '5678.90'
          },
          {
            symbol: 'COMB/USDT',
            price: '142.6006',
            priceChangePercent: '-5.48',
            highPrice: '151.18',
            lowPrice: '142.59',
            volume: '30117.97'
          }
        ])
      }
    }
    fetchCoins()
  }, [])

  // Fetch selected coin data
  useEffect(() => {
    const fetchCoinData = async () => {
      try {
        const symbol = selectedPair.replace('/', '')
        const response = await axios.get(`https://api.binance.com/api/v3/ticker/24hr?symbol=${symbol}`)
        const data = response.data
        setCoinData({
          symbol: data.symbol.replace('USDT', '/USDT'),
          price: parseFloat(data.lastPrice).toFixed(4),
          priceChangePercent: parseFloat(data.priceChangePercent).toFixed(2),
          highPrice: parseFloat(data.highPrice).toFixed(8),
          lowPrice: parseFloat(data.lowPrice).toFixed(8),
          volume: parseFloat(data.volume).toFixed(4)
        })
      } catch (error) {
        console.error('Error fetching coin data:', error)
      }
    }

    const fetchKlineData = async () => {
      try {
        const symbol = selectedPair.replace('/', '')
        const interval = timeframe
        interface BinanceKline extends Array<string | number> {
          0: number // openTime
          1: string // open
          2: string // high
          3: string // low
          4: string // close
          5: string // volume
        }
        const response = await axios.get<BinanceKline[]>(
          `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=100`
        )
        const data = response.data.map((item) => ({
          openTime: Number(item[0]),
          open: String(item[1]),
          high: String(item[2]),
          low: String(item[3]),
          close: String(item[4]),
          volume: String(item[5])
        }))
        setKlineData(data)
      } catch (error) {
        console.error('Error fetching kline data:', error)
      }
    }

    if (selectedPair) {
      fetchCoinData()
      fetchKlineData()
      const intervalId = setInterval(() => {
        fetchCoinData()
      }, 5000)
      return () => clearInterval(intervalId)
    }
  }, [selectedPair, timeframe])

  const filteredCoins = coins

  const isPositive = coinData ? parseFloat(coinData.priceChangePercent) >= 0 : false

  useEffect(() => {
    if (!candleSeriesRef.current || klineData.length === 0) {
      return
    }

    const formatted: CandlestickData<UTCTimestamp>[] = klineData.map((item) => ({
      time: Math.floor(item.openTime / 1000) as UTCTimestamp,
      open: Number(item.open),
      high: Number(item.high),
      low: Number(item.low),
      close: Number(item.close)
    }))

    candleSeriesRef.current.setData(formatted)
    chartRef.current?.timeScale().fitContent()
  }, [klineData])

  useEffect(() => {
    const symbol = selectedPair.replace('/', '').toLowerCase()
    if (!symbol || !candleSeriesRef.current) {
      return
    }

    if (wsRef.current) {
      wsRef.current.close()
    }

    const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol}@kline_${timeframe}`)
    ws.onmessage = (event) => {
      const payload = JSON.parse(event.data) as {
        k: {
          t: number
          o: string
          h: string
          l: string
          c: string
        }
      }
      const kline = payload.k
      candleSeriesRef.current?.update({
        time: Math.floor(kline.t / 1000) as UTCTimestamp,
        open: Number(kline.o),
        high: Number(kline.h),
        low: Number(kline.l),
        close: Number(kline.c)
      })
    }

    wsRef.current = ws
    return () => {
      ws.close()
    }
  }, [selectedPair, timeframe])

  useEffect(() => {
    if (contractType !== 'perpetual') {
      return
    }

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
  }, [selectedPair, contractType])

  const timeframes = [
    { label: '1M', value: '1m' },
    { label: '5M', value: '5m' },
    { label: '15M', value: '15m' },
    { label: '30M', value: '30m' },
    { label: '1H', value: '1h' },
    { label: '1D', value: '1d' },
    { label: '1WEEK', value: '1w' },
    { label: '1MON', value: '1M' }
  ]

  const durationOptions = [
    { seconds: 30, profitability: 20 },
    { seconds: 60, profitability: 25 },
    { seconds: 90, profitability: 35 },
    { seconds: 120, profitability: 45 },
    { seconds: 180, profitability: 60 },
    { seconds: 360, profitability: 70 },
    { seconds: 420, profitability: 75 },
    { seconds: 510, profitability: 80 },
    { seconds: 620, profitability: 90 }
  ]

  const contractTitleMap = {
    delivery: 'Delivery contract',
    perpetual: 'Perpetual contract',
    derivatives: 'Derivatives'
  } as const

  const contractTitle = contractTitleMap[contractType]
  const isPerpetualView = contractType === 'perpetual' || contractType === 'derivatives'
  const isDerivatives = contractType === 'derivatives'
  const baseSymbol = selectedPair.split('/')[0] ?? selectedPair

  const sellOrders = orderBook.asks
  const buyOrders = orderBook.bids

  useEffect(() => {
    if (contractType === 'derivatives') {
      setLeverage(5)
      setPriceType('Market price')
      return
    }
    if (contractType === 'perpetual') {
      setLeverage(10)
    }
  }, [contractType])

  return (
    <div className='relative min-h-screen bg-[#1a1a1a] text-white'>
      {/* Header Banner */}
      <div
        className=' px-4 py-2 flex items-center justify-center gap-2  '
        onClick={() => setShowContractTypeSheet(true)}
      >
        <span className='text-md font-semibold text-white'>{contractTitle}</span>
        <button type='button' className='text-white'>
          <svg width='18' height='18' viewBox='0 0 24 24' fill='none'>
            <path
              d='M4 4h7v7H4V4zM13 4h7v7h-7V4zM4 13h7v7H4v-7zM13 13h7v7h-7v-7z'
              stroke='currentColor'
              strokeWidth='1.5'
              fill='currentColor'
            />
          </svg>
        </button>
      </div>

      {/* Main Header */}
      <div className='px-4 py-3 flex items-center justify-between bg-[#1a1a1a]'>
        <button type='button' onClick={() => setIsMenuOpen(true)} className='text-white/80' aria-label='Menu'>
          <svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
            <path d='M3 6h18M3 12h18M3 18h18' stroke='currentColor' strokeWidth='2' strokeLinecap='round' />
          </svg>
        </button>
        <div className='flex items-center gap-2'>
          <span className='text-base font-semibold'>{coinData?.symbol || 'COMB/USDT'}</span>
          {coinData && (
            <div className={`flex items-center gap-1 ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
              <svg width='16' height='16' viewBox='0 0 24 24' fill='none'>
                {isPositive ? (
                  <path d='M12 19V5M5 12l7-7 7 7' stroke='currentColor' strokeWidth='2' strokeLinecap='round' />
                ) : (
                  <path d='M12 5v14M19 12l-7 7-7-7' stroke='currentColor' strokeWidth='2' strokeLinecap='round' />
                )}
              </svg>
              <span className='text-sm'>{coinData.priceChangePercent}%</span>
            </div>
          )}
        </div>
        <button type='button' className='text-white/80' onClick={() => navigate('/order-record')}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='size-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z'
            />
          </svg>
        </button>
      </div>

      {isPerpetualView ? (
        <div className='px-4 pb-8'>
          <div className='mt-2 grid grid-cols-[1fr_150px] gap-3'>
            <div className='space-y-3'>
              <div className='grid grid-cols-2 overflow-hidden rounded-2xl bg-[#2f2f2f] text-sm font-semibold'>
                <button
                  type='button'
                  onClick={() => setPerpetualSide('buy')}
                  className={`py-2 ${perpetualSide === 'buy' ? 'bg-[#2dd4bf] text-[#0f172a]' : 'text-white/70'}`}
                >
                  Buy
                </button>
                <button
                  type='button'
                  onClick={() => setPerpetualSide('sell')}
                  className={`py-2 ${perpetualSide === 'sell' ? 'bg-[#ef4444] text-white' : 'text-white/70'}`}
                >
                  Sell
                </button>
              </div>

              <div className='grid grid-cols-2 gap-2 text-xs'>
                <button
                  type='button'
                  onClick={() => setShowPriceTypeSheet(true)}
                  className='flex items-center justify-between rounded-md bg-[#2f2f2f] px-2 py-2 text-white/80'
                >
                  <span>{priceType}</span>
                  <svg width='16' height='16' viewBox='0 0 24 24' fill='none'>
                    <path d='M6 9l6 6 6-6' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' />
                  </svg>
                </button>
                <button
                  type='button'
                  onClick={() => setShowLeverageSheet(true)}
                  className='flex items-center justify-between rounded-md bg-[#2f2f2f] px-2 py-2 text-white/80'
                >
                  <span>{leverage}</span>
                  <svg width='16' height='16' viewBox='0 0 24 24' fill='none'>
                    <path d='M6 9l6 6 6-6' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' />
                  </svg>
                </button>
              </div>

              <div className='rounded-xl bg-[#2f2f2f] px-3 py-2 text-xs text-white/50'>Trade at the current best</div>

              <div className='text-xs text-white/70'>
                {isDerivatives
                  ? `Purchase quantity(1open=1000${selectedPair.replace('/', '')})`
                  : `Trading lots(1${baseSymbol})`}
              </div>
              <input
                type='text'
                defaultValue={isDerivatives ? '' : '1'}
                placeholder={isDerivatives ? 'Please enter the purchase q' : undefined}
                className='w-full rounded-xl bg-[#2f2f2f] px-3 py-2 text-sm text-white'
              />

              <div className='flex items-center gap-3 text-xs text-white/70'>
                <div className='relative h-2 flex-1 rounded-full bg-[#2f2f2f]'>
                  <div
                    className='absolute left-0 top-0 h-full rounded-full bg-[#2dd4bf]'
                    style={{ width: `${perpetualPercent}%` }}
                  />
                  <span
                    className='absolute top-1/2 flex h-6 min-w-[32px] -translate-y-1/2 items-center justify-center rounded-full border-2 border-[#2dd4bf] bg-[#1f1f1f] px-1 text-[10px] text-white'
                    style={{ left: `calc(${perpetualPercent}% - 8px)` }}
                    aria-hidden='true'
                  >
                    {perpetualPercent}%
                  </span>
                  <input
                    type='range'
                    min={0}
                    max={100}
                    value={perpetualPercent}
                    onChange={(event) => setPerpetualPercent(Number(event.target.value))}
                    className='absolute inset-0 h-full w-full cursor-pointer opacity-0'
                    aria-label='Position percent'
                  />
                </div>
              </div>

              <div className='flex items-center justify-between text-xs text-white/70'>
                <span>Balance</span>
                <span>0USDT</span>
              </div>

              <button
                type='button'
                className={`w-full rounded-md py-2 text-base font-semibold ${perpetualSide === 'buy' ? 'bg-[#2dd4bf] text-white' : 'bg-[#ef4444] text-white'
                  }`}
              >
                {perpetualSide === 'buy' ? 'Buy(Go long)' : 'Sell(Short)'}
              </button>
            </div>

            <div className='space-y-2 text-xs'>
              <div className='flex items-center justify-between text-white/60'>
                <span>Price</span>
                <span>Quantity</span>
              </div>
              <div className='space-y-1'>
                {sellOrders.map((order) => (
                  <div key={`${order.price}-${order.qty}`} className='flex items-center justify-between text-[#ef4444]'>
                    <span>{order.price}</span>
                    <span className='text-white/60'>{order.qty}</span>
                  </div>
                ))}
              </div>
              <div className={`text-left text-sm font-semibold ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                {coinData?.price || '0.00'}
              </div>
              <div className='space-y-1'>
                {buyOrders.map((order) => (
                  <div key={`${order.price}-${order.qty}`} className='flex items-center justify-between text-[#2dd4bf]'>
                    <span>{order.price}</span>
                    <span className='text-white/60'>{order.qty}</span>
                  </div>
                ))}
              </div>
              <div className='mt-2 flex items-center justify-end gap-2'>
                {['#2dd4bf', '#ef4444', '#2dd4bf'].map((color, index) => (
                  <span
                    key={color + index}
                    className='inline-flex h-6 w-9 items-center justify-center rounded-lg bg-[#2f2f2f]'
                  >
                    <span className='h-3 w-3 rounded-sm' style={{ backgroundColor: color }} />
                  </span>
                ))}
              </div>
            </div>
          </div>

          {isDerivatives ? (
            <>
              <div className='mt-6 text-sm text-white/70'>In transaction</div>
              <div className='mt-12 text-center text-sm text-white/40'>No more</div>
            </>
          ) : (
            <>
              <div className='mt-6 flex items-center justify-between rounded-full bg-[#2b2b2b] px-4 py-2 text-sm'>
                <button
                  type='button'
                  onClick={() => setPerpetualTab('in')}
                  className={`rounded-full px-4 py-2 ${perpetualTab === 'in' ? 'bg-black text-white' : 'text-white/50'
                    }`}
                >
                  In transaction
                </button>
                <button
                  type='button'
                  onClick={() => setPerpetualTab('all')}
                  className={`rounded-full px-4 py-2 ${perpetualTab === 'all' ? 'bg-black text-white' : 'text-white/50'
                    }`}
                >
                  All orders
                </button>
              </div>
              <div className='mt-12 text-center text-sm text-white/40'>No more</div>
            </>
          )}
        </div>
      ) : (
        <>
          {/* Price and Market Data */}
          <div className='px-4 py-4 bg-[#1a1a1a]'>
            <div className='grid grid-cols-2 items-start justify-between'>
              <div>
                <div className={`text-lg font-semibold ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                  {coinData?.price || '142.6006'}
                </div>
                {coinData && (
                  <div className={`flex  items-center gap-1 mt-1 ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                    <svg width='14' height='14' viewBox='0 0 24 24' fill='none'>
                      {isPositive ? (
                        <path d='M12 19V5M5 12l7-7 7 7' stroke='currentColor' strokeWidth='2' strokeLinecap='round' />
                      ) : (
                        <path d='M12 5v14M19 12l-7 7-7-7' stroke='currentColor' strokeWidth='2' strokeLinecap='round' />
                      )}
                    </svg>
                    <span className='text-xs'>{coinData.priceChangePercent}%</span>
                  </div>
                )}
              </div>
              <div className='text-left text-sm space-y-1'>
                <div className='flex items-center justify-between'>
                  <span className='text-white/70'>High: </span>
                  <span className='text-white'>{coinData?.highPrice || '151.182200000'}</span>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-white/70'>Low: </span>
                  <span className='text-white'>{coinData?.lowPrice || '142.596200000'}</span>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-white/70'>24H quantity: </span>
                  <span className='text-white'>{coinData?.volume || '30117.9710'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Timeframe Selection */}
          <div className='px-4 py-2 bg-[#1a1a1a] overflow-x-auto'>
            <div className='flex gap-2'>
              {timeframes.map((tf) => (
                <button
                  key={tf.value}
                  type='button'
                  onClick={() => setTimeframe(tf.value)}
                  className={`px-2 py-1 rounded text-sm font-semibold whitespace-nowrap ${timeframe === tf.value ? 'bg-[#2dd4bf] text-white' : 'bg-[#2a2a2a] text-white/70 hover:bg-[#3a3a3a]'
                    }`}
                >
                  {tf.label}
                </button>
              ))}
            </div>
          </div>

          {/* Chart */}
          <div className=' py-4 bg-[#1a1a1a]'>
            <div ref={chartContainerRef} className='w-full' />
          </div>

          {/* Account and Trading Buttons */}
          <div className='px-4 py-4 bg-[#1a1a1a] space-y-4'>
            <div className='flex items-center justify-between text-sm'>
              <span className='text-white/70'>Micro account funds</span>
              <span className='text-white'>0.00000000USDT</span>
            </div>
            <div className='grid grid-cols-2 gap-3'>
              <button
                type='button'
                onClick={() => {
                  setOrderSide('up')
                  setShowOrderSheet(true)
                }}
                className='bg-green-500 text-white py-3 rounded-lg text-base'
              >
                Buy up
              </button>
              <button
                type='button'
                onClick={() => {
                  setOrderSide('down')
                  setShowOrderSheet(true)
                }}
                className='bg-red-500 text-white py-3 rounded-lg text-base'
              >
                Buy down
              </button>
            </div>
          </div>

          {/* Transaction Status */}
          <div className='px-4 py-4 bg-[#1a1a1a]'>
            <div className='flex gap-4 text-sm'>
              <button
                type='button'
                onClick={() => setTransactionTab('in')}
                className={`pb-1 ${transactionTab === 'in' ? 'text-green-500 border-b-2 border-green-500' : 'text-white/70'
                  }`}
              >
                In transaction
              </button>
              <button
                type='button'
                onClick={() => setTransactionTab('closed')}
                className={`pb-1 ${transactionTab === 'closed' ? 'text-green-500 border-b-2 border-green-500' : 'text-white/70'
                  }`}
              >
                Position closed
              </button>
            </div>
            <div className='text-center text-sm text-white/50 mt-4'>No more</div>
          </div>

          {showOrderSheet && (
            <>
              <div className='fixed inset-0 z-40 bg-black/60' onClick={() => setShowOrderSheet(false)} />
              <div className='fixed inset-x-0 bottom-0 z-50 rounded-t-3xl bg-[#3a3a3a] px-4 pb-6 pt-5 text-white'>
                <div className='flex items-center justify-end'>
                  <button type='button' onClick={() => setShowOrderSheet(false)} className='text-white/80'>
                    <svg width='20' height='20' viewBox='0 0 24 24' fill='none'>
                      <path d='M18 6L6 18M6 6l12 12' stroke='currentColor' strokeWidth='2' strokeLinecap='round' />
                    </svg>
                  </button>
                </div>
                <div className='flex justify-between items-center mt-3'>
                  <div className='text-lg font-semibold'>{coinData?.symbol || 'COMB/USDT'}</div>
                  <div className={`text-sm ${orderSide === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                    {orderSide === 'up' ? 'Buy up' : 'Buy down'}
                  </div>
                </div>
                <div className='mt-3 flex items-center justify-between text-sm text-white/70'>
                  <span>Purchase price</span>
                  <span className='text-white'>{coinData?.price || '0.00'}</span>
                </div>

                <div className='mt-4 grid grid-cols-3 gap-3'>
                  {durationOptions.map((option) => {
                    const isActive = selectedDuration === option.seconds
                    return (
                      <button
                        key={option.seconds}
                        type='button'
                        onClick={() => setSelectedDuration(option.seconds)}
                        className={`relative rounded-xl px-3 py-2 text-left text-xs transition-colors ${isActive ? 'bg-[#2b2b2b] text-white' : 'bg-[#2f2f2f] text-white/60'
                          }`}
                      >
                        <div className='flex items-center justify-center '>
                          <span className=' block'>{option.seconds} Second</span>
                          {isActive && (
                            <span className='absolute top-0 right-0 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#b7f14a] text-black'>
                              <svg width='12' height='12' viewBox='0 0 24 24' fill='none'>
                                <path d='M6 12l4 4 8-8' stroke='currentColor' strokeWidth='2' strokeLinecap='round' />
                              </svg>
                            </span>
                          )}
                        </div>
                        <div className={`mt-1  text-center ${isActive ? ' text-[#f87171]' : 'text-white/60'}`}>
                          Profitability {option.profitability}%
                        </div>
                      </button>
                    )
                  })}
                </div>

                <div className='mt-6 text-sm text-white/70'>Trading model</div>
                <div className='mt-3 flex items-center gap-3'>
                  {(['USDT', 'USDC'] as const).map((model) => {
                    const isActive = tradingModel === model
                    return (
                      <button
                        key={model}
                        type='button'
                        onClick={() => setTradingModel(model)}
                        className={`rounded-md relative px-2 py-2 w-[100px] text-center text-sm font-semibold transition-colors ${isActive ? 'bg-[#2b2b2b] text-white' : 'bg-[#2f2f2f] text-white/60'
                          }`}
                      >
                        <div className='flex items-center justify-center gap-2'>
                          <span>{model}</span>
                          {isActive && (
                            <span className='inline-flex absolute top-0 right-0 h-5 w-5 items-center justify-center rounded-full bg-[#b7f14a] text-black'>
                              <svg width='12' height='12' viewBox='0 0 24 24' fill='none'>
                                <path d='M6 12l4 4 8-8' stroke='currentColor' strokeWidth='2' strokeLinecap='round' />
                              </svg>
                            </span>
                          )}
                        </div>
                      </button>
                    )
                  })}
                </div>

                <div className='mt-6 text-sm text-white/70'>Open position quantity</div>
                <input
                  type='text'
                  placeholder='Please enter the opening quantity'
                  className='mt-3 w-full rounded-xl bg-[#2f2f2f] px-4 py-3 text-sm text-white placeholder:text-white/50 focus:outline-none'
                />

                <div className='mt-4 flex items-center justify-between text-sm text-white/70'>
                  <span>Micro account funds</span>
                  <span className='text-white'>0.00000000{tradingModel}</span>
                </div>

                <button
                  type='button'
                  className={`mt-5 w-full rounded-2xl px-6 py-3 text-base font-semibold text-white ${orderSide === 'up' ? 'bg-[#2dd4bf]' : 'bg-[#ef4444]'
                    }`}
                >
                  Sure
                </button>
              </div>
            </>
          )}
        </>
      )}

      {showContractTypeSheet && (
        <>
          <div className='fixed inset-0 z-40 bg-black/60' onClick={() => setShowContractTypeSheet(false)} />
          <div className='fixed inset-x-0 bottom-0 z-50 rounded-t-xl bg-[#3a3a3a] px-2 pb-6 pt-5 text-white'>
            <div className='flex items-center justify-end pr-2'>
              <button type='button' onClick={() => setShowContractTypeSheet(false)} className='text-white/80'>
                <svg width='20' height='20' viewBox='0 0 24 24' fill='none'>
                  <path d='M18 6L6 18M6 6l12 12' stroke='currentColor' strokeWidth='2' strokeLinecap='round' />
                </svg>
              </button>
            </div>
            <div className='mt-2 '>
              {[
                { key: 'delivery', label: 'Delivery contract', icon: 'D' },
                { key: 'perpetual', label: 'Perpetual contract', icon: 'P' },
                { key: 'derivatives', label: 'Derivatives', icon: 'De' }
              ].map((item) => {
                const isActive = contractType === item.key
                return (
                  <button
                    key={item.key}
                    type='button'
                    onClick={() => setContractType(item.key as typeof contractType)}
                    className='flex w-full items-center justify-between rounded-2xl px-2 py-2 text-left'
                  >
                    <div className='flex items-center gap-3'>
                      <span className='flex h-12 w-12 items-center justify-center rounded-2xl bg-[#2b2b2b] text-sm font-semibold text-[#f5e84a]'>
                        {item.icon}
                      </span>
                      <span className='text-base text-white/90'>{item.label}</span>
                    </div>
                    {isActive && (
                      <span className='text-[#2dd4bf]'>
                        <svg width='20' height='20' viewBox='0 0 24 24' fill='none'>
                          <path d='M6 12l4 4 8-8' stroke='currentColor' strokeWidth='2' strokeLinecap='round' />
                        </svg>
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        </>
      )}

      {showPriceTypeSheet && (
        <>
          <div className='fixed inset-0 z-40 bg-black/60' onClick={() => setShowPriceTypeSheet(false)} />
          <div className='fixed inset-x-0 bottom-0 z-50 rounded-t-xl bg-[#2f2f2f] px-4 pb-6 pt-4 text-white'>
            <div className='flex items-center justify-between text-sm text-white/60'>
              <button type='button' onClick={() => setShowPriceTypeSheet(false)}>
                Cancel
              </button>
              <button type='button' onClick={() => setShowPriceTypeSheet(false)} className='text-[#b7f14a]'>
                Confirm
              </button>
            </div>
            <div className='mt-6 space-y-4 text-center text-base'>
              {['Price limit', 'Market price'].map((option) => (
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

      {showLeverageSheet && (
        <>
          <div className='fixed inset-0 z-40 bg-black/60' onClick={() => setShowLeverageSheet(false)} />
          <div className='fixed inset-x-0 bottom-0 z-50 rounded-t-xl bg-[#2f2f2f] px-4 pb-6 pt-4 text-white'>
            <div className='flex items-center justify-between text-sm text-white/60'>
              <button type='button' onClick={() => setShowLeverageSheet(false)}>
                Cancel
              </button>
              <button type='button' onClick={() => setShowLeverageSheet(false)} className='text-[#b7f14a]'>
                Confirm
              </button>
            </div>
            <div className='mt-6 space-y-4 text-center text-base'>
              {[10, 20, 50, 100, 200, 500, 1000].map((value) => (
                <button
                  key={value}
                  type='button'
                  onClick={() => setLeverage(value)}
                  className='block w-full text-white/80'
                >
                  {value}
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Side Menu Overlay */}
      {isMenuOpen && (
        <>
          <div className='fixed inset-0 bg-black/70 z-40' onClick={() => setIsMenuOpen(false)} />
          <div
            className={`fixed left-0 top-0 h-full w-80 bg-[#2a2a2a] z-50 transform transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'
              }`}
          >
            <div className=''>
              {/* <div className='flex items-center justify-between mb-4'>
                <h2 className='text-lg font-semibold text-white'>Markets</h2>
                <button type='button' onClick={() => setIsMenuOpen(false)} className='text-white/80' aria-label='Close'>
                  <svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
                    <path d='M18 6L6 18M6 6l12 12' stroke='currentColor' strokeWidth='2' strokeLinecap='round' />
                  </svg>
                </button>
              </div>

              <input
                type='text'
                placeholder='Search'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='w-full px-3 py-2 rounded-lg bg-[#1a1a1a] text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#2dd4bf] mb-4'
              />

              <div className='flex gap-2 mb-4'>
                <button
                  type='button'
                  onClick={() => setActiveTab('USDT')}
                  className={`px-4 py-2 rounded text-sm font-semibold ${activeTab === 'USDT' ? 'bg-[#2dd4bf] text-white' : 'bg-[#1a1a1a] text-white/70'
                    }`}
                >
                  USDT
                </button>
                <button
                  type='button'
                  onClick={() => setActiveTab('Derivatives')}
                  className={`px-4 py-2 rounded text-sm font-semibold ${activeTab === 'Derivatives' ? 'bg-[#2dd4bf] text-white' : 'bg-[#1a1a1a] text-white/70'
                    }`}
                >
                  Derivatives
                </button>
              </div> */}

              {/* Coin List */}
              <div className='overflow-y-auto max-h-[calc(100vh-20px)]'>
                {filteredCoins.map((coin) => {
                  const isPositiveCoin = parseFloat(coin.priceChangePercent) >= 0
                  return (
                    <button
                      key={coin.symbol}
                      type='button'
                      onClick={() => {
                        setSelectedPair(coin.symbol)
                        setIsMenuOpen(false)
                      }}
                      className={`w-full text-left px-3 py-3  mb-0 transition-colors ${selectedPair === coin.symbol
                        ? 'bg-[#2dd4bf]/20 border border-[#2dd4bf]'
                        : 'bg-[#1a1a1a] hover:bg-[#3a3a3a]'
                        }`}
                    >
                      <div className='flex items-center justify-between'>
                        <span className='text-white font-medium'>{coin.symbol}</span>
                        <div
                          className={`flex items-center gap-1 ${isPositiveCoin ? 'text-green-500' : 'text-red-500'}`}
                        >
                          <svg width='12' height='12' viewBox='0 0 24 24' fill='none'>
                            {isPositiveCoin ? (
                              <path
                                d='M12 19V5M5 12l7-7 7 7'
                                stroke='currentColor'
                                strokeWidth='2'
                                strokeLinecap='round'
                              />
                            ) : (
                              <path
                                d='M12 5v14M19 12l-7 7-7-7'
                                stroke='currentColor'
                                strokeWidth='2'
                                strokeLinecap='round'
                              />
                            )}
                          </svg>
                          <span className='text-xs'>{coin.priceChangePercent}%</span>
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Contract
