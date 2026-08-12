import { Link, createFileRoute } from '@tanstack/react-router'

import { AppLink } from '~/components/AppLink'
import { Icon } from '~/components/Icon'
import { Section, SectionHeading, Badge, btn } from '~/components/ui'
import { TrustStrip } from '~/components/TrustStrip'
import { ServiceGrid } from '~/components/ServiceCard'
import { EmergencyBanner } from '~/components/EmergencyBanner'
import { MetricCard, ProjectCard, ReviewCard, AreaCard } from '~/components/cards'
import { FAQAccordion } from '~/components/FAQAccordion'
import { CTASection } from '~/components/CTASection'
import { LeadForm } from '~/components/LeadForm'
import { RatingStars } from '~/components/RatingStars'

import { business, whyChooseUs } from '~/content/business'
import {
  getAreaCards,
  getFaqs,
  getFeaturedProjectCards,
  getFeaturedReviews,
  getFeaturedServiceCards,
  getService,
  getServiceOptions,
} from '~/content'
import { seo } from '~/lib/seo'
import { trackPhone } from '~/lib/analytics'

export const Route = createFileRoute('/')({
  loader: async () => {
    const [featuredServices, allServices, projects, reviews, areas, faqs] = await Promise.all([
      getFeaturedServiceCards(6),
      getServiceOptions(),
      getFeaturedProjectCards(3),
      getFeaturedReviews(3),
      getAreaCards(),
      getFaqs({ featured: true, limit: 5 }),
    ])

    const reviewServices = await Promise.all(reviews.map((r) => getService(r.serviceSlug)))

    return {
      featuredServices,
      serviceOptions: allServices,
      serviceCount: allServices.length,
      projects,
      reviews: reviews.map((review, i) => ({ review, serviceName: reviewServices[i]?.shortName })),
      areas,
      faqs,
    }
  },
  head: () =>
    seo({
      title: `Licensed Electricians in ${business.address.city}, ${business.address.state} — Done Right, Done Safely`,
      description: business.seo.defaultDescription,
      path: '/',
    }),
  component: HomePage,
})

const COMMON_PROBLEMS = [
  {
    icon: 'breaker',
    title: 'A breaker that keeps tripping',
    text: 'The breaker is reacting to something — overload, a damaged conductor, or an arc. We measure the circuit under your real load and fix the cause instead of swapping the breaker.',
    href: '/blog/why-does-my-breaker-keep-tripping',
    linkLabel: 'What causes it',
  },
  {
    icon: 'bulb',
    title: 'Lights flickering across the house',
    text: 'One fixture flickering is usually a dimmer. Every light dimming when the AC starts points at the service — a loose lug or a failing neutral, which can damage everything plugged in.',
    href: '/blog/why-are-my-lights-flickering',
    linkLabel: 'When to worry',
  },
  {
    icon: 'outlet',
    title: 'A warm outlet or switch plate',
    text: 'Devices should be room temperature. Warmth means resistance where there should be none — an early-stage arcing fault that gets worse, not better. Stop using it and call.',
    href: '/services/emergency-electrical-repair',
    linkLabel: 'Get it checked',
  },
  {
    icon: 'panel',
    title: 'A full panel with nowhere to add',
    text: 'When every slot is doubled up with tandem breakers, there is no safe way to add a circuit for an EV charger or a heat pump. That is a panel problem, not a breaker problem.',
    href: '/services/electrical-panel-upgrades',
    linkLabel: 'Panel upgrades',
  },
] as const

function HomePage() {
  const { featuredServices, serviceOptions, serviceCount, projects, reviews, areas, faqs } =
    Route.useLoaderData()

  return (
    <>
      {/* ------------------------------------------------------------- hero */}
      <section className="border-b border-line bg-gradient-to-b from-surface to-white">
        <div className="container-page py-10 md:py-16">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:items-start lg:gap-14">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3 py-1.5 text-sm font-semibold text-brand-700">
                <Icon name="map-pin" size={15} />
                Locally owned in {business.address.city} since {business.founded}
              </span>

              <h1 className="mt-5 text-[2.125rem] leading-[1.1] md:text-[3.25rem]">
                Reliable electricians in {business.address.city} — done right, done safely.
              </h1>

              <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">
                Residential and commercial electrical work from licensed electricians who diagnose
                before they quote. Panel upgrades, EV chargers, rewiring, lighting and 24/7 emergency
                repair — with the price agreed before anything starts.
              </p>

              <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                {[
                  `${business.license.number} — licensed & insured`,
                  'Upfront pricing, no hourly surprises',
                  'Same-day slots held every weekday',
                  `${business.warranty.split('.')[0]}`,
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-[0.9375rem] text-ink-soft">
                    <Icon name="check-circle" size={19} className="mt-0.5 shrink-0 text-brand-600" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link to="/request-estimate" className={btn('primary', 'lg', 'text-[1.0625rem]')}>
                  Get a Free Estimate
                </Link>
                <a
                  href={business.phoneHref}
                  onClick={() => trackPhone('home_hero')}
                  className={btn('secondary', 'lg', 'text-[1.0625rem]')}
                >
                  <Icon name="phone" size={19} />
                  {business.phone}
                </a>
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-line pt-6">
                <div className="flex items-center gap-2.5">
                  <RatingStars rating={business.rating} size={19} />
                  <span className="text-[0.9375rem] text-ink-soft">
                    <span className="font-bold text-ink">{business.rating}</span> from{' '}
                    <Link to="/reviews" className="font-semibold text-brand-700 underline underline-offset-2">
                      {business.reviewCount} reviews
                    </Link>
                  </span>
                </div>
                {business.emergency.enabled ? (
                  <span className="flex items-center gap-2 text-[0.9375rem] font-semibold text-ink-soft">
                    <span className="relative flex h-2 w-2" aria-hidden="true">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
                    </span>
                    {business.emergency.availabilityMessage}
                  </span>
                ) : null}
              </div>
            </div>

            <LeadForm
              services={serviceOptions}
              source="estimate_form"
              title="Request your free estimate"
              subtitle="Two minutes now, a call back within the hour during business hours."
              className="lg:sticky lg:top-28"
            />
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ trust strip */}
      <div className="container-page -mt-px py-10 md:py-12">
        <TrustStrip />
      </div>

      {/* --------------------------------------------------------- services */}
      <Section tone="surface" labelledBy="services-heading">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            id="services-heading"
            eyebrow="What we do"
            title="Electrical services for homes and businesses"
            intro="From a single outlet to a full service upgrade. Every job is quoted before it starts, permitted where required, and backed by our workmanship warranty."
          />
          <Link to="/services" className={btn('secondary', 'md', 'shrink-0')}>
            All {serviceCount} services
            <Icon name="arrow-right" size={17} />
          </Link>
        </div>

        <ServiceGrid services={featuredServices} className="mt-9" />
      </Section>

      {/* -------------------------------------------------------- emergency */}
      <EmergencyBanner />

      {/* ---------------------------------------------------- why choose us */}
      <Section labelledBy="why-heading">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-start">
          <div>
            <SectionHeading
              id="why-heading"
              eyebrow="Why homeowners call us back"
              title="We would rather explain the work than sell you the work"
              intro="There are plenty of electricians in Austin. Here is what actually makes the difference on your job."
            />

            <dl className="mt-8 space-y-7">
              {whyChooseUs.map((item) => (
                <div key={item.title} className="flex gap-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-600">
                    <Icon name="check" size={20} />
                  </span>
                  <div>
                    <dt className="text-[1.0625rem] font-bold text-ink">{item.title}</dt>
                    <dd className="mt-1.5 leading-relaxed text-ink-soft">{item.text}</dd>
                  </div>
                </div>
              ))}
            </dl>

            <Link to="/about" className={btn('secondary', 'md', 'mt-8')}>
              More about our company
              <Icon name="arrow-right" size={17} />
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <MetricCard
              value={`${business.yearsInBusiness}`}
              label="Years in business"
              detail={`Serving ${business.address.city} since ${business.founded}`}
            />
            <MetricCard
              value={`${(business.projectsCompleted / 1000).toFixed(1)}k+`}
              label="Jobs completed"
              detail="Residential and commercial"
            />
            <MetricCard
              value={business.rating.toFixed(1)}
              label="Average rating"
              detail={`Across ${business.reviewCount} verified reviews`}
            />
            <MetricCard
              value={`${areas.length}`}
              label="Cities served"
              detail="Travis, Williamson and Hays counties"
            />

            <div className="rounded-card border border-brand-100 bg-brand-50 p-5 sm:col-span-2">
              <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-brand-700">
                <Icon name="badge" size={17} />
                Our guarantee
              </p>
              <p className="mt-2.5 leading-relaxed text-ink-soft">{business.warranty}</p>
              <p className="mt-3 text-[0.9375rem] text-ink-soft">{business.license.insuranceText}</p>
            </div>
          </div>
        </div>
      </Section>

      {/* --------------------------------------------------------- projects */}
      <Section tone="surface" labelledBy="projects-heading">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            id="projects-heading"
            eyebrow="Recent work"
            title="Jobs we finished this year"
            intro="Real projects with the constraints they came with — a closing date, a newborn in the house, an equipment package that changed twice."
          />
          <Link to="/projects" className={btn('secondary', 'md', 'shrink-0')}>
            View all projects
            <Icon name="arrow-right" size={17} />
          </Link>
        </div>

        <ul className="mt-9 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </ul>
      </Section>

      {/* ------------------------------------------------------------ areas */}
      <Section labelledBy="areas-heading">
        <SectionHeading
          id="areas-heading"
          eyebrow="Where we work"
          title={`Serving ${business.address.city} and the surrounding Hill Country`}
          intro="We keep our service area tight on purpose. Everywhere below is close enough that same-day repair calls are a normal part of the schedule."
        />

        <ul className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {areas.map((area) => (
            <AreaCard key={area.slug} area={area} />
          ))}
        </ul>

        <p className="mt-7 text-[0.9375rem] text-muted">
          Not on the list?{' '}
          <a href={business.phoneHref} onClick={() => trackPhone('home_areas')} className="font-semibold text-brand-700 underline underline-offset-2">
            Call {business.phone}
          </a>{' '}
          — if we cannot get to you, we will tell you who can.
        </p>
      </Section>

      {/* -------------------------------------------------------- testimonials */}
      <Section tone="surface" labelledBy="reviews-heading">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            id="reviews-heading"
            eyebrow="What customers say"
            title="Reviewed by your neighbours"
            intro={
              <span className="flex flex-wrap items-center gap-2.5">
                <RatingStars rating={business.rating} size={19} />
                <span>
                  <span className="font-bold text-ink">{business.rating} out of 5</span> from{' '}
                  {business.reviewCount} reviews across Google, Facebook and Nextdoor.
                </span>
              </span>
            }
          />
          <Link to="/reviews" className={btn('secondary', 'md', 'shrink-0')}>
            Read all reviews
            <Icon name="arrow-right" size={17} />
          </Link>
        </div>

        <ul className="mt-9 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map(({ review, serviceName }) => (
            <li key={review.id}>
              <ReviewCard review={review} serviceName={serviceName} />
            </li>
          ))}
        </ul>
      </Section>

      {/* ------------------------------------------------- common problems */}
      <Section labelledBy="problems-heading">
        <SectionHeading
          id="problems-heading"
          eyebrow="Electrical safety"
          title="Four things worth taking seriously in an older home"
          intro="Most electrical problems announce themselves before they become expensive. These are the ones we wish people called about sooner."
        />

        <ul className="mt-9 grid gap-4 md:grid-cols-2">
          {COMMON_PROBLEMS.map((problem) => (
            <li key={problem.title}>
              <div className="flex h-full gap-4 rounded-card border border-line bg-white p-5 shadow-card">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-accent-50 text-accent-700">
                  <Icon name={problem.icon} size={22} />
                </span>
                <div>
                  <h3 className="text-[1.0625rem] font-bold text-ink">{problem.title}</h3>
                  <p className="mt-2 leading-relaxed text-ink-soft">{problem.text}</p>
                  <AppLink
                    to={problem.href}
                    className="mt-3 inline-flex items-center gap-1.5 text-[0.9375rem] font-semibold text-brand-700 underline-offset-4 hover:underline"
                  >
                    {problem.linkLabel}
                    <Icon name="arrow-right" size={16} />
                  </AppLink>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      {/* -------------------------------------------------------- financing */}
      {business.financing.enabled ? (
        <Section tone="surface" labelledBy="financing-heading">
          <div className="grid gap-8 rounded-panel border border-line bg-white p-6 shadow-card md:p-9 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div>
              <Badge tone="brand">Financing available</Badge>
              <h2 id="financing-heading" className="mt-3.5 text-2xl leading-tight md:text-[1.75rem]">
                {business.financing.headline}
              </h2>
              <p className="mt-3 max-w-xl leading-relaxed text-ink-soft">{business.financing.body}</p>
              <Link to="/request-estimate" className={btn('primary', 'md', 'mt-6')}>
                Check what you qualify for
              </Link>
            </div>

            <ul className="space-y-3 rounded-card bg-surface p-5">
              {business.financing.bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-2.5 text-[0.9375rem] text-ink-soft">
                  <Icon name="check-circle" size={19} className="mt-0.5 shrink-0 text-brand-600" />
                  {bullet}
                </li>
              ))}
            </ul>
          </div>
        </Section>
      ) : null}

      {/* -------------------------------------------------------- faq preview */}
      <Section labelledBy="faq-heading">
        <div className="grid gap-9 lg:grid-cols-[1fr_1.5fr] lg:items-start">
          <SectionHeading
            id="faq-heading"
            eyebrow="Common questions"
            title="Answers before you call"
            intro={
              <>
                The questions we get most, answered plainly.{' '}
                <Link to="/faq" className="font-semibold text-brand-700 underline underline-offset-2">
                  See all {'>'}30 questions
                </Link>
                .
              </>
            }
          />
          <FAQAccordion faqs={faqs} defaultOpenFirst />
        </div>
      </Section>

      {/* -------------------------------------------------------- final CTA */}
      <CTASection location="home_final" />
    </>
  )
}
