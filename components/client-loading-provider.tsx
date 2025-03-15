"use client"

import { Suspense } from "react"
import { LoadingProvider } from "./loading-provider"

interface ClientLoadingProviderProps {
  children: React.ReactNode
  initialLoadDelay?: number
}

export function ClientLoadingProvider({
  children,
  initialLoadDelay = 300,
}: ClientLoadingProviderProps) {
  return (
    <Suspense fallback={null}>
      <LoadingProvider initialLoadDelay={initialLoadDelay}>
        {children}
      </LoadingProvider>
    </Suspense>
  )
} 