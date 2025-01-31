'use client'

import { Logger } from '@/shared/lib/utils/logger'
import { getProfile, signOut } from '@/shared/server/api/auth'
import { Button } from '@/shared/ui/button'

export default function HomePage() {
  const handleSignout = async () => {
    await signOut()
  }

  const handleGetProfile = async () => {
    try {
      await getProfile()
    } catch (e) {
      Logger.get().error(e)
    }
  }

  Logger.get()
    .groupStart('HomePage')
    .debug('debug')
    .info('info')
    .warn('warn')
    .error('error')
    .groupEnd()

  return (
    <div>
      HomePage
      <Button onClick={() => handleSignout()}>Logout</Button>
      <Button onClick={() => handleGetProfile()}>Get Profile</Button>
    </div>
  )
}
