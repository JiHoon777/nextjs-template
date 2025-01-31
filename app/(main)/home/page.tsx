'use client'

import { useRouter } from 'next/navigation'

import { Logger } from '@/shared/lib/utils/logger'
import { getProfile, signOut } from '@/shared/server/api/auth'
import { Button } from '@/shared/ui/button'

export default function HomePage() {
  const router = useRouter()
  const handleSignout = async () => {
    await signOut()

    router.push('/signin')
  }

  const handleGetProfile = async () => {
    try {
      await getProfile()
    } catch (e) {
      Logger.get().error(e)
    }
  }

  return (
    <div>
      HomePage
      <Button onClick={() => handleSignout()}>Logout</Button>
      <Button onClick={() => handleGetProfile()}>Get Profile</Button>
    </div>
  )
}
