import { useState } from 'react'
import { Smile, Meh, Frown } from 'lucide-react'
import { cn } from '../lib/cn'
import { Card, Eyebrow } from './primitives'

const OPTIONS = [
  { id: 'happy', label: 'Happy', icon: Smile },
  { id: 'satisfied', label: 'Satisfied', icon: Meh },
  { id: 'better', label: 'Can do better', icon: Frown },
] as const

type OptionId = (typeof OPTIONS)[number]['id']

const REASONS = ['Polite', 'Rude', 'Language barrier', 'Rushed', 'Untidy vehicle']

export function RatingPanel({ context }: { context: string }) {
  const [choice, setChoice] = useState<OptionId | null>(null)
  const [reasons, setReasons] = useState<string[]>([])
  const [note, setNote] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function toggleReason(reason: string) {
    setReasons((prev) => (prev.includes(reason) ? prev.filter((r) => r !== reason) : [...prev, reason]))
  }

  if (submitted) {
    return (
      <Card className="go-float-in border-l-4 border-l-success">
        <Eyebrow className="text-success">Thanks</Eyebrow>
        <p className="mt-1 text-[13px] text-muted-foreground">
          Your rating for {context} is saved. It helps us keep the good ones coming.
        </p>
      </Card>
    )
  }

  return (
    <Card className="go-float-in">
      <Eyebrow>Rate {context}</Eyebrow>
      <p className="mt-1 text-[13px] text-muted-foreground">How did it go?</p>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {OPTIONS.map((option) => {
          const Icon = option.icon
          const active = choice === option.id
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => setChoice(option.id)}
              className={cn(
                'flex flex-col items-center gap-1.5 rounded-2xl border px-2 py-3 text-[11px] font-semibold transition-all active:scale-95',
                active ? 'go-priority-pop border-primary bg-primary text-primary-foreground' : 'border-border bg-surface text-foreground hover:bg-muted/50',
              )}
            >
              <Icon className="size-5" />
              {option.label}
            </button>
          )
        })}
      </div>

      {choice === 'better' ? (
        <div className="go-detail-enter mt-4">
          <p className="text-[12px] font-semibold text-foreground">What could have been better?</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {REASONS.map((reason) => {
              const active = reasons.includes(reason)
              return (
                <button
                  key={reason}
                  type="button"
                  onClick={() => toggleReason(reason)}
                  className={cn(
                    'rounded-full border px-2.5 py-1.5 text-[11px] font-semibold transition-all active:scale-95',
                    active ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-surface text-muted-foreground hover:bg-muted/50',
                  )}
                >
                  {reason}
                </button>
              )
            })}
          </div>
          <textarea
            value={note}
            onChange={(event) => setNote(event.target.value)}
            rows={3}
            placeholder="Anything else? (optional)"
            className="mt-3 w-full resize-none rounded-xl border border-border bg-surface p-3 text-[13px] outline-none focus:border-primary"
          />
        </div>
      ) : null}

      {choice ? (
        <button
          type="button"
          onClick={() => setSubmitted(true)}
          className="go-sticky-in mt-3 flex min-h-11 w-full items-center justify-center rounded-xl border border-primary bg-primary px-4 text-[13px] font-semibold text-primary-foreground transition-transform active:scale-[0.98]"
        >
          Submit rating
        </button>
      ) : null}
    </Card>
  )
}
