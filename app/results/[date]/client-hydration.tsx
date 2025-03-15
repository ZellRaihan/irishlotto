"use client"

import { useEffect } from "react"
import { ClientDatePicker } from "@/components/client-date-picker"

interface ClientHydrationProps {
  date: string
}

export function ClientHydration({ date }: ClientHydrationProps) {
  useEffect(() => {
    // Find all server-rendered date pickers and replace them with client components
    const serverDatePickers = document.querySelectorAll('.client-only-datepicker')
    
    serverDatePickers.forEach((element, index) => {
      // Create a container for the client component
      const clientContainer = document.createElement('div')
      clientContainer.id = `client-datepicker-${index}`
      clientContainer.className = element.className
      
      // Replace the server component with the client container
      element.parentNode?.replaceChild(clientContainer, element)
      
      // Render the client component into the container
      const root = document.createElement('div')
      root.dataset.clientDatepicker = date
      clientContainer.appendChild(root)
    })
  }, [date])
  
  return null
} 