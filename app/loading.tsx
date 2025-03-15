import { LotteryResultsSkeleton } from "@/components/ui/skeleton"

export default function HomeLoading() {
  return (
    <div className="max-w-[95%] sm:max-w-4xl mx-auto p-2 sm:p-4 py-4 sm:py-8 space-y-4 sm:space-y-8">
      <div className="bg-gradient-to-r from-blue-50 to-green-50 p-3 sm:p-4 rounded-xl shadow-sm">
        <LotteryResultsSkeleton />
      </div>
    </div>
  )
} 