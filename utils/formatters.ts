import { format } from "date-fns"
import { enIE } from "date-fns/locale"
import { toZonedTime } from "date-fns-tz"
import { formatInTimeZone } from "date-fns-tz"

const dublinTz = 'Europe/Dublin'

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatDate(date: string | Date): string {
  const dateObj = typeof date === "string" ? new Date(date) : date
  // Convert to Dublin time
  const dublinDate = toZonedTime(dateObj, dublinTz)
  return format(dublinDate, "EEEE, do MMMM yyyy", { locale: enIE })
}

export function formatShortDate(date: string | Date): string {
  const dateObj = typeof date === "string" ? new Date(date) : date
  // Convert to Dublin time
  const dublinDate = toZonedTime(dateObj, dublinTz)
  return format(dublinDate, "yyyy-MM-dd")
}

export function formatDublinDate(date: string | Date): string {
  const dateObj = typeof date === "string" ? new Date(date) : date
  // Convert to Dublin time
  const dublinDate = toZonedTime(dateObj, dublinTz)
  return format(dublinDate, "do MMMM EEEE yyyy", { locale: enIE }) + " Irish Lotto Results"
}

export function formatFullDate(date: Date | string): string {
  const d = new Date(date)
  const day = d.getDate()
  const suffix = (day: number) => {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
      case 1: return "st";
      case 2: return "nd";
      case 3: return "rd";
      default: return "th";
    }
  }
  return `${day}${suffix(day)} ${format(d, "MMMM EEEE yyyy")}`
}

// Helper function to get current Dublin time
export function getCurrentDublinTime(): Date {
  return toZonedTime(new Date(), dublinTz)
}

// Helper function to convert any date to Dublin timezone consistently
export function convertToDublinTime(date: Date | string): Date {
  // First ensure we have a proper Date object
  const dateObj = typeof date === "string" ? new Date(date) : date;
  
  // Convert to Dublin timezone string in ISO format
  const dublinDateString = formatInTimeZone(
    dateObj,
    dublinTz,
    'yyyy-MM-dd\'T\'HH:mm:ss.SSS'
  );
  
  // Create a new Date object from the Dublin timezone string
  return new Date(dublinDateString);
}
