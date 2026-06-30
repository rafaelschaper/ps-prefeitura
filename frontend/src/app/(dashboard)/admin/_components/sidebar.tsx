import {
  DashboardSidebarNavItem,
  type DashboardSidebarItem,
} from '@/components/dashboard/sidebar'

type SidebarProps = {
  userName?: string | null
}

const navItems: DashboardSidebarItem[] = [
  {
    label: 'Usuarios',
    href: '#',
    isDisabled: true,
  },
  {
    label: 'Calendario',
    href: '#',
    isDisabled: true,
  },
  {
    label: 'Post',
    href: '/admin/postagens',
    isActive: true,
  },
  {
    label: 'Documentos',
    href: '#',
    isDisabled: true,
  },
]

export function Sidebar({ userName }: SidebarProps) {
  return (
    <aside className="flex min-h-screen w-full flex-col bg-emerald-600 px-8 py-24 text-white sm:w-[216px] sm:px-7">
      <div className="mb-10 flex flex-col items-center text-center">
        <p className="mt-5 w-full text-left text-xl text-emerald-100">
          <span className="font-bold text-lime-300">Ola, </span>
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
