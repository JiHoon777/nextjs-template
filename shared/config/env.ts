export const AppEnvs = {
  ENV: (process.env.ENV || 'local') as 'local' | 'dev' | 'prod',
  SERVER_URL: process.env.SERVER_URL || 'http://localhost:3000',
  JWT_SECRET_EXPIRATION: process.env.JWT_SECRET_EXPIRATION || '900000',
  JWT_REFRESH_SECRET_EXPIRATION:
    process.env.JWT_REFRESH_SECRET_EXPIRATION || '2592000000',
  showLogger: process.env.ENV !== 'prod',
} as const
