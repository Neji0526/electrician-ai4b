import { createFileRoute } from '@tanstack/react-router'

import { Icon } from '~/components/Icon'
import { Breadcrumbs } from '~/components/Breadcrumbs'
import { Section, SectionHeading } from '~/components/ui'
import { EstimateForm } from '~/components/EstimateForm'
import { RatingStars } from '~/components/RatingStars'
import { ReviewCard } from '~/components/cards'
import { FAQAccordion } from '~/components/FAQAccordion'

import { getFaqs, getFeaturedReviews, getServiceOptions } from '~/content'
import { business, trustPoints } from '~/content/business'
import { seo } from '~/lib/seo'
import { breadcrumbSchema } from '~/lib/schema'
import { trackPhone } from '~/lib/analytics'

const TRAIL = [
  { label: 'Home', href: '/' },
  { label: 'Request an Estimate', href: '/request-estimate' },
]

export const Route = createFileRoute('/request-estimate')({
  // `service` is optional — declaring it as an optional key keeps every
  // `<Link to="/request-estimate">` on the site free of a required search prop.
  validateSearch: (search: Record<string, unknown>): { service?: string } =>
    typeof search.service === 'string' ? { service: search.service } : {},
  loader: async () => {
    const [services, reviews, faqs] = await Promise.all([
      getServiceOptions(),
      getFeaturedReviews(2),
      getFaqs({ category: 'Pricing & Estimates', limit: 4 }),
    ])
    return { services, reviews, faqs }
  },
  head: () =>
    seo({
      title: 'Request a Free Electrical Estimate in Austin, TX',
      description: `Free estimates on planned electrical work across ${business.serviceAreaSummary}. Fixed price before work starts, licensed electricians, and a 2-year workmanship warranty.`,
      path: '/request-estimate',
      schema: breadcrumbSchema(TRAIL),
    }),
  component: RequestEstimatePage,
})

function RequestEstimatePage() {
  const { services, reviews, faqs } = Route.useLoaderData()
  const { service } = Route.useSearch()

  return (
    <>
      <section className="border-b border-line bg-surface">
        <div className="container-page py-8 md:py-12">
          <Breadcrumbs trail={TRAIL} className="mb-6" />

          <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-14">
            {/* --------------------------------------------------- copy */}
            <div>
              <h1 className="text-[2rem] leading-[1.15] md:text-[2.75rem]">
                Get a free electrical estimate
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-ink-soft">
                Tell us what you need and we will get back to you with next steps — usually within
                the hour during business hours. Estimates on planned work are free, including the
                site visit and the load calculation.
              </p>

              <ul className="mt-7 space-y-4">
                {trustPoints.map((point) => (
                  <li key={point.title} className="flex gap-3.5">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-white text-brand-600 shadow-card">
                      <Icon name={point.icon} size={20} />
                    </span>
                    <span>
                      <span className="block font-bold text-ink">{point.title}</span>
                      <span className="mt-0.5 block text-[0.9375rem] leading-snug text-muted">
                        {point.text}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 rounded-card border border-line bg-white p-5 shadow-card">
                <div className="flex items-center gap-3">
                  <RatingStars rating={business.rating} size={19} />
                  <span className="text-[0.9375rem] text-ink-soft">
                    <span className="font-bold text-ink">{business.rating}</span> from{' '}
                    {business.reviewCount} reviews
                  </span>
                </div>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">
                  {business.license.label}. {business.warranty}
                </p>
              </div>

              <div className="mt-6 flex items-start gap-3 rounded-card border border-accent-200 bg-accent-50 p-4">
                <Icon name="bolt-alert" size={20} className="mt-0.5 shrink-0 text-accent-700" />
                <p className="text-[0.9375rem] text-accent-900">
                  <span className="font-bold">Is this an emergency?</span> Do not use the form — call{' '}
                  <a
                    href={business.emergencyPhoneHref}
                    onClick={() => trackPhone('estimate_page_emergency', true)}
                    className="font-bold underline"
                  >
                    {business.emergencyPhone}
                  </a>
                  . An electrician answers 24/7.
                </p>
              </div>
            </div>

            {/* --------------------------------------------------- form */}
            <div>
              <EstimateForm services={services} defaultServiceSlug={service} />
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------- what happens */}
      <Section labelledBy="what-next">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-start">
          <div>
            <SectionHeading
              id="what-next"
              eyebrow="What happens next"
              title="No sales visit, no pressure"
              intro="We are an electrical contractor, not a sales operation. Here is exactly what follows after you submit."
            />

            <ol className="mt-8 space-y-6">
              {[
                {
                  title: 'A scheduler calls you back',
                  text: 'Usually within the hour during business hours. We confirm what you are seeing and whether it needs same-day attention.',
                },
                {
                  title: 'We book a two-hour window',
                  text: 'Not a four-hour block. You get a text with the electrician’s name before they head over.',
                },
                {
                  title: 'The electrician diagnoses on site',
                  text: 'For planned work — panels, chargers, lighting, generators — the visit and the load calculation are free.',
                },
                {
                  title: 'You get a written price before anything starts',
                  text: 'Fixed for residential work. If we find something unexpected once a wall is open, we show you a photo and price it separately for your approval.',
                },
              ].map((step, i) => (
                <li key={step.title} className="flex gap-4">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-600 text-sm font-bold text-white">
                    {i + 1}
                  </span>
                  <div className="pt-1">
                    <p className="text-[1.0625rem] font-bold text-ink">{step.title}</p>
                    <p className="mt-1.5 leading-relaxed text-ink-soft">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="space-y-5">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>
      </Section>

      <Section tone="surface" labelledBy="estimate-faq">
        <div className="grid gap-9 lg:grid-cols-[1fr_1.5fr] lg:items-start">
          <SectionHeading
            id="estimate-faq"
            eyebrow="Estimates & pricing"
            title="Common questions before booking"
          />
          <FAQAccordion faqs={faqs} defaultOpenFirst />
        </div>
      </Section>
    </>
  )
}
