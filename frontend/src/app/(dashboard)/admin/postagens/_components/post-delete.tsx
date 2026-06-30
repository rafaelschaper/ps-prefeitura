'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { destroyPost } from '@/actions/post'
import { Button } from '@/components/button'
import type { ResponseErrorType } from '@/services/api'
import type { postType } from '@/types/post'

type PostDeleteDialogProps = {
  onClose: () => void
  post: postType
}

type ToastProps = {
  title: string
}

export function PostDeleteDialog({ onClose, post }: PostDeleteDialogProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [toastMessage, setToastMessage] = useState<string>('')

  function toast({ title }: ToastProps) {
    setToastMessage(title)
    window.setTimeout(() => setToastMessage(''), 3000)
  }

  async function submit() {
    setIsSubmitting(true)

    const { error } = JSON.parse(await destroyPost(post.id)) as {
      error?: ResponseErrorType
    }

    if (error) {
      toast({
        title: 'Nao foi possivel excluir o post!',
      })
      setIsSubmitting(false)
      return
    }

    toast({
      title: 'Post deletado com sucesso!',
    })
    setIsSubmitting(false)
    onClose()
    router.refresh()
  }

  return (
    <section className="absolute inset-0 z-30 flex items-center justify-center bg-white/35 px-4 backdrop-blur-sm">
      {toastMessage && (
        <div className="fixed right-6 top-6 z-50 rounded-md border border-zinc-200 bg-white px-4 py-3 text-sm font-medium text-zinc-950 shadow-lg">
          {toastMessage}
        </div>
      )}

      <div className="w-full max-w-md rounded-md border border-zinc-300 bg-white px-10 py-12 text-center shadow-lg">
        <h2 className="text-2xl font-black uppercase tracking-normal text-zinc-950">
          Atencao!
        </h2>

        <p className="mx-auto mt-5 max-w-xs text-lg leading-snug text-zinc-950">
          Voce esta prestes a excluir essa postagem, essa acao nao tem como ser
          desfeita apos ser confirmada
        </p>

        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <Button
            className="h-8 min-w-32 bg-emerald-700 text-xs uppercase hover:bg-emerald-800"
            disabled={isSubmitting}
            onClick={submit}
          >
            {isSubmitting ? 'Excluindo...' : 'Confirmar'}
          </Button>

          <Button
            className="h-8 min-w-32 bg-red-600 text-xs uppercase hover:bg-red-700"
            disabled={isSubmitting}
            onClick={onClose}
          >
            Cancelar
          </Button>
        </div>
      </div>
    </section>
  )
}
