import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle,
  XCircle,
  Search,
  Download,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react'
import { usePagination } from '~/hooks/usePagination'
import { PaginationControls } from '~/components/common/PaginationControls'
import { PageSkeleton } from '~/components/skeletons/PageSkeleton'

interface Order {
  id: string
  accountNumber: string
  userName: string
  symbol: string
  type: 'Buy' | 'Sell'
  orderType: 'Market' | 'Limit' | 'Stop'
  volume: number
  openPrice: number
  currentPrice: number
  stopLoss?: number
  takeProfit?: number
  profit: number
  commission: number
  swap: number
  status: 'Open' | 'Closed' | 'Pending' | 'Cancelled'
  openTime: string
  closeTime?: string
}

const Orders = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1200)
    return () => clearTimeout(timer)
  }, [])

  const orders: Order[] = [
    {
      id: 'ORD001',
      accountNumber: '1234567890',
      userName: 'John Smith',
      symbol: 'EURUSD',
      type: 'Buy',
      orderType: 'Market',
      volume: 1.0,
      openPrice: 1.0845,
      currentPrice: 1.0867,
      stopLoss: 1.0825,
      takeProfit: 1.0885,
      profit: 220.0,
      commission: -5.0,
      swap: -2.5,
      status: 'Open',
      openTime: '2024-02-10 09:30:00'
    },
    {
      id: 'ORD002',
      accountNumber: '1234567891',
      userName: 'Sarah Johnson',
      symbol: 'BTCUSD',
      type: 'Buy',
      orderType: 'Limit',
      volume: 0.5,
      openPrice: 45000.0,
      currentPrice: 46200.0,
      stopLoss: 44500.0,
      takeProfit: 47000.0,
      profit: 600.0,
      commission: -10.0,
      swap: 0,
      status: 'Open',
      openTime: '2024-02-10 08:15:00'
    },
    {
      id: 'ORD003',
      accountNumber: '1234567890',
      userName: 'John Smith',
      symbol: 'GBPUSD',
      type: 'Sell',
      orderType: 'Market',
      volume: 2.0,
      openPrice: 1.2675,
      currentPrice: 1.2658,
      stopLoss: 1.2695,
      takeProfit: 1.2635,
      profit: 340.0,
      commission: -8.0,
      swap: -1.5,
      status: 'Open',
      openTime: '2024-02-10 10:45:00'
    },
    {
      id: 'ORD004',
      accountNumber: '1234567892',
      userName: 'Michael Chen',
      symbol: 'ETHUSD',
      type: 'Buy',
      orderType: 'Stop',
      volume: 5.0,
      openPrice: 2500.0,
      currentPrice: 2480.0,
      profit: -100.0,
      commission: -5.0,
      swap: 0,
      status: 'Pending',
      openTime: '2024-02-10 11:00:00'
    },
    {
      id: 'ORD005',
      accountNumber: '1234567893',
      userName: 'Emily Davis',
      symbol: 'XAUUSD',
      type: 'Buy',
      orderType: 'Market',
      volume: 0.1,
      openPrice: 2050.0,
      currentPrice: 2055.0,
      stopLoss: 2040.0,
      takeProfit: 2070.0,
      profit: 50.0,
      commission: -3.0,
      swap: -0.5,
      status: 'Closed',
      openTime: '2024-02-09 14:30:00',
      closeTime: '2024-02-10 09:15:00'
    }
  ]

  const openOrders = orders.filter((o) => o.status === 'Open')
  const pendingOrders = orders.filter((o) => o.status === 'Pending')
  const closedOrders = orders.filter((o) => o.status === 'Closed')

  const totalProfit = openOrders.reduce((acc, order) => acc + order.profit, 0)
  const totalVolume = openOrders.reduce((acc, order) => acc + order.volume, 0)

  // Filtered orders based on search
  const filteredOpenOrders = openOrders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.accountNumber.includes(searchQuery)
  )

  const filteredPendingOrders = pendingOrders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.accountNumber.includes(searchQuery)
  )

  const filteredClosedOrders = closedOrders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.accountNumber.includes(searchQuery)
  )

  const filteredAllOrders = orders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.accountNumber.includes(searchQuery)
  )

  // Pagination for each tab
  const openPagination = usePagination({ items: filteredOpenOrders, itemsPerPage: 10 })
  const pendingPagination = usePagination({ items: filteredPendingOrders, itemsPerPage: 10 })
  const closedPagination = usePagination({ items: filteredClosedOrders, itemsPerPage: 10 })
  const allPagination = usePagination({ items: filteredAllOrders, itemsPerPage: 10 })

  // Reset pagination when search changes
  useEffect(() => {
    openPagination.resetPage()
    pendingPagination.resetPage()
    closedPagination.resetPage()
    allPagination.resetPage()
  }, [searchQuery])

  const getTypeColor = (type: string) => {
    return type === 'Buy' ? 'default' : 'secondary'
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Open':
        return <TrendingUp className='h-4 w-4 text-green-500' />
      case 'Closed':
        return <CheckCircle className='h-4 w-4 text-blue-500' />
      case 'Pending':
        return <Clock className='h-4 w-4 text-orange-500' />
      case 'Cancelled':
        return <XCircle className='h-4 w-4 text-red-500' />
      default:
        return null
    }
  }

  if (isLoading) {
    return <PageSkeleton hasStats={true} statsCount={4} />
  }

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>Orders & Trades</h1>
          <p className='text-muted-foreground'>Monitor all trading orders and positions in real-time</p>
        </div>
        <Button>
          <Download className='mr-2 h-4 w-4' />
          Export Report
        </Button>
      </div>

      {/* Stats Cards */}
      <div className='grid gap-4 md:grid-cols-4'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Open Positions</CardTitle>
            <TrendingUp className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{openOrders.length}</div>
            <p className='text-xs text-muted-foreground'>Active trades</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Pending Orders</CardTitle>
            <Clock className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{pendingOrders.length}</div>
            <p className='text-xs text-muted-foreground'>Waiting for execution</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Total Volume</CardTitle>
            <TrendingDown className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{totalVolume.toFixed(2)}</div>
            <p className='text-xs text-muted-foreground'>Lots in open positions</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Total P&L</CardTitle>
            <CheckCircle className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${totalProfit >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {totalProfit >= 0 ? '+' : ''}${totalProfit.toLocaleString()}
            </div>
            <p className='text-xs text-muted-foreground'>From open positions</p>
          </CardContent>
        </Card>
      </div>

      {/* Orders Table */}
      <Tabs defaultValue='open' className='space-y-4'>
        {/* Tabs + Search: stack on mobile, row on desktop, tabs scroll horizontally if overflow */}
        <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
          <TabsList>
            <TabsTrigger value='open'>
              Open <Badge className='ml-2'>{openOrders.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value='pending'>
              Pending <Badge className='ml-2'>{pendingOrders.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value='closed'>
              Closed <Badge className='ml-2'>{closedOrders.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value='all'>All</TabsTrigger>
          </TabsList>
          <div className='relative w-full md:w-72'>
            <Search className='absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
            <Input
              placeholder='Search orders...'
              className='pl-8'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <TabsContent value='open' className='space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle>Open Positions</CardTitle>
              <CardDescription>Currently active trading positions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='overflow-x-auto'>
                <Table className='min-w-[960px]'>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Account</TableHead>
                      <TableHead>Symbol</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Volume</TableHead>
                      <TableHead>Open Price</TableHead>
                      <TableHead>Current Price</TableHead>
                      <TableHead>SL/TP</TableHead>
                      <TableHead>Profit</TableHead>
                      <TableHead>Commission</TableHead>
                      <TableHead>Swap</TableHead>
                      <TableHead>Open Time</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {openPagination.currentItems.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className='font-medium'>{order.id}</TableCell>
                        <TableCell>
                          <div>
                            <div className='font-medium'>{order.accountNumber}</div>
                            <div className='text-xs text-muted-foreground'>{order.userName}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className='font-medium'>{order.symbol}</div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={getTypeColor(order.type)}>{order.type}</Badge>
                        </TableCell>
                        <TableCell>{order.volume}</TableCell>
                        <TableCell>{order.openPrice}</TableCell>
                        <TableCell>{order.currentPrice}</TableCell>
                        <TableCell>
                          <div className='space-y-1 text-xs'>
                            {order.stopLoss && <div className='text-red-500'>SL: {order.stopLoss}</div>}
                            {order.takeProfit && <div className='text-green-500'>TP: {order.takeProfit}</div>}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div
                            className={`flex items-center gap-1 font-medium ${order.profit >= 0 ? 'text-green-500' : 'text-red-500'
                              }`}
                          >
                            {order.profit >= 0 ? (
                              <ArrowUpRight className='h-4 w-4' />
                            ) : (
                              <ArrowDownRight className='h-4 w-4' />
                            )}
                            {order.profit >= 0 ? '+' : ''}${order.profit.toFixed(2)}
                          </div>
                        </TableCell>
                        <TableCell className='text-red-500'>${order.commission.toFixed(2)}</TableCell>
                        <TableCell className='text-muted-foreground'>${order.swap.toFixed(2)}</TableCell>
                        <TableCell className='text-sm'>{order.openTime}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              <PaginationControls
                currentPage={openPagination.currentPage}
                totalPages={openPagination.totalPages}
                startIndex={openPagination.startIndex}
                endIndex={openPagination.endIndex}
                totalItems={openPagination.totalItems}
                itemName='orders'
                onPageChange={openPagination.goToPage}
                onNext={openPagination.nextPage}
                onPrevious={openPagination.previousPage}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='all' className='space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle>All Orders</CardTitle>
              <CardDescription>Complete trading history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='overflow-x-auto'>
                <Table className='min-w-[900px]'>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Account</TableHead>
                      <TableHead>Symbol</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Volume</TableHead>
                      <TableHead>Open Price</TableHead>
                      <TableHead>Current Price</TableHead>
                      <TableHead>Profit</TableHead>
                      <TableHead>Open Time</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {allPagination.currentItems.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className='font-medium'>{order.id}</TableCell>
                        <TableCell>
                          <div className='flex items-center gap-2'>
                            {getStatusIcon(order.status)}
                            <span>{order.status}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className='font-medium'>{order.accountNumber}</div>
                            <div className='text-xs text-muted-foreground'>{order.userName}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className='font-medium'>{order.symbol}</div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={getTypeColor(order.type)}>{order.type}</Badge>
                        </TableCell>
                        <TableCell>{order.volume}</TableCell>
                        <TableCell>{order.openPrice}</TableCell>
                        <TableCell>{order.currentPrice}</TableCell>
                        <TableCell>
                          <div
                            className={`flex items-center gap-1 font-medium ${order.profit >= 0 ? 'text-green-500' : 'text-red-500'
                              }`}
                          >
                            {order.profit >= 0 ? (
                              <ArrowUpRight className='h-4 w-4' />
                            ) : (
                              <ArrowDownRight className='h-4 w-4' />
                            )}
                            {order.profit >= 0 ? '+' : ''}${order.profit.toFixed(2)}
                          </div>
                        </TableCell>
                        <TableCell className='text-sm'>{order.openTime}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              <PaginationControls
                currentPage={allPagination.currentPage}
                totalPages={allPagination.totalPages}
                startIndex={allPagination.startIndex}
                endIndex={allPagination.endIndex}
                totalItems={allPagination.totalItems}
                itemName='orders'
                onPageChange={allPagination.goToPage}
                onNext={allPagination.nextPage}
                onPrevious={allPagination.previousPage}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='pending' className='space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle>Pending Orders</CardTitle>
              <CardDescription>Orders waiting for execution</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='overflow-x-auto'>
                <Table className='min-w-[800px]'>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Account</TableHead>
                      <TableHead>Symbol</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Order Type</TableHead>
                      <TableHead>Volume</TableHead>
                      <TableHead>Target Price</TableHead>
                      <TableHead>Created</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingPagination.currentItems.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className='font-medium'>{order.id}</TableCell>
                        <TableCell>
                          <div>
                            <div className='font-medium'>{order.accountNumber}</div>
                            <div className='text-xs text-muted-foreground'>{order.userName}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className='font-medium'>{order.symbol}</div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={getTypeColor(order.type)}>{order.type}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant='outline'>{order.orderType}</Badge>
                        </TableCell>
                        <TableCell>{order.volume}</TableCell>
                        <TableCell>{order.openPrice}</TableCell>
                        <TableCell className='text-sm'>{order.openTime}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              <PaginationControls
                currentPage={pendingPagination.currentPage}
                totalPages={pendingPagination.totalPages}
                startIndex={pendingPagination.startIndex}
                endIndex={pendingPagination.endIndex}
                totalItems={pendingPagination.totalItems}
                itemName='orders'
                onPageChange={pendingPagination.goToPage}
                onNext={pendingPagination.nextPage}
                onPrevious={pendingPagination.previousPage}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='closed' className='space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle>Closed Positions</CardTitle>
              <CardDescription>Trading history and closed positions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='overflow-x-auto'>
                <Table className='min-w-[960px]'>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Account</TableHead>
                      <TableHead>Symbol</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Volume</TableHead>
                      <TableHead>Open Price</TableHead>
                      <TableHead>Close Price</TableHead>
                      <TableHead>Profit</TableHead>
                      <TableHead>Open Time</TableHead>
                      <TableHead>Close Time</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {closedPagination.currentItems.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className='font-medium'>{order.id}</TableCell>
                        <TableCell>
                          <div>
                            <div className='font-medium'>{order.accountNumber}</div>
                            <div className='text-xs text-muted-foreground'>{order.userName}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className='font-medium'>{order.symbol}</div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={getTypeColor(order.type)}>{order.type}</Badge>
                        </TableCell>
                        <TableCell>{order.volume}</TableCell>
                        <TableCell>{order.openPrice}</TableCell>
                        <TableCell>{order.currentPrice}</TableCell>
                        <TableCell>
                          <div
                            className={`flex items-center gap-1 font-medium ${order.profit >= 0 ? 'text-green-500' : 'text-red-500'
                              }`}
                          >
                            {order.profit >= 0 ? (
                              <ArrowUpRight className='h-4 w-4' />
                            ) : (
                              <ArrowDownRight className='h-4 w-4' />
                            )}
                            {order.profit >= 0 ? '+' : ''}${order.profit.toFixed(2)}
                          </div>
                        </TableCell>
                        <TableCell className='text-sm'>{order.openTime}</TableCell>
                        <TableCell className='text-sm'>{order.closeTime || 'N/A'}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              <PaginationControls
                currentPage={closedPagination.currentPage}
                totalPages={closedPagination.totalPages}
                startIndex={closedPagination.startIndex}
                endIndex={closedPagination.endIndex}
                totalItems={closedPagination.totalItems}
                itemName='orders'
                onPageChange={closedPagination.goToPage}
                onNext={closedPagination.nextPage}
                onPrevious={closedPagination.previousPage}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Orders
