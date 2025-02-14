import { formatCurrency, formatDate, formatDublinDate } from "@/utils/formatters"
import { LotteryLogo } from "@/components/lottery-logo"
import { Button } from "@/components/ui/button"
import LotteryDatePicker from "@/components/lottery-date-picker"
import { Breadcrumbs } from "@/components/breadcrumbs"
import Link from "next/link"
import clientPromise from "@/lib/mongodb"
import type { LotteryDraw } from "@/types/lottery"
import { notFound } from "next/navigation"
import { Calendar } from "lucide-react"
import { Metadata } from "next"
import { constructMetadata } from "@/app/seo.config"
import { checkResultExists } from "./not-found"
import { isSaturday, isWednesday, nextWednesday, nextSaturday, format, addDays, differenceInDays } from "date-fns"

// Add dynamic fetch options
export const dynamic = 'force-dynamic'
// Use ISR with 1-hour cache
export const revalidate = 3600

async function getLotteryResult(date: string): Promise<LotteryDraw | null> {
  try {
    const client = await clientPromise;
    const db = client.db("lottery");

    // Add cache-busting timestamp
    const currentTimestamp = new Date().getTime()

    const result = await db
      .collection<LotteryDraw>("lottoresults")
      .findOne({ _id: date });

    return result;
  } catch (error) {
    console.error('Error fetching lottery result:', error);
    throw error;
  }
}

function getLogoVariant(gameType: string): "lotto" | "lottoPlus1" | "lottoPlus2" {
  switch (gameType) {
    case "Lotto":
      return "lotto"
    case "Lotto Plus 1":
      return "lottoPlus1"
    case "Lotto Plus 2":
      return "lottoPlus2"
    default:
      return "lotto" // fallback to main lotto
  }
}

function ResultBox({
  gameType,
  jackpotAmount,
  numbers,
  bonus,
}: {
  gameType: string
  jackpotAmount: number
  numbers: number[]
  bonus: number
}) {
  return (
    <div className="bg-white rounded-lg border border-blue-100 overflow-hidden">
      <div className="px-3 sm:px-4 py-2 flex justify-between items-center border-b border-gray-100">
        <LotteryLogo variant={getLogoVariant(gameType)} className="h-5 sm:h-6 w-16 sm:w-20" />
        <div className="flex items-center gap-1 sm:gap-2">
          <div className="text-xs text-gray-500">Jackpot</div>
          <div className="text-sm sm:text-base font-semibold text-green-600">{formatCurrency(jackpotAmount)}</div>
        </div>
      </div>
      <div className="p-2 sm:p-3">
        <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-2">
          {numbers.map((number, index) => (
            <div
              key={index}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-yellow-50 border border-yellow-100 flex items-center justify-center font-medium text-gray-700 text-sm sm:text-base"
            >
              {number}
            </div>
          ))}
          <div className="flex items-center gap-1 sm:gap-2 ml-1">
            <span className="text-xs sm:text-sm text-gray-500">Bonus</span>
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center font-medium text-gray-700 text-sm sm:text-base">
              {bonus}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function PrizeBreakdown({ prizes }: {
  prizes: Array<{
    match: string;
    prizeType: string;
    numberOfWinners: number;
    prize: number;
  }>
}) {
  return (
    <div className="mt-4 overflow-x-auto -mx-4 sm:mx-0">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-4 py-2 text-left font-semibold text-gray-600">Match</th>
            <th className="px-4 py-2 text-left font-semibold text-gray-600">Winners</th>
            <th className="px-4 py-2 text-left font-semibold text-gray-600">Prize</th>
          </tr>
        </thead>
        <tbody>
          {prizes.map((prize, index) => (
            <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150">
              <td className="px-4 py-2">{prize.match}</td>
              <td className="px-4 py-2">{prize.numberOfWinners}</td>
              <td className="px-4 py-2">{formatCurrency(prize.prize)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

type Props = {
  params: { date: string }
}

async function getLatestResult(): Promise<LotteryDraw | null> {
  try {
    const client = await clientPromise
    const db = client.db("lottery")

    const latestResult = await db
      .collection<LotteryDraw>("lottoresults")
      .find({})
      .sort({ drawDate: -1 })
      .limit(1)
      .toArray()

    return latestResult[0] || null
  } catch (error) {
    console.error('Error fetching latest result:', error)
    return null
  }
}

function getNextDrawDate(date: Date): Date {
  if (isWednesday(date)) {
    return nextSaturday(date)
  }
  if (isSaturday(date)) {
    return nextWednesday(addDays(date, 1))
  }
  const nextWed = nextWednesday(date)
  const nextSat = nextSaturday(date)
  return nextWed < nextSat ? nextWed : nextSat
}

function shouldShowComingSoon(requestedDate: Date, latestResult: LotteryDraw | null): boolean {
  if (!latestResult) return false

  // If requested date is in the future, show coming soon
  if (requestedDate > new Date()) return true

  // If latest result is more than 2 days old and requested date is after latest result
  const daysSinceLastDraw = differenceInDays(new Date(), new Date(latestResult.drawDate))
  if (daysSinceLastDraw >= 2 && requestedDate > new Date(latestResult.drawDate)) {
    return true
  }

  return false
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const currentDate = new Date(params.date)
  const nextDraw = getNextDrawDate(currentDate)

  return constructMetadata({
    title: `Irish Lotto Results - ${format(currentDate, "EEEE, MMMM d, yyyy")}`,
    description: `View Irish Lotto results for ${format(currentDate, "MMMM d, yyyy")}. Check winning numbers and prizes.`,
    type: "website"
  })
}

export default async function LotteryResults({ params }: Props) {
  const currentDate = new Date(params.date)

  // If date is invalid, show not found
  if (isNaN(currentDate.getTime())) {
    notFound()
  }

  // Check if result exists for this date
  const resultExists = await checkResultExists(params.date)
  if (!resultExists) {
    const latestResult = await getLatestResult()

    // If we should show coming soon page
    if (shouldShowComingSoon(currentDate, latestResult)) {
      const nextDraw = getNextDrawDate(currentDate)

      return (
        <div className="max-w-4xl mx-auto p-4 py-8 space-y-8">
          <div className="space-y-6">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Results", href: "/results/archive" },
                { label: format(currentDate, "MMMM d, yyyy") }
              ]}
            />

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-2 text-center sm:text-left">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  {formatDublinDate(currentDate.toISOString())}
                </h1>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-1.5 border border-gray-100">
                <LotteryDatePicker selected={currentDate} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-8">
            <div className="max-w-xl mx-auto text-center space-y-6">
              <div className="w-16 h-16 mx-auto bg-blue-50 rounded-full flex items-center justify-center">
                <Calendar className="w-8 h-8 text-blue-600" />
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl font-semibold text-gray-900">Results Coming Soon</h2>
                <p className="text-gray-600">
                  The lottery results for {format(currentDate, "MMMM d, yyyy")} are not available yet.
                  The next draw will be on {format(nextDraw, "EEEE, MMMM d")}.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild variant="outline">
                  <Link href="/" className="gap-2">
                    <Calendar className="w-4 h-4" />
                    View Latest Results
                  </Link>
                </Button>
                <Button asChild>
                  <Link href="/results/archive" className="gap-2">
                    <Calendar className="w-4 h-4" />
                    Browse Past Results
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )
    }

    // If not showing coming soon, show not found
    notFound()
  }

  const result = await getLotteryResult(params.date);

  if (!result) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto p-4 py-8 space-y-8">
      <div className="space-y-6">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Results", href: "/results/archive" },
            { label: formatDate(result.drawDate) }
          ]}
        />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-2 text-center sm:text-left">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              {formatDublinDate(result.drawDate)}
            </h1>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-1.5 border border-gray-100">
            <LotteryDatePicker selected={new Date(result.drawDate)} />
          </div>
        </div>
      </div>

      <div className="space-y-8">
        {[
          { key: 'mainDraw', data: result.mainDraw },
          { key: 'plusOne', data: result.plusOne },
          { key: 'plusTwo', data: result.plusTwo }
        ].map(({ key, data }) => (
          <div key={key} className="bg-white rounded-xl shadow-sm p-4 space-y-4">
            <ResultBox
              gameType={data.gameType}
              jackpotAmount={data.jackpotAmount}
              numbers={data.winningNumbers.standard}
              bonus={data.winningNumbers.bonus}
            />
            <p className="text-sm text-gray-600">{data.prizeMessage}</p>
            <PrizeBreakdown prizes={data.prizes} />
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm p-4">
        <h2 className="text-xl font-semibold mb-2">Raffle Results</h2>
        <p className="text-sm text-gray-600 mb-2">Raffle ID: {result.raffle.id}</p>
        <p className="text-sm text-gray-600">{result.raffle.message}</p>
      </div>
    </div>
  )
}
