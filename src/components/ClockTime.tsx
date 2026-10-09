import { Moon, Sun, Sunrise, Sunset } from 'lucide-react'
import { cn } from '../lib/cn'
import { formatTime12 } from '../lib/format'

function hourFromTime(time: string): number {
  const hours = Number(time.split(':')[0])
  return Number.isNaN(hours) ? 0 : hours
}

/** Sun/moon icon for a 24-hour value — never an emoji. */
function TimeOfDayIcon({ hour, className }: { hour: number; className?: string }) {
  if (hour < 6) return <Moon className={className} aria-hidden />
  if (hour < 9) return <Sunrise className={className} aria-hidden />
  if (hour < 17) return <Sun className={className} aria-hidden />
  if (hour < 19) return <Sunset className={className} aria-hidden />
  return <Moon className={className} aria-hidden />
}

interface ClockTimeProps {
  time: string
  className?: string
  iconClassName?: string
}

/** Renders a 24-hour "HH:MM" string as a 12-hour time with a sun/moon icon. */
export function ClockTime({ time, className, iconClassName }: ClockTimeProps) {
  return (
    <span className={cn('inline-flex items-center gap-1.5 whitespace-nowrap', className)}>
      <TimeOfDayIcon hour={hourFromTime(time)} className={cn('size-3.5 shrink-0 text-primary', iconClassName)} />
      {formatTime12(time)}
    </span>
  )
}
