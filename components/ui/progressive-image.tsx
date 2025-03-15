"use client"

import { useState, useEffect } from "react"
import Image, { ImageProps } from "next/image"
import { cn } from "@/lib/utils"

interface ProgressiveImageProps extends Omit<ImageProps, "src" | "alt"> {
  src: string
  lowResSrc?: string
  alt: string
  className?: string
  imgClassName?: string
  containerClassName?: string
  showLoadingIndicator?: boolean
}

export function ProgressiveImage({
  src,
  lowResSrc,
  alt,
  className,
  imgClassName,
  containerClassName,
  showLoadingIndicator = false,
  ...props
}: ProgressiveImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [currentSrc, setCurrentSrc] = useState(lowResSrc || src)

  useEffect(() => {
    // Reset loading state when src changes
    setIsLoading(true)
    setCurrentSrc(lowResSrc || src)
    
    // Preload high-res image
    const img = new window.Image()
    img.src = src
    img.onload = () => {
      setCurrentSrc(src)
      setIsLoading(false)
    }
  }, [src, lowResSrc])

  return (
    <div className={cn("relative overflow-hidden", containerClassName)}>
      <Image
        src={currentSrc}
        alt={alt}
        className={cn(
          "transition-all duration-500",
          isLoading && "scale-105 blur-sm",
          imgClassName
        )}
        onLoadingComplete={() => {
          if (currentSrc === src) {
            setIsLoading(false)
          }
        }}
        {...props}
      />
      
      {showLoadingIndicator && isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/10">
          <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
        </div>
      )}
    </div>
  )
} 