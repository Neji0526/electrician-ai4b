import { useEffect, useRef, useState } from 'react'
import { Icon } from './Icon'
import { Button, btn } from './ui'
import { ErrorSummary, SelectField, TextAreaField, TextField, ToggleField } from './fields'
import { business } from '~/content/business'
import { track } from '~/lib/analytics'
import { cx } from '~/lib/format'
import {
  formatPhoneInput,
  submitLead,
  validateEmail,
  validateName,
  validatePhone,
  type Errors,
  type LeadResult,
  type LeadSource,
} from '~/lib/leads'
import type { ServiceOption } from '~/content/types'

/**
 * Compact lead form used in the homepage hero and on the contact page.
 * Five fields — anything longer belongs on /request-estimate.
 */
export function LeadForm({
  services,
  source = 'contact_form',
  title = 'Request your free estimate',
  subtitle = 'Tell us what is going on and we will call you back — usually within the hour during business hours.',
  defaultServiceSlug,
  compact = false,
  className,
}: {
  services: ServiceOption[]
  source?: LeadSource
  title?: string
  subtitle?: string
  defaultServiceSlug?: string
  compact?: boolean
  className?: string
}) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [serviceSlug, setServiceSlug] = useState(defaultServiceSlug ?? '')
  const [message, setMessage] = useState('')
  const [isEmergency, setIsEmergency] = useState(false)
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [result, setResult] = useState<LeadResult | null>(null)

  const started = useRef(false)
  const successRef = useRef<HTMLDivElement>(null)

  const onFirstInput = () => {
    if (started.current) return
    started.current = true
    track('form_start', { form: source })
  }

  useEffect(() => {
    if (status === 'success') successRef.current?.focus()
  }, [status])

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    const found: Errors = {}
    const nameError = validateName(name)
    if (nameError) found.name = nameError
    const phoneError = validatePhone(phone)
    if (phoneError) found.phone = phoneError
    const emailError = validateEmail(email)
    if (emailError) found.email = emailError

    setErrors(found)
    if (Object.keys(found).length) {
      track('form_error', { form: source, fields: Object.keys(found).join(',') })
      return
    }

    setStatus('submitting')
    try {
      const response = await submitLead({
        source,
        name,
        phone,
        email: email || undefined,
        serviceSlug: serviceSlug || undefined,
        isEmergency,
        message: message || undefined,
        pagePath: typeof window !== 'undefined' ? window.location.pathname : undefined,
      })
      setResult(response)
      setStatus('success')
      track('form_submit', { form: source, service: serviceSlug, emergency: isEmergency })
    } catch {
      setStatus('error')
      track('form_error', { form: source, reason: 'network' })
    }
  }

  if (status === 'success' && result) {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        className={cx(
          'rounded-panel border border-success/25 bg-success-bg p-6 text-left',
          className,
        )}
      >
        <span className="grid h-11 w-11 place-items-center rounded-full bg-success text-white">
          <Icon name="check" size={24} />
        </span>
        <p className="mt-3.5 text-lg font-bold text-ink">Got it — we will call you shortly.</p>
        <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-soft">
          Reference <span className="font-bold text-ink">{result.reference}</span>. We will reach you
          on <span className="font-bold text-ink">{phone}</span>. If you need someone now, call{' '}
          <a href={business.phoneHref} className="font-bold text-brand-700 underline">
            {business.phone}
          </a>
          .
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      onFocusCapture={onFirstInput}
      className={cx(
        'rounded-panel border border-line bg-white shadow-lift',
        compact ? 'p-5' : 'p-5 md:p-7',
        className,
      )}
    >
      <h2 className={cx('font-bold text-ink', compact ? 'text-lg' : 'text-xl')}>{title}</h2>
      <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-muted">{subtitle}</p>

      <ErrorSummary errors={errors} />

      <div className="mt-4 space-y-4">
        <TextField
          label="Full name"
          name="name"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={errors.name}
          placeholder="Jane Alvarez"
        />

        <TextField
          label="Phone number"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          value={phone}
          onChange={(e) => setPhone(formatPhoneInput(e.target.value))}
          error={errors.phone}
          placeholder="(512) 555-0142"
        />

        <TextField
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          optional
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
          placeholder="jane@example.com"
        />

        <SelectField
          label="What do you need?"
          name="serviceSlug"
          optional
          value={serviceSlug}
          onChange={(e) => setServiceSlug(e.target.value)}
        >
          <option value="">Not sure yet</option>
          {services.map((service) => (
            <option key={service.slug} value={service.slug}>
              {service.name}
            </option>
          ))}
        </SelectField>

        {!compact ? (
          <TextAreaField
            label="Anything we should know?"
            name="message"
            optional
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Breaker keeps tripping in the kitchen…"
          />
        ) : null}

        <ToggleField
          tone="accent"
          label="This is an emergency"
          checked={isEmergency}
          onChange={setIsEmergency}
        />

        {isEmergency ? (
          <a
            href={business.emergencyPhoneHref}
            onClick={() => track('emergency_call_click', { location: `lead_form_${source}` })}
            className={btn('emergency', 'md', 'w-full')}
          >
            <Icon name="phone" size={17} />
            Call now — {business.emergencyPhone}
          </a>
        ) : null}

        {status === 'error' ? (
          <p role="alert" className="rounded-card border border-danger/25 bg-danger-bg p-3.5 text-sm text-danger">
            Something went wrong. Please try again or call {business.phone}.
          </p>
        ) : null}

        <Button type="submit" size="lg" className="w-full" disabled={status === 'submitting'}>
          {status === 'submitting' ? 'Sending…' : 'Request my free estimate'}
        </Button>

        <p className="flex items-center justify-center gap-1.5 text-center text-sm text-muted">
          <Icon name="shield" size={15} className="text-brand-600" />
          No obligation · We never sell your details
        </p>
      </div>
    </form>
  )
}
