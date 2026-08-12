/**
 * Lead submission adapter.
 *
 * FRONTEND ONLY — this build intentionally ships no backend. `submitLead`
 * validates, logs, and resolves with a reference number so the whole success
 * path (validation → pending state → confirmation screen → conversion event)
 * is real and testable.
 *
 * To go live, replace the body of `submitLead` with a call to your API or a
 * Supabase insert. Nothing else in the app needs to change — every form goes
 * through this one function.
 */

export type PropertyType = 'residential' | 'commercial' | 'rental' | 'new-construction'
export type ContactPreference = 'phone' | 'text' | 'email'
export type LeadSource = 'estimate_form' | 'contact_form' | 'callback_form'

export interface Lead {
  source: LeadSource
  name: string
  phone: string
  email?: string
  city?: string
  address?: string
  propertyType?: PropertyType
  serviceSlug?: string
  isEmergency?: boolean
  preferredDate?: string
  preferredTime?: string
  contactPreference?: ContactPreference
  message?: string
  /** File names only — real uploads need a storage bucket. */
  photoNames?: string[]
  pagePath?: string
}

export interface LeadResult {
  reference: string
  receivedAt: string
}

export async function submitLead(lead: Lead): Promise<LeadResult> {
  // Simulated network latency so pending/disabled states are exercised.
  await new Promise((resolve) => setTimeout(resolve, 700))

  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.info('[lead] would submit', lead)
  }

  const reference = `HCE-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`
  return { reference, receivedAt: new Date().toISOString() }
}

/* ------------------------------------------------------------- validation */

export type Errors = Record<string, string>

const PHONE_DIGITS = /\d/g
const EMAIL = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i

export function validateRequired(value: string, label: string) {
  return value.trim() ? undefined : `${label} is required.`
}

export function validatePhone(value: string) {
  const trimmed = value.trim()
  if (!trimmed) return 'A phone number is required so we can confirm your appointment.'
  const digits = trimmed.match(PHONE_DIGITS)?.length ?? 0
  if (digits < 10) return 'Enter a 10-digit phone number, for example (512) 555-0142.'
  return undefined
}

export function validateEmail(value: string, required = false) {
  const trimmed = value.trim()
  if (!trimmed) return required ? 'An email address is required.' : undefined
  return EMAIL.test(trimmed) ? undefined : 'Enter a valid email address.'
}

export function validateName(value: string) {
  const trimmed = value.trim()
  if (!trimmed) return 'Please tell us your name.'
  if (trimmed.length < 2) return 'Please enter your full name.'
  return undefined
}

/** Formats keystrokes into (512) 555-0142 as the visitor types. */
export function formatPhoneInput(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 10)
  if (digits.length <= 3) return digits
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
}

/** Today, in the yyyy-mm-dd format a date input expects. */
export function todayISO() {
  const now = new Date()
  const offset = now.getTimezoneOffset() * 60_000
  return new Date(now.getTime() - offset).toISOString().slice(0, 10)
}
