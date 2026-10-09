import { useEffect, useMemo, useState } from 'react'
import { Check, Download, FileText, Home, Luggage, Plane, Wifi } from 'lucide-react'
import { ActionButton } from '../components/ActionButton'
import { AppHeader } from '../components/AppHeader'
import { BottomTabBar } from '../components/BottomTabBar'
import type { TabItem } from '../components/BottomTabBar'
import { FlightBoard } from '../components/FlightBoard'
import { MobileFrame } from '../components/MobileFrame'
import { Card, Divider, Eyebrow, KeyValue, NoteCard, Pill, Screen, SectionTitle } from '../components/primitives'
import { tripData } from '../data/trip'
import { useCountdown } from '../hooks/useCountdown'
import { cn } from '../lib/cn'
import { formatClock, formatDate } from '../lib/format'
import { downloadPdf, wrapText } from '../lib/pdf'

const TABS: TabItem[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'packing', label: 'Packing', icon: Luggage },
  { id: 'documents', label: 'Docs', icon: FileText },
  { id: 'connectivity', label: 'Connect', icon: Wifi },
]

const PACKING_KEY = 'locotrails-packing-v1'

interface PreTripAppProps {
  onExit: () => void
  onStartTrip: () => void
}

export function PreTripApp({ onExit, onStartTrip }: PreTripAppProps) {
  const [tab, setTab] = useState('home')
  const activeLabel = TABS.find((item) => item.id === tab)?.label ?? ''

  return (
    <MobileFrame
      header={
        <AppHeader
          title={tripData.trip.title}
          label={`Pre-Trip · ${activeLabel}`}
          onBack={onExit}
        />
      }
      footer={<BottomTabBar tabs={TABS} active={tab} onChange={setTab} />}
    >
      {tab === 'home' ? <HomeTab onStartTrip={onStartTrip} onGo={setTab} /> : null}
      {tab === 'packing' ? <PackingTab /> : null}
      {tab === 'documents' ? <DocumentsTab /> : null}
      {tab === 'connectivity' ? <ConnectivityTab /> : null}
    </MobileFrame>
  )
}

function HomeTab({ onStartTrip, onGo }: { onStartTrip: () => void; onGo: (tab: string) => void }) {
  const { trip, flights, days } = tripData
  const countdown = useCountdown(trip.startDate)
  const nextFlight = flights[0]

  return (
    <Screen>
      <div className="go-float-in relative -mx-5 -mt-6 mb-5 h-44 overflow-hidden">
        <img src={days[0].coverImage} alt={trip.destination} className="go-kenburns size-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/10" />
        <div className="absolute bottom-4 left-5 right-5 text-white">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/85">
            {trip.destination} · {trip.travellers} travellers
          </p>
          <h1 className="mt-1 font-display text-[26px] font-semibold leading-tight tracking-tight">{trip.title}</h1>
        </div>
      </div>

      <Card className="go-float-in go-stagger-2 flex items-center justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            {countdown.isPast ? 'Trip time' : 'Departs in'}
          </p>
          <p className="mt-1 font-mono text-[30px] font-semibold leading-none tabular-nums text-primary">
            {countdown.days}d {countdown.hours}h
          </p>
        </div>
        <div className="text-right text-[11px] text-muted-foreground">
          <p className="font-semibold text-foreground">{formatDate(trip.startDate)}</p>
          <p>
            {nextFlight.airline.code} {nextFlight.flightNumber} · {formatClock(nextFlight.departTime)}
          </p>
        </div>
      </Card>

      <ActionButton className="go-float-in go-stagger-3 mt-3" pulse onClick={onStartTrip} icon={<Plane className="size-4" />}>
        Start Trip
      </ActionButton>
      <p className="mt-2 text-center text-[11px] text-muted-foreground">
        Starts the trip and opens the day-by-day guide.
      </p>

      <div className="mt-6">
        <Eyebrow>Your flights</Eyebrow>
        <div className="go-float-in mt-3">
          <FlightBoard flights={flights} />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => onGo('packing')}
          className="go-float-in flex flex-col items-start gap-1 rounded-2xl border border-border bg-surface p-4 text-left shadow-soft transition-transform active:scale-[0.98]"
        >
          <Luggage className="size-5 text-primary" />
          <span className="mt-1 text-[13px] font-semibold text-foreground">Packing</span>
          <span className="text-[11px] text-muted-foreground">What &amp; how much</span>
        </button>
        <button
          type="button"
          onClick={() => onGo('documents')}
          className="go-float-in flex flex-col items-start gap-1 rounded-2xl border border-border bg-surface p-4 text-left shadow-soft transition-transform active:scale-[0.98]"
        >
          <FileText className="size-5 text-primary" />
          <span className="mt-1 text-[13px] font-semibold text-foreground">Documents</span>
          <span className="text-[11px] text-muted-foreground">Tickets &amp; visas</span>
        </button>
        <button
          type="button"
          onClick={() => onGo('connectivity')}
          className="go-float-in col-span-2 flex items-center gap-3 rounded-2xl border border-border bg-surface p-4 text-left shadow-soft transition-transform active:scale-[0.98]"
        >
          <Wifi className="size-5 text-primary" />
          <span className="min-w-0 flex-1">
            <span className="block text-[13px] font-semibold text-foreground">Connectivity</span>
            <span className="text-[11px] text-muted-foreground">eSIM &amp; roaming — stay online from landing</span>
          </span>
        </button>
      </div>
    </Screen>
  )
}

function PackingTab() {
  const { packing, baggage, trip, flights } = tripData
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
  const perPax = baggage.checkInPerPax + baggage.cabinPerPax
  const totalKg = perPax * trip.travellers

  function toggle(key: string) {
    setChecked((prev) => (prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key]))
  }

  return (
    <Screen>
      <Eyebrow>What to pack</Eyebrow>
      <SectionTitle className="mt-1">
        {checked.length}/{total} packed
      </SectionTitle>

      <div className="mt-5 space-y-4">
        {packing.map((group) => (
          <Card key={group.group} className="go-float-in">
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

      <div className="mt-8">
        <Eyebrow>How much to pack</Eyebrow>
        <SectionTitle className="mt-1">Baggage allowance</SectionTitle>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <Card className="go-float-in">
            <div className="text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">Check-in / pax</div>
            <div className="mt-1 font-mono text-[28px] font-semibold tabular-nums text-foreground">
              {baggage.checkInPerPax} kg
            </div>
          </Card>
          <Card className="go-float-in">
            <div className="text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">Cabin / pax</div>
            <div className="mt-1 font-mono text-[28px] font-semibold tabular-nums text-foreground">
              {baggage.cabinPerPax} kg
            </div>
          </Card>
        </div>

        <Card className="go-float-in mt-3 border-l-4 border-l-primary">
          <div className="text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
            {perPax} kg × {trip.travellers} travellers · {flights[0].airline.name}
          </div>
          <div className="mt-1 font-mono text-[40px] font-semibold leading-none tabular-nums text-primary">
            {totalKg} kg
          </div>
          <div className="mt-1 text-[12px] text-muted-foreground">total allowed across the group</div>
        </Card>

        <p className="mt-3 text-[11px] text-muted-foreground">{baggage.policyNote}</p>

        <NoteCard tone="success" className="mt-4">
          <strong>Only pack 60–70% now.</strong> Leave room for shopping on the way home — and it makes the
          return trip far more comfortable.
        </NoteCard>
      </div>
    </Screen>
  )
}

function DocumentsTab() {
  const { documents, trip } = tripData

  function download(name: string, category: string, detail: string) {
    const lines = [
      `Trip: ${trip.title}`,
      `Destination: ${trip.destination}`,
      `Travellers: ${trip.travellers}`,
      `Category: ${category}`,
      '',
      ...wrapText(detail),
      '',
      'Generated from the LocoTrails guidebook.',
    ]
    downloadPdf(`${name.replace(/[^\w]+/g, '-').toLowerCase()}.pdf`, name, lines)
  }

  return (
    <Screen>
      <Eyebrow>Documentation</Eyebrow>
      <SectionTitle className="mt-1">Everything in one place</SectionTitle>
      <p className="mt-2 text-[12px] text-muted-foreground">
        Preview each document and download a PDF copy for offline use.
      </p>

      <div className="mt-5 space-y-3">
        {documents.map((doc) => (
          <Card key={doc.name} className="go-float-in">
            <div className="flex items-start gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <FileText className="size-5" />
              </span>
              <div className="min-w-0 flex-1">
                <Pill>{doc.category}</Pill>
                <div className="mt-2 text-[13px] font-semibold text-foreground">{doc.name}</div>
                <p className="mt-1 text-[12px] text-muted-foreground">{doc.detail}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => download(doc.name, doc.category, doc.detail)}
              className="mt-3 flex min-h-10 w-full items-center justify-center gap-2 rounded-xl border border-border bg-surface text-[12px] font-semibold text-foreground transition-transform active:scale-[0.98]"
            >
              <Download className="size-4 text-primary" /> Download PDF
            </button>
          </Card>
        ))}
      </div>
    </Screen>
  )
}

function ConnectivityTab() {
  const { connectivity } = tripData

  return (
    <Screen>
      <Eyebrow>Connectivity</Eyebrow>
      <SectionTitle className="mt-1">{connectivity.headline}</SectionTitle>
      <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">{connectivity.summary}</p>

      <NoteCard tone="info" className="mt-4">
        <strong>Best plan:</strong> buy an eSIM from India, install it now, and switch it on the moment you
        land — so you are online the second you touch down.
      </NoteCard>

      <div className="mt-5 space-y-3">
        {connectivity.options.map((option) => (
          <Card
            key={option.name}
            className={cn('go-float-in', option.recommended && 'border-l-4 border-l-primary')}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="text-[13px] font-semibold text-foreground">{option.name}</div>
                <p className="mt-1 text-[12px] text-muted-foreground">{option.note}</p>
              </div>
              {option.recommended ? <Pill className="shrink-0 border-primary text-primary">Recommended</Pill> : null}
            </div>
            <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
              <span className="font-mono text-[15px] font-semibold tabular-nums text-foreground">{option.price}</span>
              <button
                type="button"
                className="flex min-h-9 items-center gap-1.5 rounded-full border border-border bg-surface px-3.5 text-[12px] font-semibold text-foreground transition-transform active:scale-95"
              >
                <Wifi className="size-3.5 text-primary" /> Get this
              </button>
            </div>
          </Card>
        ))}
      </div>

      <NoteCard tone="warning" className="mt-4">
        {connectivity.roamingNote}
      </NoteCard>

      <Divider className="my-6" />
      <KeyValue label="Arrival terminal" value="Hanoi (HAN) · T2" />
      <KeyValue label="Local carriers" value="Viettel · Vinaphone · Mobifone" />
    </Screen>
  )
}
