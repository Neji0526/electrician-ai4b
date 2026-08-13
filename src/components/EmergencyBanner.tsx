import { Link } from 'react-router'
import { Icon } from './Icon'
import { btn } from './ui'
import { business } from '~/content/business'
import { trackPhone } from '~/lib/analytics'
import { cx } from '~/lib/format'

const EMERGENCY_SIGNS = [
  'Burning smell or smoke',
  'Sparking outlet or switch',
  'Panel warm to the touch',
  'Partial or total power loss',
  'Buzzing from a wall or panel',
  'Storm damage to the service',
  'Repeated instant breaker trips',
  'Exposed or damaged wiring',
] as const

/**
 * Homepage / service page emergency block.
 *
 * Deliberately restrained: amber accents and a clear status indicator rather
 * than a red alarm treatment. It should read as "we are available", not as a
 * warning the visitor has done something wrong.
 */
export function EmergencyBanner({ className }: { className?: string }) {
  if (!business.emergency.enabled) return null

  return (
    <section
      aria-labelledby="emergency-heading"
      className={cx('bg-ink text-white', className)}
    >
      <div className="container-page py-14 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:items-start">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-accent-500/15 px-3 py-1.5 text-sm font-bold text-accent-300 ring-1 ring-accent-500/30">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-400" />
              </span>
              Available now — {business.emergency.availabilityMessage}
            </span>

            <h2 id="emergency-heading" className="mt-5 text-2xl leading-tight text-white md:text-[2.125rem]">
              Electrical emergency in {business.address.city}? We answer 24/7.
            </h2>

            <p className="mt-4 max-w-xl text-[1.0625rem] leading-relaxed text-slate-300">
              {business.emergency.responseTime} You will talk to a licensed electrician, not an
              answering service — and the first thing we do is tell you what to shut off.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={business.emergencyPhoneHref}
                onClick={() => trackPhone('emergency_banner', true)}
                className={btn('emergency', 'lg', 'text-lg')}
              >
                <Icon name="phone" size={20} />
                {business.emergencyPhone}
              </a>
              <Link
                to="/emergency-electrician"
                className="inline-flex items-center gap-1.5 px-1 py-2 font-semibold text-white underline-offset-4 hover:underline"
              >
                What to do before we arrive
                <Icon name="arrow-right" size={17} />
              </Link>
            </div>
          </div>

          <div className="rounded-panel border border-white/12 bg-white/[0.06] p-6">
            <p className="text-sm font-bold uppercase tracking-wider text-accent-300">
              Call immediately if you have
            </p>
            <ul className="mt-4 grid gap-x-5 gap-y-2.5 sm:grid-cols-2">
              {EMERGENCY_SIGNS.map((sign) => (
                <li key={sign} className="flex items-start gap-2 text-[0.9375rem] text-slate-200">
                  <Icon name="bolt" size={15} className="mt-1 shrink-0 text-accent-400" />
                  {sign}
                </li>
              ))}
            </ul>
            <p className="mt-5 border-t border-white/12 pt-4 text-sm text-slate-400">
              If there is fire, smoke, or water touching live equipment, call 911 first. We are the
              second call.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

/** One-line inline variant for the top of service detail pages. */
export function EmergencyInlineBanner() {
  if (!business.emergency.enabled) return null
  return (
    <div className="flex flex-col gap-3 rounded-card border border-accent-200 bg-accent-50 p-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="flex items-start gap-2.5 text-[0.9375rem] text-accent-900">
        <Icon name="bolt-alert" size={20} className="mt-0.5 shrink-0 text-accent-700" />
        <span>
          <span className="font-bold">This is an emergency service.</span> If it is happening right
          now, do not wait for a callback.
        </span>
      </p>
      <a
        href={business.emergencyPhoneHref}
        onClick={() => trackPhone('service_inline_emergency', true)}
        className={btn('emergency', 'md', 'shrink-0')}
      >
        <Icon name="phone" size={17} />
        {business.emergencyPhone}
      </a>
    </div>
  )
}
