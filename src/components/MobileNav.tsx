import { useEffect, useRef } from 'react'
import { Link } from '@tanstack/react-router'
import { AppLink } from './AppLink'
import { Icon } from './Icon'
import { Logo } from './Logo'
import { btn } from './ui'
import { primaryNav } from './nav'
import { business } from '~/content/business'
import { trackEstimate, trackPhone } from '~/lib/analytics'
import { cx } from '~/lib/format'

/**
 * Full-screen mobile menu. Closes on Escape and on navigation, locks background
 * scroll while open, and moves focus to the close button so keyboard and screen
 * reader users land inside the dialog rather than behind it.
 */
export function MobileNav({ open, onClose }: { open: boolean; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [open, onClose])

  return (
    <div
      id="mobile-nav"
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      hidden={!open}
      className={cx(
        'fixed inset-0 z-50 flex flex-col bg-white lg:hidden',
        !open && 'pointer-events-none',
      )}
    >
      <div className="flex h-[4.5rem] shrink-0 items-center justify-between border-b border-line px-5">
        <Logo compact />
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="grid h-11 w-11 place-items-center rounded-btn border border-line-strong text-ink transition-colors hover:bg-surface"
        >
          <Icon name="close" size={22} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-4">
        <nav aria-label="Primary mobile">
          <ul className="divide-y divide-line">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <AppLink
                  to={item.href}
                  onClick={onClose}
                  className="flex items-center justify-between py-3.5 text-lg font-semibold text-ink data-[status=active]:text-brand-700"
                >
                  {item.label}
                  <Icon name="chevron-right" size={18} className="text-line-strong" />
                </AppLink>
              </li>
            ))}
          </ul>
        </nav>

        {business.emergency.enabled ? (
          <a
            href={business.emergencyPhoneHref}
            onClick={() => {
              trackPhone('mobile_nav_emergency', true)
              onClose()
            }}
            className="mt-6 flex items-start gap-3 rounded-card border border-accent-200 bg-accent-50 p-4"
          >
            <Icon name="bolt-alert" size={22} className="mt-0.5 shrink-0 text-accent-700" />
            <span>
              <span className="block text-sm font-bold text-accent-900">
                Electrical emergency? Call 24/7
              </span>
              <span className="mt-0.5 block text-lg font-bold text-accent-800">
                {business.emergencyPhone}
              </span>
            </span>
          </a>
        ) : null}
      </div>

      <div className="grid shrink-0 grid-cols-2 gap-2.5 border-t border-line bg-surface px-5 py-4">
        <a
          href={business.phoneHref}
          onClick={() => {
            trackPhone('mobile_nav')
            onClose()
          }}
          className={btn('secondary', 'lg')}
        >
          <Icon name="phone" size={18} />
          Call Now
        </a>
        <Link
          to="/request-estimate"
          onClick={() => {
            trackEstimate('mobile_nav')
            onClose()
          }}
          className={btn('cta', 'lg')}
        >
          Get a Free Quote
        </Link>
      </div>
    </div>
  )
}
