import { ChevronRight } from 'lucide-react'
import type { TripDay } from '../types'
import { formatDate } from '../lib/format'

interface DayCoverProps {
  day: TripDay
  onContinue: () => void
}

export function DayCover({ day, onContinue }: DayCoverProps) {
  return (
    <section className="relative flex min-h-full flex-col overflow-hidden">
      <div
        className="go-kenburns absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${day.coverImage})` }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" aria-hidden />
      <div className="relative flex flex-1 flex-col justify-end px-5 pt-10 pb-[calc(env(safe-area-inset-bottom)+1.5rem)] text-white">
        <p className="go-float-in go-stagger-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/85">
          Day {day.n} · {formatDate(day.date)}
        </p>
        <h1 className="go-float-in go-stagger-3 mt-1.5 font-display text-[40px] leading-[1.02] font-semibold tracking-tight">
          {day.place}
        </h1>
        <p className="go-float-in go-stagger-4 mt-2 max-w-[34ch] text-[13px] leading-relaxed text-white/90">
          {day.summary}
        </p>
        <div className="go-float-in go-stagger-5 mt-4 flex gap-4 font-mono text-[12px] tabular-nums text-white/90">
          <span>Pickup {day.pickup}</span>
          <span>Drop {day.drop}</span>
        </div>
        <button
          type="button"
          onClick={onContinue}
          className="go-float-in go-stagger-6 mt-6 flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl border border-white/25 bg-white px-4 text-[14px] font-semibold tracking-tight text-foreground shadow-pop transition-transform active:scale-[0.98]"
        >
          Start the day <ChevronRight className="size-4" />
        </button>
      </div>
    </section>
  )
}
