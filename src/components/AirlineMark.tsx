import { useState } from 'react'
import { Plane } from 'lucide-react'
import { cn } from '../lib/cn'
import { airlineLogoUrl } from '../lib/airlines'
import type { Airline } from '../types'

/** Airline logo tile — loads the real logo, falling back to a colour tile on error. */
export function AirlineMark({ airline, size = 'md' }: { airline: Airline; size?: 'sm' | 'md' }) {
  const [failed, setFailed] = useState(false)
  const box = size === 'sm' ? 'size-7 rounded-md' : 'size-9 rounded-lg'

  return (
    <span
      className={cn(
        'flex shrink-0 items-center justify-center overflow-hidden border border-border bg-white shadow-soft',
        box,
      )}
      aria-hidden
    >
      {failed ? (
        <span
          className="flex size-full items-center justify-center text-white"
          style={{ backgroundColor: airline.color }}
        >
          <Plane className={size === 'sm' ? 'size-3.5' : 'size-4'} />
        </span>
      ) : (
        <img
          src={airlineLogoUrl(airline.code)}
          alt=""
          loading="lazy"
          onError={() => setFailed(true)}
          className={cn('object-contain', size === 'sm' ? 'size-5' : 'size-6')}
        />
      )}
    </span>
  )
}
