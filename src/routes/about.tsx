import { Link } from 'react-router'
import { useRouteData } from '~/lib/router'
import { Seo } from '~/components/Seo'

import { Icon } from '~/components/Icon'
import { PageHero } from '~/components/PageHero'
import { Section, SectionHeading, btn, CheckList } from '~/components/ui'
import { MetricCard, TeamCard } from '~/components/cards'
import { TrustStrip } from '~/components/TrustStrip'
import { CTASection } from '~/components/CTASection'
import { MapSection } from '~/components/MapSection'

import { getTeam } from '~/content'
import { business, whyChooseUs } from '~/content/business'
import { areaDirectory } from '~/content/directory'
import { seo } from '~/lib/seo'
import { breadcrumbSchema, localBusinessSchema } from '~/lib/schema'

const TRAIL = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
]

const TIMELINE = [
  {
    year: '2009',
    title: 'One truck, one master electrician',
    text: 'Ray Alvarado left a commercial contractor and started taking residential service calls in central Austin out of a single van. Most of the early work was panel replacements in Allandale and Crestview — and it still is.',
  },
  {
    year: '2013',
    title: 'First employees, and a decision about subcontracting',
    text: 'We hired our first two electricians as W-2 employees rather than subs. It costs more. It is also the only way to guarantee who shows up at your door and who is accountable afterwards.',
  },
  {
    year: '2017',
    title: 'Commercial division',
    text: 'Travis Boyd joined and built the commercial side around restaurant and retail finish-outs, working nights so businesses never had to close.',
  },
  {
    year: '2021',
    title: 'February, and what it changed',
    text: 'Winter Storm Uri put us on generator installs and service repairs for months. It permanently changed how Central Texas thinks about backup power, and it is why we now do a load study before quoting any generator.',
  },
  {
    year: '2024',
    title: 'EV and load management',
    text: 'Charger installs became a weekly occurrence. We invested in metering equipment so we could run NEC 220.87 calculations from real usage data instead of pushing every customer toward a service upgrade.',
  },
  {
    year: 'Today',
    title: `${business.yearsInBusiness} years, ${business.projectsCompleted.toLocaleString()} jobs`,
    text: `Seven electricians, five trucks, and a service area we keep deliberately tight so same-day calls stay possible.`,
  },
] as const

export const loader = async () => ({ team: await getTeam() })

const pageSeo = () =>
  seo({
    title: `About ${business.name} — Licensed Austin Electricians Since ${business.founded}`,
    description: `Family-owned electrical contractor in Austin, TX. ${business.license.label}, ${business.yearsInBusiness} years in business, W-2 electricians, and a workmanship warranty that transfers with the house.`,
    path: '/about',
    schema: [breadcrumbSchema(TRAIL), localBusinessSchema()],
  })

function AboutPage() {
  const { team } = useRouteData<typeof loader>()

  return (
    <>
      <Seo {...pageSeo()} />

      <PageHero
        trail={TRAIL}
        eyebrow="About us"
        title={`A local electrical contractor, not a franchise`}
        intro={`${business.legalName} has been working in Austin homes since ${business.founded}. We are family-owned, our electricians are employees rather than subcontractors, and we still run every load calculation ourselves.`}
        showRating
      />

      <div className="container-page py-8">
        <TrustStrip />
      </div>

      {/* ------------------------------------------------------------- story */}
      <Section className="pt-4 md:pt-6">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:items-start">
          <div className="max-w-3xl">
            <SectionHeading eyebrow="Our story" title={`How we got here`} />

            <div className="prose-hce mt-6">
              <p>
                Most electrical companies in a city this size are either a one-truck operation that
                cannot answer the phone during a job, or a franchise with a call centre and a
                commission structure. We have deliberately stayed in between.
              </p>
              <p>
                That means we are big enough to keep same-day slots open, carry $2M in liability
                cover, and hold an emergency electrician on call every night — and small enough that
                the owner still runs the load calculation on your panel and the person who answers
                the phone knows the job.
              </p>
              <p>
                It also means we say no to work. We hold a limited number of builder projects at any
                one time specifically so we can hit our rough-in dates, and we keep the service area
                tight enough that a repair call in Cedar Park does not mean cancelling one in
                Crestview.
              </p>
            </div>

            <ol className="mt-10 space-y-8">
              {TIMELINE.map((entry) => (
                <li key={entry.year} className="flex gap-5">
                  <div className="flex flex-col items-center">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border-2 border-brand-200 bg-brand-50 text-sm font-extrabold text-brand-700">
                      {entry.year === 'Today' ? 'Now' : entry.year}
                    </span>
                    <span aria-hidden="true" className="mt-2 w-px flex-1 bg-line last:hidden" />
                  </div>
                  <div className="pb-2 pt-2.5">
                    <h3 className="text-[1.0625rem] font-bold text-ink">{entry.title}</h3>
                    <p className="mt-1.5 leading-relaxed text-ink-soft">{entry.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <aside className="space-y-5 lg:sticky lg:top-28">
            <div className="grid grid-cols-2 gap-4">
              <MetricCard value={`${business.yearsInBusiness}`} label="Years in business" />
              <MetricCard
                value={`${(business.projectsCompleted / 1000).toFixed(1)}k+`}
                label="Jobs completed"
              />
              <MetricCard value={business.rating.toFixed(1)} label="Average rating" />
              <MetricCard value={`${areaDirectory.length}`} label="Cities served" />
            </div>

            <div className="rounded-card border border-line bg-white p-6 shadow-card">
              <h2 className="flex items-center gap-2 text-lg font-bold text-ink">
                <Icon name="shield" size={20} className="text-brand-600" />
                Licensing & insurance
              </h2>
              <dl className="mt-4 space-y-3 text-[0.9375rem]">
                <div>
                  <dt className="font-semibold text-muted">Contractor license</dt>
                  <dd className="mt-0.5 font-bold text-ink">{business.license.number}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-muted">Insurance</dt>
                  <dd className="mt-0.5 text-ink-soft">{business.license.insuranceText}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-muted">Workmanship warranty</dt>
                  <dd className="mt-0.5 text-ink-soft">{business.warranty}</dd>
                </div>
              </dl>
              <p className="mt-4 border-t border-line pt-4 text-sm text-muted">
                Any Texas electrical license can be verified through the TDLR licence lookup. Ask us
                for the number of the electrician assigned to your job — we will give it to you.
              </p>
            </div>
          </aside>
        </div>
      </Section>

      {/* ------------------------------------------------------ how we work */}
      <Section tone="surface" labelledBy="how-we-work">
        <SectionHeading
          id="how-we-work"
          eyebrow="How we work"
          title="Four things we do differently"
          intro="None of these are unusual in themselves. Doing all four consistently is what most people are actually looking for."
        />

        <dl className="mt-9 grid gap-6 md:grid-cols-2">
          {whyChooseUs.map((item) => (
            <div key={item.title} className="rounded-card border border-line bg-white p-6 shadow-card">
              <dt className="flex items-start gap-3 text-[1.0625rem] font-bold text-ink">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-600">
                  <Icon name="check" size={19} />
                </span>
                <span className="pt-1.5">{item.title}</span>
              </dt>
              <dd className="mt-3 leading-relaxed text-ink-soft">{item.text}</dd>
            </div>
          ))}
        </dl>
      </Section>

      {/* ----------------------------------------------------------- safety */}
      <Section labelledBy="safety-heading">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-start">
          <div>
            <SectionHeading
              id="safety-heading"
              eyebrow="Safety philosophy"
              title="The rules we do not bend"
              intro="Electrical work is one of the few trades where cutting a corner does not show up for years, and then shows up as a fire. These are the ones we will not negotiate on."
            />
            <CheckList
              className="mt-7"
              items={[
                'We pull the permit when a permit is required — every time, without exception.',
                'We never install a larger breaker to stop nuisance tripping.',
                'We never extend knob-and-tube with modern cable.',
                'We de-energise before we work. No hot work on residential circuits.',
                'Every electrician wears arc-flash-rated PPE for panel and service work.',
                'We replace, rather than reuse, any conductor with heat-damaged insulation.',
                'If a repair is beyond what we can do safely, we say so and refer it.',
              ]}
            />
          </div>

          <div className="space-y-5">
            <div className="rounded-card border border-brand-100 bg-brand-50 p-6">
              <h3 className="flex items-center gap-2 text-lg font-bold text-ink">
                <Icon name="badge" size={20} className="text-brand-600" />
                Our workmanship guarantee
              </h3>
              <p className="mt-3 leading-relaxed text-ink-soft">{business.warranty}</p>
              <p className="mt-3 text-[0.9375rem] text-ink-soft">
                The warranty follows the property rather than the owner, so it transfers when you
                sell. Together with the closed permits, it is a useful thing to hand a buyer.
              </p>
            </div>

            <div className="rounded-card border border-line bg-white p-6 shadow-card">
              <h3 className="flex items-center gap-2 text-lg font-bold text-ink">
                <Icon name="users" size={20} className="text-brand-600" />
                Community
              </h3>
              <p className="mt-3 leading-relaxed text-ink-soft">
                We do a handful of no-charge safety inspections each year for older residents through
                a local neighbourhood association, and we sponsor the electrical apprenticeship
                program at Austin Community College — two of our current electricians came through
                it.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ------------------------------------------------------------- team */}
      <Section tone="surface" labelledBy="team-heading">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            id="team-heading"
            eyebrow="Who you will meet"
            title="The people who show up"
            intro="Every electrician here is a W-2 employee, licensed by the State of Texas, background-checked and drug-tested."
          />
          <Link to="/team" className={btn('secondary', 'md', 'shrink-0')}>
            Full team page
            <Icon name="arrow-right" size={17} />
          </Link>
        </div>

        <ul className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {team.slice(0, 4).map((member) => (
            <TeamCard key={member.slug} member={member} />
          ))}
        </ul>
      </Section>

      {/* ------------------------------------------------------------- shop */}
      <Section labelledBy="visit-heading">
        <SectionHeading
          id="visit-heading"
          eyebrow="Where we are"
          title="Our shop on Burnet Road"
          intro="We are not a virtual office with a mailbox. The shop is real, the trucks are parked there, and you are welcome to come by during business hours."
        />
        <MapSection className="mt-8" />
      </Section>

      <CTASection location="about_final" />
    </>
  )
}

export { AboutPage as Component }
