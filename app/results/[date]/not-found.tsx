import { Metadata } from "next"
import { constructMetadata } from "@/app/seo.config"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Timer, Calendar } from "lucide-react"
import { isSaturday, isWednesday, nextWednesday, nextSaturday, format, addDays, differenceInDays, isSameDay } from "date-fns"
import { Breadcrumbs } from "@/components/breadcrumbs"
import LotteryDatePicker from "@/components/lottery-date-picker"
import { formatDublinDate, getCurrentDublinTime, convertToDublinTime } from "@/utils/formatters"
import clientPromise, { DB_NAME } from "@/lib/mongodb"
import type { LotteryDraw } from "@/types/lottery"
import { notFound } from "next/navigation"
import { toZonedTime, formatInTimeZone } from "date-fns-tz"

// This function will be used in the main page.tsx to check if result exists
export async function checkResultExists(date: string): Promise<boolean> {
  try {
    const client = await clientPromise
    const db = client.db(DB_NAME)

    const result = await db
      .collection<LotteryDraw>("lottoresults")
      .findOne({ _id: date })

    return !!result
  } catch (error) {
    console.error('Error checking result:', error)
    return false
  }
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
    return nextSaturday(dublinDate)
  }
  if (isSaturday(dublinDate)) {
    return nextWednesday(addDays(dublinDate, 1))
  }
  const nextWed = nextWednesday(dublinDate)
  const nextSat = nextSaturday(dublinDate)
  return nextWed < nextSat ? nextWed : nextSat
}

function shouldShowComingSoon(requestedDate: Date, latestResult: LotteryDraw | null): boolean {
  if (!latestResult) return false

  // Get current time in Dublin timezone using the utility function
  const now = getCurrentDublinTime();
  
  // Convert dates to Dublin timezone using our utility function
  const requestedDateDublin = convertToDublinTime(requestedDate);
  
  // If it's today but before 8 PM in Dublin, show coming soon
  // This is critical for users in different time zones
  if (isSameDay(requestedDateDublin, now) && now.getHours() < 20) {
    return true;
  }
  
  // If requested date is in the future, show coming soon
  if (requestedDateDublin > now) return true

  // If latest result is more than 2 days old and requested date is after latest result
  const latestResultDateDublin = convertToDublinTime(new Date(latestResult.drawDate));
  const daysSinceLastDraw = differenceInDays(now, latestResultDateDublin);
  if (daysSinceLastDraw >= 2 && requestedDateDublin > latestResultDateDublin) {
    return true
  }

  return false
}

export default async function NotFound() {
  // This is a not-found page, so we should just show the not found message
  return (
    <div className="max-w-4xl mx-auto p-4 py-8 space-y-8">
      <div className="space-y-6">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Results", href: "/results/archive" },
            { label: "Not Found" }
          ]}
        />

        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
            Result Not Found
          </h1>
          <p className="text-gray-600 mb-8">
            The lottery result you're looking for could not be found. Please check the date and try again.
          </p>
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

// Generate metadata at request time
export async function generateMetadata({ params }: { params: { date: string } }): Promise<Metadata> {
  const currentDate = new Date(params.date)
  const nextDraw = getNextDrawDate(currentDate)

  return constructMetadata({
    title: `Irish Lotto Results Coming Soon - ${format(currentDate, "EEEE, MMMM d, yyyy")}`,
    description: `Irish Lotto results for ${format(currentDate, "MMMM d, yyyy")} are not available yet. The next draw will be on ${format(nextDraw, "EEEE, MMMM d")}. Check back soon for the latest winning numbers and prizes.`,
    type: "website"
  })
}
