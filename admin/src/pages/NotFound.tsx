import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useNavigate } from 'react-router-dom'
import { Home, ArrowLeft, AlertTriangle } from 'lucide-react'

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <div className='flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4 dark:from-slate-950 dark:to-slate-900'>
      <Card className='w-full max-w-2xl shadow-2xl'>
        <CardContent className='p-8 md:p-12'>
          <div className='text-center'>
            {/* 404 Animation */}
            <div className='mb-8 flex items-center justify-center'>
              <div className='relative'>
                <div className='text-9xl font-bold text-slate-200 dark:text-slate-800'>404</div>
                <div className='absolute inset-0 flex items-center justify-center'>
                  <AlertTriangle className='h-16 w-16 text-orange-500 animate-pulse' />
                </div>
              </div>
            </div>

            {/* Title */}
            <h1 className='mb-4 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 md:text-4xl'>
              Page Not Found
            </h1>

            {/* Description */}
            <p className='mb-8 text-lg text-slate-600 dark:text-slate-400'>
              Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
            </p>

            {/* Suggestions */}
            <div className='mb-8 rounded-lg bg-slate-50 p-6 dark:bg-slate-900'>
              <h2 className='mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400'>
                You might want to:
              </h2>
              <ul className='space-y-2 text-left text-slate-700 dark:text-slate-300'>
                <li className='flex items-start gap-2'>
                  <span className='mt-1 text-orange-500'>•</span>
                  <span>Check the URL for typos</span>
                </li>
                <li className='flex items-start gap-2'>
                  <span className='mt-1 text-orange-500'>•</span>
                  <span>Go back to the previous page</span>
                </li>
                <li className='flex items-start gap-2'>
                  <span className='mt-1 text-orange-500'>•</span>
                  <span>Visit the dashboard to find what you need</span>
                </li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className='flex flex-col gap-3 sm:flex-row sm:justify-center'>
              <Button size='lg' onClick={() => navigate(-1)} variant='outline' className='gap-2'>
                <ArrowLeft className='h-4 w-4' />
                Go Back
              </Button>
              <Button size='lg' onClick={() => navigate('/')} className='gap-2'>
                <Home className='h-4 w-4' />
                Go to Dashboard
              </Button>
            </div>

            {/* Additional Help */}
            <div className='mt-8 border-t border-slate-200 pt-6 dark:border-slate-700'>
              <p className='text-sm text-slate-500 dark:text-slate-400'>
                Need help? Contact our{' '}
                <button
                  onClick={() => navigate('/support')}
                  className='font-medium text-orange-600 hover:text-orange-700 hover:underline dark:text-orange-500'
                >
                  support team
                </button>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default NotFound
