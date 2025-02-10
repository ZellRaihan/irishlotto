import { formatDate } from "@/utils/formatters"
import { LotteryLogo } from "@/components/lottery-logo"
import { Button } from "@/components/ui/button"
import LotteryDatePicker from "@/components/lottery-date-picker"
import { Breadcrumbs } from "@/components/breadcrumbs"
import Link from "next/link"
import { Timer, Calendar, Info } from "lucide-react"
import { isSaturday, isWednesday, nextWednesday, nextSaturday } from "date-fns"

function getNextDrawDate(date: Date): Date {
  if (isWednesday(date)) {
    return nextSaturday(date)
  } else if (isSaturday(date)) {
    return nextWednesday(date)
  } else {
    const nextWed = nextWednesday(date)
    const nextSat = nextSaturday(date)
    return nextWed < nextSat ? nextWed : nextSat
  }
}

function ResultBox({ gameType }: { gameType: string }) {
  return (
    <div className="bg-white rounded-lg border border-blue-100 overflow-hidden">
      <div className="px-3 sm:px-4 py-2 flex justify-between items-center border-b border-gray-100">
        <LotteryLogo variant={gameType as "lotto" | "lottoPlus1" | "lottoPlus2"} className="h-5 sm:h-6 w-16 sm:w-20" />
        <div className="flex items-center gap-1 sm:gap-2">
          <div className="text-xs text-gray-500">Results Pending</div>
        </div>
      </div>
      <div className="p-2 sm:p-3">
        <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-2">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center font-medium text-gray-400 text-sm sm:text-base"
            >
              ?
            </div>
          ))}
          <div className="flex items-center gap-1 sm:gap-2 ml-1">
            <span className="text-xs sm:text-sm text-gray-500">Bonus</span>
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center font-medium text-gray-400 text-sm sm:text-base">
              ?
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function NotFound() {
  const nextDrawDate = getNextDrawDate(new Date())
  const formattedDate = formatDate(nextDrawDate)

  return (
    <div className="max-w-4xl mx-auto p-4 py-8 space-y-8">
      <div className="space-y-6">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Results", href: "/results/archive" },
            { label: formattedDate },
          ]}
        />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-2 text-center sm:text-left">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Irish Lottery Results
            </h1>
            <h2 className="text-lg sm:text-xl text-gray-600 flex items-center justify-center sm:justify-start gap-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              {formattedDate}
            </h2>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-1.5 border border-gray-100">
            <LotteryDatePicker selected={nextDrawDate} />
          </div>
        </div>
      </div>

      <div className="text-center mb-8">
        <h2 className="text-xl text-gray-600 flex items-center justify-center gap-2">
          <Calendar className="w-5 h-5" />
          Draw Date: {formattedDate}
        </h2>
      </div>

      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col items-center text-center space-y-6">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
            <Timer className="w-10 h-10 text-blue-600" />
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">Results Coming Soon</h2>
            <p className="text-gray-600 max-w-2xl">
              The Irish Lottery draw for {formattedDate} has not yet taken place. Check back after the draw for the
              latest winning numbers, prize breakdown, and jackpot details.
            </p>
          </div>

          <div className="pt-4">
            <Link href="/" passHref>
              <Button className="bg-blue-600 text-white hover:bg-blue-700">View Latest Results</Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        {["lotto", "lottoPlus1", "lottoPlus2"].map((gameType) => (
          <div key={gameType} className="bg-white rounded-xl shadow-sm p-4 space-y-4">
            <ResultBox gameType={gameType} />
            <p className="text-sm text-gray-600">Results pending for this draw.</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm p-4">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-gray-800">
          <Info className="w-6 h-6 text-blue-600" />
          About Irish Lottery Draws
        </h2>
        <div className="space-y-4 text-gray-600">
          <p className="leading-relaxed">
            The Irish Lottery draws take place every Wednesday and Saturday evening. Players choose 6 numbers from 1 to
            47, and a bonus number is also drawn. To win the jackpot, players must match all 6 main numbers drawn.
          </p>

          <div>
            <h3 className="font-medium text-gray-800 mb-3 text-lg">Prize Categories</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                "Match 6 numbers - Jackpot Prize",
                "Match 5 numbers + Bonus Ball",
                "Match 5 numbers",
                "Match 4 numbers + Bonus Ball",
                "Match 4 numbers",
                "Match 3 numbers + Bonus Ball",
                "Match 3 numbers",
                "Match 2 numbers + Bonus Ball",
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
