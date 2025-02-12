'use client';

import { format, isWednesday, isSaturday, isBefore, startOfDay, parseISO } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
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

export interface LotteryDatePickerProps {
  selected: Date;
  className?: string;
}

export default function LotteryDatePicker({ selected, className }: LotteryDatePickerProps) {
  const router = useRouter();

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
    if (date) {
      const formattedDate = format(date, "yyyy-MM-dd")
      router.push(`/results/${formattedDate}`);
    }
  }

  return (
    <Popover>
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
      <PopoverContent className="w-auto p-0">
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
  );
}
