import { Link } from 'react-router'
import { useRouteData } from '~/lib/router'
import { Seo } from '~/components/Seo'

import { Icon } from '~/components/Icon'
import { PageHero } from '~/components/PageHero'
import { Section } from '~/components/ui'
import { AppLink } from '~/components/AppLink'
import { footerNav } from '~/components/nav'

import { getSitemapIndex } from '~/content'
import { business } from '~/content/business'
import { seo } from '~/lib/seo'
import { breadcrumbSchema } from '~/lib/schema'

const TRAIL = [
  { label: 'Home', href: '/' },
  { label: 'Sitemap', href: '/sitemap' },
]

export const loader = async () => getSitemapIndex()

const pageSeo = () =>
  seo({
    title: 'Sitemap',
    description: `Every page on the ${business.name} website — services, service areas, projects, guides and company information.`,
    path: '/sitemap',
    schema: breadcrumbSchema(TRAIL),
  })

function SitemapPage() {
  const { services, areas, projects, posts } = useRouteData<typeof loader>()

  return (
    <>
      <Seo {...pageSeo()} />

      <PageHero
        trail={TRAIL}
        title="Sitemap"
        intro={
          <>
            Every page on this site. There is also a{' '}
            <a
              href="/sitemap.xml"
              className="font-semibold text-brand-700 underline underline-offset-2"
            >
              machine-readable sitemap.xml
            </a>{' '}
            for search engines.
          </>
        }
        showActions={false}
      />

      <Section>
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          <Group title="Main pages">
            <li>
              <Link to="/" className={linkClass}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/services" className={linkClass}>
                All services
              </Link>
            </li>
            <li>
              <Link to="/emergency-electrician" className={linkClass}>
                Emergency electrician
              </Link>
            </li>
            <li>
              <Link to="/service-areas" className={linkClass}>
                Service areas
              </Link>
            </li>
            <li>
              <Link to="/projects" className={linkClass}>
                Projects
              </Link>
            </li>
            <li>
              <Link to="/reviews" className={linkClass}>
                Reviews
              </Link>
            </li>
            <li>
              <Link to="/blog" className={linkClass}>
                Resource center
              </Link>
            </li>
            <li>
              <Link to="/faq" className={linkClass}>
                FAQ
              </Link>
            </li>
          </Group>

          <Group title="Company">
            {[...footerNav.quickLinks, ...footerNav.legal].map((item) => (
              <li key={item.href}>
                <AppLink to={item.href} className={linkClass}>
                  {item.label}
                </AppLink>
              </li>
            ))}
            <li>
              <AppLink to="/request-estimate" className={linkClass}>
                Request an estimate
              </AppLink>
            </li>
          </Group>

          <Group title={`Services (${services.length})`}>
            {services.map((service) => (
              <li key={service.slug}>
                <Link
                  to={`/services/${service.slug}`}
                  className={linkClass}
                >
                  {service.name}
                </Link>
              </li>
            ))}
          </Group>

          <Group title={`Service areas (${areas.length})`}>
            {areas.map((area) => (
              <li key={area.slug}>
                <Link
                  to={`/service-areas/${area.slug}`}
                  className={linkClass}
                >
                  Electrician in {area.city}, {area.state}
                </Link>
              </li>
            ))}
          </Group>

          <Group title={`Projects (${projects.length})`}>
            {projects.map((project) => (
              <li key={project.slug}>
                <Link
                  to={`/projects/${project.slug}`}
                  className={linkClass}
                >
                  {project.title}
                </Link>
              </li>
            ))}
          </Group>

          <Group title={`Guides (${posts.length})`}>
            {posts.map((post) => (
              <li key={post.slug}>
                <Link
                  to={`/blog/${post.slug}`}
                  className={linkClass}
                >
                  {post.title}
                </Link>
              </li>
            ))}
          </Group>
        </div>
      </Section>
    </>
  )
}

const linkClass =
  'flex items-start gap-1.5 text-[0.9375rem] text-ink-soft underline-offset-2 hover:text-brand-700 hover:underline'

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <nav aria-label={title}>
      <h2 className="flex items-center gap-2 text-[1.0625rem] font-bold text-ink">
        <Icon name="chevron-right" size={16} className="text-brand-600" />
        {title}
      </h2>
      <ul className="mt-3.5 space-y-2.5 border-l border-line pl-4">{children}</ul>
    </nav>
  )
}

export { SitemapPage as Component }
