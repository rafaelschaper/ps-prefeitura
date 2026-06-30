'use client'

import { Button } from '@/components/button'
import { DashboardPostPreview } from '@/components/dashboard/post-preview'
import type { postType } from '@/types/post'

type PostInfoProps = {
  onClose: () => void
  post: postType
}

export function PostInfo({ onClose, post }: PostInfoProps) {
  return (
    <section className="absolute inset-0 z-20 bg-zinc-100 px-6 py-8 text-zinc-950">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold tracking-normal">Postagens</h1>
          <p className="text-sm text-zinc-600">Gerenciamento de postagens</p>
        </div>

        <DashboardPostPreview post={post} />

        <div className="my-10 flex justify-center">
          <Button
            className="h-8 min-w-32 bg-red-600 text-xs uppercase hover:bg-red-700"
            onClick={onClose}
          >
            Fechar
          </Button>
        </div>
      </div>
    </section>
  )
}
