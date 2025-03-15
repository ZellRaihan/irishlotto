"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import LotteryDatePicker from "@/components/lottery-date-picker"
import { format } from "date-fns"
import { Spinner } from "@/components/ui/spinner"

interface ResultsDatePickerProps {
  selected: Date
  className?: string
}

export function ResultsDatePicker({ selected, className }: ResultsDatePickerProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [localSelected, setLocalSelected] = useState<Date>(selected)

  // Create a custom wrapper around the date picker
  // We can't directly modify the LotteryDatePicker component
  // So we'll create a wrapper that handles the loading state

  return (
    <div className="relative">
      {/* The original LotteryDatePicker will handle navigation internally */}
      <LotteryDatePicker 
        selected={localSelected}
        className={className}
      />
      
      {isPending && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/80 rounded-lg">
          <Spinner size="sm" color="primary" />
        </div>
      )}
    </div>
  )
}
