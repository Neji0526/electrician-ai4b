/**
 * Conversion event hooks.
 *
 * These are deliberately provider-agnostic: they push to `dataLayer` and call
 * `gtag` when either exists, and no-op otherwise. Drop in GTM, GA4, Meta or a
 * call-tracking script and every CTA on the site is already instrumented.
 */

export type AnalyticsEvent =
  | 'phone_click'
  | 'estimate_cta_click'
  | 'emergency_call_click'
  | 'form_start'
  | 'form_submit'
  | 'form_error'
  | 'service_view'
  | 'directions_click'
  | 'email_click'

type Payload = Record<string, string | number | boolean | undefined>

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>
    gtag?: (...args: unknown[]) => void
  }
}

export function track(event: AnalyticsEvent, payload: Payload = {}) {
  if (typeof window === 'undefined') return

  const detail = { event, ...payload }

  window.dataLayer?.push(detail)
  window.gtag?.('event', event, payload)

  // Always dispatch a DOM event so a tag manager, a test, or a call-tracking
  // vendor can subscribe without us knowing about them.
  window.dispatchEvent(new CustomEvent('hce:analytics', { detail }))

  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.debug('[analytics]', event, payload)
  }
}

/** Convenience wrapper for the many phone links across the site. */
export function trackPhone(location: string, emergency = false) {
  track(emergency ? 'emergency_call_click' : 'phone_click', { location, emergency })
}

export function trackEstimate(location: string) {
  track('estimate_cta_click', { location })
}
