'use server'

import { api } from "@/services/api"
import { revalidatePath } from "next/cache"

export async function createPost(form: FormData) {
  const res = await api('POST', '/posts', { data: form })

  if (!res.error) {
    revalidatePath('/admin/postagens')
  }

  return JSON.stringify(res)
}

export async function updatePost(form: FormData) {
  form.set('_method', 'PUT')

  const res = await api('POST', `/posts/${form.get('id')}`, {
    data: form,
  })

  if (!res.error) {
    revalidatePath('/admin/postagens')
  }

  return JSON.stringify(res)
}

export async function destroyPost(id: string) {
  const res = await api('DELETE', `/posts/${id}`)

  if (!res.error) {
    revalidatePath('/admin/postagens')
  }

  return JSON.stringify(res)
}
