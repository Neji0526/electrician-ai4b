import { useMemo, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'

import { Icon } from '~/components/Icon'
import { PageHero } from '~/components/PageHero'
import { Section } from '~/components/ui'
import { ReviewCard } from '~/components/cards'
import { RatingStars } from '~/components/RatingStars'
import { CTASection } from '~/components/CTASection'

import { getReviewStats, getReviews, getServiceCards } from '~/content'
import { business } from '~/content/business'
import { seo } from '~/lib/seo'
import { breadcrumbSchema, reviewSchema } from '~/lib/schema'
import { cx } from '~/lib/format'

const TRAIL = [
  { label: 'Home', href: '/' },
  { label: 'Reviews', href: '/reviews' },
]

export const Route = createFileRoute('/reviews')({
  loader: async () => {
    const [reviews, stats, services] = await Promise.all([
      getReviews(),
      getReviewStats(),
      getServiceCards(),
    ])
    const serviceNames = Object.fromEntries(services.map((s) => [s.slug, s.shortName]))
    return { reviews, stats, serviceNames, services }
  },
  head: ({ loaderData }) =>
    seo({
      title: `Customer Reviews — ${business.rating}★ from ${business.reviewCount} Austin Customers`,
      description: `Read verified reviews of ${business.name} from homeowners and businesses across Austin, Round Rock, Cedar Park and the surrounding Hill Country.`,
      path: '/reviews',
      schema: [
        breadcrumbSchema(TRAIL),
        ...(loaderData?.reviews ? [reviewSchema(loaderData.reviews.slice(0, 10))] : []),
      ],
    }),
  component: ReviewsPage,
})

function ReviewsPage() {
  const { reviews, stats, serviceNames, services } = Route.useLoaderData()
  const [filter, setFilter] = useState('all')

  const usedServices = useMemo(
    () => services.filter((s) => reviews.some((r) => r.serviceSlug === s.slug)),
    [services, reviews],
  )

  const filtered = useMemo(
    () => (filter === 'all' ? reviews : reviews.filter((r) => r.serviceSlug === filter)),
    [reviews, filter],
  )

  const maxCount = Math.max(...stats.distribution.map((d) => d.count), 1)

  return (
    <>
      <PageHero
        trail={TRAIL}
        eyebrow="Customer reviews"
        title={`${business.rating} out of 5 from ${business.reviewCount} Austin-area customers`}
        intro="Every review below is from a real job. We publish the four-star ones too — including the one where we pushed an appointment because of an emergency ahead of it."
        showActions={false}
        aside={
          <div className="rounded-panel border border-line bg-white p-6 shadow-card">
            <div className="flex items-center gap-4">
              <p className="text-5xl font-extrabold tracking-tight text-brand-700">
                {business.rating}
              </p>
              <div>
                <RatingStars rating={business.rating} size={20} />
                <p className="mt-1 text-sm text-muted">
                  {business.reviewCount} reviews · {stats.published} published here
                </p>
              </div>
            </div>

            <ul className="mt-5 space-y-2">
              {stats.distribution.map((row) => (
                <li key={row.stars} className="flex items-center gap-3">
                  <span className="w-12 shrink-0 text-sm font-semibold text-ink-soft">
                    {row.stars} star
                  </span>
                  <span className="h-2 flex-1 overflow-hidden rounded-full bg-surface-2">
                    <span
                      className="block h-full rounded-full bg-accent-400"
                      style={{ width: `${(row.count / maxCount) * 100}%` }}
                    />
                  </span>
                  <span className="w-6 shrink-0 text-right text-sm text-muted">{row.count}</span>
                </li>
              ))}
            </ul>

            <p className="mt-5 flex items-start gap-2 border-t border-line pt-4 text-sm text-muted">
              <Icon name="info" size={16} className="mt-0.5 shrink-0 text-brand-600" />
              Reviews are collected from Google, Facebook, Yelp and Nextdoor, plus direct feedback
              after a job closes.
            </p>
          </div>
        }
      />

      <Section tone="surface" labelledBy="all-reviews">
        <h2 id="all-reviews" className="sr-only">
          All customer reviews
        </h2>

        <div className="flex flex-wrap items-center gap-2">
          <span className="flex items-center gap-1.5 text-sm font-bold text-ink">
            <Icon name="filter" size={16} className="text-brand-600" />
            Filter by service
          </span>
          <button
            type="button"
            onClick={() => setFilter('all')}
            aria-pressed={filter === 'all'}
            className={cx(
              'rounded-full border px-3 py-1.5 text-sm font-semibold transition-colors',
              filter === 'all'
                ? 'border-brand-600 bg-brand-600 text-white'
                : 'border-line-strong bg-white text-ink-soft hover:border-brand-300 hover:text-brand-700',
            )}
          >
            All reviews
          </button>
          {usedServices.map((service) => (
            <button
              key={service.slug}
              type="button"
              onClick={() => setFilter(service.slug)}
              aria-pressed={filter === service.slug}
              className={cx(
                'rounded-full border px-3 py-1.5 text-sm font-semibold transition-colors',
                filter === service.slug
                  ? 'border-brand-600 bg-brand-600 text-white'
                  : 'border-line-strong bg-white text-ink-soft hover:border-brand-300 hover:text-brand-700',
              )}
            >
              {service.shortName}
            </button>
          ))}
        </div>

        <p aria-live="polite" className="mt-5 text-[0.9375rem] text-muted">
          Showing <span className="font-bold text-ink">{filtered.length}</span> reviews
        </p>

        <ul className="mt-4 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((review) => (
            <li key={review.id}>
              <ReviewCard review={review} serviceName={serviceNames[review.serviceSlug]} />
            </li>
          ))}
        </ul>
      </Section>

      <CTASection
        location="reviews_final"
        headline="Join them"
        body="Free estimate, fixed price before the work starts, and a licensed electrician who tells you what they found."
      />
    </>
  )
}
