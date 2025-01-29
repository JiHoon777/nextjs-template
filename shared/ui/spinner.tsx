import { cn } from '@/shared/lib/utils/cn'

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizeVariants = {
  lg: 'w-8 h-8',
  md: 'w-6 h-6',
  sm: 'w-4 h-4',
}

export function Spinner({ size = 'md', className }: SpinnerProps) {
  return (
    <div
      className={cn(
        'animate-spin rounded-full border-2 border-current border-t-transparent text-gray-400',
        sizeVariants[size],
        className,
      )}
    />
  )
}
