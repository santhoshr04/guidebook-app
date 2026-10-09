import { useState } from 'react'
import { CalendarDays, Gift, Heart, MapPin, Sparkles, Users } from 'lucide-react'
import { ActionButton } from '../components/ActionButton'
import { AppHeader } from '../components/AppHeader'
import { MobileFrame } from '../components/MobileFrame'
import { Card, Eyebrow, NoteCard, Screen, SectionTitle } from '../components/primitives'
import { tripData } from '../data/trip'
import { cn } from '../lib/cn'

const HIGHLIGHTS = ['I loved this trip', 'I enjoyed the pace', 'Great stay', 'Would come back', 'Loved the food']

interface PostTripAppProps {
  onExit: () => void
}

export function PostTripApp({ onExit }: PostTripAppProps) {
  const { postTrip, trip } = tripData
  const [highlights, setHighlights] = useState<string[]>([])
  const [reflection, setReflection] = useState('')
  const [feedbackSent, setFeedbackSent] = useState(false)

  const [friendName, setFriendName] = useState('')
  const [friendContact, setFriendContact] = useState('')
  const [referred, setReferred] = useState(false)

  function toggleHighlight(item: string) {
    setHighlights((prev) => (prev.includes(item) ? prev.filter((value) => value !== item) : [...prev, item]))
  }

  return (
    <MobileFrame
      header={
        <AppHeader
          title={trip.title}
          label="Post-Trip"
          onBack={onExit}
        />
      }
    >
      <Screen>
        <Eyebrow>Welcome home</Eyebrow>
        <SectionTitle className="mt-1">How was {trip.destination}?</SectionTitle>
        <p className="mt-2 text-[13px] text-muted-foreground">
          No stars, no scales — just tell us what you enjoyed the most.
        </p>

        <Card className="go-float-in go-stagger-2 mt-5">
          <div className="flex items-center gap-2">
            <Heart className="size-4 text-primary" />
            <span className="text-[12px] font-semibold uppercase tracking-[0.12em] text-primary">
              What did you enjoy the most?
            </span>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {HIGHLIGHTS.map((item) => {
              const active = highlights.includes(item)
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => toggleHighlight(item)}
                  className={cn(
                    'rounded-full border px-3.5 py-1.5 text-[12px] font-semibold transition-all active:scale-95',
                    active ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-surface text-muted-foreground hover:bg-muted/50',
                  )}
                >
                  {item}
                </button>
              )
            })}
          </div>
          <textarea
            value={reflection}
            onChange={(event) => setReflection(event.target.value)}
            rows={3}
            placeholder="The moment you'll remember…"
            className="mt-3 w-full resize-none rounded-xl border border-border bg-surface p-3 text-[13px] outline-none focus:border-primary"
          />
          {feedbackSent ? (
            <NoteCard tone="success" className="mt-3">
              Thank you — we&rsquo;d love to hear more in person.
            </NoteCard>
          ) : (
            <ActionButton
              className="mt-3"
              onClick={() => setFeedbackSent(true)}
              icon={<Heart className="size-4" />}
            >
              Share my highlights
            </ActionButton>
          )}
        </Card>

        <Card className="go-float-in go-stagger-3 mt-4 border-l-4 border-l-primary">
          <div className="flex items-center gap-2">
            <Sparkles className="size-4 text-primary" />
            <span className="text-[12px] font-semibold uppercase tracking-[0.12em] text-primary">
              Travel Storytelling Circle
            </span>
          </div>
          <p className="mt-2 text-[13px] leading-relaxed text-foreground">
            Loved your trip? Like-minded travellers meet once a month to swap stories. We&rsquo;d love to have you.
          </p>
          <div className="mt-3 space-y-2 border-t border-border pt-3">
            <div className="flex items-center gap-2 text-[12px] text-muted-foreground">
              <CalendarDays className="size-3.5 text-primary" /> {postTrip.storytellingCircle.date}
            </div>
            <div className="flex items-center gap-2 text-[12px] text-muted-foreground">
              <MapPin className="size-3.5 text-primary" /> {postTrip.storytellingCircle.venue}
            </div>
          </div>
          <ActionButton className="mt-3" variant="outline" icon={<Users className="size-4" />}>
            Save my seat in {postTrip.storytellingCircle.city}
          </ActionButton>
        </Card>

        <Card className="go-float-in go-stagger-4 mt-4">
          <div className="flex items-center gap-2">
            <Gift className="size-4 text-primary" />
            <span className="text-[12px] font-semibold uppercase tracking-[0.12em] text-primary">Refer a friend</span>
          </div>
          <p className="mt-2 text-[13px] text-muted-foreground">
            Would your friends enjoy this? Nominate them and earn {postTrip.referral.bonus}.
          </p>
          {referred ? (
            <NoteCard tone="success" className="mt-3">
              <strong>Nomination sent.</strong> We&rsquo;ll reach out and add {postTrip.referral.bonus} once they book.
            </NoteCard>
          ) : (
            <div className="mt-3 space-y-2">
              <input
                value={friendName}
                onChange={(event) => setFriendName(event.target.value)}
                placeholder="Friend's name"
                className="w-full rounded-xl border border-border bg-surface p-3 text-[13px] outline-none focus:border-primary"
              />
              <input
                value={friendContact}
                onChange={(event) => setFriendContact(event.target.value)}
                placeholder="Phone or email"
                className="w-full rounded-xl border border-border bg-surface p-3 text-[13px] outline-none focus:border-primary"
              />
              <ActionButton onClick={() => setReferred(true)} icon={<Gift className="size-4" />}>
                Nominate friend
              </ActionButton>
            </div>
          )}
        </Card>

        <p className="mt-6 text-center text-[11px] text-muted-foreground">
          This link stays with your trip forever — but it never goes back to the pre-trip view.
        </p>
      </Screen>
    </MobileFrame>
  )
}
