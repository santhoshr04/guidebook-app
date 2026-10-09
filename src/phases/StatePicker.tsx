import { MapPinned, Plane, Sparkles } from 'lucide-react'
import { ActionButton } from '../components/ActionButton'
import { MobileFrame } from '../components/MobileFrame'
import { Eyebrow } from '../components/primitives'
import { tripData } from '../data/trip'
import { formatDate } from '../lib/format'
import type { Phase } from '../types'

interface StatePickerProps {
  onSelect: (phase: Phase) => void
}

export function StatePicker({ onSelect }: StatePickerProps) {
  const { trip } = tripData

  return (
    <MobileFrame>
      <div className="flex min-h-full flex-col px-5 pt-12 pb-[calc(env(safe-area-inset-bottom)+1.5rem)]">
        <p className="go-float-in go-stagger-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-primary">
          {trip.brand.name}
        </p>
        <h1 className="go-float-in go-stagger-2 mt-2 font-display text-[32px] leading-[1.05] font-semibold tracking-tight text-foreground">
          {trip.title}
        </h1>
        <p className="go-float-in go-stagger-3 mt-2 text-[13px] text-muted-foreground">
          {trip.destination} · {formatDate(trip.startDate)} · {trip.travellers} travellers
        </p>

        <div className="go-float-in go-stagger-4 mt-10">
          <Eyebrow>Preview states</Eyebrow>
          <p className="mb-3 mt-1 text-[12px] text-muted-foreground">
            Open any phase — the guidebook changes with the trip.
          </p>
          <div className="space-y-2.5">
            <ActionButton onClick={() => onSelect('pre_trip')} icon={<Plane className="size-4" />}>
              Pre-Trip — before you fly
            </ActionButton>
            <ActionButton
              onClick={() => onSelect('on_trip')}
              variant="outline"
              icon={<MapPinned className="size-4" />}
            >
              In-Trip — day by day
            </ActionButton>
            <ActionButton
              onClick={() => onSelect('post_trip')}
              variant="ghost"
              icon={<Sparkles className="size-4" />}
            >
              Post-Trip — after you&rsquo;re home
            </ActionButton>
          </div>
        </div>

        <p className="mt-auto pt-10 text-center text-[11px] text-muted-foreground">
          A prototype of the always-live LocoTrails guidebook link.
        </p>
      </div>
    </MobileFrame>
  )
}
