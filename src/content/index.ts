/**
 * Content access layer.
 *
 * Routes never import the raw arrays — they call these helpers from SSR loaders.
 * Every function is async and returns plain serialisable data, so replacing the
 * bodies with Supabase queries is a one-file change.
 *
 * The record modules are pulled in with dynamic `import()` rather than a static
 * one. Loaders run on the client during client-side navigation, so a static
 * import would put every service, project, review, FAQ and article body into
 * the chunk the browser downloads before first paint — roughly 100KB the first
 * page never needs. Dynamic imports move them to their own chunk that is only
 * fetched when a loader actually runs in the browser. SSR is unaffected: the
 * server awaits these on the first request and Node caches the modules.
 *
 * (Once these are Supabase queries the dynamic imports go away entirely — the
 * data will arrive over the wire and never be bundled at all.)
 */
import { business, trustPoints, whyChooseUs } from './business'
import { serviceCategories, faqCategories, postCategories } from './taxonomy'

const load = {
  services: async () => (await import('./services')).services,
  areas: async () => (await import('./areas')).areas,
  projects: async () => (await import('./projects')).projects,
  reviews: async () => (await import('./reviews')).reviews,
  faqs: async () => (await import('./faqs')).faqs,
  team: async () => (await import('./team')).team,
  posts: async () => (await import('./posts')).posts,
}
import type {
  AreaCardData,
  Faq,
  Post,
  Project,
  Review,
  PostCardData,
  ProjectCardData,
  Service,
  ServiceArea,
  ServiceCardData,
  ServiceOption,
  TeamMember,
} from './types'

export * from './types'
export { business, trustPoints, whyChooseUs, serviceCategories, faqCategories, postCategories }

const byDateDesc = (a: string, b: string) => (a < b ? 1 : a > b ? -1 : 0)

/* ---------------------------------------------------------------- business */

export async function getBusiness() {
  return business
}

/* ---------------------------------------------------------------- services */

export async function getServices(): Promise<Service[]> {
  const services = await load.services()
  return [...services].sort((a, b) => a.sortOrder - b.sortOrder)
}

export async function getFeaturedServices(limit = 6): Promise<Service[]> {
  const all = await getServices()
  const featured = all.filter((s) => s.featured)
  return [...featured, ...all.filter((s) => !s.featured)].slice(0, limit)
}

export async function getService(slug: string): Promise<Service | undefined> {
  return (await load.services()).find((s) => s.slug === slug)
}

export async function getRelatedServices(slug: string): Promise<ServiceCardData[]> {
  const service = await getService(slug)
  if (!service) return []
  const services = await load.services()
  return service.related
    .map((s) => services.find((x) => x.slug === s))
    .filter((s): s is Service => Boolean(s))
    .map(toCard)
}

/* ------------------------------------------------- lightweight projections */

/**
 * Card and option projections. Loader payloads are serialised into the SSR
 * HTML, so pages that only render cards should never pull the full record.
 */
function toCard(service: Service): ServiceCardData {
  return {
    slug: service.slug,
    name: service.name,
    shortName: service.shortName,
    category: service.category,
    icon: service.icon,
    audience: service.audience,
    summary: service.summary,
    startingPrice: service.startingPrice,
    priceNote: service.priceNote,
    emergencyEligible: service.emergencyEligible,
    sameDayEligible: service.sameDayEligible,
    featured: service.featured,
    sortOrder: service.sortOrder,
  }
}

export async function getServiceCards(): Promise<ServiceCardData[]> {
  return (await getServices()).map(toCard)
}

export async function getFeaturedServiceCards(limit = 6): Promise<ServiceCardData[]> {
  return (await getFeaturedServices(limit)).map(toCard)
}

export async function getServiceCardsBySlug(slugs: string[]): Promise<ServiceCardData[]> {
  const services = await load.services()
  return slugs
    .map((slug) => services.find((s) => s.slug === slug))
    .filter((s): s is Service => Boolean(s))
    .map(toCard)
}

/** For the `<select>` on every lead form. */
export async function getServiceOptions(): Promise<ServiceOption[]> {
  return (await getServices()).map((s) => ({ slug: s.slug, name: s.name }))
}

/** Slug + label pairs for the HTML sitemap, without any body content. */
export async function getSitemapIndex() {
  const [services, areas, projects, posts] = await Promise.all([
    load.services(),
    load.areas(),
    load.projects(),
    load.posts(),
  ])
  return {
    services: services
      .slice()
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map((s) => ({ slug: s.slug, name: s.name })),
    areas: areas.map((a) => ({ slug: a.slug, city: a.city, state: a.state })),
    projects: [...projects]
      .sort((a, b) => byDateDesc(a.completedOn, b.completedOn))
      .map((p) => ({ slug: p.slug, title: p.title })),
    posts: [...posts]
      .sort((a, b) => byDateDesc(a.publishedOn, b.publishedOn))
      .map((p) => ({ slug: p.slug, title: p.title })),
  }
}

/* ------------------------------------------------------------ service areas */

export async function getAreas(): Promise<ServiceArea[]> {
  return load.areas()
}

export async function getArea(slug: string): Promise<ServiceArea | undefined> {
  return (await load.areas()).find((a) => a.slug === slug)
}

/** Card projection — drops the multi-paragraph local intro. */
export async function getAreaCards(): Promise<AreaCardData[]> {
  return (await load.areas()).map(({ intro: _i, seo: _s, ...card }) => card)
}

/* ---------------------------------------------------------------- projects */

export async function getProjects(filter?: {
  serviceSlug?: string
  city?: string
  limit?: number
}): Promise<Project[]> {
  const projects = await load.projects()
  let list = [...projects].sort((a, b) => byDateDesc(a.completedOn, b.completedOn))
  if (filter?.serviceSlug) list = list.filter((p) => p.serviceSlug === filter.serviceSlug)
  if (filter?.city) list = list.filter((p) => p.city === filter.city)
  if (filter?.limit) list = list.slice(0, filter.limit)
  return list
}

function toProjectCard(project: Project): ProjectCardData {
  const { challenge: _c, solution: _s, scope: _sc, durationLabel: _d, permitNote: _p, ...card } = project
  return card
}

export async function getProjectCards(filter?: {
  serviceSlug?: string
  city?: string
  limit?: number
}): Promise<ProjectCardData[]> {
  return (await getProjects(filter)).map(toProjectCard)
}

export async function getFeaturedProjectCards(limit = 3): Promise<ProjectCardData[]> {
  const all = await getProjectCards()
  const featured = all.filter((p) => p.featured)
  return [...featured, ...all.filter((p) => !p.featured)].slice(0, limit)
}

export async function getProject(slug: string): Promise<Project | undefined> {
  return (await load.projects()).find((p) => p.slug === slug)
}

/* ----------------------------------------------------------------- reviews */

export async function getReviews(filter?: {
  serviceSlug?: string
  city?: string
  limit?: number
}): Promise<Review[]> {
  const reviews = await load.reviews()
  let list = [...reviews].sort((a, b) => byDateDesc(a.date, b.date))
  if (filter?.serviceSlug) list = list.filter((r) => r.serviceSlug === filter.serviceSlug)
  if (filter?.city) list = list.filter((r) => r.city === filter.city)
  if (filter?.limit) list = list.slice(0, filter.limit)
  return list
}

export async function getFeaturedReviews(limit = 3): Promise<Review[]> {
  const all = await getReviews()
  const featured = all.filter((r) => r.featured)
  return [...featured, ...all.filter((r) => !r.featured)].slice(0, limit)
}

/**
 * Reviews for a service page: prefer reviews about that exact service, then
 * top up with strong general reviews so a page is never left with one card.
 */
export async function getReviewsForService(serviceSlug: string, limit = 3): Promise<Review[]> {
  const exact = await getReviews({ serviceSlug })
  if (exact.length >= limit) return exact.slice(0, limit)
  const fill = (await getFeaturedReviews(limit * 2)).filter((r) => r.serviceSlug !== serviceSlug)
  return [...exact, ...fill].slice(0, limit)
}

export async function getReviewStats() {
  const reviews = await load.reviews()
  const distribution = [5, 4, 3, 2, 1].map((stars) => ({
    stars,
    count: reviews.filter((r) => r.rating === stars).length,
  }))
  return {
    rating: business.rating,
    reviewCount: business.reviewCount,
    published: reviews.length,
    distribution,
  }
}

/* -------------------------------------------------------------------- faqs */

export async function getFaqs(filter?: {
  category?: string
  serviceSlug?: string
  featured?: boolean
  limit?: number
}): Promise<Faq[]> {
  const faqs = await load.faqs()
  let list = [...faqs]
  if (filter?.category) list = list.filter((f) => f.category === filter.category)
  if (filter?.serviceSlug) list = list.filter((f) => f.serviceSlug === filter.serviceSlug)
  if (filter?.featured) list = list.filter((f) => f.featured)
  list.sort((a, b) => a.sortOrder - b.sortOrder)
  if (filter?.limit) list = list.slice(0, filter.limit)
  return list
}

export async function getFaqsGrouped(): Promise<{ category: string; items: Faq[] }[]> {
  const faqs = await load.faqs()
  return faqCategories
    .map((category) => ({
      category,
      items: faqs.filter((f) => f.category === category).sort((a, b) => a.sortOrder - b.sortOrder),
    }))
    .filter((g) => g.items.length > 0)
}

/**
 * FAQs shown on a service detail page. Explicit service FAQs first, then the
 * most relevant category questions.
 */
export async function getFaqsForService(serviceSlug: string, limit = 5): Promise<Faq[]> {
  const [service, faqs] = await Promise.all([getService(serviceSlug), load.faqs()])
  const direct = faqs.filter((f) => f.serviceSlug === serviceSlug)
  const categoryMap: Record<string, string> = {
    'Panels & Power': 'Panels & Breakers',
    'Repairs & Troubleshooting': 'Electrical Safety',
    Installations: 'Installations',
    'Safety & Inspections': 'Electrical Safety',
    Commercial: 'Commercial Work',
  }
  const category = service ? categoryMap[service.category] : undefined
  const byCategory = category ? faqs.filter((f) => f.category === category) : []
  const pricing = faqs.filter((f) => f.category === 'Pricing & Estimates').slice(0, 2)
  const seen = new Set<string>()
  return [...direct, ...byCategory, ...pricing]
    .filter((f) => (seen.has(f.id) ? false : (seen.add(f.id), true)))
    .slice(0, limit)
}

/* -------------------------------------------------------------------- team */

export async function getTeam(): Promise<TeamMember[]> {
  return load.team()
}

/* ------------------------------------------------------------------- posts */

export async function getPosts(filter?: {
  category?: string
  relatedService?: string
  limit?: number
}): Promise<Post[]> {
  const posts = await load.posts()
  let list = [...posts].sort((a, b) => byDateDesc(a.publishedOn, b.publishedOn))
  if (filter?.category) list = list.filter((p) => p.category === filter.category)
  if (filter?.relatedService) list = list.filter((p) => p.relatedService === filter.relatedService)
  if (filter?.limit) list = list.slice(0, filter.limit)
  return list
}

export async function getPost(slug: string): Promise<Post | undefined> {
  return (await load.posts()).find((p) => p.slug === slug)
}

function toPostCard(post: Post): PostCardData {
  const { body: _b, seo: _s, ...card } = post
  return card
}

export async function getPostCards(filter?: {
  category?: string
  relatedService?: string
  limit?: number
}): Promise<PostCardData[]> {
  return (await getPosts(filter)).map(toPostCard)
}

export async function getFeaturedPostCard(): Promise<PostCardData> {
  const all = await getPostCards()
  return all.find((p) => p.featured) ?? all[0]
}

export async function getRelatedPostCards(slug: string, limit = 3): Promise<PostCardData[]> {
  const post = await getPost(slug)
  if (!post) return []
  const posts = await load.posts()
  const sameCategory = posts.filter((p) => p.slug !== slug && p.category === post.category)
  const rest = posts.filter((p) => p.slug !== slug && p.category !== post.category)
  return [...sameCategory, ...rest].slice(0, limit).map(toPostCard)
}

export async function getPostCategoriesWithCounts() {
  const posts = await load.posts()
  return postCategories
    .map((category) => ({ category, count: posts.filter((p) => p.category === category).length }))
    .filter((c) => c.count > 0)
}
