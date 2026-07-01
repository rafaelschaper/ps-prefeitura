import Link from 'next/link'
import type { IconType } from 'react-icons'

export type DashboardSidebarItem = {
  Icon?: IconType
  label: string
  href: string
  isActive?: boolean
  isDisabled?: boolean
}

type DashboardSidebarNavItemProps = {
  item: DashboardSidebarItem
  onNavigate?: () => void
}

export function DashboardSidebarNavItem({
  item,
  onNavigate,
}: DashboardSidebarNavItemProps) {
  const Icon = item.Icon

  const content = (
    <>
      {Icon ? <Icon aria-hidden="true" className="h-5 w-5 shrink-0" /> : null}
      <span>{item.label}</span>
    </>
  )

  return (
    <Link
      className="flex max-w-full items-center gap-3 rounded-xl bg-emerald-500 p-3 font-medium transition hover:text-lime-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
      href={item.href}
      onClick={onNavigate}
    >
      {content}
    </Link>
  )
}
