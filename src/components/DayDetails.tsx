import {
  Backpack,
  Bus,
  Camera,
  Car,
  Check,
  CloudSun,
  Info,
  MapPin,
  Phone,
  Ticket,
  User,
  UtensilsCrossed,
} from 'lucide-react'
import type { TripDay } from '../types'
import { cn } from '../lib/cn'
import { Card, Divider, Eyebrow, KeyValue, NoteCard, SectionTitle } from './primitives'

export function DayDetails({ day }: { day: TripDay }) {
  return (
    <>
      <Eyebrow>Today at a glance</Eyebrow>
      <SectionTitle className="mt-1">{day.summary}</SectionTitle>

      <Card className="go-float-in go-stagger-2 mt-4">
        <KeyValue label="Staying" value={day.stay} />
        <Divider className="my-1" />
        <KeyValue label="Day starts" value={`${day.dayStart} — ${day.dayEnd}`} />
        <Divider className="my-1" />
        <KeyValue label="Planned activities" value={`${day.plannedHours} hrs`} />
        <Divider className="my-1" />
        <KeyValue label="Free from" value={day.freeFrom} />
        <Divider className="my-1" />
        <KeyValue label="Pickup / drop" value={`${day.pickup} / ${day.drop}`} />
        <Divider className="my-1" />
        <KeyValue label="Meeting point" value={day.meetingPoint} />
      </Card>

      <div className="mt-6">
        <div className="flex items-center gap-2">
          <UtensilsCrossed className="size-4 text-primary" />
          <Eyebrow>Meals today</Eyebrow>
        </div>
        <Card className="go-float-in mt-3 divide-y divide-border">
          {day.meals.map((meal) => (
            <div key={meal.label} className="flex items-center justify-between gap-3 py-2.5 first:pt-0 last:pb-0">
              <div className="min-w-0">
                <div className="text-[13px] font-semibold text-foreground">{meal.label}</div>
                <div className="text-[11px] text-muted-foreground">{meal.detail}</div>
              </div>
              <span
                className={cn(
                  'shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em]',
                  meal.included ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground',
                )}
              >
                {meal.included ? 'Included' : 'On own'}
              </span>
            </div>
          ))}
        </Card>
      </div>

      <div className="mt-6">
        <Eyebrow>Who&rsquo;s looking after you</Eyebrow>
        <div className="mt-3 space-y-2.5">
          <Card className="go-float-in flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-full border border-border bg-muted/50">
              <User className="size-4 text-primary" />
            </span>
            <div className="min-w-0 flex-1">
              <div className="text-[13px] font-semibold text-foreground">{day.coordinator.name}</div>
              <div className="text-[11px] text-muted-foreground">{day.coordinator.role}</div>
            </div>
            <a
              href={`tel:${day.coordinator.phone.replace(/\s/g, '')}`}
              className="flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-[11px] font-semibold transition-transform active:scale-95"
            >
              <Phone className="size-3.5" /> Call
            </a>
          </Card>

          <Card className="go-float-in">
            <div className="flex items-center gap-2">
              <Car className="size-4 text-primary" />
              <span className="text-[12px] font-semibold uppercase tracking-[0.12em] text-primary">Your driver</span>
            </div>
            <div className="mt-3 flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-full border border-border bg-muted/50">
                <User className="size-4 text-primary" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="text-[13px] font-semibold text-foreground">{day.driver.name}</div>
                <div className="text-[11px] text-muted-foreground">
                  Arrives {day.driver.arrival} · {day.driver.car}
                </div>
              </div>
              <a
                href={`tel:${day.driver.phone.replace(/\s/g, '')}`}
                className="flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-[11px] font-semibold transition-transform active:scale-95"
              >
                <Phone className="size-3.5" /> Call
              </a>
            </div>
            <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
              <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                Car number
              </span>
              <span className="font-mono text-[14px] font-semibold tabular-nums text-foreground">
                {day.driver.carNumber}
              </span>
            </div>
          </Card>
        </div>
      </div>

      {day.photoSpots.length > 0 ? (
        <div className="mt-6">
          <div className="flex items-center gap-2">
            <Camera className="size-4 text-primary" />
            <Eyebrow>Photo spots today</Eyebrow>
          </div>
          <div className="no-scrollbar mt-3 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-1">
            {day.photoSpots.map((spot) => (
              <div
                key={spot.name}
                className="w-40 shrink-0 snap-center overflow-hidden rounded-2xl border border-border bg-surface shadow-soft"
              >
                <img src={spot.image} alt={spot.name} className="h-24 w-full object-cover" />
                <div className="flex items-center gap-1 px-2.5 py-2 text-[11px] font-semibold text-foreground">
                  <MapPin className="size-3 shrink-0 text-primary" />
                  <span className="truncate">{spot.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      <div className="mt-6">
        <div className="flex items-center gap-2">
          <Ticket className="size-4 text-primary" />
          <Eyebrow>What&rsquo;s included</Eyebrow>
        </div>
        <Card className="go-float-in mt-3">
          <ul className="space-y-2">
            {day.inclusions.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-[13px] text-foreground">
                <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-success/10 text-success">
                  <Check className="size-3" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <div className="mt-6">
        <div className="flex items-center gap-2">
          <Backpack className="size-4 text-primary" />
          <Eyebrow>Carry for the day</Eyebrow>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {day.carry.map((item) => (
            <span
              key={item}
              className="rounded-full border border-border bg-surface px-3 py-1.5 text-[11px] font-semibold text-foreground shadow-soft"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <Eyebrow>Weather briefing</Eyebrow>
        <Card className="go-float-in mt-3 flex items-center gap-3">
          <CloudSun className="size-8 text-primary" />
          <div>
            <div className="font-mono text-[18px] font-semibold tabular-nums text-foreground">{day.weather.temp}</div>
            <div className="text-[12px] text-muted-foreground">{day.weather.note}</div>
          </div>
        </Card>
      </div>

      <div className="mt-6">
        <div className="flex items-center gap-2">
          <Info className="size-4 text-primary" />
          <Eyebrow>Good to know</Eyebrow>
        </div>
        <NoteCard tone="info" className="mt-3">
          <ul className="space-y-1.5">
            {day.notes.map((note) => (
              <li key={note} className="flex gap-2 text-foreground">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                {note}
              </li>
            ))}
          </ul>
        </NoteCard>
      </div>

      {day.transit ? (
        <NoteCard tone="warning" className="mt-6">
          <div className="flex items-center gap-2 font-semibold">
            <Bus className="size-4" /> Transit via {day.transit.city}
          </div>
          <p className="mt-1 text-[12px] text-muted-foreground">{day.transit.note}</p>
        </NoteCard>
      ) : null}
    </>
  )
}
