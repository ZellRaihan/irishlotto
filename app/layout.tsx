import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import "@fontsource/inter/400.css"
import "@fontsource/inter/500.css"
import "@fontsource/inter/600.css"
import "@fontsource/inter/700.css"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { constructMetadata } from './seo.config'
import JsonLd from '@/components/json-ld'

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://irishlottoresults.vercel.app"),
  title: {
    default: "Irish Lotto Results Tonight 3 Draws - CHECK NOW",
    template: "%s | Irish Lotto Results"
  },
  description: "Check the latest Irish Lotto results, including Lotto Plus 1 and Plus 2. View prize breakdowns and historical results.",
  openGraph: {
    title: "Irish Lotto Results Tonight 3 Draws - CHECK NOW",
    description: "Check the latest Irish Lotto results, including Lotto Plus 1 and Plus 2. View prize breakdowns and historical results.",
    url: "https://irishlottoresults.vercel.app",
    siteName: "Irish Lotto Results",
    locale: "en_IE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Irish Lotto Results Tonight 3 Draws - CHECK NOW",
    description: "Check the latest Irish Lotto results, including Lotto Plus 1 and Plus 2. View prize breakdowns and historical results.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/Irish Lotto Results.webp',
    shortcut: '/Irish Lotto Results.webp',
    apple: '/Irish Lotto Results.webp',
  }
}

export const revalidate = 0; // Disable caching for all pages

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
        <link rel="icon" href="/Irish Lotto Results.webp" type="image/webp" />
        <link rel="shortcut icon" href="/Irish Lotto Results.webp" type="image/webp" />
        <link rel="apple-touch-icon" href="/Irish Lotto Results.webp" />
        <link
          rel="preload"
          href="https://cdn1.lottery.ie/media/Games/DBGs/logos/left/rgb/Lotto.svg"
          as="image"
          type="image/svg+xml"
        />
        <link
          rel="preload"
          href="https://cdn1.lottery.ie/media/Games/DBGs/logos/left/rgb/Lotto_plus1.svg"
          as="image"
          type="image/svg+xml"
        />
        <link
          rel="preload"
          href="https://cdn1.lottery.ie/media/Games/DBGs/logos/left/rgb/Lotto_plus2.svg"
          as="image"
          type="image/svg+xml"
        />
      </head>
      <body className={inter.className + " flex min-h-full flex-col bg-gray-50"}>
        <div className="relative min-h-screen flex flex-col">
          <JsonLd type="Website" />
          <JsonLd type="Organization" />
          <Header />
          <main className="flex-1">
            <div className="py-6">
              {children}
            </div>
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
