import { cn } from '@/lib/utils'

type DashboardStatusMessageProps = {
  children: React.ReactNode
  variant?: 'default' | 'error'
}

export function DashboardStatusMessage({
  children,
  variant = 'default',
}: DashboardStatusMessageProps) {
  return (
    <div
      className={cn(
        'rounded-md border px-4 py-10 text-center text-sm',
        variant === 'error'
          ? 'border-red-200 bg-red-50 text-red-700'
          : 'border-zinc-200 bg-white text-zinc-500',
      )}
    >
      {children}
    </div>
  )
}
