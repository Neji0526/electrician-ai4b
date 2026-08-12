import { useId, type ReactNode, type InputHTMLAttributes, type SelectHTMLAttributes, type TextareaHTMLAttributes } from 'react'
import { Icon } from './Icon'
import { cx } from '~/lib/format'

/**
 * Form field primitives.
 *
 * Every control has a real `<label>`, errors are wired through
 * `aria-describedby` + `aria-invalid`, and required fields are marked in text
 * rather than by a red asterisk alone.
 */

const baseControl =
  'w-full rounded-btn border bg-white px-3.5 py-2.5 text-base text-ink ' +
  'placeholder:text-muted/70 transition-colors ' +
  'focus:border-brand-500 focus:outline-none'

function controlClass(invalid?: boolean) {
  return cx(baseControl, invalid ? 'border-danger' : 'border-line-strong hover:border-muted/60')
}

function FieldShell({
  id,
  label,
  hint,
  error,
  optional,
  children,
  className,
}: {
  id: string
  label: string
  hint?: string
  error?: string
  optional?: boolean
  children: ReactNode
  className?: string
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-semibold text-ink">
        {label}
        {optional ? <span className="ml-1.5 font-normal text-muted">(optional)</span> : null}
      </label>
      {hint ? (
        <p id={`${id}-hint`} className="mt-1 text-sm text-muted">
          {hint}
        </p>
      ) : null}
      <div className="mt-1.5">{children}</div>
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 flex items-start gap-1.5 text-sm font-medium text-danger">
          <Icon name="warning" size={15} className="mt-0.5 shrink-0" />
          {error}
        </p>
      ) : null}
    </div>
  )
}

function describedBy(id: string, hint?: string, error?: string) {
  return [hint ? `${id}-hint` : null, error ? `${id}-error` : null].filter(Boolean).join(' ') || undefined
}

/* ------------------------------------------------------------------- input */

export function TextField({
  label,
  hint,
  error,
  optional,
  className,
  ...rest
}: InputHTMLAttributes<HTMLInputElement> & {
  label: string
  hint?: string
  error?: string
  optional?: boolean
}) {
  const generatedId = useId()
  const id = rest.id ?? generatedId
  return (
    <FieldShell id={id} label={label} hint={hint} error={error} optional={optional} className={className}>
      <input
        {...rest}
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, hint, error)}
        className={controlClass(Boolean(error))}
      />
    </FieldShell>
  )
}

/* ------------------------------------------------------------------ select */

export function SelectField({
  label,
  hint,
  error,
  optional,
  className,
  children,
  ...rest
}: SelectHTMLAttributes<HTMLSelectElement> & {
  label: string
  hint?: string
  error?: string
  optional?: boolean
}) {
  const generatedId = useId()
  const id = rest.id ?? generatedId
  return (
    <FieldShell id={id} label={label} hint={hint} error={error} optional={optional} className={className}>
      <div className="relative">
        <select
          {...rest}
          id={id}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy(id, hint, error)}
          className={cx(controlClass(Boolean(error)), 'appearance-none pr-10')}
        >
          {children}
        </select>
        <Icon
          name="chevron-down"
          size={18}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted"
        />
      </div>
    </FieldShell>
  )
}

/* ---------------------------------------------------------------- textarea */

export function TextAreaField({
  label,
  hint,
  error,
  optional,
  className,
  ...rest
}: TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string
  hint?: string
  error?: string
  optional?: boolean
}) {
  const generatedId = useId()
  const id = rest.id ?? generatedId
  return (
    <FieldShell id={id} label={label} hint={hint} error={error} optional={optional} className={className}>
      <textarea
        {...rest}
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, hint, error)}
        className={cx(controlClass(Boolean(error)), 'min-h-32 resize-y leading-relaxed')}
      />
    </FieldShell>
  )
}

/* ------------------------------------------------------- radio card group */

export function RadioCards<T extends string>({
  legend,
  name,
  value,
  onChange,
  options,
  columns = 2,
  hint,
}: {
  legend: string
  name: string
  value: T
  onChange: (value: T) => void
  options: { value: T; label: string; description?: string }[]
  columns?: 2 | 3
  hint?: string
}) {
  return (
    <fieldset>
      <legend className="text-sm font-semibold text-ink">{legend}</legend>
      {hint ? <p className="mt-1 text-sm text-muted">{hint}</p> : null}
      <div
        className={cx(
          'mt-2 grid gap-2.5',
          columns === 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-2',
        )}
      >
        {options.map((option) => {
          const checked = option.value === value
          return (
            <label
              key={option.value}
              className={cx(
                'flex cursor-pointer items-start gap-2.5 rounded-btn border p-3.5 transition-colors',
                checked
                  ? 'border-brand-500 bg-brand-50 ring-1 ring-brand-500'
                  : 'border-line-strong bg-white hover:border-muted/60',
              )}
            >
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={checked}
                onChange={() => onChange(option.value)}
                className="mt-1 h-4 w-4 shrink-0 accent-brand-600"
              />
              <span>
                <span className={cx('block text-[0.9375rem] font-semibold', checked ? 'text-brand-800' : 'text-ink')}>
                  {option.label}
                </span>
                {option.description ? (
                  <span className="mt-0.5 block text-sm text-muted">{option.description}</span>
                ) : null}
              </span>
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}

/* ------------------------------------------------------------ switch/toggle */

export function ToggleField({
  label,
  description,
  checked,
  onChange,
  tone = 'default',
}: {
  label: string
  description?: string
  checked: boolean
  onChange: (checked: boolean) => void
  tone?: 'default' | 'accent'
}) {
  const id = useId()
  return (
    <div
      className={cx(
        'flex items-start gap-3 rounded-btn border p-3.5 transition-colors',
        checked && tone === 'accent'
          ? 'border-accent-300 bg-accent-50'
          : checked
            ? 'border-brand-500 bg-brand-50'
            : 'border-line-strong bg-white',
      )}
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        aria-describedby={description ? `${id}-desc` : undefined}
        className={cx('mt-0.5 h-5 w-5 shrink-0 rounded', tone === 'accent' ? 'accent-accent-600' : 'accent-brand-600')}
      />
      <label htmlFor={id} className="cursor-pointer">
        <span
          className={cx(
            'block text-[0.9375rem] font-semibold',
            checked && tone === 'accent' ? 'text-accent-900' : 'text-ink',
          )}
        >
          {label}
        </span>
        {description ? (
          <span id={`${id}-desc`} className="mt-0.5 block text-sm text-muted">
            {description}
          </span>
        ) : null}
      </label>
    </div>
  )
}

/* ------------------------------------------------------------ error summary */

export function ErrorSummary({ errors }: { errors: Record<string, string> }) {
  const entries = Object.entries(errors)
  if (!entries.length) return null
  return (
    <div
      role="alert"
      tabIndex={-1}
      className="rounded-card border border-danger/25 bg-danger-bg p-4"
      data-error-summary
    >
      <p className="flex items-center gap-2 text-[0.9375rem] font-bold text-danger">
        <Icon name="warning" size={18} />
        {entries.length === 1
          ? 'One field needs your attention'
          : `${entries.length} fields need your attention`}
      </p>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-danger">
        {entries.map(([key, message]) => (
          <li key={key}>{message}</li>
        ))}
      </ul>
    </div>
  )
}
