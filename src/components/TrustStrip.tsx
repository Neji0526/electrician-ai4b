import { Icon } from './Icon'
import { trustPoints } from '~/content/business'
import { cx } from '~/lib/format'

/** Four credibility points. Used directly under the hero on most pages. */
export function TrustStrip({
  className,
  compact = false,
}: {
  className?: string
  compact?: boolean
}) {
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
