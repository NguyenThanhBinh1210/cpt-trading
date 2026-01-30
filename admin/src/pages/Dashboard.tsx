import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Users,
  TrendingUp,
  TrendingDown,
  Activity,
  ArrowUpRight,
  BarChart3,
  DollarSign,
  FileCheck,
  ArrowDownToLine,
  ArrowUpFromLine
} from 'lucide-react'
import { DashboardSkeleton } from '~/components/skeletons/DashboardSkeleton'

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true)

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <DashboardSkeleton />
  }

  const stats = [
    {
      title: 'Trading Volume',
      value: '$125.4M',
      change: '+23.5%',
      trend: 'up',
      icon: BarChart3,
      description: 'from last month'
    },
    {
      title: 'Active Traders',
      value: '2,847',
      change: '+12.3%',
      trend: 'up',
      icon: Users,
      description: 'from last month'
    },
    {
      title: 'Total P&L',
      value: '+$45,231',
      change: '+8.2%',
      trend: 'up',
      icon: DollarSign,
      description: 'from last month'
    },
    {
      title: 'Open Positions',
      value: '1,234',
      change: '-5.4%',
      trend: 'down',
      icon: Activity,
      description: 'from last hour'
    }
  ]

  const recentTrades = [
    {
      id: 'TRD001',
      trader: 'John Smith',
      symbol: 'EURUSD',
      type: 'Buy',
      volume: '2.5',
      profit: '+$520.00',
      isProfit: true
    },
    {
      id: 'TRD002',
      trader: 'Sarah Johnson',
      symbol: 'BTCUSD',
      type: 'Sell',
      volume: '0.5',
      profit: '+$1,200.00',
      isProfit: true
    },
    {
      id: 'TRD003',
      trader: 'Michael Chen',
      symbol: 'XAUUSD',
      type: 'Buy',
      volume: '1.0',
      profit: '-$150.00',
      isProfit: false
    },
    {
      id: 'TRD004',
      trader: 'Emily Davis',
      symbol: 'GBPUSD',
      type: 'Buy',
      volume: '3.0',
      profit: '+$680.00',
      isProfit: true
    },
    {
      id: 'TRD005',
      trader: 'Robert Wilson',
      symbol: 'USDJPY',
      type: 'Sell',
      volume: '1.5',
      profit: '+$340.00',
      isProfit: true
    }
  ]

  const topInstruments = [
    { symbol: 'EURUSD', volume: '$45.2M', percentage: 85 },
    { symbol: 'BTCUSD', volume: '$32.8M', percentage: 70 },
    { symbol: 'XAUUSD', volume: '$28.5M', percentage: 60 },
    { symbol: 'GBPUSD', volume: '$19.1M', percentage: 45 }
  ]

  return (
    <div className='space-y-6'>
      {/* Page Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>Dashboard</h1>
          <p className='text-muted-foreground'>Welcome back! Here's what's happening today.</p>
        </div>
        <Button>
          <ArrowUpRight className='mr-2 h-4 w-4' />
          Download Report
        </Button>
      </div>

      {/* Stats Grid */}
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title}>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>{stat.title}</CardTitle>
                <Icon className='h-4 w-4 text-muted-foreground' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>{stat.value}</div>
                <div className='flex items-center gap-1 text-xs text-muted-foreground'>
                  {stat.trend === 'up' ? (
                    <TrendingUp className='h-4 w-4 text-green-500' />
                  ) : (
                    <TrendingDown className='h-4 w-4 text-red-500' />
                  )}
                  <span className={stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}>{stat.change}</span>
                  <span>{stat.description}</span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Main Content Grid */}
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-7'>
        {/* Recent Trades */}
        <Card className='col-span-4'>
          <CardHeader>
            <CardTitle>Recent Trades</CardTitle>
            <CardDescription>Latest {recentTrades.length} trades executed on the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              {recentTrades.map((trade) => (
                <div key={trade.id} className='flex items-center justify-between'>
                  <div className='flex items-center gap-4'>
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full ${
                        trade.type === 'Buy' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                      }`}
                    >
                      {trade.type === 'Buy' ? <TrendingUp className='h-5 w-5' /> : <TrendingDown className='h-5 w-5' />}
                    </div>
                    <div>
                      <p className='text-sm font-medium'>{trade.trader}</p>
                      <p className='text-xs text-muted-foreground'>
                        {trade.symbol} • {trade.type} {trade.volume} lots
                      </p>
                    </div>
                  </div>
                  <div className='text-right'>
                    <p className={`text-sm font-medium ${trade.isProfit ? 'text-green-500' : 'text-red-500'}`}>
                      {trade.profit}
                    </p>
                    <p className='text-xs text-muted-foreground'>{trade.id}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Instruments */}
        <Card className='col-span-3'>
          <CardHeader>
            <CardTitle>Top Trading Instruments</CardTitle>
            <CardDescription>Most traded instruments today</CardDescription>
          </CardHeader>
          <CardContent className='space-y-6'>
            {topInstruments.map((instrument) => (
              <div key={instrument.symbol} className='space-y-2'>
                <div className='flex items-center justify-between text-sm'>
                  <span className='font-medium'>{instrument.symbol}</span>
                  <span className='text-muted-foreground'>{instrument.volume}</span>
                </div>
                <div className='h-2 w-full rounded-full bg-muted'>
                  <div
                    className='h-2 rounded-full bg-primary transition-all'
                    style={{ width: `${instrument.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Activity Section */}
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <Activity className='h-5 w-5' />
            Recent Activity
          </CardTitle>
          <CardDescription>Latest activities on the platform</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            <div className='flex gap-4'>
              <div className='flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600'>
                <Users className='h-4 w-4' />
              </div>
              <div className='flex-1'>
                <p className='text-sm font-medium'>New trader registered</p>
                <p className='text-xs text-muted-foreground'>Michael Chen opened a Live trading account</p>
                <p className='text-xs text-muted-foreground'>5 minutes ago</p>
              </div>
            </div>
            <div className='flex gap-4'>
              <div className='flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600'>
                <TrendingUp className='h-4 w-4' />
              </div>
              <div className='flex-1'>
                <p className='text-sm font-medium'>Large trade executed</p>
                <p className='text-xs text-muted-foreground'>
                  Sarah Johnson executed 5.0 lots on BTCUSD with +$2,500 profit
                </p>
                <p className='text-xs text-muted-foreground'>12 minutes ago</p>
              </div>
            </div>
            <div className='flex gap-4'>
              <div className='flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 text-purple-600'>
                <FileCheck className='h-4 w-4' />
              </div>
              <div className='flex-1'>
                <p className='text-sm font-medium'>KYC approved</p>
                <p className='text-xs text-muted-foreground'>Emily Davis verification has been approved</p>
                <p className='text-xs text-muted-foreground'>25 minutes ago</p>
              </div>
            </div>
            <div className='flex gap-4'>
              <div className='flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 text-orange-600'>
                <ArrowUpFromLine className='h-4 w-4' />
              </div>
              <div className='flex-1'>
                <p className='text-sm font-medium'>Withdrawal processed</p>
                <p className='text-xs text-muted-foreground'>John Smith withdrew $5,000 via bank transfer</p>
                <p className='text-xs text-muted-foreground'>45 minutes ago</p>
              </div>
            </div>
            <div className='flex gap-4'>
              <div className='flex h-8 w-8 items-center justify-center rounded-full bg-cyan-100 text-cyan-600'>
                <ArrowDownToLine className='h-4 w-4' />
              </div>
              <div className='flex-1'>
                <p className='text-sm font-medium'>Deposit received</p>
                <p className='text-xs text-muted-foreground'>Robert Wilson deposited $10,000 via Credit Card</p>
                <p className='text-xs text-muted-foreground'>1 hour ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Dashboard
