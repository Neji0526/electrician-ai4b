import { Icon } from './Icon'
import { trustPoints } from '~/content/business'
import { cx } from '~/lib/format'

/**
 * Four credibility points.
 *
 * `card` (default) is the bordered grid used under interior page heroes.
 * `row` is the borderless variant the homepage uses directly under the hero,
 * where the section already sits between two rules.
 */
export function TrustStrip({
  className,
  compact = false,
  variant = 'card',
}: {
  className?: string
  compact?: boolean
  variant?: 'card' | 'row'
}) {
  if (variant === 'row') {
    return (
      <ul className={cx('grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8', className)}>
        {trustPoints.map((point) => (
          <li key={point.title} className="flex items-start gap-3">
            <Icon name={point.icon} size={26} className="mt-0.5 shrink-0 text-brand-600" />
            <span>
              <span className="block text-[0.9375rem] font-bold text-ink">{point.title}</span>
              <span className="mt-1 block text-sm leading-snug text-muted">{point.text}</span>
            </span>
          </li>
        ))}
      </ul>
    )
  }

  return (
    <ul
      className={cx(
        'grid gap-px overflow-hidden rounded-card border border-line bg-line',
        'sm:grid-cols-2 lg:grid-cols-4',
        className,
      )}
    >
      {trustPoints.map((point) => (
        <li key={point.title} className={cx('flex gap-3 bg-white', compact ? 'p-4' : 'p-5')}>
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-600">
            <Icon name={point.icon} size={19} />
          </span>
          <span>
            <span className="block text-[0.9375rem] font-bold text-ink">{point.title}</span>
            {!compact ? (
              <span className="mt-1 block text-sm leading-snug text-muted">{point.text}</span>
            ) : null}
          </span>
        </li>
      ))}
    </ul>
  )
}
