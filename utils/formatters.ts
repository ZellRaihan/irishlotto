import { format } from "date-fns"
import { enIE } from "date-fns/locale"
import { toZonedTime } from "date-fns-tz"

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
  const d = new Date(date)
  // Convert to Dublin time
  const dublinDate = toZonedTime(d, dublinTz)
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

// Helper function to get current Dublin time
export function getCurrentDublinTime(): Date {
  return toZonedTime(new Date(), dublinTz)
}
