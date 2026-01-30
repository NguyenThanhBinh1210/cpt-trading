import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { usePagination } from '~/hooks/usePagination'
import { PaginationControls } from '~/components/common/PaginationControls'
import { PageSkeleton } from '~/components/skeletons/PageSkeleton'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  UserPlus,
  Search,
  MoreHorizontal,
  Mail,
  Phone,
  Edit,
  Trash2,
  Ban,
  CheckCircle,
  AlertCircle,
  Download
} from 'lucide-react'

interface User {
  id: string
  name: string
  email: string
  phone: string
  accountType: 'Retail' | 'Institutional'
  status: 'Active' | 'Suspended' | 'Pending' | 'Blocked'
  balance: number
  registeredDate: string
  kycStatus: 'Verified' | 'Pending' | 'Rejected'
}

const Users = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [isAddUserOpen, setIsAddUserOpen] = useState(false)
  const [isEditUserOpen, setIsEditUserOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [addFormData, setAddFormData] = useState({
    name: '',
    email: '',
    phone: '',
    accountType: '',
    status: 'Active',
    balance: ''
  })
  const [editFormData, setEditFormData] = useState({
    name: '',
    email: '',
    phone: '',
    accountType: '',
    status: '',
    balance: ''
  })

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1200)
    return () => clearTimeout(timer)
  }, [])

  // Mock "DB" in memory
  const [users, setUsers] = useState<User[]>([
    {
      id: 'USR001',
      name: 'John Smith',
      email: 'john.smith@example.com',
      phone: '+1 234 567 8900',
      accountType: 'Retail',
      status: 'Active',
      balance: 45231.89,
      registeredDate: '2024-01-15',
      kycStatus: 'Verified'
    },
    {
      id: 'USR002',
      name: 'Sarah Johnson',
      email: 'sarah.j@company.com',
      phone: '+1 234 567 8901',
      accountType: 'Institutional',
      status: 'Active',
      balance: 523450.0,
      registeredDate: '2024-01-20',
      kycStatus: 'Verified'
    },
    {
      id: 'USR003',
      name: 'Michael Chen',
      email: 'mchen@email.com',
      phone: '+1 234 567 8902',
      accountType: 'Retail',
      status: 'Pending',
      balance: 0,
      registeredDate: '2024-02-01',
      kycStatus: 'Pending'
    },
    {
      id: 'USR004',
      name: 'Emily Davis',
      email: 'emily.d@example.com',
      phone: '+1 234 567 8903',
      accountType: 'Retail',
      status: 'Active',
      balance: 12340.5,
      registeredDate: '2024-01-25',
      kycStatus: 'Verified'
    },
    {
      id: 'USR005',
      name: 'Robert Wilson',
      email: 'rwilson@company.com',
      phone: '+1 234 567 8904',
      accountType: 'Institutional',
      status: 'Suspended',
      balance: 89000.0,
      registeredDate: '2024-01-10',
      kycStatus: 'Verified'
    }
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'default'
      case 'Suspended':
        return 'secondary'
      case 'Pending':
        return 'outline'
      case 'Blocked':
        return 'destructive'
      default:
        return 'default'
    }
  }

  const getKycStatusIcon = (status: string) => {
    switch (status) {
      case 'Verified':
        return <CheckCircle className='h-4 w-4 text-green-500' />
      case 'Pending':
        return <AlertCircle className='h-4 w-4 text-orange-500' />
      case 'Rejected':
        return <Ban className='h-4 w-4 text-red-500' />
      default:
        return null
    }
  }

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.id.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Pagination
  const {
    currentItems: currentUsers,
    currentPage,
    totalPages,
    startIndex,
    endIndex,
    totalItems,
    goToPage,
    nextPage,
    previousPage,
    resetPage
  } = usePagination({ items: filteredUsers, itemsPerPage: 10 })

  // Reset to page 1 when search changes
  useEffect(() => {
    resetPage()
  }, [searchQuery, resetPage])

  if (isLoading) {
    return <PageSkeleton hasStats={false} />
  }

  const handleEditUser = (user: User) => {
    setSelectedUser(user)
    setEditFormData({
      name: user.name,
      email: user.email,
      phone: user.phone,
      accountType: user.accountType,
      status: user.status,
      balance: user.balance.toString()
    })
    setIsEditUserOpen(true)
  }

  const handleAddUser = () => {
    if (!addFormData.name.trim() || !addFormData.email.trim()) {
      return
    }

    const nextIdNumber = users.length + 1
    const newUser: User = {
      id: `USR${String(nextIdNumber).padStart(3, '0')}`,
      name: addFormData.name.trim(),
      email: addFormData.email.trim(),
      phone: addFormData.phone.trim(),
      accountType: (addFormData.accountType as User['accountType']) || 'Retail',
      status: (addFormData.status as User['status']) || 'Active',
      balance: Number(addFormData.balance || 0),
      registeredDate: new Date().toISOString().slice(0, 10),
      kycStatus: 'Pending'
    }

    setUsers((prev) => [newUser, ...prev])
    setAddFormData({
      name: '',
      email: '',
      phone: '',
      accountType: '',
      status: 'Active',
      balance: ''
    })
    setIsAddUserOpen(false)
  }

  const handleUpdateUser = () => {
    if (!selectedUser) {
      return
    }

    setUsers((prev) =>
      prev.map((user) =>
        user.id === selectedUser.id
          ? {
            ...user,
            name: editFormData.name.trim(),
            email: editFormData.email.trim(),
            phone: editFormData.phone.trim(),
            accountType: editFormData.accountType as User['accountType'],
            status: editFormData.status as User['status'],
            balance: Number(editFormData.balance || 0)
          }
          : user
      )
    )
    setIsEditUserOpen(false)
    setSelectedUser(null)
  }

  const handleDeleteUser = (userId: string) => {
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return
    }

    setUsers((prev) => prev.filter((user) => user.id !== userId))
  }

  const handleSuspendUser = (userId: string) => {
    if (!window.confirm('Suspend this account?')) {
      return
    }

    setUsers((prev) => prev.map((user) => (user.id === userId ? { ...user, status: 'Suspended' } : user)))
  }

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>Users Management</h1>
          <p className='text-muted-foreground'>Manage client accounts and user information</p>
        </div>
        <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className='mr-2 h-4 w-4' />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent className='sm:max-w-[425px]'>
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
              <DialogDescription>Create a new user account. Fill in the details below.</DialogDescription>
            </DialogHeader>
            <div className='grid gap-4 py-4'>
              <div className='grid gap-2'>
                <Label htmlFor='name'>Full Name</Label>
                <Input
                  id='name'
                  placeholder='John Doe'
                  value={addFormData.name}
                  onChange={(e) => setAddFormData({ ...addFormData, name: e.target.value })}
                />
              </div>
              <div className='grid gap-2'>
                <Label htmlFor='email'>Email</Label>
                <Input
                  id='email'
                  type='email'
                  placeholder='john@example.com'
                  value={addFormData.email}
                  onChange={(e) => setAddFormData({ ...addFormData, email: e.target.value })}
                />
              </div>
              <div className='grid gap-2'>
                <Label htmlFor='phone'>Phone</Label>
                <Input
                  id='phone'
                  placeholder='+1 234 567 8900'
                  value={addFormData.phone}
                  onChange={(e) => setAddFormData({ ...addFormData, phone: e.target.value })}
                />
              </div>
              <div className='grid gap-2'>
                <Label htmlFor='accountType'>Account Type</Label>
                <Select
                  value={addFormData.accountType}
                  onValueChange={(value) => setAddFormData({ ...addFormData, accountType: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder='Select account type' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='Retail'>Retail</SelectItem>
                    <SelectItem value='Institutional'>Institutional</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className='grid gap-2'>
                <Label htmlFor='status'>Status</Label>
                <Select
                  value={addFormData.status}
                  onValueChange={(value) => setAddFormData({ ...addFormData, status: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder='Select status' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='Active'>Active</SelectItem>
                    <SelectItem value='Pending'>Pending</SelectItem>
                    <SelectItem value='Suspended'>Suspended</SelectItem>
                    <SelectItem value='Blocked'>Blocked</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className='grid gap-2'>
                <Label htmlFor='balance'>Balance</Label>
                <Input
                  id='balance'
                  type='number'
                  placeholder='0.00'
                  value={addFormData.balance}
                  onChange={(e) => setAddFormData({ ...addFormData, balance: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant='outline' onClick={() => setIsAddUserOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddUser}>Create User</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className='grid gap-4 md:grid-cols-4'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Total Users</CardTitle>
            <UserPlus className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{users.length}</div>
            <p className='text-xs text-muted-foreground'>+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Active Users</CardTitle>
            <CheckCircle className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{users.filter((u) => u.status === 'Active').length}</div>
            <p className='text-xs text-muted-foreground'>+8% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Pending KYC</CardTitle>
            <AlertCircle className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{users.filter((u) => u.kycStatus === 'Pending').length}</div>
            <p className='text-xs text-muted-foreground'>Needs attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Total Balance</CardTitle>
            <Download className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>${users.reduce((acc, u) => acc + u.balance, 0).toLocaleString()}</div>
            <p className='text-xs text-muted-foreground'>Across all accounts</p>
          </CardContent>
        </Card>
      </div>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
            <div>
              <CardTitle>All Users</CardTitle>
              <CardDescription>A list of all users and their details</CardDescription>
            </div>
            <div className='relative w-full md:w-72'>
              <Search className='absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
              <Input
                placeholder='Search users...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='pl-8'
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className='overflow-x-auto'>
            <Table className='min-w-[980px]'>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Account Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>KYC</TableHead>
                  <TableHead>Balance</TableHead>
                  <TableHead>Registered</TableHead>
                  <TableHead className='text-right'>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className='flex items-center gap-3'>
                        <Avatar className='h-9 w-9'>
                          <AvatarImage src={`https://avatar.vercel.sh/${user.id}`} />
                          <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className='font-medium'>{user.name}</div>
                          <div className='text-xs text-muted-foreground'>{user.id}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className='space-y-1'>
                        <div className='flex items-center gap-1 text-sm'>
                          <Mail className='h-3 w-3' />
                          {user.email}
                        </div>
                        <div className='flex items-center gap-1 text-xs text-muted-foreground'>
                          <Phone className='h-3 w-3' />
                          {user.phone}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant='outline'>{user.accountType}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(user.status)}>{user.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className='flex items-center gap-2'>
                        {getKycStatusIcon(user.kycStatus)}
                        <span className='text-sm'>{user.kycStatus}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className='font-medium'>${user.balance.toLocaleString()}</div>
                    </TableCell>
                    <TableCell>
                      <div className='text-sm'>{user.registeredDate}</div>
                    </TableCell>
                    <TableCell className='text-right'>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant='ghost' size='icon'>
                            <MoreHorizontal className='h-4 w-4' />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align='end'>
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleEditUser(user)}>
                            <Edit className='mr-2 h-4 w-4' />
                            Edit User
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Mail className='mr-2 h-4 w-4' />
                            Send Email
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleSuspendUser(user.id)}>
                            <Ban className='mr-2 h-4 w-4' />
                            Suspend Account
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className='text-destructive' onClick={() => handleDeleteUser(user.id)}>
                            <Trash2 className='mr-2 h-4 w-4' />
                            Delete User
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            startIndex={startIndex}
            endIndex={endIndex}
            totalItems={totalItems}
            itemName='users'
            onPageChange={goToPage}
            onNext={nextPage}
            onPrevious={previousPage}
          />
        </CardContent>
      </Card>

      {/* Edit User Dialog */}
      <Dialog open={isEditUserOpen} onOpenChange={setIsEditUserOpen}>
        <DialogContent className='sm:max-w-[500px]'>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>
              Update user information for {selectedUser?.name} ({selectedUser?.id})
            </DialogDescription>
          </DialogHeader>
          <div className='grid gap-4 py-4'>
            <div className='grid gap-2'>
              <Label htmlFor='edit-name'>Full Name</Label>
              <Input
                id='edit-name'
                value={editFormData.name}
                onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                placeholder='John Doe'
              />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='edit-email'>Email</Label>
              <Input
                id='edit-email'
                type='email'
                value={editFormData.email}
                onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
                placeholder='john@example.com'
              />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='edit-phone'>Phone</Label>
              <Input
                id='edit-phone'
                value={editFormData.phone}
                onChange={(e) => setEditFormData({ ...editFormData, phone: e.target.value })}
                placeholder='+1 234 567 8900'
              />
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <div className='grid gap-2'>
                <Label htmlFor='edit-accountType'>Account Type</Label>
                <Select
                  value={editFormData.accountType}
                  onValueChange={(value) => setEditFormData({ ...editFormData, accountType: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder='Select account type' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='Retail'>Retail</SelectItem>
                    <SelectItem value='Institutional'>Institutional</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className='grid gap-2'>
                <Label htmlFor='edit-status'>Status</Label>
                <Select
                  value={editFormData.status}
                  onValueChange={(value) => setEditFormData({ ...editFormData, status: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder='Select status' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='Active'>Active</SelectItem>
                    <SelectItem value='Pending'>Pending</SelectItem>
                    <SelectItem value='Suspended'>Suspended</SelectItem>
                    <SelectItem value='Blocked'>Blocked</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='edit-balance'>Balance</Label>
              <Input
                id='edit-balance'
                type='number'
                value={editFormData.balance}
                onChange={(e) => setEditFormData({ ...editFormData, balance: e.target.value })}
                placeholder='0.00'
              />
            </div>
            <div className='rounded-lg border bg-muted/50 p-3'>
              <div className='space-y-1 text-sm'>
                <div className='flex justify-between'>
                  <span className='text-muted-foreground'>User ID:</span>
                  <span className='font-medium'>{selectedUser?.id}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-muted-foreground'>Registered:</span>
                  <span className='font-medium'>{selectedUser?.registeredDate}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-muted-foreground'>KYC Status:</span>
                  <div className='flex items-center gap-2'>
                    {selectedUser && getKycStatusIcon(selectedUser.kycStatus)}
                    <span className='font-medium'>{selectedUser?.kycStatus}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant='outline' onClick={() => setIsEditUserOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateUser}>
              <Edit className='mr-2 h-4 w-4' />
              Update User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Users
