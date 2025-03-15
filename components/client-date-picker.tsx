"use client"

import { useEffect, useState } from "react"
import { ResultsDatePicker } from "./results-date-picker"

interface ClientDatePickerProps {
  date: string
}

export function ClientDatePicker({ date }: ClientDatePickerProps) {
  const [mounted, setMounted] = useState(false)
  const selectedDate = new Date(date)

  // Only render the client component after mounting to prevent hydration errors
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <ResultsDatePicker selected={selectedDate} />
  )
} 