import { Button } from "@/components/ui/button"
import { formatCurrency, formatDate } from "@/utils/formatters"
import { LotteryLogo } from "@/components/lottery-logo"
import LotteryDatePicker from "@/components/lottery-date-picker"
import Link from "next/link"
import clientPromise, { DB_NAME, safeDbOperation, getHistoryResults } from "@/lib/mongodb"
import type { LotteryDraw } from "@/types/lottery"
import { WithId } from "mongodb"
import { Calendar, AlertTriangle } from "lucide-react"
import { Metadata } from "next"
import { constructMetadata } from "@/app/seo.config"
import JsonLd from "@/components/json-ld"
import { Pagination } from "@/components/ui/pagination"

export const metadata: Metadata = constructMetadata({
  title: "Irish Lotto Results History",
  description: "Browse historical Irish Lotto results, winning numbers, and jackpot amounts. Check past draws and track lottery trends.",
  type: "article",
})

// Force SSR
export const dynamic = 'force-dynamic'
export const revalidate = 0

type HistoryPageProps = {
  searchParams: { page?: string }
}

export default async function HistoryPage({ searchParams }: HistoryPageProps) {
  // Parse page number from query params, default to 1
  const currentPage = searchParams.page ? parseInt(searchParams.page) : 1;
  const pageSize = 8;
  
  // Fetch results with pagination
  const response = await getHistoryResults(currentPage, pageSize);
  
  // Default values in case of null response
  const results: WithId<LotteryDraw>[] = response?.results || [];
  const pagination = response?.pagination || { currentPage: 1, totalPages: 1, totalItems: 0 };
  const isDataAvailable = response?.isDataAvailable || false;
  
  const latestResult = results.length > 0 ? results[0] : null;

  // Prepare breadcrumb data for JSON-LD
  const breadcrumbData = {
    items: [
      { name: "Home", url: "/" },
      { name: "Results History", url: "/results/history" }
    ]
  };

  return (
    <>
      <JsonLd type="BreadcrumbList" data={breadcrumbData} />
      <JsonLd type="Article" data={{
        title: "Irish Lotto Results History",
        description: "Complete archive of Irish Lotto results and winning numbers",
        image: "/og-history.jpg",
        date: new Date().toISOString()
      }} />

      <div className="max-w-5xl mx-auto p-4 py-8 space-y-12">
        {/* Hero Section */}
        <div className="relative">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-blue-100/50 rounded-3xl" />

          <div className="relative px-6 py-12 sm:px-12 sm:py-16 rounded-3xl border border-blue-100">
            <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
              {/* Title and Description */}
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl font-bold">
                  <span className="bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
                    Results History
                  </span>
                </h1>
                <p className="text-lg text-muted-foreground flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-500" />
                  Browse historical Irish Lotto draws
                </p>
              </div>

              {/* Date Picker */}
              {latestResult && (
                <div className="flex-shrink-0">
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg shadow-blue-500/5 p-2 border border-blue-100">
                    <LotteryDatePicker selected={new Date(latestResult.drawDate)} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Data Unavailable Alert */}
        {!isDataAvailable && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <AlertTriangle className="h-6 w-6 text-amber-400" />
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-medium text-amber-800">Data Temporarily Unavailable</h3>
                <div className="mt-2 text-amber-700">
                  <p>We're currently experiencing issues retrieving the lottery results history. Please check back later.</p>
                </div>
                <div className="mt-4">
                  <Button
                    onClick={() => window.location.reload()}
                    size="sm"
                    className="bg-amber-100 text-amber-800 hover:bg-amber-200"
                  >
                    Refresh Page
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Results Grid */}
        {isDataAvailable && (
          <div className="space-y-8">
            <div className="grid gap-4">
              {results.map((result: WithId<LotteryDraw>) => (
                <Link
                  key={result._id}
                  href={`/results/${result._id}`}
                  className="block group"
                >
                  <div
                    className="bg-gradient-to-br from-white to-gray-50 p-5 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      {/* Left section: Date and Numbers */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-blue-600" />
                          <h3 className="font-semibold text-gray-800">
                            {formatDate(result.drawDate)}
                          </h3>
                        </div>

                        <div className="space-y-3">
                          <div className="space-y-2">
                            <div className="text-sm font-medium text-gray-600">Winning Numbers</div>
                            <div className="flex flex-wrap gap-2">
                              {result.mainDraw.winningNumbers.standard.map((number: number, idx: number) => (
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

                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full sm:w-auto text-blue-600 hover:text-blue-700 hover:bg-blue-50 border-blue-200 hover:border-blue-300"
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            
            {/* Separator */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-4 text-sm text-gray-500">Page Navigation</span>
              </div>
            </div>
            
            {/* Pagination */}
            <div className="space-y-2">
              <h2 className="text-center text-sm font-medium text-gray-600">Browse Results</h2>
              <Pagination 
                currentPage={pagination.currentPage} 
                totalPages={pagination.totalPages} 
                baseUrl="/results/history"
                className="mt-2"
              />
            </div>
            
            {/* Results count */}
            <div className="text-center text-sm text-gray-500">
              Showing {results.length} of {pagination.totalItems} results
              {pagination.totalPages > 1 && ` • Page ${pagination.currentPage} of ${pagination.totalPages}`}
            </div>
          </div>
        )}

        {/* No Results Message */}
        {isDataAvailable && results.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto bg-blue-50 rounded-full flex items-center justify-center mb-4">
              <Calendar className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">No Results Found</h2>
            <p className="text-gray-600 mb-6">
              There are no lottery results available in our database yet.
            </p>
            <Button asChild>
              <Link href="/" className="gap-2">
                <Calendar className="w-4 h-4" />
                Go to Home Page
              </Link>
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
