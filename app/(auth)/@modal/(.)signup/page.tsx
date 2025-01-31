'use client'
import { useRouter } from 'next/navigation'

import SignupForm from '@/app/(auth)/_ui/SignupForm'
import { Dialog, DialogContent, DialogTitle } from '@/shared/ui/dialog'

export default function SignUpModal() {
  const router = useRouter()

  console.log('hi')
  return (
    <Dialog open onOpenChange={() => router.back()}>
      <DialogContent aria-description="Sign up">
        <DialogTitle>Sign up</DialogTitle>
        <SignupForm />
      </DialogContent>
    </Dialog>
  )
}
