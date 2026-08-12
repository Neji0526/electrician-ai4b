import { useMemo, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'

import { Icon } from '~/components/Icon'
import { PageHero } from '~/components/PageHero'
import { Section, SectionHeading, Badge } from '~/components/ui'
import { ServiceGrid } from '~/components/ServiceCard'
import { TrustStrip } from '~/components/TrustStrip'
import { FAQAccordion } from '~/components/FAQAccordion'
import { CTASection } from '~/components/CTASection'

import { getFaqs, getServiceCards, serviceCategories } from '~/content'
import { business } from '~/content/business'
import { seo } from '~/lib/seo'
import { breadcrumbSchema, faqSchema } from '~/lib/schema'
import { cx } from '~/lib/format'

const TRAIL = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
]

export const Route = createFileRoute('/services/')({
  loader: async () => {
    const [services, faqs] = await Promise.all([
      getServiceCards(),
      getFaqs({ category: 'Pricing & Estimates', limit: 6 }),
    ])
    return { services, faqs }
  },
  head: ({ loaderData }) =>
    seo({
      title: `Electrical Services in ${business.address.city}, ${business.address.state}`,
      description:
        'Panel upgrades, EV chargers, rewiring, lighting, generators, inspections and 24/7 emergency repair. Licensed Austin electricians with upfront pricing on every job.',
      path: '/services',
      schema: [
        breadcrumbSchema(TRAIL),
        ...(loaderData?.faqs ? [faqSchema(loaderData.faqs)] : []),
      ],
    }),
  component: ServicesPage,
})

type AudienceFilter = 'all' | 'residential' | 'commercial'

function ServicesPage() {
  const { services, faqs } = Route.useLoaderData()
  const [category, setCategory] = useState<string>('all')
  const [audience, setAudience] = useState<AudienceFilter>('all')

  const filtered = useMemo(
    () =>
      services.filter((service) => {
        const categoryOk = category === 'all' || service.category === category
        const audienceOk =
          audience === 'all' || service.audience === 'both' || service.audience === audience
        return categoryOk && audienceOk
      }),
    [services, category, audience],
  )

  const categories = ['all', ...serviceCategories]

  return (
    <>
      <PageHero
        trail={TRAIL}
        eyebrow="Our services"
        title="Electrical work for Austin homes and businesses"
        intro={
          <>
            Every job starts with a diagnosis and a written price. We pull the permits the city
            requires, meet the inspector, and back the workmanship for two to five years depending on
            the job.
          </>
        }
        showRating
      />

      <div className="container-page py-8">
        <TrustStrip compact />
      </div>

      <Section tone="surface" className="pt-4 md:pt-6" labelledBy="all-services">
        <h2 id="all-services" className="sr-only">
          All electrical services
        </h2>

        {/* Filters */}
        <div className="rounded-card border border-line bg-white p-4 shadow-card">
          <div className="flex flex-wrap items-center gap-3">
            <span className="flex items-center gap-1.5 text-sm font-bold text-ink">
              <Icon name="filter" size={16} className="text-brand-600" />
              Filter
            </span>

            <fieldset className="flex flex-wrap items-center gap-1.5">
              <legend className="sr-only">Filter by category</legend>
              {categories.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setCategory(option)}
                  aria-pressed={category === option}
                  className={cx(
                    'rounded-full border px-3 py-1.5 text-sm font-semibold transition-colors',
                    category === option
                      ? 'border-brand-600 bg-brand-600 text-white'
                      : 'border-line-strong bg-white text-ink-soft hover:border-brand-300 hover:text-brand-700',
                  )}
                >
                  {option === 'all' ? 'All services' : option}
                </button>
              ))}
            </fieldset>

            <span aria-hidden="true" className="hidden h-6 w-px bg-line md:block" />

            <fieldset className="flex flex-wrap items-center gap-1.5">
              <legend className="sr-only">Filter by property type</legend>
              {(['all', 'residential', 'commercial'] as const).map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setAudience(option)}
                  aria-pressed={audience === option}
                  className={cx(
                    'rounded-full border px-3 py-1.5 text-sm font-semibold capitalize transition-colors',
                    audience === option
                      ? 'border-ink bg-ink text-white'
                      : 'border-line-strong bg-white text-ink-soft hover:border-muted',
                  )}
                >
                  {option === 'all' ? 'Any property' : option}
                </button>
              ))}
            </fieldset>
          </div>
        </div>

        <p aria-live="polite" className="mt-5 text-[0.9375rem] text-muted">
          Showing <span className="font-bold text-ink">{filtered.length}</span> of {services.length}{' '}
          services
        </p>

        {filtered.length ? (
          <ServiceGrid services={filtered} className="mt-4" />
        ) : (
          <div className="mt-4 rounded-card border border-line bg-white p-10 text-center">
            <p className="font-bold text-ink">No services match that combination.</p>
            <button
              type="button"
              onClick={() => {
                setCategory('all')
                setAudience('all')
              }}
              className="mt-2 font-semibold text-brand-700 underline underline-offset-2"
            >
              Clear filters
            </button>
          </div>
        )}
      </Section>

      {/* Emergency + same-day callout */}
      <Section labelledBy="availability-heading">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-card border border-accent-200 bg-accent-50 p-6">
            <Badge tone="accent">24/7</Badge>
            <h2 id="availability-heading" className="mt-3 text-xl font-bold text-ink">
              Which services are available as an emergency?
            </h2>
            <ul className="mt-4 space-y-2.5">
              {services
                .filter((s) => s.emergencyEligible)
                .map((service) => (
                  <li key={service.slug} className="flex items-start gap-2.5 text-[0.9375rem] text-ink-soft">
                    <Icon name="bolt" size={15} className="mt-1 shrink-0 text-accent-600" />
                    {service.name}
                  </li>
                ))}
            </ul>
            <p className="mt-4 text-[0.9375rem] text-ink-soft">
              {business.emergency.responseTime}
            </p>
          </div>

          <div className="rounded-card border border-line bg-white p-6 shadow-card">
            <Badge tone="brand">Same day</Badge>
            <h2 className="mt-3 text-xl font-bold text-ink">Available same day, most weekdays</h2>
            <ul className="mt-4 space-y-2.5">
              {services
                .filter((s) => s.sameDayEligible && !s.emergencyEligible)
                .map((service) => (
                  <li key={service.slug} className="flex items-start gap-2.5 text-[0.9375rem] text-ink-soft">
                    <Icon name="check-circle" size={17} className="mt-0.5 shrink-0 text-brand-600" />
                    {service.name}
                  </li>
                ))}
            </ul>
            <p className="mt-4 text-[0.9375rem] text-ink-soft">
              We hold same-day slots open every weekday. They are usually gone by mid-morning, so
              call early if today matters.
            </p>
          </div>
        </div>
      </Section>

      <Section tone="surface" labelledBy="services-faq">
        <div className="grid gap-9 lg:grid-cols-[1fr_1.5fr] lg:items-start">
          <SectionHeading
            id="services-faq"
            eyebrow="Pricing"
            title="How our pricing works"
            intro="Fixed prices for residential work, agreed before anything starts. Here is what people ask most."
          />
          <FAQAccordion faqs={faqs} defaultOpenFirst />
        </div>
      </Section>

      <CTASection
        location="services_final"
        headline="Not sure which service you need?"
        body="Describe what the house is doing — a tripping breaker, a warm outlet, a panel with no room left — and we will tell you what it is and what it takes to fix."
      />
    </>
  )
}
