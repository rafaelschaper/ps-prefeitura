'use client'

import { useState } from 'react'

import { createPost } from '@/actions/post'
import { Button } from '@/components/button'
import type { ResponseErrorType } from '@/services/api'

import PostForm from './post-form'

type ToastProps = {
  title: string
}

export function PostCreateScreen() {
  const [isOpen, setIsOpen] = useState(false)
  const [error, setError] = useState<ResponseErrorType | null>(null)
  const [toastMessage, setToastMessage] = useState<string>('')

  function toast({ title }: ToastProps) {
    setToastMessage(title)
    window.setTimeout(() => setToastMessage(''), 3000)
  }

  async function submit(form: FormData) {
    const newForm = await filterFormData(form)
    const { error } = JSON.parse(await createPost(newForm)) as {
      error?: ResponseErrorType
    }

    if (error) {
      setError(error)
      toast({
        title: 'Nao foi possivel criar o post!',
      })
    } else {
      toast({
        title: 'Post criado com sucesso!',
      })
      setError(null)
      setIsOpen(false)
    }
  }

  return (
    <>
      {toastMessage && (
        <div className="fixed right-6 top-6 z-50 rounded-md border border-zinc-200 bg-white px-4 py-3 text-sm font-medium text-zinc-950 shadow-lg">
          {toastMessage}
        </div>
      )}

      <div className="mb-6 flex justify-end">
        <Button onClick={() => setIsOpen(true)}>Criar postagem</Button>
      </div>

      {isOpen && (
        <section className="absolute inset-0 z-20 overflow-y-auto bg-zinc-100 px-6 py-8 text-zinc-950">
          <div className="mx-auto max-w-5xl">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h1 className="text-2xl font-semibold tracking-normal">
                  Postagens
                </h1>
                <p className="text-sm text-zinc-600">
                  Gerenciamento de postagens
                </p>
              </div>

              <Button
                className="bg-zinc-700 hover:bg-zinc-800"
                onClick={() => setIsOpen(false)}
              >
                Cancelar
              </Button>
            </div>

            <PostForm action={submit} error={error} />
          </div>
        </section>
      )}
    </>
  )
}

async function filterFormData(form: FormData) {
  const newForm = new FormData()

  form.forEach((value, key) => {
    if (value instanceof File) {
      if (value.size > 0) {
        newForm.append(key, value)
      }

      return
    }

    if (value.trim()) {
      newForm.append(key, value)
    }
  })

  return newForm
}
