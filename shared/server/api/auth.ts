'use server'

import { redirect } from 'next/navigation'

import { createAuthSession, deleteAuthSession } from './auth-session'
import { appFetch } from './fetch'

export interface IAuthResponse {
  id: number
  email: string
  name: string | null
  accessToken: string
  refreshToken: string
}

/**
 * 이메일과 비밀번호를 사용하여 로그인을 수행하고, 로그인 성공 시 토큰을 쿠키에 저장
 * @param credentials.email - 사용자 이메일
 * @param credentials.password - 사용자 비밀번호
 * @throw {AppError}
 */
export async function signInWithCredentials({
  email,
  password,
}: {
  email: string
  password: string
}) {
  const res = await appFetch<IAuthResponse>('/auth/signin', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })

  await createAuthSession(res.data)
}

/**
 * 새로운 사용자 계정을 생성한다.
 * @param body.email - 사용자 이메일
 * @param body.password - 사용자 비밀번호
 * @throw {AppError}
 */
export async function signUpWithCredentials(body: {
  email: string
  password: string
}) {
  return appFetch('/auth/signup', {
    method: 'POST',
    body: JSON.stringify(body),
  })
}

/**
 * 로그아웃을 수행하고 선택적으로 지정된 URL로 리다이렉트한다. 로그아웃 성공시 쿠키를 제거한다.
 * @param input.redirectUrl - 로그아웃 후 리다이렉트할 URL
 * @throw {AppError}
 */
export async function signOut(input?: { redirectUrl?: string }) {
  await appFetch('/auth/signout', {
    method: 'POST',
  })
  await deleteAuthSession()

  if (input?.redirectUrl) {
    redirect(input.redirectUrl)
  }
}

/**
 * 사용자 프로필 정보를 가져온다.
 * @throw {AppError}
 */
export async function getProfile() {
  return appFetch('/auth/profile', {
    method: 'GET',
    cache: 'no-store',
  })
}
