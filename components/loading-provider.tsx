'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

type LoadingContextType = {
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined)

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false)
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Show loading on route change
  useEffect(() => {
    setIsLoading(true)
    // Hide loading after a minimum delay
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 500) // Minimum loading time of 500ms

    return () => clearTimeout(timer)
  }, [pathname, searchParams])

  return (
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
  )
}

export function useLoading() {
  const context = useContext(LoadingContext)
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider')
  }
  return context
}
