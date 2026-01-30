import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  ArrowDownToLine,
  ArrowUpFromLine,
  Clock,
  CheckCircle,
  XCircle,
  Search,
  Download,
  CreditCard,
  Wallet
} from 'lucide-react'
import { PageSkeleton } from '~/components/skeletons/PageSkeleton'

interface Transaction {
  id: string
  accountNumber: string
  userName: string
  type: 'Deposit' | 'Withdrawal'
  method: string
  amount: number
  fee: number
  netAmount: number
  currency: string
  status: 'Completed' | 'Pending' | 'Processing' | 'Failed' | 'Cancelled'
  requestDate: string
  completedDate?: string
  transactionHash?: string
}

const Transactions = () => {
  const [isLoading, setIsLoading] = useState(true)

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1200)
    return () => clearTimeout(timer)
  }, [])

  const transactions: Transaction[] = [
    {
      id: 'TXN001',
      accountNumber: '1234567890',
      userName: 'John Smith',
      type: 'Deposit',
      method: 'Credit Card',
      amount: 5000.0,
      fee: 25.0,
      netAmount: 4975.0,
      currency: 'USD',
      status: 'Completed',
      requestDate: '2024-02-10 09:30:00',
      completedDate: '2024-02-10 09:35:00'
    },
    {
      id: 'TXN002',
      accountNumber: '1234567891',
      userName: 'Sarah Johnson',
      type: 'Withdrawal',
      method: 'Bank Transfer',
      amount: 10000.0,
      fee: 15.0,
      netAmount: 9985.0,
      currency: 'USD',
      status: 'Processing',
      requestDate: '2024-02-10 08:15:00'
    },
    {
      id: 'TXN003',
      accountNumber: '1234567890',
      userName: 'John Smith',
      type: 'Deposit',
      method: 'Bitcoin',
      amount: 3000.0,
      fee: 10.0,
      netAmount: 2990.0,
      currency: 'USD',
      status: 'Completed',
      requestDate: '2024-02-09 14:20:00',
      completedDate: '2024-02-09 14:45:00',
      transactionHash: '0x1234...5678'
    },
    {
      id: 'TXN004',
      accountNumber: '1234567892',
      userName: 'Michael Chen',
      type: 'Deposit',
      method: 'E-Wallet',
      amount: 1000.0,
      fee: 5.0,
      netAmount: 995.0,
      currency: 'USD',
      status: 'Pending',
      requestDate: '2024-02-10 11:00:00'
    },
    {
      id: 'TXN005',
      accountNumber: '1234567893',
      userName: 'Emily Davis',
      type: 'Withdrawal',
      method: 'Credit Card',
      amount: 2500.0,
      fee: 12.5,
      netAmount: 2487.5,
      currency: 'USD',
      status: 'Completed',
      requestDate: '2024-02-09 16:30:00',
      completedDate: '2024-02-10 09:00:00'
    },
    {
      id: 'TXN006',
      accountNumber: '1234567891',
      userName: 'Sarah Johnson',
      type: 'Deposit',
      method: 'Bank Transfer',
      amount: 50000.0,
      fee: 25.0,
      netAmount: 49975.0,
      currency: 'USD',
      status: 'Completed',
      requestDate: '2024-02-08 10:00:00',
      completedDate: '2024-02-09 10:00:00'
    },
    {
      id: 'TXN007',
      accountNumber: '1234567894',
      userName: 'Robert Wilson',
      type: 'Withdrawal',
      method: 'Ethereum',
      amount: 5000.0,
      fee: 15.0,
      netAmount: 4985.0,
      currency: 'USD',
      status: 'Failed',
      requestDate: '2024-02-10 07:30:00'
    }
  ]

  const deposits = transactions.filter((t) => t.type === 'Deposit')
  const withdrawals = transactions.filter((t) => t.type === 'Withdrawal')
  const pending = transactions.filter((t) => t.status === 'Pending' || t.status === 'Processing')

  const totalDeposits = deposits.reduce((acc, t) => acc + t.amount, 0)
  const totalWithdrawals = withdrawals.reduce((acc, t) => acc + t.amount, 0)
  const totalFees = transactions.reduce((acc, t) => acc + t.fee, 0)

  if (isLoading) {
    return <PageSkeleton hasStats={true} statsCount={4} />
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'default'
      case 'Processing':
        return 'secondary'
      case 'Pending':
        return 'outline'
      case 'Failed':
        return 'destructive'
      case 'Cancelled':
        return 'destructive'
      default:
        return 'default'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle className='h-4 w-4 text-green-500' />
      case 'Processing':
      case 'Pending':
        return <Clock className='h-4 w-4 text-orange-500' />
      case 'Failed':
      case 'Cancelled':
        return <XCircle className='h-4 w-4 text-red-500' />
      default:
        return null
    }
  }

  const getTypeIcon = (type: string) => {
    return type === 'Deposit' ? (
      <ArrowDownToLine className='h-4 w-4 text-green-500' />
    ) : (
      <ArrowUpFromLine className='h-4 w-4 text-blue-500' />
    )
  }

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>Deposits & Withdrawals</h1>
          <p className='text-muted-foreground'>Manage all financial transactions and payment operations</p>
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
            <CardTitle className='text-sm font-medium'>Total Deposits</CardTitle>
            <ArrowDownToLine className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold text-green-500'>${totalDeposits.toLocaleString()}</div>
            <p className='text-xs text-muted-foreground'>{deposits.length} transactions</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Total Withdrawals</CardTitle>
            <ArrowUpFromLine className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold text-blue-500'>${totalWithdrawals.toLocaleString()}</div>
            <p className='text-xs text-muted-foreground'>{withdrawals.length} transactions</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Pending</CardTitle>
            <Clock className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{pending.length}</div>
            <p className='text-xs text-muted-foreground'>Awaiting approval</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Total Fees</CardTitle>
            <CreditCard className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>${totalFees.toLocaleString()}</div>
            <p className='text-xs text-muted-foreground'>Commission earned</p>
          </CardContent>
        </Card>
      </div>

      {/* Transactions Table */}
      <Tabs defaultValue='all' className='space-y-4'>
        <div className='flex items-center justify-between'>
          <TabsList>
            <TabsTrigger value='all'>All Transactions</TabsTrigger>
            <TabsTrigger value='deposits'>
              Deposits <Badge className='ml-2'>{deposits.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value='withdrawals'>
              Withdrawals <Badge className='ml-2'>{withdrawals.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value='pending'>
              Pending <Badge className='ml-2'>{pending.length}</Badge>
            </TabsTrigger>
          </TabsList>
          <div className='relative w-64'>
            <Search className='absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
            <Input placeholder='Search transactions...' className='pl-8' />
          </div>
        </div>

        <TabsContent value='all' className='space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle>All Transactions</CardTitle>
              <CardDescription>Complete transaction history</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Transaction ID</TableHead>
                    <TableHead>Account</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Fee</TableHead>
                    <TableHead>Net Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Request Date</TableHead>
                    <TableHead>Completed Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell className='font-medium'>{transaction.id}</TableCell>
                      <TableCell>
                        <div>
                          <div className='font-medium'>{transaction.accountNumber}</div>
                          <div className='text-xs text-muted-foreground'>{transaction.userName}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className='flex items-center gap-2'>
                          {getTypeIcon(transaction.type)}
                          <span>{transaction.type}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className='flex items-center gap-2'>
                          {transaction.method.includes('Bitcoin') || transaction.method.includes('Ethereum') ? (
                            <Wallet className='h-4 w-4' />
                          ) : (
                            <CreditCard className='h-4 w-4' />
                          )}
                          <span>{transaction.method}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className='font-medium'>
                          ${transaction.amount.toLocaleString()} {transaction.currency}
                        </div>
                      </TableCell>
                      <TableCell className='text-red-500'>${transaction.fee.toLocaleString()}</TableCell>
                      <TableCell className='font-medium'>${transaction.netAmount.toLocaleString()}</TableCell>
                      <TableCell>
                        <div className='flex items-center gap-2'>
                          {getStatusIcon(transaction.status)}
                          <Badge variant={getStatusColor(transaction.status)}>{transaction.status}</Badge>
                        </div>
                      </TableCell>
                      <TableCell className='text-sm'>{transaction.requestDate}</TableCell>
                      <TableCell className='text-sm'>{transaction.completedDate || '-'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='pending' className='space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle>Pending Transactions</CardTitle>
              <CardDescription>Transactions awaiting approval or processing</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Transaction ID</TableHead>
                    <TableHead>Account</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Request Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pending.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell className='font-medium'>{transaction.id}</TableCell>
                      <TableCell>
                        <div>
                          <div className='font-medium'>{transaction.accountNumber}</div>
                          <div className='text-xs text-muted-foreground'>{transaction.userName}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className='flex items-center gap-2'>
                          {getTypeIcon(transaction.type)}
                          <span>{transaction.type}</span>
                        </div>
                      </TableCell>
                      <TableCell>{transaction.method}</TableCell>
                      <TableCell>
                        <div className='font-medium'>
                          ${transaction.amount.toLocaleString()} {transaction.currency}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(transaction.status)}>{transaction.status}</Badge>
                      </TableCell>
                      <TableCell className='text-sm'>{transaction.requestDate}</TableCell>
                      <TableCell>
                        <div className='flex gap-2'>
                          <Button size='sm' variant='default'>
                            Approve
                          </Button>
                          <Button size='sm' variant='destructive'>
                            Reject
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Transactions
