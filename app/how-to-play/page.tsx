import { Metadata } from "next"
import { constructMetadata } from "../seo.config"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LotteryLogo } from "@/components/lottery-logo"
import { Separator } from "@/components/ui/separator"
import { AlertCircle, Check, Coins, HelpCircle, Target } from "lucide-react"

export const metadata: Metadata = constructMetadata({
  title: "How to Play Irish Lotto | Step by Step Guide & Rules",
  description: "Learn how to play Irish Lotto, Lotto Plus 1, and Lotto Plus 2. Complete guide with rules, odds, prizes, and draw times.",
  keywords: [
    "How to Play Irish Lotto",
    "Irish Lotto Rules",
    "Irish Lotto Guide",
    "Irish Lotto Plus 1",
    "Irish Lotto Plus 2",
    "Irish Lotto Draw Times",
    "Irish Lotto Odds",
    "Irish Lotto Prizes"
  ]
})

export default function HowToPlay() {
  return (
    <main className="container max-w-5xl py-6 space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">How to Play Irish Lotto</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Your complete guide to playing Irish Lotto, Lotto Plus 1, and Lotto Plus 2
        </p>
      </div>

      {/* Main Game Rules */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <LotteryLogo variant="lotto" className="w-8 h-8" />
            <CardTitle>Main Irish Lotto Game</CardTitle>
          </div>
          <CardDescription>The primary Irish Lotto game with the biggest jackpots</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Steps to Play */}
            <div className="space-y-4">
              <h3 className="font-semibold flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-500" />
                How to Play
              </h3>
              <ol className="space-y-2 list-decimal list-inside">
                <li>Choose 6 numbers from 1 to 47</li>
                <li>Buy your ticket before 7:45pm on draw days</li>
                <li>Watch the draw live on RTÉ One</li>
                <li>Match numbers to win prizes</li>
              </ol>
            </div>

            {/* Draw Information */}
            <div className="space-y-4">
              <h3 className="font-semibold flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-blue-500" />
                Draw Information
              </h3>
              <ul className="space-y-2">
                <li><strong>Draw Days:</strong> Wednesday and Saturday</li>
                <li><strong>Draw Time:</strong> 7:55pm (Irish Time)</li>
                <li><strong>Ticket Cost:</strong> €2 per line</li>
                <li><strong>Bonus Ball:</strong> One extra number drawn</li>
              </ul>
            </div>
          </div>

          <Separator />

          {/* Prize Tiers */}
          <div>
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Coins className="w-5 h-5 text-blue-500" />
              Prize Tiers
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Match 6 Numbers</CardTitle>
                  <CardDescription>Jackpot (Minimum €2 Million)</CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Match 5 + Bonus</CardTitle>
                  <CardDescription>Average €100,000</CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Match 5</CardTitle>
                  <CardDescription>Average €1,500</CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Match 4 + Bonus</CardTitle>
                  <CardDescription>Average €150</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Plus Games */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Lotto Plus 1 */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <LotteryLogo variant="lottoPlus1" className="w-8 h-8" />
              <CardTitle>Lotto Plus 1</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-2">
              <li>Additional game for €1 extra per line</li>
              <li>Fixed jackpot of €1 Million</li>
              <li>Same numbers as your main game</li>
              <li>Drawn right after the main draw</li>
            </ul>
          </CardContent>
        </Card>

        {/* Lotto Plus 2 */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <LotteryLogo variant="lottoPlus2" className="w-8 h-8" />
              <CardTitle>Lotto Plus 2</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-2">
              <li>Play for just 50c more per line</li>
              <li>Fixed jackpot of €250,000</li>
              <li>Uses your main game numbers</li>
              <li>Final draw of the evening</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Important Information */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-blue-500" />
            <CardTitle>Important Information</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <h3 className="font-semibold">Tips for Playing</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Keep your ticket safe and sign the back</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Buy tickets early to avoid the rush</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Check results promptly after each draw</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Play responsibly within your means</span>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Claim Period</h3>
              <ul className="space-y-2">
                <li>90 days from the draw date to claim prizes</li>
                <li>Prizes under €100 can be claimed from any lottery retailer</li>
                <li>Larger prizes must be claimed from National Lottery HQ</li>
                <li>Always keep your ticket safe until you claim</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
