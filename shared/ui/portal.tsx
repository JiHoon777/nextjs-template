'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

export function Portal({
  children,
  containerEl,
}: {
  containerEl?: HTMLElement
} & React.PropsWithChildren): React.JSX.Element | null {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return mounted ? createPortal(children, containerEl ?? document.body) : null
}
