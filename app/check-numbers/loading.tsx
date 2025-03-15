import { Skeleton } from "@/components/ui/skeleton"

export default function CheckNumbersLoading() {
  return (
    <div className="max-w-[95%] sm:max-w-4xl mx-auto p-2 sm:p-4 py-4 sm:py-8">
      <div className="bg-white p-3 sm:p-6 rounded-xl shadow-sm">
        <div className="space-y-6">
          {/* Header */}
          <div className="space-y-2 text-center">
            <Skeleton className="h-8 w-3/4 mx-auto" />
            <Skeleton className="h-4 w-1/2 mx-auto" />
          </div>
          
          {/* Form */}
          <div className="max-w-md mx-auto space-y-4">
            <div className="space-y-2">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-10 w-full" />
            </div>
            
            <div className="space-y-2">
              <Skeleton className="h-5 w-40" />
              <div className="grid grid-cols-6 gap-2">
                {[...Array(6)].map((_, i) => (
                  <Skeleton key={i} className="w-full h-10 rounded-md" />
                ))}
              </div>
            </div>
            
            <Skeleton className="h-10 w-full" variant="button" />
          </div>
          
          {/* Results Placeholder */}
          <div className="mt-8 border-t border-gray-100 pt-6">
            <div className="text-center">
              <Skeleton className="h-6 w-48 mx-auto" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 