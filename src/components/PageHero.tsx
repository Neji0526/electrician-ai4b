import type { ReactNode } from 'react'
import { Link } from '@tanstack/react-router'
import { Breadcrumbs, type Crumb } from './Breadcrumbs'
import { Icon } from './Icon'
import { btn } from './ui'
import { RatingStars } from './RatingStars'
import { business } from '~/content/business'
import { trackEstimate, trackPhone } from '~/lib/analytics'
import { cx } from '~/lib/format'

/**
 * Standard interior page header. Light slate background, breadcrumbs, a single
 * H1 and at most two calls to action.
 */
export function PageHero({
  trail,
  eyebrow,
  title,
  intro,
  aside,
  badges,
  showActions = true,
  estimateLabel = 'Get a Free Estimate',
  showRating = false,
  className,
}: {
  trail: Crumb[]
  eyebrow?: string
  title: string
  intro?: ReactNode
  aside?: ReactNode
  badges?: ReactNode
  showActions?: boolean
  estimateLabel?: string
  showRating?: boolean
  className?: string
}) {
  return (
    <section className={cx('border-b border-line bg-surface', className)}>
      <div className="container-page py-8 md:py-12">
        <Breadcrumbs trail={trail} className="mb-6" />

        <div className={cx('grid gap-10', aside && 'lg:grid-cols-[1.5fr_1fr] lg:items-start')}>
          <div className={cx(!aside && 'max-w-3xl')}>
            {eyebrow ? (
              <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">
                {eyebrow}
              </p>
            ) : null}

            <h1 className="mt-2 text-[2rem] leading-[1.15] md:text-[2.75rem]">{title}</h1>

            {intro ? (
              <div className="mt-4 max-w-2xl text-[1.0625rem] leading-relaxed text-ink-soft">
                {intro}
              </div>
            ) : null}

            {badges ? <div className="mt-5 flex flex-wrap gap-2">{badges}</div> : null}

            {showRating ? (
              <div className="mt-5 flex items-center gap-2.5">
                <RatingStars rating={business.rating} size={18} />
                <span className="text-sm text-ink-soft">
                  <span className="font-bold text-ink">{business.rating}</span> from{' '}
                  {business.reviewCount} verified reviews
                </span>
              </div>
            ) : null}

            {showActions ? (
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/request-estimate"
                  onClick={() => trackEstimate('page_hero')}
                  className={btn('primary', 'lg')}
                >
                  {estimateLabel}
                </Link>
                <a
                  href={business.phoneHref}
                  onClick={() => trackPhone('page_hero')}
                  className={btn('secondary', 'lg')}
                >
                  <Icon name="phone" size={18} />
                  {business.phone}
                </a>
              </div>
            ) : null}
          </div>

          {aside ? <div>{aside}</div> : null}
        </div>
      </div>
    </section>
  )
}
