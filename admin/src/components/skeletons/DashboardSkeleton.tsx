import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { StatsSkeleton } from './StatsSkeleton'

export function DashboardSkeleton() {
  return (
    <div className='space-y-6'>
      {/* Header Skeleton */}
      <div>
        <Skeleton className='h-9 w-48 mb-2' />
        <Skeleton className='h-5 w-96' />
      </div>

      {/* Stats Cards Skeleton */}
      <StatsSkeleton count={4} />

      {/* Charts Grid Skeleton */}
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-7'>
        <Card className='col-span-4'>
          <CardHeader>
            <Skeleton className='h-6 w-32' />
            <Skeleton className='h-4 w-48 mt-2' />
          </CardHeader>
          <CardContent>
            <Skeleton className='h-80 w-full' />
          </CardContent>
        </Card>
        <Card className='col-span-3'>
          <CardHeader>
            <Skeleton className='h-6 w-32' />
            <Skeleton className='h-4 w-48 mt-2' />
          </CardHeader>
          <CardContent>
            <Skeleton className='h-80 w-full' />
          </CardContent>
        </Card>
      </div>

      {/* Additional Cards */}
      <div className='grid gap-4 md:grid-cols-2'>
        <Card>
          <CardHeader>
            <Skeleton className='h-6 w-40' />
            <Skeleton className='h-4 w-56 mt-2' />
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className='flex items-center justify-between'>
                  <Skeleton className='h-4 w-24' />
                  <Skeleton className='h-4 w-16' />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Skeleton className='h-6 w-40' />
            <Skeleton className='h-4 w-56 mt-2' />
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className='flex items-center gap-3'>
                  <Skeleton className='h-10 w-10 rounded-full' />
                  <div className='flex-1'>
                    <Skeleton className='h-4 w-full mb-2' />
                    <Skeleton className='h-3 w-3/4' />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
