import { useEffect, useState } from 'react'
import { Icon } from './Icon'
import { business } from '~/content/business'
import { getOpenStatus, cx } from '~/lib/format'

/**
 * Opening hours table with a live open/closed indicator.
 *
 * The status is computed after mount only. Rendering it during SSR would bake
 * a timestamp into cached HTML and show visitors "Open now" at 11pm.
 */
export function BusinessHours({ className }: { className?: string }) {
  const [status, setStatus] = useState<ReturnType<typeof getOpenStatus> | null>(null)
  const todayIndex = status?.today?.day

  useEffect(() => {
    setStatus(getOpenStatus(new Date()))
  }, [])

  return (
    <div className={cx('rounded-card border border-line bg-white p-5 shadow-card', className)}>
      <div className="flex items-center justify-between gap-3">
        <h3 className="flex items-center gap-2 font-bold text-ink">
          <Icon name="clock" size={19} className="text-brand-600" />
          Opening hours
        </h3>
        {status ? (
          <span
            className={cx(
              'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-bold',
              status.open
                ? 'border-success/20 bg-success-bg text-success'
                : 'border-line bg-surface-2 text-ink-soft',
            )}
          >
            <span
              aria-hidden="true"
              className={cx('h-1.5 w-1.5 rounded-full', status.open ? 'bg-success' : 'bg-muted')}
            />
            {status.open ? 'Open now' : 'Closed'}
          </span>
        ) : null}
      </div>

      <dl className="mt-4 space-y-1.5">
        {business.hours.map((entry) => {
          const isToday = entry.day === todayIndex
          return (
            <div
              key={entry.day}
              className={cx(
                'flex items-baseline justify-between gap-4 rounded px-2 py-1.5 text-[0.9375rem]',
                isToday && 'bg-brand-50',
              )}
            >
              <dt className={cx(isToday ? 'font-bold text-brand-800' : 'text-ink-soft')}>
                {entry.label}
                {isToday ? <span className="sr-only"> (today)</span> : null}
              </dt>
              <dd className={cx('text-right', isToday ? 'font-bold text-brand-800' : 'text-ink')}>
                {entry.open && entry.close ? `${entry.open} – ${entry.close}` : 'Closed'}
                {entry.note ? (
                  <span className="block text-xs font-normal text-muted">{entry.note}</span>
                ) : null}
              </dd>
            </div>
          )
        })}
      </dl>

      {business.emergency.enabled ? (
        <p className="mt-4 flex items-start gap-2 border-t border-line pt-4 text-sm text-ink-soft">
          <Icon name="bolt-alert" size={17} className="mt-0.5 shrink-0 text-accent-600" />
          <span>
            <span className="font-semibold text-ink">Emergency line is open 24/7</span>, including
            nights, weekends and holidays.
          </span>
        </p>
      ) : null}
    </div>
  )
}
