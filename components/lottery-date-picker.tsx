'use client';

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarIcon } from "lucide-react"
import { format, parseISO } from "date-fns"
import { enIE } from "date-fns/locale"
import { toZonedTime } from "date-fns-tz"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"

interface LotteryDatePickerProps {
  selected: Date;
  showGetResults?: boolean;
  className?: string;
}

export default function LotteryDatePicker({ selected, showGetResults = true, className }: LotteryDatePickerProps) {
  const router = useRouter();

  // Convert the selected date to Irish time
  const dublinDate = toZonedTime(selected, 'Europe/Dublin')

  const handleGetResults = (date: Date | undefined) => {
    if (date) {
      // Convert the selected date to Dublin timezone
      const dublinTime = toZonedTime(date, 'Europe/Dublin')
      // Format date in YYYY-MM-DD format in Dublin timezone
      const formattedDate = format(dublinTime, "yyyy-MM-dd")
      router.push(`/results/${formattedDate}`);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row w-full sm:w-auto">
      <div className="flex w-full sm:w-auto bg-white rounded-lg sm:rounded-none sm:rounded-l-lg shadow-sm">
        <Popover>
          <PopoverTrigger asChild>
            <Button 
              variant="ghost" 
              className={cn(
                "w-full sm:w-[280px] justify-start text-left font-normal pl-3",
                "rounded-l-lg sm:rounded-r-none border-r border-gray-200",
                "hover:bg-white focus:ring-0 focus:ring-offset-0",
                className
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4 flex-shrink-0" />
              <span className="truncate">
                {format(dublinDate, "EEEE, do MMMM yyyy", { locale: enIE })}
              </span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={dublinDate}
              onSelect={handleGetResults}
              disabled={(date) => {
                // Convert the date to Dublin time for checking the day
                const dublinTime = toZonedTime(date, 'Europe/Dublin')
                const day = dublinTime.getDay()
                return day !== 3 && day !== 6 // Only allow Wednesdays and Saturdays
              }}
              locale={enIE}
              initialFocus
              className="rounded-lg border shadow-md"
              fromDate={toZonedTime(new Date("2022-01-01"), 'Europe/Dublin')}
              toDate={toZonedTime(new Date(), 'Europe/Dublin')}
            />
          </PopoverContent>
        </Popover>
      </div>
      {showGetResults && (
        <Button 
          onClick={() => handleGetResults(dublinDate)}
          className={cn(
            "w-full sm:w-auto mt-2 sm:mt-0",
            "rounded-lg sm:rounded-none sm:rounded-r-lg",
            "bg-gray-900 hover:bg-gray-800"
          )}
        >
          Get Results
        </Button>
      )}
    </div>
  );
}
