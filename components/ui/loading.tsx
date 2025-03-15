import { cn } from "@/lib/utils"
import { Spinner } from "./spinner"
import { LotteryLogo } from "@/components/lottery-logo"

interface LoadingProps {
  variant?: "spinner" | "skeleton" | "logo" | "dots"
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
  text?: string
  fullScreen?: boolean
}

export function Loading({
  variant = "spinner",
  size = "md",
  className,
  text,
  fullScreen = false,
}: LoadingProps) {
  const containerClasses = cn(
    "flex flex-col items-center justify-center",
    fullScreen && "fixed inset-0 bg-white/80 backdrop-blur-sm z-50",
    !fullScreen && "p-4",
    className
  )

  const renderLoadingIndicator = () => {
    switch (variant) {
      case "spinner":
        return <Spinner size={size} color="primary" />
      
      case "logo":
        return (
          <div className="relative animate-pulse">
            <LotteryLogo variant="lotto" className={cn(
              size === "sm" && "h-8",
              size === "md" && "h-12",
              size === "lg" && "h-16",
              size === "xl" && "h-24",
            )} />
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
              <LoadingDots />
            </div>
          </div>
        )
      
      case "skeleton":
        return (
          <div className={cn(
            "animate-pulse rounded-md bg-gray-200",
            size === "sm" && "h-4 w-16",
            size === "md" && "h-6 w-24",
            size === "lg" && "h-8 w-32",
            size === "xl" && "h-12 w-48",
          )} />
        )
      
      case "dots":
        return <LoadingDots size={size} />
      
      default:
        return <Spinner size={size} color="primary" />
    }
  }

  return (
    <div className={containerClasses}>
      {renderLoadingIndicator()}
      {text && (
        <p className={cn(
          "mt-4 text-gray-600 font-medium",
          size === "sm" && "text-xs",
          size === "md" && "text-sm",
          size === "lg" && "text-base",
          size === "xl" && "text-lg",
        )}>
          {text}
        </p>
      )}
    </div>
  )
}

interface LoadingDotsProps {
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
}

export function LoadingDots({ size = "md", className }: LoadingDotsProps) {
  const dotSizeClasses = {
    sm: "w-1 h-1",
    md: "w-1.5 h-1.5",
    lg: "w-2 h-2",
    xl: "w-2.5 h-2.5"
  }

  const gapClasses = {
    sm: "gap-1",
    md: "gap-1.5",
    lg: "gap-2",
    xl: "gap-2.5"
  }

  return (
    <div className={cn("flex", gapClasses[size], className)}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={cn(
            "rounded-full bg-blue-600",
            dotSizeClasses[size],
            "animate-bounce",
          )}
          style={{
            animationDelay: `${i * 0.15}s`,
            animationDuration: "0.8s"
          }}
        />
      ))}
    </div>
  )
} 