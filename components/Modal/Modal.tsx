'use client'

import { useEffect } from 'react'
import css from './Modal.module.css'
import { createPortal } from 'react-dom'
import { useRouter } from 'next/navigation'


export interface ModalProps {
  children: React.ReactNode
}

export default function Modal({ children }: ModalProps) {
const router = useRouter()

 const handleBackDropClick = (event: React.MouseEvent<HTMLDivElement>) => {
  if (event.target === event.currentTarget) {
    router.back()
  }
 }

 useEffect(() => {
  const handleEscKey = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      router.back()
    }
  }

  const originalOverflow = document.body.style.overflow
  document.body.style.overflow = 'hidden'

  document.addEventListener('keydown', handleEscKey)
  return () => {
    document.removeEventListener('keydown', handleEscKey)
    document.body.style.overflow = originalOverflow
  }
 }, [router])

  return createPortal(<div
  className={css.backdrop}
  onClick={handleBackDropClick}
  role="dialog"
  aria-modal="true"
>
  <div className={css.modal}>
    {children}
  </div>
</div>, document.body)
}