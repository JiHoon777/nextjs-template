'use server'

import { redirect } from 'next/navigation'

import { auth, signIn, signOut as _signOut, update } from '@/auth'
import { appFetch } from '@/shared/lib/fetch/app-fetch'

export const signInWithCredentials = async ({
  email,
  password,
}: {
  email: string
  password: string
}): Promise<void> => {
  return signIn('credentials', {
    email,
    password,
  })
}

export const signUpWithCredentials = async (body: {
  email: string
  password: string
}) => {
  return appFetch({
    path: {
      segments: ['auth', 'signup'],
    },
    init: {
      method: 'POST',
      body: JSON.stringify(body),
    },
  })
}

export const signOut = async ({ redirectUrl }: { redirectUrl?: string }) => {
  await _signOut()
  await appFetch({
    path: {
      segments: ['auth', 'signout'],
    },
  })

  if (redirectUrl) {
    redirect(redirectUrl)
  }
}

export { auth as getSession, update as updateSession }
