import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  BarChart3,
  TrendingUp,
  DollarSign,
  Users,
  Download,
  Calendar,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react'
import { DashboardSkeleton } from '~/components/skeletons/DashboardSkeleton'

const Reports = () => {
  const [isLoading, setIsLoading] = useState(true)

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1200)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <DashboardSkeleton />
  }

  const revenueData = [
    { month: 'Jan', revenue: 45000, trades: 1250, users: 320 },
    { month: 'Feb', revenue: 52000, trades: 1480, users: 385 },
    { month: 'Mar', revenue: 48000, trades: 1320, users: 350 },
    { month: 'Apr', revenue: 61000, trades: 1690, users: 425 },
    { month: 'May', revenue: 73000, trades: 1950, users: 490 },
    { month: 'Jun', revenue: 85000, trades: 2250, users: 580 }
  ]

  const topTraders = [
    {
      name: 'John Smith',
      volume: 12500000,
      trades: 450,
      profit: 125000,
      commission: 2500
    },
    {
      name: 'Sarah Johnson',
      volume: 9800000,
      trades: 320,
      profit: 98000,
      commission: 1960
    },
    {
      name: 'Michael Chen',
      volume: 7500000,
      trades: 280,
      profit: 75000,
      commission: 1500
    },
    {
      name: 'Emily Davis',
      volume: 6200000,
      trades: 210,
      profit: 62000,
      commission: 1240
    },
    {
      name: 'Robert Wilson',
      volume: 5800000,
      trades: 195,
      profit: 58000,
      commission: 1160
    }
  ]

  const currentMonth = revenueData[revenueData.length - 1]
  const previousMonth = revenueData[revenueData.length - 2]

  const revenueChange = ((currentMonth.revenue - previousMonth.revenue) / previousMonth.revenue) * 100
  const tradesChange = ((currentMonth.trades - previousMonth.trades) / previousMonth.trades) * 100
  const usersChange = ((currentMonth.users - previousMonth.users) / previousMonth.users) * 100

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>Reports & Analytics</h1>
          <p className='text-muted-foreground'>Track performance metrics and generate insights</p>
        </div>
        <div className='flex gap-2'>
          <Button variant='outline'>
            <Calendar className='mr-2 h-4 w-4' />
            Date Range
          </Button>
          <Button>
            <Download className='mr-2 h-4 w-4' />
            Export All
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className='grid gap-4 md:grid-cols-4'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Total Revenue</CardTitle>
            <DollarSign className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>${currentMonth.revenue.toLocaleString()}</div>
            <div className='flex items-center gap-1 text-xs'>
              {revenueChange >= 0 ? (
                <ArrowUpRight className='h-4 w-4 text-green-500' />
              ) : (
                <ArrowDownRight className='h-4 w-4 text-red-500' />
              )}
              <span className={revenueChange >= 0 ? 'text-green-500' : 'text-red-500'}>
                {revenueChange >= 0 ? '+' : ''}
                {revenueChange.toFixed(1)}%
              </span>
              <span className='text-muted-foreground'>from last month</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Total Trades</CardTitle>
            <BarChart3 className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{currentMonth.trades.toLocaleString()}</div>
            <div className='flex items-center gap-1 text-xs'>
              {tradesChange >= 0 ? (
                <ArrowUpRight className='h-4 w-4 text-green-500' />
              ) : (
                <ArrowDownRight className='h-4 w-4 text-red-500' />
              )}
              <span className={tradesChange >= 0 ? 'text-green-500' : 'text-red-500'}>
                {tradesChange >= 0 ? '+' : ''}
                {tradesChange.toFixed(1)}%
              </span>
              <span className='text-muted-foreground'>from last month</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Active Users</CardTitle>
            <Users className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{currentMonth.users.toLocaleString()}</div>
            <div className='flex items-center gap-1 text-xs'>
              {usersChange >= 0 ? (
                <ArrowUpRight className='h-4 w-4 text-green-500' />
              ) : (
                <ArrowDownRight className='h-4 w-4 text-red-500' />
              )}
              <span className={usersChange >= 0 ? 'text-green-500' : 'text-red-500'}>
                {usersChange >= 0 ? '+' : ''}
                {usersChange.toFixed(1)}%
              </span>
              <span className='text-muted-foreground'>from last month</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Avg. Trade Size</CardTitle>
            <TrendingUp className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>${(currentMonth.revenue / currentMonth.trades).toFixed(0)}</div>
            <p className='text-xs text-muted-foreground'>Per transaction</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Tables */}
      <Tabs defaultValue='overview' className='space-y-4'>
        <TabsList>
          <TabsTrigger value='overview'>Overview</TabsTrigger>
          <TabsTrigger value='revenue'>Revenue</TabsTrigger>
          <TabsTrigger value='traders'>Top Traders</TabsTrigger>
          <TabsTrigger value='instruments'>Instruments</TabsTrigger>
        </TabsList>

        <TabsContent value='overview' className='space-y-4'>
          <div className='grid gap-4 md:grid-cols-2'>
            {/* Revenue Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Revenue Trend</CardTitle>
                <CardDescription>Monthly revenue over the past 6 months</CardDescription>
              </CardHeader>
              <CardContent>
                <div className='space-y-3'>
                  {revenueData.map((data) => {
                    const maxRevenue = Math.max(...revenueData.map((d) => d.revenue))
                    const widthPercentage = (data.revenue / maxRevenue) * 100

                    return (
                      <div key={data.month}>
                        <div className='mb-1 flex items-center justify-between text-sm'>
                          <span className='font-medium'>{data.month}</span>
                          <span className='text-muted-foreground'>${data.revenue.toLocaleString()}</span>
                        </div>
                        <div className='h-2 w-full rounded-full bg-muted'>
                          <div
                            className='h-2 rounded-full bg-primary transition-all'
                            style={{ width: `${widthPercentage}%` }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Trades Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Trading Activity</CardTitle>
                <CardDescription>Number of trades per month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className='space-y-3'>
                  {revenueData.map((data) => {
                    const maxTrades = Math.max(...revenueData.map((d) => d.trades))
                    const widthPercentage = (data.trades / maxTrades) * 100

                    return (
                      <div key={data.month}>
                        <div className='mb-1 flex items-center justify-between text-sm'>
                          <span className='font-medium'>{data.month}</span>
                          <span className='text-muted-foreground'>{data.trades.toLocaleString()} trades</span>
                        </div>
                        <div className='h-2 w-full rounded-full bg-muted'>
                          <div
                            className='h-2 rounded-full bg-blue-500 transition-all'
                            style={{ width: `${widthPercentage}%` }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* User Growth */}
          <Card>
            <CardHeader>
              <CardTitle>User Growth</CardTitle>
              <CardDescription>Active users over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-3'>
                {revenueData.map((data) => {
                  const maxUsers = Math.max(...revenueData.map((d) => d.users))
                  const widthPercentage = (data.users / maxUsers) * 100

                  return (
                    <div key={data.month} className='flex items-center gap-4'>
                      <div className='w-12 text-sm font-medium'>{data.month}</div>
                      <div className='flex-1'>
                        <div className='h-8 w-full rounded-md bg-muted'>
                          <div
                            className='flex h-8 items-center justify-end rounded-md bg-green-500 px-2 text-xs font-medium text-white transition-all'
                            style={{ width: `${widthPercentage}%` }}
                          >
                            {data.users}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='traders' className='space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle>Top Traders by Volume</CardTitle>
              <CardDescription>Highest performing traders this month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                {topTraders.map((trader, index) => (
                  <div key={trader.name} className='flex items-center gap-4'>
                    <div className='flex h-10 w-10 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground'>
                      {index + 1}
                    </div>
                    <div className='flex-1'>
                      <div className='font-medium'>{trader.name}</div>
                      <div className='text-sm text-muted-foreground'>{trader.trades} trades</div>
                    </div>
                    <div className='text-right'>
                      <div className='font-medium'>${(trader.volume / 1000000).toFixed(1)}M</div>
                      <div className='text-sm text-muted-foreground'>Volume</div>
                    </div>
                    <div className='text-right'>
                      <div className='font-medium text-green-500'>${trader.profit.toLocaleString()}</div>
                      <div className='text-sm text-muted-foreground'>Profit</div>
                    </div>
                    <div className='text-right'>
                      <div className='font-medium'>${trader.commission.toLocaleString()}</div>
                      <div className='text-sm text-muted-foreground'>Commission</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Reports
