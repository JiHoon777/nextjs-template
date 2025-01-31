import { toast } from 'sonner'

import { isPrimitive } from './isPrimitive'

export const showToast = {
  error: (error: unknown) => {
    if (isPrimitive(error)) {
      toast.error(error?.toString() || 'Unknown Error')
      return
    }

    if (error instanceof Error) {
      toast.error(error.message)
      return
    }

    try {
      toast.error(JSON.stringify(error))
    } catch {
      toast.error('Unknown Error')
    }
  },
  info: (message: string) => {
    toast.info(message)
  },
  success: (message: string) => {
    toast.success(message)
  },
}
