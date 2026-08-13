import { useMemo, useState } from 'react'
import { useRouteData } from '~/lib/router'
import { Seo } from '~/components/Seo'

import { Icon } from '~/components/Icon'
import { PageHero } from '~/components/PageHero'
import { Section } from '~/components/ui'
import { ProjectCard } from '~/components/cards'
import { CTASection } from '~/components/CTASection'

import { getProjectCards, getServiceCards } from '~/content'
import { business } from '~/content/business'
import { seo } from '~/lib/seo'
import { breadcrumbSchema } from '~/lib/schema'
import { cx } from '~/lib/format'

const TRAIL = [
  { label: 'Home', href: '/' },
  { label: 'Projects', href: '/projects' },
]

export const loader = async () => {
  const [projects, services] = await Promise.all([getProjectCards(), getServiceCards()])
  return { projects, services }
}

const pageSeo = () =>
  seo({
    title: `Recent Electrical Projects in ${business.address.city}, ${business.address.state}`,
    description:
      'Before-and-after photos and full write-ups of panel upgrades, rewires, EV chargers, generators and commercial finish-outs completed across the Austin area.',
    path: '/projects',
    schema: breadcrumbSchema(TRAIL),
  })

function ProjectsPage() {
  const { projects, services } = useRouteData<typeof loader>()
  const [serviceSlug, setServiceSlug] = useState('all')
  const [city, setCity] = useState('all')

  const cities = useMemo(
    () => Array.from(new Set(projects.map((p) => p.city))).sort(),
    [projects],
  )
  const usedServices = useMemo(
    () =>
      services.filter((service) => projects.some((project) => project.serviceSlug === service.slug)),
    [services, projects],
  )

  const filtered = useMemo(
    () =>
      projects.filter(
        (project) =>
          (serviceSlug === 'all' || project.serviceSlug === serviceSlug) &&
          (city === 'all' || project.city === city),
      ),
    [projects, serviceSlug, city],
  )

  return (
    <>
      <Seo {...pageSeo()} />

      <PageHero
        trail={TRAIL}
        eyebrow="Our work"
        title="Electrical projects we finished this year"
        intro="Real jobs with the constraints they came with — a closing date eight days out, a newborn in the house, an equipment package that changed twice mid-build. Before and after, with what it cost."
      />

      <Section tone="surface" labelledBy="project-list">
        <h2 id="project-list" className="sr-only">
          Completed projects
        </h2>

        {/* Filters */}
        <div className="rounded-card border border-line bg-white p-4 shadow-card">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="filter-service" className="block text-sm font-semibold text-ink">
                Service type
              </label>
              <div className="relative mt-1.5">
                <select
                  id="filter-service"
                  value={serviceSlug}
                  onChange={(e) => setServiceSlug(e.target.value)}
                  className="w-full appearance-none rounded-btn border border-line-strong bg-white px-3.5 py-2.5 pr-10 text-base text-ink focus:border-brand-500 focus:outline-none"
                >
                  <option value="all">All services</option>
                  {usedServices.map((service) => (
                    <option key={service.slug} value={service.slug}>
                      {service.name}
                    </option>
                  ))}
                </select>
                <Icon
                  name="chevron-down"
                  size={18}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted"
                />
              </div>
            </div>

            <div>
              <label htmlFor="filter-city" className="block text-sm font-semibold text-ink">
                Location
              </label>
              <div className="relative mt-1.5">
                <select
                  id="filter-city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full appearance-none rounded-btn border border-line-strong bg-white px-3.5 py-2.5 pr-10 text-base text-ink focus:border-brand-500 focus:outline-none"
                >
                  <option value="all">Everywhere we work</option>
                  {cities.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <Icon
                  name="chevron-down"
                  size={18}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted"
                />
              </div>
            </div>
          </div>
        </div>

        <p aria-live="polite" className="mt-5 text-[0.9375rem] text-muted">
          Showing <span className="font-bold text-ink">{filtered.length}</span> of {projects.length}{' '}
          projects
        </p>

        {filtered.length ? (
          <ul className={cx('mt-4 grid gap-5 md:grid-cols-2 lg:grid-cols-3')}>
            {filtered.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </ul>
        ) : (
          <div className="mt-4 rounded-card border border-line bg-white p-10 text-center">
            <p className="font-bold text-ink">No projects match that combination yet.</p>
            <button
              type="button"
              onClick={() => {
                setServiceSlug('all')
                setCity('all')
              }}
              className="mt-2 font-semibold text-brand-700 underline underline-offset-2"
            >
              Clear filters
            </button>
          </div>
        )}
      </Section>

      <CTASection
        location="projects_final"
        headline="Want a project like one of these?"
        body="Every one of these started with a free estimate and a written scope. Tell us what you are planning and we will put real numbers to it."
      />
    </>
  )
}

export { ProjectsPage as Component }
