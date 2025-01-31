import { type ErrorCode, errorMessages } from '@/shared/server/consts/errorCode'

export class AppError extends Error {
  name: string
  errorCode: ErrorCode
  errorMessage: string

  constructor(
    options: ErrorOptions & { errorCode: ErrorCode; errorMessage?: string },
  ) {
    const errorMessage =
      options.errorMessage ??
      errorMessages[options.errorCode] ??
      'Unknown Error'

    super(errorMessage, options)

    this.name = this.constructor.name
    this.errorCode = options.errorCode
    this.errorMessage = errorMessage
  }
}
