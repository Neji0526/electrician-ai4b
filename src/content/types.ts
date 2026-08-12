/**
 * Content types for the public site.
 *
 * This project is frontend-only: everything below is served from typed modules in
 * `src/content`. The access helpers in `src/content/index.ts` are intentionally async
 * and shaped like a data layer, so each one can later be swapped for a Supabase query
 * without touching a single route or component.
 */

/** A block of long-form editorial content. Rendered by `<Prose />`. */
export type Block =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string; id?: string }
  | { type: 'h3'; text: string; id?: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  | { type: 'note'; title?: string; text: string }
  | { type: 'warning'; title?: string; text: string }
  | { type: 'quote'; text: string; attribution?: string }
  | { type: 'table'; head: string[]; rows: string[][] }

export type Audience = 'residential' | 'commercial' | 'both'

export interface Image {
  src: string
  alt: string
  width: number
  height: number
}

export interface BusinessHours {
  /** 0 = Sunday. */
  day: number
  label: string
  open: string | null
  close: string | null
  note?: string
}

export interface Business {
  name: string
  legalName: string
  tagline: string
  phone: string
  phoneHref: string
  emergencyPhone: string
  emergencyPhoneHref: string
  email: string
  address: {
    street: string
    city: string
    state: string
    stateFull: string
    zip: string
    country: string
  }
  geo: { lat: number; lng: number }
  mapEmbedQuery: string
  directionsUrl: string
  hours: BusinessHours[]
  emergency: {
    enabled: boolean
    availabilityMessage: string
    responseTime: string
    bannerText: string
    areas: string[]
  }
  license: {
    number: string
    label: string
    insuranceText: string
  }
  founded: number
  yearsInBusiness: number
  projectsCompleted: number
  rating: number
  reviewCount: number
  serviceAreaSummary: string
  warranty: string
  /** Labor warranty length, shown in the homepage stats block. */
  warrantyYears: number
  financing: {
    enabled: boolean
    headline: string
    body: string
    bullets: string[]
  }
  social: { label: string; href: string }[]
  seo: {
    titleSuffix: string
    defaultTitle: string
    defaultDescription: string
    siteUrl: string
    ogImage: string
  }
}

export interface Service {
  slug: string
  name: string
  /** Short label used in cards, filters and breadcrumbs. */
  shortName: string
  category: string
  icon: string
  audience: Audience
  summary: string
  intro: string
  heroImage: Image
  startingPrice: number | null
  priceNote: string
  emergencyEligible: boolean
  sameDayEligible: boolean
  featured: boolean
  sortOrder: number
  signs: { title: string; text: string }[]
  includes: string[]
  process: { title: string; text: string }[]
  pricing: { label: string; range: string; note: string }[]
  safetyNotes: string[]
  related: string[]
  seo: { title: string; description: string }
}

/**
 * The subset of a Service that cards and grids render.
 *
 * Loaders return this rather than the full record: whatever a loader returns is
 * serialised into the SSR HTML for hydration, and shipping every service's
 * signs/process/pricing/safety copy to render a grid of cards roughly triples
 * the page weight for no benefit.
 */
export type ServiceCardData = Pick<
  Service,
  | 'slug'
  | 'name'
  | 'shortName'
  | 'category'
  | 'icon'
  | 'audience'
  | 'summary'
  | 'startingPrice'
  | 'priceNote'
  | 'emergencyEligible'
  | 'sameDayEligible'
  | 'featured'
  | 'sortOrder'
>

/** Just enough to render a `<select>` of services on the lead forms. */
export type ServiceOption = Pick<Service, 'slug' | 'name'>

export interface ServiceArea {
  slug: string
  city: string
  state: string
  county: string
  zips: string[]
  neighborhoods: string[]
  driveTime: string
  responseTime: string
  intro: Block[]
  featuredServices: string[]
  localNote: string
  population: string
  housingNote: string
  seo: { title: string; description: string }
}

/** Area fields a card renders — omits the long local intro prose. */
export type AreaCardData = Omit<ServiceArea, 'intro' | 'seo'>

export interface Project {
  slug: string
  title: string
  serviceSlug: string
  city: string
  neighborhood: string
  completedOn: string
  costRange: string
  durationLabel: string
  featured: boolean
  summary: string
  scope: string[]
  challenge: string
  solution: string
  before: Image
  after: Image
  permitNote?: string
}

export interface Review {
  id: string
  name: string
  city: string
  rating: number
  date: string
  source: 'Google' | 'Facebook' | 'Yelp' | 'Nextdoor' | 'Direct'
  serviceSlug: string
  text: string
  featured: boolean
  response?: string
}

export interface Faq {
  id: string
  question: string
  answer: string
  category: string
  serviceSlug?: string
  sortOrder: number
  /** Shown in the homepage FAQ preview. */
  featured?: boolean
}

export interface TeamMember {
  slug: string
  name: string
  role: string
  photo: Image
  bio: string
  certifications: string[]
  licenseInfo?: string
  yearsExperience: number
  specialties: string[]
}

/** Project fields a card renders — omits the long challenge/solution/scope copy. */
export type ProjectCardData = Pick<
  Project,
  | 'slug'
  | 'title'
  | 'serviceSlug'
  | 'city'
  | 'neighborhood'
  | 'completedOn'
  | 'costRange'
  | 'featured'
  | 'summary'
  | 'before'
  | 'after'
>

export interface Post {
  slug: string
  title: string
  category: string
  excerpt: string
  author: string
  publishedOn: string
  updatedOn?: string
  readingMinutes: number
  featured: boolean
  relatedService?: string
  image: Image
  body: Block[]
  seo: { title: string; description: string }
}

/** Post fields a card renders — omits the article body entirely. */
export type PostCardData = Omit<Post, 'body' | 'seo'>
