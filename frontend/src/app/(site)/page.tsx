import { api } from '@/services/api'
import type { paginationResponseType } from '@/types/pagination-response'
import type { postType } from '@/types/post'

import { PostsFilter } from './_components/posts-filter'

export default async function Home() {
  const { posts, error } = await getPosts()

  return (
    <main className="min-h-screen bg-white px-6 pb-16 pt-10 text-zinc-950">
      <section className="mx-auto max-w-5xl">
        {error ? (
          <p className="text-center text-sm font-medium text-red-700">
            Nao foi possivel carregar as noticias.
          </p>
        ) : (
          <PostsFilter posts={posts} />
        )}
      </section>
    </main>
  )
}

async function getPosts() {
  const firstPage = await api<paginationResponseType<postType[]>>(
    'GET',
    '/posts',
    {
      params: {
        page: 1,
        per_page: 100,
      },
    },
  )

  if (firstPage.error || !firstPage.response) {
    return {
      error: true,
      posts: [],
    }
  }

  const posts = [...firstPage.response.data]

  for (let page = 2; page <= firstPage.response.last_page; page += 1) {
    const pageResponse = await api<paginationResponseType<postType[]>>(
      'GET',
      '/posts',
      {
        params: {
          page,
          per_page: 100,
        },
      },
    )

    if (pageResponse.response) {
      posts.push(...pageResponse.response.data)
    }
  }

  return {
    error: false,
    posts,
  }
}
