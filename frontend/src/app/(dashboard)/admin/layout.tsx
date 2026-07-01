import type { Metadata } from 'next'
import { Sidebar } from './_components/sidebar'
import { auth } from '@/auth'
import { MobileSidebarTrigger } from './_components/mobile-sidebar-trigger'
import { SidebarProvider } from './_components/sidebar-context'


export const metadata: Metadata = {
  title: 'Dashboard',
}

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-zinc-100 md:grid md:grid-cols-[18rem_1fr]">
        <Sidebar userName={session?.user?.name} />
        <div className="min-w-0 md:h-screen md:overflow-y-auto">
          <MobileSidebarTrigger />
          {children}
        </div>
      </div>
    </SidebarProvider>
  )
}
