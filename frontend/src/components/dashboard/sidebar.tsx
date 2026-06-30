import Link from 'next/link'

import { cn } from '@/lib/utils'

export type DashboardSidebarItem = {
  label: string
  href: string
  isActive?: boolean
  isDisabled?: boolean
}

type DashboardSidebarNavItemProps = {
  item: DashboardSidebarItem
}

export function DashboardSidebarNavItem({
  item,
}: DashboardSidebarNavItemProps) {
  const className = cn(
    'flex items-center gap-3 text-sm font-medium transition',
    item.isActive ? 'font-bold text-white' : 'text-emerald-50',
    item.isDisabled
      ? 'cursor-not-allowed opacity-75'
      : 'hover:text-lime-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80',
  )

  if (item.isDisabled) {
    return (
      <span aria-disabled="true" className={className}>
        {item.label}
      </span>
    )
  }

  return (
    <Link className={className} href={item.href}>
      {item.label}
    </Link>
  )
}