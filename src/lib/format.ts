export function formatDate(epoch: number): string {
  return new Intl.DateTimeFormat('en-GB', { weekday: 'short', day: 'numeric', month: 'short' }).format(
    new Date(epoch),
  )
}

export function formatLongDate(epoch: number): string {
  return new Intl.DateTimeFormat('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }).format(
    new Date(epoch),
  )
}

export function formatClock(epoch: number): string {
  return new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false }).format(
    new Date(epoch),
  )
}

export function formatClock12(epoch: number): string {
  return new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }).format(
    new Date(epoch),
  )
}

/** Turns a 24-hour "HH:MM" string into a 12-hour "h:MM AM/PM" string. */
export function formatTime12(time: string): string {
  const [hourPart, minutePart = '00'] = time.split(':')
  const hours = Number(hourPart)
  if (Number.isNaN(hours)) return time
  const period = hours >= 12 ? 'PM' : 'AM'
  const hour12 = hours % 12 === 0 ? 12 : hours % 12
  return `${hour12}:${minutePart.padStart(2, '0')} ${period}`
}
