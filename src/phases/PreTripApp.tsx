import { useEffect, useMemo, useState } from 'react'
import { Check, ChevronRight, Plane } from 'lucide-react'
import { ActionButton } from '../components/ActionButton'
import { AppHeader } from '../components/AppHeader'
import { BackButton } from '../components/BackButton'
import { DayDetails } from '../components/DayDetails'
import { MobileFrame } from '../components/MobileFrame'
import { Card, Divider, Eyebrow, KeyValue, NoteCard, Pill, Screen, SectionTitle } from '../components/primitives'
import { tripData } from '../data/trip'
import { useCountdown } from '../hooks/useCountdown'
import { cn } from '../lib/cn'
import { formatClock, formatDate } from '../lib/format'
import type { TripDay } from '../types'

const STEPS = ['cover', 'countdown', 'flight', 'baggage', 'packing', 'places'] as const
type Step = (typeof STEPS)[number]

const LABELS: Record<Step, string> = {
  cover: 'Overview',
  countdown: 'Countdown',
  flight: 'Flight',
  baggage: 'Baggage',
  packing: 'Packing',
  places: 'Places',
}

const CTA: Record<Step, string> = {
  cover: 'Start planning',
  countdown: 'Flight details',
  flight: 'Baggage allowance',
  baggage: 'Packing checklist',
  packing: 'Where you are going',
  places: 'Back to states',
}

const PACKING_KEY = 'locotrails-packing-v1'

interface PreTripAppProps {
  onExit: () => void
}

export function PreTripApp({ onExit }: PreTripAppProps) {
  const [index, setIndex] = useState(0)
  const [previewDay, setPreviewDay] = useState<TripDay | null>(null)
  const step = STEPS[index]
  const isLast = index === STEPS.length - 1

  function next() {
    if (isLast) onExit()
    else setIndex((value) => value + 1)
  }

  function back() {
    if (index === 0) onExit()
    else setIndex((value) => value - 1)
  }

  const header = (
    <AppHeader
      title={tripData.trip.title}
      label={`Pre-Trip · ${LABELS[step]}`}
      pageLabel={`${index + 1}/${STEPS.length}`}
      progress={(index + 1) / STEPS.length}
      onBack={back}
    />
  )

  const footer = (
    <div className="z-20 shrink-0 border-t border-border bg-surface px-5 py-3 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] shadow-soft">
      <ActionButton onClick={next} pulse={index === 0} icon={<Plane className="size-4" />}>
        {CTA[step]}
      </ActionButton>
    </div>
  )

  return (
    <MobileFrame
      header={header}
      footer={footer}
      overlay={previewDay ? <DayPreview day={previewDay} onClose={() => setPreviewDay(null)} /> : null}
    >
      {step === 'cover' ? <CoverStep /> : null}
      {step === 'countdown' ? <CountdownStep /> : null}
      {step === 'flight' ? <FlightStep /> : null}
      {step === 'baggage' ? <BaggageStep /> : null}
      {step === 'packing' ? <PackingStep /> : null}
      {step === 'places' ? <PlacesStep onPreview={setPreviewDay} /> : null}
    </MobileFrame>
  )
}

function CoverStep() {
  const { trip, days } = tripData
  return (
    <section className="relative flex min-h-full flex-col overflow-hidden">
      <div
        className="go-kenburns absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${days[0].coverImage})` }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/20" aria-hidden />
      <div className="relative flex flex-1 flex-col justify-end px-5 pt-10 pb-6 text-white">
        <p className="go-float-in go-stagger-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/85">
          {trip.destination} · {trip.travellers} travellers
        </p>
        <h1 className="go-float-in go-stagger-3 mt-2 font-display text-[38px] leading-[1.03] font-semibold tracking-tight">
          {trip.title}
        </h1>
        <p className="go-float-in go-stagger-4 mt-2 max-w-[34ch] text-[13px] leading-relaxed text-white/90">
          Everything you need before you fly — countdown, flight, baggage and packing, all in one place.
        </p>
        <div className="go-float-in go-stagger-5 mt-4 flex flex-wrap gap-2">
          {days.slice(0, 4).map((day) => (
            <span key={day.n} className="rounded-full border border-white/30 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/90">
              {day.place}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

function CountdownStep() {
  const { trip, flight } = tripData
  const countdown = useCountdown(trip.startDate)

  return (
    <Screen>
      <Eyebrow>Countdown</Eyebrow>
      <SectionTitle className="mt-1">
        {countdown.isPast ? 'Trip time!' : countdown.isUnder24h ? 'Travel tomorrow' : 'Until you fly'}
      </SectionTitle>

      <Card className="go-float-in go-stagger-2 mt-5 py-8 text-center">
        <div className="flex items-baseline justify-center gap-4 font-mono tabular-nums">
          <div>
            <div className="text-[56px] font-semibold leading-none text-primary">{countdown.days}</div>
            <div className="mt-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Days</div>
          </div>
          <div className="text-[32px] leading-none text-border">:</div>
          <div>
            <div className="text-[56px] font-semibold leading-none text-primary">{countdown.hours}</div>
            <div className="mt-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Hours</div>
          </div>
        </div>
      </Card>

      <NoteCard tone={countdown.isUnder24h ? 'warning' : 'info'} className="go-float-in go-stagger-3 mt-4">
        {countdown.isUnder24h ? (
          <>
            <strong>Your flight is coming up.</strong> Be at the airport by{' '}
            {formatClock(flight.reportBy)} and keep your passport and boarding pass handy.
          </>
        ) : (
          <>
            Countdown shows <strong>days and hours only</strong>. Flight details unlock closer to departure —
            in the meantime, finish your packing.
          </>
        )}
      </NoteCard>

      <Divider className="my-5" />
      <p className="text-[12px] text-muted-foreground">
        Departure {formatDate(flight.departTime)} at {formatClock(flight.departTime)} · {flight.airline}{' '}
        {flight.flightNumber}
      </p>
    </Screen>
  )
}

function FlightStep() {
  const { flight } = tripData
  return (
    <Screen>
      <Eyebrow>Flight</Eyebrow>
      <SectionTitle className="mt-1">Your flight to {flight.to.city}</SectionTitle>

      <Card className="go-float-in go-stagger-2 mt-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-[13px] font-semibold text-foreground">
            <Plane className="size-4 text-primary" />
            {flight.airline}
          </div>
          <Pill>{flight.flightNumber}</Pill>
        </div>

        <div className="mt-4 flex items-center justify-between gap-3">
          <div>
            <div className="font-mono text-[24px] font-semibold tabular-nums text-foreground">{flight.from.code}</div>
            <div className="text-[11px] text-muted-foreground">{flight.from.city}</div>
          </div>
          <div className="flex-1 border-t border-dashed border-border" />
          <Plane className="size-4 text-muted-foreground" />
          <div className="flex-1 border-t border-dashed border-border" />
          <div className="text-right">
            <div className="font-mono text-[24px] font-semibold tabular-nums text-foreground">{flight.to.code}</div>
            <div className="text-[11px] text-muted-foreground">{flight.to.city}</div>
          </div>
        </div>

        <Divider className="my-4" />
        <KeyValue label="Take-off" value={`${formatDate(flight.departTime)}, ${formatClock(flight.departTime)}`} />
        <KeyValue label="Report by" value={formatClock(flight.reportBy)} />
        <KeyValue label="Terminal" value={`${flight.from.terminal} → ${flight.to.terminal}`} />
      </Card>

      <NoteCard tone="warning" className="go-float-in go-stagger-3 mt-4">
        Be at the airport at least <strong>3 hours before take-off</strong> for an international departure.
      </NoteCard>
    </Screen>
  )
}

function BaggageStep() {
  const { baggage, trip } = tripData
  const perPax = baggage.checkInPerPax + baggage.cabinPerPax
  const total = perPax * trip.travellers

  return (
    <Screen>
      <Eyebrow>Baggage allowance</Eyebrow>
      <SectionTitle className="mt-1">Pack smart, leave room</SectionTitle>

      <div className="go-float-in go-stagger-2 mt-5 grid grid-cols-2 gap-3">
        <Card>
          <div className="text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">Check-in / pax</div>
          <div className="mt-1 font-mono text-[28px] font-semibold tabular-nums text-foreground">{baggage.checkInPerPax} kg</div>
        </Card>
        <Card>
          <div className="text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">Cabin / pax</div>
          <div className="mt-1 font-mono text-[28px] font-semibold tabular-nums text-foreground">{baggage.cabinPerPax} kg</div>
        </Card>
      </div>

      <Card className="go-float-in go-stagger-3 mt-3 border-l-4 border-l-primary">
        <div className="text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
          {perPax} kg × {trip.travellers} travellers
        </div>
        <div className="mt-1 font-mono text-[40px] font-semibold leading-none tabular-nums text-primary">{total} kg</div>
        <div className="mt-1 text-[12px] text-muted-foreground">total allowed across the group</div>
      </Card>

      <NoteCard tone="success" className="go-float-in go-stagger-4 mt-4">
        <strong>Only pack 60–70% now.</strong> You&rsquo;ll want the space for shopping on the way home — and
        it makes the return trip far more comfortable.
      </NoteCard>
    </Screen>
  )
}

function PackingStep() {
  const { packing } = tripData
  const [checked, setChecked] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem(PACKING_KEY)
      return raw ? (JSON.parse(raw) as string[]) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(PACKING_KEY, JSON.stringify(checked))
  }, [checked])

  const total = useMemo(() => packing.reduce((sum, group) => sum + group.items.length, 0), [packing])

  function toggle(key: string) {
    setChecked((prev) => (prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key]))
  }

  return (
    <Screen>
      <Eyebrow>Packing checklist</Eyebrow>
      <SectionTitle className="mt-1">
        {checked.length}/{total} packed
      </SectionTitle>

      <div className="mt-5 space-y-4">
        {packing.map((group, groupIndex) => (
          <Card key={group.group} className={cn('go-float-in', `go-stagger-${Math.min(groupIndex + 2, 8)}`)}>
            <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-primary">{group.group}</p>
            <div className="mt-3 space-y-1">
              {group.items.map((item) => {
                const key = `${group.group}::${item}`
                const isChecked = checked.includes(key)
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => toggle(key)}
                    className="flex w-full items-center gap-3 py-1.5 text-left transition-transform active:scale-[0.99]"
                  >
                    <span
                      className={cn(
                        'flex size-5 shrink-0 items-center justify-center rounded-md border',
                        isChecked ? 'go-check-pop border-primary bg-primary text-primary-foreground' : 'border-border',
                      )}
                    >
                      {isChecked ? <Check className="size-3.5" /> : null}
                    </span>
                    <span className={cn('text-[13px]', isChecked ? 'text-muted-foreground line-through' : 'text-foreground')}>
                      {item}
                    </span>
                  </button>
                )
              })}
            </div>
          </Card>
        ))}
      </div>
    </Screen>
  )
}

function PlacesStep({ onPreview }: { onPreview: (day: TripDay) => void }) {
  const { days } = tripData
  return (
    <Screen>
      <Eyebrow>Where you are going</Eyebrow>
      <SectionTitle className="mt-1">Places on your itinerary</SectionTitle>
      <p className="mt-2 text-[12px] text-muted-foreground">Tap any day to preview the full plan.</p>

      <div className="mt-5 space-y-4">
        {days.map((day, i) => (
          <button
            key={day.n}
            type="button"
            onClick={() => onPreview(day)}
            className={cn(
              'go-float-in relative block h-44 w-full overflow-hidden rounded-2xl border border-border text-left shadow-soft transition-transform active:scale-[0.99]',
              `go-stagger-${Math.min(i + 2, 8)}`,
            )}
          >
            <img src={day.coverImage} alt={day.place} className="size-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-foreground shadow-soft">
              Preview <ChevronRight className="size-3" />
            </span>
            <div className="absolute bottom-3 left-4 text-white">
              <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/85">
                Day {day.n} · {formatDate(day.date)}
              </div>
              <div className="font-display text-[22px] font-semibold tracking-tight">{day.place}</div>
            </div>
          </button>
        ))}
      </div>
    </Screen>
  )
}

function DayPreview({ day, onClose }: { day: TripDay; onClose: () => void }) {
  return (
    <div className="go-detail-enter absolute inset-0 z-30 flex flex-col bg-background">
      <div className="flex shrink-0 items-center gap-3 border-b border-border bg-surface px-4 pb-3 pt-[calc(env(safe-area-inset-top)+0.75rem)] shadow-soft">
        <BackButton onClick={onClose} />
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-primary">
            Day {day.n} · {formatDate(day.date)}
          </p>
          <p className="truncate font-display text-[15px] font-semibold tracking-tight text-foreground">{day.place}</p>
        </div>
      </div>
      <div className="scrollbar-thin min-h-0 flex-1 overflow-y-auto overscroll-contain scroll-smooth">
        <div className="min-h-full px-5 pt-6 pb-[calc(env(safe-area-inset-bottom)+3rem)]">
          <DayDetails day={day} />
        </div>
      </div>
    </div>
  )
}
