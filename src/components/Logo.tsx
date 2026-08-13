import { Link } from 'react-router'
import { business } from '~/content/business'
import { cx } from '~/lib/format'

/**
 * Stacked wordmark: an amber bolt beside the company name on two lines.
 * Drawn inline rather than loaded as a file so it is available on first paint
 * with no extra request and no layout shift.
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
      <svg
        width={compact ? 24 : 28}
        height={compact ? 24 : 28}
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        className="shrink-0 text-accent-400"
      >
        <path d="M13.4 2 5.2 13.1a.55.55 0 0 0 .44.88h4.7l-1.2 8L18.8 10.6a.55.55 0 0 0-.44-.88h-4.7l1.2-7.72Z" />
      </svg>

      <span
        className={cx(
          'flex flex-col font-extrabold uppercase leading-[1.05] tracking-tight',
          compact ? 'text-[0.8125rem]' : 'text-sm',
          tone === 'light' ? 'text-white' : 'text-ink',
        )}
      >
        <span>Hill Country</span>
        <span>Electric</span>
      </span>
    </Link>
  )
}
