'use client'
import { useRouter } from 'next/navigation'

import { Dialog, DialogContent, DialogTitle } from '@/shared/ui/dialog'

import SignupForm from '../../_ui/SignupForm'

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
