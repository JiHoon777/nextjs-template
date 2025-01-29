import { redirect } from 'next/navigation'

import { getSession } from '@/app/server/auth.action'

export default async function AuthLayout({
  children,
  modal,
}: {
  children: React.ReactNode
  modal: React.ReactNode
}) {
  const session = await getSession()

  if (session?.user) {
    redirect('/home')
    return null
  }

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-10">
      {children}
      {modal}
    </div>
  )
}
