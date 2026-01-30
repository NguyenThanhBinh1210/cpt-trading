import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TrendingUp, TrendingDown, DollarSign, Bitcoin, Coins, Search, Plus, Edit, Settings } from 'lucide-react'
import { useState, useEffect } from 'react'
import { PageSkeleton } from '~/components/skeletons/PageSkeleton'

interface Instrument {
  symbol: string
  name: string
  category: 'Forex' | 'Crypto' | 'Commodities' | 'Indices' | 'Stocks'
  bid: number
  ask: number
  spread: number
  change24h: number
  volume24h: number
  minLotSize: number
  maxLotSize: number
  leverage: string
  tradingHours: string
  status: 'Active' | 'Inactive' | 'Maintenance'
}

const Instruments = () => {
  const [isLoading, setIsLoading] = useState(true)

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1200)
    return () => clearTimeout(timer)
  }, [])

  const instruments: Instrument[] = [
    {
      symbol: 'EURUSD',
      name: 'Euro vs US Dollar',
      category: 'Forex',
      bid: 1.0845,
      ask: 1.0847,
      spread: 0.0002,
      change24h: 0.45,
      volume24h: 125000000,
      minLotSize: 0.01,
      maxLotSize: 100,
      leverage: '1:500',
      tradingHours: '24/5',
      status: 'Active'
    },
    {
      symbol: 'GBPUSD',
      name: 'British Pound vs US Dollar',
      category: 'Forex',
      bid: 1.2675,
      ask: 1.2677,
      spread: 0.0002,
      change24h: -0.23,
      volume24h: 98000000,
      minLotSize: 0.01,
      maxLotSize: 100,
      leverage: '1:500',
      tradingHours: '24/5',
      status: 'Active'
    },
    {
      symbol: 'BTCUSD',
      name: 'Bitcoin vs US Dollar',
      category: 'Crypto',
      bid: 46150.0,
      ask: 46180.0,
      spread: 30.0,
      change24h: 3.45,
      volume24h: 5200000000,
      minLotSize: 0.001,
      maxLotSize: 10,
      leverage: '1:100',
      tradingHours: '24/7',
      status: 'Active'
    },
    {
      symbol: 'ETHUSD',
      name: 'Ethereum vs US Dollar',
      category: 'Crypto',
      bid: 2495.0,
      ask: 2498.0,
      spread: 3.0,
      change24h: -1.2,
      volume24h: 1800000000,
      minLotSize: 0.01,
      maxLotSize: 100,
      leverage: '1:100',
      tradingHours: '24/7',
      status: 'Active'
    },
    {
      symbol: 'XAUUSD',
      name: 'Gold vs US Dollar',
      category: 'Commodities',
      bid: 2052.5,
      ask: 2053.0,
      spread: 0.5,
      change24h: 0.85,
      volume24h: 45000000,
      minLotSize: 0.01,
      maxLotSize: 50,
      leverage: '1:200',
      tradingHours: '23/5',
      status: 'Active'
    },
    {
      symbol: 'XAGUSD',
      name: 'Silver vs US Dollar',
      category: 'Commodities',
      bid: 23.45,
      ask: 23.48,
      spread: 0.03,
      change24h: -0.5,
      volume24h: 12000000,
      minLotSize: 1,
      maxLotSize: 5000,
      leverage: '1:200',
      tradingHours: '23/5',
      status: 'Active'
    },
    {
      symbol: 'US30',
      name: 'Dow Jones Industrial Average',
      category: 'Indices',
      bid: 38750.5,
      ask: 38755.0,
      spread: 4.5,
      change24h: 1.25,
      volume24h: 89000000,
      minLotSize: 0.1,
      maxLotSize: 100,
      leverage: '1:100',
      tradingHours: '23/5',
      status: 'Active'
    },
    {
      symbol: 'NAS100',
      name: 'NASDAQ 100',
      category: 'Indices',
      bid: 17850.0,
      ask: 17855.0,
      spread: 5.0,
      change24h: 2.15,
      volume24h: 125000000,
      minLotSize: 0.1,
      maxLotSize: 100,
      leverage: '1:100',
      tradingHours: '23/5',
      status: 'Active'
    },
    {
      symbol: 'AAPL',
      name: 'Apple Inc.',
      category: 'Stocks',
      bid: 189.45,
      ask: 189.55,
      spread: 0.1,
      change24h: -0.75,
      volume24h: 45000000,
      minLotSize: 1,
      maxLotSize: 10000,
      leverage: '1:20',
      tradingHours: 'Market Hours',
      status: 'Active'
    },
    {
      symbol: 'TSLA',
      name: 'Tesla Inc.',
      category: 'Stocks',
      bid: 201.25,
      ask: 201.45,
      spread: 0.2,
      change24h: 4.5,
      volume24h: 98000000,
      minLotSize: 1,
      maxLotSize: 10000,
      leverage: '1:20',
      tradingHours: 'Market Hours',
      status: 'Active'
    }
  ]

  const forex = instruments.filter((i) => i.category === 'Forex')
  const crypto = instruments.filter((i) => i.category === 'Crypto')
  const commodities = instruments.filter((i) => i.category === 'Commodities')
  const indices = instruments.filter((i) => i.category === 'Indices')
  const stocks = instruments.filter((i) => i.category === 'Stocks')

  if (isLoading) {
    return <PageSkeleton hasStats={true} statsCount={5} />
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Forex':
        return <DollarSign className='h-4 w-4' />
      case 'Crypto':
        return <Bitcoin className='h-4 w-4' />
      case 'Commodities':
        return <Coins className='h-4 w-4' />
      case 'Indices':
        return <TrendingUp className='h-4 w-4' />
      case 'Stocks':
        return <TrendingUp className='h-4 w-4' />
      default:
        return null
    }
  }

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>Trading Instruments</h1>
          <p className='text-muted-foreground'>Manage all available trading instruments and their configurations</p>
        </div>
        <Button>
          <Plus className='mr-2 h-4 w-4' />
          Add Instrument
        </Button>
      </div>

      {/* Stats Cards */}
      <div className='grid gap-4 md:grid-cols-5'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Total Instruments</CardTitle>
            <Settings className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{instruments.length}</div>
            <p className='text-xs text-muted-foreground'>Available for trading</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Forex Pairs</CardTitle>
            <DollarSign className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{forex.length}</div>
            <p className='text-xs text-muted-foreground'>Currency pairs</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Cryptocurrencies</CardTitle>
            <Bitcoin className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{crypto.length}</div>
            <p className='text-xs text-muted-foreground'>Crypto pairs</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Commodities</CardTitle>
            <Coins className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{commodities.length}</div>
            <p className='text-xs text-muted-foreground'>Gold, Silver, Oil</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Indices & Stocks</CardTitle>
            <TrendingUp className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{indices.length + stocks.length}</div>
            <p className='text-xs text-muted-foreground'>Market indices & shares</p>
          </CardContent>
        </Card>
      </div>

      {/* Instruments Table */}
      <Tabs defaultValue='all' className='space-y-4'>
        {/* Tabs + Search: stack on mobile, row on desktop, tabs scroll horizontally if overflow */}
        <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
          <TabsList>
            <TabsTrigger value='all'>All Instruments</TabsTrigger>
            <TabsTrigger value='forex'>Forex</TabsTrigger>
            <TabsTrigger value='crypto'>Crypto</TabsTrigger>
            <TabsTrigger value='commodities'>Commodities</TabsTrigger>
            <TabsTrigger value='indices'>Indices</TabsTrigger>
            <TabsTrigger value='stocks'>Stocks</TabsTrigger>
          </TabsList>
          <div className='relative w-full md:w-72'>
            <Search className='absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
            <Input placeholder='Search instruments...' className='pl-8' />
          </div>
        </div>

        <TabsContent value='all' className='space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle>All Trading Instruments</CardTitle>
              <CardDescription>Complete list of tradable instruments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='overflow-x-auto'>
                <Table className='min-w-[980px]'>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Symbol</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Bid</TableHead>
                      <TableHead>Ask</TableHead>
                      <TableHead>Spread</TableHead>
                      <TableHead>24h Change</TableHead>
                      <TableHead>24h Volume</TableHead>
                      <TableHead>Leverage</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {instruments.map((instrument) => (
                      <TableRow key={instrument.symbol}>
                        <TableCell className='font-mono font-bold'>{instrument.symbol}</TableCell>
                        <TableCell>{instrument.name}</TableCell>
                        <TableCell>
                          <div className='flex items-center gap-2'>
                            {getCategoryIcon(instrument.category)}
                            <span>{instrument.category}</span>
                          </div>
                        </TableCell>
                        <TableCell className='font-mono'>{instrument.bid}</TableCell>
                        <TableCell className='font-mono'>{instrument.ask}</TableCell>
                        <TableCell className='font-mono text-muted-foreground'>{instrument.spread}</TableCell>
                        <TableCell>
                          <div
                            className={`flex items-center gap-1 ${
                              instrument.change24h >= 0 ? 'text-green-500' : 'text-red-500'
                            }`}
                          >
                            {instrument.change24h >= 0 ? (
                              <TrendingUp className='h-4 w-4' />
                            ) : (
                              <TrendingDown className='h-4 w-4' />
                            )}
                            {instrument.change24h >= 0 ? '+' : ''}
                            {instrument.change24h}%
                          </div>
                        </TableCell>
                        <TableCell>${(instrument.volume24h / 1000000).toFixed(2)}M</TableCell>
                        <TableCell>
                          <Badge variant='outline'>{instrument.leverage}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={instrument.status === 'Active' ? 'default' : 'secondary'}>
                            {instrument.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button size='sm' variant='ghost'>
                            <Edit className='h-4 w-4' />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='crypto' className='space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle>Cryptocurrencies</CardTitle>
              <CardDescription>Available cryptocurrency trading pairs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='overflow-x-auto'>
                <Table className='min-w-[880px]'>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Symbol</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Bid/Ask</TableHead>
                      <TableHead>24h Change</TableHead>
                      <TableHead>24h Volume</TableHead>
                      <TableHead>Leverage</TableHead>
                      <TableHead>Trading Hours</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {crypto.map((instrument) => (
                      <TableRow key={instrument.symbol}>
                        <TableCell className='font-mono font-bold'>{instrument.symbol}</TableCell>
                        <TableCell>
                          <div className='flex items-center gap-2'>
                            <Bitcoin className='h-4 w-4' />
                            {instrument.name}
                          </div>
                        </TableCell>
                        <TableCell className='font-mono'>
                          <div className='space-y-1'>
                            <div className='text-sm'>{instrument.bid}</div>
                            <div className='text-xs text-muted-foreground'>{instrument.ask}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div
                            className={`flex items-center gap-1 font-medium ${
                              instrument.change24h >= 0 ? 'text-green-500' : 'text-red-500'
                            }`}
                          >
                            {instrument.change24h >= 0 ? (
                              <TrendingUp className='h-4 w-4' />
                            ) : (
                              <TrendingDown className='h-4 w-4' />
                            )}
                            {instrument.change24h >= 0 ? '+' : ''}
                            {instrument.change24h}%
                          </div>
                        </TableCell>
                        <TableCell className='font-medium'>
                          ${(instrument.volume24h / 1000000000).toFixed(2)}B
                        </TableCell>
                        <TableCell>
                          <Badge variant='outline'>{instrument.leverage}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge>{instrument.tradingHours}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Instruments
