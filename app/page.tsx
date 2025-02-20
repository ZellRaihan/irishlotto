import { Button } from "@/components/ui/button"
import { formatCurrency, formatDublinDate } from "@/utils/formatters"
import { LotteryLogo } from "@/components/lottery-logo"
import LotteryDatePicker from "@/components/lottery-date-picker"
import Link from "next/link"
import clientPromise from "@/lib/mongodb"
import type { LotteryDraw } from "@/types/lottery"
import { WithId } from "mongodb"
import { differenceInDays, addDays, isSaturday, isWednesday, nextWednesday, nextSaturday, format } from "date-fns"
import { Timer, Calendar } from "lucide-react"
import { Metadata } from "next"
import { constructMetadata } from "./seo.config"
import Image from 'next/image';
import clsx from 'clsx';
import HomeFAQ from '@/components/home-faq';

export const metadata: Metadata = constructMetadata({
  title: "Irish Lotto Results Tonight | Latest Numbers & Prize Breakdown",
  description: "Latest Irish Lotto results for tonight's draw. Check winning numbers and prizes for all 3 draws - Main Draw, Lotto Plus 1, and Lotto Plus 2.",
  type: "website",
  keywords: [
    "Irish Lotto Results Tonight",
    "Irish Lotto Numbers",
    "Irish Lotto Winning Numbers",
    "Irish Lotto Prize Breakdown",
    "Irish Lotto Results Today"
  ]
})

// Force SSR
export const dynamic = 'force-dynamic'
export const revalidate = 0

async function getLotteryResults(): Promise<{
  latest: WithId<LotteryDraw>;
  pastResults: WithId<LotteryDraw>[];
}> {
  try {
    const client = await clientPromise;
    const db = client.db("lottery");

    // Add cache-busting timestamp to force fresh data
    const currentTimestamp = new Date().getTime();

    // Get latest result
    const latestResult = await db
      .collection<LotteryDraw>("lottoresults")
      .find({})
      .sort({ drawDate: -1 })
      .limit(1)
      .toArray();

    // Get past 3 results excluding the latest
    const pastResults = await db
      .collection<LotteryDraw>("lottoresults")
      .find({
        _id: { $ne: latestResult[0]._id }
      })
      .sort({ drawDate: -1 })
      .limit(3)
      .toArray();

    return {
      latest: latestResult[0],
      pastResults
    };
  } catch (error) {
    console.error('Error fetching lottery results:', error);
    throw error;
  }
}

function getNextDrawDate(lastDrawDate: Date): Date {
  // Always use the lastDrawDate as the base for calculating next draw

  // If last draw was Wednesday, next draw is Saturday
  if (isWednesday(lastDrawDate)) {
    return nextSaturday(lastDrawDate)
  }
  // If last draw was Saturday, next draw is next Wednesday
  else if (isSaturday(lastDrawDate)) {
    return nextWednesday(addDays(lastDrawDate, 1))
  }
  // For other days, get the nearest Wednesday or Saturday from the last draw date
  else {
    const nextWed = nextWednesday(lastDrawDate)
    const nextSat = nextSaturday(lastDrawDate)
    return nextWed < nextSat ? nextWed : nextSat
  }
}

function ResultBox({
  variant = "lotto",
  jackpotAmount,
  numbers,
  bonus,
  isHighlighted = false,
}: {
  variant: "lotto" | "lottoPlus1" | "lottoPlus2"
  jackpotAmount: number
  numbers: number[]
  bonus: number
  isHighlighted?: boolean
}) {
  return (
    <div
      className={clsx(
        "bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md",
        isHighlighted && "ring-2 ring-blue-500"
      )}
    >
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-100">
        <div className="flex items-start justify-between">
          <div className="w-24">
            <LotteryLogo variant={variant} className="h-8" />
          </div>
          <div className="text-right">
            <div className="text-xs text-gray-500 font-medium">Jackpot</div>
            <div className="text-base font-semibold text-green-600">
              {formatCurrency(jackpotAmount)}
            </div>
          </div>
        </div>
      </div>

      {/* Numbers */}
      <div className="p-4 space-y-4">
        {/* Main Numbers */}
        <div className="grid grid-cols-6 gap-2">
          {numbers.map((number, index) => (
            <div
              key={number}
              className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center text-base font-semibold text-blue-700 transform transition-transform duration-300 hover:scale-110"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {number}
            </div>
          ))}
        </div>

        {/* Bonus */}
        <div className="flex items-center justify-center gap-2">
          <div className="text-sm font-medium text-gray-500">Bonus Ball</div>
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-50 to-yellow-50 flex items-center justify-center text-base font-semibold text-amber-600 transform transition-transform duration-300 hover:scale-110">
            {bonus}
          </div>
        </div>
      </div>
    </div>
  )
}

export default async function Home() {
  const { latest: currentData, pastResults } = await getLotteryResults();

  // Check if latest results are more than 2 days old
  const daysSinceLastDraw = differenceInDays(
    new Date(),
    new Date(currentData.drawDate)
  );

  // Show coming soon if latest result is more than 2 days old
  const showComingSoon = daysSinceLastDraw >= 2;
  const nextDrawDate = showComingSoon ? getNextDrawDate(new Date(currentData.drawDate)) : null;
  const nextDrawDateString = nextDrawDate ? format(nextDrawDate, 'yyyy-MM-dd') : '';

  return (
    <div className="max-w-[95%] sm:max-w-4xl mx-auto p-2 sm:p-4 py-4 sm:py-8 space-y-4 sm:space-y-8">
      {/* Current Results - Hero Section */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 p-3 sm:p-4 rounded-xl shadow-sm">
        <div className="text-center space-y-4">
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Irish Lotto Results Tonight
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 flex items-center justify-center gap-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              {formatDublinDate(currentData.drawDate)}
            </p>
          </div>
          <div className="inline-flex items-center bg-white rounded-lg shadow-sm p-1.5 border border-gray-100 hover:shadow-md transition-shadow duration-300">
            <LotteryDatePicker selected={new Date(currentData.drawDate)} />
          </div>
        </div>

        {showComingSoon && (
          <div className="mt-8 sm:mt-10">
            <div className="mb-8 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-xl p-4 sm:p-6 hover:shadow-md transition-shadow duration-300">
              <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center animate-pulse">
                  <Timer className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-grow space-y-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">
                      Next Draw Coming Soon
                    </h3>
                    <p className="text-gray-600">
                      The next Irish Lotto draw will be held on {formatDublinDate(nextDrawDate!)}. Check back for the latest results!
                    </p>
                  </div>
                  <div>
                    <Link href={`/results/${nextDrawDateString}`} passHref>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 border-blue-200 hover:border-blue-300"
                      >
                        View Next Draw Details
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          <ResultBox
            variant="lotto"
            jackpotAmount={currentData.mainDraw.jackpotAmount}
            numbers={currentData.mainDraw.winningNumbers.standard}
            bonus={currentData.mainDraw.winningNumbers.bonus}
          />
          <ResultBox
            variant="lottoPlus1"
            jackpotAmount={currentData.plusOne.jackpotAmount}
            numbers={currentData.plusOne.winningNumbers.standard}
            bonus={currentData.plusOne.winningNumbers.bonus}
            isHighlighted={true}
          />
          <ResultBox
            variant="lottoPlus2"
            jackpotAmount={currentData.plusTwo.jackpotAmount}
            numbers={currentData.plusTwo.winningNumbers.standard}
            bonus={currentData.plusTwo.winningNumbers.bonus}
          />
        </div>
        <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 mt-4 sm:mt-6">
          <Link href={`/results/${currentData._id}`} passHref>
            <Button className="bg-yellow-400 text-gray-800 hover:bg-yellow-500 w-full sm:w-auto">
              View Complete Results
            </Button>
          </Link>
          <Link href={`/results/${currentData._id}#prize-breakdown`} passHref>
            <Button className="bg-green-500 text-white hover:bg-green-600 w-full sm:w-auto">
              View Prize Breakdown
            </Button>
          </Link>
        </div>
      </div>

      {/* Past Results */}
      <div className="bg-white rounded-xl shadow-sm p-3 sm:p-6">
        <h2 className="text-lg sm:text-2xl font-bold text-center text-gray-800 mb-3 sm:mb-6">Recent Results</h2>
        <div className="overflow-x-auto -mx-3 sm:mx-0">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-2 sm:p-3 text-left text-xs sm:text-sm font-semibold text-gray-600">Date</th>
                <th className="p-2 sm:p-3 text-left text-xs sm:text-sm font-semibold text-gray-600">Numbers</th>
                <th className="p-2 sm:p-3 text-left text-xs sm:text-sm font-semibold text-gray-600">Bonus</th>
                <th className="p-2 sm:p-3"></th>
              </tr>
            </thead>
            <tbody>
              {pastResults.map((result) => (
                <tr key={result._id} className="border-b border-gray-100 hover:bg-blue-50 transition-colors duration-200">
                  <td className="p-2 sm:p-3 font-medium text-gray-800 text-xs sm:text-sm">
                    {formatDublinDate(result.drawDate)}
                  </td>
                  <td className="p-2 sm:p-3">
                    <div className="flex flex-wrap gap-1 sm:gap-2">
                      {result.mainDraw.winningNumbers.standard.map((number, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-yellow-100 text-yellow-800 font-medium text-xs"
                        >
                          {number}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-2 sm:p-3">
                    <span className="inline-flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-green-100 text-green-800 font-medium text-xs">
                      {result.mainDraw.winningNumbers.bonus}
                    </span>
                  </td>
                  <td className="p-2 sm:p-3 text-right">
                    <Link href={`/results/${result._id}`} passHref>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 text-xs sm:text-sm px-2 py-1 sm:px-3 sm:py-1"
                      >
                        View
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 text-center">
          <Link
            href="/results/history"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-green-600 transition-all duration-200 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 hover:text-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            <Calendar className="w-4 h-4" />
            View Past Results
          </Link>
        </div>
      </div>

      {/* Irish Lotto Banner */}
      <div className="relative w-full h-48 sm:h-64 rounded-xl overflow-hidden shadow-lg">
        {/* Glowing background effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/30 to-green-400/30 animate-pulse" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/30" />
        <Image
          src="/og-image.webp"
          alt="Irish Lotto Results - Your trusted source for lottery numbers and prize breakdowns"
          fill
          className="object-cover"
          sizes="(max-width: 640px) 95vw, 896px"
          priority
        />
      </div>

      <HomeFAQ />
    </div>
  )
}
