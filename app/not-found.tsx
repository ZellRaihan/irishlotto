'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Home, Search, Calendar } from 'lucide-react'
import { constructMetadata } from './seo.config'
import { Metadata } from 'next'

export const metadata: Metadata = constructMetadata({
  title: "Page Not Found | Irish Lotto Results",
  description: "The page you are looking for does not exist. Please check the URL or navigate back to the homepage.",
  type: "website",
})

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-4 text-center">
      <div className="max-w-md space-y-6">
        <div className="space-y-2">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8 text-blue-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Page Not Found</h1>
          <p className="text-gray-600">
            The page you are looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" passHref>
            <Button className="bg-blue-600 hover:bg-blue-700">
              Go to homepage
            </Button>
          </Link>
          <Link href="/results/history" passHref>
            <Button variant="outline" className="border-gray-300 text-gray-700">
              View Results History
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}