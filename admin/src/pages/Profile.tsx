import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  Key,
  Bell,
  Globe,
  Save,
  Upload,
  AlertCircle,
  CheckCircle,
  Activity
} from 'lucide-react'
import { CardSkeleton } from '~/components/skeletons/CardSkeleton'
import { Skeleton } from '@/components/ui/skeleton'

const Profile = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1200)
    return () => clearTimeout(timer)
  }, [])

  // Mock user data
  const [profileData, setProfileData] = useState({
    name: 'Admin User',
    email: 'admin@icmarkets.com',
    phone: '+1 234 567 8900',
    role: 'Super Administrator',
    department: 'Operations',
    location: 'New York, USA',
    timezone: 'America/New_York',
    language: 'English',
    joinDate: '2023-01-15'
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    tradeAlerts: true,
    kycAlerts: true,
    systemAlerts: true,
    weeklyReports: false
  })

  const handleSaveProfile = () => {
    // API call would go here
    console.log('Saving profile:', profileData)
    setShowSuccess(true)
    setIsEditing(false)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const handleChangePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('Passwords do not match!')
      return
    }
    // API call would go here
    console.log('Changing password')
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const recentActivity = [
    {
      action: 'Updated user status',
      user: 'John Smith',
      timestamp: '2024-02-10 14:30:00',
      type: 'user'
    },
    {
      action: 'Approved KYC document',
      user: 'Sarah Johnson',
      timestamp: '2024-02-10 13:15:00',
      type: 'kyc'
    },
    {
      action: 'Modified trading account',
      user: 'Account #1234567890',
      timestamp: '2024-02-10 11:45:00',
      type: 'account'
    },
    {
      action: 'Processed withdrawal',
      user: 'Transaction #TXN001',
      timestamp: '2024-02-10 10:20:00',
      type: 'transaction'
    }
  ]

  if (isLoading) {
    return (
      <div className='space-y-6'>
        <Skeleton className='h-9 w-48' />
        <div className='grid gap-6 md:grid-cols-3'>
          <CardSkeleton />
          <div className='md:col-span-2'>
            <CardSkeleton />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>Profile Settings</h1>
        <p className='text-muted-foreground'>Manage your account settings and preferences</p>
      </div>

      {/* Success Alert */}
      {showSuccess && (
        <Alert className='border-green-500 bg-green-50 dark:bg-green-950'>
          <CheckCircle className='h-4 w-4 text-green-600' />
          <AlertDescription className='text-green-600'>Your changes have been saved successfully!</AlertDescription>
        </Alert>
      )}

      <div className='grid gap-6 md:grid-cols-3'>
        {/* Profile Card */}
        <Card className='md:col-span-1'>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
          </CardHeader>
          <CardContent className='space-y-6'>
            <div className='flex flex-col items-center space-y-4'>
              <Avatar className='h-32 w-32'>
                <AvatarImage src='https://github.com/shadcn.png' />
                <AvatarFallback>AU</AvatarFallback>
              </Avatar>
              <Button variant='outline' size='sm'>
                <Upload className='mr-2 h-4 w-4' />
                Change Photo
              </Button>
            </div>

            <Separator />

            <div className='space-y-4'>
              <div className='flex items-center gap-3'>
                <User className='h-4 w-4 text-muted-foreground' />
                <div>
                  <p className='text-sm font-medium'>{profileData.name}</p>
                  <p className='text-xs text-muted-foreground'>{profileData.role}</p>
                </div>
              </div>

              <div className='flex items-center gap-3'>
                <Mail className='h-4 w-4 text-muted-foreground' />
                <div>
                  <p className='text-sm'>{profileData.email}</p>
                </div>
              </div>

              <div className='flex items-center gap-3'>
                <Phone className='h-4 w-4 text-muted-foreground' />
                <div>
                  <p className='text-sm'>{profileData.phone}</p>
                </div>
              </div>

              <div className='flex items-center gap-3'>
                <MapPin className='h-4 w-4 text-muted-foreground' />
                <div>
                  <p className='text-sm'>{profileData.location}</p>
                </div>
              </div>

              <div className='flex items-center gap-3'>
                <Calendar className='h-4 w-4 text-muted-foreground' />
                <div>
                  <p className='text-xs text-muted-foreground'>Member since {profileData.joinDate}</p>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <Badge variant='outline' className='w-full justify-center'>
                <Shield className='mr-2 h-3 w-3' />
                Administrator Access
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className='md:col-span-2'>
          <Tabs defaultValue='general' className='space-y-4'>
            <TabsList className='grid w-full grid-cols-4'>
              <TabsTrigger value='general'>General</TabsTrigger>
              <TabsTrigger value='security'>Security</TabsTrigger>
              <TabsTrigger value='notifications'>Notifications</TabsTrigger>
              <TabsTrigger value='activity'>Activity</TabsTrigger>
            </TabsList>

            {/* General Tab */}
            <TabsContent value='general' className='space-y-4'>
              <Card>
                <CardHeader>
                  <CardTitle>General Information</CardTitle>
                  <CardDescription>Update your personal and contact information</CardDescription>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <div className='grid gap-4 md:grid-cols-2'>
                    <div className='space-y-2'>
                      <Label htmlFor='name'>Full Name</Label>
                      <Input
                        id='name'
                        value={profileData.name}
                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className='space-y-2'>
                      <Label htmlFor='email'>Email</Label>
                      <Input
                        id='email'
                        type='email'
                        value={profileData.email}
                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div className='grid gap-4 md:grid-cols-2'>
                    <div className='space-y-2'>
                      <Label htmlFor='phone'>Phone Number</Label>
                      <Input
                        id='phone'
                        value={profileData.phone}
                        onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className='space-y-2'>
                      <Label htmlFor='location'>Location</Label>
                      <Input
                        id='location'
                        value={profileData.location}
                        onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div className='grid gap-4 md:grid-cols-2'>
                    <div className='space-y-2'>
                      <Label htmlFor='department'>Department</Label>
                      <Input
                        id='department'
                        value={profileData.department}
                        onChange={(e) => setProfileData({ ...profileData, department: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className='space-y-2'>
                      <Label htmlFor='role'>Role</Label>
                      <Input id='role' value={profileData.role} disabled />
                    </div>
                  </div>

                  <Separator />

                  <div className='grid gap-4 md:grid-cols-2'>
                    <div className='space-y-2'>
                      <Label htmlFor='timezone'>Timezone</Label>
                      <Select
                        value={profileData.timezone}
                        onValueChange={(value) => setProfileData({ ...profileData, timezone: value })}
                        disabled={!isEditing}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='America/New_York'>Eastern Time (ET)</SelectItem>
                          <SelectItem value='America/Chicago'>Central Time (CT)</SelectItem>
                          <SelectItem value='America/Los_Angeles'>Pacific Time (PT)</SelectItem>
                          <SelectItem value='Europe/London'>London (GMT)</SelectItem>
                          <SelectItem value='Asia/Tokyo'>Tokyo (JST)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className='space-y-2'>
                      <Label htmlFor='language'>Language</Label>
                      <Select
                        value={profileData.language}
                        onValueChange={(value) => setProfileData({ ...profileData, language: value })}
                        disabled={!isEditing}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='English'>English</SelectItem>
                          <SelectItem value='Spanish'>Spanish</SelectItem>
                          <SelectItem value='French'>French</SelectItem>
                          <SelectItem value='German'>German</SelectItem>
                          <SelectItem value='Japanese'>Japanese</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className='flex justify-end gap-2'>
                    {isEditing ? (
                      <>
                        <Button variant='outline' onClick={() => setIsEditing(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleSaveProfile}>
                          <Save className='mr-2 h-4 w-4' />
                          Save Changes
                        </Button>
                      </>
                    ) : (
                      <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value='security' className='space-y-4'>
              <Card>
                <CardHeader>
                  <CardTitle>Change Password</CardTitle>
                  <CardDescription>Update your password to keep your account secure</CardDescription>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <div className='space-y-2'>
                    <Label htmlFor='current-password'>Current Password</Label>
                    <Input
                      id='current-password'
                      type='password'
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='new-password'>New Password</Label>
                    <Input
                      id='new-password'
                      type='password'
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='confirm-password'>Confirm New Password</Label>
                    <Input
                      id='confirm-password'
                      type='password'
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                    />
                  </div>
                  <Alert>
                    <AlertCircle className='h-4 w-4' />
                    <AlertDescription>
                      Password must be at least 8 characters long and contain uppercase, lowercase, numbers, and special
                      characters.
                    </AlertDescription>
                  </Alert>
                  <div className='flex justify-end'>
                    <Button onClick={handleChangePassword}>
                      <Key className='mr-2 h-4 w-4' />
                      Update Password
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Two-Factor Authentication</CardTitle>
                  <CardDescription>Add an extra layer of security to your account</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className='flex items-center justify-between'>
                    <div>
                      <p className='text-sm font-medium'>2FA Status</p>
                      <p className='text-xs text-muted-foreground'>Two-factor authentication is currently disabled</p>
                    </div>
                    <Button variant='outline'>Enable 2FA</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value='notifications' className='space-y-4'>
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Choose what notifications you want to receive</CardDescription>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <div className='flex items-center justify-between'>
                    <div className='space-y-0.5'>
                      <div className='flex items-center gap-2'>
                        <Mail className='h-4 w-4' />
                        <Label>Email Notifications</Label>
                      </div>
                      <p className='text-xs text-muted-foreground'>Receive email updates about your account</p>
                    </div>
                    <Button
                      variant={notificationSettings.emailNotifications ? 'default' : 'outline'}
                      size='sm'
                      onClick={() =>
                        setNotificationSettings({
                          ...notificationSettings,
                          emailNotifications: !notificationSettings.emailNotifications
                        })
                      }
                    >
                      {notificationSettings.emailNotifications ? 'Enabled' : 'Disabled'}
                    </Button>
                  </div>

                  <Separator />

                  <div className='flex items-center justify-between'>
                    <div className='space-y-0.5'>
                      <div className='flex items-center gap-2'>
                        <Activity className='h-4 w-4' />
                        <Label>Trade Alerts</Label>
                      </div>
                      <p className='text-xs text-muted-foreground'>Get notified about important trade activities</p>
                    </div>
                    <Button
                      variant={notificationSettings.tradeAlerts ? 'default' : 'outline'}
                      size='sm'
                      onClick={() =>
                        setNotificationSettings({
                          ...notificationSettings,
                          tradeAlerts: !notificationSettings.tradeAlerts
                        })
                      }
                    >
                      {notificationSettings.tradeAlerts ? 'Enabled' : 'Disabled'}
                    </Button>
                  </div>

                  <Separator />

                  <div className='flex items-center justify-between'>
                    <div className='space-y-0.5'>
                      <div className='flex items-center gap-2'>
                        <Shield className='h-4 w-4' />
                        <Label>KYC Alerts</Label>
                      </div>
                      <p className='text-xs text-muted-foreground'>Notifications for new KYC submissions</p>
                    </div>
                    <Button
                      variant={notificationSettings.kycAlerts ? 'default' : 'outline'}
                      size='sm'
                      onClick={() =>
                        setNotificationSettings({
                          ...notificationSettings,
                          kycAlerts: !notificationSettings.kycAlerts
                        })
                      }
                    >
                      {notificationSettings.kycAlerts ? 'Enabled' : 'Disabled'}
                    </Button>
                  </div>

                  <Separator />

                  <div className='flex items-center justify-between'>
                    <div className='space-y-0.5'>
                      <div className='flex items-center gap-2'>
                        <Bell className='h-4 w-4' />
                        <Label>System Alerts</Label>
                      </div>
                      <p className='text-xs text-muted-foreground'>Critical system notifications and updates</p>
                    </div>
                    <Button
                      variant={notificationSettings.systemAlerts ? 'default' : 'outline'}
                      size='sm'
                      onClick={() =>
                        setNotificationSettings({
                          ...notificationSettings,
                          systemAlerts: !notificationSettings.systemAlerts
                        })
                      }
                    >
                      {notificationSettings.systemAlerts ? 'Enabled' : 'Disabled'}
                    </Button>
                  </div>

                  <Separator />

                  <div className='flex items-center justify-between'>
                    <div className='space-y-0.5'>
                      <div className='flex items-center gap-2'>
                        <Globe className='h-4 w-4' />
                        <Label>Weekly Reports</Label>
                      </div>
                      <p className='text-xs text-muted-foreground'>Receive weekly summary reports via email</p>
                    </div>
                    <Button
                      variant={notificationSettings.weeklyReports ? 'default' : 'outline'}
                      size='sm'
                      onClick={() =>
                        setNotificationSettings({
                          ...notificationSettings,
                          weeklyReports: !notificationSettings.weeklyReports
                        })
                      }
                    >
                      {notificationSettings.weeklyReports ? 'Enabled' : 'Disabled'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Activity Tab */}
            <TabsContent value='activity' className='space-y-4'>
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Your recent actions on the platform</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className='space-y-4'>
                    {recentActivity.map((activity, index) => (
                      <div key={index} className='flex gap-4'>
                        <div className='flex h-8 w-8 items-center justify-center rounded-full bg-muted'>
                          <Activity className='h-4 w-4' />
                        </div>
                        <div className='flex-1 space-y-1'>
                          <p className='text-sm font-medium'>{activity.action}</p>
                          <p className='text-xs text-muted-foreground'>{activity.user}</p>
                          <p className='text-xs text-muted-foreground'>{activity.timestamp}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default Profile
