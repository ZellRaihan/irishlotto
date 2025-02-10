import { Button } from "@/components/ui/button"
import { formatCurrency, formatDate } from "@/utils/formatters"
import { LotteryLogo } from "@/components/lottery-logo"
import LotteryDatePicker from "@/components/lottery-date-picker"
import Link from "next/link"
import clientPromise from "@/lib/mongodb"
import type { LotteryDraw } from "@/types/lottery"
import { WithId } from "mongodb"
import { Calendar, Calendar as CalendarIcon } from "lucide-react"

async function getLotteryResults(): Promise<WithId<LotteryDraw>[]> {
  try {
    const client = await clientPromise;
    const db = client.db("lottery");
    
    const results = await db
      .collection<LotteryDraw>("lottoresults")
      .find({})
      .sort({ drawDate: -1 })
      .limit(10)
      .toArray();

    return results;
  } catch (error) {
    console.error('Error fetching lottery results:', error);
    throw error;
  }
}

export default async function ArchivePage() {
  const results = await getLotteryResults();
  const latestResult = results[0];

  return (
    <div className="max-w-4xl mx-auto p-4 py-8 space-y-8">
      <div className="flex flex-col gap-4 sm:gap-6">
        <div className="space-y-2 text-center sm:text-left">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Past Lottery Results
          </h1>
          <h2 className="text-lg sm:text-xl text-gray-600 flex items-center justify-center sm:justify-start gap-2">
            <CalendarIcon className="w-5 h-5 text-blue-600" />
            Browse All Results
          </h2>
        </div>
        <div className="flex justify-center sm:justify-end">
          <div className="bg-white rounded-lg shadow-sm p-1.5 border border-gray-100">
            <LotteryDatePicker selected={new Date(latestResult.drawDate)} />
          </div>
        </div>
      </div>

      <div className="grid gap-4">
        {results.map((result) => (
          <div key={result._id} 
            className="bg-gradient-to-br from-white to-gray-50 p-5 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              {/* Left section: Date and Numbers */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4 text-blue-600" />
                  <h3 className="font-semibold text-gray-800">
                    {formatDate(result.drawDate)}
                  </h3>
                </div>
                
                <div className="space-y-3">
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-gray-600">Winning Numbers</div>
                    <div className="flex flex-wrap gap-2">
                      {result.mainDraw.winningNumbers.standard.map((number, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center justify-center w-8 h-8 text-sm font-bold rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-sm"
                        >
                          {number}
                        </span>
                      ))}
                      <div className="flex items-center">
                        <div className="h-px w-3 bg-gray-300" />
                        <span
                          className="inline-flex items-center justify-center w-8 h-8 text-sm font-bold rounded-full bg-gradient-to-br from-green-500 to-green-600 text-white shadow-sm"
                        >
                          {result.mainDraw.winningNumbers.bonus}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right section: Jackpot and Button */}
              <div className="flex flex-col gap-3 sm:items-end">
                <div className="space-y-1">
                  <div className="text-sm font-medium text-gray-600">Jackpot Prize</div>
                  <div className="text-lg font-bold text-gray-800">
                    {formatCurrency(result.mainDraw.jackpotAmount)}
                  </div>
                </div>
                <Link href={`/results/${result._id}`} passHref>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full sm:w-auto text-blue-600 hover:text-blue-700 hover:bg-blue-50 border-blue-200 hover:border-blue-300"
                  >
                    View Details
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
