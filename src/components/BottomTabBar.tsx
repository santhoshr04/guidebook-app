import type { LucideIcon } from 'lucide-react'
import { cn } from '../lib/cn'

export interface TabItem {
  id: string
  label: string
  icon: LucideIcon
}

interface BottomTabBarProps {
  tabs: TabItem[]
  active: string
  onChange: (id: string) => void
}

export function BottomTabBar({ tabs, active, onChange }: BottomTabBarProps) {
  return (
    <nav className="z-20 shrink-0 border-t border-border bg-surface/95 px-2 pt-1.5 pb-[calc(env(safe-area-inset-bottom)+0.375rem)] shadow-soft backdrop-blur">
      <div className="flex items-stretch gap-1">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = tab.id === active
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onChange(tab.id)}
              className={cn(
                'flex flex-1 flex-col items-center justify-center gap-1 rounded-2xl px-2 py-2.5 text-[10px] font-semibold uppercase tracking-[0.08em] transition-all active:scale-95',
                isActive ? 'go-chrome-pop bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted/70',
              )}
            >
              <Icon className="size-4" />
              {tab.label}
            </button>
          )
        })}
      </div>
    </nav>
  )
}
