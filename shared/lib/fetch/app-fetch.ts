'use server'

import { auth as getSession, update as updateSession } from '@/auth'
import { AppEnvs } from '@/shared/config'
import { ErrorCode, type IServerResponseBase } from '@/shared/lib/server'
import {
  buildPathWithQueryParams,
  type IBuildPathWithQueryParamsInput,
} from '@/shared/lib/utils/url'

export const appFetch = async <T>({
  path,
  init,
}: {
  path: string | IBuildPathWithQueryParamsInput
  init?: RequestInit
}): Promise<IServerResponseBase<T>> => {
  const serverUrl = AppEnvs.SERVER_URL
  const parsedPath = parsePath(path)
  const url = serverUrl + parsedPath

  const response = await fetchRequest(url, init)
  return response.json()
}

async function fetchRequest(
  url: string,
  init?: RequestInit,
): Promise<Response> {
  const session = await getSession()

  const defaultInit: RequestInit = {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(session?.accessToken && {
        Authorization: `Bearer ${session?.accessToken}`,
      }),
    },
  }

  const mergedInit = {
    ...defaultInit,
    ...init,
    headers: {
      ...defaultInit.headers,
      ...init?.headers,
    },
  }

  const response = await fetch(url, mergedInit)
  return handleResponse(response, url, mergedInit)
}

async function handleResponse(
  response: Response,
  url: string,
  init: RequestInit,
): Promise<Response> {
  const res: IServerResponseBase<unknown> = await response.clone().json()

  if (!response.ok || res.errorCode) {
    if (res.errorCode === ErrorCode.AUTH_TOKEN_EXPIRED) {
      const session = await getSession()

      const { data: tokens } = await appFetch<{
        accessToken: string
        refreshToken: string
      }>({
        path: {
          segments: ['auth', 'refresh'],
        },
        init: {
          method: 'GET',
          cache: 'no-store',
          headers: {
            Authorization: `Bearer ${session?.refreshToken}`,
          },
        },
      })

      updateSession({
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      })

      return fetchRequest(url, init)
    } else {
      throw new Error(
        res.errorMessage ?? res.errorCode ?? 'Network response was not ok',
        {
          cause: {
            errorCode: res.errorCode,
            errorMessage: res.errorMessage,
          },
        },
      )
    }
  }

  return response
}

function parsePath(path: string | IBuildPathWithQueryParamsInput): string {
  if (typeof path === 'string') return path

  return buildPathWithQueryParams(path)
}
