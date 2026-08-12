import { createFileRoute } from '@tanstack/react-router'

import { Icon } from '~/components/Icon'
import { PageHero } from '~/components/PageHero'
import { Section, SectionHeading } from '~/components/ui'
import { LeadForm } from '~/components/LeadForm'
import { BusinessHours } from '~/components/BusinessHours'
import { MapSection } from '~/components/MapSection'
import { TrustStrip } from '~/components/TrustStrip'
import { FAQAccordion } from '~/components/FAQAccordion'
import { AppLink } from '~/components/AppLink'

import { getFaqs, getServiceOptions } from '~/content'
import { business } from '~/content/business'
import { areaDirectory } from '~/content/directory'
import { seo } from '~/lib/seo'
import { breadcrumbSchema, localBusinessSchema } from '~/lib/schema'
import { track, trackPhone } from '~/lib/analytics'

const TRAIL = [
  { label: 'Home', href: '/' },
  { label: 'Contact', href: '/contact' },
]

export const Route = createFileRoute('/contact')({
  loader: async () => {
    const [services, faqs] = await Promise.all([
      getServiceOptions(),
      getFaqs({ category: 'Appointments & Scheduling', limit: 4 }),
    ])
    return { services, faqs }
  },
  head: () =>
    seo({
      title: `Contact ${business.name} — Austin, TX Electricians`,
      description: `Call ${business.phone}, email ${business.email}, or request a free estimate online. Licensed Austin electricians open Mon–Fri 7am–6pm with a 24/7 emergency line.`,
      path: '/contact',
      schema: [breadcrumbSchema(TRAIL), localBusinessSchema()],
    }),
  component: ContactPage,
})

function ContactPage() {
  const { services, faqs } = Route.useLoaderData()

  return (
    <>
      <PageHero
        trail={TRAIL}
        eyebrow="Contact us"
        title="Talk to a licensed electrician"
        intro="Call during business hours and you will usually get an answer in under a minute. Outside hours, the emergency line is answered by an electrician rather than a service."
        showActions={false}
      />

      <Section className="pt-8 md:pt-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
          {/* ------------------------------------------------------ details */}
          <div>
            <h2 className="text-2xl md:text-[1.75rem]">How to reach us</h2>

            <ul className="mt-6 space-y-3">
              <li>
                <a
                  href={business.phoneHref}
                  onClick={() => trackPhone('contact_page')}
                  className="flex items-start gap-4 rounded-card border border-line bg-white p-5 shadow-card transition-colors hover:border-brand-200 hover:bg-brand-50/40"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-600">
                    <Icon name="phone" size={22} />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold uppercase tracking-wide text-muted">
                      Main line
                    </span>
                    <span className="mt-0.5 block text-xl font-extrabold text-brand-700">
                      {business.phone}
                    </span>
                    <span className="mt-1 block text-[0.9375rem] text-muted">
                      Mon–Fri 7am–6pm · Sat 8am–2pm
                    </span>
                  </span>
                </a>
              </li>

              {business.emergency.enabled ? (
                <li>
                  <a
                    href={business.emergencyPhoneHref}
                    onClick={() => trackPhone('contact_page_emergency', true)}
                    className="flex items-start gap-4 rounded-card border border-accent-200 bg-accent-50 p-5 transition-colors hover:border-accent-300"
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-accent-100 text-accent-700">
                      <Icon name="bolt-alert" size={22} />
                    </span>
                    <span>
                      <span className="block text-sm font-semibold uppercase tracking-wide text-accent-800">
                        24/7 emergency line
                      </span>
                      <span className="mt-0.5 block text-xl font-extrabold text-accent-900">
                        {business.emergencyPhone}
                      </span>
                      <span className="mt-1 block text-[0.9375rem] text-accent-900/80">
                        {business.emergency.availabilityMessage}
                      </span>
                    </span>
                  </a>
                </li>
              ) : null}

              <li>
                <a
                  href={`mailto:${business.email}`}
                  onClick={() => track('email_click', { location: 'contact_page' })}
                  className="flex items-start gap-4 rounded-card border border-line bg-white p-5 shadow-card transition-colors hover:border-brand-200 hover:bg-brand-50/40"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-600">
                    <Icon name="mail" size={22} />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold uppercase tracking-wide text-muted">
                      Email
                    </span>
                    <span className="mt-0.5 block text-[1.0625rem] font-bold text-ink">
                      {business.email}
                    </span>
                    <span className="mt-1 block text-[0.9375rem] text-muted">
                      Replies within one business day
                    </span>
                  </span>
                </a>
              </li>

              <li className="flex items-start gap-4 rounded-card border border-line bg-white p-5 shadow-card">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-600">
                  <Icon name="map-pin" size={22} />
                </span>
                <span>
                  <span className="block text-sm font-semibold uppercase tracking-wide text-muted">
                    Shop address
                  </span>
                  <address className="mt-0.5 not-italic text-[1.0625rem] font-bold text-ink">
                    {business.address.street}
                    <br />
                    {business.address.city}, {business.address.state} {business.address.zip}
                  </address>
                  <a
                    href={business.directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => track('directions_click', { location: 'contact_page' })}
                    className="mt-1.5 inline-flex items-center gap-1.5 text-[0.9375rem] font-semibold text-brand-700 underline-offset-2 hover:underline"
                  >
                    Get directions
                    <Icon name="arrow-right" size={15} />
                  </a>
                </span>
              </li>
            </ul>

            <BusinessHours className="mt-6" />

            <div className="mt-6 rounded-card border border-line bg-surface p-5">
              <h3 className="flex items-center gap-2 font-bold text-ink">
                <Icon name="map-pin" size={18} className="text-brand-600" />
                Areas we cover
              </h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {areaDirectory.map((area) => (
                  <li key={area.slug}>
                    <AppLink
                      to={`/service-areas/${area.slug}`}
                      className="inline-block rounded-full border border-line-strong bg-white px-3 py-1.5 text-sm font-semibold text-ink-soft transition-colors hover:border-brand-300 hover:text-brand-700"
                    >
                      {area.label}
                    </AppLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* --------------------------------------------------------- form */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <LeadForm
              services={services}
              source="contact_form"
              title="Send us a message"
              subtitle="Prefer not to call? Tell us what is going on and we will get back to you — usually within the hour during business hours."
            />

            <TrustStrip compact className="mt-5" />
          </div>
        </div>
      </Section>

      <Section tone="surface" labelledBy="find-us">
        <SectionHeading id="find-us" eyebrow="Find us" title="Our shop on Burnet Road" />
        <MapSection className="mt-7" />
      </Section>

      <Section labelledBy="contact-faq">
        <div className="grid gap-9 lg:grid-cols-[1fr_1.5fr] lg:items-start">
          <SectionHeading
            id="contact-faq"
            eyebrow="Before you call"
            title="Scheduling questions"
            intro={
              <>
                More on the{' '}
                <AppLink to="/faq" className="font-semibold text-brand-700 underline underline-offset-2">
                  full FAQ page
                </AppLink>
                .
              </>
            }
          />
          <FAQAccordion faqs={faqs} defaultOpenFirst />
        </div>
      </Section>
    </>
  )
}
