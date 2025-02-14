'use client';

import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChevronRight, Home, Search, Clock, ArrowLeft } from "lucide-react"

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Animated Background Circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -left-4 w-24 h-24 bg-green-500/10 rounded-full blur-xl animate-blob"></div>
        <div className="absolute top-1/2 -right-8 w-32 h-32 bg-green-500/10 rounded-full blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-8 left-1/2 w-28 h-28 bg-green-500/10 rounded-full blur-xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-4 text-center">
        {/* 404 SVG */}
        <div className="mb-8 flex justify-center">
          <img src="/404-balls.svg" alt="404 - Page Not Found" className="w-64 h-48" />
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-gray-900">
            <span className="bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
              Oops! Page Not Found
            </span>
          </h1>
          
          <p className="text-gray-600 text-lg">
            Looks like this page has gone missing, just like those elusive winning numbers!
          </p>

          {/* Quick Links */}
          <div className="grid gap-4 md:grid-cols-2 mt-8">
            <Link 
              href="/"
              className="flex items-center justify-center space-x-2 bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 group"
            >
              <Home className="w-5 h-5 text-green-600" />
              <span className="text-gray-700">Return Home</span>
              <ChevronRight className="w-5 h-5 text-green-600 transform group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link 
              href="/results/history"
              className="flex items-center justify-center space-x-2 bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 group"
            >
              <Search className="w-5 h-5 text-green-600" />
              <span className="text-gray-700">Search Results</span>
              <ChevronRight className="w-5 h-5 text-green-600 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Helpful Tips */}
          <div className="mt-12 bg-white rounded-2xl shadow-md p-6 space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Looking for something specific?</h2>
            
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-1">
                  <Clock className="w-4 h-4 text-green-600" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-gray-600">
                    Check our <Link href="/results/history" className="text-green-600 hover:underline">results history</Link> for past lottery draws
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-1">
                  <Search className="w-4 h-4 text-green-600" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-gray-600">
                    Visit our <Link href="/faq" className="text-green-600 hover:underline">FAQ page</Link> for common questions
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Back Button */}
          <button 
            onClick={() => router.back()}
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors mt-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Go Back</span>
          </button>
        </div>
      </div>
    </div>
  )
}
