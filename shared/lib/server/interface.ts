export interface IServerResponseBase<T> {
  data: T
  errorCode?: string
  errorMessage?: string
}
