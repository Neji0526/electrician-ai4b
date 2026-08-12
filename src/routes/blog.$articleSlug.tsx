import { Link, createFileRoute, notFound } from '@tanstack/react-router'

import { Icon } from '~/components/Icon'
import { Breadcrumbs } from '~/components/Breadcrumbs'
import { Section, SectionHeading, Badge, btn } from '~/components/ui'
import { Photo } from '~/components/Photo'
import { Prose, BlockToc } from '~/components/Prose'
import { CTASection } from '~/components/CTASection'

import { getPost, getRelatedPostCards, getService } from '~/content'
import { business } from '~/content/business'
import { seo } from '~/lib/seo'
import { articleSchema, breadcrumbSchema } from '~/lib/schema'
import { formatDate, priceLabel } from '~/lib/format'
import { trackPhone } from '~/lib/analytics'

export const Route = createFileRoute('/blog/$articleSlug')({
  loader: async ({ params }) => {
    const post = await getPost(params.articleSlug)
    if (!post) throw notFound()

    const [related, service] = await Promise.all([
      getRelatedPostCards(post.slug, 3),
      post.relatedService ? getService(post.relatedService) : Promise.resolve(undefined),
    ])

    return { post, related, service }
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {}
    const { post } = loaderData
    const trail = [
      { label: 'Home', href: '/' },
      { label: 'Resource Center', href: '/blog' },
      { label: post.title, href: `/blog/${post.slug}` },
    ]
    return seo({
      title: post.seo.title,
      description: post.seo.description,
      path: `/blog/${post.slug}`,
      image: post.image.src,
      type: 'article',
      publishedTime: post.publishedOn,
      modifiedTime: post.updatedOn ?? post.publishedOn,
      author: post.author,
      schema: [articleSchema(post), breadcrumbSchema(trail)],
    })
  },
  component: ArticlePage,
})

function ArticlePage() {
  const { post, related, service } = Route.useLoaderData()

  const trail = [
    { label: 'Home', href: '/' },
    { label: 'Resource Center', href: '/blog' },
    { label: post.title, href: `/blog/${post.slug}` },
  ]

  return (
    <>
      <article>
        {/* --------------------------------------------------------- header */}
        <header className="border-b border-line bg-surface">
          <div className="container-page py-8 md:py-12">
            <Breadcrumbs trail={trail} className="mb-6" />

            <div className="max-w-3xl">
              <Badge tone="brand">{post.category}</Badge>

              <h1 className="mt-4 text-[2rem] leading-[1.15] md:text-[2.75rem]">{post.title}</h1>

              <p className="mt-4 text-lg leading-relaxed text-ink-soft">{post.excerpt}</p>

              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.9375rem] text-muted">
                <span className="flex items-center gap-2">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-brand-100 text-sm font-bold text-brand-700">
                    {post.author.charAt(0)}
                  </span>
                  <span className="font-semibold text-ink">{post.author}</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Icon name="calendar" size={15} />
                  <time dateTime={post.publishedOn}>{formatDate(post.publishedOn)}</time>
                </span>
                <span className="flex items-center gap-1.5">
                  <Icon name="clock" size={15} />
                  {post.readingMinutes} min read
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* ---------------------------------------------------------- body */}
        <div className="container-page py-10 md:py-14">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-14">
            <div className="min-w-0 max-w-3xl">
              <Photo
                image={post.image}
                aspect="16/9"
                priority
                sizes="(min-width: 1024px) 48rem, 100vw"
                className="mb-9"
              />

              <div className="mb-9 lg:hidden">
                <BlockToc blocks={post.body} />
              </div>

              <Prose blocks={post.body} />

              {/* Author box */}
              <div className="mt-12 flex flex-col gap-4 rounded-card border border-line bg-surface p-5 sm:flex-row sm:items-center">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-brand-600 text-lg font-bold text-white">
                  {post.author.charAt(0)}
                </span>
                <div>
                  <p className="font-bold text-ink">Written by {post.author}</p>
                  <p className="mt-1 text-[0.9375rem] leading-relaxed text-muted">
                    {business.name} · {business.license.label}. Everything here comes from work we do
                    in Austin homes and businesses every week.
                  </p>
                </div>
              </div>
            </div>

            {/* ------------------------------------------------------ sidebar */}
            <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
              <div className="hidden lg:block">
                <BlockToc blocks={post.body} />
              </div>

              {service ? (
                <div className="rounded-card border border-line bg-white p-5 shadow-card">
                  <p className="text-sm font-bold uppercase tracking-wide text-muted">
                    Related service
                  </p>
                  <h2 className="mt-2 text-[1.0625rem] font-bold text-ink">{service.name}</h2>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">
                    {service.summary}
                  </p>
                  <p className="mt-3 font-bold text-brand-700">
                    {priceLabel(service.startingPrice)}
                  </p>
                  <Link
                    to="/services/$serviceSlug"
                    params={{ serviceSlug: service.slug }}
                    className={btn('secondary', 'md', 'mt-4 w-full')}
                  >
                    See the service page
                    <Icon name="arrow-right" size={16} />
                  </Link>
                </div>
              ) : null}

              <div className="rounded-card border border-brand-100 bg-brand-50 p-5">
                <p className="font-bold text-ink">Want this looked at?</p>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-soft">
                  Our diagnostic is $89 during business hours and gets credited to the repair.
                </p>
                <Link to="/request-estimate" className={btn('primary', 'md', 'mt-4 w-full')}>
                  Get a free estimate
                </Link>
                <a
                  href={business.phoneHref}
                  onClick={() => trackPhone(`article_${post.slug}`)}
                  className="mt-3 block text-center font-bold text-brand-700 underline-offset-4 hover:underline"
                >
                  {business.phone}
                </a>
              </div>
            </aside>
          </div>
        </div>
      </article>

      {/* -------------------------------------------------------- related */}
      {related.length ? (
        <Section tone="surface" labelledBy="related-articles">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading id="related-articles" eyebrow="Keep reading" title="Related guides" />
            <Link to="/blog" className={btn('secondary', 'md', 'shrink-0')}>
              All articles
              <Icon name="arrow-right" size={17} />
            </Link>
          </div>

          <ul className="mt-8 grid gap-5 md:grid-cols-3">
            {related.map((item) => (
              <li key={item.slug} className="h-full">
                <Link
                  to="/blog/$articleSlug"
                  params={{ articleSlug: item.slug }}
                  className="group flex h-full flex-col rounded-card border border-line bg-white p-5 shadow-card transition-all hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-lift"
                >
                  <span className="text-sm font-semibold text-brand-700">{item.category}</span>
                  <h3 className="mt-2 text-[1.0625rem] font-bold leading-snug text-ink group-hover:text-brand-700">
                    {item.title}
                  </h3>
                  <p className="mt-2 flex-1 text-[0.9375rem] leading-relaxed text-muted">
                    {item.excerpt}
                  </p>
                  <span className="mt-4 text-sm text-muted">{item.readingMinutes} min read</span>
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      <CTASection
        location={`article_${post.slug}`}
        headline="Rather have someone look at it?"
        body="Reading about a tripping breaker is useful. Having someone put a meter on it is better. Free estimates on planned work, $89 diagnostics on faults."
      />
    </>
  )
}
