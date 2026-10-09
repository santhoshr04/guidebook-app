import { useEffect, useState } from 'react'

export interface Countdown {
  days: number
  hours: number
  totalMs: number
  isPast: boolean
  isUnder24h: boolean
}

function compute(target: number): Countdown {
  const totalMs = target - Date.now()
  const clamped = Math.max(totalMs, 0)
  return {
    days: Math.floor(clamped / 86_400_000),
    hours: Math.floor((clamped % 86_400_000) / 3_600_000),
    totalMs: clamped,
    isPast: totalMs <= 0,
    isUnder24h: totalMs > 0 && totalMs < 86_400_000,
  }
}

export function useCountdown(target: number): Countdown {
  const [value, setValue] = useState(() => compute(target))

  useEffect(() => {
    setValue(compute(target))
    const id = window.setInterval(() => setValue(compute(target)), 30_000)
    return () => window.clearInterval(id)
  }, [target])

  return value
}
