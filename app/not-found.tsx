'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function NotFound() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to home page after a brief delay
    const timeout = setTimeout(() => {
      router.push('/')
    }, 100)

    return () => clearTimeout(timeout)
  }, [router])

  // Return null since we're redirecting immediately
  return null
}