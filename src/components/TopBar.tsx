import { Icon } from './Icon'
import { business } from '~/content/business'
import { trackPhone } from '~/lib/analytics'

/**
 * Utility bar above the header: where we work, whether we are available, and
 * the phone number. Hidden on small screens where the sticky action bar and
 * the header call icon already cover it.
 */
export function TopBar() {
  return (
    <div className="hidden border-b border-brand-800 bg-brand-900 text-brand-50 md:block">
      <div className="container-page flex h-10 items-center justify-between gap-6 text-[0.8125rem]">
        <div className="flex items-center gap-5">
          <span className="flex items-center gap-1.5">
            <Icon name="map-pin" size={15} className="text-brand-300" />
            Serving {business.serviceAreaSummary}
          </span>
        </div>

        <div className="flex items-center gap-5">
          {business.emergency.enabled ? (
            <span className="flex items-center gap-2">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full rounded-full bg-accent-300 opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-400" />
              </span>
              <span className="font-semibold text-accent-200">
                {business.emergency.availabilityMessage}
              </span>
            </span>
          ) : null}

          <a
            href={business.phoneHref}
            onClick={() => trackPhone('top_bar')}
            className="flex items-center gap-1.5 font-semibold text-white underline-offset-2 hover:underline"
          >
            <Icon name="phone" size={15} className="text-brand-300" />
            {business.phone}
          </a>
        </div>
      </div>
    </div>
  )
}
