'use client'

import { LuMenu } from 'react-icons/lu'

import { useSidebar } from './sidebar-context'

export function MobileSidebarTrigger() {
  const { openSidebar } = useSidebar()

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center border-b border-zinc-200 bg-zinc-100 px-4 md:hidden">
      <button
        aria-label="Abrir menu"
        className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-emerald-600 text-white transition hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
        onClick={openSidebar}
        type="button"
      >
        <LuMenu aria-hidden="true" className="h-5 w-5" />
      </button>
    </header>
  )
}
