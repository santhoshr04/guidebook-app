import { Download, FileText } from 'lucide-react'
import { BackButton } from './BackButton'
import { downloadPdf, wrapText } from '../lib/pdf'
import type { DocumentItem } from '../types'

interface DocumentPreviewProps {
  doc: DocumentItem
  onClose: () => void
  meta?: string[]
}

/** Full-height overlay that previews a document and offers a PDF download. */
export function DocumentPreview({ doc, onClose, meta = [] }: DocumentPreviewProps) {
  function handleDownload() {
    const lines = [...meta, ...(meta.length > 0 ? [''] : []), ...wrapText(doc.detail)]
    downloadPdf(`${doc.name.replace(/[^\w]+/g, '-').toLowerCase()}.pdf`, doc.name, lines)
  }

  return (
    <div className="go-detail-enter absolute inset-0 z-30 flex flex-col bg-background">
      <div className="flex shrink-0 items-center gap-3 border-b border-border bg-surface px-4 pb-3 pt-[calc(env(safe-area-inset-top)+0.75rem)] shadow-soft">
        <BackButton onClick={onClose} />
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-primary">{doc.category}</p>
          <p className="truncate font-display text-[15px] font-semibold tracking-tight text-foreground">{doc.name}</p>
        </div>
      </div>

      <div className="scrollbar-thin min-h-0 flex-1 overflow-y-auto overscroll-contain">
        <div className="px-5 pt-6 pb-[calc(env(safe-area-inset-bottom)+7rem)]">
          <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-soft">
            <div className="flex items-center gap-3 border-b border-border bg-muted/50 px-4 py-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <FileText className="size-5" />
              </span>
              <div className="min-w-0">
                <p className="text-[13px] font-semibold text-foreground">{doc.name}</p>
                <p className="text-[11px] text-muted-foreground">{doc.category} · PDF</p>
              </div>
            </div>
            <div className="space-y-3 p-4">
              {meta.map((line) => (
                <p key={line} className="text-[12px] text-muted-foreground">
                  {line}
                </p>
              ))}
              <p className="text-[13px] leading-relaxed text-foreground">{doc.detail}</p>
            </div>
          </div>
          <p className="mt-3 text-center text-[11px] text-muted-foreground">
            Preview of your saved copy — download it for offline use.
          </p>
        </div>
      </div>

      <div className="shrink-0 border-t border-border bg-surface px-5 py-3 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] shadow-soft">
        <button
          type="button"
          onClick={handleDownload}
          className="flex min-h-11 w-full items-center justify-center gap-2 rounded-2xl border border-primary bg-primary text-[13px] font-semibold text-primary-foreground transition-transform active:scale-[0.98]"
        >
          <Download className="size-4" /> Download PDF
        </button>
      </div>
    </div>
  )
}
