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
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <header className="bg-green-600 text-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <nav className="flex items-center justify-between">
                <Link href="/" className="text-2xl font-bold">
                  Irish Lottery
                </Link>
                <div className="space-x-4">
                  <Link href="/" className="hover:underline">
                    Home
                  </Link>
                  <Link href="/results/archive" className="hover:underline">
                    Archive
                  </Link>
                </div>
              </nav>
            </div>
          </header>

          <main className="flex-grow bg-gray-100">{children}</main>

          <footer className="bg-gradient-to-r from-green-800 to-green-900 text-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold">Irish Lottery</h3>
                  <p className="text-sm text-gray-300">
                    Your trusted source for Irish lottery results and information.
                  </p>
                  <p className="text-sm text-gray-300">Built with ❤️ by Raihan</p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-3">Quick Links</h4>
                  <ul className="space-y-2">
                    <li>
                      <Link href="/" className="text-sm hover:text-green-300 transition-colors">
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link href="/results/archive" className="text-sm hover:text-green-300 transition-colors">
                        Archive
                      </Link>
                    </li>
                    <li>
                      <Link href="/about" className="text-sm hover:text-green-300 transition-colors">
                        About Us
                      </Link>
                    </li>
                    <li>
                      <Link href="/contact" className="text-sm hover:text-green-300 transition-colors">
                        Contact
                      </Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-3">Legal</h4>
                  <ul className="space-y-2">
                    <li>
                      <Link href="/terms" className="text-sm hover:text-green-300 transition-colors">
                        Terms & Conditions
                      </Link>
                    </li>
                    <li>
                      <Link href="/privacy" className="text-sm hover:text-green-300 transition-colors">
                        Privacy Policy
                      </Link>
                    </li>
                    <li>
                      <Link href="/responsible-gaming" className="text-sm hover:text-green-300 transition-colors">
                        Responsible Gaming
                      </Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-3">Connect With Us</h4>
                  <div className="flex space-x-4">
                    <a href="#" className="text-white hover:text-green-300 transition-colors">
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path
                          fillRule="evenodd"
                          d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                    <a href="#" className="text-white hover:text-green-300 transition-colors">
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
              <div className="mt-8 pt-8 border-t border-green-700 text-center text-sm text-gray-300">
                <p>&copy; {new Date().getFullYear()} Irish Lottery. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}

