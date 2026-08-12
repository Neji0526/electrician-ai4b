/**
 * Structured data builders. Kept separate from `seo.ts` so a page can compose
 * several schema objects (LocalBusiness + Service + FAQ + Breadcrumb) without
 * any of them being hand-written twice.
 */
import { business } from '~/content/business'
import type { Faq, Post, Project, Review, Service, ServiceArea } from '~/content/types'
import { absoluteUrl } from './seo'

const ORG_ID = `${business.seo.siteUrl}/#organization`

export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Electrician',
    '@id': ORG_ID,
    name: business.name,
    legalName: business.legalName,
    description: business.seo.defaultDescription,
    url: business.seo.siteUrl,
    telephone: business.phone,
    email: business.email,
    image: absoluteUrl(business.seo.ogImage),
    logo: absoluteUrl('/images/logo.svg'),
    priceRange: '$$',
    foundingDate: String(business.founded),
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.address.street,
      addressLocality: business.address.city,
      addressRegion: business.address.state,
      postalCode: business.address.zip,
      addressCountry: business.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: business.geo.lat,
      longitude: business.geo.lng,
    },
    openingHoursSpecification: business.hours
      .filter((h) => h.open && h.close)
      .map((h) => ({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: `https://schema.org/${h.label}`,
        opens: to24h(h.open!),
        closes: to24h(h.close!),
      })),
    areaServed: business.emergency.areas.map((city) => ({
      '@type': 'City',
      name: `${city}, ${business.address.state}`,
    })),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: business.rating,
      reviewCount: business.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
    sameAs: business.social.map((s) => s.href),
    hasCredential: business.license.label,
    slogan: business.tagline,
  }
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${business.seo.siteUrl}/#website`,
    url: business.seo.siteUrl,
    name: business.name,
    publisher: { '@id': ORG_ID },
    inLanguage: 'en-US',
  }
}

export function serviceSchema(service: Service) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    serviceType: service.name,
    description: service.summary,
    url: absoluteUrl(`/services/${service.slug}`),
    provider: { '@id': ORG_ID },
    areaServed: business.emergency.areas.map((city) => ({
      '@type': 'City',
      name: `${city}, ${business.address.state}`,
    })),
    ...(service.startingPrice
      ? {
          offers: {
            '@type': 'Offer',
            priceCurrency: 'USD',
            price: service.startingPrice,
            description: service.priceNote,
            availability: 'https://schema.org/InStock',
          },
        }
      : {}),
  }
}

export function faqSchema(faqs: Faq[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }
}

export function reviewSchema(reviews: Review[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': ORG_ID,
    name: business.name,
    image: absoluteUrl(business.seo.ogImage),
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.address.street,
      addressLocality: business.address.city,
      addressRegion: business.address.state,
      postalCode: business.address.zip,
      addressCountry: business.address.country,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: business.rating,
      reviewCount: business.reviewCount,
      bestRating: 5,
    },
    review: reviews.map((r) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: r.name },
      datePublished: r.date,
      reviewBody: r.text,
      reviewRating: { '@type': 'Rating', ratingValue: r.rating, bestRating: 5, worstRating: 1 },
    })),
  }
}

export function articleSchema(post: Post) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: absoluteUrl(post.image.src),
    datePublished: post.publishedOn,
    dateModified: post.updatedOn ?? post.publishedOn,
    author: { '@type': 'Person', name: post.author, worksFor: { '@id': ORG_ID } },
    publisher: { '@id': ORG_ID },
    mainEntityOfPage: { '@type': 'WebPage', '@id': absoluteUrl(`/blog/${post.slug}`) },
    articleSection: post.category,
    inLanguage: 'en-US',
  }
}

export function projectSchema(project: Project, service?: Service) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.summary,
    image: [absoluteUrl(project.before.src), absoluteUrl(project.after.src)],
    dateCreated: project.completedOn,
    creator: { '@id': ORG_ID },
    about: service?.name,
    contentLocation: {
      '@type': 'Place',
      name: `${project.neighborhood}, ${project.city}, ${business.address.state}`,
    },
  }
}

export function areaSchema(area: ServiceArea) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Electrician',
    name: `${business.name} — ${area.city}`,
    parentOrganization: { '@id': ORG_ID },
    url: absoluteUrl(`/service-areas/${area.slug}`),
    telephone: business.phone,
    image: absoluteUrl(business.seo.ogImage),
    areaServed: {
      '@type': 'City',
      name: `${area.city}, ${area.state}`,
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: area.city,
      addressRegion: area.state,
      addressCountry: 'US',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: business.rating,
      reviewCount: business.reviewCount,
      bestRating: 5,
    },
  }
}

export function breadcrumbSchema(trail: { label: string; href: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.label,
      item: absoluteUrl(item.href),
    })),
  }
}

function to24h(time: string) {
  const match = /^(\d{1,2}):(\d{2})\s*(AM|PM)$/i.exec(time.trim())
  if (!match) return time
  let hours = Number(match[1])
  const minutes = match[2]
  const meridiem = match[3].toUpperCase()
  if (meridiem === 'PM' && hours !== 12) hours += 12
  if (meridiem === 'AM' && hours === 12) hours = 0
  return `${String(hours).padStart(2, '0')}:${minutes}`
}
