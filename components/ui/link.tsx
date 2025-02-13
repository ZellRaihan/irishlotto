'use client'

import NextLink from 'next/link'
import { useLoading } from '../loading-provider'
import type { LinkProps as NextLinkProps } from 'next/link'

interface LinkProps extends NextLinkProps {
  children: React.ReactNode
  className?: string
}

export function Link({ children, className = "", ...props }: LinkProps) {
  const { setIsLoading } = useLoading()

  const handleClick = () => {
    setIsLoading(true)
  }

  return (
    <NextLink className={className} onClick={handleClick} {...props}>
      {children}
    </NextLink>
  )
}
