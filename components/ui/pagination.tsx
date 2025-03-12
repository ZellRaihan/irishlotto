import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface PaginationProps {
  currentPage: number
  totalPages: number
  baseUrl: string
  className?: string
}

export function Pagination({ currentPage, totalPages, baseUrl, className }: PaginationProps) {
  // Don't render pagination if there's only one page
  if (totalPages <= 1) {
    return null
  }

  // Generate page numbers to display
  const generatePageNumbers = () => {
    const pages = []
    
    // Always show first page
    pages.push(1)
    
    // Calculate range of pages to show around current page
    let rangeStart = Math.max(2, currentPage - 1)
    let rangeEnd = Math.min(totalPages - 1, currentPage + 1)
    
    // Adjust range to always show 3 pages if possible
    if (rangeEnd - rangeStart < 2 && totalPages > 3) {
      if (rangeStart === 2) {
        rangeEnd = Math.min(4, totalPages - 1)
      } else if (rangeEnd === totalPages - 1) {
        rangeStart = Math.max(2, totalPages - 3)
      }
    }
    
    // Add ellipsis before range if needed
    if (rangeStart > 2) {
      pages.push('ellipsis-start')
    }
    
    // Add range pages
    for (let i = rangeStart; i <= rangeEnd; i++) {
      pages.push(i)
    }
    
    // Add ellipsis after range if needed
    if (rangeEnd < totalPages - 1) {
      pages.push('ellipsis-end')
    }
    
    // Always show last page if there's more than one page
    if (totalPages > 1) {
      pages.push(totalPages)
    }
    
    return pages
  }

  const pages = generatePageNumbers()

  return (
    <nav className={cn("flex justify-center items-center space-x-2", className)} aria-label="Pagination">
      {/* Previous page button */}
      {currentPage > 1 ? (
        <Button
          variant="outline"
          size="sm"
          asChild
          className="hidden sm:flex"
        >
          <Link href={`${baseUrl}?page=${currentPage - 1}`} aria-label="Previous page">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </Link>
        </Button>
      ) : (
        <Button
          variant="outline"
          size="sm"
          disabled
          className="hidden sm:flex"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Previous
        </Button>
      )}

      {/* Mobile previous button */}
      {currentPage > 1 ? (
        <Button
          variant="outline"
          size="icon"
          asChild
          className="sm:hidden"
        >
          <Link href={`${baseUrl}?page=${currentPage - 1}`} aria-label="Previous page">
            <ChevronLeft className="h-4 w-4" />
          </Link>
        </Button>
      ) : (
        <Button
          variant="outline"
          size="icon"
          disabled
          className="sm:hidden"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      )}

      {/* Page numbers */}
      <div className="flex space-x-1">
        {pages.map((page, i) => {
          if (page === 'ellipsis-start' || page === 'ellipsis-end') {
            return (
              <Button
                key={`ellipsis-${i}`}
                variant="outline"
                size="icon"
                disabled
                className="w-9 h-9"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            )
          }

          const isCurrentPage = page === currentPage
          
          return (
            <Button
              key={page}
              variant={isCurrentPage ? "default" : "outline"}
              size="icon"
              className={cn(
                "w-9 h-9",
                isCurrentPage && "bg-blue-600 hover:bg-blue-700"
              )}
              asChild={!isCurrentPage}
              aria-current={isCurrentPage ? "page" : undefined}
            >
              {isCurrentPage ? (
                <span>{page}</span>
              ) : (
                <Link href={`${baseUrl}?page=${page}`}>
                  {page}
                </Link>
              )}
            </Button>
          )
        })}
      </div>

      {/* Next page button */}
      {currentPage < totalPages ? (
        <Button
          variant="outline"
          size="sm"
          asChild
          className="hidden sm:flex"
        >
          <Link href={`${baseUrl}?page=${currentPage + 1}`} aria-label="Next page">
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </Button>
      ) : (
        <Button
          variant="outline"
          size="sm"
          disabled
          className="hidden sm:flex"
        >
          Next
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      )}

      {/* Mobile next button */}
      {currentPage < totalPages ? (
        <Button
          variant="outline"
          size="icon"
          asChild
          className="sm:hidden"
        >
          <Link href={`${baseUrl}?page=${currentPage + 1}`} aria-label="Next page">
            <ChevronRight className="h-4 w-4" />
          </Link>
        </Button>
      ) : (
        <Button
          variant="outline"
          size="icon"
          disabled
          className="sm:hidden"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      )}
    </nav>
  )
} 