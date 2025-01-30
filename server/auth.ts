'use server'

import { redirect } from 'next/navigation'
import { setTokenCookie, deleteTokenCookie } from './jwt-token'
import { appFetch } from './fetch'

export interface ISigninResponse {
  id: number
  email: string
  name: string | null
  accessToken: string
  refreshToken: string
}

export async function signInWithCredentials({
  email,
  password,
}: {
  email: string
  password: string
}) {
  const res = await appFetch<ISigninResponse>('/auth/signin', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })

  await setTokenCookie(res.data.accessToken, res.data.refreshToken)
}

export async function signUpWithCredentials(body: {
  email: string
  password: string
}) {
  return appFetch('/auth/signup', {
    method: 'POST',
    body: JSON.stringify(body),
  })
}

export async function signOut(input?: { redirectUrl?: string }) {
  await appFetch('/auth/signout', {
    method: 'POST',
  })

  await deleteTokenCookie()

  if (input?.redirectUrl) {
    redirect(input.redirectUrl)
  }
}

export async function getProfile() {
  return appFetch('/auth/profile', {
    method: 'GET',
  })
}
