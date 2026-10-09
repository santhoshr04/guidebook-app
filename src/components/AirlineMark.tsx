import { Plane } from 'lucide-react'
import { cn } from '../lib/cn'
import type { Airline } from '../types'

/** Colour-coded airline logo tile — echoes the airline logos on a departure board. */
export function AirlineMark({ airline, size = 'md' }: { airline: Airline; size?: 'sm' | 'md' }) {
  return (
    <span
      className={cn(
        'flex shrink-0 items-center justify-center rounded-lg text-white shadow-soft',
        size === 'sm' ? 'size-6 rounded-md' : 'size-8',
      )}
      style={{ backgroundColor: airline.color }}
      aria-hidden
    >
      <Plane className={size === 'sm' ? 'size-3.5' : 'size-4'} />
    </span>
  )
}
