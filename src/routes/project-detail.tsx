import { Link } from 'react-router'
import type { LoaderFunctionArgs } from 'react-router'
import { useRouteData, notFound, requireParam } from '~/lib/router'
import { Seo } from '~/components/Seo'

import { Icon } from '~/components/Icon'
import { PageHero } from '~/components/PageHero'
import { Section, SectionHeading, Badge, btn, CheckList } from '~/components/ui'
import { Photo } from '~/components/Photo'
import { ProjectCard } from '~/components/cards'
import { CTASection } from '~/components/CTASection'

import { getProject, getProjectCards, getService } from '~/content'
import { seo } from '~/lib/seo'
import { breadcrumbSchema, projectSchema } from '~/lib/schema'
import { formatDate } from '~/lib/format'

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const project = await getProject(requireParam(params, 'projectSlug'))
  if (!project) throw notFound()

  const [service, related] = await Promise.all([
    getService(project.serviceSlug),
    getProjectCards({ serviceSlug: project.serviceSlug, limit: 4 }),
  ])

  return {
    project,
    service,
    related: related.filter((p) => p.slug !== project.slug).slice(0, 3),
  }
}

type RouteData = Awaited<ReturnType<typeof loader>>

const pageSeo = ({ loaderData }: { loaderData: RouteData }) => {
  const { project, service } = loaderData
  const trail = [
    { label: 'Home', href: '/' },
    { label: 'Projects', href: '/projects' },
    { label: project.title, href: `/projects/${project.slug}` },
  ]
  return seo({
    title: `${project.title} — ${project.neighborhood}, ${project.city}`,
    description: project.summary,
    path: `/projects/${project.slug}`,
    image: project.after.src,
    type: 'article',
    schema: [projectSchema(project, service), breadcrumbSchema(trail)],
  })
}

function ProjectDetailPage() {
  const data = useRouteData<typeof loader>()
  const { project, service, related } = data

  const trail = [
    { label: 'Home', href: '/' },
    { label: 'Projects', href: '/projects' },
    { label: project.title, href: `/projects/${project.slug}` },
  ]

  return (
    <>
      <Seo {...pageSeo({ loaderData: data })} />

      <PageHero
        trail={trail}
        eyebrow={`${project.neighborhood}, ${project.city}`}
        title={project.title}
        intro={project.summary}
        showActions={false}
        badges={
          <>
            {service ? <Badge tone="brand">{service.shortName}</Badge> : null}
            <Badge tone="neutral">{project.costRange}</Badge>
            <Badge tone="neutral">{project.durationLabel}</Badge>
            <Badge tone="success">Completed {formatDate(project.completedOn)}</Badge>
          </>
        }
      />

      {/* -------------------------------------------------------- before/after */}
      <Section labelledBy="before-after">
        <h2 id="before-after" className="sr-only">
          Before and after
        </h2>

        <div className="grid gap-5 md:grid-cols-2">
          <figure>
            <Photo image={project.before} aspect="4/3" priority sizes="(min-width: 768px) 50vw, 100vw" />
            <figcaption className="mt-3 flex items-center gap-2 text-[0.9375rem] font-semibold text-muted">
              <span className="rounded bg-ink px-2 py-0.5 text-xs font-bold uppercase tracking-wide text-white">
                Before
              </span>
              {project.before.alt}
            </figcaption>
          </figure>
          <figure>
            <Photo image={project.after} aspect="4/3" priority sizes="(min-width: 768px) 50vw, 100vw" />
            <figcaption className="mt-3 flex items-center gap-2 text-[0.9375rem] font-semibold text-muted">
              <span className="rounded bg-brand-600 px-2 py-0.5 text-xs font-bold uppercase tracking-wide text-white">
                After
              </span>
              {project.after.alt}
            </figcaption>
          </figure>
        </div>
      </Section>

      {/* ------------------------------------------------------------- detail */}
      <Section tone="surface" className="pt-0 md:pt-0">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:items-start">
          <div className="max-w-3xl">
            <h2 className="text-2xl md:text-[1.75rem]">The challenge</h2>
            <p className="mt-4 text-[1.0625rem] leading-relaxed text-ink-soft">{project.challenge}</p>

            <h2 className="mt-12 text-2xl md:text-[1.75rem]">How we solved it</h2>
            <p className="mt-4 text-[1.0625rem] leading-relaxed text-ink-soft">{project.solution}</p>

            <h2 className="mt-12 text-2xl md:text-[1.75rem]">Scope of work</h2>
            <CheckList items={project.scope} className="mt-5" />

            {project.permitNote ? (
              <p className="mt-8 flex items-start gap-3 rounded-card border border-brand-100 bg-brand-50 p-5 text-[0.9375rem] leading-relaxed text-ink-soft">
                <Icon name="document" size={20} className="mt-0.5 shrink-0 text-brand-600" />
                <span>
                  <span className="font-bold text-ink">Permit record: </span>
                  {project.permitNote}
                </span>
              </p>
            ) : null}
          </div>

          <aside className="space-y-5 lg:sticky lg:top-28">
            <div className="rounded-card border border-line bg-white p-6 shadow-card">
              <h2 className="text-lg font-bold text-ink">Project details</h2>
              <dl className="mt-4 space-y-3.5 text-[0.9375rem]">
                {[
                  ['Location', `${project.neighborhood}, ${project.city}`],
                  ['Completed', formatDate(project.completedOn)],
                  ['Duration', project.durationLabel],
                  ['Investment', project.costRange],
                  ...(service ? [['Service', service.name] as const] : []),
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between gap-4 border-b border-line pb-3 last:border-0">
                    <dt className="text-muted">{label}</dt>
                    <dd className="text-right font-semibold text-ink">{value}</dd>
                  </div>
                ))}
              </dl>

              {service ? (
                <Link
                  to={`/services/${service.slug}`}
                  className={btn('secondary', 'md', 'mt-5 w-full')}
                >
                  About {service.shortName.toLowerCase()}
                  <Icon name="arrow-right" size={16} />
                </Link>
              ) : null}

              <Link to="/request-estimate" className={btn('primary', 'md', 'mt-2.5 w-full')}>
                Get a free estimate
              </Link>
            </div>
          </aside>
        </div>
      </Section>

      {/* ------------------------------------------------------------ related */}
      {related.length ? (
        <Section labelledBy="related-projects">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              id="related-projects"
              eyebrow="Similar work"
              title={service ? `More ${service.shortName.toLowerCase()} projects` : 'More projects'}
            />
            <Link to="/projects" className={btn('secondary', 'md', 'shrink-0')}>
              All projects
              <Icon name="arrow-right" size={17} />
            </Link>
          </div>
          <ul className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <ProjectCard key={item.slug} project={item} />
            ))}
          </ul>
        </Section>
      ) : null}

      <CTASection
        location={`project_${project.slug}`}
        headline="Planning something similar?"
        body="We will walk the job, put a written scope and a fixed price together, and tell you honestly whether there is a cheaper way to get the same result."
      />
    </>
  )
}

export { ProjectDetailPage as Component }
