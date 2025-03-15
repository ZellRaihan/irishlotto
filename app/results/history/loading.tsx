import { ResultsHistorySkeleton } from "@/components/ui/skeleton"

export default function ResultsHistoryLoading() {
  return (
    <div className="max-w-[95%] sm:max-w-4xl mx-auto p-2 sm:p-4 py-4 sm:py-8">
      <div className="bg-white p-3 sm:p-6 rounded-xl shadow-sm">
        <ResultsHistorySkeleton />
      </div>
    </div>
  )
} 