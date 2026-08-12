import { Link } from '@tanstack/react-router'
import { business } from '~/content/business'
import { cx } from '~/lib/format'

/**
 * Wordmark. Drawn inline rather than loaded as a file so it is available on
 * first paint with no extra request and no layout shift.
 */
export function Logo({
  className,
  tone = 'dark',
  compact = false,
}: {
  className?: string
  tone?: 'dark' | 'light'
  compact?: boolean
}) {
  return (
    <Link
      to="/"
      className={cx('group inline-flex items-center gap-2.5 rounded-btn', className)}
      aria-label={`${business.name} — home`}
    >
      <span
        className={cx(
          'grid shrink-0 place-items-center rounded-lg transition-colors',
          compact ? 'h-9 w-9' : 'h-10 w-10',
          tone === 'light' ? 'bg-white text-brand-700' : 'bg-brand-600 text-white group-hover:bg-brand-700',
        )}
      >
        <svg width={compact ? 18 : 20} height={compact ? 18 : 20} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M13.4 2 5.2 13.1a.55.55 0 0 0 .44.88h4.7l-1.2 8L18.8 10.6a.55.55 0 0 0-.44-.88h-4.7l1.2-7.72Z" />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cx(
            'font-extrabold tracking-tight',
            compact ? 'text-[0.9375rem]' : 'text-base md:text-[1.0625rem]',
            tone === 'light' ? 'text-white' : 'text-ink',
          )}
        >
          Hill Country <span className={tone === 'light' ? 'text-brand-200' : 'text-brand-600'}>Electric</span>
        </span>
        {!compact ? (
          <span
            className={cx(
              'mt-1 text-[0.6875rem] font-semibold uppercase tracking-[0.08em]',
              tone === 'light' ? 'text-brand-200' : 'text-muted',
            )}
          >
            {business.license.number} · Austin, TX
          </span>
        ) : null}
      </span>
    </Link>
  )
}
