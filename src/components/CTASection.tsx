import { Link } from 'react-router'
import { Icon } from './Icon'
import { btn } from './ui'
import { RatingStars } from './RatingStars'
import { business } from '~/content/business'
import { trackEstimate, trackPhone } from '~/lib/analytics'
import { cx } from '~/lib/format'

/**
 * Closing conversion strip. Two actions, never more — an estimate request and
 * a phone call. Everything else on the page has already tried to earn this.
 */
export function CTASection({
  headline = 'Need an electrician you can actually count on?',
  body = 'Tell us what the house is doing and we will tell you what it takes to fix it — with the price before the work starts.',
  estimateLabel = 'Get a Free Estimate',
  location = 'cta_section',
  tone = 'brand',
  className,
}: {
  headline?: string
  body?: string
  estimateLabel?: string
  location?: string
  tone?: 'brand' | 'light'
  className?: string
}) {
  const light = tone === 'light'

  return (
    <section
      aria-labelledby={`cta-${location}`}
      className={cx(light ? 'bg-surface' : 'bg-brand-700 text-white', className)}
    >
      <div className="container-page py-14 md:py-16">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
          <div>
            <h2
              id={`cta-${location}`}
              className={cx('text-2xl leading-tight md:text-[2rem]', light ? 'text-ink' : 'text-white')}
            >
              {headline}
            </h2>
            <p
              className={cx(
                'mt-3 max-w-2xl text-[1.0625rem] leading-relaxed',
                light ? 'text-ink-soft' : 'text-brand-100',
              )}
            >
              {body}
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/request-estimate"
                onClick={() => trackEstimate(location)}
                className={btn(light ? 'primary' : 'white', 'lg')}
              >
                {estimateLabel}
                <Icon name="arrow-right" size={18} />
              </Link>
              <a
                href={business.phoneHref}
                onClick={() => trackPhone(location)}
                className={cx(
                  btn('secondary', 'lg'),
                  !light && 'border-white/30 bg-transparent text-white hover:border-white/60 hover:bg-white/10',
                )}
              >
                <Icon name="phone" size={18} />
                {business.phone}
              </a>
            </div>
          </div>

          <ul
            className={cx(
              'grid gap-3 rounded-panel border p-5 sm:grid-cols-2 lg:grid-cols-1',
              light ? 'border-line bg-white' : 'border-white/15 bg-white/[0.07]',
            )}
          >
            <li className="flex items-center gap-3">
              <RatingStars rating={business.rating} tone={light ? 'accent' : 'light'} size={17} />
              <span className={cx('text-sm', light ? 'text-ink-soft' : 'text-brand-100')}>
                <span className={cx('font-bold', light ? 'text-ink' : 'text-white')}>
                  {business.rating}
                </span>{' '}
                from {business.reviewCount} reviews
              </span>
            </li>
            {[
              `${business.license.number} · licensed & insured`,
              `${business.yearsInBusiness} years serving ${business.address.city}`,
              'Upfront pricing before any work starts',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <Icon
                  name="check-circle"
                  size={18}
                  className={cx('mt-0.5 shrink-0', light ? 'text-brand-600' : 'text-brand-200')}
                />
                <span className={cx('text-sm', light ? 'text-ink-soft' : 'text-brand-100')}>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
