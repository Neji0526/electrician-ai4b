import { useEffect } from 'react'
import { Link } from 'react-router'
import type { LoaderFunctionArgs } from 'react-router'
import { useRouteData, notFound, requireParam } from '~/lib/router'
import { Seo } from '~/components/Seo'

import { Icon } from '~/components/Icon'
import { PageHero } from '~/components/PageHero'
import { Section, SectionHeading, Badge, btn, CheckList } from '~/components/ui'
import { TrustStrip } from '~/components/TrustStrip'
import { ServiceLinkCard } from '~/components/ServiceCard'
import { EmergencyInlineBanner } from '~/components/EmergencyBanner'
import { ProjectCard, ReviewCard } from '~/components/cards'
import { FAQAccordion } from '~/components/FAQAccordion'
import { CTASection } from '~/components/CTASection'
import { LeadForm } from '~/components/LeadForm'
import { Photo } from '~/components/Photo'

import {
  getFaqsForService,
  getProjectCards,
  getRelatedServices,
  getReviewsForService,
  getService,
  getServiceOptions,
} from '~/content'
import { business } from '~/content/business'
import { areaDirectory } from '~/content/directory'
import { seo } from '~/lib/seo'
import { breadcrumbSchema, faqSchema, serviceSchema } from '~/lib/schema'
import { track, trackPhone } from '~/lib/analytics'
import { audienceLabel, priceLabel } from '~/lib/format'

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const service = await getService(requireParam(params, 'serviceSlug'))
  if (!service) throw notFound()

  const [related, projects, reviews, faqs, allServices] = await Promise.all([
    getRelatedServices(service.slug),
    getProjectCards({ serviceSlug: service.slug, limit: 3 }),
    getReviewsForService(service.slug, 3),
    getFaqsForService(service.slug, 6),
    getServiceOptions(),
  ])

  return { service, related, projects, reviews, faqs, allServices }
}

type RouteData = Awaited<ReturnType<typeof loader>>

const pageSeo = ({ loaderData }: { loaderData: RouteData }) => {
  const { service, faqs } = loaderData
  const trail = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: service.shortName, href: `/services/${service.slug}` },
  ]
  return seo({
    title: service.seo.title,
    description: service.seo.description,
    path: `/services/${service.slug}`,
    image: service.heroImage.src,
    schema: [serviceSchema(service), breadcrumbSchema(trail), faqSchema(faqs)],
  })
}

function ServiceDetailPage() {
  const data = useRouteData<typeof loader>()
  const { service, related, projects, reviews, faqs, allServices } = data

  useEffect(() => {
    track('service_view', { service: service.slug, category: service.category })
  }, [service.slug, service.category])

  const trail = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: service.shortName, href: `/services/${service.slug}` },
  ]

  return (
    <>
      <Seo {...pageSeo({ loaderData: data })} />

      <PageHero
        trail={trail}
        eyebrow={service.category}
        title={service.seo.title.replace(` | ${business.name}`, '')}
        intro={service.summary}
        estimateLabel={service.startingPrice === null ? 'Request a Quote' : 'Get a Free Estimate'}
        badges={
          <>
            <Badge tone="brand">{priceLabel(service.startingPrice)}</Badge>
            <Badge tone="neutral">{audienceLabel(service.audience)}</Badge>
            {service.emergencyEligible ? <Badge tone="accent">24/7 emergency</Badge> : null}
            {service.sameDayEligible ? <Badge tone="success">Same-day available</Badge> : null}
          </>
        }
        aside={
          <Photo
            image={service.heroImage}
            aspect="4/3"
            priority
            sizes="(min-width: 1024px) 32rem, 100vw"
            className="shadow-card"
          />
        }
      />

      <div className="container-page py-8">
        <TrustStrip compact />
      </div>

      {/* ------------------------------------------------------------ intro */}
      <Section className="pt-2 md:pt-4">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:items-start">
          <div className="max-w-3xl">
            <p className="text-lg leading-relaxed text-ink-soft">{service.intro}</p>

            {service.emergencyEligible ? (
              <EmergencyInlineBanner />
            ) : null}

            {/* --------------------------------------------------- signs */}
            <h2 id="signs" className="mt-12 text-2xl md:text-[1.75rem]">
              Signs you may need {service.shortName.toLowerCase()}
            </h2>
            <dl className="mt-6 space-y-5">
              {service.signs.map((sign) => (
                <div key={sign.title} className="rounded-card border border-line bg-white p-5 shadow-card">
                  <dt className="flex items-start gap-2.5 text-[1.0625rem] font-bold text-ink">
                    <Icon name="warning" size={19} className="mt-0.5 shrink-0 text-accent-600" />
                    {sign.title}
                  </dt>
                  <dd className="mt-2 pl-[1.9rem] leading-relaxed text-ink-soft">{sign.text}</dd>
                </div>
              ))}
            </dl>

            {/* ------------------------------------------------ what's included */}
            <h2 id="included" className="mt-14 text-2xl md:text-[1.75rem]">
              What is included
            </h2>
            <CheckList items={service.includes} className="mt-6" />

            {/* ------------------------------------------------------ process */}
            <h2 id="process" className="mt-14 text-2xl md:text-[1.75rem]">
              How the job runs
            </h2>
            <ol className="mt-6 space-y-6">
              {service.process.map((step, i) => (
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

            {/* ------------------------------------------------------ pricing */}
            <h2 id="pricing" className="mt-14 text-2xl md:text-[1.75rem]">
              What it costs
            </h2>
            <p className="mt-3 leading-relaxed text-ink-soft">
              These are the ranges we actually quote in the Austin area. Your written price is fixed
              before any work starts — if we find something unexpected, we show you a photo and price
              it separately for you to approve.
            </p>

            <div className="mt-6 overflow-hidden rounded-card border border-line">
              <table className="w-full border-collapse text-left">
                <caption className="sr-only">
                  Typical pricing for {service.name} in the Austin area
                </caption>
                <thead className="bg-surface">
                  <tr>
                    <th scope="col" className="px-5 py-3 text-sm font-bold text-ink">
                      Work
                    </th>
                    <th scope="col" className="px-5 py-3 text-sm font-bold text-ink">
                      Typical range
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {service.pricing.map((row) => (
                    <tr key={row.label} className="border-t border-line">
                      <td className="px-5 py-4 align-top">
                        <span className="block font-semibold text-ink">{row.label}</span>
                        <span className="mt-0.5 block text-sm text-muted">{row.note}</span>
                      </td>
                      <td className="whitespace-nowrap px-5 py-4 align-top font-bold text-brand-700">
                        {row.range}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {business.financing.enabled && (service.startingPrice ?? 0) >= 1000 ? (
              <p className="mt-4 flex items-start gap-2.5 rounded-card border border-brand-100 bg-brand-50 p-4 text-[0.9375rem] text-ink-soft">
                <Icon name="tag" size={18} className="mt-0.5 shrink-0 text-brand-600" />
                <span>
                  <span className="font-bold text-ink">Financing available.</span>{' '}
                  {business.financing.bullets[0]}. Pre-qualification is a soft credit check.
                </span>
              </p>
            ) : null}

            {/* ------------------------------------------------- safety notes */}
            <h2 id="safety" className="mt-14 text-2xl md:text-[1.75rem]">
              Safety notes worth knowing
            </h2>
            <ul className="mt-6 space-y-3">
              {service.safetyNotes.map((note) => (
                <li
                  key={note}
                  className="flex gap-3 rounded-card border border-accent-200 bg-accent-50 p-4"
                >
                  <Icon name="warning" size={19} className="mt-0.5 shrink-0 text-accent-700" />
                  <span className="text-[0.9375rem] leading-relaxed text-ink-soft">{note}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* ------------------------------------------------------- sidebar */}
          <aside className="lg:sticky lg:top-28">
            <LeadForm
              services={allServices}
              defaultServiceSlug={service.slug}
              compact
              title={`Request ${service.shortName.toLowerCase()}`}
              subtitle="Tell us what is going on and we will call you back with next steps."
            />

            <div className="mt-5 rounded-card border border-line bg-white p-5 shadow-card">
              <p className="text-sm font-bold uppercase tracking-wide text-muted">
                Prefer to talk it through?
              </p>
              <a
                href={business.phoneHref}
                onClick={() => trackPhone(`service_sidebar_${service.slug}`)}
                className="mt-2 block text-2xl font-extrabold text-brand-700 underline-offset-4 hover:underline"
              >
                {business.phone}
              </a>
              <p className="mt-2 text-[0.9375rem] text-muted">
                Mon–Fri 7am–6pm, Sat 8am–2pm.
                {business.emergency.enabled ? ' Emergency line answers 24/7.' : ''}
              </p>
            </div>

            <div className="mt-5 rounded-card border border-line bg-surface p-5">
              <p className="flex items-center gap-2 text-sm font-bold text-ink">
                <Icon name="map-pin" size={17} className="text-brand-600" />
                Available in
              </p>
              <ul className="mt-3 flex flex-wrap gap-x-2 gap-y-1.5 text-[0.9375rem]">
                {areaDirectory.map((area, i) => (
                  <li key={area.slug} className="flex items-center gap-2">
                    <Link
                      to={`/service-areas/${area.slug}`}
                      className="text-brand-700 underline-offset-2 hover:underline"
                    >
                      {area.label}
                    </Link>
                    {i < areaDirectory.length - 1 ? (
                      <span aria-hidden="true" className="text-line-strong">
                        ·
                      </span>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </Section>

      {/* ---------------------------------------------------------- projects */}
      {projects.length ? (
        <Section tone="surface" labelledBy="service-projects">
          <SectionHeading
            id="service-projects"
            eyebrow="Recent work"
            title={`${service.shortName} projects we have completed`}
          />
          <ul className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </ul>
        </Section>
      ) : null}

      {/* ----------------------------------------------------------- reviews */}
      <Section labelledBy="service-reviews">
        <SectionHeading
          id="service-reviews"
          eyebrow="Customer reviews"
          title="What people said about this work"
        />
        <ul className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <li key={review.id}>
              <ReviewCard review={review} />
            </li>
          ))}
        </ul>
        <Link to="/reviews" className={btn('secondary', 'md', 'mt-7')}>
          Read all {business.reviewCount} reviews
          <Icon name="arrow-right" size={17} />
        </Link>
      </Section>

      {/* --------------------------------------------------- related services */}
      {related.length ? (
        <Section tone="surface" labelledBy="related-services">
          <SectionHeading id="related-services" eyebrow="Related" title="Often needed alongside this" />
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <ServiceLinkCard key={item.slug} service={item} />
            ))}
          </ul>
        </Section>
      ) : null}

      {/* --------------------------------------------------------------- faq */}
      <Section labelledBy="service-faq">
        <div className="grid gap-9 lg:grid-cols-[1fr_1.5fr] lg:items-start">
          <SectionHeading
            id="service-faq"
            eyebrow="Questions"
            title={`${service.shortName} questions we get asked`}
            intro={
              <>
                More on our{' '}
                <Link to="/faq" className="font-semibold text-brand-700 underline underline-offset-2">
                  full FAQ page
                </Link>
                .
              </>
            }
          />
          <FAQAccordion faqs={faqs} defaultOpenFirst />
        </div>
      </Section>

      <CTASection
        location={`service_${service.slug}`}
        headline={`Ready to sort out your ${service.shortName.toLowerCase()}?`}
        body="Free estimate, fixed price before the work starts, and a licensed electrician who explains what they found."
        estimateLabel={service.startingPrice === null ? 'Request a Quote' : 'Get a Free Estimate'}
      />
    </>
  )
}

export { ServiceDetailPage as Component }
