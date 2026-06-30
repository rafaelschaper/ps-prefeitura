import Link from 'next/link'

import type { paginationResponseType } from '@/types/pagination-response'

type DashboardPaginationProps = {
  pagination: paginationResponseType
  basePath: string
}

type PaginationLink = paginationResponseType['links'][number]

export function DashboardPagination({
  pagination,
  basePath,
}: DashboardPaginationProps) {
  const links = getVisiblePaginationLinks(pagination.links)

  return (
    <div className="flex flex-col gap-3 text-sm text-zinc-600 sm:flex-row sm:items-center sm:justify-between">
      <p>
        Mostrando {pagination.from} a {pagination.to} de {pagination.total}{' '}
        registros
      </p>

      <nav aria-label="Paginacao">
        <ul className="flex flex-wrap gap-2">
          {links.map((link, index) => (
            <li key={`${link.label}-${index}`}>
              <DashboardPaginationItem
                basePath={basePath}
                link={link}
                perPage={pagination.per_page}
              />
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

function DashboardPaginationItem({
  basePath,
  link,
  perPage,
}: {
  basePath: string
  link: PaginationLink
  perPage: number
}) {
  const page = getPageFromUrl(link.url)
  const label = getPaginationLabel(link.label)
  const className =
    'inline-flex h-9 min-w-9 items-center justify-center rounded-md border px-3 text-sm font-medium transition'

  if (!page) {
    return (
      <span
        className={`${className} cursor-not-allowed border-zinc-200 bg-zinc-100 text-zinc-400`}
      >
        {label}
      </span>
    )
  }

  if (link.active) {
    return (
      <span className={`${className} border-emerald-600 bg-emerald-600 text-white`}>
        {label}
      </span>
    )
  }

  return (
    <Link
      className={`${className} border-zinc-300 bg-white text-zinc-700 hover:border-emerald-600 hover:text-emerald-700`}
      href={`${basePath}?page=${page}&per_page=${perPage}`}
    >
      {label}
    </Link>
  )
}

function getPageFromUrl(url: string | null) {
  if (!url) {
    return null
  }

  return new URL(url).searchParams.get('page')
}

function getPaginationLabel(label: string) {
  if (label.includes('Previous')) {
    return 'Anterior'
  }

  if (label.includes('Next')) {
    return 'Proxima'
  }

  return label
}

function getVisiblePaginationLinks(links: PaginationLink[]) {
  const previousLink = links.find((link) => link.label.includes('Previous'))
  const nextLink = links.find((link) => link.label.includes('Next'))
  const pageLinks = links.filter((link) => /^\d+$/.test(link.label))
  const activeIndex = pageLinks.findIndex((link) => link.active)
  const currentIndex = activeIndex >= 0 ? activeIndex : 0
  const maxPages = 5
  const halfWindow = Math.floor(maxPages / 2)
  const startIndex = Math.max(
    0,
    Math.min(currentIndex - halfWindow, pageLinks.length - maxPages),
  )
  const visiblePageLinks = pageLinks.slice(startIndex, startIndex + maxPages)

  return [previousLink, ...visiblePageLinks, nextLink].filter(
    (link): link is PaginationLink => Boolean(link),
  )
}
