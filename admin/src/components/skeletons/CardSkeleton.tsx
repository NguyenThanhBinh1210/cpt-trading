import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

export function CardSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className='h-5 w-1/3' />
        <Skeleton className='h-4 w-1/2 mt-2' />
      </CardHeader>
      <CardContent>
        <Skeleton className='h-20 w-full' />
      </CardContent>
    </Card>
  )
}
