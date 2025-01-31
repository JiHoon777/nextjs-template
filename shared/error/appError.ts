import { ErrorCode, errorMessages } from '@/shared/server/consts/errorCode'

export class AppError extends Error {
  name: string
  errorCode: ErrorCode
  errorMessage: string

  constructor(
    options: ErrorOptions & { errorCode?: ErrorCode; errorMessage?: string },
  ) {
    const errorCode = options.errorCode ?? ErrorCode.UNKNOWN
    const errorMessage =
      options.errorMessage ?? errorMessages[errorCode] ?? 'Unknown Error'

    super(errorMessage, options)

    this.name = this.constructor.name
    this.errorCode = errorCode
    this.errorMessage = errorMessage
  }
}
