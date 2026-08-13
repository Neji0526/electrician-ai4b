import { useMemo, useState } from 'react'
import { Link } from 'react-router'
import { useRouteData } from '~/lib/router'
import { Seo } from '~/components/Seo'

import { Icon } from '~/components/Icon'
import { PageHero } from '~/components/PageHero'
import { Section, btn } from '~/components/ui'
import { FAQAccordion } from '~/components/FAQAccordion'
import { CTASection } from '~/components/CTASection'

import { getFaqs, getFaqsGrouped } from '~/content'
import { business } from '~/content/business'
import { seo } from '~/lib/seo'
import { breadcrumbSchema, faqSchema } from '~/lib/schema'
import { cx } from '~/lib/format'

const TRAIL = [
  { label: 'Home', href: '/' },
  { label: 'FAQ', href: '/faq' },
]

const CATEGORY_ICONS: Record<string, string> = {
  'Appointments & Scheduling': 'calendar',
  'Pricing & Estimates': 'tag',
  'Emergency Service': 'bolt-alert',
  'Electrical Safety': 'shield',
  'Panels & Breakers': 'panel',
  Installations: 'wrench',
  'Permits & Inspections': 'document',
  'Commercial Work': 'building',
  'Warranty & Guarantees': 'badge',
}

export const loader = async () => {
  const [groups, all] = await Promise.all([getFaqsGrouped(), getFaqs()])
  return { groups, all }
}

type RouteData = Awaited<ReturnType<typeof loader>>

const pageSeo = ({ loaderData }: { loaderData: RouteData }) =>
  seo({
    title: 'Frequently Asked Questions — Austin Electricians',
    description:
      'Answers on scheduling, pricing, emergency service, electrical safety, panels, permits, commercial work and our workmanship warranty.',
    path: '/faq',
    schema: [
      breadcrumbSchema(TRAIL),
      ...(loaderData?.all ? [faqSchema(loaderData.all)] : []),
    ],
  })

function FaqPage() {
  const data = useRouteData<typeof loader>()
  const { groups, all } = data
  const [query, setQuery] = useState('')
  const [active, setActive] = useState<string | null>(null)

  const searched = useMemo(() => {
    const needle = query.trim().toLowerCase()
    if (!needle) return null
    return all.filter(
      (faq) =>
        faq.question.toLowerCase().includes(needle) ||
        faq.answer.toLowerCase().includes(needle) ||
        faq.category.toLowerCase().includes(needle),
    )
  }, [all, query])

  const visibleGroups = active ? groups.filter((g) => g.category === active) : groups

  return (
    <>
      <Seo {...pageSeo({ loaderData: data })} />

      <PageHero
        trail={TRAIL}
        eyebrow="Questions & answers"
        title="Everything people ask before they book"
        intro={`${all.length} questions answered plainly — how we price, what needs a permit, what counts as an emergency, and what the warranty actually covers.`}
        showActions={false}
      />

      <Section className="pt-8 md:pt-10">
        <div className="grid gap-9 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-12">
          {/* ------------------------------------------------ category nav */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="relative">
              <label htmlFor="faq-search" className="sr-only">
                Search questions
              </label>
              <Icon
                name="search"
                size={18}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
              />
              <input
                id="faq-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search questions…"
                className="w-full rounded-btn border border-line-strong bg-white py-2.5 pl-10 pr-3.5 text-base text-ink placeholder:text-muted/70 focus:border-brand-500 focus:outline-none"
              />
            </div>

            <nav aria-label="FAQ categories" className="mt-5">
              <p className="text-sm font-bold uppercase tracking-wider text-muted">Categories</p>
              <ul className="mt-3 space-y-1">
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      setActive(null)
                      setQuery('')
                    }}
                    aria-current={active === null ? 'true' : undefined}
                    className={navItem(active === null)}
                  >
                    <Icon name="home" size={17} />
                    All questions
                    <span className="ml-auto text-sm opacity-70">{all.length}</span>
                  </button>
                </li>
                {groups.map((group) => (
                  <li key={group.category}>
                    <button
                      type="button"
                      onClick={() => {
                        setActive(group.category)
                        setQuery('')
                      }}
                      aria-current={active === group.category ? 'true' : undefined}
                      className={navItem(active === group.category)}
                    >
                      <Icon name={CATEGORY_ICONS[group.category] ?? 'info'} size={17} />
                      <span className="text-left">{group.category}</span>
                      <span className="ml-auto text-sm opacity-70">{group.items.length}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mt-7 rounded-card border border-brand-100 bg-brand-50 p-5">
              <p className="font-bold text-ink">Still not answered?</p>
              <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-ink-soft">
                Call and ask. We would rather spend five minutes on the phone than have you guess.
              </p>
              <a href={business.phoneHref} className={btn('primary', 'md', 'mt-4 w-full')}>
                <Icon name="phone" size={17} />
                {business.phone}
              </a>
            </div>
          </aside>

          {/* --------------------------------------------------- questions */}
          <div className="min-w-0">
            {searched ? (
              <>
                <p aria-live="polite" className="text-[0.9375rem] text-muted">
                  <span className="font-bold text-ink">{searched.length}</span>{' '}
                  {searched.length === 1 ? 'question matches' : 'questions match'} “{query}”
                </p>
                {searched.length ? (
                  <FAQAccordion faqs={searched} className="mt-4" />
                ) : (
                  <div className="mt-4 rounded-card border border-line bg-surface p-10 text-center">
                    <p className="font-bold text-ink">Nothing matched that search.</p>
                    <p className="mt-2 text-ink-soft">
                      Call {business.phone} and ask us directly — we will answer it and then add it
                      to this page.
                    </p>
                  </div>
                )}
              </>
            ) : (
              <div className="space-y-12">
                {visibleGroups.map((group) => (
                  <section key={group.category} aria-labelledby={`faq-${slug(group.category)}`}>
                    <h2
                      id={`faq-${slug(group.category)}`}
                      className="flex items-center gap-2.5 text-xl md:text-2xl"
                    >
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-600">
                        <Icon name={CATEGORY_ICONS[group.category] ?? 'info'} size={19} />
                      </span>
                      {group.category}
                    </h2>
                    <FAQAccordion faqs={group.items} className="mt-4" />
                  </section>
                ))}
              </div>
            )}

            <div className="mt-12 rounded-panel border border-line bg-surface p-6">
              <h2 className="text-lg font-bold text-ink">Looking for something more specific?</h2>
              <p className="mt-2 leading-relaxed text-ink-soft">
                Each service page has its own set of questions about that job in particular —
                including what drives the price up or down.
              </p>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <Link to="/services" className={btn('secondary', 'md')}>
                  Browse services
                  <Icon name="arrow-right" size={16} />
                </Link>
                <Link to="/blog" className={btn('secondary', 'md')}>
                  Read the guides
                  <Icon name="arrow-right" size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <CTASection location="faq_final" tone="light" />
    </>
  )
}

function navItem(active: boolean) {
  return cx(
    'flex w-full items-center gap-2.5 rounded-btn px-3 py-2.5 text-[0.9375rem] font-semibold transition-colors',
    active ? 'bg-brand-600 text-white' : 'text-ink-soft hover:bg-surface hover:text-brand-700',
  )
}

function slug(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

export { FaqPage as Component }
