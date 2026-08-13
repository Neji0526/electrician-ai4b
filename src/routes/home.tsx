import { Link } from 'react-router'
import { useRouteData } from '~/lib/router'
import { Seo } from '~/components/Seo'

import { AppLink } from '~/components/AppLink'
import { Icon } from '~/components/Icon'
import { Section, btn } from '~/components/ui'
import { TrustStrip } from '~/components/TrustStrip'
import { FAQAccordion } from '~/components/FAQAccordion'
import { LeadForm } from '~/components/LeadForm'
import { RatingStars } from '~/components/RatingStars'
import { Photo } from '~/components/Photo'

import { business, whyChooseUsPoints } from '~/content/business'
import {
  getFaqs,
  getProjectCards,
  getReviews,
  getServiceCardsBySlug,
  getServiceOptions,
} from '~/content'
import { seo } from '~/lib/seo'
import { trackEstimate, trackPhone } from '~/lib/analytics'
import type { Faq, ProjectCardData, Review, ServiceCardData, ServiceOption } from '~/content/types'

/** The six services the homepage leads with, in design order. */
const HOME_SERVICES = [
  'electrical-panel-upgrades',
  'ev-charger-installation',
  'whole-home-rewiring',
  'lighting-installation',
  'ceiling-fan-installation',
  'surge-protection',
]

/**
 * Short card copy for the homepage grid. The service pages carry the full
 * summaries — these are the two-line versions the design calls for, plus the
 * shortened titles ("Wiring & Rewiring" rather than "Whole-Home Rewiring").
 */
const SERVICE_BLURBS: Record<string, { title: string; text: string }> = {
  'electrical-panel-upgrades': {
    title: 'Electrical Panel Upgrades',
    text: 'Upgrade your panel for more power, safety, and peace of mind.',
  },
  'ev-charger-installation': {
    title: 'EV Charger Installation',
    text: 'We install Level 2 EV chargers at home or for your business.',
  },
  'whole-home-rewiring': {
    title: 'Wiring & Rewiring',
    text: 'New construction, remodels, and whole-home rewiring.',
  },
  'lighting-installation': {
    title: 'Lighting Installation',
    text: 'Indoor, outdoor, landscape, and security lighting.',
  },
  'ceiling-fan-installation': {
    title: 'Ceiling Fans & Outlets',
    text: 'Add comfort and convenience with professional installs.',
  },
  'surge-protection': {
    title: 'Surge Protection',
    text: 'Protect your home and electronics from power surges.',
  },
}

const EMERGENCY_LIST = [
  'Power outages & tripped breakers',
  'Sparks, burning smells, or hot outlets',
  'Electrical panel issues',
  'Flickering lights',
  'Exposed or damaged wiring',
  'And more…',
]

const HERO_BADGES = [
  { icon: 'shield', label: 'Licensed & Insured' },
  { icon: 'tag', label: 'Upfront Pricing' },
  { icon: 'badge', label: '100% Satisfaction' },
]

const TIPS = [
  {
    icon: 'calendar',
    title: 'Check for outdated wiring',
    text: 'Old wiring can be a fire hazard.',
    href: '/blog/signs-your-home-needs-rewiring',
  },
  {
    icon: 'shield',
    title: 'Use GFCI outlets in wet areas',
    text: 'Protect your home in kitchens, bathrooms, and outdoors.',
    href: '/blog/gfci-vs-afci-what-is-the-difference',
  },
  {
    icon: 'outlet',
    title: 'Don’t overload outlets',
    text: 'Too many devices can cause overheating and trips.',
    href: '/blog/why-does-my-breaker-keep-tripping',
  },
  {
    icon: 'clock',
    title: 'Schedule regular inspections',
    text: 'Catch small issues before they turn into big problems.',
    href: '/services/electrical-inspections',
  },
]

/** The four questions in the design's "Answers before you call" accordion. */
const HOME_FAQ_IDS = ['f-01', 'f-11', 'f-82', 'f-80']

export const loader = async () => {
  const [services, serviceOptions, projects, reviews, allFaqs] = await Promise.all([
    getServiceCardsBySlug(HOME_SERVICES),
    getServiceOptions(),
    getProjectCards({ limit: 4 }),
    getReviews({ limit: 3 }),
    getFaqs(),
  ])

  const faqs = HOME_FAQ_IDS.map((id) => allFaqs.find((f) => f.id === id)).filter(
    (f): f is Faq => Boolean(f),
  )

  return { services, serviceOptions, projects, reviews, faqs }
}

const pageSeo = () =>
  seo({
    title: `Reliable Electricians in ${business.address.city} — Done Right, Done Safely`,
    description: business.seo.defaultDescription,
    path: '/',
  })

function HomePage() {
  const { services, serviceOptions, projects, reviews, faqs } = useRouteData<typeof loader>()

  return (
    <>
      <Seo {...pageSeo()} />

      <HeroSection serviceOptions={serviceOptions} />

      <div className="border-b border-line bg-white">
        <div className="container-page py-8">
          <TrustStrip variant="row" />
        </div>
      </div>

      <ServicesSection services={services} />
      <EmergencyBand />
      <WhyChooseUs />
      <RecentProjects projects={projects} />
      <ReviewsAndTips reviews={reviews} />
      <FinancingAndFaq faqs={faqs} />
      <FinalCta />
    </>
  )
}

/* ============================================================================
   Hero
   ========================================================================== */

function HeroSection({ serviceOptions }: { serviceOptions: ServiceOption[] }) {
  return (
    <section className="relative overflow-hidden bg-surface">
      {/* Photograph bleeds off the right edge, behind the estimate card. */}
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[46%] lg:block">
        <Photo
          image={{
            src: '/images/home/hero-house.jpg',
            alt: 'Evening exterior of an Austin home with the lighting on',
            width: 1200,
            height: 1000,
          }}
          priority
          rounded={false}
          sizes="46vw"
          className="h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/40 to-transparent" />
      </div>

      <div className="container-page relative py-10 md:py-14">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_26rem] lg:gap-12">
          {/* ------------------------------------------------------- copy */}
          <div className="max-w-xl lg:pt-4">
            <h1 className="text-[2.25rem] font-extrabold leading-[1.1] tracking-tight md:text-[3.25rem]">
              Reliable electricians in {business.address.city} —{' '}
              <span className="text-accent-500">done right,</span> done safely.
            </h1>

            <p className="mt-5 text-[1.0625rem] leading-relaxed text-ink-soft">
              Trusted electrical services for homes and businesses across {business.address.city} and
              the Hill Country. Fast, safe, and built to last.
            </p>

            <ul className="mt-7 flex flex-wrap gap-2.5">
              {HERO_BADGES.map((badge) => (
                <li
                  key={badge.label}
                  className="inline-flex items-center gap-2 rounded-btn border border-line bg-white px-3.5 py-2.5 text-sm font-semibold text-ink shadow-card"
                >
                  <Icon name={badge.icon} size={17} className="text-brand-600" />
                  {badge.label}
                </li>
              ))}
            </ul>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/request-estimate"
                onClick={() => trackEstimate('home_hero')}
                className={btn('cta', 'lg')}
              >
                Get a Free Quote
                <Icon name="arrow-right" size={18} />
              </Link>
              <a
                href={business.phoneHref}
                onClick={() => trackPhone('home_hero')}
                className={btn('secondary', 'lg')}
              >
                <Icon name="phone" size={18} />
                Call {business.phone}
              </a>
            </div>

            <p className="mt-6 flex flex-wrap items-center gap-2.5">
              <RatingStars rating={business.rating} size={18} />
              <span className="text-[0.9375rem] text-ink-soft">
                <span className="font-bold text-ink">{business.rating.toFixed(1)}</span> from{' '}
                {business.reviewCount.toLocaleString()}+ homeowners
              </span>
            </p>
          </div>

          {/* ------------------------------------------------------- form */}
          <div className="relative">
            <LeadForm
              services={serviceOptions}
              source="estimate_form"
              title="Request your free estimate"
              subtitle="Fast, easy, and no obligation."
              submitLabel="Send My Request"
              serviceLabel="What can we help you with?"
              messageLabel="Tell us more about your project"
              showMessage
              showEmergencyToggle={false}
              footerNote={
                <p className="text-center text-sm text-muted">
                  Prefer to talk now?{' '}
                  <a
                    href={business.phoneHref}
                    onClick={() => trackPhone('home_hero_form')}
                    className="font-semibold text-brand-700 underline underline-offset-2"
                  >
                    Call {business.phone}
                  </a>
                </p>
              }
            />

            {/* Satisfaction seal, overlapping the photo on wide screens. */}
            <div
              aria-hidden="true"
              className="absolute -bottom-12 -right-10 hidden h-28 w-28 place-items-center rounded-full border-2 border-accent-400 bg-brand-950 text-center xl:grid"
            >
              <span className="px-3">
                <span className="block text-lg font-extrabold leading-none text-white">100%</span>
                <span className="mt-1 block text-[0.625rem] font-semibold uppercase leading-tight tracking-wide text-accent-300">
                  Satisfaction
                  <br />
                  Guarantee
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ============================================================================
   Services
   ========================================================================== */

function ServicesSection({ services }: { services: ServiceCardData[] }) {
  return (
    <Section tone="surface" labelledBy="services-heading">
      <div className="grid gap-9 lg:grid-cols-[19rem_minmax(0,1fr)] lg:gap-12">
        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-brand-600">Our Services</p>
          <h2 id="services-heading" className="mt-3 text-[1.75rem] leading-tight md:text-[2rem]">
            Electrical services for homes and businesses
          </h2>
          <p className="mt-4 leading-relaxed text-ink-soft">
            Safe. Reliable. Code-compliant. We do it all.
          </p>
          <Link to="/services" className={btn('secondary', 'md', 'mt-7')}>
            View all services
            <Icon name="arrow-right" size={16} />
          </Link>
        </div>

        <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => {
            const blurb = SERVICE_BLURBS[service.slug]
            return (
              <li key={service.slug} className="h-full">
                <Link
                  to={`/services/${service.slug}`}
                  className="group flex h-full flex-col rounded-card border border-line bg-white p-5 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-lift"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-lg border border-line bg-surface text-brand-600 transition-colors group-hover:border-brand-200 group-hover:bg-brand-50">
                    <Icon name={service.icon} size={22} />
                  </span>
                  <h3 className="mt-4 text-[0.9375rem] font-bold leading-snug text-ink group-hover:text-brand-700">
                    {blurb?.title ?? service.shortName}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                    {blurb?.text ?? service.summary}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700">
                    Learn more
                    <Icon
                      name="arrow-right"
                      size={15}
                      className="transition-transform duration-200 group-hover:translate-x-0.5"
                    />
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </Section>
  )
}

/* ============================================================================
   Emergency band
   ========================================================================== */

function EmergencyBand() {
  if (!business.emergency.enabled) return null

  return (
    <section aria-labelledby="emergency-heading" className="bg-brand-950 text-white">
      <div className="container-page py-12 md:py-14">
        <div className="grid gap-9 lg:grid-cols-[minmax(0,1fr)_25rem] lg:items-center lg:gap-12">
          <div className="flex gap-5">
            <Icon name="bolt" size={44} className="hidden shrink-0 text-accent-400 sm:block" />
            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-brand-300">
                24/7 Emergency Electrical Services
              </p>
              <h2
                id="emergency-heading"
                className="mt-2.5 text-[1.75rem] leading-tight text-white md:text-[2rem]"
              >
                Electrical emergency in {business.address.city}?
                <br />
                We answer 24/7.
              </h2>
              <p className="mt-4 max-w-lg leading-relaxed text-brand-200">
                Power out? Sparks? Electrical issue that can’t wait? Our licensed electricians are on
                call around the clock to keep your home and family safe.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
                <a
                  href={business.emergencyPhoneHref}
                  onClick={() => trackPhone('home_emergency_band', true)}
                  className={btn('cta', 'lg')}
                >
                  <Icon name="phone" size={18} />
                  Call {business.emergencyPhone}
                </a>
                <p className="text-sm text-brand-300">We typically arrive in 60 minutes or less.</p>
              </div>
            </div>
          </div>

          <div className="rounded-panel border border-white/10 bg-white/[0.05] p-6">
            <p className="text-sm font-bold uppercase tracking-wider text-accent-300">
              Common emergencies we help with
            </p>
            <ul className="mt-4 space-y-3">
              {EMERGENCY_LIST.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-[0.9375rem] text-brand-100">
                  <Icon name="check-circle" size={18} className="mt-0.5 shrink-0 text-accent-400" />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              to="/emergency-electrician"
              className="mt-5 inline-flex items-center gap-1.5 border-t border-white/10 pt-4 text-sm font-semibold text-white underline-offset-4 hover:underline"
            >
              What to do before we arrive
              <Icon name="arrow-right" size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ============================================================================
   Why choose us + stats
   ========================================================================== */

function WhyChooseUs() {
  const stats = [
    {
      icon: 'calendar',
      value: `${business.yearsInBusiness}+`,
      label: 'Years in Austin',
      detail: 'Serving our community',
    },
    {
      icon: 'package',
      value: `${(business.projectsCompleted / 1000).toFixed(1)}k+`,
      label: 'Jobs completed',
      detail: 'Done right the first time',
    },
    {
      icon: 'star',
      value: business.rating.toFixed(1),
      label: 'Average rating',
      detail: `From ${business.reviewCount.toLocaleString()}+ reviews`,
    },
    {
      icon: 'shield',
      value: `${business.warrantyYears}`,
      label: 'Year warranty',
      detail: 'On labor for your peace of mind',
    },
  ]

  return (
    <Section labelledBy="why-heading">
      <div className="grid gap-10 lg:grid-cols-[19rem_minmax(0,1fr)] lg:gap-12">
        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-brand-600">
            Why choose {business.name}?
          </p>
          <h2 id="why-heading" className="mt-3 text-[1.75rem] leading-tight md:text-[2rem]">
            We would rather explain the work than sell you the work.
          </h2>

          <ul className="mt-6 space-y-3">
            {whyChooseUsPoints.map((point) => (
              <li key={point} className="flex items-start gap-2.5 text-[0.9375rem] text-ink-soft">
                <Icon name="check-circle" size={19} className="mt-0.5 shrink-0 text-brand-600" />
                {point}
              </li>
            ))}
          </ul>

          <Link
            to="/about"
            className="mt-6 inline-flex items-center gap-1.5 font-semibold text-brand-700 underline-offset-4 hover:underline"
          >
            Learn more about us
            <Icon name="arrow-right" size={16} />
          </Link>
        </div>

        <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <li
              key={stat.label}
              className="rounded-card border border-line bg-white p-5 text-center shadow-card"
            >
              <span className="mx-auto grid h-11 w-11 place-items-center rounded-lg border border-line bg-surface text-brand-600">
                <Icon name={stat.icon} size={22} />
              </span>
              <p className="mt-4 text-[2rem] font-extrabold leading-none tracking-tight text-ink">
                {stat.value}
              </p>
              <p className="mt-2 font-bold text-ink">{stat.label}</p>
              <p className="mt-1 text-sm leading-snug text-muted">{stat.detail}</p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}

/* ============================================================================
   Recent projects
   ========================================================================== */

function RecentProjects({ projects }: { projects: ProjectCardData[] }) {
  return (
    <Section className="pt-0 md:pt-0" labelledBy="projects-heading">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-brand-600">Recent Projects</p>
          <h2 id="projects-heading" className="mt-2.5 text-[1.75rem] leading-tight md:text-[2rem]">
            Jobs we’ve finished this year
          </h2>
        </div>
        <Link to="/projects" className={btn('secondary', 'md', 'shrink-0')}>
          View all projects
          <Icon name="arrow-right" size={16} />
        </Link>
      </div>

      <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {projects.map((project) => (
          <li key={project.slug} className="h-full">
            <Link
              to={`/projects/${project.slug}`}
              className="group flex h-full flex-col overflow-hidden rounded-card border border-line bg-white shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-lift"
            >
              <div className="relative">
                <Photo
                  image={project.after}
                  aspect="4/3"
                  rounded={false}
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                />
                <span className="absolute right-3 top-3 rounded-md bg-white/95 px-2.5 py-1 text-xs font-bold text-ink shadow-card">
                  {project.neighborhood}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-4">
                <h3 className="text-[0.9375rem] font-bold leading-snug text-ink group-hover:text-brand-700">
                  {project.title}
                </h3>
                <p className="mt-1 text-sm text-muted">
                  {project.neighborhood}, {project.city}
                </p>
                <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700">
                  View project
                  <Icon
                    name="arrow-right"
                    size={15}
                    className="transition-transform duration-200 group-hover:translate-x-0.5"
                  />
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  )
}

/* ============================================================================
   Reviews + tips
   ========================================================================== */

function ReviewsAndTips({ reviews }: { reviews: Review[] }) {
  return (
    <Section className="pt-0 md:pt-0">
      <div className="grid gap-9 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-10">
        {/* ------------------------------------------------------- reviews */}
        <div>
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-brand-600">
              Reviews from your neighbours
            </h2>
            <Link
              to="/reviews"
              className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-brand-700 underline-offset-4 hover:underline"
            >
              View all reviews
              <Icon name="arrow-right" size={15} />
            </Link>
          </div>

          <ul className="mt-4 grid gap-4 sm:grid-cols-3">
            {reviews.map((review) => (
              <li key={review.id} className="h-full">
                <figure className="flex h-full flex-col rounded-card border border-line bg-white p-4 shadow-card">
                  <RatingStars rating={review.rating} size={15} />
                  <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">
                    “{truncate(review.text, 118)}”
                  </blockquote>
                  <figcaption className="mt-4 flex items-center gap-2.5 border-t border-line pt-3.5">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand-50 text-xs font-bold text-brand-700">
                      {review.name.charAt(0)}
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-bold text-ink">
                        {review.name}
                      </span>
                      <span className="block truncate text-xs text-muted">
                        {review.city}, {business.address.state}
                      </span>
                    </span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>

        {/* ---------------------------------------------------------- tips */}
        <div>
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-brand-600">
              Tips &amp; Guides
            </h2>
            <Link
              to="/blog"
              className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-brand-700 underline-offset-4 hover:underline"
            >
              View all articles
              <Icon name="arrow-right" size={15} />
            </Link>
          </div>

          <ul className="mt-4 divide-y divide-line overflow-hidden rounded-card border border-line bg-white shadow-card">
            {TIPS.map((tip) => (
              <li key={tip.title}>
                <AppLink
                  to={tip.href}
                  className="group flex items-center gap-3 p-3.5 transition-colors hover:bg-surface"
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-line bg-surface text-brand-600">
                    <Icon name={tip.icon} size={18} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-bold text-ink group-hover:text-brand-700">
                      {tip.title}
                    </span>
                    <span className="block text-sm leading-snug text-muted">{tip.text}</span>
                  </span>
                  <Icon name="chevron-right" size={17} className="shrink-0 text-line-strong" />
                </AppLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}

function truncate(text: string, max: number) {
  if (text.length <= max) return text
  const cut = text.slice(0, max)
  return `${cut.slice(0, cut.lastIndexOf(' '))}…`
}

/* ============================================================================
   Financing + FAQ
   ========================================================================== */

function FinancingAndFaq({ faqs }: { faqs: Faq[] }) {
  return (
    <Section className="pt-0 md:pt-0">
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)]">
        {business.financing.enabled ? (
          <div className="flex flex-col justify-center rounded-card border border-line bg-surface p-6">
            <span className="grid h-11 w-11 place-items-center rounded-lg border border-line bg-white text-brand-600">
              <Icon name="wallet" size={22} />
            </span>
            <h2 className="mt-4 text-lg font-bold text-ink">Financing for your projects</h2>
            <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-muted">
              Flexible options to fit your budget.
            </p>
            <Link to="/request-estimate" className={btn('secondary', 'md', 'mt-5 self-start')}>
              Learn about financing
              <Icon name="arrow-right" size={16} />
            </Link>
          </div>
        ) : (
          <div />
        )}

        <div>
          <h2 className="text-lg font-bold text-ink">Answers before you call</h2>
          <FAQAccordion faqs={faqs} className="mt-3.5" />
          <Link
            to="/faq"
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 underline-offset-4 hover:underline"
          >
            See all questions
            <Icon name="arrow-right" size={15} />
          </Link>
        </div>
      </div>
    </Section>
  )
}

/* ============================================================================
   Final CTA — sits flush against the footer, which shares the same navy.
   ========================================================================== */

function FinalCta() {
  return (
    <section aria-labelledby="home-final-cta" className="bg-brand-950 text-white">
      <div className="container-page flex flex-col gap-6 py-10 lg:flex-row lg:items-center lg:justify-between">
        <h2
          id="home-final-cta"
          className="text-2xl font-extrabold leading-tight text-white md:text-[1.75rem]"
        >
          Need an electrician you can actually count on?
        </h2>
        <div className="flex flex-col gap-3 sm:flex-row lg:shrink-0">
          <Link
            to="/request-estimate"
            onClick={() => trackEstimate('home_final')}
            className={btn('cta', 'lg')}
          >
            Get a Free Quote
            <Icon name="arrow-right" size={18} />
          </Link>
          <a
            href={business.phoneHref}
            onClick={() => trackPhone('home_final')}
            className={btn('outline-light', 'lg')}
          >
            <Icon name="phone" size={18} />
            Call {business.phone}
          </a>
        </div>
      </div>
    </section>
  )
}

export { HomePage as Component }
