'use client';

import { format, isWednesday, isSaturday, isBefore, startOfDay } from "date-fns"
import { Calendar as CalendarIcon, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useRouter } from "next/navigation"
import { enIE } from "date-fns/locale"
import { useState, useTransition } from "react"

export interface LotteryDatePickerProps {
  selected: Date;
  className?: string;
}

export default function LotteryDatePicker({ selected, className }: LotteryDatePickerProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  // Function to check if a date is a lottery day (Wednesday or Saturday)
  const isLotteryDay = (date: Date) => {
    return isWednesday(date) || isSaturday(date);
  }

  // Function to check if a date is in the future
  const isFutureDate = (date: Date) => {
    const today = startOfDay(new Date())
    const checkDate = startOfDay(date)
    return isBefore(today, checkDate)
  }

  const handleDateSelect = (date: Date | undefined) => {
    // If no date is selected or it's the same date, just close the popover
    if (!date || date.getTime() === selected.getTime()) {
      setIsOpen(false);
      return;
    }
    
    // Only navigate if a different date is selected
    setIsOpen(false);
    const formattedDate = format(date, "yyyy-MM-dd");
    
    // Use startTransition to show loading state
    startTransition(() => {
      router.push(`/results/${formattedDate}`);
    });
  }

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  }

  return (
    <div className="relative">
      <Popover open={isOpen} onOpenChange={handleOpenChange}>
        <PopoverTrigger asChild>
          <Button 
            variant="outline" 
            className={cn(
              "w-[260px] justify-start text-left font-normal",
              !selected && "text-muted-foreground",
              className
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {format(selected, "EEEE, do MMMM yyyy", { locale: enIE })}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={selected}
            onSelect={handleDateSelect}
            initialFocus
            locale={enIE}
            fromDate={new Date("2022-01-01")}
            toDate={new Date()}
            disabled={(date) => {
              return !isLotteryDay(date) || isFutureDate(date)
            }}
            modifiers={{
              highlighted: (date) => isLotteryDay(date) && !isFutureDate(date)
            }}
            modifiersStyles={{
              highlighted: { fontWeight: 'bold', color: 'green' }
            }}
            classNames={{
              day_selected: "bg-green-600 text-white hover:bg-green-600 hover:text-white focus:bg-green-600 focus:text-white",
              day_today: "bg-accent text-accent-foreground",
            }}
          />
        </PopoverContent>
      </Popover>
      
      {/* Loading overlay */}
      {isPending && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/80 rounded-md">
          <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
        </div>
      )}
    </div>
  );
}
