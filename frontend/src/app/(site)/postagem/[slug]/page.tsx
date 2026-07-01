import { PostContentPreview } from '@/components/dashboard/post-preview'
import { slugify } from '@/lib/slugify'
import { api } from '@/services/api'
import type { paginationResponseType } from '@/types/pagination-response'
import type { postType } from '@/types/post'

type PostagemPageProps = {
  params: {
    slug: string
  }
}

export default async function PostagemPage({ params }: PostagemPageProps) {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    return (
      <main className="min-h-screen bg-zinc-100 px-6 py-10 text-zinc-950">
        <section className="mx-auto max-w-3xl border border-zinc-300 bg-white p-6 text-center shadow-sm">
          <h1 className="text-xl font-semibold text-zinc-950">
            Postagem nao encontrada
          </h1>
          <p className="mt-2 text-sm text-zinc-600">
            Nao foi possivel carregar essa postagem.
          </p>
        </section>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-white px-6 py-10 text-zinc-950">
      <section className="mx-auto max-w-5xl">
        <PostContentPreview
          articleClassName="border-0 p-0 shadow-none blog-content"
          imageClassName="rounded md:size-[420px]"
          post={post}
          showSectionTitle={false}
          titleClassName="text-2xl text-sky-950"
          titleTag="h1"
        />
      </section>
    </main>
  )
}

async function getPostBySlug(slug: string) {
  const searchTitle = slug.replace(/-/g, ' ')
  const searchResponse = await api<paginationResponseType<postType[]>>(
    'GET',
    '/posts',
    {
      params: {
        page: 1,
        per_page: 20,
        title: searchTitle,
      },
    },
  )
  const searchedPost = findPostBySlug(searchResponse.response?.data, slug)

  if (searchedPost) {
    return searchedPost
  }

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
  const firstPagePost = findPostBySlug(firstPage.response?.data, slug)

  if (firstPagePost || !firstPage.response) {
    return firstPagePost
  }

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
    const post = findPostBySlug(pageResponse.response?.data, slug)

    if (post) {
      return post
    }
  }

  return null
}

function findPostBySlug(posts: postType[] | undefined, slug: string) {
  return posts?.find((post) => slugify(post.title) === slug) || null
}
