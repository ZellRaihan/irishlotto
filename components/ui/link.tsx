'use client'

import NextLink from 'next/link'
import type { LinkProps as NextLinkProps } from 'next/link'

interface LinkProps extends NextLinkProps {
  children: React.ReactNode
  className?: string
}

export function Link({ children, className = "", ...props }: LinkProps) {
  return (
    <NextLink className={className} {...props}>
      {children}
    </NextLink>
  )
}
