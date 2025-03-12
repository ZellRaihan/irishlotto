import { formatCurrency, formatDate, formatDublinDate, formatFullDate, getCurrentDublinTime, convertToDublinTime } from "@/utils/formatters"
import { LotteryLogo } from "@/components/lottery-logo"
import { Button } from "@/components/ui/button"
import LotteryDatePicker from "@/components/lottery-date-picker"
import { Breadcrumbs } from "@/components/breadcrumbs"
import Link from "next/link"
import clientPromise, { DB_NAME } from "@/lib/mongodb"
import type { LotteryDraw } from "@/types/lottery"
import { notFound } from "next/navigation"
import { Calendar } from "lucide-react"
import { Metadata } from "next"
import { constructMetadata } from "@/app/seo.config"
import { checkResultExists } from "./not-found"
import { isSaturday, isWednesday, nextWednesday, nextSaturday, format, addDays, differenceInDays, isSameDay } from "date-fns"
import { NextDrawInfo } from "@/app/components/next-draw-info"
import { toZonedTime, formatInTimeZone } from "date-fns-tz"

// Force SSR
export const dynamic = 'force-dynamic'
export const revalidate = 0

async function getLotteryResult(date: string): Promise<LotteryDraw | null> {
  try {
    const client = await clientPromise;
    const db = client.db(DB_NAME);

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
  const defaultPrizes = [
    { match: "Jackpot", winners: 1, prize: 2935144, prizeType: "cash" },
    { match: "Match 5 + Bonus", winners: 0, prize: 32754, prizeType: "cash" },
    { match: "Match 5", winners: 16, prize: 1228, prizeType: "cash" },
    { match: "Match 4 + Bonus", winners: 25, prize: 198, prizeType: "cash" },
    { match: "Match 4", winners: 515, prize: 62, prizeType: "cash" },
    { match: "Match 3 + Bonus", winners: 654, prize: 33, prizeType: "cash" },
    { match: "Match 3", winners: 9245, prize: 11, prizeType: "cash" },
    { match: "Match 2 + Bonus", winners: 6550, prize: 3, prizeType: "daily_million" }
  ];

  return (
    <div className="mt-4 bg-white">
      <table className="w-full text-[13px] min-w-[280px]">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-100">
            <th className="px-2 sm:px-3 py-1.5 text-left font-medium text-[#333333] w-[38%]">Match</th>
            <th className="px-2 sm:px-3 py-1.5 text-right font-medium text-[#333333] w-[27%]">Winners</th>
            <th className="px-2 sm:px-3 py-1.5 text-right font-medium text-[#333333] w-[35%]">Prize</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {defaultPrizes.map((prize, index) => (
            <tr key={index}>
              <td className="px-2 sm:px-3 py-1.5 text-[#333333]">
                <div className="whitespace-nowrap">{prize.match}</div>
              </td>
              <td className="px-2 sm:px-3 py-1.5 text-right text-[#0066cc]">
                <div className="whitespace-nowrap">{prize.winners}</div>
              </td>
              <td className="px-2 sm:px-3 py-1.5 text-right">
                {prize.prizeType === "daily_million" ? (
                  <div className="text-[#0066cc] leading-tight">
                    <div className="whitespace-nowrap">Daily Million</div>
                    <div className="whitespace-nowrap">Plus QP* (€{prize.prize})</div>
                  </div>
                ) : (
                  <div className="text-[#333333] whitespace-nowrap">
                    €{prize.prize.toLocaleString()}
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="px-2 sm:px-3 py-2 text-[11px] text-[#0066cc] italic leading-tight">
        *Prize is redeemable as per above for retail players and as a cash to wallet prize for online players - for full details see Game Rules.
      </div>
    </div>
  )
}

function RaffleResults({ raffle }: { raffle: { id: string; numberOfWinners: number; prizeAmount: number; message: string } }) {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-4 py-3">
        <h2 className="text-lg font-semibold text-white text-center">Winning Raffle Number</h2>
      </div>
      
      <div className="p-6 space-y-6">
        {/* Winning Number */}
        <div className="flex justify-center">
          <div className="bg-gray-50 rounded-full px-8 py-3 border border-gray-200">
            <div className="text-2xl font-bold text-[#333333]">{raffle.id}</div>
          </div>
        </div>

        {/* Message */}
        <div className="text-center text-[15px] text-gray-700">
          There were {raffle.numberOfWinners} winners of the Raffle Prize each receiving {formatCurrency(raffle.prizeAmount)} euros.
        </div>

        {/* Additional Info */}
        <div className="text-[13px] text-gray-500 text-center italic">
          {raffle.message}
        </div>
      </div>
    </div>
  )
}

type Props = {
  params: { date: string }
}

async function getLatestResult(): Promise<LotteryDraw | null> {
  try {
    const client = await clientPromise
    const db = client.db(DB_NAME)

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
  // Define Dublin timezone
  const DUBLIN_TIMEZONE = 'Europe/Dublin';
  
  // Convert to Dublin timezone using formatInTimeZone for consistency
  const dateString = formatInTimeZone(
    new Date(date),
    DUBLIN_TIMEZONE,
    'yyyy-MM-dd\'T\'HH:mm:ss.SSS'
  );
  const dublinDate = new Date(dateString);
  
  if (isWednesday(dublinDate)) {
    return nextSaturday(dublinDate);
  }
  if (isSaturday(dublinDate)) {
    return nextWednesday(addDays(dublinDate, 1));
  }
  const nextWed = nextWednesday(dublinDate);
  const nextSat = nextSaturday(dublinDate);
  return nextWed < nextSat ? nextWed : nextSat;
}

function shouldShowComingSoon(requestedDate: Date, latestResult: LotteryDraw | null): boolean {
  if (!latestResult) return false;

  // Define Dublin timezone
  const DUBLIN_TIMEZONE = 'Europe/Dublin';
  
  // Get current time in Dublin timezone using the utility function
  const now = getCurrentDublinTime();
  
  // Convert dates to Dublin timezone using our utility function
  const requestedDateDublin = convertToDublinTime(requestedDate);
  
  // Set the requested date's time to 8:00 PM (draw time)
  const drawTime = new Date(requestedDateDublin);
  drawTime.setHours(20, 0, 0, 0);
  
  // If requested date is in the future, show coming soon
  if (requestedDateDublin > now) return true;
  
  // If it's today but before 8 PM in Dublin, show coming soon
  // This is critical for users in different time zones
  if (
    isSameDay(requestedDateDublin, now) && 
    now.getHours() < 20
  ) {
    return true;
  }

  // If latest result is more than 2 days old and requested date is after latest result
  const latestResultDateDublin = convertToDublinTime(new Date(latestResult.drawDate));
  const daysSinceLastDraw = differenceInDays(now, latestResultDateDublin);
  if (daysSinceLastDraw >= 2 && requestedDateDublin > latestResultDateDublin) {
    return true;
  }

  return false;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const currentDate = new Date(params.date)
  const nextDraw = getNextDrawDate(currentDate)

  // Format the date like "12th February Wednesday 2025"
  const formattedDate = `${formatFullDate(currentDate)} Irish Lotto Results`

  return constructMetadata({
    title: formattedDate,
    description: `Check Irish Lotto results for ${format(currentDate, "do MMMM yyyy")}. View winning numbers, prize breakdowns, and jackpot amounts for all draws - Main Draw, Plus 1, and Plus 2.`,
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
      const nextDraw = getNextDrawDate(currentDate);
      
      // Create a new Date object for the current date with draw time set to 8:00 PM
      const currentDateWithTime = new Date(currentDate);
      currentDateWithTime.setHours(20, 0, 0, 0);
      
      // Create a new Date object for the next draw to avoid mutating the original
      const nextDrawWithTime = new Date(nextDraw);
      nextDrawWithTime.setHours(20, 0, 0, 0);

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
                  {format(currentDate, "EEEE, MMMM d, yyyy")}
                </h1>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-1.5 border border-gray-100">
                <LotteryDatePicker selected={currentDate} />
              </div>
            </div>
          </div>

          <NextDrawInfo 
            requestedDate={currentDate}
            latestResultDate={latestResult ? new Date(latestResult.drawDate) : null}
            nextDrawDate={nextDrawWithTime}
          />
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

      <RaffleResults raffle={result.raffle} />
    </div>
  )
}
