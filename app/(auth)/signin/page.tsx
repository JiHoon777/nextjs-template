'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { showToast } from '@/shared/lib/utils/showToast'
import { Button } from '@/shared/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/ui/form'
import { Input } from '@/shared/ui/input'
import { Spinner } from '@/shared/ui/spinner'
import { signInWithCredentials } from '@/server/auth'

const signInWithCredentialsSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(8, { message: 'Password is too short' }),
})

export default function SignInPage() {
  const form = useForm<z.infer<typeof signInWithCredentialsSchema>>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(signInWithCredentialsSchema),
  })

  const { mutate, isPending } = useMutation({
    mutationFn: async (inputs: z.infer<typeof signInWithCredentialsSchema>) => {
      return signInWithCredentials(inputs)
    },
    onSuccess: (res) => {
      showToast.success('Successfully signed in')
    },
    onError: (error: any) => {
      showToast.error(
        error?.cause?.err?.message || error?.message || 'Failed to sign in',
      )
    },
  })
  const onSubmit = async (
    values: z.infer<typeof signInWithCredentialsSchema>,
  ) => {
    mutate(values)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full max-w-sm flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex w-full justify-end gap-2">
          <Link href="/signup">
            <Button variant="link" type="button" disabled={isPending}>
              회원가입
            </Button>
          </Link>
          <Button type="submit" disabled={isPending}>
            {isPending ? (
              <div className="flex items-center gap-2">
                <Spinner size="sm" />
                <span>처리중...</span>
              </div>
            ) : (
              '로그인'
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}
