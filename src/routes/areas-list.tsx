import { useRouteData } from '~/lib/router'
import { Seo } from '~/components/Seo'

import { Icon } from '~/components/Icon'
import { PageHero } from '~/components/PageHero'
import { Section, SectionHeading } from '~/components/ui'
import { AreaCard } from '~/components/cards'
import { MapSection } from '~/components/MapSection'
import { CTASection } from '~/components/CTASection'

import { getAreaCards } from '~/content'
import { business } from '~/content/business'
import { seo } from '~/lib/seo'
import { breadcrumbSchema } from '~/lib/schema'
import { trackPhone } from '~/lib/analytics'

const TRAIL = [
  { label: 'Home', href: '/' },
  { label: 'Service Areas', href: '/service-areas' },
]

export const loader = async () => ({ areas: await getAreaCards() })

const pageSeo = () =>
  seo({
    title: `Electrician Service Areas — ${business.address.city} & Central Texas`,
    description: `Licensed electricians serving ${business.serviceAreaSummary}. Same-day repair slots, 24/7 emergency response and full permit handling across Travis, Williamson and Hays counties.`,
    path: '/service-areas',
    schema: breadcrumbSchema(TRAIL),
  })

function ServiceAreasPage() {
  const { areas } = useRouteData<typeof loader>()
  const allZips = areas.flatMap((a) => a.zips)

  return (
    <>
      <Seo {...pageSeo()} />

      <PageHero
        trail={TRAIL}
        eyebrow="Where we work"
        title={`Electricians serving ${business.address.city} and Central Texas`}
        intro={
          <>
            We keep the service area deliberately tight. Everywhere on this page is close enough to
            the shop on Burnet Road that same-day repair calls are a normal part of the schedule
            rather than a favour.
          </>
        }
      />

      <Section labelledBy="areas-heading">
        <SectionHeading
          id="areas-heading"
          eyebrow={`${areas.length} cities · ${allZips.length} ZIP codes`}
          title="Cities we cover"
          intro="Each area page covers what we see most in that housing stock, local response times and the projects we have completed nearby."
        />

        <ul className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {areas.map((area) => (
            <AreaCard key={area.slug} area={area} />
          ))}
        </ul>
      </Section>

      <Section tone="surface" labelledBy="zips-heading">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          <div>
            <SectionHeading
              id="zips-heading"
              eyebrow="Coverage detail"
              title="ZIP codes we serve"
              intro="If your ZIP is not listed, call anyway. We take work slightly outside this area when the schedule allows, and if we cannot get to you we will tell you who can."
            />

            <div className="mt-8 space-y-5">
              {areas.map((area) => (
                <div key={area.slug} className="border-b border-line pb-5 last:border-0">
                  <p className="font-bold text-ink">
                    {area.city}, {area.state}{' '}
                    <span className="font-normal text-muted">· {area.county}</span>
                  </p>
                  <p className="mt-1.5 text-[0.9375rem] text-ink-soft">{area.zips.join(' · ')}</p>
                  <p className="mt-1.5 flex items-center gap-1.5 text-sm text-muted">
                    <Icon name="clock" size={15} className="text-brand-600" />
                    {area.driveTime}
                  </p>
                </div>
              ))}
            </div>

            <p className="mt-6 text-[0.9375rem] text-muted">
              Not sure?{' '}
              <a
                href={business.phoneHref}
                onClick={() => trackPhone('service_areas_zip')}
                className="font-semibold text-brand-700 underline underline-offset-2"
              >
                Call {business.phone}
              </a>{' '}
              and we will check in thirty seconds.
            </p>
          </div>

          <div className="space-y-5 lg:sticky lg:top-28">
            <MapSection />

            <div className="rounded-card border border-line bg-white p-6 shadow-card">
              <h3 className="flex items-center gap-2 text-lg font-bold text-ink">
                <Icon name="bolt-alert" size={20} className="text-accent-600" />
                Emergency coverage
              </h3>
              <p className="mt-2.5 leading-relaxed text-ink-soft">
                {business.emergency.responseTime}
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {business.emergency.areas.map((city) => (
                  <li
                    key={city}
                    className="rounded-full border border-line bg-surface px-3 py-1 text-sm font-semibold text-ink-soft"
                  >
                    {city}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      <CTASection
        location="service_areas_final"
        headline="Working in your neighbourhood this week"
        body="Tell us where you are and what is going on. If we cover your area — and we probably do — we can usually be there sooner than you expect."
      />
    </>
  )
}

export { ServiceAreasPage as Component }
