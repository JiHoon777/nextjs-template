import type { ErrorCode } from '@/shared/server/consts/errorCode'

export interface IServerResponseBase<T> {
  data: T
  errorCode?: ErrorCode
  errorMessage?: string
}
