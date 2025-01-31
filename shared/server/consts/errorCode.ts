export enum ErrorCode {
  COMMON_NOT_FOUND = 'COMMON_NOT_FOUND',
  COMMON_NO_INPUT = 'COMMON_NO_INPUT',

  AUTH_UNAUTHORIZED = 'AUTH_UNAUTHORIZED',
  AUTH_TOKEN_EXPIRED = 'AUTH_TOKEN_EXPIRED',
  AUTH_REFRESH_TOKEN_EXPIRED = 'AUTH_REFRESH_TOKEN_EXPIRED',

  // 500
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
}

export const errorMessages: Record<ErrorCode, string> = {
  [ErrorCode.COMMON_NOT_FOUND]: 'Not Found',
  [ErrorCode.COMMON_NO_INPUT]: 'No Input',

  [ErrorCode.AUTH_UNAUTHORIZED]: 'Unauthorized',
  [ErrorCode.AUTH_TOKEN_EXPIRED]: 'Token Expired',

  [ErrorCode.AUTH_REFRESH_TOKEN_EXPIRED]: 'Refresh Token Expired',
  [ErrorCode.INTERNAL_SERVER_ERROR]: 'Internal Server Error',
}
