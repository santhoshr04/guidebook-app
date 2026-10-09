import { Plane } from 'lucide-react'
import { cn } from '../lib/cn'
import type { Flight } from '../types'
import { AirlineMark } from './AirlineMark'

/** Departure-board style table: Flight · Destination · Airline, with logo + flag + IATA pill. */
export function FlightBoard({ flights }: { flights: Flight[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-soft">
      <div className="grid grid-cols-[minmax(0,1.1fr)_minmax(0,1.5fr)_minmax(0,1fr)] gap-2 border-b border-border bg-muted/60 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
        <span>Flight</span>
        <span>Destination</span>
        <span>Airline</span>
      </div>
      {flights.map((flight, index) => (
        <div
          key={`${flight.flightNumber}-${index}`}
          className={cn(
            'grid grid-cols-[minmax(0,1.1fr)_minmax(0,1.5fr)_minmax(0,1fr)] items-center gap-2 px-3 py-3',
            index % 2 === 1 ? 'bg-muted/30' : 'bg-surface',
          )}
        >
          <span className="flex items-center gap-1.5">
            <Plane className="size-3.5 shrink-0" style={{ color: flight.airline.color }} />
            <span className="truncate font-mono text-[12px] font-semibold tabular-nums text-foreground">
              {flight.airline.code} {flight.flightNumber}
            </span>
          </span>
          <span className="flex min-w-0 items-center gap-1.5">
            <span aria-hidden>{flight.to.flag}</span>
            <span className="truncate text-[12px] font-semibold text-foreground">{flight.to.city}</span>
            <span className="shrink-0 rounded-full bg-muted px-1.5 py-0.5 font-mono text-[9px] font-semibold tracking-wide text-muted-foreground">
              {flight.to.code}
            </span>
          </span>
          <span className="flex min-w-0 items-center gap-1.5">
            <AirlineMark airline={flight.airline} size="sm" />
            <span className="truncate text-[11px] text-muted-foreground">{flight.airline.name}</span>
          </span>
        </div>
      ))}
    </div>
  )
}
