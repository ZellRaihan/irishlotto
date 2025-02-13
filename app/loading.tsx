export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Hero Section Skeleton */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 p-3 sm:p-4 rounded-xl shadow-sm animate-pulse">
        <div className="text-center space-y-4">
          <div className="space-y-2">
            <div className="h-10 w-64 bg-gray-200 rounded mx-auto" />
            <div className="h-6 w-48 bg-gray-200 rounded mx-auto" />
          </div>
          <div className="h-10 w-40 bg-gray-200 rounded mx-auto" />
        </div>
      </div>

      {/* Results Boxes Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl shadow-sm p-4 sm:p-6 space-y-6 animate-pulse">
            <div className="flex justify-between items-start">
              <div className="h-8 w-24 bg-gray-200 rounded" />
              <div className="space-y-1">
                <div className="h-4 w-16 bg-gray-200 rounded" />
                <div className="h-6 w-24 bg-gray-200 rounded" />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-2">
              {[...Array(6)].map((_, j) => (
                <div
                  key={j}
                  className="aspect-square rounded-full bg-gray-200"
                />
              ))}
            </div>
            <div className="flex items-center justify-center gap-3">
              <div className="h-4 w-12 bg-gray-200 rounded" />
              <div className="h-8 w-8 rounded-full bg-gray-200" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
