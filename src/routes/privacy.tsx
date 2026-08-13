import { Seo } from '~/components/Seo'

import { PageHero } from '~/components/PageHero'
import { Section } from '~/components/ui'
import { business } from '~/content/business'
import { seo } from '~/lib/seo'
import { breadcrumbSchema } from '~/lib/schema'

const TRAIL = [
  { label: 'Home', href: '/' },
  { label: 'Privacy Policy', href: '/privacy' },
]

const UPDATED = 'January 15, 2026'

const pageSeo = () =>
  seo({
    title: 'Privacy Policy',
    description: `How ${business.name} collects, uses and protects the information you share when requesting an estimate or contacting us.`,
    path: '/privacy',
    schema: breadcrumbSchema(TRAIL),
  })

function PrivacyPage() {
  return (
    <>
      <Seo {...pageSeo()} />

      <PageHero
        trail={TRAIL}
        title="Privacy policy"
        intro={`Last updated ${UPDATED}. This explains what we collect when you contact us, why, and what we do not do with it.`}
        showActions={false}
      />

      <Section>
        <div className="prose-hce max-w-3xl">
          <h2>What we collect</h2>
          <p>
            When you submit an estimate request or contact form we collect the information you give
            us: your name, phone number, email address, property address, the service you need, your
            description of the problem, and any photos you attach.
          </p>
          <p>
            We also collect basic technical information automatically — the pages you visit, the page
            that referred you, your approximate location from your IP address, and your browser and
            device type. This is standard web analytics and is not tied to your name.
          </p>

          <h2>Why we collect it</h2>
          <ul>
            <li>To call or message you back about the work you asked us about</li>
            <li>To schedule an appointment and route the right electrician to your address</li>
            <li>To prepare and send a written estimate</li>
            <li>To keep a service history for your property, which the warranty depends on</li>
            <li>To understand which parts of this website are useful and which are not</li>
          </ul>

          <h2>What we do not do</h2>
          <p>
            We do not sell your information. We do not share it with lead-generation networks,
            marketing lists, or other contractors. We do not add you to a mailing list because you
            asked for an estimate.
          </p>

          <h2>Who we share it with</h2>
          <p>We share information only where it is necessary to do the work you asked for:</p>
          <ul>
            <li>
              Our permitting and inspection submissions to the relevant city or county authority,
              where a permit is required
            </li>
            <li>
              Our financing partner, if — and only if — you apply for financing, and only the
              information you provide for that application
            </li>
            <li>
              Software providers who host our scheduling, invoicing and email systems, under
              contracts that restrict them to processing on our behalf
            </li>
            <li>Where we are legally required to</li>
          </ul>

          <h2>Photos you send us</h2>
          <p>
            Photos of your panel, wiring or fixtures are used to diagnose and quote the work, and
            they are kept with your job record. We sometimes use before-and-after photos on this
            website or on social media — but only with your written permission, and never with
            anything that identifies your address.
          </p>

          <h2>How long we keep it</h2>
          <p>
            Job records, including estimates and invoices, are retained for seven years for tax,
            warranty and liability reasons. Enquiries that never became a job are deleted after two
            years.
          </p>

          <h2>Text messages</h2>
          <p>
            If you give us a mobile number we may text you about your appointment — confirmations,
            arrival windows, and the name of the electrician on the way. Reply STOP to any message to
            opt out of texts; it will not affect your service.
          </p>

          <h2>Cookies and analytics</h2>
          <p>
            This site uses cookies for basic functionality and for analytics that tell us which pages
            people find useful. You can block cookies in your browser settings; the site will
            continue to work.
          </p>

          <h2>Your rights</h2>
          <p>
            You can ask us what information we hold about you, ask us to correct it, or ask us to
            delete it where we are not legally required to keep it. Email{' '}
            <a href={`mailto:${business.email}`}>{business.email}</a> or call {business.phone} and we
            will handle it within thirty days.
          </p>

          <h2>Children</h2>
          <p>
            This website is not directed at children and we do not knowingly collect information from
            anyone under 13.
          </p>

          <h2>Changes</h2>
          <p>
            If we change this policy we will update the date at the top. Material changes will be
            noted on this page.
          </p>

          <h2>Contact</h2>
          <p>
            {business.legalName}
            <br />
            {business.address.street}
            <br />
            {business.address.city}, {business.address.state} {business.address.zip}
            <br />
            <a href={business.phoneHref}>{business.phone}</a> ·{' '}
            <a href={`mailto:${business.email}`}>{business.email}</a>
          </p>
        </div>
      </Section>
    </>
  )
}

export { PrivacyPage as Component }
