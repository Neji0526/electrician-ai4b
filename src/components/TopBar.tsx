import { Icon } from './Icon'
import { business } from '~/content/business'

/**
 * Utility bar above the header: emergency availability on the left, the
 * credibility line on the right. Hidden on small screens, where the sticky
 * action bar and the header call icon already cover it.
 */
export function TopBar() {
  return (
    <div className="hidden bg-brand-950 text-brand-100 md:block">
      <div className="container-page flex h-10 items-center justify-between gap-6 text-[0.8125rem]">
        {business.emergency.enabled ? (
          <p className="flex items-center gap-2 font-bold uppercase tracking-wide text-white">
            <Icon name="bolt" size={15} className="text-accent-400" />
            24/7 Emergency Service
          </p>
        ) : (
          <span />
        )}

        <p className="flex items-center gap-2.5">
          <span>Licensed &amp; Insured</span>
          <span aria-hidden="true" className="text-brand-700">
            •
          </span>
          <span>
            {business.rating.toFixed(1)} from {business.reviewCount.toLocaleString()}+ reviews
          </span>
          <Icon name="star" size={14} className="text-accent-400" />
        </p>
      </div>
    </div>
  )
}
