import { WifiOff } from 'lucide-react'

export function OfflineBanner() {
  return (
    <div className="fixed left-1/2 top-0 z-50 w-full max-w-[440px] -translate-x-1/2 border-b border-warning/40 bg-warning/15 px-4 pt-[env(safe-area-inset-top)] backdrop-blur">
      <div className="flex items-center justify-center gap-2 py-1.5 text-[11px] font-semibold tracking-tight text-foreground">
        <WifiOff className="size-3.5" />
        Offline mode — viewing saved trip data
      </div>
    </div>
  )
}
