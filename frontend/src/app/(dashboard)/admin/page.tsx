import { auth, signOut } from "@/auth"

export default async function AdminPage() {
  const session = await auth()

  return (
    <main className="min-h-screen bg-zinc-100 text-zinc-950">
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <div>
            <p className="text-sm font-medium text-zinc-500">Admin</p>
            <h1 className="text-xl font-semibold tracking-normal">Dashboard</h1>
          </div>

          <form
            action={async () => {
              'use server'
              await signOut({ redirectTo: '/auth/sign-in' })
            }}
          >
            <button
              className="rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm font-medium transition hover:bg-zinc-50"
              type="submit"
            >
              Sair
            </button>
          </form>
        </div>
      </header>

      <section className="mx-auto grid max-w-5xl gap-4 px-6 py-6 sm:grid-cols-3">
        <article className="rounded-md border border-zinc-200 bg-white p-4">
          <p className="text-sm font-medium text-zinc-500">Usuario</p>
          <p className="mt-2 text-lg font-semibold">{session?.user?.name}</p>
          <p className="mt-1 text-sm text-zinc-500">{session?.user?.email}</p>
        </article>

        <article className="rounded-md border border-zinc-200 bg-white p-4">
          <p className="text-sm font-medium text-zinc-500">Permissoes</p>
          <p className="mt-2 text-lg font-semibold">
            {session?.user?.permissions?.join(', ') || '-'}
          </p>
        </article>

        <article className="rounded-md border border-zinc-200 bg-white p-4">
          <p className="text-sm font-medium text-zinc-500">Status</p>
          <p className="mt-2 text-lg font-semibold">Liberado</p>
          <p className="mt-1 text-sm text-zinc-500">Acesso administrativo ativo</p>
        </article>
      </section>
    </main>
  )
}
