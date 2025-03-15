"use client"

import { Button } from "./button"
import { Spinner } from "./spinner"
import { cn } from "@/lib/utils"
import { ButtonProps } from "@/components/ui/button"
import { forwardRef } from "react"

interface LoadingButtonProps extends ButtonProps {
  isLoading?: boolean
  loadingText?: string
  spinnerColor?: "default" | "primary" | "secondary" | "white"
}

const LoadingButton = forwardRef<HTMLButtonElement, LoadingButtonProps>(
  ({ 
    children, 
    className, 
    isLoading = false, 
    loadingText, 
    spinnerColor = "white",
    disabled,
    ...props 
  }, ref) => {
    return (
      <Button
        className={cn(className)}
        disabled={disabled || isLoading}
        ref={ref}
        {...props}
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <Spinner size="sm" color={spinnerColor} />
            {loadingText || children}
          </div>
        ) : (
          children
        )}
      </Button>
    )
  }
)

LoadingButton.displayName = "LoadingButton"

export { LoadingButton } 