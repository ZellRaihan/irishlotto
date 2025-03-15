'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Home, Search, Calendar } from 'lucide-react'
import { constructMetadata } from './seo.config'
import { Metadata } from 'next'

export const metadata: Metadata = constructMetadata({
  title: "Page Not Found | Irish Lotto Results",
  description: "The page you're looking for could not be found. Browse our latest lottery results or search for specific dates.",
})

export default function NotFound() {
  return (
    <div className="container max-w-4xl mx-auto px-4 py-16 text-center">
      <div className="space-y-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 mb-4">
          <span className="text-4xl font-bold text-blue-600">404</span>
        </div>
        
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">Page Not Found</h1>
        
        <p className="text-lg text-gray-600 max-w-lg mx-auto">
          The page you're looking for doesn't exist or has been moved. 
          Please check the URL or try one of the options below.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Button asChild variant="default" className="gap-2">
            <Link href="/">
              <Home className="w-4 h-4" />
              Go to Homepage
            </Link>
          </Button>
          
          <Button asChild variant="outline" className="gap-2">
            <Link href="/results/history">
              <Calendar className="w-4 h-4" />
              Browse Results History
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}