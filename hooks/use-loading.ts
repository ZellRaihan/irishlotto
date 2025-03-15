"use client"

import { useLoading as useLoadingContext } from "@/components/loading-provider"
import { useCallback, useState } from "react"

export function useLoading() {
  const { startLoading, stopLoading, setLoadingText } = useLoadingContext()
  const [isLocalLoading, setIsLocalLoading] = useState(false)

  const startLocalLoading = useCallback(() => {
    setIsLocalLoading(true)
  }, [])

  const stopLocalLoading = useCallback(() => {
    setIsLocalLoading(false)
  }, [])

  // Utility function to wrap async operations with loading state
  const withLoading = useCallback(
    async <T,>(
      asyncFn: () => Promise<T>,
      options?: {
        text?: string
        useGlobal?: boolean
        onSuccess?: (result: T) => void
        onError?: (error: any) => void
      }
    ): Promise<T> => {
      const {
        text = "Loading...",
        useGlobal = false,
        onSuccess,
        onError,
      } = options || {}

      try {
        if (useGlobal) {
          setLoadingText(text)
          startLoading()
        } else {
          startLocalLoading()
        }

        const result = await asyncFn()

        if (onSuccess) {
          onSuccess(result)
        }

        return result
      } catch (error) {
        if (onError) {
          onError(error)
        }
        throw error
      } finally {
        if (useGlobal) {
          stopLoading()
        } else {
          stopLocalLoading()
        }
      }
    },
    [startLoading, stopLoading, setLoadingText, startLocalLoading, stopLocalLoading]
  )

  return {
    // Global loading state
    startLoading,
    stopLoading,
    setLoadingText,
    
    // Local loading state
    isLoading: isLocalLoading,
    startLocalLoading,
    stopLocalLoading,
    
    // Utility function
    withLoading,
  }
} 