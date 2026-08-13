import { business } from '~/content/business'

export interface SeoInput {
  title: string
  description: string
  /** Absolute path beginning with "/". Used for canonical + og:url. */
  path: string
  image?: string
  type?: 'website' | 'article'
  noindex?: boolean
  /** Emitted verbatim as one or more ld+json scripts. */
  schema?: unknown | unknown[]
  publishedTime?: string
  modifiedTime?: string
  author?: string
}

export interface MetaTag {
  name?: string
  property?: string
  content: string
}

export interface SeoDescriptor {
  title: string
  meta: MetaTag[]
  canonical: string
  schema: unknown[]
}

const site = business.seo.siteUrl

/**
 * Identity helper. It exists so a page can write its SEO block as a bare object
 * literal and still have it checked against `SeoInput` — excess or misspelled
 * keys fail at the definition rather than silently doing nothing.
 */
export function seo(input: SeoInput): SeoInput {
  return input
}

export function absoluteUrl(path: string) {
  if (path.startsWith('http')) return path
  return `${site}${path.startsWith('/') ? path : `/${path}`}`
}

/**
 * Resolves a page's SEO input into the exact tags to render. Every public route
 * goes through this so canonical, Open Graph and Twitter tags can never drift
 * apart. The `<Seo>` component renders the result; nothing else should.
 */
export function buildSeo(input: SeoInput): SeoDescriptor {
  const title = input.title.includes(business.name)
    ? input.title
    : `${input.title} | ${business.name}`
  const url = absoluteUrl(input.path)
  const image = absoluteUrl(input.image ?? business.seo.ogImage)

  const meta: MetaTag[] = [
    { name: 'description', content: input.description },

    { property: 'og:type', content: input.type ?? 'website' },
    { property: 'og:site_name', content: business.name },
    { property: 'og:title', content: title },
    { property: 'og:description', content: input.description },
    { property: 'og:url', content: url },
    { property: 'og:image', content: image },
    { property: 'og:locale', content: 'en_US' },

    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: input.description },
    { name: 'twitter:image', content: image },

    // Local business signals that some crawlers still read.
    { name: 'geo.region', content: 'US-TX' },
    { name: 'geo.placename', content: business.address.city },
    { name: 'geo.position', content: `${business.geo.lat};${business.geo.lng}` },

    {
      name: 'robots',
      content: input.noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large',
    },
  ]

  if (input.type === 'article') {
    if (input.publishedTime)
      meta.push({ property: 'article:published_time', content: input.publishedTime })
    if (input.modifiedTime)
      meta.push({ property: 'article:modified_time', content: input.modifiedTime })
    if (input.author) meta.push({ property: 'article:author', content: input.author })
  }

  const schema = input.schema
    ? Array.isArray(input.schema)
      ? input.schema
      : [input.schema]
    : []

  return { title, meta, canonical: url, schema }
}
