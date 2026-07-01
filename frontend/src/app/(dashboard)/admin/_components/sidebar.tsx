import {
  DashboardSidebarNavItem,
  type DashboardSidebarItem,
} from '@/components/dashboard/sidebar'
import { LuHouse, LuNewspaper } from 'react-icons/lu'
import Image from 'next/image'

import navLogo from '@/assets/img/nav-logo.png'

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
  return (
    <aside className="flex min-h-screen w-full flex-col bg-emerald-600 px-8 py-24 text-white sm:px-7">
      <div className="mb-10 flex flex-col items-center text-center">
        <Image 
          src={navLogo} 
          alt="Logo" 
          className="size-40" />
        <p className="mt-5 w-full text-left text-2xl text-emerald-100">
          <span className="font-bold text-lime-300">Olá, </span>
          <span className="font-light italic">{userName || 'Admin'}</span>
        </p>
      </div>

      <nav aria-label="Navegacao administrativa">
        <ul className="space-y-3">
          {navItems.map((item) => (
            <li key={item.label}>
              <DashboardSidebarNavItem item={item} />
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}
