import type { IServerResponseBase } from '@/shared/lib/server'

import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

import { AppEnvs } from '@/shared/config'

interface ICredentials {
  email: string
  accessToken: string
  refreshToken: string
}

interface IAuthorizeBody {
  email: string
  password: string
}

export const {
  handlers,
  signIn,
  signOut,
  auth,
  unstable_update: update,
} = NextAuth({
  providers: [
    Credentials({
      authorize: async (credentials) => {
        const userInfo = credentials as unknown as IAuthorizeBody

        const res = await fetch(`${AppEnvs.SERVER_URL}/auth/signin`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userInfo),
          cache: 'no-store',
        })

        const json = (await res.json()) as IServerResponseBase<ICredentials>

        if (!res.ok || json.errorCode) {
          throw new Error(
            !json.errorMessage
              ? 'Network response was not ok'
              : json.errorMessage,
          )
        }

        return json.data
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30일
    updateAge: 24 * 60 * 60, // 24시간
  },
  pages: {
    signIn: '/signin',
  },
  callbacks: {
    jwt: async ({ token, user, trigger, session }) => {
      console.log('jwt processing: ', token, user, trigger, session)
      if (user) {
        Object.assign(token, user)
      }
      if (trigger === 'update' && session) {
        Object.assign(token, session.user)
      }
      return token
    },
    session: async ({ session, token }) => {
      console.log('session processing: ', session, token)
      Object.assign(session, token)
      return session
    },
  },
  secret: process.env.AUTH_SECRET,
})
