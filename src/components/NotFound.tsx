import { Link } from '@tanstack/react-router'
import { Icon } from './Icon'
import { btn } from './ui'
import { serviceDirectory } from '~/content/directory'
import { business } from '~/content/business'
import { trackPhone } from '~/lib/analytics'

const suggestions = serviceDirectory.slice(0, 4)

export function NotFound() {
  return (
    <div className="container-page py-20 md:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <span className="grid h-14 w-14 place-items-center rounded-full bg-brand-50 text-brand-600 mx-auto">
          <Icon name="search" size={28} />
        </span>

        <p className="mt-6 text-sm font-bold uppercase tracking-wider text-brand-600">Error 404</p>
        <h1 className="mt-2 text-[2rem] leading-tight md:text-[2.5rem]">
          We could not find that page
        </h1>
        <p className="mt-4 text-[1.0625rem] leading-relaxed text-ink-soft">
          The link may be out of date. If you were looking for something specific, call us on{' '}
          <a
            href={business.phoneHref}
            onClick={() => trackPhone('not_found')}
            className="font-semibold text-brand-700 underline"
          >
            {business.phone}
          </a>{' '}
          and we will point you the right way.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link to="/" className={btn('primary', 'lg')}>
            Back to homepage
          </Link>
          <Link to="/services" className={btn('secondary', 'lg')}>
            Browse all services
          </Link>
        </div>
      </div>

      <div className="mx-auto mt-14 max-w-3xl">
        <h2 className="text-center text-sm font-bold uppercase tracking-wider text-muted">
          Popular pages
        </h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {suggestions.map((service) => (
            <li key={service.slug}>
              <Link
                to="/services/$serviceSlug"
                params={{ serviceSlug: service.slug }}
                className="flex items-center gap-3 rounded-card border border-line bg-white p-4 shadow-card transition-colors hover:border-brand-200 hover:bg-brand-50/40"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-600">
                  <Icon name="bolt" size={20} />
                </span>
                <span className="flex-1 font-semibold text-ink">{service.label}</span>
                <Icon name="chevron-right" size={18} className="text-line-strong" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
