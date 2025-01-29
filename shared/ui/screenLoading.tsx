import { Portal } from '@/shared/ui/portal'

export const ScreenLoading = () => {
  return (
    <Portal>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/10">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-current border-t-transparent text-gray-400" />
      </div>
    </Portal>
  )
}
