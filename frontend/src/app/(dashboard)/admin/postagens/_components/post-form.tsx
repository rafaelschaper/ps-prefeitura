"use client"

import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { Label } from '@/components/label'
import type { ResponseErrorType } from '@/services/api'
import type { postType } from '@/types/post'
import { useState } from 'react'
import { useFormStatus } from 'react-dom'
import dynamic from 'next/dynamic'
import { cn } from '@/lib/utils'

interface PostFormProps {
  post?: postType;
  readOnly?: boolean;
  error?: ResponseErrorType | null;
  action: (form: FormData) => void | Promise<void>;
  submitLabel?: string;
}

const CKEditorComponent = dynamic(
  () => import('@/components/dashboard/custom-editor'),
  {
    ssr: false,
    loading: () => <div className="h-[200px] w-full bg-slate-100 animate-pulse rounded-md border" />
  }
)

export default function PostForm({
  action,
  post,
  readOnly,
  error,
  submitLabel = 'Adicionar',
}: PostFormProps) {
  const { pending } = useFormStatus()
  const [updateImage, setUpdateImage] = useState<string | undefined>()
  const [editorText, setEditorText] = useState<string>(post?.text || '')

  async function submit(form: FormData) {
    form.set('text', editorText)
    await action(form)
  }

  return (
    <form
      action={submit}
      className="space-y-5"
      encType="multipart/form-data"
    >
      {post?.id && <input name="id" type="hidden" value={post.id} />}

      <div className="space-y-2">
        <Label className="sr-only" htmlFor="title">
          Titulo
        </Label>
        <Input
          className="h-10 border-zinc-400 shadow-sm"
          defaultValue={post?.title}
          id="title"
          name="title"
          placeholder="Titulo"
          readOnly={readOnly}
          required
          type="text"
        />
        <FieldError message={error?.errors?.title} />
      </div>

      <div className="space-y-2">
        <Label className="sr-only" htmlFor="description">
          Descricao
        </Label>
        <Input
          className="h-10 border-zinc-400 shadow-sm"
          defaultValue={post?.description}
          id="description"
          name="description"
          placeholder="Descricao"
          readOnly={readOnly}
          required
          type="text"
        />
        <FieldError message={error?.errors?.description} />
      </div>

      <div className="space-y-2">
        <Label className="sr-only" htmlFor="image">
          Imagem
        </Label>
        <Input
          accept="image/jpeg,image/png,image/jpg,image/webp"
          className="h-10 border-zinc-400 shadow-sm file:mr-3 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-emerald-700"
          disabled={readOnly}
          id="image"
          name="image"
          onChange={(event) => {
            setUpdateImage(event.target.files?.[0]?.name)
          }}
          type="file"
        />
        {(updateImage || post?.image) && (
          <p className="text-xs text-zinc-500">{updateImage || post?.image}</p>
        )}
        <FieldError message={error?.errors?.image} />
      </div>

      <div className="space-y-2">
        <Label className="sr-only" htmlFor="text">
          Texto
        </Label>

        <div className={cn(
              "w-full rounded-md border bg-background overflow-hidden ck-custom-height",
              error?.errors?.text ? "border-red-500" : "border-input"
            )}>
              <CKEditorComponent
                value={editorText}
                onChange={setEditorText}
                disabled={readOnly || pending}
              />
            </div>
        <FieldError message={error?.errors?.text} />
      </div>

      <div className="flex justify-center">
        <SubmitButton label={submitLabel} readOnly={readOnly} />
      </div>
    </form>
  )
}

function SubmitButton({
  label,
  readOnly,
}: {
  label: string
  readOnly?: boolean
}) {
  const { pending } = useFormStatus()

  return (
    <Button
      className="min-w-40 uppercase"
      disabled={pending || readOnly}
      type="submit"
    >
      {pending ? 'Salvando...' : label}
    </Button>
  )
}

function FieldError({ message }: { message?: string }) {
  if (!message) {
    return null
  }

  return <p className="text-xs font-medium text-red-600">{message}</p>
}
