'use server'
import type { IServerResponseBase } from '@/shared/server/types/base'

import { cookies } from 'next/headers'

import { AppEnvs } from '@/shared/config/env'
import { AppError } from '@/shared/error/appError'
import { Logger } from '@/shared/lib/utils/logger'
import { ErrorCode, errorMessages } from '@/shared/server/consts/errorCode'

import { refreshJwtTokens } from './jwtToken'

/**
 * 서버에 인증된 요청을 보내는 함수입니다. (jwt 토큰이 없으면 header에 포함하지 않음)
 * 401 Unauthorized 응답 시 토큰을 갱신하고 요청을 재시도합니다.
 *
 * @template T_RESULT - 기대하는 결과 데이터의 타입
 * @param {string} url - 서버 엔드포인트 URL (SERVER_URL을 기준으로 상대 경로)
 * @param {RequestInit} [options={}] - fetch 요청 옵션
 * @returns {Promise<IServerResponseBase<T_RESULT>>} - 서버의 응답 데이터
 * @throws {Error} - 요청 실패 시 에러를 던집니다.
 */
export async function appFetch<T_RESULT>(
  url: string,
  options: RequestInit = {},
): Promise<IServerResponseBase<T_RESULT>> {
  const accessToken = (await cookies()).get('accessToken')?.value

  const fetchWithAuth = async (
    token: string | undefined,
  ): Promise<Response> => {
    const res = await fetch(`${AppEnvs.SERVER_URL}${url}`, {
      credentials: 'include',
      method: 'GET',
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers ?? {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    })

    const logger = Logger.get()
      .groupStart('appFetch')
      .info(`[${options.method ?? 'GET'}] ${AppEnvs.SERVER_URL}${url}`, 'URL')

    const cloneJson = await res.clone().json()

    if (cloneJson) {
      logger.debug(cloneJson, 'Response')

      if (cloneJson.errorCode) {
        logger.error({
          httpStatus: res.status,
          errorCode: cloneJson.errorCode,
          errorMessage: cloneJson.errorMessage,
        })
      }
    }
    logger.groupEnd()

    return res
  }

  let response = await fetchWithAuth(accessToken)

  const refreshToken = (await cookies()).get('refreshToken')?.value
  if (response.status === 401 && refreshToken) {
    await refreshJwtTokens(refreshToken)

    const newAccessToken = (await cookies()).get('accessToken')?.value
    response = await fetchWithAuth(newAccessToken)
  }

  const json = (await response.json()) as IServerResponseBase<T_RESULT>
  if (!response.ok || json.errorCode) {
    const errorCode = json.errorCode ?? ErrorCode.INTERNAL_SERVER_ERROR
    const errorMessage = json.errorMessage ?? errorMessages[errorCode]

    throw new AppError({
      errorCode,
      errorMessage,
    })
  }

  return json
}
