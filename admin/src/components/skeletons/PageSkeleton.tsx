import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { StatsSkeleton } from './StatsSkeleton'
import { TableSkeleton } from './TableSkeleton'

interface PageSkeletonProps {
  hasStats?: boolean
  hasTable?: boolean
  statsCount?: number
}

export function PageSkeleton({ hasStats = true, hasTable = true, statsCount = 4 }: PageSkeletonProps) {
  return (
    <div className='space-y-6'>
      {/* Header Skeleton */}
      <div className='flex items-center justify-between'>
        <div>
          <Skeleton className='h-9 w-48 mb-2' />
          <Skeleton className='h-5 w-96' />
        </div>
        <Skeleton className='h-10 w-32' />
      </div>

      {/* Stats Cards Skeleton */}
      {hasStats && <StatsSkeleton count={statsCount} />}

      {/* Table Card Skeleton */}
      {hasTable && (
        <Card>
          <CardHeader className='flex flex-row items-center justify-between'>
            <div className='flex-1'>
              <Skeleton className='h-6 w-48 mb-2' />
              <Skeleton className='h-4 w-64' />
            </div>
            <Skeleton className='h-10 w-64' />
          </CardHeader>
          <CardContent>
            <TableSkeleton rows={10} columns={8} />
          </CardContent>
        </Card>
      )}
    </div>
  )
}
