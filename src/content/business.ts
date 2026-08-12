import type { Business } from './types.ts'

/**
 * Everything the "Business Settings" screen of a CMS would own.
 * Swap this object for a `business_settings` row and the whole site follows.
 */
export const business: Business = {
  name: 'Hill Country Electric',
  legalName: 'Hill Country Electric Co., LLC',
  tagline: 'Licensed electricians serving Austin and the surrounding Hill Country',
  phone: '(512) 555-0142',
  phoneHref: 'tel:+15125550142',
  emergencyPhone: '(512) 555-0199',
  emergencyPhoneHref: 'tel:+15125550199',
  email: 'office@hillcountryelectric.com',
  address: {
    street: '4212 Burnet Road, Suite B',
    city: 'Austin',
    state: 'TX',
    stateFull: 'Texas',
    zip: '78756',
    country: 'US',
  },
  geo: { lat: 30.3169, lng: -97.7397 },
  mapEmbedQuery: '4212+Burnet+Road+Austin+TX+78756',
  directionsUrl:
    'https://www.google.com/maps/dir/?api=1&destination=4212+Burnet+Road+Austin+TX+78756',
  hours: [
    { day: 1, label: 'Monday', open: '7:00 AM', close: '6:00 PM' },
    { day: 2, label: 'Tuesday', open: '7:00 AM', close: '6:00 PM' },
    { day: 3, label: 'Wednesday', open: '7:00 AM', close: '6:00 PM' },
    { day: 4, label: 'Thursday', open: '7:00 AM', close: '6:00 PM' },
    { day: 5, label: 'Friday', open: '7:00 AM', close: '6:00 PM' },
    { day: 6, label: 'Saturday', open: '8:00 AM', close: '2:00 PM', note: 'Scheduled work only' },
    { day: 0, label: 'Sunday', open: null, close: null, note: 'Emergency calls only' },
  ],
  emergency: {
    enabled: true,
    availabilityMessage: '24/7 emergency electricians on call',
    responseTime: 'Most Austin-area emergency calls are answered by a licensed electrician within 15 minutes, with a truck on site in 60–90 minutes.',
    bannerText: 'Sparking outlet, burning smell, or no power? Call now — we answer 24/7.',
    areas: [
      'Austin',
      'Round Rock',
      'Cedar Park',
      'Pflugerville',
      'Georgetown',
      'Lakeway',
      'Kyle',
      'Buda',
    ],
  },
  license: {
    number: 'TECL 34291',
    label: 'Texas Electrical Contractor License TECL 34291',
    insuranceText:
      'Carrying $2M general liability and full workers’ compensation coverage. Certificates available on request before work begins.',
  },
  founded: 2009,
  yearsInBusiness: new Date().getFullYear() - 2009,
  projectsCompleted: 9400,
  rating: 4.9,
  reviewCount: 412,
  serviceAreaSummary: 'Austin, Round Rock, Cedar Park, Georgetown, Pflugerville, Lakeway, Kyle & Buda',
  warranty: 'Every repair carries a 2-year workmanship warranty. Panels, service upgrades and rewires carry 5 years.',
  financing: {
    enabled: true,
    headline: 'Financing for panel upgrades and rewires',
    body: 'Bigger electrical work rarely happens on a convenient schedule. We work with a local lender so a panel replacement or whole-home rewire can be paid monthly instead of all at once.',
    bullets: [
      '0% for 12 months on approved credit',
      'Terms up to 84 months on projects over $3,000',
      'Soft credit check for pre-qualification — no effect on your score',
      'Approval decision usually the same day, before we schedule the work',
    ],
  },
  social: [
    { label: 'Google Business Profile', href: 'https://www.google.com/maps' },
    { label: 'Facebook', href: 'https://www.facebook.com' },
    { label: 'Instagram', href: 'https://www.instagram.com' },
    { label: 'Nextdoor', href: 'https://nextdoor.com' },
  ],
  seo: {
    titleSuffix: 'Hill Country Electric | Austin, TX',
    defaultTitle: 'Licensed Electricians in Austin, TX | Hill Country Electric',
    defaultDescription:
      'Licensed, insured Austin electricians for panel upgrades, EV chargers, rewiring, lighting and 24/7 emergency repair. Upfront pricing and a 2-year workmanship warranty.',
    siteUrl: 'https://www.hillcountryelectric.com',
    ogImage: '/images/og-default.svg',
  },
}

export const trustPoints = [
  {
    icon: 'shield',
    title: 'Licensed & insured',
    text: `${business.license.number} — $2M liability, workers’ comp on every crew`,
  },
  {
    icon: 'tag',
    title: 'Upfront pricing',
    text: 'You approve the price before any work starts. No hourly surprises.',
  },
  {
    icon: 'clock',
    title: 'Same-day service',
    text: 'Same-day slots held open every weekday for repairs that cannot wait.',
  },
  {
    icon: 'badge',
    title: 'Workmanship guaranteed',
    text: '2-year warranty on repairs, 5 years on panels and rewires.',
  },
] as const

export const whyChooseUs = [
  {
    title: 'Master electricians, not subcontractors',
    text: 'Every truck that pulls up is our truck. Our electricians are W-2 employees, background-checked, drug-tested, and working under a master electrician who has been in Austin homes since 2009.',
  },
  {
    title: 'We diagnose before we quote',
    text: 'Flickering lights and tripping breakers are symptoms, not diagnoses. We test the circuit, find the actual fault, then show you what we found and what it costs to fix before we touch anything.',
  },
  {
    title: 'We pull the permits',
    text: 'Panel swaps, service upgrades and rewires need a permit and an inspection in the City of Austin. We file it, meet the inspector, and hand you the closed permit. Skipping that step is what makes a house hard to sell later.',
  },
  {
    title: 'We clean up',
    text: 'Drop cloths, shoe covers, and a shop vac. Attic insulation stays in the attic, drywall dust stays off your floors, and old panels leave in our truck.',
  },
] as const

export const financingHighlights = business.financing
