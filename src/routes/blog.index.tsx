import { useMemo, useState } from 'react'
import { Link, createFileRoute } from '@tanstack/react-router'

import { Icon } from '~/components/Icon'
import { PageHero } from '~/components/PageHero'
import { Section, SectionHeading, Badge, btn } from '~/components/ui'
import { Photo } from '~/components/Photo'
import { CTASection } from '~/components/CTASection'

import {
  getFeaturedPostCard,
  getPostCards,
  getPostCategoriesWithCounts,
  getServiceCards,
} from '~/content'
import { business } from '~/content/business'
import { seo } from '~/lib/seo'
import { breadcrumbSchema } from '~/lib/schema'
import { cx, formatDate } from '~/lib/format'
import type { PostCardData } from '~/content/types'

const TRAIL = [
  { label: 'Home', href: '/' },
  { label: 'Resource Center', href: '/blog' },
]

export const Route = createFileRoute('/blog/')({
  loader: async () => {
    const [posts, featured, categories, services] = await Promise.all([
      getPostCards(),
      getFeaturedPostCard(),
      getPostCategoriesWithCounts(),
      getServiceCards(),
    ])
    const serviceNames = Object.fromEntries(services.map((s) => [s.slug, s.shortName]))
    return { posts, featured, categories, serviceNames }
  },
  head: () =>
    seo({
      title: 'Electrical Resource Center — Guides for Austin Homeowners',
      description:
        'Plain-English guides on tripping breakers, panel upgrade costs, EV charging, rewiring, lighting and generators — written by the electricians who do the work.',
      path: '/blog',
      schema: breadcrumbSchema(TRAIL),
    }),
  component: BlogIndexPage,
})

function BlogIndexPage() {
  const { posts, featured, categories, serviceNames } = Route.useLoaderData()
  const [category, setCategory] = useState('all')
  const [query, setQuery] = useState('')

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase()
    return posts.filter((post) => {
      const categoryOk = category === 'all' || post.category === category
      if (!categoryOk) return false
      if (!needle) return true
      return (
        post.title.toLowerCase().includes(needle) ||
        post.excerpt.toLowerCase().includes(needle) ||
        post.category.toLowerCase().includes(needle)
      )
    })
  }, [posts, category, query])

  const rest = results.filter((post) => post.slug !== featured.slug || category !== 'all' || query)

  return (
    <>
      <PageHero
        trail={TRAIL}
        eyebrow="Resource center"
        title="Straight answers about the electrical system in your house"
        intro="No filler and no scare tactics. These are the explanations we give homeowners on site, written down so you can read them before you call anyone."
        showActions={false}
      />

      {/* --------------------------------------------------------- featured */}
      {category === 'all' && !query ? (
        <Section className="pt-8 md:pt-10" labelledBy="featured-post">
          <h2 id="featured-post" className="sr-only">
            Featured article
          </h2>
          <Link
            to="/blog/$articleSlug"
            params={{ articleSlug: featured.slug }}
            className="group grid gap-6 overflow-hidden rounded-panel border border-line bg-white shadow-card transition-shadow hover:shadow-lift lg:grid-cols-2"
          >
            <Photo
              image={featured.image}
              aspect="16/9"
              rounded={false}
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="h-full"
            />
            <div className="flex flex-col justify-center p-6 lg:py-10 lg:pr-10">
              <div className="flex flex-wrap items-center gap-2.5">
                <Badge tone="brand">Featured</Badge>
                <Badge tone="neutral">{featured.category}</Badge>
              </div>
              <h3 className="mt-4 text-2xl leading-tight text-ink group-hover:text-brand-700 md:text-[2rem]">
                {featured.title}
              </h3>
              <p className="mt-3 text-[1.0625rem] leading-relaxed text-ink-soft">
                {featured.excerpt}
              </p>
              <p className="mt-4 text-sm text-muted">
                {featured.author} · {formatDate(featured.publishedOn)} ·{' '}
                {featured.readingMinutes} min read
              </p>
              <span className="mt-5 inline-flex items-center gap-1.5 font-semibold text-brand-700">
                Read the guide
                <Icon
                  name="arrow-right"
                  size={17}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </span>
            </div>
          </Link>
        </Section>
      ) : null}

      {/* ---------------------------------------------------------- filters */}
      <Section tone="surface" className={category === 'all' && !query ? 'pt-4 md:pt-6' : undefined}>
        <div className="rounded-card border border-line bg-white p-4 shadow-card">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <fieldset className="flex flex-wrap items-center gap-1.5">
              <legend className="sr-only">Filter articles by category</legend>
              <button
                type="button"
                onClick={() => setCategory('all')}
                aria-pressed={category === 'all'}
                className={chip(category === 'all')}
              >
                All articles
              </button>
              {categories.map((item) => (
                <button
                  key={item.category}
                  type="button"
                  onClick={() => setCategory(item.category)}
                  aria-pressed={category === item.category}
                  className={chip(category === item.category)}
                >
                  {item.category}
                  <span className="ml-1.5 opacity-70">{item.count}</span>
                </button>
              ))}
            </fieldset>

            <div className="relative lg:w-72 lg:shrink-0">
              <label htmlFor="blog-search" className="sr-only">
                Search articles
              </label>
              <Icon
                name="search"
                size={18}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
              />
              <input
                id="blog-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search articles…"
                className="w-full rounded-btn border border-line-strong bg-white py-2.5 pl-10 pr-3.5 text-base text-ink placeholder:text-muted/70 focus:border-brand-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        <p aria-live="polite" className="mt-5 text-[0.9375rem] text-muted">
          Showing <span className="font-bold text-ink">{rest.length}</span> of {posts.length}{' '}
          articles
        </p>

        {rest.length ? (
          <ul className="mt-4 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((post) => (
              <PostCard key={post.slug} post={post} serviceName={serviceNames[post.relatedService ?? '']} />
            ))}
          </ul>
        ) : (
          <div className="mt-4 rounded-card border border-line bg-white p-10 text-center">
            <p className="font-bold text-ink">No articles matched that search.</p>
            <button
              type="button"
              onClick={() => {
                setCategory('all')
                setQuery('')
              }}
              className="mt-2 font-semibold text-brand-700 underline underline-offset-2"
            >
              Clear filters
            </button>
          </div>
        )}
      </Section>

      {/* ------------------------------------------------------ service tie-in */}
      <Section labelledBy="blog-services">
        <div className="grid gap-8 rounded-panel border border-line bg-surface p-6 md:p-9 lg:grid-cols-[1.3fr_1fr] lg:items-center">
          <div>
            <SectionHeading
              id="blog-services"
              eyebrow="Reading is free, so is the estimate"
              title="Found your problem in one of these?"
            />
            <p className="mt-3 leading-relaxed text-ink-soft">
              Most of what is on this page can be diagnosed properly in a single visit. Our
              diagnostic is $89 during business hours and it is credited toward the repair.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <Link to="/request-estimate" className={btn('primary', 'lg')}>
              Get a Free Estimate
            </Link>
            <a href={business.phoneHref} className={btn('secondary', 'lg')}>
              <Icon name="phone" size={18} />
              {business.phone}
            </a>
          </div>
        </div>
      </Section>

      <CTASection location="blog_final" tone="light" />
    </>
  )
}

function chip(active: boolean) {
  return cx(
    'rounded-full border px-3 py-1.5 text-sm font-semibold transition-colors',
    active
      ? 'border-brand-600 bg-brand-600 text-white'
      : 'border-line-strong bg-white text-ink-soft hover:border-brand-300 hover:text-brand-700',
  )
}

function PostCard({ post, serviceName }: { post: PostCardData; serviceName?: string }) {
  return (
    <li className="h-full">
      <Link
        to="/blog/$articleSlug"
        params={{ articleSlug: post.slug }}
        className="group flex h-full flex-col overflow-hidden rounded-card border border-line bg-white shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-lift"
      >
        <Photo image={post.image} aspect="16/9" rounded={false} sizes="(min-width: 768px) 33vw, 100vw" />
        <div className="flex flex-1 flex-col p-5">
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span className="font-semibold text-brand-700">{post.category}</span>
            <span aria-hidden="true" className="text-line-strong">
              ·
            </span>
            <span className="text-muted">{post.readingMinutes} min read</span>
          </div>

          <h3 className="mt-2.5 text-[1.0625rem] font-bold leading-snug text-ink group-hover:text-brand-700">
            {post.title}
          </h3>

          <p className="mt-2 flex-1 text-[0.9375rem] leading-relaxed text-muted">{post.excerpt}</p>

          <p className="mt-4 border-t border-line pt-4 text-sm text-muted">
            {post.author} · {formatDate(post.publishedOn)}
            {serviceName ? ` · ${serviceName}` : ''}
          </p>
        </div>
      </Link>
    </li>
  )
}
