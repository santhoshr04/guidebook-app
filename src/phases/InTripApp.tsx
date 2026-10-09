import { useState } from 'react'
import { AlertTriangle, Map as MapIcon, Phone, Play } from 'lucide-react'
import { ActionButton } from '../components/ActionButton'
import { AppHeader } from '../components/AppHeader'
import { BottomTabBar } from '../components/BottomTabBar'
import type { TabItem } from '../components/BottomTabBar'
import { DayCover } from '../components/DayCover'
import { DayDetails } from '../components/DayDetails'
import { MobileFrame } from '../components/MobileFrame'
import { RatingPanel } from '../components/RatingPanel'
import { Card, Eyebrow, NoteCard, Pill, Screen, SectionTitle } from '../components/primitives'
import { tripData } from '../data/trip'
import { cn } from '../lib/cn'
import type { CityBasics, Contact, TripDay } from '../types'

const TABS: TabItem[] = [
  { id: 'itinerary', label: 'Itinerary', icon: MapIcon },
  { id: 'contacts', label: 'Contacts', icon: Phone },
  { id: 'issues', label: 'Issues', icon: AlertTriangle },
]

interface InTripAppProps {
  onExit: () => void
}

export function InTripApp({ onExit }: InTripAppProps) {
  const { days } = tripData
  const [tab, setTab] = useState('itinerary')
  const [step, setStep] = useState(0)

  const totalSteps = days.length * 2 + 1
  const isCity = step >= days.length * 2
  const dayIndex = Math.floor(step / 2)
  const isCover = step % 2 === 0
  const day = days[Math.min(dayIndex, days.length - 1)]

  function back() {
    if (tab === 'itinerary' && step > 0) setStep((value) => value - 1)
    else onExit()
  }

  const header = (
    <AppHeader
      title={tripData.trip.title}
      label={tab === 'itinerary' ? (isCity ? 'City Basics' : `Day ${day.n} · ${day.place}`) : TABS.find((t) => t.id === tab)?.label ?? ''}
      pageLabel={tab === 'itinerary' ? `${Math.min(step + 1, totalSteps)}/${totalSteps}` : undefined}
      progress={tab === 'itinerary' ? (step + 1) / totalSteps : undefined}
      onBack={back}
    />
  )

  return (
    <MobileFrame header={header} footer={<BottomTabBar tabs={TABS} active={tab} onChange={setTab} />}>
      {tab === 'itinerary' ? (
        isCity ? (
          <CityBasicsScreen cityBasics={tripData.cityBasics} onRestart={() => setStep(0)} />
        ) : isCover ? (
          <DayCover day={day} onContinue={() => setStep((value) => value + 1)} />
        ) : (
          <DayDetail
            day={day}
            onContinue={() => setStep((value) => value + 1)}
            onRaiseIssue={() => setTab('issues')}
          />
        )
      ) : null}
      {tab === 'contacts' ? <ContactsScreen contacts={tripData.contacts} /> : null}
      {tab === 'issues' ? <IssuesScreen /> : null}
    </MobileFrame>
  )
}

function DayDetail({
  day,
  onContinue,
  onRaiseIssue,
}: {
  day: TripDay
  onContinue: () => void
  onRaiseIssue: () => void
}) {
  return (
    <Screen>
      <DayDetails day={day} />

      <div className="mt-6">
        <RatingPanel context={`Day ${day.n} in ${day.place}`} />
      </div>

      <div className="mt-6 space-y-2.5">
        <ActionButton onClick={onContinue} pulse>
          Continue
        </ActionButton>
        <button
          type="button"
          onClick={onRaiseIssue}
          className="flex min-h-11 w-full items-center justify-center gap-2 rounded-2xl border border-border bg-surface text-[13px] font-semibold text-destructive transition-transform active:scale-[0.98]"
        >
          <AlertTriangle className="size-4" /> Raise an issue
        </button>
      </div>
    </Screen>
  )
}

function CityBasicsScreen({ cityBasics, onRestart }: { cityBasics: CityBasics; onRestart: () => void }) {
  const [playing, setPlaying] = useState<string | null>(null)

  function speak(phrase: { native: string; lang: string; text: string }) {
    const synth = typeof window !== 'undefined' ? window.speechSynthesis : undefined
    if (!synth) {
      setPlaying(null)
      return
    }
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
      <Eyebrow>City basics · {cityBasics.city}</Eyebrow>
      <SectionTitle className="mt-1">Speak a little like a local</SectionTitle>

      <div className="mt-5 space-y-2.5">
        {cityBasics.phrases.map((phrase, i) => (
          <Card key={phrase.text} className={cn('go-float-in flex items-center gap-3', `go-stagger-${Math.min(i + 2, 8)}`)}>
            <div className="min-w-0 flex-1">
              <div className="text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">{phrase.text}</div>
              <div className="font-display text-[20px] font-semibold tracking-tight text-foreground">{phrase.native}</div>
            </div>
            <button
              type="button"
              onClick={() => speak(phrase)}
              aria-label={`Play ${phrase.text}`}
              className={cn(
                'flex size-11 shrink-0 items-center justify-center rounded-full border transition-transform active:scale-95',
                playing === phrase.text ? 'go-pulse-cta border-primary bg-primary text-primary-foreground' : 'border-border bg-surface text-primary',
              )}
            >
              <Play className="size-4" />
            </button>
          </Card>
        ))}
      </div>

      <div className="mt-6">
        <Eyebrow>Facts about {cityBasics.city}</Eyebrow>
        <ul className="mt-3 space-y-2">
          {cityBasics.facts.map((fact) => (
            <li key={fact} className="flex gap-3 rounded-xl border border-border bg-surface p-3 text-[13px] text-foreground shadow-soft">
              <span className="mt-1.5 size-1.5 shrink-0 bg-primary" />
              {fact}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6">
        <ActionButton variant="outline" onClick={onRestart}>
          Back to Day 1
        </ActionButton>
      </div>
    </Screen>
  )
}

function ContactsScreen({ contacts }: { contacts: Contact[] }) {
  return (
    <Screen>
      <Eyebrow>Contacts</Eyebrow>
      <SectionTitle className="mt-1">Emergency &amp; local support</SectionTitle>
      <div className="mt-5 space-y-2.5">
        {contacts.map((contact, i) => (
          <Card key={contact.label} className={cn('go-float-in flex items-center gap-3', `go-stagger-${Math.min(i + 2, 8)}`)}>
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
        ))}
      </div>
    </Screen>
  )
}

interface Issue {
  id: number
  type: string
  text: string
}

const ISSUE_TYPES = ['Driver', 'Hotel', 'Activity', 'Other']

function IssuesScreen() {
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
  }

  return (
    <Screen>
      <Eyebrow>Raise an issue</Eyebrow>
      <SectionTitle className="mt-1">We&rsquo;re on it, right away</SectionTitle>

      {raised ? (
        <NoteCard tone="success" className="go-float-in mt-4">
          <strong>Issue received.</strong> Our team will call you within 2 minutes.
        </NoteCard>
      ) : null}

      <Card className="go-float-in go-stagger-2 mt-4">
        <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">What&rsquo;s it about?</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {ISSUE_TYPES.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setType(item)}
              className={cn(
                'rounded-full border px-3 py-1.5 text-[11px] font-semibold transition-all active:scale-95',
                type === item ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-surface text-muted-foreground hover:bg-muted/50',
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
        <p className="mt-2 text-center text-[11px] text-muted-foreground">
          A coordinator calls you within 2 minutes of raising an issue.
        </p>
      </Card>

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
