'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'

import { showToast } from '@/shared/lib/utils/showToast'

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          mutations: {
            onError: (error) => {
              showToast.error(error)
            },
          },
          queries: {
            refetchOnWindowFocus: false,
            retry: false,
            staleTime: 1000 * 5,
          },
        },
      }),
  )

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}
