import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Wallet, TrendingUp, DollarSign, Activity, Search, Plus, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { usePagination } from '~/hooks/usePagination'
import { PaginationControls } from '~/components/common/PaginationControls'
import { PageSkeleton } from '~/components/skeletons/PageSkeleton'

interface TradingAccount {
  id: string
  userId: string
  userName: string
  accountNumber: string
  accountType: 'Demo' | 'Live' | 'Institutional'
  balance: number
  equity: number
  margin: number
  freeMargin: number
  leverage: string
  currency: string
  status: 'Active' | 'Inactive' | 'Suspended'
  openPositions: number
  profit: number
  createdDate: string
}

const TradingAccounts = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1200)
    return () => clearTimeout(timer)
  }, [])

  const accounts: TradingAccount[] = [
    {
      id: 'ACC001',
      userId: 'USR001',
      userName: 'John Smith',
      accountNumber: '1234567890',
      accountType: 'Live',
      balance: 50000.0,
      equity: 52340.5,
      margin: 5000.0,
      freeMargin: 47340.5,
      leverage: '1:500',
      currency: 'USD',
      status: 'Active',
      openPositions: 3,
      profit: 2340.5,
      createdDate: '2024-01-15'
    },
    {
      id: 'ACC002',
      userId: 'USR002',
      userName: 'Sarah Johnson',
      accountNumber: '1234567891',
      accountType: 'Institutional',
      balance: 100000.0,
      equity: 98450.0,
      margin: 15000.0,
      freeMargin: 83450.0,
      leverage: '1:200',
      currency: 'USD',
      status: 'Active',
      openPositions: 5,
      profit: -1550.0,
      createdDate: '2024-01-20'
    },
    {
      id: 'ACC003',
      userId: 'USR003',
      userName: 'Michael Chen',
      accountNumber: '1234567892',
      accountType: 'Demo',
      balance: 10000.0,
      equity: 10500.0,
      margin: 1000.0,
      freeMargin: 9500.0,
      leverage: '1:100',
      currency: 'USD',
      status: 'Active',
      openPositions: 2,
      profit: 500.0,
      createdDate: '2024-02-01'
    },
    {
      id: 'ACC004',
      userId: 'USR004',
      userName: 'Emily Davis',
      accountNumber: '1234567893',
      accountType: 'Live',
      balance: 25000.0,
      equity: 26780.0,
      margin: 3000.0,
      freeMargin: 23780.0,
      leverage: '1:400',
      currency: 'USD',
      status: 'Active',
      openPositions: 4,
      profit: 1780.0,
      createdDate: '2024-01-25'
    }
  ]

  const getAccountTypeColor = (type: string) => {
    switch (type) {
      case 'Live':
        return 'default'
      case 'Demo':
        return 'secondary'
      case 'Institutional':
        return 'outline'
      default:
        return 'default'
    }
  }

  const totalBalance = accounts.reduce((acc, account) => acc + account.balance, 0)
  const totalEquity = accounts.reduce((acc, account) => acc + account.equity, 0)
  const totalProfit = accounts.reduce((acc, account) => acc + account.profit, 0)

  // Filter accounts by search query
  const filteredAccounts = accounts.filter(
    (account) =>
      account.accountNumber.includes(searchQuery) ||
      account.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      account.id.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Separate by account type
  const liveAccounts = filteredAccounts.filter((acc) => acc.accountType === 'Live')
  const demoAccounts = filteredAccounts.filter((acc) => acc.accountType === 'Demo')
  const institutionalAccounts = filteredAccounts.filter((acc) => acc.accountType === 'Institutional')

  // Pagination
  const allPagination = usePagination({ items: filteredAccounts, itemsPerPage: 10 })
  const livePagination = usePagination({ items: liveAccounts, itemsPerPage: 10 })
  const demoPagination = usePagination({ items: demoAccounts, itemsPerPage: 10 })
  const institutionalPagination = usePagination({ items: institutionalAccounts, itemsPerPage: 10 })

  // Reset pagination when search changes
  useEffect(() => {
    allPagination.resetPage()
    livePagination.resetPage()
    demoPagination.resetPage()
    institutionalPagination.resetPage()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery])

  if (isLoading) {
    return <PageSkeleton hasStats={true} statsCount={4} />
  }

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>Trading Accounts</h1>
          <p className='text-muted-foreground'>Monitor and manage all trading accounts across the platform</p>
        </div>
        <Button>
          <Plus className='mr-2 h-4 w-4' />
          Create Account
        </Button>
      </div>

      {/* Stats Cards */}
      <div className='grid gap-4 md:grid-cols-4'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Total Accounts</CardTitle>
            <Wallet className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{accounts.length}</div>
            <p className='text-xs text-muted-foreground'>+3 new this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Total Balance</CardTitle>
            <DollarSign className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>${totalBalance.toLocaleString()}</div>
            <p className='text-xs text-muted-foreground'>Across all accounts</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Total Equity</CardTitle>
            <TrendingUp className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>${totalEquity.toLocaleString()}</div>
            <p className='text-xs text-muted-foreground'>Current equity value</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Total P&L</CardTitle>
            <Activity className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${totalProfit >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {totalProfit >= 0 ? '+' : ''}${totalProfit.toLocaleString()}
            </div>
            <p className='text-xs text-muted-foreground'>Unrealized profit/loss</p>
          </CardContent>
        </Card>
      </div>

      {/* Accounts Table */}
      <Tabs defaultValue='all' className='space-y-4'>
        {/* Tabs + Search: stack on mobile, row on desktop, tabs scroll horizontally if overflow */}
        <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
          <TabsList>
            <TabsTrigger value='all'>All Accounts</TabsTrigger>
            <TabsTrigger value='live'>Live</TabsTrigger>
            <TabsTrigger value='demo'>Demo</TabsTrigger>
            <TabsTrigger value='institutional'>Institutional</TabsTrigger>
          </TabsList>
          <div className='relative w-full md:w-72'>
            <Search className='absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
            <Input
              placeholder='Search accounts...'
              className='pl-8'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <TabsContent value='all' className='space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle>All Trading Accounts</CardTitle>
              <CardDescription>Complete list of trading accounts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='overflow-x-auto'>
                <Table className='min-w-[980px]'>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Account</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Balance</TableHead>
                      <TableHead>Equity</TableHead>
                      <TableHead>Margin</TableHead>
                      <TableHead>Free Margin</TableHead>
                      <TableHead>Leverage</TableHead>
                      <TableHead>Positions</TableHead>
                      <TableHead>P&L</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {allPagination.currentItems.map((account) => (
                      <TableRow key={account.id}>
                        <TableCell>
                          <div>
                            <div className='font-medium'>{account.accountNumber}</div>
                            <div className='text-xs text-muted-foreground'>{account.id}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className='font-medium'>{account.userName}</div>
                            <div className='text-xs text-muted-foreground'>{account.userId}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={getAccountTypeColor(account.accountType)}>{account.accountType}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className='font-medium'>
                            ${account.balance.toLocaleString()} {account.currency}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className='font-medium'>
                            ${account.equity.toLocaleString()} {account.currency}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>${account.margin.toLocaleString()}</div>
                        </TableCell>
                        <TableCell>
                          <div>${account.freeMargin.toLocaleString()}</div>
                        </TableCell>
                        <TableCell>
                          <Badge variant='outline'>{account.leverage}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className='text-center'>{account.openPositions}</div>
                        </TableCell>
                        <TableCell>
                          <div
                            className={`flex items-center gap-1 font-medium ${account.profit >= 0 ? 'text-green-500' : 'text-red-500'
                              }`}
                          >
                            {account.profit >= 0 ? (
                              <ArrowUpRight className='h-4 w-4' />
                            ) : (
                              <ArrowDownRight className='h-4 w-4' />
                            )}
                            {account.profit >= 0 ? '+' : ''}${account.profit.toLocaleString()}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={account.status === 'Active' ? 'default' : 'secondary'}>
                            {account.status}
                          </Badge>
                        </TableCell>
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
                itemName='accounts'
                onPageChange={allPagination.goToPage}
                onNext={allPagination.nextPage}
                onPrevious={allPagination.previousPage}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Live Accounts Tab */}
        <TabsContent value='live' className='space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle>Live Trading Accounts</CardTitle>
              <CardDescription>Real money trading accounts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='overflow-x-auto'>
                <Table className='min-w-[980px]'>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Account</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Balance</TableHead>
                      <TableHead>Equity</TableHead>
                      <TableHead>Margin</TableHead>
                      <TableHead>Free Margin</TableHead>
                      <TableHead>Leverage</TableHead>
                      <TableHead>Positions</TableHead>
                      <TableHead>P&L</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {livePagination.currentItems.map((account) => (
                      <TableRow key={account.id}>
                        <TableCell>
                          <div>
                            <div className='font-medium'>{account.accountNumber}</div>
                            <div className='text-xs text-muted-foreground'>{account.id}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className='font-medium'>{account.userName}</div>
                            <div className='text-xs text-muted-foreground'>{account.userId}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={getAccountTypeColor(account.accountType)}>{account.accountType}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className='font-medium'>
                            ${account.balance.toLocaleString()} {account.currency}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className='font-medium'>
                            ${account.equity.toLocaleString()} {account.currency}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>${account.margin.toLocaleString()}</div>
                        </TableCell>
                        <TableCell>
                          <div>${account.freeMargin.toLocaleString()}</div>
                        </TableCell>
                        <TableCell>
                          <Badge variant='outline'>{account.leverage}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className='text-center'>{account.openPositions}</div>
                        </TableCell>
                        <TableCell>
                          <div
                            className={`flex items-center gap-1 font-medium ${account.profit >= 0 ? 'text-green-500' : 'text-red-500'
                              }`}
                          >
                            {account.profit >= 0 ? (
                              <ArrowUpRight className='h-4 w-4' />
                            ) : (
                              <ArrowDownRight className='h-4 w-4' />
                            )}
                            {account.profit >= 0 ? '+' : ''}${account.profit.toLocaleString()}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={account.status === 'Active' ? 'default' : 'secondary'}>
                            {account.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              <PaginationControls
                currentPage={livePagination.currentPage}
                totalPages={livePagination.totalPages}
                startIndex={livePagination.startIndex}
                endIndex={livePagination.endIndex}
                totalItems={livePagination.totalItems}
                itemName='accounts'
                onPageChange={livePagination.goToPage}
                onNext={livePagination.nextPage}
                onPrevious={livePagination.previousPage}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Demo Accounts Tab */}
        <TabsContent value='demo' className='space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle>Demo Trading Accounts</CardTitle>
              <CardDescription>Practice accounts with virtual money</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='overflow-x-auto'>
                <Table className='min-w-[980px]'>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Account</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Balance</TableHead>
                      <TableHead>Equity</TableHead>
                      <TableHead>Margin</TableHead>
                      <TableHead>Free Margin</TableHead>
                      <TableHead>Leverage</TableHead>
                      <TableHead>Positions</TableHead>
                      <TableHead>P&L</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {demoPagination.currentItems.map((account) => (
                      <TableRow key={account.id}>
                        <TableCell>
                          <div>
                            <div className='font-medium'>{account.accountNumber}</div>
                            <div className='text-xs text-muted-foreground'>{account.id}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className='font-medium'>{account.userName}</div>
                            <div className='text-xs text-muted-foreground'>{account.userId}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={getAccountTypeColor(account.accountType)}>{account.accountType}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className='font-medium'>
                            ${account.balance.toLocaleString()} {account.currency}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className='font-medium'>
                            ${account.equity.toLocaleString()} {account.currency}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>${account.margin.toLocaleString()}</div>
                        </TableCell>
                        <TableCell>
                          <div>${account.freeMargin.toLocaleString()}</div>
                        </TableCell>
                        <TableCell>
                          <Badge variant='outline'>{account.leverage}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className='text-center'>{account.openPositions}</div>
                        </TableCell>
                        <TableCell>
                          <div
                            className={`flex items-center gap-1 font-medium ${account.profit >= 0 ? 'text-green-500' : 'text-red-500'
                              }`}
                          >
                            {account.profit >= 0 ? (
                              <ArrowUpRight className='h-4 w-4' />
                            ) : (
                              <ArrowDownRight className='h-4 w-4' />
                            )}
                            {account.profit >= 0 ? '+' : ''}${account.profit.toLocaleString()}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={account.status === 'Active' ? 'default' : 'secondary'}>
                            {account.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              <PaginationControls
                currentPage={demoPagination.currentPage}
                totalPages={demoPagination.totalPages}
                startIndex={demoPagination.startIndex}
                endIndex={demoPagination.endIndex}
                totalItems={demoPagination.totalItems}
                itemName='accounts'
                onPageChange={demoPagination.goToPage}
                onNext={demoPagination.nextPage}
                onPrevious={demoPagination.previousPage}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Institutional Accounts Tab */}
        <TabsContent value='institutional' className='space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle>Institutional Trading Accounts</CardTitle>
              <CardDescription>High-volume institutional client accounts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='overflow-x-auto'>
                <Table className='min-w-[980px]'>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Account</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Balance</TableHead>
                      <TableHead>Equity</TableHead>
                      <TableHead>Margin</TableHead>
                      <TableHead>Free Margin</TableHead>
                      <TableHead>Leverage</TableHead>
                      <TableHead>Positions</TableHead>
                      <TableHead>P&L</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {institutionalPagination.currentItems.map((account) => (
                      <TableRow key={account.id}>
                        <TableCell>
                          <div>
                            <div className='font-medium'>{account.accountNumber}</div>
                            <div className='text-xs text-muted-foreground'>{account.id}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className='font-medium'>{account.userName}</div>
                            <div className='text-xs text-muted-foreground'>{account.userId}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={getAccountTypeColor(account.accountType)}>{account.accountType}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className='font-medium'>
                            ${account.balance.toLocaleString()} {account.currency}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className='font-medium'>
                            ${account.equity.toLocaleString()} {account.currency}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>${account.margin.toLocaleString()}</div>
                        </TableCell>
                        <TableCell>
                          <div>${account.freeMargin.toLocaleString()}</div>
                        </TableCell>
                        <TableCell>
                          <Badge variant='outline'>{account.leverage}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className='text-center'>{account.openPositions}</div>
                        </TableCell>
                        <TableCell>
                          <div
                            className={`flex items-center gap-1 font-medium ${account.profit >= 0 ? 'text-green-500' : 'text-red-500'
                              }`}
                          >
                            {account.profit >= 0 ? (
                              <ArrowUpRight className='h-4 w-4' />
                            ) : (
                              <ArrowDownRight className='h-4 w-4' />
                            )}
                            {account.profit >= 0 ? '+' : ''}${account.profit.toLocaleString()}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={account.status === 'Active' ? 'default' : 'secondary'}>
                            {account.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              <PaginationControls
                currentPage={institutionalPagination.currentPage}
                totalPages={institutionalPagination.totalPages}
                startIndex={institutionalPagination.startIndex}
                endIndex={institutionalPagination.endIndex}
                totalItems={institutionalPagination.totalItems}
                itemName='accounts'
                onPageChange={institutionalPagination.goToPage}
                onNext={institutionalPagination.nextPage}
                onPrevious={institutionalPagination.previousPage}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default TradingAccounts
