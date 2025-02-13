import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { constructMetadata } from './seo.config'
import JsonLd from '@/components/json-ld'

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  ...constructMetadata({
    title: "Irish Lotto Results",
    description: "Get the latest Irish Lotto results, check winning numbers, and view historical draws. Your trusted source for Irish National Lottery information.",
  }),
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
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
        <link rel="icon" href="/Irish Lotto Results.webp" type="image/webp" />
        <link rel="shortcut icon" href="/Irish Lotto Results.webp" type="image/webp" />
        <link rel="apple-touch-icon" href="/Irish Lotto Results.webp" />
      </head>
      <body className={inter.className}>
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
