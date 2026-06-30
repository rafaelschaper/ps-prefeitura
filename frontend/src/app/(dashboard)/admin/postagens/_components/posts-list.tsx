import { DashboardPagination } from '@/components/dashboard/pagination'
import { DashboardStatusMessage } from '@/components/dashboard/status-message'
import { api } from '@/services/api'
import type { paginationResponseType } from '@/types/pagination-response'
import type { postType } from '@/types/post'

import { PostagensTable } from './postagens-table'

type PostsListProps = {
  page?: number
  perPage?: number
}

export async function PostsList({ page = 1, perPage = 10 }: PostsListProps) {
  const { response, error } = await api<paginationResponseType<postType[]>>(
    'GET',
    '/posts',
    {
      params: {
        page,
        per_page: perPage,
      },
    },
  )

  if (error) {
    return (
      <DashboardStatusMessage variant="error">
        Nao foi possivel carregar as postagens.
      </DashboardStatusMessage>
    )
  }

  if (!response || response.data.length === 0) {
    return (
      <DashboardStatusMessage>
        Nenhuma postagem encontrada.
      </DashboardStatusMessage>
    )
  }

  return (
    <section className="space-y-4">
      <PostagensTable posts={response.data} />
      <DashboardPagination basePath="/admin/postagens" pagination={response} />
    </section>
  )
}
