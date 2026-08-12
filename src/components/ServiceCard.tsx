import { Link } from '@tanstack/react-router'
import { Icon } from './Icon'
import { Badge } from './ui'
import { audienceLabel, cx, priceLabel } from '~/lib/format'
import type { ServiceCardData } from '~/content/types'

/**
 * Service card. The whole card is one link — the "Learn more" affordance is
 * styling, not a second tab stop, so keyboard users get one target per card.
 *
 * Emergency services are distinguished with an amber left rule and a badge
 * rather than a red card, which would read as an error state.
 */
export function ServiceCard({ service }: { service: ServiceCardData }) {
  return (
    <li className="h-full">
      <Link
        to="/services/$serviceSlug"
        params={{ serviceSlug: service.slug }}
        className={cx(
          'group flex h-full flex-col rounded-card border border-line bg-white p-5',
          'shadow-card transition-all duration-200',
          'hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-lift',
          service.emergencyEligible && 'border-l-[3px] border-l-accent-400',
        )}
      >
        <div className="flex items-start justify-between gap-3">
          <span
            className={cx(
              'grid h-11 w-11 shrink-0 place-items-center rounded-lg transition-colors',
              service.emergencyEligible
                ? 'bg-accent-50 text-accent-700 group-hover:bg-accent-100'
                : 'bg-brand-50 text-brand-600 group-hover:bg-brand-100',
            )}
          >
            <Icon name={service.icon} size={23} />
          </span>
          {service.emergencyEligible ? <Badge tone="accent">24/7 emergency</Badge> : null}
        </div>

        <h3 className="mt-4 text-[1.0625rem] font-bold leading-snug text-ink group-hover:text-brand-700">
          {service.name}
        </h3>

        <p className="mt-2 flex-1 text-[0.9375rem] leading-relaxed text-muted">{service.summary}</p>

        <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-line pt-4">
          <span className="text-sm font-bold text-ink">{priceLabel(service.startingPrice)}</span>
          <span aria-hidden="true" className="text-line-strong">
            ·
          </span>
          <span className="text-sm text-muted">{audienceLabel(service.audience)}</span>
          <span className="ml-auto inline-flex items-center gap-1 text-sm font-semibold text-brand-700">
            Learn more
            <Icon
              name="arrow-right"
              size={15}
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </span>
        </div>
      </Link>
    </li>
  )
}

export function ServiceGrid({
  services,
  className,
  columns = 3,
}: {
  services: ServiceCardData[]
  className?: string
  columns?: 2 | 3 | 4
}) {
  const cols = {
    2: 'sm:grid-cols-2',
    3: 'sm:grid-cols-2 lg:grid-cols-3',
    4: 'sm:grid-cols-2 lg:grid-cols-4',
  }[columns]

  return (
    <ul className={cx('grid gap-4 md:gap-5', cols, className)}>
      {services.map((service) => (
        <ServiceCard key={service.slug} service={service} />
      ))}
    </ul>
  )
}

/** Compact variant used in the "related services" rail on detail pages. */
export function ServiceLinkCard({ service }: { service: ServiceCardData }) {
  return (
    <li>
      <Link
        to="/services/$serviceSlug"
        params={{ serviceSlug: service.slug }}
        className="group flex items-center gap-3 rounded-card border border-line bg-white p-4 shadow-card transition-colors hover:border-brand-200 hover:bg-brand-50/40"
      >
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-600">
          <Icon name={service.icon} size={20} />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[0.9375rem] font-bold text-ink group-hover:text-brand-700">
            {service.shortName}
          </span>
          <span className="block text-sm text-muted">{priceLabel(service.startingPrice)}</span>
        </span>
        <Icon name="chevron-right" size={18} className="shrink-0 text-line-strong" />
      </Link>
    </li>
  )
}
