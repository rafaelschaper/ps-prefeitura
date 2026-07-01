'use client'

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { usePathname } from 'next/navigation'

type SidebarContextType = {
  closeSidebar: () => void
  isOpen: boolean
  openSidebar: () => void
}

const SidebarContext = createContext<SidebarContextType | null>(null)

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const value = useMemo(
    () => ({
      closeSidebar: () => setIsOpen(false),
      isOpen,
      openSidebar: () => setIsOpen(true),
    }),
    [isOpen],
  )

  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  )
}

export function useSidebar() {
  const context = useContext(SidebarContext)

  if (!context) {
    throw new Error('useSidebar must be used inside SidebarProvider')
  }

  return context
}
