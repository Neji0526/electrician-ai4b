import { Link } from 'react-router'
import { useRouteData } from '~/lib/router'
import { Seo } from '~/components/Seo'

import { Icon } from '~/components/Icon'
import { Breadcrumbs } from '~/components/Breadcrumbs'
import { Section, SectionHeading, btn } from '~/components/ui'
import { FAQAccordion } from '~/components/FAQAccordion'
import { ReviewCard } from '~/components/cards'
import { TrustStrip } from '~/components/TrustStrip'

import { getFaqs, getReviewsForService, getService } from '~/content'
import { business } from '~/content/business'
import { areaDirectory } from '~/content/directory'
import { seo } from '~/lib/seo'
import { breadcrumbSchema, faqSchema, serviceSchema } from '~/lib/schema'
import { trackPhone } from '~/lib/analytics'

const TRAIL = [
  { label: 'Home', href: '/' },
  { label: 'Emergency Electrician', href: '/emergency-electrician' },
]

const SCENARIOS = [
  {
    icon: 'warning',
    title: 'Burning smell or smoke',
    now: 'Shut off the main breaker if you can reach it safely. Get everyone out if you see smoke.',
    why: 'That smell is insulation cooking on an overloaded or loose connection. It does not resolve on its own.',
  },
  {
    icon: 'bolt-alert',
    title: 'Sparking outlet or switch',
    now: 'Do not touch it. Turn off the breaker feeding that room and keep people away from it.',
    why: 'Repeated sparking is an arcing fault. Arcs reach thousands of degrees and are a leading cause of house fires.',
  },
  {
    icon: 'panel',
    title: 'Panel is warm, buzzing, or scorched',
    now: 'Do not open the panel. Shut off the main if the panel door is cool enough to touch safely.',
    why: 'Heat at the panel means a failing bus connection or breaker. This is the single most urgent electrical condition in a house.',
  },
  {
    icon: 'bulb',
    title: 'Half the house lost power, no breaker tripped',
    now: 'Unplug sensitive electronics and appliances on the affected side immediately.',
    why: 'That pattern usually means a lost neutral. It can push 170+ volts into 120-volt equipment and destroy everything plugged in.',
  },
  {
    icon: 'wire',
    title: 'Storm damage to the service or mast',
    now: 'Stay at least 30 feet away from any downed line. Call 911 and the utility, then call us.',
    why: 'The mast and meter base are your responsibility; the utility will not reconnect until they are rebuilt.',
  },
  {
    icon: 'breaker',
    title: 'A breaker trips instantly, every time',
    now: 'Stop resetting it. Leave that circuit off.',
    why: 'An instant trip means a dead short. Repeated resets into a short are how a fault becomes a fire.',
  },
  {
    icon: 'outlet',
    title: 'Water reaching outlets or equipment',
    now: 'Do not stand in water. Shut off power at the main if you can reach it from a dry position.',
    why: 'Energised equipment in water is an electrocution risk to anyone who walks into the room.',
  },
  {
    icon: 'surge',
    title: 'Exposed or damaged wiring',
    now: 'Turn off the circuit and keep children and pets out of the area.',
    why: 'Damaged insulation means live copper is exposed to whatever touches it next.',
  },
] as const

export const loader = async () => {
  const [service, faqs, reviews] = await Promise.all([
    getService('emergency-electrical-repair'),
    getFaqs({ category: 'Emergency Service' }),
    getReviewsForService('emergency-electrical-repair', 3),
  ])
  return { service, faqs, reviews }
}

type RouteData = Awaited<ReturnType<typeof loader>>

const pageSeo = ({ loaderData }: { loaderData: RouteData }) =>
  seo({
    title: `24/7 Emergency Electrician in ${business.address.city}, ${business.address.state}`,
    description: `Sparking outlet, burning smell, hot panel or sudden power loss in ${business.address.city}? Licensed emergency electricians answer 24/7 with 60–90 minute typical on-site response.`,
    path: '/emergency-electrician',
    schema: [
      breadcrumbSchema(TRAIL),
      ...(loaderData?.service ? [serviceSchema(loaderData.service)] : []),
      ...(loaderData?.faqs ? [faqSchema(loaderData.faqs)] : []),
    ],
  })

function EmergencyPage() {
  const data = useRouteData<typeof loader>()
  const { faqs, reviews } = data

  return (
    <>
      <Seo {...pageSeo({ loaderData: data })} />

      {/* ------------------------------------------------------- hero (dark) */}
      <section className="bg-ink text-white">
        <div className="container-page py-8 md:py-12">
          <Breadcrumbs trail={TRAIL} tone="light" className="mb-6" />

          <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-start">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-accent-500/15 px-3 py-1.5 text-sm font-bold text-accent-300 ring-1 ring-accent-500/30">
                <span className="relative flex h-2 w-2" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-400 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-400" />
                </span>
                Available right now — {business.emergency.availabilityMessage}
              </span>

              <h1 className="mt-5 text-[2.125rem] leading-[1.12] text-white md:text-[3rem]">
                24/7 emergency electricians in {business.address.city}
              </h1>

              <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-300">
                A licensed electrician answers the phone — not an answering service. Before we
                dispatch, we tell you what to shut off and what not to touch.
              </p>

              {/* The phone number is never behind a modal or a form. */}
              <a
                href={business.emergencyPhoneHref}
                onClick={() => trackPhone('emergency_page_hero', true)}
                className="mt-7 inline-flex w-full items-center justify-center gap-3 rounded-btn bg-accent-500 px-7 py-5 text-2xl font-extrabold text-accent-950 transition-colors hover:bg-accent-400 sm:w-auto md:text-3xl"
              >
                <Icon name="phone" size={28} />
                {business.emergencyPhone}
              </a>

              <p className="mt-3 text-[0.9375rem] text-slate-400">
                Standard line: {business.phone} · After-hours diagnostic $149, credited to the repair
              </p>
            </div>

            <div className="rounded-panel border border-white/12 bg-white/[0.06] p-6">
              <p className="text-sm font-bold uppercase tracking-wider text-accent-300">
                Right now, before we arrive
              </p>
              <ol className="mt-4 space-y-4">
                {[
                  'If there is fire, smoke, or water on live equipment — call 911 first.',
                  'Shut off the breaker feeding the affected area, or the main if you are unsure.',
                  'Unplug appliances and electronics on that circuit.',
                  'Do not reset a breaker that trips again immediately.',
                  'Keep everyone away from the outlet, panel or wiring involved.',
                ].map((step, i) => (
                  <li key={step} className="flex gap-3">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-accent-500 text-sm font-bold text-accent-950">
                      {i + 1}
                    </span>
                    <span className="pt-0.5 text-[0.9375rem] leading-relaxed text-slate-200">
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ availability */}
      <section className="border-b border-line bg-surface">
        <div className="container-page py-7">
          <div className="grid gap-5 md:grid-cols-3">
            <div className="flex items-start gap-3">
              <Icon name="clock" size={22} className="mt-0.5 shrink-0 text-brand-600" />
              <p className="text-[0.9375rem] text-ink-soft">
                <span className="block font-bold text-ink">Typical response</span>
                60–90 minutes on site across the Austin area
              </p>
            </div>
            <div className="flex items-start gap-3">
              <Icon name="users" size={22} className="mt-0.5 shrink-0 text-brand-600" />
              <p className="text-[0.9375rem] text-ink-soft">
                <span className="block font-bold text-ink">Who answers</span>
                A licensed electrician, day or night
              </p>
            </div>
            <div className="flex items-start gap-3">
              <Icon name="wrench" size={22} className="mt-0.5 shrink-0 text-brand-600" />
              <p className="text-[0.9375rem] text-ink-soft">
                <span className="block font-bold text-ink">Stocked trucks</span>
                Breakers, receptacles, lugs and service parts on board
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- scenarios */}
      <Section labelledBy="scenarios-heading">
        <SectionHeading
          id="scenarios-heading"
          eyebrow="Is this an emergency?"
          title="Eight situations that should not wait until morning"
          intro="If any of these describe what is happening, call now. Each one has a first step you can take safely while we are on the way."
        />

        <ul className="mt-9 grid gap-4 md:grid-cols-2">
          {SCENARIOS.map((scenario) => (
            <li key={scenario.title}>
              <div className="flex h-full flex-col rounded-card border border-line bg-white p-5 shadow-card">
                <div className="flex items-start gap-3">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-accent-50 text-accent-700">
                    <Icon name={scenario.icon} size={22} />
                  </span>
                  <h3 className="pt-2 text-[1.0625rem] font-bold text-ink">{scenario.title}</h3>
                </div>

                <div className="mt-4 rounded-lg border-l-[3px] border-accent-400 bg-accent-50 px-3.5 py-2.5">
                  <p className="text-xs font-bold uppercase tracking-wide text-accent-800">
                    Do this now
                  </p>
                  <p className="mt-1 text-[0.9375rem] leading-relaxed text-ink-soft">
                    {scenario.now}
                  </p>
                </div>

                <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">{scenario.why}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-9 flex flex-col items-start gap-4 rounded-panel border border-line bg-surface p-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[1.0625rem] text-ink-soft">
            <span className="font-bold text-ink">Not sure whether it counts?</span> Call and describe
            it. We will tell you honestly whether it can wait until morning.
          </p>
          <a
            href={business.emergencyPhoneHref}
            onClick={() => trackPhone('emergency_page_scenarios', true)}
            className={btn('emergency', 'lg', 'shrink-0')}
          >
            <Icon name="phone" size={19} />
            {business.emergencyPhone}
          </a>
        </div>
      </Section>

      {/* ----------------------------------------------------- what happens */}
      <Section tone="surface" labelledBy="what-happens">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-start">
          <div>
            <SectionHeading
              id="what-happens"
              eyebrow="After you call"
              title="What actually happens next"
            />
            <ol className="mt-8 space-y-6">
              {[
                {
                  title: 'We stabilise the situation on the phone',
                  text: 'Before anything else, we walk you through shutting off the right circuit and tell you what not to touch. This is why a licensed electrician answers rather than a call centre.',
                },
                {
                  title: 'You get a name and a real ETA',
                  text: 'Not a four-hour window. You get the electrician’s name and an arrival time, and a text when they are on the way.',
                },
                {
                  title: 'We diagnose, then make safe',
                  text: 'Thermal imaging on the panel, load readings, circuit tracing. We isolate the hazard first so the house is safe tonight.',
                },
                {
                  title: 'We show you the price before repairing',
                  text: 'Written price, photos of what we found, and your approval before we go further. Emergency pricing is published, not improvised.',
                },
                {
                  title: 'We repair and re-test under load',
                  text: 'Most repairs finish on the first visit. If a part or a utility disconnect is needed, we make safe and return with it.',
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
            <div className="rounded-card border border-line bg-white p-6 shadow-card">
              <h3 className="flex items-center gap-2 text-lg font-bold text-ink">
                <Icon name="map-pin" size={20} className="text-brand-600" />
                Emergency coverage area
              </h3>
              <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-ink-soft">
                {business.emergency.responseTime}
              </p>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {areaDirectory.map((area) => (
                  <li key={area.slug}>
                    <Link
                      to={`/service-areas/${area.slug}`}
                      className="flex items-center justify-between gap-2 rounded-lg border border-line px-3 py-2 text-[0.9375rem] transition-colors hover:border-brand-200 hover:bg-brand-50/50"
                    >
                      <span className="font-semibold text-ink">{area.label}</span>
                      <Icon name="chevron-right" size={16} className="text-line-strong" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-card border border-line bg-white p-6 shadow-card">
              <h3 className="text-lg font-bold text-ink">Emergency pricing</h3>
              <dl className="mt-4 space-y-3">
                {[
                  ['After-hours diagnostic', '$149', 'Credited toward the repair'],
                  ['Breaker replacement', '$185 – $340', 'Depends on breaker type'],
                  ['Burned receptacle repair', '$210 – $450', 'Includes damaged wire replacement'],
                  ['Service or mast repair', '$900 – $2,800', 'Includes utility coordination'],
                ].map(([label, price, note]) => (
                  <div key={label} className="flex items-start justify-between gap-4 border-b border-line pb-3 last:border-0">
                    <dt>
                      <span className="block font-semibold text-ink">{label}</span>
                      <span className="text-sm text-muted">{note}</span>
                    </dt>
                    <dd className="whitespace-nowrap font-bold text-brand-700">{price}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 text-sm text-muted">
                We do not price by how worried you sound. Every repair is quoted in writing before we
                start.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <div className="container-page py-10">
        <TrustStrip />
      </div>

      {/* ---------------------------------------------------------- reviews */}
      <Section tone="surface" labelledBy="emergency-reviews">
        <SectionHeading
          id="emergency-reviews"
          eyebrow="After-hours calls"
          title="People we have helped at 2am"
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
      <Section labelledBy="emergency-faq">
        <div className="grid gap-9 lg:grid-cols-[1fr_1.5fr] lg:items-start">
          <SectionHeading
            id="emergency-faq"
            eyebrow="Emergency FAQ"
            title="What people ask when they call at night"
          />
          <FAQAccordion faqs={faqs} defaultOpenFirst />
        </div>
      </Section>

      {/* --------------------------------------------------------- final CTA */}
      <section className="bg-ink text-white">
        <div className="container-page py-14 text-center md:py-16">
          <h2 className="text-2xl leading-tight text-white md:text-[2.125rem]">
            If it is happening right now, call. Do not fill in a form.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[1.0625rem] leading-relaxed text-slate-300">
            {business.emergency.bannerText}
          </p>
          <a
            href={business.emergencyPhoneHref}
            onClick={() => trackPhone('emergency_page_final', true)}
            className="mt-8 inline-flex items-center justify-center gap-3 rounded-btn bg-accent-500 px-8 py-5 text-2xl font-extrabold text-accent-950 transition-colors hover:bg-accent-400 md:text-3xl"
          >
            <Icon name="phone" size={28} />
            {business.emergencyPhone}
          </a>
          <p className="mt-5 text-[0.9375rem] text-slate-400">
            {business.license.label} · Insured · Answering 24 hours a day, every day of the year
          </p>
        </div>
      </section>
    </>
  )
}

export { EmergencyPage as Component }
