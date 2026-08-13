import { Seo } from '~/components/Seo'

import { PageHero } from '~/components/PageHero'
import { Section } from '~/components/ui'
import { business } from '~/content/business'
import { seo } from '~/lib/seo'
import { breadcrumbSchema } from '~/lib/schema'

const TRAIL = [
  { label: 'Home', href: '/' },
  { label: 'Terms of Service', href: '/terms' },
]

const UPDATED = 'January 15, 2026'

const pageSeo = () =>
  seo({
    title: 'Terms of Service',
    description: `Terms covering estimates, pricing, scheduling, permits, payment and the workmanship warranty offered by ${business.legalName}.`,
    path: '/terms',
    schema: breadcrumbSchema(TRAIL),
  })

function TermsPage() {
  return (
    <>
      <Seo {...pageSeo()} />

      <PageHero
        trail={TRAIL}
        title="Terms of service"
        intro={`Last updated ${UPDATED}. These terms cover how we quote, schedule, charge for and warrant our work.`}
        showActions={false}
      />

      <Section>
        <div className="prose-hce max-w-3xl">
          <h2>Who we are</h2>
          <p>
            {business.legalName}, a Texas limited liability company operating under{' '}
            {business.license.label}, with its shop at {business.address.street},{' '}
            {business.address.city}, {business.address.state} {business.address.zip}.
          </p>

          <h2>Estimates</h2>
          <p>
            Estimates for planned work are free and include the site visit and any load calculation
            required. Estimates are valid for 30 days, after which material pricing may have changed.
          </p>
          <p>
            Diagnostic visits — where the purpose of the visit is to find the cause of a fault — are
            charged at $89 during business hours or $149 after hours. That fee is credited in full
            against the repair if you proceed with us.
          </p>

          <h2>Pricing and changes to scope</h2>
          <p>
            Residential work is priced per job, not hourly. The price you approve is the price you
            pay, regardless of how long the work takes. Commercial service work is charged hourly at
            the published rate with a one-hour minimum.
          </p>
          <p>
            If, during the work, we find a condition that could not reasonably have been identified
            beforehand — damaged conductors inside a wall, an unpermitted circuit, a buried junction
            box — we will stop, document it with photographs, and provide a separate written price.
            No additional work is performed and no additional charge is made without your approval.
          </p>

          <h2>Scheduling and access</h2>
          <p>
            We provide a two-hour arrival window and will contact you if we are running outside it.
            An adult over 18 must be present for the duration of the work, and we need safe access to
            the panel, the work area and, where applicable, the attic or crawl space.
          </p>
          <p>
            Emergency calls take priority over scheduled non-urgent work. If your appointment is
            delayed for that reason we will tell you as soon as we know.
          </p>

          <h2>Cancellation</h2>
          <p>
            You may cancel or reschedule at any time before the electrician is dispatched at no
            charge. For scheduled installation work cancelled after materials have been ordered
            specifically for your job, restocking costs may apply and will be quoted before they are
            charged.
          </p>

          <h2>Permits and inspections</h2>
          <p>
            Where a permit is required by the authority having jurisdiction, we file it, meet the
            inspector, and provide you with the closed permit. We do not perform permit-required work
            without a permit under any circumstances. If an inspection identifies a correction to our
            work, we make that correction and re-inspect at our cost.
          </p>

          <h2>Payment</h2>
          <p>
            Payment is due on completion unless otherwise agreed in writing. We accept cash, check,
            all major cards without surcharge, and ACH. On projects over $5,000 a deposit is taken to
            cover materials, with the balance due on completion. Balances more than 30 days overdue
            accrue interest at 1.5% per month.
          </p>

          <h2>Workmanship warranty</h2>
          <p>
            We warrant our workmanship for eight years from completion, covering the labor on every
            repair and installation we perform. If work we performed fails within that period we
            will return and correct it at no charge.
          </p>
          <p>The warranty covers our workmanship. It does not cover:</p>
          <ul>
            <li>Materials, which carry the manufacturer’s own warranty — we will file the claim for you</li>
            <li>Damage caused by others working on the same system after us</li>
            <li>Damage from storms, floods, lightning, rodents, or utility-side faults</li>
            <li>Pre-existing conditions we identified in writing and you elected not to address</li>
            <li>Equipment supplied by you rather than by us</li>
          </ul>
          <p>
            The workmanship warranty attaches to the property rather than the owner and transfers on
            sale.
          </p>

          <h2>Customer-supplied materials</h2>
          <p>
            We will install fixtures and equipment you supply, but we cannot warrant them and we
            cannot be responsible for delays or additional visits caused by items that are damaged,
            incomplete, or unsuitable for the application. Any device that is not listed for the
            installation will not be installed.
          </p>

          <h2>Limitation of liability</h2>
          <p>
            Our liability for any claim arising out of the work is limited to the amount paid for
            that work, except where the law does not permit that limitation. We carry $2M in general
            liability cover and workers’ compensation, and a certificate is available on request
            before work begins.
          </p>

          <h2>Website content</h2>
          <p>
            The guides and pricing ranges on this website are general information about typical
            conditions in the Austin area. They are not a quote, and they are not a substitute for
            having a licensed electrician look at your specific installation.
          </p>

          <h2>Disputes</h2>
          <p>
            If something is wrong, call the office and ask for the owner. We would far rather put
            something right than argue about it. These terms are governed by the laws of the State of
            Texas, and any dispute that cannot be resolved directly will be heard in Travis County.
          </p>

          <h2>Contact</h2>
          <p>
            <a href={business.phoneHref}>{business.phone}</a> ·{' '}
            <a href={`mailto:${business.email}`}>{business.email}</a>
          </p>
        </div>
      </Section>
    </>
  )
}

export { TermsPage as Component }
