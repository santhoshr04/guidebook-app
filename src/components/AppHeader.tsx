import type { ReactNode } from 'react'
import { BackButton } from './BackButton'

interface AppHeaderProps {
  title: string
  label: string
  pageLabel?: string
  progress?: number
  onBack?: () => void
  action?: ReactNode
}

export function AppHeader({ title, label, pageLabel, progress, onBack, action }: AppHeaderProps) {
  return (
    <div className="relative z-20 shrink-0 border-b border-border bg-surface pt-[env(safe-area-inset-top)] shadow-soft">
      <div className="relative flex min-h-14 items-center justify-center">
        <div className="absolute left-1.5 top-1/2 -translate-y-1/2">
          {onBack ? <BackButton onClick={onBack} /> : <span className="block size-9" aria-hidden />}
        </div>
        <div className="min-w-0 max-w-[64%] text-center">
          <p className="truncate font-display text-[15px] font-semibold tracking-tight text-foreground">{title}</p>
          <p className="mt-1 truncate text-[10px] font-semibold uppercase tracking-[0.14em] text-primary">{label}</p>
        </div>
        {action ? (
          <div className="absolute right-2 top-1/2 -translate-y-1/2">{action}</div>
        ) : pageLabel ? (
          <div className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full border border-border bg-muted/60 px-2.5 py-1 font-mono text-[10px] leading-none tabular-nums text-muted-foreground">
            {pageLabel}
          </div>
        ) : null}
      </div>
      {typeof progress === 'number' ? (
        <div className="h-1 bg-muted">
          <div
            className="h-full rounded-full bg-gradient-to-r from-primary to-secondary transition-[width] duration-500 ease-out"
            style={{ width: `${Math.round(progress * 100)}%` }}
          />
        </div>
      ) : null}
    </div>
  )
}
