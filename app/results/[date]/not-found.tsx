import { Metadata } from "next"
import { constructMetadata } from "@/app/seo.config"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, Home, ArrowLeft } from "lucide-react"
import { format } from "date-fns"
import { Breadcrumbs } from "@/components/breadcrumbs"
import clientPromise, { DB_NAME } from "@/lib/mongodb"
import type { LotteryDraw } from "@/types/lottery"
import JsonLd from "@/components/json-ld"

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
  const currentDay = date.getDay()
  
  // If Wednesday (3), next draw is Saturday
  if (currentDay === 3) {
    const nextDate = new Date(date)
    nextDate.setDate(date.getDate() + 3) // Saturday is 3 days after Wednesday
    return nextDate
  }
  
  // If Saturday (6), next draw is Wednesday
  if (currentDay === 6) {
    const nextDate = new Date(date)
    nextDate.setDate(date.getDate() + 4) // Wednesday is 4 days after Saturday
    return nextDate
  }
  
  // For any other day, find the next Wednesday or Saturday
  const daysToWednesday = (3 - currentDay + 7) % 7
  const daysToSaturday = (6 - currentDay + 7) % 7
  
  // Return the closest upcoming draw day
  if (daysToWednesday < daysToSaturday) {
    const nextDate = new Date(date)
    nextDate.setDate(date.getDate() + daysToWednesday)
    return nextDate
  } else {
    const nextDate = new Date(date)
    nextDate.setDate(date.getDate() + daysToSaturday)
    return nextDate
  }
}

// Generate metadata at request time
export async function generateMetadata({ params }: { params: { date: string } }): Promise<Metadata> {
  try {
    const currentDate = new Date(params.date)
    
    // If date is invalid, return generic metadata
    if (isNaN(currentDate.getTime())) {
      return constructMetadata({
        title: "Result Not Found | Irish Lotto Results",
        description: "The lottery result you're looking for could not be found. Please check the date and try again.",
        type: "website"
      })
    }
    
    const nextDraw = getNextDrawDate(currentDate)
    const formattedDate = format(currentDate, "MMMM d, yyyy")
    const formattedNextDraw = format(nextDraw, "EEEE, MMMM d")

    return constructMetadata({
      title: `Irish Lotto Results Not Found - ${formattedDate}`,
      description: `Irish Lotto results for ${formattedDate} are not available. The next draw will be on ${formattedNextDraw}. Check back soon for the latest winning numbers and prizes.`,
      type: "website"
    })
  } catch (error) {
    // Fallback metadata
    return constructMetadata({
      title: "Result Not Found | Irish Lotto Results",
      description: "The lottery result you're looking for could not be found. Please check the date and try again.",
      type: "website"
    })
  }
}

export default async function NotFound() {
  // Get the latest result to show as a suggestion
  const latestResult = await getLatestResult()
  const latestDate = latestResult ? new Date(latestResult.drawDate) : new Date()
  
  return (
    <div className="max-w-4xl mx-auto p-4 py-8 space-y-8">
      <JsonLd type="BreadcrumbList" data={{
        items: [
          { name: "Home", url: "/" },
          { name: "Results", url: "/results/history" },
          { name: "Not Found", url: "" }
        ]
      }} />
      
      <div className="space-y-6">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Results", href: "/results/history" },
            { label: "Not Found" }
          ]}
        />

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-50 mb-4">
            <Calendar className="w-8 h-8 text-red-500" />
          </div>
          
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
            Result Not Found
          </h1>
          
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            The lottery result you're looking for could not be found. This could be because:
          </p>
          
          <ul className="text-left max-w-md mx-auto mb-8 space-y-2 text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-red-500 font-bold">•</span>
              <span>The date format is incorrect (should be YYYY-MM-DD)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 font-bold">•</span>
              <span>There was no draw on this date</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 font-bold">•</span>
              <span>The result hasn't been added to our database yet</span>
            </li>
          </ul>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="default" className="gap-2">
              <Link href="/">
                <Home className="w-4 h-4" />
                View Latest Results
              </Link>
            </Button>
            
            <Button asChild variant="outline" className="gap-2">
              <Link href="/results/history">
                <Calendar className="w-4 h-4" />
                Browse Past Results
              </Link>
            </Button>
            
            {latestResult && (
              <Button asChild variant="outline" className="gap-2">
                <Link href={`/results/${format(latestDate, "yyyy-MM-dd")}`}>
                  <ArrowLeft className="w-4 h-4" />
                  Latest Available Result
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
