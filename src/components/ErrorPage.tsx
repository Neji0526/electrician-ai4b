import { Link } from '@tanstack/react-router'
import { Icon } from './Icon'
import { btn } from './ui'
import { business } from '~/content/business'
import { trackPhone } from '~/lib/analytics'

/**
 * Route error boundary. A visitor who hits this still needs the phone number —
 * that is the entire point of the site, so it stays on screen.
 */
export function ErrorPage({ error }: { error: Error }) {
  return (
    <div className="container-page py-20 md:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-accent-50 text-accent-700">
          <Icon name="warning" size={28} />
        </span>

        <h1 className="mt-6 text-[2rem] leading-tight md:text-[2.5rem]">
          Something went wrong on our end
        </h1>
        <p className="mt-4 text-[1.0625rem] leading-relaxed text-ink-soft">
          Sorry about that. Try reloading the page — and if you need an electrician right now, the
          phone works regardless.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <a
            href={business.phoneHref}
            onClick={() => trackPhone('error_page')}
            className={btn('primary', 'lg')}
          >
            <Icon name="phone" size={18} />
            {business.phone}
          </a>
          <Link to="/" className={btn('secondary', 'lg')}>
            Back to homepage
          </Link>
        </div>

        {import.meta.env.DEV && error?.message ? (
          <pre className="mt-10 overflow-x-auto rounded-card border border-line bg-surface p-4 text-left text-sm text-ink-soft">
            {error.message}
          </pre>
        ) : null}
      </div>
    </div>
  )
}
