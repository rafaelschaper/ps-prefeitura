'use client'

import { useEffect, useMemo, useState } from 'react'

import { Input } from '@/components/input'
import { PostThumbnail } from '@/components/post-thumbnail'
import { slugify } from '@/lib/slugify'
import type { postType } from '@/types/post'

const POSTS_PER_PAGE = 6

type PostsFilterProps = {
  posts: postType[]
}

export function PostsFilter({ posts }: PostsFilterProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredPosts, setFilteredPosts] = useState<postType[]>(posts)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredPosts(posts)
    } else {
      const filtered = posts?.filter((post) => {
        const term = normalizeSearch(searchTerm)

        return (
          normalizeSearch(post.title).includes(term)
        )
      })

      setFilteredPosts(filtered)
    }
  }, [searchTerm, posts])

  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm])

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE)
  const visiblePosts = useMemo(() => {
    const start = (currentPage - 1) * POSTS_PER_PAGE

    return filteredPosts.slice(start, start + POSTS_PER_PAGE)
  }, [currentPage, filteredPosts])

  return (
    <>
      <header className="text-center">
        <h1 className="mt-12 text-4xl font-[900] text-sky-950">
          Nossas noticias
        </h1>

        <div className="mt-4 mb-16 flex flex-wrap items-center justify-center gap-2 text-xs">
          <label
            className="text-xl font-semibold text-sky-900"
            htmlFor="post-title-search"
          >
            Pesquise pela palavra-chave:
          </label>
          <Input
            className="h-7 w-64 rounded-none border-0 border-b border-sky-200 bg-transparent px-2 text-base focus:border-sky-500 focus:ring-0"
            id="post-title-search"
            name="title"
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Turismo em Barra Nova"
            value={searchTerm}
          />
        </div>
      </header>

      <div className="mt-10">
        {filteredPosts.length === 0 ? (
          <p className="text-center text-sm font-medium text-zinc-600">
            Nenhuma noticia encontrada.
          </p>
        ) : null}

        {visiblePosts.length > 0 ? (
          <>
            <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
              {visiblePosts.map((post) => (
                <PostThumbnail
                  actionLabel="Ler materia"
                  className="min-h-36 rounded-md bg-[#f1eee8]"
                  href={`/postagem/${slugify(post.title)}`}
                  imageClassName="h-36 w-32 rounded"
                  key={post.id}
                  post={post}
                />
              ))}
            </div>

            <SitePagination
              currentPage={currentPage}
              onPageChange={setCurrentPage}
              totalPages={totalPages}
            />
          </>
        ) : null}
      </div>
    </>
  )
}

function SitePagination({
  currentPage,
  onPageChange,
  totalPages,
}: {
  currentPage: number
  onPageChange: (page: number) => void
  totalPages: number
}) {
  if (totalPages <= 1) {
    return null
  }

  const pages = getVisiblePages(currentPage, totalPages)

  return (
    <nav aria-label="Paginacao de noticias" className="mt-10">
      <ul className="flex items-center justify-center gap-5 text-xs font-semibold text-sky-900">
        {pages.map((page) => (
          <li key={page}>
            <button
              className={
                page === currentPage
                  ? 'text-sky-600'
                  : 'transition hover:text-sky-600'
              }
              onClick={() => onPageChange(page)}
              type="button"
            >
              {page}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}

function getVisiblePages(currentPage: number, lastPage: number) {
  const maxPages = 5
  const halfWindow = Math.floor(maxPages / 2)
  const startPage = Math.max(
    1,
    Math.min(currentPage - halfWindow, lastPage - maxPages + 1),
  )
  const totalPages = Math.min(lastPage, maxPages)

  return Array.from({ length: totalPages }, (_, index) => startPage + index)
}

function normalizeSearch(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
}
