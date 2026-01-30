import { useState, useMemo } from 'react'

interface UsePaginationProps<T> {
  items: T[]
  itemsPerPage?: number
}

export function usePagination<T>({ items, itemsPerPage = 10 }: UsePaginationProps<T>) {
  const [currentPage, setCurrentPage] = useState(1)

  const pagination = useMemo(() => {
    const totalPages = Math.ceil(items.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const currentItems = items.slice(startIndex, endIndex)

    return {
      currentItems,
      currentPage,
      totalPages,
      startIndex,
      endIndex,
      totalItems: items.length,
      hasNextPage: currentPage < totalPages,
      hasPreviousPage: currentPage > 1
    }
  }, [items, currentPage, itemsPerPage])

  const goToPage = (page: number) => {
    if (page >= 1 && page <= pagination.totalPages) {
      setCurrentPage(page)
    }
  }

  const nextPage = () => {
    if (pagination.hasNextPage) {
      setCurrentPage((prev) => prev + 1)
    }
  }

  const previousPage = () => {
    if (pagination.hasPreviousPage) {
      setCurrentPage((prev) => prev - 1)
    }
  }

  const resetPage = () => {
    setCurrentPage(1)
  }

  return {
    ...pagination,
    goToPage,
    nextPage,
    previousPage,
    resetPage
  }
}
