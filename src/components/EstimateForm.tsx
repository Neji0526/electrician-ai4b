import { useEffect, useRef, useState } from 'react'
import { Icon } from './Icon'
import { Button, btn } from './ui'
import {
  ErrorSummary,
  RadioCards,
  SelectField,
  TextAreaField,
  TextField,
  ToggleField,
} from './fields'
import { business } from '~/content/business'
import { areaDirectory } from '~/content/directory'
import { track } from '~/lib/analytics'
import { cx } from '~/lib/format'
import {
  formatPhoneInput,
  submitLead,
  todayISO,
  validateEmail,
  validateName,
  validatePhone,
  validateRequired,
  type ContactPreference,
  type Errors,
  type LeadResult,
  type PropertyType,
} from '~/lib/leads'
import type { ServiceOption } from '~/content/types'

const TIME_WINDOWS = [
  { value: 'morning', label: 'Morning (8am – 12pm)' },
  { value: 'afternoon', label: 'Afternoon (12pm – 4pm)' },
  { value: 'late', label: 'Late afternoon (4pm – 6pm)' },
  { value: 'any', label: 'Any time works' },
]

interface Values {
  name: string
  phone: string
  email: string
  propertyType: PropertyType
  serviceSlug: string
  isEmergency: boolean
  address: string
  city: string
  preferredDate: string
  preferredTime: string
  message: string
  contactPreference: ContactPreference
}

const INITIAL: Values = {
  name: '',
  phone: '',
  email: '',
  propertyType: 'residential',
  serviceSlug: '',
  isEmergency: false,
  address: '',
  city: '',
  preferredDate: '',
  preferredTime: 'any',
  message: '',
  contactPreference: 'phone',
}

/**
 * Two-step estimate request.
 *
 * Step one asks only what is needed to call someone back. Step two collects the
 * detail that makes the estimate accurate. Splitting it this way means an
 * abandoned form still leaves us enough to follow up.
 */
export function EstimateForm({
  services,
  defaultServiceSlug,
  className,
}: {
  services: ServiceOption[]
  defaultServiceSlug?: string
  className?: string
}) {
  const [step, setStep] = useState<1 | 2>(1)
  const [values, setValues] = useState<Values>({
    ...INITIAL,
    serviceSlug: defaultServiceSlug ?? '',
  })
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [result, setResult] = useState<LeadResult | null>(null)
  const [photos, setPhotos] = useState<File[]>([])
  const [previews, setPreviews] = useState<string[]>([])

  const started = useRef(false)
  const summaryRef = useRef<HTMLDivElement>(null)
  const successRef = useRef<HTMLDivElement>(null)

  const set = <K extends keyof Values>(key: K, value: Values[K]) => {
    if (!started.current) {
      started.current = true
      track('form_start', { form: 'estimate' })
    }
    setValues((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => {
      if (!prev[key]) return prev
      const next = { ...prev }
      delete next[key]
      return next
    })
  }

  // Object URLs must be released or the tab leaks memory on repeated selection.
  useEffect(() => {
    const urls = photos.map((file) => URL.createObjectURL(file))
    setPreviews(urls)
    return () => urls.forEach((url) => URL.revokeObjectURL(url))
  }, [photos])

  useEffect(() => {
    if (status === 'success') successRef.current?.focus()
  }, [status])

  function validateStepOne(): Errors {
    const next: Errors = {}
    const name = validateName(values.name)
    if (name) next.name = name
    const phone = validatePhone(values.phone)
    if (phone) next.phone = phone
    const service = validateRequired(values.serviceSlug, 'A service')
    if (service) next.serviceSlug = 'Choose the service you need so we send the right electrician.'
    const city = validateRequired(values.city, 'Your city')
    if (city) next.city = 'Tell us which city the property is in.'
    return next
  }

  function validateStepTwo(): Errors {
    const next: Errors = {}
    const email = validateEmail(values.email, values.contactPreference === 'email')
    if (email) next.email = email
    return next
  }

  function focusSummary() {
    // Wait a frame so the summary exists before we move focus to it.
    requestAnimationFrame(() => summaryRef.current?.focus())
  }

  function handleContinue() {
    const found = validateStepOne()
    setErrors(found)
    if (Object.keys(found).length) {
      focusSummary()
      return
    }
    setStep(2)
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    const found = { ...validateStepOne(), ...validateStepTwo() }
    setErrors(found)
    if (Object.keys(found).length) {
      if (Object.keys(validateStepOne()).length) setStep(1)
      focusSummary()
      track('form_error', { form: 'estimate', fields: Object.keys(found).join(',') })
      return
    }

    setStatus('submitting')
    try {
      const response = await submitLead({
        source: 'estimate_form',
        name: values.name,
        phone: values.phone,
        email: values.email || undefined,
        city: values.city,
        address: values.address || undefined,
        propertyType: values.propertyType,
        serviceSlug: values.serviceSlug,
        isEmergency: values.isEmergency,
        preferredDate: values.preferredDate || undefined,
        preferredTime: values.preferredTime,
        contactPreference: values.contactPreference,
        message: values.message || undefined,
        photoNames: photos.map((f) => f.name),
        pagePath: typeof window !== 'undefined' ? window.location.pathname : undefined,
      })
      setResult(response)
      setStatus('success')
      track('form_submit', {
        form: 'estimate',
        service: values.serviceSlug,
        emergency: values.isEmergency,
      })
    } catch {
      setStatus('error')
      track('form_error', { form: 'estimate', reason: 'network' })
    }
  }

  if (status === 'success' && result) {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        className={cx('rounded-panel border border-success/25 bg-success-bg p-6 md:p-8', className)}
      >
        <span className="grid h-12 w-12 place-items-center rounded-full bg-success text-white">
          <Icon name="check" size={26} />
        </span>
        <h2 className="mt-4 text-xl font-bold text-ink md:text-2xl">
          Thanks {values.name.split(' ')[0]} — we have your request.
        </h2>
        <p className="mt-3 max-w-xl text-[1.0625rem] leading-relaxed text-ink-soft">
          Your reference is <span className="font-bold text-ink">{result.reference}</span>. A
          scheduler will call you on <span className="font-bold text-ink">{values.phone}</span>{' '}
          {values.isEmergency
            ? 'within a few minutes.'
            : 'during business hours, usually within one hour.'}
        </p>

        <ul className="mt-5 space-y-2.5 text-[0.9375rem] text-ink-soft">
          {[
            'We confirm what you are seeing and whether it needs same-day attention.',
            'We book a two-hour arrival window that works for you.',
            'You get a text with your electrician’s name before they head over.',
          ].map((item, i) => (
            <li key={item} className="flex gap-3">
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-white text-xs font-bold text-success ring-1 ring-success/25">
                {i + 1}
              </span>
              {item}
            </li>
          ))}
        </ul>

        {values.isEmergency ? (
          <div className="mt-6 rounded-card border border-accent-300 bg-white p-4">
            <p className="text-[0.9375rem] font-bold text-accent-900">
              You marked this as an emergency.
            </p>
            <p className="mt-1 text-[0.9375rem] text-ink-soft">
              Please call rather than wait for the callback — an electrician answers 24/7.
            </p>
            <a
              href={business.emergencyPhoneHref}
              className={btn('emergency', 'md', 'mt-3')}
            >
              <Icon name="phone" size={17} />
              {business.emergencyPhone}
            </a>
          </div>
        ) : null}
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={cx('rounded-panel border border-line bg-white p-5 shadow-card md:p-7', className)}
    >
      {/* Progress */}
      <div className="flex items-center gap-3">
        {[1, 2].map((n) => (
          <div key={n} className="flex flex-1 items-center gap-2.5">
            <span
              className={cx(
                'grid h-7 w-7 shrink-0 place-items-center rounded-full text-sm font-bold',
                step >= n ? 'bg-brand-600 text-white' : 'bg-surface-2 text-muted',
              )}
            >
              {step > n ? <Icon name="check" size={15} /> : n}
            </span>
            <span
              className={cx(
                'text-sm font-semibold',
                step >= n ? 'text-ink' : 'text-muted',
              )}
            >
              {n === 1 ? 'Contact details' : 'Job details'}
            </span>
            {n === 1 ? (
              <span
                aria-hidden="true"
                className={cx('h-px flex-1', step > 1 ? 'bg-brand-300' : 'bg-line')}
              />
            ) : null}
          </div>
        ))}
      </div>

      <p className="sr-only" aria-live="polite">
        Step {step} of 2
      </p>

      <div ref={summaryRef} tabIndex={-1} className="mt-5 focus:outline-none">
        <ErrorSummary errors={errors} />
      </div>

      {step === 1 ? (
        <div className="mt-5 space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <TextField
              label="Full name"
              name="name"
              autoComplete="name"
              value={values.name}
              onChange={(e) => set('name', e.target.value)}
              error={errors.name}
              placeholder="Jane Alvarez"
            />
            <TextField
              label="Phone number"
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              value={values.phone}
              onChange={(e) => set('phone', formatPhoneInput(e.target.value))}
              error={errors.phone}
              placeholder="(512) 555-0142"
              hint="We call to confirm before dispatching anyone."
            />
          </div>

          <SelectField
            label="What do you need?"
            name="serviceSlug"
            value={values.serviceSlug}
            onChange={(e) => set('serviceSlug', e.target.value)}
            error={errors.serviceSlug}
          >
            <option value="">Choose a service…</option>
            {services.map((service) => (
              <option key={service.slug} value={service.slug}>
                {service.name}
              </option>
            ))}
            <option value="not-sure">Not sure — I need help diagnosing it</option>
          </SelectField>

          <SelectField
            label="City"
            name="city"
            value={values.city}
            onChange={(e) => set('city', e.target.value)}
            error={errors.city}
          >
            <option value="">Choose your city…</option>
            {areaDirectory.map((area) => (
              <option key={area.slug} value={area.label}>
                {area.label}
              </option>
            ))}
            <option value="other">Somewhere else in Central Texas</option>
          </SelectField>

          <ToggleField
            tone="accent"
            label="This is an emergency"
            description="Burning smell, sparks, a hot panel, or no power. We prioritise these and call back first."
            checked={values.isEmergency}
            onChange={(checked) => set('isEmergency', checked)}
          />

          {values.isEmergency ? (
            <div className="rounded-card border border-accent-300 bg-accent-50 p-4">
              <p className="text-[0.9375rem] text-accent-900">
                <span className="font-bold">If it is happening right now, please call.</span> A form
                is slower than a phone, and an electrician answers 24/7.
              </p>
              <a
                href={business.emergencyPhoneHref}
                onClick={() => track('emergency_call_click', { location: 'estimate_form' })}
                className={btn('emergency', 'md', 'mt-3')}
              >
                <Icon name="phone" size={17} />
                {business.emergencyPhone}
              </a>
            </div>
          ) : null}

          <div className="flex flex-col gap-3 border-t border-line pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted">
              Takes about 60 seconds. No obligation, no sales visit.
            </p>
            <Button type="button" size="lg" onClick={handleContinue}>
              Continue
              <Icon name="arrow-right" size={18} />
            </Button>
          </div>
        </div>
      ) : (
        <div className="mt-5 space-y-5">
          <RadioCards
            legend="Property type"
            name="propertyType"
            value={values.propertyType}
            onChange={(value) => set('propertyType', value)}
            options={[
              { value: 'residential', label: 'Home I own' },
              { value: 'rental', label: 'Rental property' },
              { value: 'commercial', label: 'Commercial space' },
              { value: 'new-construction', label: 'New build or remodel' },
            ]}
          />

          <TextField
            label="Email address"
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(e) => set('email', e.target.value)}
            error={errors.email}
            optional={values.contactPreference !== 'email'}
            placeholder="jane@example.com"
            hint="We send the written estimate here."
          />

          <TextField
            label="Street address"
            name="address"
            autoComplete="street-address"
            value={values.address}
            onChange={(e) => set('address', e.target.value)}
            optional
            placeholder="4212 Burnet Rd"
            hint="Helps us check your service area and drive time."
          />

          <div className="grid gap-5 sm:grid-cols-2">
            <TextField
              label="Preferred date"
              name="preferredDate"
              type="date"
              min={todayISO()}
              value={values.preferredDate}
              onChange={(e) => set('preferredDate', e.target.value)}
              optional
            />
            <SelectField
              label="Preferred time"
              name="preferredTime"
              value={values.preferredTime}
              onChange={(e) => set('preferredTime', e.target.value)}
              optional
            >
              {TIME_WINDOWS.map((window) => (
                <option key={window.value} value={window.value}>
                  {window.label}
                </option>
              ))}
            </SelectField>
          </div>

          <TextAreaField
            label="What is happening?"
            name="message"
            value={values.message}
            onChange={(e) => set('message', e.target.value)}
            optional
            placeholder="The kitchen breaker trips whenever the microwave and toaster run together. It started about a month ago."
            hint="The more specific you are, the more accurate the estimate."
          />

          <PhotoUpload photos={photos} previews={previews} onChange={setPhotos} />

          <RadioCards
            legend="How should we reach you?"
            name="contactPreference"
            columns={3}
            value={values.contactPreference}
            onChange={(value) => set('contactPreference', value)}
            options={[
              { value: 'phone', label: 'Phone call' },
              { value: 'text', label: 'Text message' },
              { value: 'email', label: 'Email' },
            ]}
          />

          {status === 'error' ? (
            <p role="alert" className="rounded-card border border-danger/25 bg-danger-bg p-4 text-[0.9375rem] text-danger">
              Something went wrong sending your request. Please try again, or call us on{' '}
              <a href={business.phoneHref} className="font-bold underline">
                {business.phone}
              </a>
              .
            </p>
          ) : null}

          <div className="flex flex-col gap-3 border-t border-line pt-5 sm:flex-row-reverse sm:items-center sm:justify-between">
            <Button type="submit" size="lg" disabled={status === 'submitting'}>
              {status === 'submitting' ? 'Sending…' : 'Request my free estimate'}
            </Button>
            <button
              type="button"
              onClick={() => setStep(1)}
              className="inline-flex items-center gap-1.5 self-start text-[0.9375rem] font-semibold text-brand-700 underline-offset-4 hover:underline"
            >
              <Icon name="arrow-left" size={17} />
              Back
            </button>
          </div>

          <p className="text-sm text-muted">
            By submitting you agree we can contact you about this request. We do not sell or share
            your details.
          </p>
        </div>
      )}
    </form>
  )
}

function PhotoUpload({
  photos,
  previews,
  onChange,
}: {
  photos: File[]
  previews: string[]
  onChange: (files: File[]) => void
}) {
  return (
    <div>
      <p className="text-sm font-semibold text-ink">
        Photos <span className="ml-1 font-normal text-muted">(optional)</span>
      </p>
      <p className="mt-1 text-sm text-muted">
        A photo of the panel, the outlet, or the fixture usually saves a visit. Up to 5 images.
      </p>

      <label
        className={cx(
          'mt-2 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-btn',
          'border-2 border-dashed border-line-strong bg-surface px-4 py-7 text-center',
          'transition-colors hover:border-brand-400 hover:bg-brand-50/50',
        )}
      >
        <Icon name="upload" size={24} className="text-brand-600" />
        <span className="text-[0.9375rem] font-semibold text-ink">Choose photos</span>
        <span className="text-sm text-muted">JPG or PNG, up to 10MB each</span>
        <input
          type="file"
          accept="image/png,image/jpeg,image/webp"
          multiple
          className="sr-only"
          onChange={(e) => {
            const files = Array.from(e.target.files ?? []).slice(0, 5)
            onChange(files)
          }}
        />
      </label>

      {previews.length ? (
        <ul className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-5">
          {previews.map((src, i) => (
            <li key={src} className="overflow-hidden rounded-lg border border-line">
              <img
                src={src}
                alt={`Selected photo ${i + 1}: ${photos[i]?.name ?? ''}`}
                className="aspect-square w-full object-cover"
              />
            </li>
          ))}
        </ul>
      ) : null}

      <p className="mt-2 text-xs text-muted">
        Photos are held in your browser until the request is sent.
      </p>
    </div>
  )
}
