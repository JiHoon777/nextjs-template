export const AppEnvs = {
  ENV: (process.env.ENV || 'local') as 'local' | 'dev' | 'prod',
  SERVER_URL: process.env.SERVER_URL as string,
  JWT_SECRET_EXPIRATION: process.env.JWT_SECRET_EXPIRATION,
  JWT_REFRESH_SECRET_EXPIRATION: process.env.JWT_REFRESH_SECRET_EXPIRATION,
} as const
