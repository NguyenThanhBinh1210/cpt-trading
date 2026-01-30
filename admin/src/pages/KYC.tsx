import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { CheckCircle, XCircle, Clock, AlertCircle, Search, FileText, Download, Eye, CheckCheck, X } from 'lucide-react'
import { useState, useEffect } from 'react'
import { PageSkeleton } from '~/components/skeletons/PageSkeleton'

interface KYCApplication {
  id: string
  userId: string
  userName: string
  email: string
  phone: string
  nationality: string
  documentType: 'Passport' | 'ID Card' | 'Drivers License'
  documentNumber: string
  documentFront: string
  documentBack?: string
  selfie: string
  addressProof: string
  status: 'Pending' | 'Under Review' | 'Approved' | 'Rejected' | 'Resubmission Required'
  submittedDate: string
  reviewedDate?: string
  reviewedBy?: string
  rejectionReason?: string
  riskLevel: 'Low' | 'Medium' | 'High'
}

const KYC = () => {
  const [isLoading, setIsLoading] = useState(true)

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1200)
    return () => clearTimeout(timer)
  }, [])

  const applications: KYCApplication[] = [
    {
      id: 'KYC001',
      userId: 'USR003',
      userName: 'Michael Chen',
      email: 'mchen@email.com',
      phone: '+1 234 567 8902',
      nationality: 'United States',
      documentType: 'Passport',
      documentNumber: 'P1234567',
      documentFront: '/docs/passport-front.jpg',
      documentBack: '/docs/passport-back.jpg',
      selfie: '/docs/selfie.jpg',
      addressProof: '/docs/utility-bill.pdf',
      status: 'Pending',
      submittedDate: '2024-02-10 09:30:00',
      riskLevel: 'Low'
    },
    {
      id: 'KYC002',
      userId: 'USR006',
      userName: 'Jessica Brown',
      email: 'jbrown@email.com',
      phone: '+1 234 567 8905',
      nationality: 'Canada',
      documentType: 'ID Card',
      documentNumber: 'ID987654',
      documentFront: '/docs/id-front.jpg',
      documentBack: '/docs/id-back.jpg',
      selfie: '/docs/selfie2.jpg',
      addressProof: '/docs/bank-statement.pdf',
      status: 'Under Review',
      submittedDate: '2024-02-09 14:20:00',
      riskLevel: 'Low'
    },
    {
      id: 'KYC003',
      userId: 'USR007',
      userName: 'David Martinez',
      email: 'dmartinez@email.com',
      phone: '+1 234 567 8906',
      nationality: 'Mexico',
      documentType: 'Passport',
      documentNumber: 'P7654321',
      documentFront: '/docs/passport3.jpg',
      selfie: '/docs/selfie3.jpg',
      addressProof: '/docs/address-proof.pdf',
      status: 'Approved',
      submittedDate: '2024-02-08 10:15:00',
      reviewedDate: '2024-02-09 11:30:00',
      reviewedBy: 'Admin User',
      riskLevel: 'Low'
    },
    {
      id: 'KYC004',
      userId: 'USR008',
      userName: 'Anna Kowalski',
      email: 'akowalski@email.com',
      phone: '+1 234 567 8907',
      nationality: 'Poland',
      documentType: 'Drivers License',
      documentNumber: 'DL123456',
      documentFront: '/docs/dl-front.jpg',
      documentBack: '/docs/dl-back.jpg',
      selfie: '/docs/selfie4.jpg',
      addressProof: '/docs/utility-bill2.pdf',
      status: 'Rejected',
      submittedDate: '2024-02-07 16:45:00',
      reviewedDate: '2024-02-08 09:00:00',
      reviewedBy: 'Admin User',
      rejectionReason: 'Document image quality is too low. Please resubmit clear photos.',
      riskLevel: 'Medium'
    },
    {
      id: 'KYC005',
      userId: 'USR009',
      userName: 'Ahmed Hassan',
      email: 'ahassan@email.com',
      phone: '+1 234 567 8908',
      nationality: 'Egypt',
      documentType: 'Passport',
      documentNumber: 'P5555555',
      documentFront: '/docs/passport5.jpg',
      selfie: '/docs/selfie5.jpg',
      addressProof: '/docs/proof.pdf',
      status: 'Resubmission Required',
      submittedDate: '2024-02-06 12:00:00',
      reviewedDate: '2024-02-07 14:30:00',
      reviewedBy: 'Admin User',
      rejectionReason: 'Address proof document is expired. Please provide a recent document.',
      riskLevel: 'High'
    }
  ]

  const pending = applications.filter((a) => a.status === 'Pending')
  const underReview = applications.filter((a) => a.status === 'Under Review')
  const approved = applications.filter((a) => a.status === 'Approved')
  const rejected = applications.filter((a) => a.status === 'Rejected')

  if (isLoading) {
    return <PageSkeleton hasStats={true} statsCount={4} />
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved':
        return 'default'
      case 'Under Review':
        return 'secondary'
      case 'Pending':
        return 'outline'
      case 'Rejected':
        return 'destructive'
      case 'Resubmission Required':
        return 'destructive'
      default:
        return 'default'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Approved':
        return <CheckCircle className='h-4 w-4 text-green-500' />
      case 'Under Review':
        return <Clock className='h-4 w-4 text-blue-500' />
      case 'Pending':
        return <AlertCircle className='h-4 w-4 text-orange-500' />
      case 'Rejected':
      case 'Resubmission Required':
        return <XCircle className='h-4 w-4 text-red-500' />
      default:
        return null
    }
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low':
        return 'default'
      case 'Medium':
        return 'secondary'
      case 'High':
        return 'destructive'
      default:
        return 'default'
    }
  }

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>KYC Verification</h1>
          <p className='text-muted-foreground'>Review and manage Know Your Customer verification applications</p>
        </div>
        <Button>
          <Download className='mr-2 h-4 w-4' />
          Export Report
        </Button>
      </div>

      {/* Stats Cards */}
      <div className='grid gap-4 md:grid-cols-5'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Total Applications</CardTitle>
            <FileText className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{applications.length}</div>
            <p className='text-xs text-muted-foreground'>All time</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Pending</CardTitle>
            <AlertCircle className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold text-orange-500'>{pending.length}</div>
            <p className='text-xs text-muted-foreground'>Needs action</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Under Review</CardTitle>
            <Clock className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold text-blue-500'>{underReview.length}</div>
            <p className='text-xs text-muted-foreground'>In progress</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Approved</CardTitle>
            <CheckCircle className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold text-green-500'>{approved.length}</div>
            <p className='text-xs text-muted-foreground'>Verified users</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Rejected</CardTitle>
            <XCircle className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold text-red-500'>{rejected.length}</div>
            <p className='text-xs text-muted-foreground'>Failed verification</p>
          </CardContent>
        </Card>
      </div>

      {/* Alert for pending reviews */}
      {pending.length > 0 && (
        <Alert>
          <AlertCircle className='h-4 w-4' />
          <AlertDescription>
            You have {pending.length} pending KYC {pending.length === 1 ? 'application' : 'applications'} awaiting
            review. Please review them as soon as possible.
          </AlertDescription>
        </Alert>
      )}

      {/* Applications Table */}
      <Tabs defaultValue='pending' className='space-y-4'>
        <div className='flex items-center justify-between'>
          <TabsList>
            <TabsTrigger value='pending'>
              Pending <Badge className='ml-2'>{pending.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value='review'>
              Under Review <Badge className='ml-2'>{underReview.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value='approved'>Approved</TabsTrigger>
            <TabsTrigger value='rejected'>Rejected</TabsTrigger>
            <TabsTrigger value='all'>All</TabsTrigger>
          </TabsList>
          <div className='relative w-64'>
            <Search className='absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
            <Input placeholder='Search applications...' className='pl-8' />
          </div>
        </div>

        <TabsContent value='pending' className='space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle>Pending Applications</CardTitle>
              <CardDescription>New KYC applications awaiting initial review</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Applicant</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Document Type</TableHead>
                    <TableHead>Document Number</TableHead>
                    <TableHead>Risk Level</TableHead>
                    <TableHead>Submitted Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pending.map((application) => (
                    <TableRow key={application.id}>
                      <TableCell>
                        <div className='flex items-center gap-3'>
                          <Avatar className='h-9 w-9'>
                            <AvatarImage src={`https://avatar.vercel.sh/${application.userId}`} />
                            <AvatarFallback>{application.userName.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className='font-medium'>{application.userName}</div>
                            <div className='text-xs text-muted-foreground'>{application.nationality}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className='space-y-1 text-sm'>
                          <div>{application.email}</div>
                          <div className='text-muted-foreground'>{application.phone}</div>
                        </div>
                      </TableCell>
                      <TableCell>{application.documentType}</TableCell>
                      <TableCell>
                        <code className='rounded bg-muted px-2 py-1 text-xs'>{application.documentNumber}</code>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getRiskColor(application.riskLevel)}>{application.riskLevel}</Badge>
                      </TableCell>
                      <TableCell className='text-sm'>{application.submittedDate}</TableCell>
                      <TableCell>
                        <div className='flex gap-2'>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button size='sm' variant='outline'>
                                <Eye className='mr-1 h-3 w-3' />
                                Review
                              </Button>
                            </DialogTrigger>
                            <DialogContent className='max-w-2xl'>
                              <DialogHeader>
                                <DialogTitle>KYC Application Review</DialogTitle>
                                <DialogDescription>
                                  Review the submitted documents and verify user identity
                                </DialogDescription>
                              </DialogHeader>
                              <div className='space-y-4'>
                                <div className='grid gap-4 md:grid-cols-2'>
                                  <div>
                                    <h4 className='mb-2 text-sm font-semibold'>Personal Information</h4>
                                    <div className='space-y-1 text-sm'>
                                      <div>
                                        <span className='text-muted-foreground'>Name: </span>
                                        {application.userName}
                                      </div>
                                      <div>
                                        <span className='text-muted-foreground'>Email: </span>
                                        {application.email}
                                      </div>
                                      <div>
                                        <span className='text-muted-foreground'>Phone: </span>
                                        {application.phone}
                                      </div>
                                      <div>
                                        <span className='text-muted-foreground'>Nationality: </span>
                                        {application.nationality}
                                      </div>
                                    </div>
                                  </div>
                                  <div>
                                    <h4 className='mb-2 text-sm font-semibold'>Document Information</h4>
                                    <div className='space-y-1 text-sm'>
                                      <div>
                                        <span className='text-muted-foreground'>Type: </span>
                                        {application.documentType}
                                      </div>
                                      <div>
                                        <span className='text-muted-foreground'>Number: </span>
                                        {application.documentNumber}
                                      </div>
                                      <div>
                                        <span className='text-muted-foreground'>Risk Level: </span>
                                        <Badge variant={getRiskColor(application.riskLevel)}>
                                          {application.riskLevel}
                                        </Badge>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div>
                                  <h4 className='mb-2 text-sm font-semibold'>Documents</h4>
                                  <div className='grid gap-2 md:grid-cols-3'>
                                    <Button variant='outline' size='sm' className='justify-start'>
                                      <FileText className='mr-2 h-4 w-4' />
                                      Document Front
                                    </Button>
                                    {application.documentBack && (
                                      <Button variant='outline' size='sm' className='justify-start'>
                                        <FileText className='mr-2 h-4 w-4' />
                                        Document Back
                                      </Button>
                                    )}
                                    <Button variant='outline' size='sm' className='justify-start'>
                                      <FileText className='mr-2 h-4 w-4' />
                                      Selfie
                                    </Button>
                                    <Button variant='outline' size='sm' className='justify-start'>
                                      <FileText className='mr-2 h-4 w-4' />
                                      Address Proof
                                    </Button>
                                  </div>
                                </div>
                                <div className='flex justify-end gap-2'>
                                  <Button variant='destructive'>
                                    <X className='mr-2 h-4 w-4' />
                                    Reject
                                  </Button>
                                  <Button>
                                    <CheckCheck className='mr-2 h-4 w-4' />
                                    Approve
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='all' className='space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle>All Applications</CardTitle>
              <CardDescription>Complete KYC application history</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Application ID</TableHead>
                    <TableHead>Applicant</TableHead>
                    <TableHead>Document Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Risk Level</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead>Reviewed</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {applications.map((application) => (
                    <TableRow key={application.id}>
                      <TableCell className='font-medium'>{application.id}</TableCell>
                      <TableCell>
                        <div className='flex items-center gap-3'>
                          <Avatar className='h-9 w-9'>
                            <AvatarImage src={`https://avatar.vercel.sh/${application.userId}`} />
                            <AvatarFallback>{application.userName.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className='font-medium'>{application.userName}</div>
                            <div className='text-xs text-muted-foreground'>{application.userId}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{application.documentType}</TableCell>
                      <TableCell>
                        <div className='flex items-center gap-2'>
                          {getStatusIcon(application.status)}
                          <Badge variant={getStatusColor(application.status)}>{application.status}</Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getRiskColor(application.riskLevel)}>{application.riskLevel}</Badge>
                      </TableCell>
                      <TableCell className='text-sm'>{application.submittedDate}</TableCell>
                      <TableCell className='text-sm'>{application.reviewedDate || '-'}</TableCell>
                      <TableCell>
                        <Button size='sm' variant='ghost'>
                          <Eye className='h-4 w-4' />
                        </Button>
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

export default KYC
