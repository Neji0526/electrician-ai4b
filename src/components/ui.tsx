import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cx } from '~/lib/format'

/* ============================================================================
   Buttons
   `btn()` returns the class string so it can be applied to a router `<Link>`,
   a plain `<a href="tel:…">`, or a real `<button>` — three different elements
   that need to look identical, without a wrapper component per case.
   ========================================================================== */

export type ButtonVariant = 'cta' | 'primary' | 'secondary' | 'emergency' | 'ghost' | 'white' | 'outline-light'
export type ButtonSize = 'sm' | 'md' | 'lg'

const VARIANTS: Record<ButtonVariant, string> = {
  // The brand's headline call to action: amber on navy text. High contrast
  // against both the white header and the dark navy bands.
  cta: 'bg-accent-400 text-brand-950 hover:bg-accent-300 active:bg-accent-500 shadow-card',
  primary: 'bg-brand-600 text-white hover:bg-brand-700 active:bg-brand-800 shadow-card',
  secondary:
    'bg-white text-brand-700 border border-line-strong hover:border-brand-400 hover:bg-brand-50',
  emergency: 'bg-accent-700 text-white hover:bg-accent-800 active:bg-accent-900 shadow-card',
  ghost: 'text-brand-700 hover:bg-brand-50',
  white: 'bg-white text-brand-700 hover:bg-brand-50 shadow-card',
  'outline-light': 'border border-white/35 text-white hover:border-white/70 hover:bg-white/10',
}

const SIZES: Record<ButtonSize, string> = {
  sm: 'text-sm px-3.5 py-2 gap-1.5',
  md: 'text-[0.9375rem] px-5 py-2.5 gap-2',
  lg: 'text-base px-6 py-3.5 gap-2',
}

export function btn(variant: ButtonVariant = 'primary', size: ButtonSize = 'md', extra?: string) {
  return cx(
    'inline-flex items-center justify-center rounded-btn font-semibold',
    'transition-colors duration-150 select-none',
    'disabled:opacity-60 disabled:pointer-events-none',
    VARIANTS[variant],
    SIZES[size],
    extra,
  )
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
}

export function Button({ variant = 'primary', size = 'md', className, ...rest }: ButtonProps) {
  return <button className={btn(variant, size, className)} {...rest} />
}

/* ============================================================================
   Layout
   ========================================================================== */

export function Section({
  children,
  className,
  tone = 'white',
  id,
  as: Tag = 'section',
  labelledBy,
}: {
  children: ReactNode
  className?: string
  tone?: 'white' | 'surface' | 'cream' | 'brand'
  id?: string
  as?: 'section' | 'div'
  labelledBy?: string
}) {
  const tones = {
    white: 'bg-white',
    surface: 'bg-surface',
    cream: 'bg-cream',
    brand: 'bg-brand-700 text-white',
  }
  return (
    <Tag id={id} aria-labelledby={labelledBy} className={cx('py-14 md:py-20', tones[tone], className)}>
      <div className="container-page">{children}</div>
    </Tag>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = 'left',
  id,
  level = 2,
  className,
  tone = 'dark',
}: {
  eyebrow?: string
  title: ReactNode
  intro?: ReactNode
  align?: 'left' | 'center'
  id?: string
  level?: 2 | 3
  className?: string
  tone?: 'dark' | 'light'
}) {
  const Tag = level === 2 ? 'h2' : 'h3'
  return (
    <div
      className={cx(
        align === 'center' ? 'text-center mx-auto max-w-2xl' : 'max-w-3xl',
        className,
      )}
    >
      {eyebrow ? (
        <p
          className={cx(
            'text-sm font-semibold uppercase tracking-wider mb-2.5',
            tone === 'light' ? 'text-brand-200' : 'text-brand-600',
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <Tag
        id={id}
        className={cx(
          'text-2xl md:text-[2.125rem] leading-tight',
          tone === 'light' ? 'text-white' : 'text-ink',
        )}
      >
        {title}
      </Tag>
      {intro ? (
        <div
          className={cx(
            'mt-4 text-[1.0625rem] leading-relaxed',
            tone === 'light' ? 'text-brand-100' : 'text-ink-soft',
          )}
        >
          {intro}
        </div>
      ) : null}
    </div>
  )
}

/* ============================================================================
   Surfaces & labels
   ========================================================================== */

export function Card({
  children,
  className,
  interactive,
  as: Tag = 'div',
}: {
  children: ReactNode
  className?: string
  interactive?: boolean
  as?: 'div' | 'article' | 'li'
}) {
  return (
    <Tag
      className={cx(
        'bg-white border border-line rounded-card shadow-card',
        interactive && 'transition-shadow duration-200 hover:shadow-lift hover:border-line-strong',
        className,
      )}
    >
      {children}
    </Tag>
  )
}

export type BadgeTone = 'brand' | 'neutral' | 'success' | 'warning' | 'danger' | 'accent'

const BADGE_TONES: Record<BadgeTone, string> = {
  brand: 'bg-brand-50 text-brand-700 border-brand-100',
  neutral: 'bg-surface-2 text-ink-soft border-line',
  success: 'bg-success-bg text-success border-success/20',
  warning: 'bg-warning-bg text-warning border-warning/20',
  danger: 'bg-danger-bg text-danger border-danger/20',
  accent: 'bg-accent-50 text-accent-800 border-accent-200',
}

export function Badge({
  children,
  tone = 'neutral',
  className,
}: {
  children: ReactNode
  tone?: BadgeTone
  className?: string
}) {
  return (
    <span
      className={cx(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1',
        'text-xs font-semibold leading-none',
        BADGE_TONES[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}

/** A short list of ticked points — used on service pages and the estimate form. */
export function CheckList({
  items,
  className,
  tone = 'dark',
}: {
  items: readonly string[]
  className?: string
  tone?: 'dark' | 'light'
}) {
  return (
    <ul className={cx('space-y-3', className)}>
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
            className={cx(
              'mt-0.5 shrink-0',
              tone === 'light' ? 'text-brand-200' : 'text-brand-600',
            )}
          >
            <circle cx="12" cy="12" r="10" fill="currentColor" opacity={tone === 'light' ? 0.25 : 0.1} />
            <path
              d="m8 12.2 2.7 2.7L16 9.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className={tone === 'light' ? 'text-brand-50' : 'text-ink-soft'}>{item}</span>
        </li>
      ))}
    </ul>
  )
}
