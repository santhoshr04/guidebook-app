import { forwardRef } from 'react'
import type { ReactNode } from 'react'
import { cn } from '../lib/cn'

interface MobileFrameProps {
  header?: ReactNode
  footer?: ReactNode
  overlay?: ReactNode
  children: ReactNode
  className?: string
}

export const MobileFrame = forwardRef<HTMLDivElement, MobileFrameProps>(function MobileFrame(
  { header, footer, overlay, children, className },
  ref,
) {
  return (
    <div className="fixed inset-0 flex justify-center overflow-hidden bg-background">
      <div
        className={cn(
          'relative z-10 flex h-full min-h-0 w-full max-w-[440px] flex-col overflow-hidden border-x border-border bg-background shadow-soft',
          className,
        )}
      >
        {header}
        <div
          ref={ref}
          data-go-scroll-root
          className="scrollbar-thin relative min-h-0 flex-1 overflow-y-auto overscroll-contain scroll-smooth"
        >
          {children}
        </div>
        {footer}
        {overlay}
      </div>
    </div>
  )
})
