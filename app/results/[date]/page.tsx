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
import JsonLd from "@/components/json-ld"
import { Suspense } from "react"
import { LotteryResultsSkeleton } from "@/components/ui/skeleton"

// Force dynamic rendering but enable caching for faster repeat visits
export const dynamic = 'force-dynamic'
export const revalidate = 300 // Cache for 5 minutes

// Cache for getLotteryResult function
const resultCache = new Map<string, { data: LotteryDraw | null, timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes in milliseconds

async function getLotteryResult(date: string): Promise<LotteryDraw | null> {
  try {
    // Check cache first
    const now = Date.now();
    const cached = resultCache.get(date);
    
    if (cached && (now - cached.timestamp) < CACHE_TTL) {
      return cached.data;
    }
    
    const client = await clientPromise;
    const db = client.db(DB_NAME);

    const result = await db
      .collection<LotteryDraw>("lottoresults")
      .findOne({ _id: date });
    
    // Update cache
    resultCache.set(date, { data: result, timestamp: now });
    
    return result;
  } catch (error) {
    console.error('Error fetching lottery result:', error);
    throw error;
  }
}

// Prefetch adjacent dates to improve navigation performance
async function prefetchAdjacentDates(date: string) {
  try {
    const currentDate = new Date(date);
    
    // Find previous and next lottery days
    let prevDate = new Date(currentDate);
    let nextDate = new Date(currentDate);
    
    // Find previous lottery day (Wednesday or Saturday)
    while (!(isWednesday(prevDate) || isSaturday(prevDate))) {
      prevDate = addDays(prevDate, -1);
    }
    
    // Find next lottery day (Wednesday or Saturday)
    while (!(isWednesday(nextDate) || isSaturday(nextDate))) {
      nextDate = addDays(nextDate, 1);
    }
    
    // Format dates for fetching
    const prevDateStr = format(prevDate, "yyyy-MM-dd");
    const nextDateStr = format(nextDate, "yyyy-MM-dd");
    
    // Prefetch in the background
    if (prevDateStr !== date) {
      getLotteryResult(prevDateStr).catch(() => {});
    }
    
    if (nextDateStr !== date) {
      getLotteryResult(nextDateStr).catch(() => {});
    }
  } catch (error) {
    // Silently fail for prefetching
    console.error('Error prefetching adjacent dates:', error);
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
  // Use the actual prizes from the database, or fall back to defaults if needed
  const prizesToDisplay = prizes && prizes.length > 0 ? prizes : [
    { match: "Jackpot", numberOfWinners: 0, prize: 0, prizeType: "cash" },
    { match: "Match 5 + Bonus", numberOfWinners: 0, prize: 0, prizeType: "cash" },
    { match: "Match 5", numberOfWinners: 0, prize: 0, prizeType: "cash" },
    { match: "Match 4 + Bonus", numberOfWinners: 0, prize: 0, prizeType: "cash" },
    { match: "Match 4", numberOfWinners: 0, prize: 0, prizeType: "cash" },
    { match: "Match 3 + Bonus", numberOfWinners: 0, prize: 0, prizeType: "cash" },
    { match: "Match 3", numberOfWinners: 0, prize: 0, prizeType: "cash" },
    { match: "Match 2 + Bonus", numberOfWinners: 0, prize: 0, prizeType: "cash" }
  ];

  // Format the number of winners with text
  const formatWinners = (count: number): string => {
    if (count === 0) return "No Winners";
    if (count === 1) return "1 Winner";
    return `${count.toLocaleString()} Winners`;
  };

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
          {prizesToDisplay.map((prize, index) => (
            <tr key={index}>
              <td className="px-2 sm:px-3 py-1.5 text-[#333333]">
                <div className="whitespace-nowrap">{prize.match}</div>
              </td>
              <td className="px-2 sm:px-3 py-1.5 text-right text-[#0066cc]">
                <div className="whitespace-nowrap">{formatWinners(prize.numberOfWinners)}</div>
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

// Generate metadata at request time
export async function generateMetadata({ params }: { params: { date: string } }): Promise<Metadata> {
  try {
    const result = await getLotteryResult(params.date);
    
    if (result) {
      const formattedDate = formatDate(result.drawDate);
      const jackpotAmount = formatCurrency(result.mainDraw.jackpotAmount);
      
      return constructMetadata({
        title: `Irish Lotto Results for ${formattedDate} - Winning Numbers & Prizes`,
        description: `Irish Lotto results for ${formattedDate}. Jackpot: ${jackpotAmount}. Check winning numbers and prize breakdown for the main draw, Plus 1, and Plus 2.`,
        url: `https://www.irishlottoresults.co.uk/results/${params.date}`,
        type: "article"
      });
    } else {
      // For coming soon or not found pages
      const currentDate = new Date(params.date);
      const formattedDate = format(currentDate, "MMMM d, yyyy");
      
      return constructMetadata({
        title: `Irish Lotto Results for ${formattedDate} - Coming Soon`,
        description: `Irish Lotto results for ${formattedDate} will be available soon after the draw. Check back for winning numbers and prize breakdown.`,
        url: `https://www.irishlottoresults.co.uk/results/${params.date}`,
        type: "website"
      });
    }
  } catch (error) {
    // Fallback metadata
    return constructMetadata({
      title: "Irish Lotto Results",
      description: "Check the latest Irish Lotto results, winning numbers, and prize breakdowns.",
      url: "https://www.irishlottoresults.co.uk/results",
    });
  }
}

// Wrap the date picker in a separate component
function DatePickerWrapper({ date }: { date: string }) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-1.5 border border-gray-100">
      <LotteryDatePicker selected={new Date(date)} />
    </div>
  )
}

// Wrap the result fetching and rendering in a separate component
async function ResultContent({ date }: { date: string }) {
  const result = await getLotteryResult(date);

  if (!result) {
    notFound();
  }
  
  // Prefetch adjacent dates in the background
  prefetchAdjacentDates(date);

  return (
    <>
      <JsonLd type="BreadcrumbList" data={{
        items: [
          { name: "Home", url: "/" },
          { name: "Results", url: "/results/archive" },
          { name: formatDate(result.drawDate), url: `/results/${date}` }
        ]
      }} />
      
      <JsonLd type="LotteryResult" data={{
        _id: date,
        drawDate: result.drawDate,
        mainDraw: {
          jackpotAmount: result.mainDraw.jackpotAmount,
          winningNumbers: result.mainDraw.winningNumbers
        }
      }} />
      
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
          <Suspense fallback={<div className="bg-white rounded-lg shadow-sm p-1.5 border border-gray-100 h-10 w-64 animate-pulse"></div>}>
            <DatePickerWrapper date={result.drawDate} />
          </Suspense>
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
    </>
  )
}

export default async function LotteryResults({ params }: Props) {
  const currentDate = new Date(params.date)

  // If date is invalid, show not found
  if (isNaN(currentDate.getTime())) {
    notFound()
  }

  // Check if result exists for this date - use a more efficient check
  let resultExists = false;
  try {
    // Try to get the result directly instead of using a separate check
    const result = await getLotteryResult(params.date);
    resultExists = !!result;
  } catch (error) {
    // If there's an error, assume the result doesn't exist
    resultExists = false;
  }

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
          <JsonLd type="BreadcrumbList" data={{
            items: [
              { name: "Home", url: "/" },
              { name: "Results", url: "/results/history" },
              { name: format(currentDate, "MMMM d, yyyy"), url: `/results/${params.date}` }
            ]
          }} />
          
          <div className="space-y-6">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Results", href: "/results/history" },
                { label: format(currentDate, "MMMM d, yyyy") }
              ]}
            />

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-2 text-center sm:text-left">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  {format(currentDate, "EEEE, MMMM d, yyyy")}
                </h1>
              </div>
              <Suspense fallback={<div className="bg-white rounded-lg shadow-sm p-1.5 border border-gray-100 h-10 w-64 animate-pulse"></div>}>
                <DatePickerWrapper date={params.date} />
              </Suspense>
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

  return (
    <div className="max-w-4xl mx-auto p-4 py-8 space-y-8">
      <Suspense fallback={<LotteryResultsSkeleton />}>
        <ResultContent date={params.date} />
      </Suspense>
    </div>
  )
}
