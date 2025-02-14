import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { constructMetadata } from './seo.config'
import JsonLd from '@/components/json-ld'
import { LoadingProvider } from "@/components/loading-provider"
import { cn } from '@/lib/utils'

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  preload: true,
  adjustFontFallback: false,
  fallback: ['system-ui', 'arial'],
})

const baseUrl = process.env.VERCEL_URL 
  ? `https://${process.env.VERCEL_URL}`
  : process.env.NODE_ENV === 'production'
    ? 'https://www.irishlottoresults.co.uk'
    : 'http://localhost:3000'

export const metadata: Metadata = {
  ...constructMetadata({
    title: "Irish Lotto Results - Latest Winning Numbers & Prize Breakdown",
    description: "Get instant Irish Lotto results, winning numbers, and prize breakdowns for all 3 draws. Updated live after each Wednesday and Saturday draw. Check your tickets now!",
    url: baseUrl,
  }),
  metadataBase: new URL(baseUrl),
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' }
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ],
    other: [
      { rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#22c55e' }
    ]
  },
  manifest: '/site.webmanifest',
  formatDetection: {
    telephone: false
  }
}

export const revalidate = 0; // Disable caching for all pages

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preload" href="/wave.svg" as="image" type="image/svg+xml" fetchPriority="high" />
        <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#22c55e" />
        <meta name="msapplication-TileColor" content="#22c55e" />
        <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
      </head>
      <body className={cn("min-h-screen bg-background font-sans antialiased", inter.className)}>
        <div className="relative flex min-h-screen flex-col">
          <Header />
          <div className="flex-1">
            <LoadingProvider>
              <main className="py-6">
                {children}
              </main>
            </LoadingProvider>
          </div>
          <Footer />
        </div>
      </body>
    </html>
  )
}
