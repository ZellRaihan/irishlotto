"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import { Loading } from "./ui/loading"
import { usePathname, useSearchParams } from "next/navigation"

interface LoadingContextType {
  isLoading: boolean
  startLoading: () => void
  stopLoading: () => void
  setLoadingText: (text: string) => void
}

const LoadingContext = createContext<LoadingContextType>({
  isLoading: false,
  startLoading: () => {},
  stopLoading: () => {},
  setLoadingText: () => {},
})

export const useLoading = () => useContext(LoadingContext)

interface LoadingProviderProps {
  children: React.ReactNode
  initialLoadDelay?: number
}

export function LoadingProvider({
  children,
  initialLoadDelay = 300,
}: LoadingProviderProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [loadingText, setLoadingText] = useState<string>("Loading...")
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Handle initial page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, initialLoadDelay)

    return () => clearTimeout(timer)
  }, [initialLoadDelay])

  // Handle route changes
  useEffect(() => {
    const handleStart = () => {
      setIsLoading(true)
      setLoadingText("Loading...")
    }

    const handleComplete = () => {
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 300) // Small delay to prevent flashing

      return () => clearTimeout(timer)
    }

    // Reset loading state on route change
    handleStart()
    handleComplete()

    return () => {}
  }, [pathname, searchParams])

  const startLoading = () => setIsLoading(true)
  const stopLoading = () => setIsLoading(false)

  return (
    <LoadingContext.Provider
      value={{
        isLoading,
        startLoading,
        stopLoading,
        setLoadingText,
      }}
    >
      {children}
      {isLoading && (
        <Loading
          variant="logo"
          size="lg"
          text={loadingText}
          fullScreen={true}
        />
      )}
    </LoadingContext.Provider>
  )
} 