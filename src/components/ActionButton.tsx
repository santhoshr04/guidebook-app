import { ArrowRight } from 'lucide-react'
import type { ReactNode } from 'react'
import { cn } from '../lib/cn'

type Variant = 'primary' | 'outline' | 'ghost' | 'success' | 'destructive'

const VARIANT_STYLES: Record<Variant, string> = {
  primary:
    'border-primary bg-gradient-to-b from-primary to-[color-mix(in_oklab,var(--color-primary)_86%,black)] text-primary-foreground hover:to-primary',
  outline: 'border-border bg-surface text-foreground hover:border-primary/50 hover:bg-primary/5',
  ghost: 'border-transparent bg-muted/70 text-foreground hover:bg-muted',
  success: 'border-success bg-success text-white hover:bg-success/95',
  destructive: 'border-destructive bg-destructive text-white hover:bg-destructive/95',
}

interface ActionButtonProps {
  children: ReactNode
  onClick?: () => void
  variant?: Variant
  icon?: ReactNode
  pulse?: boolean
  className?: string
  type?: 'button' | 'submit'
}

export function ActionButton({
  children,
  onClick,
  variant = 'primary',
  icon,
  pulse,
  className,
  type = 'button',
}: ActionButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={cn(
        'group flex min-h-12 w-full items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-left text-[14px] font-semibold tracking-tight shadow-soft',
        'transition-transform duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2',
        'disabled:cursor-not-allowed disabled:opacity-60',
        VARIANT_STYLES[variant],
        pulse && 'go-pulse-cta',
        className,
      )}
    >
      <span className="min-w-0">{children}</span>
      <span className="shrink-0 transition-transform duration-200 group-hover:translate-x-0.5">
        {icon ?? <ArrowRight className="size-4" />}
      </span>
    </button>
  )
}
