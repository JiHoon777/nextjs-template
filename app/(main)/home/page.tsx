'use client'

import { getProfile, signOut } from '@/server/auth'
import { Button } from '@/shared/ui/button'

export default function HomePage() {
  const handleSignout = async () => {
    await signOut()
  }

  const handleGetProfile = async () => {
    const profile = await getProfile()
    console.log(profile)
  }

  return (
    <div>
      HomePage
      <Button onClick={() => handleSignout()}>Logout</Button>
      <Button onClick={() => handleGetProfile()}>Get Profile</Button>
    </div>
  )
}
