import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Link from "next/link"
import type React from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Irish Lottery Results",
  description: "Check the latest Irish Lottery results and archives",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-background antialiased`}>
        <div className="relative flex min-h-screen flex-col">
          <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center">
              <div className="mr-4 flex">
                <Link href="/" className="mr-6 flex items-center space-x-2">
                  <span className="font-bold">Irish Lotto Results</span>
                </Link>
              </div>
              <nav className="flex items-center space-x-6 text-sm font-medium">
                <Link
                  href="/"
                  className="transition-colors hover:text-foreground/80 text-foreground"
                >
                  Home
                </Link>
                <Link
                  href="/results/archive"
                  className="transition-colors hover:text-foreground/80 text-foreground"
                >
                  Archive
                </Link>
              </nav>
            </div>
          </header>
          <div className="flex-1">
            <div className="container py-6">
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
