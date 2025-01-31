import { Logger } from '@/shared/lib/utils/logger'
import { getAuthSession } from '@/shared/server/api/auth-session'

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const res = await getAuthSession()
  Logger.get().info(res, 'res')
  return <>{children}</>
}
