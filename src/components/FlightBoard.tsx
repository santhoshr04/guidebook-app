import { useState } from 'react'
import type { ReactNode } from 'react'
import { ChevronDown, FileText, Plane } from 'lucide-react'
import { cn } from '../lib/cn'
import { formatClock, formatDate } from '../lib/format'
import { AirlineMark } from './AirlineMark'
import { ClockTime } from './ClockTime'
import { Pill } from './primitives'
import type { DocumentItem, Flight } from '../types'

interface FlightBoardProps {
  flights: Flight[]
  onOpenDocument?: (doc: DocumentItem) => void
}

/** Round-trip flight list. Each flight expands into details + its document. */
export function FlightBoard({ flights, onOpenDocument }: FlightBoardProps) {
  return (
    <div className="space-y-3">
      {flights.map((flight, index) => (
        <FlightRow
          key={`${flight.flightNumber}-${index}`}
          flight={flight}
          onOpenDocument={onOpenDocument}
        />
      ))}
    </div>
  )
}

function FlightRow({
  flight,
  onOpenDocument,
}: {
  flight: Flight
  onOpenDocument?: (doc: DocumentItem) => void
}) {
  const [open, setOpen] = useState(false)

  return (
    <div className="go-float-in overflow-hidden rounded-2xl border border-border bg-surface shadow-soft">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="flex w-full items-center gap-3 px-3 py-3 text-left"
      >
        <AirlineMark airline={flight.airline} />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[12px] font-semibold tabular-nums text-foreground">
              {flight.airline.code} {flight.flightNumber}
            </span>
            <span className="truncate text-[11px] text-muted-foreground">{flight.airline.name}</span>
          </div>
          <div className="mt-1 flex items-center gap-1.5 text-[12px] font-semibold text-foreground">
            <span aria-hidden>{flight.from.flag}</span>
            <span className="font-mono tabular-nums">{flight.from.code}</span>
            <Plane className="size-3 text-primary" />
            <span className="font-mono tabular-nums">{flight.to.code}</span>
            <span aria-hidden>{flight.to.flag}</span>
          </div>
        </div>
        <div className="shrink-0 text-right">
          <div className="text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
            {formatDate(flight.departTime)}
          </div>
          <ClockTime
            time={formatClock(flight.departTime)}
            className="mt-0.5 justify-end text-[11px] font-semibold text-foreground"
          />
        </div>
        <ChevronDown
          className={cn('size-4 shrink-0 text-primary transition-transform duration-200', open && 'rotate-180')}
        />
      </button>

      {open ? (
        <div className="go-fade-in border-t border-border px-3 pb-3 pt-3">
          <div className="grid grid-cols-2 gap-2.5">
            <Detail
              label="Departure"
              value={<ClockTime time={formatClock(flight.departTime)} />}
              sub={`${flight.from.city} · ${flight.from.terminal}`}
            />
            <Detail
              label="Arrival"
              value={<ClockTime time={formatClock(flight.arriveTime)} />}
              sub={`${flight.to.city} · ${flight.to.terminal}`}
            />
            <Detail
              label="Date"
              value={formatDate(flight.departTime)}
              sub={flight.durationHrs ? `${flight.durationHrs} h journey` : undefined}
            />
            {flight.reportBy ? (
              <Detail label="Report by" value={<ClockTime time={formatClock(flight.reportBy)} />} sub="At the airport" />
            ) : null}
          </div>

          {flight.stops ? (
            <div className="mt-2.5 rounded-xl bg-muted/60 px-3 py-2.5">
              <p className="flex items-center gap-1.5 text-[12px] font-semibold text-foreground">
                <Plane className="size-3.5 text-primary" /> {flight.stops}
              </p>
              {flight.layoverNote ? (
                <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">{flight.layoverNote}</p>
              ) : null}
            </div>
          ) : null}

          <button
            type="button"
            onClick={() => onOpenDocument?.(flight.document)}
            className="mt-2.5 flex w-full items-center gap-3 rounded-xl border border-border bg-surface px-3 py-2.5 text-left transition-transform active:scale-[0.99]"
          >
            <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <FileText className="size-4" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[12px] font-semibold text-foreground">
                {flight.document.name}
              </span>
              <span className="text-[11px] text-muted-foreground">Tap to preview &amp; download</span>
            </span>
            <Pill className="shrink-0">{flight.document.category}</Pill>
          </button>
        </div>
      ) : null}
    </div>
  )
}

function Detail({ label, value, sub }: { label: string; value: ReactNode; sub?: string }) {
  return (
    <div className="rounded-xl border border-border bg-surface-elevated p-3">
      <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">{label}</p>
      <div className="mt-1 text-[13px] font-semibold text-foreground">{value}</div>
      {sub ? <p className="mt-0.5 text-[11px] text-muted-foreground">{sub}</p> : null}
    </div>
  )
}
