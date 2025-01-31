'use server'
import type { IAuthResponse } from './auth'
import type { IServerResponseBase } from '@/shared/server/types/base'

import { sealData, unsealData } from 'iron-session'
import { cookies } from 'next/headers'

import { AppEnvs } from '@/shared/config/env'
import { AppError } from '@/shared/error/appError'

export interface IAuthSession extends IAuthResponse {
  createdAt: number
}

export const createAuthSession = async (data: IAuthResponse) => {
  const sessionData: IAuthSession = {
    ...data,
    createdAt: Date.now(),
  }

  const sealedData = await sealData(sessionData, {
    password: AppEnvs.AUTH_SESSION_SECRET,
    ttl: 60 * 60 * 24 * 30,
  })

  const cookieStore = await cookies()
  cookieStore.set(AppEnvs.AUTH_SESSION_KEY, sealedData, {
    httpOnly: true,
    secure: AppEnvs.ENV === 'prod',
    maxAge: 60 * 60 * 24 * 30,
    sameSite: 'lax',
  })
}

export const getAuthSession = async (): Promise<IAuthSession | null> => {
  const cookieStore = await cookies()
  const cookie = cookieStore.get(AppEnvs.AUTH_SESSION_KEY)?.value
  if (!cookie) return null

  return unsealData<IAuthSession>(cookie, {
    password: AppEnvs.AUTH_SESSION_SECRET,
  })
}

export const deleteAuthSession = async () => {
  const cookieStore = await cookies()
  cookieStore.set(AppEnvs.AUTH_SESSION_KEY, '', {
    expires: new Date(0),
    httpOnly: true,
    secure: AppEnvs.ENV === 'prod',
  })
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

      const json = (await res.json()) as IServerResponseBase<IAuthResponse>

      if (!res.ok || json.errorCode) {
        throw new AppError({
          errorCode: json.errorCode,
          errorMessage: json.errorMessage,
        })
      }

      await createAuthSession(json.data)
    })()

    return tokenRefreshPromise
  } finally {
    tokenRefreshPromise = null
  }
}
