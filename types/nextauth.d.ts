export declare module 'next-auth' {
  interface User {}
  interface Session {
    accessToken: string
    refreshToken: string
  }
}
export declare module '@auth/core/jwt' {
  interface JWT {
    accessToken: string
    refreshToken: string
  }
}
