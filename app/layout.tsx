import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { constructMetadata } from './seo.config'
import JsonLd from '@/components/json-ld'
import { LoadingProvider } from "@/components/loading-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  ...constructMetadata({
    title: "Irish Lotto Results - Latest Winning Numbers & Prize Breakdown",
    description: "Get instant Irish Lotto results, winning numbers, and prize breakdowns for all 3 draws. Updated live after each Wednesday and Saturday draw. Check your tickets now!",
  }),
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
      { rel: 'mask-icon', url: '/android-chrome-192x192.png' }
    ]
  },
  manifest: '/site.webmanifest',
  themeColor: '#ffffff',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
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
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="format-detection" content="telephone=no" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={inter.className}>
        <div className="relative min-h-screen flex flex-col">
          <JsonLd type="Website" />
          <JsonLd type="Organization" />
          <Header />
          <LoadingProvider>
            <main className="flex-1">
              <div className="py-6">
                {children}
              </div>
            </main>
          </LoadingProvider>
          <Footer />
        </div>
      </body>
    </html>
  )
}
