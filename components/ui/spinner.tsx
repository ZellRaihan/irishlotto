import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

interface SpinnerProps {
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
  color?: "default" | "primary" | "secondary" | "white"
}

export function Spinner({ 
  size = "md", 
  className, 
  color = "default" 
}: SpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
    xl: "w-12 h-12"
  }

  const colorClasses = {
    default: "text-gray-600",
    primary: "text-blue-600",
    secondary: "text-green-600",
    white: "text-white"
  }

  return (
    <Loader2 
      className={cn(
        "animate-spin", 
        sizeClasses[size], 
        colorClasses[color], 
        className
      )} 
    />
  )
} 