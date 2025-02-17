import { Metadata } from "next"
import { constructMetadata } from "../seo.config"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, BrainCircuit, Clock, Heart, HelpCircle, Phone, Shield, Target } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = constructMetadata({
  title: "Responsible Gaming | Play Safe & Stay in Control",
  description: "Learn about responsible gaming practices, set limits, and find support. Your wellbeing matters when playing Irish Lotto.",
  keywords: [
    "Responsible Gaming",
    "Safe Gambling",
    "Gambling Support Ireland",
    "Problem Gambling Help",
    "Irish Lotto Responsible Play",
    "Gambling Limits",
    "Gambling Addiction Help"
  ]
})

export default function ResponsibleGaming() {
  return (
    <main className="container max-w-5xl py-6 space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Responsible Gaming</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Stay in control and enjoy playing safely with our responsible gaming guidelines
        </p>
      </div>

      {/* Key Principles */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2 text-blue-500">
              <Target className="w-5 h-5" />
              <CardTitle className="text-lg">Set Limits</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Set clear time and money limits before you start playing. Stick to them strictly.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2 text-blue-500">
              <BrainCircuit className="w-5 h-5" />
              <CardTitle className="text-lg">Stay Aware</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Gambling should be for entertainment, not a way to make money or escape problems.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2 text-blue-500">
              <Clock className="w-5 h-5" />
              <CardTitle className="text-lg">Take Breaks</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Regular breaks help maintain perspective and prevent excessive play.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Warning Signs */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertCircle className="w-6 h-6 text-red-500" />
            <CardTitle>Warning Signs to Watch For</CardTitle>
          </div>
          <CardDescription>
            Recognize these signs early to maintain healthy gaming habits
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Shield className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                <span>Spending more money than you can afford</span>
              </li>
              <li className="flex items-start gap-2">
                <Shield className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                <span>Gambling to recover losses</span>
              </li>
              <li className="flex items-start gap-2">
                <Shield className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                <span>Borrowing money to gamble</span>
              </li>
              <li className="flex items-start gap-2">
                <Shield className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                <span>Neglecting work or family due to gambling</span>
              </li>
            </ul>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Shield className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                <span>Lying about gambling habits</span>
              </li>
              <li className="flex items-start gap-2">
                <Shield className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                <span>Feeling guilty about gambling</span>
              </li>
              <li className="flex items-start gap-2">
                <Shield className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                <span>Gambling to escape problems</span>
              </li>
              <li className="flex items-start gap-2">
                <Shield className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                <span>Others expressing concern about your gambling</span>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Support Resources */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Heart className="w-6 h-6 text-red-500" />
            <CardTitle>Support Resources</CardTitle>
          </div>
          <CardDescription>
            Help is always available if you need it
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            {/* Helpline */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-blue-500" />
                  <CardTitle className="text-lg">National Problem Gambling Helpline</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="font-semibold">1800 753 753</p>
                  <p className="text-sm text-muted-foreground">24/7 free and confidential support</p>
                  <Link 
                    href="https://www.gamblingcare.ie" 
                    target="_blank"
                    className="text-sm text-blue-500 hover:underline"
                  >
                    Visit gamblingcare.ie
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Additional Support */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-blue-500" />
                  <CardTitle className="text-lg">Additional Support</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link 
                      href="https://www.gamcare.org.uk" 
                      target="_blank"
                      className="text-blue-500 hover:underline"
                    >
                      GamCare
                    </Link>
                    <span className="text-muted-foreground"> - Support, information and counselling</span>
                  </li>
                  <li>
                    <Link 
                      href="https://www.gamblingtherapy.org" 
                      target="_blank"
                      className="text-blue-500 hover:underline"
                    >
                      Gambling Therapy
                    </Link>
                    <span className="text-muted-foreground"> - Free online support worldwide</span>
                  </li>
                  <li>
                    <Link 
                      href="https://www.gamblersanonymous.ie" 
                      target="_blank"
                      className="text-blue-500 hover:underline"
                    >
                      Gamblers Anonymous Ireland
                    </Link>
                    <span className="text-muted-foreground"> - Find local support meetings</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Tools and Tips */}
      <Card>
        <CardHeader>
          <CardTitle>Practical Tools for Safe Play</CardTitle>
          <CardDescription>
            Use these strategies to maintain control of your gaming
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 text-sm font-medium">1</span>
                </div>
                <div>
                  <p className="font-medium">Set a Weekly Budget</p>
                  <p className="text-sm text-muted-foreground">Decide how much you can afford to spend and stick to it strictly</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 text-sm font-medium">2</span>
                </div>
                <div>
                  <p className="font-medium">Use a Time Limit</p>
                  <p className="text-sm text-muted-foreground">Set an alarm to remind you when your playing time is up</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 text-sm font-medium">3</span>
                </div>
                <div>
                  <p className="font-medium">Keep a Gaming Diary</p>
                  <p className="text-sm text-muted-foreground">Track your spending and time to maintain awareness</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 text-sm font-medium">4</span>
                </div>
                <div>
                  <p className="font-medium">Take Regular Breaks</p>
                  <p className="text-sm text-muted-foreground">Step away regularly to maintain perspective</p>
                </div>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Footer Note */}
      <div className="text-center text-sm text-muted-foreground">
        <p>If you&apos;re concerned about your gambling or someone else&apos;s, help is available 24/7.</p>
        <p className="mt-1">Call 1800 753 753 for free, confidential support.</p>
      </div>
    </main>
  )
}
