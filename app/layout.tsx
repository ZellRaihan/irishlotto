import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { constructMetadata } from './seo.config'
import JsonLd from '@/components/json-ld'
import { cn } from '@/lib/utils'
import Script from 'next/script'
import { Toaster } from 'sonner'
import { LoadingProvider } from '@/components/loading-provider'

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  preload: true,
  adjustFontFallback: false,
  fallback: ['system-ui', 'arial'],
})

const baseUrl = process.env.NODE_ENV === 'production'
  ? 'https://www.irishlottoresults.co.uk'
  : 'http://localhost:3000'

export const viewport: Viewport = {
  themeColor: '#22c55e',
  width: 'device-width',
  initialScale: 1
}

export const metadata: Metadata = {
  ...constructMetadata({
    title: "Irish Lotto Results - Latest Winning Numbers & Prize Breakdown",
    description: "Get instant Irish Lotto results, winning numbers, and prize breakdowns for all 3 draws. Updated live after each Wednesday and Saturday draw. Check your tickets now!",
    url: baseUrl,
  }),
  metadataBase: new URL(baseUrl),
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' }
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ]
  },
  manifest: '/site.webmanifest',
  formatDetection: {
    telephone: false
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en-IE" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preload" href="/wave.svg" as="image" type="image/svg+xml" fetchPriority="high" />
        <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" />
        
        {/* Default favicon */}
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        
        {/* Multiple PNG Sizes */}
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png" />
        
        {/* Apple Touch Icon */}
        <link 
          rel="apple-touch-icon"
          href="/apple-touch-icon.png"
        />
        <meta name="apple-mobile-web-app-title" content="Irish Lotto" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        
        {/* Android Chrome Icons */}
        <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png" />
        
        {/* Web App Manifest */}
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Browser Theme */}
        <meta name="theme-color" content="#22c55e" />
        <meta name="msapplication-TileColor" content="#22c55e" />
        <meta name="application-name" content="Irish Lotto" />
        
        {/* Google AdSense */}
        <script 
          async 
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3793157906983146"
          crossOrigin="anonymous"
        />
        
        {/* Viewport */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Cache Control - Updated for better performance */}
        <meta httpEquiv="Cache-Control" content="public, max-age=300, stale-while-revalidate=3600" />
        <meta httpEquiv="Pragma" content="public" />
        <meta httpEquiv="Expires" content="300" />
        
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-Y4N21QTYZ1"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-Y4N21QTYZ1');
          `}
        </Script>
      </head>
      <body className={cn("min-h-screen bg-background font-sans antialiased", inter.className)}>
        <LoadingProvider initialLoadDelay={500}>
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <div className="flex-1">
              <main>
                {children}
              </main>
            </div>
            <Footer />
          </div>
          <Toaster position="top-right" richColors closeButton />
          <JsonLd type="Website" />
          <JsonLd type="Organization" />
        </LoadingProvider>
      </body>
    </html>
  )
}
