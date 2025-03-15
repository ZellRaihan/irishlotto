"use client"

import { useEffect } from "react"

interface PreloadResourcesProps {
  resources?: string[]
}

export function PreloadResources({ resources = [] }: PreloadResourcesProps) {
  useEffect(() => {
    // Default critical resources to preload
    const defaultResources = [
      "/wave.svg",
      "/og-image.webp",
    ]

    // Combine default and custom resources (removing duplicates)
    const allResources = [...defaultResources]
    
    // Add resources that aren't already in the array
    resources.forEach(resource => {
      if (!allResources.includes(resource)) {
        allResources.push(resource)
      }
    })

    // Preload images
    allResources.forEach(src => {
      const img = new Image()
      img.src = src
    })
  }, [resources])

  // This component doesn't render anything
  return null
} 