import { ArrowLeft } from 'lucide-react'
import { cn } from '../lib/cn'

interface BackButtonProps {
  onClick: () => void
  className?: string
}

export function BackButton({ onClick, className }: BackButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Go back"
      className={cn(
        'flex size-9 shrink-0 items-center justify-center rounded-full border border-border bg-surface text-foreground shadow-soft',
        'transition-colors duration-200 hover:bg-muted/70 active:bg-muted active:scale-95',
        className,
      )}
    >
      <ArrowLeft className="size-4" />
    </button>
  )
}
