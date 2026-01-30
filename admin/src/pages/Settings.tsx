import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  Settings as SettingsIcon,
  CreditCard,
  Shield,
  Bell,
  Globe,
  Database,
  Mail,
  CheckCircle,
  Save
} from 'lucide-react'
import { CardSkeleton } from '~/components/skeletons/CardSkeleton'
import { Skeleton } from '@/components/ui/skeleton'

const Settings = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [isSaved, setIsSaved] = useState(false)

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1200)
    return () => clearTimeout(timer)
  }, [])

  const handleSave = () => {
    setIsSaved(true)
    setTimeout(() => setIsSaved(false), 3000)
  }

  if (isLoading) {
    return (
      <div className='space-y-6'>
        <div className='flex items-center justify-between'>
          <div>
            <Skeleton className='h-9 w-48 mb-2' />
            <Skeleton className='h-5 w-96' />
          </div>
          <Skeleton className='h-10 w-32' />
        </div>
        <CardSkeleton />
        <CardSkeleton />
      </div>
    )
  }

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
        <div>
          <h1 className='text-2xl sm:text-3xl font-bold tracking-tight'>Settings</h1>
          <p className='text-sm sm:text-base text-muted-foreground'>
            Manage your platform configuration and preferences
          </p>
        </div>
        <Button onClick={handleSave} className='w-full sm:w-auto'>
          <Save className='mr-2 h-4 w-4' />
          Save Changes
        </Button>
      </div>

      {/* Success Alert */}
      {isSaved && (
        <Alert className='bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800'>
          <CheckCircle className='h-4 w-4 text-green-600 dark:text-green-400' />
          <AlertDescription className='text-green-800 dark:text-green-200'>
            Settings saved successfully!
          </AlertDescription>
        </Alert>
      )}

      {/* Settings Tabs */}
      <Tabs defaultValue='general' className='space-y-4'>
        {/* Tabs: use horizontal scroll on small screens (handled by Tabs component classes) */}
        <TabsList>
          <TabsTrigger value='general'>
            <SettingsIcon className='mr-2 h-4 w-4' />
            General
          </TabsTrigger>
          <TabsTrigger value='payment'>
            <CreditCard className='mr-2 h-4 w-4' />
            Payment Gateway
          </TabsTrigger>
          <TabsTrigger value='trading'>
            <Database className='mr-2 h-4 w-4' />
            Trading
          </TabsTrigger>
          <TabsTrigger value='security'>
            <Shield className='mr-2 h-4 w-4' />
            Security
          </TabsTrigger>
          <TabsTrigger value='notifications'>
            <Bell className='mr-2 h-4 w-4' />
            Notifications
          </TabsTrigger>
          <TabsTrigger value='email'>
            <Mail className='mr-2 h-4 w-4' />
            Email
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value='general' className='space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Configure basic platform settings</CardDescription>
            </CardHeader>
            <CardContent className='space-y-6'>
              <div className='space-y-2'>
                <Label htmlFor='platform-name'>Platform Name</Label>
                <Input id='platform-name' defaultValue='IC Markets Admin' />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='platform-url'>Platform URL</Label>
                <Input id='platform-url' defaultValue='https://admin.icmarkets.com' />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='timezone'>Timezone</Label>
                <Select defaultValue='utc'>
                  <SelectTrigger id='timezone'>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='utc'>UTC (GMT+0)</SelectItem>
                    <SelectItem value='est'>EST (GMT-5)</SelectItem>
                    <SelectItem value='pst'>PST (GMT-8)</SelectItem>
                    <SelectItem value='jst'>JST (GMT+9)</SelectItem>
                    <SelectItem value='aest'>AEST (GMT+10)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className='space-y-2'>
                <Label htmlFor='language'>Default Language</Label>
                <Select defaultValue='en'>
                  <SelectTrigger id='language'>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='en'>English</SelectItem>
                    <SelectItem value='vi'>Tiếng Việt</SelectItem>
                    <SelectItem value='zh'>中文</SelectItem>
                    <SelectItem value='ja'>日本語</SelectItem>
                    <SelectItem value='ko'>한국어</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div className='flex items-center justify-between'>
                <div className='space-y-0.5'>
                  <Label>Maintenance Mode</Label>
                  <p className='text-sm text-muted-foreground'>Enable maintenance mode to prevent user access</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payment Gateway Settings */}
        <TabsContent value='payment' className='space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle>Payment Gateway Configuration</CardTitle>
              <CardDescription>Configure payment methods and processing</CardDescription>
            </CardHeader>
            <CardContent className='space-y-6'>
              {/* Visa/Mastercard */}
              <div className='space-y-4 rounded-lg border p-4'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-3'>
                    <CreditCard className='h-5 w-5 text-blue-600' />
                    <div>
                      <p className='font-medium'>Credit/Debit Cards</p>
                      <p className='text-sm text-muted-foreground'>Visa, Mastercard, Amex</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='stripe-key'>Stripe API Key</Label>
                  <Input id='stripe-key' type='password' placeholder='sk_live_...' />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='card-fee'>Processing Fee (%)</Label>
                  <Input id='card-fee' type='number' defaultValue='0.0' />
                </div>
              </div>

              {/* PayPal */}
              <div className='space-y-4 rounded-lg border p-4'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-3'>
                    <Globe className='h-5 w-5 text-blue-500' />
                    <div>
                      <p className='font-medium'>PayPal</p>
                      <p className='text-sm text-muted-foreground'>PayPal payments</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='paypal-client'>PayPal Client ID</Label>
                  <Input id='paypal-client' placeholder='Client ID' />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='paypal-secret'>PayPal Secret</Label>
                  <Input id='paypal-secret' type='password' placeholder='Secret' />
                </div>
              </div>

              {/* Cryptocurrency */}
              <div className='space-y-4 rounded-lg border p-4'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-3'>
                    <Database className='h-5 w-5 text-orange-500' />
                    <div>
                      <p className='font-medium'>Cryptocurrency</p>
                      <p className='text-sm text-muted-foreground'>Bitcoin, Ethereum, USDT</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='crypto-provider'>Crypto Payment Provider</Label>
                  <Select defaultValue='coinbase'>
                    <SelectTrigger id='crypto-provider'>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='coinbase'>Coinbase Commerce</SelectItem>
                      <SelectItem value='binance'>Binance Pay</SelectItem>
                      <SelectItem value='coinpayments'>CoinPayments</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              <div className='flex items-center justify-between'>
                <div className='space-y-0.5'>
                  <Label>0% Commission Processing</Label>
                  <p className='text-sm text-muted-foreground'>Enable zero commission on deposits and withdrawals</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Trading Settings */}
        <TabsContent value='trading' className='space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle>Trading Configuration</CardTitle>
              <CardDescription>Configure trading parameters and limits</CardDescription>
            </CardHeader>
            <CardContent className='space-y-6'>
              <div className='space-y-2'>
                <Label htmlFor='max-leverage'>Maximum Leverage</Label>
                <Select defaultValue='500'>
                  <SelectTrigger id='max-leverage'>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='100'>1:100</SelectItem>
                    <SelectItem value='200'>1:200</SelectItem>
                    <SelectItem value='500'>1:500</SelectItem>
                    <SelectItem value='1000'>1:1000</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className='space-y-2'>
                <Label htmlFor='min-trade'>Minimum Trade Size (Lots)</Label>
                <Input id='min-trade' type='number' defaultValue='0.01' step='0.01' />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='max-trade'>Maximum Trade Size (Lots)</Label>
                <Input id='max-trade' type='number' defaultValue='100' />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='execution-time'>Target Execution Time (ms)</Label>
                <Input id='execution-time' type='number' defaultValue='66' />
                <p className='text-sm text-muted-foreground'>Current: &lt;66ms average</p>
              </div>

              <Separator />

              <div className='flex items-center justify-between'>
                <div className='space-y-0.5'>
                  <Label>Raw Spread Pricing</Label>
                  <p className='text-sm text-muted-foreground'>Enable 0.0 pips raw spread</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className='flex items-center justify-between'>
                <div className='space-y-0.5'>
                  <Label>Auto Close on Margin Call</Label>
                  <p className='text-sm text-muted-foreground'>
                    Automatically close positions when margin falls below threshold
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='margin-call'>Margin Call Level (%)</Label>
                <Input id='margin-call' type='number' defaultValue='50' />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='stop-out'>Stop Out Level (%)</Label>
                <Input id='stop-out' type='number' defaultValue='20' />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value='security' className='space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Configure security and authentication</CardDescription>
            </CardHeader>
            <CardContent className='space-y-6'>
              <div className='flex items-center justify-between'>
                <div className='space-y-0.5'>
                  <Label>Two-Factor Authentication (2FA)</Label>
                  <p className='text-sm text-muted-foreground'>Require 2FA for all admin users</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className='flex items-center justify-between'>
                <div className='space-y-0.5'>
                  <Label>Email Verification</Label>
                  <p className='text-sm text-muted-foreground'>Require email verification for new accounts</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className='flex items-center justify-between'>
                <div className='space-y-0.5'>
                  <Label>Phone Verification</Label>
                  <p className='text-sm text-muted-foreground'>Require phone verification for KYC</p>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator />

              <div className='space-y-2'>
                <Label htmlFor='session-timeout'>Session Timeout (minutes)</Label>
                <Input id='session-timeout' type='number' defaultValue='30' />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='password-policy'>Password Policy</Label>
                <Select defaultValue='strong'>
                  <SelectTrigger id='password-policy'>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='basic'>Basic (8+ characters)</SelectItem>
                    <SelectItem value='medium'>Medium (8+ chars, numbers)</SelectItem>
                    <SelectItem value='strong'>Strong (8+ chars, mixed case, numbers, symbols)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className='space-y-2'>
                <Label htmlFor='max-login'>Max Login Attempts</Label>
                <Input id='max-login' type='number' defaultValue='5' />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='lockout-duration'>Account Lockout Duration (minutes)</Label>
                <Input id='lockout-duration' type='number' defaultValue='15' />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Settings */}
        <TabsContent value='notifications' className='space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure system notifications and alerts</CardDescription>
            </CardHeader>
            <CardContent className='space-y-6'>
              <div className='flex items-center justify-between'>
                <div className='space-y-0.5'>
                  <Label>New User Registration</Label>
                  <p className='text-sm text-muted-foreground'>Notify admins of new user registrations</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className='flex items-center justify-between'>
                <div className='space-y-0.5'>
                  <Label>KYC Submission</Label>
                  <p className='text-sm text-muted-foreground'>Notify when users submit KYC documents</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className='flex items-center justify-between'>
                <div className='space-y-0.5'>
                  <Label>Large Transactions</Label>
                  <p className='text-sm text-muted-foreground'>Alert for transactions over threshold</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='transaction-threshold'>Transaction Alert Threshold (USD)</Label>
                <Input id='transaction-threshold' type='number' defaultValue='10000' />
              </div>

              <Separator />

              <div className='flex items-center justify-between'>
                <div className='space-y-0.5'>
                  <Label>System Errors</Label>
                  <p className='text-sm text-muted-foreground'>Notify admins of system errors</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className='flex items-center justify-between'>
                <div className='space-y-0.5'>
                  <Label>High Server Load</Label>
                  <p className='text-sm text-muted-foreground'>Alert when server load exceeds 80%</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className='flex items-center justify-between'>
                <div className='space-y-0.5'>
                  <Label>Support Tickets</Label>
                  <p className='text-sm text-muted-foreground'>Notify of new support tickets</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Email Settings */}
        <TabsContent value='email' className='space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle>Email Configuration</CardTitle>
              <CardDescription>Configure email service and templates</CardDescription>
            </CardHeader>
            <CardContent className='space-y-6'>
              <div className='space-y-2'>
                <Label htmlFor='smtp-host'>SMTP Host</Label>
                <Input id='smtp-host' placeholder='smtp.gmail.com' />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='smtp-port'>SMTP Port</Label>
                <Input id='smtp-port' type='number' defaultValue='587' />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='smtp-user'>SMTP Username</Label>
                <Input id='smtp-user' placeholder='admin@icmarkets.com' />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='smtp-password'>SMTP Password</Label>
                <Input id='smtp-password' type='password' />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='from-email'>From Email Address</Label>
                <Input id='from-email' defaultValue='noreply@icmarkets.com' />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='from-name'>From Name</Label>
                <Input id='from-name' defaultValue='IC Markets' />
              </div>

              <Separator />

              <div className='flex items-center justify-between'>
                <div className='space-y-0.5'>
                  <Label>Welcome Email</Label>
                  <p className='text-sm text-muted-foreground'>Send welcome email to new users</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className='flex items-center justify-between'>
                <div className='space-y-0.5'>
                  <Label>Transaction Confirmations</Label>
                  <p className='text-sm text-muted-foreground'>Send email confirmation for deposits/withdrawals</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className='flex items-center justify-between'>
                <div className='space-y-0.5'>
                  <Label>Weekly Reports</Label>
                  <p className='text-sm text-muted-foreground'>Send weekly trading reports to users</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Settings
