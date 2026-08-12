import { business } from '~/content/business'

const dateFmt = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  timeZone: 'UTC',
})

const monthFmt = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  timeZone: 'UTC',
})

export function formatDate(iso: string) {
  return dateFmt.format(new Date(`${iso}T00:00:00Z`))
}

export function formatMonth(iso: string) {
  return monthFmt.format(new Date(`${iso}T00:00:00Z`))
}

export function formatMoney(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value)
}

/** "From $2,400" / "Free estimate" — the label used on every service card. */
export function priceLabel(startingPrice: number | null) {
  return startingPrice === null ? 'Free estimate' : `From ${formatMoney(startingPrice)}`
}

export function audienceLabel(audience: 'residential' | 'commercial' | 'both') {
  return audience === 'both'
    ? 'Residential & commercial'
    : audience === 'residential'
      ? 'Residential'
      : 'Commercial'
}

/**
 * Open/closed status for the contact page and footer.
 * Rendered client-side only so SSR output stays cacheable and never shows a
 * stale "Open now" badge.
 */
export function getOpenStatus(now: Date) {
  const day = now.getDay()
  const today = business.hours.find((h) => h.day === day)
  if (!today || !today.open || !today.close) {
    return {
      open: false,
      label: business.emergency.enabled ? 'Closed — emergency line open 24/7' : 'Closed today',
      today,
    }
  }
  const minutes = now.getHours() * 60 + now.getMinutes()
  const openAt = parseTime(today.open)
  const closeAt = parseTime(today.close)
  const isOpen = minutes >= openAt && minutes < closeAt
  return {
    open: isOpen,
    label: isOpen ? `Open now until ${today.close}` : `Closed — opens ${nextOpening(day)}`,
    today,
  }
}

function parseTime(time: string) {
  const match = /^(\d{1,2}):(\d{2})\s*(AM|PM)$/i.exec(time.trim())
  if (!match) return 0
  let hours = Number(match[1])
  const meridiem = match[3].toUpperCase()
  if (meridiem === 'PM' && hours !== 12) hours += 12
  if (meridiem === 'AM' && hours === 12) hours = 0
  return hours * 60 + Number(match[2])
}

function nextOpening(fromDay: number) {
  for (let i = 1; i <= 7; i++) {
    const day = (fromDay + i) % 7
    const entry = business.hours.find((h) => h.day === day)
    if (entry?.open) {
      return i === 1 ? `tomorrow at ${entry.open}` : `${entry.label} at ${entry.open}`
    }
  }
  return 'soon'
}

/**
 * Small helper so conditional class lists stay readable in JSX.
 * Accepts anything and keeps only non-empty strings, so `cond && 'class'` works
 * regardless of what `cond` happens to be.
 */
export function cx(...parts: unknown[]) {
  return parts.filter((part): part is string => typeof part === 'string' && part !== '').join(' ')
}
