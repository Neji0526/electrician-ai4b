import { useRouteData } from '~/lib/router'
import { Seo } from '~/components/Seo'

import { Icon } from '~/components/Icon'
import { PageHero } from '~/components/PageHero'
import { Section, SectionHeading } from '~/components/ui'
import { TeamCard } from '~/components/cards'
import { CTASection } from '~/components/CTASection'

import { getTeam } from '~/content'
import { business } from '~/content/business'
import { seo } from '~/lib/seo'
import { breadcrumbSchema } from '~/lib/schema'

const TRAIL = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Our Team', href: '/team' },
]

export const loader = async () => ({ team: await getTeam() })

const pageSeo = () =>
  seo({
    title: `Meet Our Electricians — ${business.name}`,
    description: `The licensed electricians, project managers and office staff at ${business.name} in Austin, TX. Licences, certifications and specialties for every member of the team.`,
    path: '/team',
    schema: breadcrumbSchema(TRAIL),
  })

function TeamPage() {
  const { team } = useRouteData<typeof loader>()
  const licensed = team.filter((m) => m.licenseInfo)
  const totalYears = team.reduce((sum, m) => sum + m.yearsExperience, 0)

  return (
    <>
      <Seo {...pageSeo()} />

      <PageHero
        trail={TRAIL}
        eyebrow="Our team"
        title="The people who will be in your house"
        intro="Every electrician here is a W-2 employee rather than a subcontractor. That is why we can tell you in advance who is coming, and why the same person can come back if something needs adjusting."
        showActions={false}
      />

      <Section className="pt-8 md:pt-10">
        <ul className="grid gap-3.5 sm:grid-cols-3">
          {[
            { value: `${team.length}`, label: 'People on the team' },
            { value: `${licensed.length}`, label: 'State-licensed electricians' },
            { value: `${totalYears}`, label: 'Combined years in the trade' },
          ].map((stat) => (
            <li
              key={stat.label}
              className="rounded-card border border-line bg-surface p-5 text-center"
            >
              <p className="text-3xl font-extrabold text-brand-700">{stat.value}</p>
              <p className="mt-1 font-semibold text-ink">{stat.label}</p>
            </li>
          ))}
        </ul>

        <ul className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member) => (
            <TeamCard key={member.slug} member={member} />
          ))}
        </ul>
      </Section>

      <Section tone="surface" labelledBy="hiring-heading">
        <div className="grid gap-8 rounded-panel border border-line bg-white p-6 shadow-card md:p-9 lg:grid-cols-[1.3fr_1fr] lg:items-center">
          <div>
            <SectionHeading
              id="hiring-heading"
              eyebrow="Working here"
              title="We hire slowly and keep people"
            />
            <p className="mt-4 leading-relaxed text-ink-soft">
              Average tenure here is over six years, which in this trade is unusual. Electricians are
              paid hourly with overtime rather than on commission, so nobody on our crew has a
              financial reason to recommend work you do not need.
            </p>
            <p className="mt-3 leading-relaxed text-ink-soft">
              We sponsor apprenticeships through Austin Community College and pay for continuing
              education and license renewals. If you are a licensed journeyman in the Austin area,
              call the office — we are usually willing to talk.
            </p>
          </div>

          <ul className="space-y-3 rounded-card bg-surface p-5">
            {[
              'W-2 employment, hourly with overtime',
              'No commission on parts or upsells',
              'Company truck and tools provided',
              'Paid continuing education and license renewal',
              'Four-year sponsored apprenticeship path',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-[0.9375rem] text-ink-soft">
                <Icon name="check-circle" size={19} className="mt-0.5 shrink-0 text-brand-600" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <CTASection
        location="team_final"
        headline="Want to know who is coming?"
        body="Ask when you book. We will tell you the electrician's name and their license number before they arrive."
      />
    </>
  )
}

export { TeamPage as Component }
