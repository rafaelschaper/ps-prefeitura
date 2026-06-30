import type { Metadata } from 'next'
import { Sidebar } from './_components/sidebar'
import { auth } from '@/auth'


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
    <div className="md:grid md:grid-cols-[18rem_1fr]">
      <Sidebar userName={session?.user?.name} />
      <div className="md:h-screen md:overflow-y-auto">{children}</div>
    </div>
  )
}