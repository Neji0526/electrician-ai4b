import { business } from '~/content/business'

export interface SeoInput {
  title: string
  description: string
  /** Absolute path beginning with "/". Used for canonical + og:url. */
  path: string
  image?: string
  type?: 'website' | 'article'
  noindex?: boolean
  /** Emitted verbatim as an ld+json script. */
  schema?: unknown | unknown[]
  publishedTime?: string
  modifiedTime?: string
  author?: string
}

const site = business.seo.siteUrl

export function absoluteUrl(path: string) {
  if (path.startsWith('http')) return path
  return `${site}${path.startsWith('/') ? path : `/${path}`}`
}

/**
 * Builds the object TanStack Router's `head()` expects. Every public route
 * uses this so canonical, Open Graph and Twitter tags can never drift apart.
 */
export function seo(input: SeoInput) {
  const title = input.title.includes(business.name)
    ? input.title
    : `${input.title} | ${business.name}`
  const url = absoluteUrl(input.path)
  const image = absoluteUrl(input.image ?? business.seo.ogImage)

  const meta: Array<Record<string, string>> = [
    { title },
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
  ]

  if (input.noindex) {
    meta.push({ name: 'robots', content: 'noindex, nofollow' })
  } else {
    meta.push({ name: 'robots', content: 'index, follow, max-image-preview:large' })
  }

  if (input.type === 'article') {
    if (input.publishedTime)
      meta.push({ property: 'article:published_time', content: input.publishedTime })
    if (input.modifiedTime)
      meta.push({ property: 'article:modified_time', content: input.modifiedTime })
    if (input.author) meta.push({ property: 'article:author', content: input.author })
  }

  const scripts = input.schema
    ? (Array.isArray(input.schema) ? input.schema : [input.schema]).map((s) => ({
        type: 'application/ld+json',
        children: JSON.stringify(s),
      }))
    : undefined

  return {
    meta,
    links: [{ rel: 'canonical', href: url }],
    ...(scripts ? { scripts } : {}),
  }
}
