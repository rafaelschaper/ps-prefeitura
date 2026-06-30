'use client'

import { Button } from '@/components/button'
import type { postType } from '@/types/post'

type DashboardPostsTableProps = {
  onDeletePost?: (post: postType) => void
  onEditPost?: (post: postType) => void
  onViewPost?: (post: postType) => void
  posts: postType[]
}

export function DashboardPostsTable({
  onDeletePost,
  onEditPost,
  onViewPost,
  posts,
}: DashboardPostsTableProps) {
  return (
    <div className="overflow-hidden rounded-md border border-zinc-200 bg-white">
      <table className="w-full min-w-[720px] border-collapse text-left text-sm">
        <thead className="bg-zinc-50 text-xs font-semibold uppercase text-zinc-500">
          <tr>
            <th className="px-4 py-3">Título</th>
            <th className="px-4 py-3">Descrição</th>
            <th className="px-4 py-3 text-right">Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-200">
          {posts.map((post) => (
            <tr className="align-top" key={post.id}>
              <td className="px-4 py-3 font-medium text-zinc-950">
                {post.title}
              </td>
              <td className="px-4 py-3 text-zinc-600">{post.description}</td>
              <td className="px-4 py-3">
                <div className="flex justify-end gap-2">
                  <Button
                    aria-label={`Visualizar postagem ${post.title}`}
                    className="h-9 w-9 border bg-green-400 p-0 text-white hover:bg-green-500"
                    onClick={() => onViewPost?.(post)}
                  >
                    V
                  </Button>
                  <Button
                    aria-label={`Editar postagem ${post.title}`}
                    className="h-9 w-9 border bg-blue-400 p-0 text-white hover:bg-blue-500"
                    onClick={() => onEditPost?.(post)}
                  >
                    E
                  </Button>
                  <Button
                    aria-label={`Deletar postagem ${post.title}`}
                    className="h-9 w-9 border bg-red-400 p-0 text-white hover:bg-red-500"
                    onClick={() => onDeletePost?.(post)}
                  >
                    D
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
