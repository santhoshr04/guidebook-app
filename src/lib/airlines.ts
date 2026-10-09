/**
 * Real airline logo from a public airline-logo CDN, keyed by the IATA code
 * (e.g. "6E" → IndiGo). Components fall back to a colour tile if it fails.
 */
export function airlineLogoUrl(code: string): string {
  return `https://images.kiwi.com/airlines/64/${code.toUpperCase()}.png`
}
