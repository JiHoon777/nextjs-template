'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
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
import { signUpWithCredentials } from '@/server/auth'

const signupWithCredentialsSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(8, { message: 'Password is too short' }),
})

export default function SignupForm() {
  const form = useForm<z.infer<typeof signupWithCredentialsSchema>>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(signupWithCredentialsSchema),
  })

  const { mutate, isPending } = useMutation({
    mutationFn: async (inputs: z.infer<typeof signupWithCredentialsSchema>) => {
      return signUpWithCredentials(inputs)
    },
    onSuccess: () => {
      showToast.success('Successfully signed up')
    },
    onError: (error: any) => {
      console.log(48, error)
      showToast.error(
        error?.cause?.err?.message || error?.message || 'Failed to sign up',
      )
    },
  })
  const onSubmit = async (
    values: z.infer<typeof signupWithCredentialsSchema>,
  ) => {
    mutate(values)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full shrink-0 flex-col gap-4"
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
          <Button type="submit" disabled={isPending}>
            {isPending ? (
              <div className="flex items-center gap-2">
                <Spinner size="sm" />
                <span>처리중...</span>
              </div>
            ) : (
              '회원가입'
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}
