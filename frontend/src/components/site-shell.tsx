'use client'

import { usePathname } from 'next/navigation'

import { SiteNavbar } from '@/components/site-navbar'

type SiteShellProps = {
  children: React.ReactNode
}

export function SiteShell({ children }: SiteShellProps) {
  const pathname = usePathname()
  const shouldShowNavbar = !pathname.startsWith('/auth')

  return (
    <>
      {shouldShowNavbar ? <SiteNavbar /> : null}
      {children}
    </>
  )
}
