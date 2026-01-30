import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination'

interface PaginationControlsProps {
  currentPage: number
  totalPages: number
  startIndex: number
  endIndex: number
  totalItems: number
  itemName?: string
  onPageChange: (page: number) => void
  onNext: () => void
  onPrevious: () => void
}

export function PaginationControls({
  currentPage,
  totalPages,
  startIndex,
  endIndex,
  totalItems,
  itemName = 'items',
  onPageChange,
  onNext,
  onPrevious
}: PaginationControlsProps) {
  if (totalPages <= 1) return null

  return (
    <div className='mt-4 flex items-center justify-between'>
      <div className='text-sm text-muted-foreground'>
        Showing {startIndex + 1} to {Math.min(endIndex, totalItems)} of {totalItems} {itemName}
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href='#'
              onClick={(e) => {
                e.preventDefault()
                onPrevious()
              }}
              className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
            />
          </PaginationItem>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
            // Show first page, last page, current page, and pages around current
            if (page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
              return (
                <PaginationItem key={page}>
                  <PaginationLink
                    href='#'
                    onClick={(e) => {
                      e.preventDefault()
                      onPageChange(page)
                    }}
                    isActive={currentPage === page}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              )
            } else if (page === currentPage - 2 || page === currentPage + 2) {
              return (
                <PaginationItem key={page}>
                  <PaginationEllipsis />
                </PaginationItem>
              )
            }
            return null
          })}

          <PaginationItem>
            <PaginationNext
              href='#'
              onClick={(e) => {
                e.preventDefault()
                onNext()
              }}
              className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}
