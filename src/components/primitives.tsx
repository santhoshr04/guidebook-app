import type { ReactNode } from 'react'
import { cn } from '../lib/cn'

export function Screen({ children, className }: { children: ReactNode; className?: string }) {
  return <section className={cn('go-detail-enter min-h-full px-5 pt-6 pb-8', className)}>{children}</section>
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn('text-[11px] font-semibold uppercase tracking-[0.16em] text-primary', className)}>{children}</p>
  )
}

export function SectionTitle({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <h2 className={cn('font-display text-[22px] font-semibold tracking-tight text-foreground', className)}>
      {children}
    </h2>
  )
}

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('rounded-2xl border border-border bg-surface p-4 shadow-soft', className)}>{children}</div>
}

export function Pill({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border border-border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground',
        className,
      )}
    >
      {children}
    </span>
  )
}

type Tone = 'info' | 'warning' | 'success' | 'neutral'

const TONE_STYLES: Record<Tone, string> = {
  info: 'border-l-primary bg-surface-elevated',
  warning: 'border-l-warning bg-warning/5',
  success: 'border-l-success bg-success/5',
  neutral: 'border-l-border bg-muted/40',
}

export function NoteCard({
  children,
  tone = 'info',
  className,
}: {
  children: ReactNode
  tone?: Tone
  className?: string
}) {
  return (
    <div className={cn('rounded-2xl border border-l-4 p-4 text-[13px] leading-relaxed', TONE_STYLES[tone], className)}>
      {children}
    </div>
  )
}

export function Divider({ className }: { className?: string }) {
  return <div className={cn('h-px w-full bg-border', className)} />
}

export function KeyValue({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 py-2.5">
      <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">{label}</span>
      <span className="max-w-[58%] text-right text-[13px] font-semibold text-foreground">{value}</span>
    </div>
  )
}
