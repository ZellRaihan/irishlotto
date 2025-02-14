'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import React from 'react';

type LoadingContextType = {
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined)

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false)
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Reset loading state when route changes
    setIsLoading(false)
  }, [pathname, searchParams])

  return (
    <React.Suspense
      fallback={
        <div className="max-w-[95%] sm:max-w-4xl mx-auto p-2 sm:p-4 py-4 sm:py-8 space-y-4 sm:space-y-8">
          {/* Header Skeleton */}
          <div className="bg-gradient-to-r from-blue-50 to-green-50 p-3 sm:p-4 rounded-xl shadow-sm">
            <div className="text-center space-y-4">
              <div className="space-y-2">
                <div className="skeleton h-8 w-3/4 mx-auto rounded-lg"></div>
                <div className="skeleton h-6 w-1/2 mx-auto rounded-lg"></div>
              </div>
            </div>
          </div>

          {/* Results Grid Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-lg p-6">
                <div className="skeleton h-6 w-1/3 mb-4 rounded-lg"></div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {[...Array(6)].map((_, j) => (
                    <div key={j} className="skeleton w-10 h-10 rounded-full"></div>
                  ))}
                  <div className="skeleton w-10 h-10 rounded-full"></div>
                </div>
                <div className="space-y-2">
                  <div className="skeleton h-4 w-1/4 rounded-lg"></div>
                  <div className="skeleton h-6 w-1/2 rounded-lg"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Prize Breakdown Skeleton */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="skeleton h-6 w-1/4 mb-6 rounded-lg"></div>
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex justify-between">
                  <div className="skeleton h-4 w-1/4 rounded-lg"></div>
                  <div className="skeleton h-4 w-1/6 rounded-lg"></div>
                  <div className="skeleton h-4 w-1/5 rounded-lg"></div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ Skeleton */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="skeleton h-6 w-1/3 mb-6 rounded-lg"></div>
            <div className="space-y-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="skeleton h-5 w-2/3 rounded-lg"></div>
                  <div className="skeleton h-4 w-5/6 rounded-lg"></div>
                  <div className="skeleton h-4 w-4/6 rounded-lg"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      }
    >
      <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
        {children}
        {isLoading && (
          <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="space-y-4 text-center">
              <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
              <div className="text-gray-600 font-medium">Loading...</div>
            </div>
          </div>
        )}
      </LoadingContext.Provider>
    </React.Suspense>
  )
}

export function useLoading() {
  const context = useContext(LoadingContext)
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider')
  }
  return context
}
