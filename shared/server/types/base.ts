import type { ErrorCode } from '@/shared/server/consts/errorCode'

export interface IServerSuccessResponse<T> {
  success: true
  data: T
}

interface IServerErrorResponse {
  success: false
  errorCode: ErrorCode
  errorMessage: string
}

export type ServerResponseBase<T = unknown> =
  | IServerSuccessResponse<T>
  | IServerErrorResponse
