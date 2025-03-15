import { Metadata } from "next"
import { constructMetadata } from "@/app/seo.config"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { getLatestResult } from "@/lib/mongodb"
import { LotteryDraw } from "@/types/lottery"
import { formatDate } from "@/utils/formatters"
import { NumberChecker } from "./number-checker"
import JsonLd from "@/components/json-ld"

export const metadata: Metadata = constructMetadata({
  title: "Irish Lotto Number Checker | Check Your Lottery Numbers",
  description: "Check your Irish Lotto numbers against the latest draw results. See if you've won a prize in the Main Draw, Plus 1, or Plus 2 games.",
  type: "website",
  keywords: [
    "Irish Lotto Number Checker",
    "Check Lotto Numbers",
    "Irish Lottery Checker",
    "Lotto Prize Checker",
    "Irish Lotto Results Checker"
  ]
})

// Force SSR
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function CheckNumbersPage() {
  // Get the latest lottery result
  const latestResult = await getLatestResult()
  
  if (!latestResult) {
    return (
      <div className="max-w-4xl mx-auto p-4 py-8 space-y-8">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Number Checker" }
          ]}
        />
        
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Number Checker</h1>
          <p className="text-gray-600">
            Sorry, we couldn't retrieve the latest lottery results. Please try again later.
          </p>
        </div>
      </div>
    )
  }
  
  return (
    <div className="max-w-4xl mx-auto p-4 py-8 space-y-8">
      <JsonLd type="BreadcrumbList" data={{
        items: [
          { name: "Home", url: "/" },
          { name: "Number Checker", url: "/check-numbers" }
        ]
      }} />
      
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Number Checker" }
        ]}
      />
      
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-2 text-center sm:text-left">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Number Checker
            </h1>
            <p className="text-gray-600">
              Check your numbers against the latest draw on {formatDate(latestResult.drawDate)}
            </p>
          </div>
        </div>
      </div>
      
      <NumberChecker latestResult={latestResult} />
    </div>
  )
} 