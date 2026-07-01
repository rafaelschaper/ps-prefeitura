'use client'

import Image from 'next/image'
import { LuHouse, LuNewspaper } from 'react-icons/lu'

import navLogo from '@/assets/img/nav-logo.png'
import {
  DashboardSidebarNavItem,
  type DashboardSidebarItem,
} from '@/components/dashboard/sidebar'
import { cn } from '@/lib/utils'

import { useSidebar } from './sidebar-context'

type SidebarProps = {
  userName?: string | null
}

const navItems: DashboardSidebarItem[] = [
  {
    Icon: LuHouse,
    label: 'Home',
    href: '/admin',
  },
  {
    Icon: LuNewspaper,
    label: 'Postagens',
    href: '/admin/postagens',
  },
]

export function Sidebar({ userName }: SidebarProps) {
  const { closeSidebar, isOpen } = useSidebar()

  return (
    <>
      {isOpen ? (
        <button
          aria-label="Fechar menu"
          className="fixed inset-0 z-40 bg-zinc-950/40 md:hidden"
          onClick={closeSidebar}
          type="button"
        />
      ) : null}

      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-72 -translate-x-full flex-col bg-emerald-600 px-8 py-20 text-white transition-transform duration-200 sm:px-7 md:static md:z-auto md:min-h-screen md:w-full md:translate-x-0 md:py-24',
          isOpen && 'translate-x-0',
        )}
      >
        <div className="mb-10 flex flex-col items-center text-center">
          <Image alt="Logo" className="size-40" src={navLogo} />
          <p className="mt-5 w-full text-left text-2xl text-emerald-100">
            <span className="font-bold text-lime-300">Olá, </span>
            <span className="font-light italic">{userName || 'Admin'}</span>
          </p>
        </div>

        <nav aria-label="Navegacao administrativa">
          <ul className="space-y-3">
            {navItems.map((item) => (
              <li key={item.label}>
                <DashboardSidebarNavItem
                  item={item}
                  onNavigate={closeSidebar}
                />
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  )
}
