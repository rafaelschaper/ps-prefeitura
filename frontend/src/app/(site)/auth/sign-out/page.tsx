'use client'

import { useEffect } from 'react'
import { signOut } from 'next-auth/react'

export default function SignOutPage() {
  useEffect(() => {
    void signOut({ callbackUrl: '/auth/sign-in' })
  }, [])
}
