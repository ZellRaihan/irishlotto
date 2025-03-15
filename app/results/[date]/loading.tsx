import { Skeleton } from "@/components/ui/skeleton"
import { format } from "date-fns"

export default function SingleDateResultsLoading() {
  // Use the current date for the skeleton UI
  const today = new Date()
  const formattedDate = format(today, "EEEE, MMMM d, yyyy")

  return (
    <div className="max-w-4xl mx-auto p-4 py-8 space-y-8 animate-in fade-in duration-300">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Skeleton className="h-4 w-10" />
        <span>/</span>
        <Skeleton className="h-4 w-16" />
        <span>/</span>
        <Skeleton className="h-4 w-24" />
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-2 text-center sm:text-left">
          <Skeleton className="h-10 w-64 sm:w-80" />
        </div>
        <Skeleton className="h-10 w-64 rounded-lg" />
      </div>

      {/* Results */}
      <div className="space-y-8">
        {/* Main Draw */}
        <div className="bg-white rounded-xl shadow-sm p-4 space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-6 w-32" />
            </div>
            <div className="text-right">
              <Skeleton className="h-4 w-24 mb-1" />
              <Skeleton className="h-6 w-32" />
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3 my-6">
            {Array(6).fill(0).map((_, i) => (
              <Skeleton key={i} className="h-12 w-12 rounded-full" />
            ))}
            <div className="flex items-center">
              <Skeleton className="h-4 w-8" />
              <Skeleton className="h-12 w-12 rounded-full ml-2" />
            </div>
          </div>

          <Skeleton className="h-4 w-full max-w-md mx-auto" />

          {/* Prize Breakdown */}
          <div className="mt-6 pt-4 border-t border-gray-100">
            <Skeleton className="h-6 w-40 mb-4" />
            <div className="space-y-2">
              {Array(3).fill(0).map((_, i) => (
                <div key={i} className="flex justify-between items-center">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-24" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Plus 1 */}
        <div className="bg-white rounded-xl shadow-sm p-4 space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-6 w-32" />
            </div>
            <div className="text-right">
              <Skeleton className="h-4 w-24 mb-1" />
              <Skeleton className="h-6 w-32" />
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3 my-6">
            {Array(6).fill(0).map((_, i) => (
              <Skeleton key={i} className="h-12 w-12 rounded-full" />
            ))}
            <div className="flex items-center">
              <Skeleton className="h-4 w-8" />
              <Skeleton className="h-12 w-12 rounded-full ml-2" />
            </div>
          </div>

          <Skeleton className="h-4 w-full max-w-md mx-auto" />
        </div>

        {/* Plus 2 */}
        <div className="bg-white rounded-xl shadow-sm p-4 space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-6 w-32" />
            </div>
            <div className="text-right">
              <Skeleton className="h-4 w-24 mb-1" />
              <Skeleton className="h-6 w-32" />
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3 my-6">
            {Array(6).fill(0).map((_, i) => (
              <Skeleton key={i} className="h-12 w-12 rounded-full" />
            ))}
            <div className="flex items-center">
              <Skeleton className="h-4 w-8" />
              <Skeleton className="h-12 w-12 rounded-full ml-2" />
            </div>
          </div>

          <Skeleton className="h-4 w-full max-w-md mx-auto" />
        </div>
      </div>

      {/* Raffle */}
      <div className="bg-white rounded-xl shadow-sm p-4 space-y-4">
        <Skeleton className="h-6 w-48 mb-2" />
        <div className="flex justify-between items-center">
          <Skeleton className="h-5 w-64" />
          <Skeleton className="h-5 w-32" />
        </div>
      </div>
    </div>
  )
} 