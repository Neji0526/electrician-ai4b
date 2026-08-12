import { Link } from '@tanstack/react-router'
import { Icon } from './Icon'
import { business } from '~/content/business'
import { trackEstimate, trackPhone } from '~/lib/analytics'

/**
 * Persistent mobile conversion bar. Two actions only — adding a third is what
 * turns a helpful bar into a nuisance.
 *
 * The spacer below it keeps the bar from covering the end of the footer.
 */
export function MobileActionBar() {
  return (
    <>
      <div aria-hidden="true" className="h-[4.5rem] lg:hidden" />
      <div className="no-print fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/97 backdrop-blur lg:hidden">
        <div className="grid grid-cols-2 gap-2.5 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3">
          <a
            href={business.phoneHref}
            onClick={() => trackPhone('mobile_action_bar')}
            className="flex min-h-12 items-center justify-center gap-2 rounded-btn border border-brand-200 bg-brand-50 text-base font-bold text-brand-700"
          >
            <Icon name="phone" size={19} />
            Call Now
          </a>
          <Link
            to="/request-estimate"
            onClick={() => trackEstimate('mobile_action_bar')}
            className="flex min-h-12 items-center justify-center gap-2 rounded-btn bg-brand-600 text-base font-bold text-white"
          >
            Free Estimate
          </Link>
        </div>
      </div>
    </>
  )
}
