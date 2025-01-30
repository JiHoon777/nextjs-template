import { AppEnvs } from '@/shared/config'
import type { IServerResponseBase } from '@/shared/lib/server'
import { cookies } from 'next/headers'
import { refreshJwtTokens } from './jwt-token'

export async function appFetch<T_RESULT>(
  url: string,
  options: RequestInit = {},
): Promise<IServerResponseBase<T_RESULT>> {
  const accessToken = (await cookies()).get('accessToken')?.value
  console.log('accessToken: ', accessToken)

  let response = await fetch(AppEnvs.SERVER_URL + url, {
    credentials: 'include',
    method: 'GET',
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    },
  })

  const refreshToken = (await cookies()).get('refreshToken')?.value
  if (response.status === 401 && refreshToken) {
    await refreshJwtTokens(refreshToken)

    const newAccessToken = (await cookies()).get('accessToken')?.value
    response = await fetch(AppEnvs.SERVER_URL + url, {
      credentials: 'include',
      method: 'GET',
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
        Authorization: `Bearer ${newAccessToken}`,
      },
    })
  }

  const json = await response.json()
  if (!response.ok || json.errorCode) {
    throw new Error(json.errorMessage ?? 'Failed to fetch data', {
      cause: {
        errorCode: json.errorCode,
        errorMessage: json.errorMessage,
      },
    })
  }

  return json
}
