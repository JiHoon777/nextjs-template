import { AppEnvs } from '@/shared/config'
import type { IServerResponseBase } from '@/shared/lib/server'
import { cookies } from 'next/headers'
import { ISigninResponse } from './auth'

export const setTokenCookie = async (
  accessToken: string,
  refreshToken: string,
) => {
  const cookieStore = await cookies()
  cookieStore.set('accessToken', accessToken, {
    httpOnly: true,
    secure: process.env.ENV === 'production',
  })
  cookieStore.set('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.ENV === 'production',
  })
}

export const deleteTokenCookie = async () => {
  const cookieStore = await cookies()
  cookieStore.delete('accessToken')
  cookieStore.delete('refreshToken')
}

let tokenRefreshPromise: Promise<void> | null = null

export async function refreshJwtTokens(refreshToken: string) {
  // 이미 토큰 갱신 중이면 해당 Promise를 반환
  if (tokenRefreshPromise) {
    return tokenRefreshPromise
  }

  try {
    tokenRefreshPromise = (async () => {
      const res = await fetch(`${AppEnvs.SERVER_URL}/auth/refresh-token`, {
        method: 'POST',
        cache: 'no-store',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${refreshToken}`,
        },
      })

      const json = (await res.json()) as IServerResponseBase<ISigninResponse>

      if (!res.ok || json.errorCode) {
        throw new Error(json.errorMessage ?? 'Failed to refresh token')
      }

      await setTokenCookie(json.data.accessToken, json.data.refreshToken)
    })()

    return tokenRefreshPromise
  } finally {
    tokenRefreshPromise = null
  }
}
