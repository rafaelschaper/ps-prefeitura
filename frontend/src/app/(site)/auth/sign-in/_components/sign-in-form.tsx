'use client'

import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { Label } from '@/components/label'
import { useFormStatus } from 'react-dom'

interface SignInForm {
  error: string
}

export function SignInForm({ error }: SignInForm) {
  const { pending } = useFormStatus()

  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="email">E-mail</Label>
        <Input
          autoComplete="email"
          placeholder="Insira seu e-mail"
          defaultValue="test@example.com"
          id="email"
          name="email"
          required
          type="email"
          disabled={pending}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Senha</Label>
        <Input
          autoComplete="current-password"
          placeholder="Insira sua senha"
          defaultValue="password"
          id="password"
          name="password"
          required
          type="password"
          disabled={pending}
        />
      </div>
      <p className="text-sm text-destructive" hidden={!error}>
        {error}
      </p>
      <div className="flex justify-center">
        <Button type="submit" className="w-full mt-5">
          Entrar
        </Button>
      </div>
    </>
  )
}
