import { useState } from 'react'
import { AlertTriangle } from 'lucide-react'
import { ActionButton } from './ActionButton'
import { BackButton } from './BackButton'
import { Card, NoteCard, Pill } from './primitives'
import { cn } from '../lib/cn'

interface Issue {
  id: number
  type: string
  text: string
}

const ISSUE_TYPES = ['Driver', 'Hotel', 'Activity', 'Other']

/** Full-height overlay for raising an issue — kept fully separate from the FAQ. */
export function IssueSheet({ onClose }: { onClose: () => void }) {
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
    <div className="go-detail-enter absolute inset-0 z-30 flex flex-col bg-background">
      <div className="flex shrink-0 items-center gap-3 border-b border-border bg-surface px-4 pb-3 pt-[calc(env(safe-area-inset-top)+0.75rem)] shadow-soft">
        <BackButton onClick={onClose} />
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-primary">We&rsquo;re on it</p>
          <p className="truncate font-display text-[15px] font-semibold tracking-tight text-foreground">
            Raise an issue
          </p>
        </div>
      </div>

      <div className="scrollbar-thin min-h-0 flex-1 overflow-y-auto overscroll-contain">
        <div className="px-5 pt-6 pb-[calc(env(safe-area-inset-bottom)+1.5rem)]">
          {raised ? (
            <NoteCard tone="success" className="go-float-in">
              <strong>Issue received.</strong> Your coordinator will call you within 2 minutes.
            </NoteCard>
          ) : null}

          <Card className="go-float-in mt-4">
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
            <ActionButton
              className="mt-3"
              variant="destructive"
              onClick={submit}
              pulse
              icon={<AlertTriangle className="size-4" />}
            >
              Raise issue now
            </ActionButton>
            <p className="mt-2 text-center text-[11px] text-muted-foreground">
              A coordinator calls you within 2 minutes of raising an issue.
            </p>
          </Card>

          {issues.length > 0 ? (
            <div className="mt-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">Your issues</p>
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
        </div>
      </div>
    </div>
  )
}
