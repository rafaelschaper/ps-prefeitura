import { PostCreateScreen } from './_components/post-create'
import { PostsList } from './_components/posts-list'

type PostagensPageProps = {
  searchParams: {
    page?: string
    per_page?: string
  }
}

export default async function Page({
  searchParams,
}: PostagensPageProps) {
  const page = Number(searchParams.page || 1)
  const perPage = Number(searchParams.per_page || 10)

  return (
    <main className="relative min-h-screen bg-zinc-100 text-zinc-950">
      <section className="min-w-0 flex-1 px-6 py-8">
        <div className="mx-auto max-w-5xl">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold tracking-normal">Postagens</h1>
            <p className="text-sm text-zinc-600">Gerenciamento de postagens</p>
          </div>

          <PostCreateScreen />
          <PostsList page={page} perPage={perPage} />
        </div>
      </section>
    </main>
  )
}
