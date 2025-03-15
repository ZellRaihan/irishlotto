import { cn } from "@/lib/utils"

interface SkeletonProps {
  className?: string
  variant?: "default" | "circle" | "card" | "text" | "button"
}

export function Skeleton({
  className,
  variant = "default",
  ...props
}: SkeletonProps & React.HTMLAttributes<HTMLDivElement>) {
  const baseClasses = "animate-pulse bg-gray-200 rounded-md"
  
  const variantClasses = {
    default: "",
    circle: "rounded-full",
    card: "rounded-xl",
    text: "h-4",
    button: "h-10 rounded-lg"
  }
  
  return (
    <div
      className={cn(
        baseClasses,
        variantClasses[variant],
        className
      )}
      {...props}
    />
  )
}

export function LotteryResultsSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <Skeleton className="h-10 w-3/4 mx-auto" />
        <Skeleton className="h-6 w-1/2 mx-auto" />
      </div>
      
      {/* Results Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl shadow-sm overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-start justify-between">
                <Skeleton className="h-8 w-24" />
                <div className="text-right">
                  <Skeleton className="h-3 w-16 mb-2" />
                  <Skeleton className="h-5 w-20" />
                </div>
              </div>
            </div>
            
            {/* Numbers */}
            <div className="p-4 space-y-4">
              <div className="grid grid-cols-6 gap-2">
                {[...Array(6)].map((_, j) => (
                  <Skeleton key={j} className="w-9 h-9 rounded-full" />
                ))}
              </div>
              
              <div className="flex items-center justify-center gap-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="w-9 h-9 rounded-full" />
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Buttons */}
      <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 mt-4">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-10 w-full sm:w-40" variant="button" />
        ))}
      </div>
    </div>
  )
}

export function NumberGeneratorSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-3/4 mx-auto" />
        <Skeleton className="h-4 w-1/2 mx-auto" />
      </div>
      
      {/* Number Sets */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow-sm p-4 space-y-4">
            <div className="flex justify-between items-center">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-6 w-6 rounded-full" />
            </div>
            
            <div className="flex flex-wrap gap-2 justify-center">
              {[...Array(6)].map((_, j) => (
                <Skeleton key={j} className="w-10 h-10 rounded-full" />
              ))}
            </div>
            
            <Skeleton className="h-9 w-full" variant="button" />
          </div>
        ))}
      </div>
      
      {/* Generate Button */}
      <div className="flex justify-center">
        <Skeleton className="h-12 w-48" variant="button" />
      </div>
    </div>
  )
}

export function ResultsHistorySkeleton() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-1/2 mx-auto" />
        <Skeleton className="h-4 w-1/3 mx-auto" />
      </div>
      
      {/* Filter Controls */}
      <div className="flex flex-wrap gap-2 justify-center">
        <Skeleton className="h-10 w-32" variant="button" />
        <Skeleton className="h-10 w-32" variant="button" />
        <Skeleton className="h-10 w-32" variant="button" />
      </div>
      
      {/* Results Table */}
      <div className="overflow-x-auto">
        <div className="min-w-full">
          {/* Table Header */}
          <div className="bg-gray-50 p-3">
            <div className="grid grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-5 w-full" />
              ))}
            </div>
          </div>
          
          {/* Table Rows */}
          {[...Array(5)].map((_, i) => (
            <div key={i} className="border-b border-gray-100 p-3">
              <div className="grid grid-cols-4 gap-4">
                {[...Array(4)].map((_, j) => (
                  <Skeleton key={j} className="h-5 w-full" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Pagination */}
      <div className="flex justify-center gap-2">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-8 w-8 rounded-md" />
        ))}
      </div>
    </div>
  )
} 