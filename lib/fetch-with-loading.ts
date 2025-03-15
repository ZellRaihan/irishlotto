"use client"

import { toast } from "sonner"

interface FetchWithLoadingOptions<T> {
  url: string
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH"
  body?: any
  headers?: HeadersInit
  onSuccess?: (data: T) => void
  onError?: (error: Error) => void
  loadingMessage?: string
  successMessage?: string
  errorMessage?: string
  showToasts?: boolean
  setLoading?: (isLoading: boolean) => void
}

export async function fetchWithLoading<T>({
  url,
  method = "GET",
  body,
  headers = {},
  onSuccess,
  onError,
  loadingMessage = "Loading...",
  successMessage,
  errorMessage = "An error occurred. Please try again.",
  showToasts = true,
  setLoading,
}: FetchWithLoadingOptions<T>): Promise<T | null> {
  let toastId: string | number | undefined

  try {
    // Start loading
    if (setLoading) setLoading(true)
    if (showToasts && loadingMessage) {
      toastId = toast.loading(loadingMessage)
    }

    // Prepare request options
    const requestOptions: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    }

    // Add body for non-GET requests
    if (method !== "GET" && body) {
      requestOptions.body = JSON.stringify(body)
    }

    // Make the request
    const response = await fetch(url, requestOptions)

    // Handle non-2xx responses
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(
        errorData.message || `Request failed with status ${response.status}`
      )
    }

    // Parse response
    const data = await response.json() as T

    // Handle success
    if (onSuccess) {
      onSuccess(data)
    }

    // Show success toast if needed
    if (showToasts && successMessage) {
      if (toastId) {
        toast.success(successMessage, { id: toastId })
      } else {
        toast.success(successMessage)
      }
    } else if (toastId) {
      toast.dismiss(toastId)
    }

    return data
  } catch (error) {
    // Handle error
    const errorObj = error as Error

    if (onError) {
      onError(errorObj)
    }

    // Show error toast if needed
    if (showToasts) {
      if (toastId) {
        toast.error(errorMessage, { id: toastId })
      } else {
        toast.error(errorMessage)
      }
    }

    console.error("Fetch error:", errorObj)
    return null
  } finally {
    // Stop loading
    if (setLoading) setLoading(false)
  }
} 