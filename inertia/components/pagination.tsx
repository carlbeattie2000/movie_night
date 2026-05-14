import { Link } from '@adonisjs/inertia/react'
import { urlFor } from '~/client'

type RouteName = Parameters<typeof urlFor>[0]

interface PaginationProps {
  route: RouteName
  currentPage: number
  totalPages: number
  pageQueryName?: string
  query?: { [key: string]: any }
}

export default function Pagination({
  route,
  currentPage,
  totalPages,
  pageQueryName,
  query,
}: PaginationProps) {
  function isFirstPage() {
    return currentPage === 1
  }

  function isLastPage() {
    return currentPage === totalPages
  }

  function hasPrevious() {
    return !isFirstPage() && !isLastPage()
  }

  function hasNext() {
    return !isLastPage()
  }

  function buildPageQuery(direction: 'next' | 'previous'): { [key: string]: number } {
    if (pageQueryName) {
      return {
        [pageQueryName]: direction === 'next' ? currentPage + 1 : currentPage - 1,
      }
    }

    return {
      page: direction === 'next' ? currentPage + 1 : currentPage - 1,
    }
  }

  function buildUrl(direction: 'previous' | 'next') {
    return urlFor(route, {}, { qs: { ...query, ...buildPageQuery(direction) } })
  }

  return (
    <div className="flex items-center justify-center gap-3">
      {hasPrevious() && (
        <Link href={buildUrl('previous')}>
          <span className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-zinc-200 text-zinc-600 text-sm font-semibold hover:border-zinc-400 hover:text-zinc-900 transition-colors duration-150">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2.5"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Previous
          </span>
        </Link>
      )}

      <span className="text-zinc-400 text-sm">
        {currentPage} / {totalPages}
      </span>

      {hasNext() && (
        <Link href={buildUrl('next')}>
          <span className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-zinc-200 text-zinc-600 text-sm font-semibold hover:border-zinc-400 hover:text-zinc-900 transition-colors duration-150">
            Next
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2.5"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </Link>
      )}
    </div>
  )
}
