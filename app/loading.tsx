export default function Loading() {
  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="space-y-4 text-center">
        <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
        <div className="text-gray-600 font-medium">Loading...</div>
      </div>
    </div>
  )
}
