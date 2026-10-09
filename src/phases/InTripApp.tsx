import { useState } from 'react'
import {
  AlertTriangle,
  BookOpen,
  Building2,
  CalendarDays,
  ChevronDown,
  Download,
  Languages,
  LifeBuoy,
  Phone,
  Play,
  Ticket,
  UtensilsCrossed,
  Wine,
} from 'lucide-react'
import { ActionButton } from '../components/ActionButton'
import { AppHeader } from '../components/AppHeader'
import { BottomTabBar } from '../components/BottomTabBar'
import type { TabItem } from '../components/BottomTabBar'
import { DayDetails } from '../components/DayDetails'
import { MobileFrame } from '../components/MobileFrame'
import { RatingPanel } from '../components/RatingPanel'
import { Card, Eyebrow, NoteCard, Pill, Screen, SectionTitle } from '../components/primitives'
import { tripData } from '../data/trip'
import { cn } from '../lib/cn'
import { downloadPdf, wrapText } from '../lib/pdf'
import type { Accommodation, Contact, Phrase } from '../types'

const TABS: TabItem[] = [
  { id: 'today', label: 'Today', icon: CalendarDays },
  { id: 'tickets', label: 'Tickets', icon: Ticket },
  { id: 'reference', label: 'Reference', icon: BookOpen },
  { id: 'support', label: 'Support', icon: LifeBuoy },
]

interface InTripAppProps {
  onExit: () => void
}

export function InTripApp({ onExit }: InTripAppProps) {
  const { days, trip } = tripData
  const [tab, setTab] = useState('today')
  const [dayIndex, setDayIndex] = useState(0)
  const day = days[dayIndex]
  const activeLabel = TABS.find((item) => item.id === tab)?.label ?? ''

  return (
    <MobileFrame
      header={
        <AppHeader
          title={trip.title}
          label={tab === 'today' ? `Day ${day.n} of ${days.length} · ${day.place}` : `In-Trip · ${activeLabel}`}
          onBack={onExit}
        />
      }
      footer={<BottomTabBar tabs={TABS} active={tab} onChange={setTab} />}
    >
      {tab === 'today' ? (
        <TodayTab dayIndex={dayIndex} onSelectDay={setDayIndex} />
      ) : null}
      {tab === 'tickets' ? <TicketsTab /> : null}
      {tab === 'reference' ? <ReferenceTab /> : null}
      {tab === 'support' ? <SupportTab /> : null}
    </MobileFrame>
  )
}

function TodayTab({ dayIndex, onSelectDay }: { dayIndex: number; onSelectDay: (index: number) => void }) {
  const { days } = tripData
  const day = days[dayIndex]

  return (
    <Screen>
      <div className="go-float-in -mx-5 -mt-6 mb-5">
        <div className="relative h-40 overflow-hidden">
          <img src={day.coverImage} alt={day.place} className="go-kenburns size-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />
          <div className="absolute bottom-4 left-5 right-5 text-white">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/85">
              Day {day.n} of {days.length}
            </p>
            <h1 className="mt-1 font-display text-[26px] font-semibold leading-tight tracking-tight">{day.place}</h1>
          </div>
        </div>
      </div>

      <div className="no-scrollbar go-float-in go-stagger-2 -mx-5 flex gap-2 overflow-x-auto px-5 pb-1">
        {days.map((item, index) => (
          <button
            key={item.n}
            type="button"
            onClick={() => onSelectDay(index)}
            className={cn(
              'shrink-0 rounded-full border px-3.5 py-1.5 text-[11px] font-semibold transition-all active:scale-95',
              index === dayIndex
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-border bg-surface text-muted-foreground',
            )}
          >
            Day {item.n} · {item.place}
          </button>
        ))}
      </div>

      <div className="mt-6">
        <DayDetails day={day} />
      </div>

      <div className="mt-6">
        <RatingPanel context={`Day ${day.n} in ${day.place}`} />
      </div>
    </Screen>
  )
}

function TicketsTab() {
  const { days, flights, trip } = tripData

  function downloadTicket(name: string, detail: string) {
    downloadPdf(`${name.replace(/[^\w]+/g, '-').toLowerCase()}.pdf`, name, [
      `Trip: ${trip.title}`,
      `Travellers: ${trip.travellers}`,
      '',
      ...wrapText(detail),
    ])
  }

  return (
    <Screen>
      <Eyebrow>Tickets</Eyebrow>
      <SectionTitle className="mt-1">All your tickets &amp; passes</SectionTitle>

      <div className="mt-5">
        <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-primary">Flights</p>
        <div className="mt-3 space-y-2.5">
          {flights.map((flight, index) => {
            const name = `${flight.airline.name} ${flight.airline.code} ${flight.flightNumber} · ${flight.from.code} to ${flight.to.code}`
            const detail = `${flight.from.city} (${flight.from.code}) to ${flight.to.city} (${flight.to.code}). Departure ${new Date(flight.departTime).toLocaleString()}.`
            return (
              <Card key={`${name}-${index}`} className="go-float-in">
                <div className="flex items-start gap-3">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Ticket className="size-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <Pill>Flight</Pill>
                    <div className="mt-2 text-[13px] font-semibold text-foreground">{name}</div>
                    <p className="mt-1 text-[12px] text-muted-foreground">{detail}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => downloadTicket(name, detail)}
                  className="mt-3 flex min-h-10 w-full items-center justify-center gap-2 rounded-xl border border-border bg-surface text-[12px] font-semibold text-foreground transition-transform active:scale-[0.98]"
                >
                  <Download className="size-4 text-primary" /> Download PDF
                </button>
              </Card>
            )
          })}
        </div>
      </div>

      {days.map((day) =>
        day.tickets.length > 0 ? (
          <div key={day.n} className="mt-6">
            <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-primary">
              Day {day.n} · {day.place}
            </p>
            <div className="mt-3 space-y-2.5">
              {day.tickets.map((ticket) => (
                <Card key={ticket.name} className="go-float-in">
                  <div className="flex items-start gap-3">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Ticket className="size-5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <Pill>{ticket.kind}</Pill>
                      <div className="mt-2 text-[13px] font-semibold text-foreground">{ticket.name}</div>
                      <p className="mt-1 text-[12px] text-muted-foreground">{ticket.detail}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => downloadTicket(ticket.name, ticket.detail)}
                    className="mt-3 flex min-h-10 w-full items-center justify-center gap-2 rounded-xl border border-border bg-surface text-[12px] font-semibold text-foreground transition-transform active:scale-[0.98]"
                  >
                    <Download className="size-4 text-primary" /> Download PDF
                  </button>
                </Card>
              ))}
            </div>
          </div>
        ) : null,
      )}
    </Screen>
  )
}

function ReferenceTab() {
  const { accommodations, contacts, cityBasics, quickRef } = tripData
  const [playing, setPlaying] = useState<string | null>(null)

  function speak(phrase: Phrase) {
    const synth = typeof window !== 'undefined' ? window.speechSynthesis : undefined
    if (!synth) return
    synth.cancel()
    const utterance = new SpeechSynthesisUtterance(phrase.native)
    utterance.lang = phrase.lang
    utterance.onend = () => setPlaying(null)
    utterance.onerror = () => setPlaying(null)
    setPlaying(phrase.text)
    synth.speak(utterance)
  }

  return (
    <Screen>
      <Eyebrow>Quick reference</Eyebrow>
      <SectionTitle className="mt-1">Everything at your fingertips</SectionTitle>

      <div className="mt-6">
        <div className="flex items-center gap-2">
          <Building2 className="size-4 text-primary" />
          <Eyebrow>Accommodation</Eyebrow>
        </div>
        <div className="mt-3 space-y-2.5">
          {accommodations.map((stay) => (
            <AccommodationCard key={stay.name} stay={stay} />
          ))}
        </div>
      </div>

      <div className="mt-6">
        <div className="flex items-center gap-2">
          <Phone className="size-4 text-primary" />
          <Eyebrow>Contacts</Eyebrow>
        </div>
        <div className="mt-3 space-y-2.5">
          {contacts.map((contact) => (
            <ContactCard key={contact.label} contact={contact} />
          ))}
        </div>
      </div>

      <div className="mt-6">
        <div className="flex items-center gap-2">
          <Languages className="size-4 text-primary" />
          <Eyebrow>Quick language · {cityBasics.city}</Eyebrow>
        </div>
        <div className="mt-3 space-y-2.5">
          {cityBasics.phrases.map((phrase) => (
            <Card key={phrase.text} className="go-float-in flex items-center gap-3">
              <div className="min-w-0 flex-1">
                <div className="text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                  {phrase.text}
                </div>
                <div className="font-display text-[19px] font-semibold tracking-tight text-foreground">
                  {phrase.native}
                </div>
              </div>
              <button
                type="button"
                onClick={() => speak(phrase)}
                aria-label={`Play ${phrase.text}`}
                className={cn(
                  'flex size-10 shrink-0 items-center justify-center rounded-full border transition-transform active:scale-95',
                  playing === phrase.text
                    ? 'go-pulse-cta border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-surface text-primary',
                )}
              >
                <Play className="size-4" />
              </button>
            </Card>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <div className="flex items-center gap-2">
          <UtensilsCrossed className="size-4 text-primary" />
          <Eyebrow>Must try</Eyebrow>
        </div>
        <div className="mt-3 grid grid-cols-1 gap-3">
          <Card className="go-float-in">
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">Food</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {quickRef.mustTryFood.map((dish) => (
                <span
                  key={dish}
                  className="rounded-full bg-primary/10 px-3 py-1.5 text-[11px] font-semibold text-primary"
                >
                  {dish}
                </span>
              ))}
            </div>
          </Card>
          <Card className="go-float-in">
            <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
              <Wine className="size-3.5 text-primary" /> Drinks
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {quickRef.mustTryDrinks.map((drink) => (
                <span
                  key={drink}
                  className="rounded-full bg-secondary/15 px-3 py-1.5 text-[11px] font-semibold text-foreground"
                >
                  {drink}
                </span>
              ))}
            </div>
          </Card>
        </div>
      </div>

      <div className="mt-6">
        <Eyebrow>Good to know</Eyebrow>
        <ul className="mt-3 space-y-2">
          {cityBasics.facts.map((fact) => (
            <li
              key={fact}
              className="flex gap-3 rounded-2xl border border-border bg-surface p-3 text-[13px] text-foreground shadow-soft"
            >
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
              {fact}
            </li>
          ))}
        </ul>
      </div>
    </Screen>
  )
}

function AccommodationCard({ stay }: { stay: Accommodation }) {
  return (
    <Card className="go-float-in">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-[13px] font-semibold text-foreground">{stay.name}</div>
          <div className="text-[11px] text-muted-foreground">{stay.place}</div>
        </div>
      </div>
      <div className="mt-2 text-[12px] text-muted-foreground">{stay.address}</div>
      <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
        <span className="font-mono text-[11px] tabular-nums text-muted-foreground">
          In {stay.checkIn} · Out {stay.checkOut}
        </span>
        <a
          href={`tel:${stay.phone.replace(/\s/g, '')}`}
          className="flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-[11px] font-semibold transition-transform active:scale-95"
        >
          <Phone className="size-3.5" /> Call
        </a>
      </div>
    </Card>
  )
}

function ContactCard({ contact }: { contact: Contact }) {
  return (
    <Card className="go-float-in flex items-center gap-3">
      <div className="min-w-0 flex-1">
        <div className="text-[13px] font-semibold text-foreground">{contact.label}</div>
        <div className="font-mono text-[12px] tabular-nums text-muted-foreground">{contact.phone}</div>
      </div>
      <a
        href={`tel:${contact.phone.replace(/\s/g, '')}`}
        className="flex items-center gap-1.5 rounded-full border border-primary bg-primary px-3.5 py-2 text-[11px] font-semibold text-primary-foreground transition-transform active:scale-95"
      >
        <Phone className="size-3.5" /> Call
      </a>
    </Card>
  )
}

interface Issue {
  id: number
  type: string
  text: string
}

const ISSUE_TYPES = ['Driver', 'Hotel', 'Activity', 'Other']

function SupportTab() {
  const { supportFaqs } = tripData
  const [openFaq, setOpenFaq] = useState<string | null>(supportFaqs[0]?.question ?? null)
  const [showForm, setShowForm] = useState(false)
  const [type, setType] = useState('Driver')
  const [text, setText] = useState('')
  const [issues, setIssues] = useState<Issue[]>([])
  const [raised, setRaised] = useState(false)

  function submit() {
    const trimmed = text.trim()
    if (!trimmed) return
    setIssues((prev) => [{ id: Date.now(), type, text: trimmed }, ...prev])
    setText('')
    setRaised(true)
    setShowForm(false)
  }

  return (
    <Screen>
      <Eyebrow>Trip Support</Eyebrow>
      <SectionTitle className="mt-1">How can we help?</SectionTitle>
      <p className="mt-2 text-[13px] text-muted-foreground">
        Quick answers to common questions — and a direct line to our team if you still need help.
      </p>

      <div className="mt-5 space-y-2.5">
        {supportFaqs.map((faq) => {
          const open = openFaq === faq.question
          return (
            <Card key={faq.question} className="go-float-in">
              <button
                type="button"
                onClick={() => setOpenFaq(open ? null : faq.question)}
                className="flex w-full items-center justify-between gap-3 text-left"
              >
                <span className="text-[13px] font-semibold text-foreground">{faq.question}</span>
                <ChevronDown
                  className={cn(
                    'size-4 shrink-0 text-primary transition-transform duration-200',
                    open && 'rotate-180',
                  )}
                />
              </button>
              {open ? (
                <p className="go-fade-in mt-2 text-[12px] leading-relaxed text-muted-foreground">{faq.answer}</p>
              ) : null}
            </Card>
          )
        })}
      </div>

      {raised ? (
        <NoteCard tone="success" className="go-float-in mt-5">
          <strong>Issue received.</strong> Our team will call you within 2 minutes.
        </NoteCard>
      ) : null}

      {!showForm ? (
        <Card className="go-float-in mt-5 border-l-4 border-l-primary">
          <div className="flex items-center gap-2">
            <LifeBuoy className="size-4 text-primary" />
            <span className="text-[12px] font-semibold uppercase tracking-[0.12em] text-primary">Still need help?</span>
          </div>
          <p className="mt-2 text-[12px] text-muted-foreground">
            Raise an issue and a coordinator calls you within 2 minutes.
          </p>
          <ActionButton
            className="mt-3"
            variant="destructive"
            onClick={() => setShowForm(true)}
            icon={<AlertTriangle className="size-4" />}
          >
            Raise an issue
          </ActionButton>
        </Card>
      ) : (
        <Card className="go-detail-enter mt-5">
          <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
            What&rsquo;s it about?
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {ISSUE_TYPES.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setType(item)}
                className={cn(
                  'rounded-full border px-3 py-1.5 text-[11px] font-semibold transition-all active:scale-95',
                  type === item
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-surface text-muted-foreground hover:bg-muted/50',
                )}
              >
                {item}
              </button>
            ))}
          </div>
          <textarea
            value={text}
            onChange={(event) => setText(event.target.value)}
            rows={4}
            placeholder="Tell us what happened…"
            className="mt-3 w-full resize-none rounded-xl border border-border bg-surface p-3 text-[13px] outline-none focus:border-primary"
          />
          <ActionButton className="mt-3" variant="destructive" onClick={submit} pulse>
            Raise issue now
          </ActionButton>
          <button
            type="button"
            onClick={() => setShowForm(false)}
            className="mt-2 w-full text-center text-[11px] font-semibold text-muted-foreground"
          >
            Cancel
          </button>
        </Card>
      )}

      {issues.length > 0 ? (
        <div className="mt-6">
          <Eyebrow>Your issues</Eyebrow>
          <div className="mt-3 space-y-2.5">
            {issues.map((issue) => (
              <Card key={issue.id} className="go-list-swap flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <Pill>{issue.type}</Pill>
                  <p className="mt-2 text-[13px] text-foreground">{issue.text}</p>
                </div>
                <Pill className="border-warning text-warning">Open</Pill>
              </Card>
            ))}
          </div>
        </div>
      ) : null}
    </Screen>
  )
}
