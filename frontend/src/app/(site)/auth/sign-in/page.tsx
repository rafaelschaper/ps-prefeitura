'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { SignInForm } from './_components/sign-in-form'
import { signIn } from 'next-auth/react'


export default function SignInPage() {
  const [error, setError] = useState<string>('')
  const router = useRouter()

  const login = async (form: FormData) => {
    const auth = await signIn('credentials', {
      email: form.get('email'),
      password: form.get('password'),
      redirect: false,
    })

    if (auth?.error) {
      setError('Credenciais inválidas')
      return
    }
    router.replace('/admin')
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-100 px-4 py-10 text-zinc-950">
      <section className="w-full max-w-sm rounded-md border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="mb-6">
          <h1 className="mt-1 text-2xl font-semibold tracking-normal">Painel administrativo</h1>
        </div>

        <form action={login}>
          <SignInForm error={error} />
        </form>
        
      </section>
    </main>
  )
}
