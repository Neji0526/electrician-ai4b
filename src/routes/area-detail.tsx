import { Link } from 'react-router'
import type { LoaderFunctionArgs } from 'react-router'
import { useRouteData, notFound, requireParam } from '~/lib/router'
import { Seo } from '~/components/Seo'

import { Icon } from '~/components/Icon'
import { PageHero } from '~/components/PageHero'
import { Section, SectionHeading, Badge, btn } from '~/components/ui'
import { ServiceGrid } from '~/components/ServiceCard'
import { ProjectCard, ReviewCard } from '~/components/cards'
import { FAQAccordion } from '~/components/FAQAccordion'
import { CTASection } from '~/components/CTASection'
import { LeadForm } from '~/components/LeadForm'
import { Prose } from '~/components/Prose'
import { TrustStrip } from '~/components/TrustStrip'

import {
  getArea,
  getAreaCards,
  getFaqs,
  getProjectCards,
  getReviews,
  getServiceCardsBySlug,
  getServiceOptions,
} from '~/content'
import { business } from '~/content/business'
import { seo } from '~/lib/seo'
import { areaSchema, breadcrumbSchema, faqSchema } from '~/lib/schema'
import { trackPhone } from '~/lib/analytics'

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const area = await getArea(requireParam(params, 'locationSlug'))
  if (!area) throw notFound()

  const [allServices, projects, reviews, faqs, allAreas] = await Promise.all([
    getServiceOptions(),
    getProjectCards({ city: area.city, limit: 3 }),
    getReviews({ city: area.city, limit: 3 }),
    getFaqs({ category: 'Appointments & Scheduling', limit: 5 }),
    getAreaCards(),
  ])

  const featured = await getServiceCardsBySlug(area.featuredServices)

  // Fall back to strong general reviews so a quieter area page is never empty.
  const localReviews = reviews.length
    ? reviews
    : (await getReviews({ limit: 3 }))

  return { area, featured, allServices, projects, reviews: localReviews, faqs, allAreas }
}

type RouteData = Awaited<ReturnType<typeof loader>>

const pageSeo = ({ loaderData }: { loaderData: RouteData }) => {
  const { area, faqs } = loaderData
  const trail = [
    { label: 'Home', href: '/' },
    { label: 'Service Areas', href: '/service-areas' },
    { label: area.city, href: `/service-areas/${area.slug}` },
  ]
  return seo({
    title: area.seo.title,
    description: area.seo.description,
    path: `/service-areas/${area.slug}`,
    schema: [areaSchema(area), breadcrumbSchema(trail), faqSchema(faqs)],
  })
}

function ServiceAreaPage() {
  const data = useRouteData<typeof loader>()
  const { area, featured, allServices, projects, reviews, faqs, allAreas } = data

  const trail = [
    { label: 'Home', href: '/' },
    { label: 'Service Areas', href: '/service-areas' },
    { label: area.city, href: `/service-areas/${area.slug}` },
  ]

  const others = allAreas.filter((a) => a.slug !== area.slug)

  return (
    <>
      <Seo {...pageSeo({ loaderData: data })} />

      <PageHero
        trail={trail}
        eyebrow={`${area.county} · ${area.state}`}
        title={`Electricians in ${area.city}, ${area.state}`}
        intro={area.localNote}
        showRating
        badges={
          <>
            <Badge tone="brand">{area.zips.length} ZIP codes covered</Badge>
            <Badge tone="neutral">{area.driveTime}</Badge>
            {business.emergency.areas.includes(area.city) ? (
              <Badge tone="accent">24/7 emergency coverage</Badge>
            ) : null}
          </>
        }
        aside={
          <div className="rounded-panel border border-line bg-white p-6 shadow-card">
            <h2 className="text-lg font-bold text-ink">Local response times</h2>
            <dl className="mt-4 space-y-3.5">
              <div>
                <dt className="text-sm font-semibold uppercase tracking-wide text-muted">
                  Scheduling
                </dt>
                <dd className="mt-1 text-[0.9375rem] text-ink-soft">{area.responseTime}</dd>
              </div>
              <div>
                <dt className="text-sm font-semibold uppercase tracking-wide text-muted">
                  Distance from our shop
                </dt>
                <dd className="mt-1 text-[0.9375rem] text-ink-soft">{area.driveTime}</dd>
              </div>
              <div>
                <dt className="text-sm font-semibold uppercase tracking-wide text-muted">
                  Neighbourhoods we work in
                </dt>
                <dd className="mt-1 text-[0.9375rem] text-ink-soft">
                  {area.neighborhoods.join(' · ')}
                </dd>
              </div>
            </dl>
            <a
              href={business.phoneHref}
              onClick={() => trackPhone(`area_${area.slug}_aside`)}
              className={btn('primary', 'md', 'mt-5 w-full')}
            >
              <Icon name="phone" size={17} />
              {business.phone}
            </a>
          </div>
        }
      />

      <div className="container-page py-8">
        <TrustStrip compact />
      </div>

      {/* ------------------------------------------------------- local intro */}
      <Section className="pt-2 md:pt-4">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:items-start">
          <div className="max-w-3xl">
            <Prose blocks={area.intro} />

            <div className="mt-10 rounded-card border border-line bg-surface p-5">
              <h2 className="text-lg font-bold text-ink">{area.city} at a glance</h2>
              <dl className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <dt className="text-sm font-semibold text-muted">Population</dt>
                  <dd className="mt-0.5 font-bold text-ink">{area.population}</dd>
                </div>
                <div>
                  <dt className="text-sm font-semibold text-muted">County</dt>
                  <dd className="mt-0.5 font-bold text-ink">{area.county}</dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-sm font-semibold text-muted">Housing stock</dt>
                  <dd className="mt-0.5 text-ink-soft">{area.housingNote}</dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-sm font-semibold text-muted">ZIP codes</dt>
                  <dd className="mt-0.5 text-ink-soft">{area.zips.join(' · ')}</dd>
                </div>
              </dl>
            </div>
          </div>

          <aside className="lg:sticky lg:top-28">
            <LeadForm
              services={allServices}
              compact
              title={`Request service in ${area.city}`}
              subtitle="We will call you back with an arrival window that works."
            />
          </aside>
        </div>
      </Section>

      {/* ---------------------------------------------------- local services */}
      <Section tone="surface" labelledBy="local-services">
        <SectionHeading
          id="local-services"
          eyebrow={`Popular in ${area.city}`}
          title={`Electrical services we do most in ${area.city}`}
          intro="Every service we offer is available here — these are simply the ones this housing stock generates most often."
        />
        <ServiceGrid services={featured} className="mt-9" />
        <Link to="/services" className={btn('secondary', 'md', 'mt-7')}>
          See all {allServices.length} services
          <Icon name="arrow-right" size={17} />
        </Link>
      </Section>

      {/* ---------------------------------------------------- local projects */}
      {projects.length ? (
        <Section labelledBy="local-projects">
          <SectionHeading
            id="local-projects"
            eyebrow="Nearby work"
            title={`Projects completed in ${area.city}`}
          />
          <ul className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </ul>
        </Section>
      ) : null}

      {/* ----------------------------------------------------- local reviews */}
      <Section tone={projects.length ? 'surface' : 'white'} labelledBy="local-reviews">
        <SectionHeading
          id="local-reviews"
          eyebrow="Local customers"
          title={`What ${area.city} customers say`}
        />
        <ul className="mt-8 grid gap-5 md:grid-cols-3">
          {reviews.map((review) => (
            <li key={review.id}>
              <ReviewCard review={review} />
            </li>
          ))}
        </ul>
      </Section>

      {/* -------------------------------------------------------------- faq */}
      <Section labelledBy="local-faq">
        <div className="grid gap-9 lg:grid-cols-[1fr_1.5fr] lg:items-start">
          <SectionHeading
            id="local-faq"
            eyebrow="Scheduling"
            title={`Booking an electrician in ${area.city}`}
          />
          <FAQAccordion faqs={faqs} defaultOpenFirst />
        </div>
      </Section>

      {/* ------------------------------------------------------- other areas */}
      <Section tone="surface" labelledBy="other-areas">
        <SectionHeading id="other-areas" eyebrow="Nearby" title="Other areas we serve" level={2} />
        <ul className="mt-6 flex flex-wrap gap-2.5">
          {others.map((other) => (
            <li key={other.slug}>
              <Link
                to={`/service-areas/${other.slug}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-line-strong bg-white px-4 py-2 text-[0.9375rem] font-semibold text-ink-soft transition-colors hover:border-brand-300 hover:text-brand-700"
              >
                <Icon name="map-pin" size={15} />
                Electrician in {other.city}
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <CTASection
        location={`area_${area.slug}`}
        headline={`Need an electrician in ${area.city}?`}
        body={area.responseTime}
      />
    </>
  )
}

export { ServiceAreaPage as Component }
