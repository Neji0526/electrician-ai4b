import { useEffect, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { Logo } from './Logo'
import { Icon } from './Icon'
import { MobileNav } from './MobileNav'
import { AppLink } from './AppLink'
import { btn } from './ui'
import { primaryNav } from './nav'
import { business } from '~/content/business'
import { trackEstimate, trackPhone } from '~/lib/analytics'
import { cx } from '~/lib/format'

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cx(
        'sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur',
        'transition-shadow duration-200',
        scrolled && 'shadow-header',
      )}
    >
      <div
        className={cx(
          'container-page flex items-center justify-between gap-4',
          'transition-[height] duration-200',
          scrolled ? 'h-16' : 'h-[4.5rem] lg:h-20',
        )}
      >
        <Logo compact={scrolled} />

        {/* Desktop navigation */}
        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-0.5">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <AppLink
                  to={item.href}
                  className={cx(
                    'block rounded-btn px-2.5 py-2 text-[0.9375rem] font-medium text-ink-soft',
                    'transition-colors hover:bg-brand-50 hover:text-brand-700',
                    'data-[status=active]:font-semibold data-[status=active]:text-brand-700',
                  )}
                >
                  {item.label}
                </AppLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop actions */}
        <div className="hidden items-center gap-2.5 lg:flex">
          <a
            href={business.phoneHref}
            onClick={() => trackPhone('header')}
            className="flex items-center gap-2 rounded-btn px-2 py-1.5 text-right transition-colors hover:bg-brand-50"
          >
            <Icon name="phone" size={18} className="text-brand-600" />
            <span className="flex flex-col leading-tight">
              <span className="text-[0.6875rem] font-semibold uppercase tracking-wide text-muted">
                Call us
              </span>
              <span className="text-[0.9375rem] font-bold text-ink">{business.phone}</span>
            </span>
          </a>
          <Link
            to="/request-estimate"
            onClick={() => trackEstimate('header')}
            className={btn('primary', 'md')}
          >
            Free Estimate
          </Link>
        </div>

        {/* Mobile actions */}
        <div className="flex items-center gap-1.5 lg:hidden">
          <a
            href={business.phoneHref}
            onClick={() => trackPhone('header_mobile')}
            aria-label={`Call ${business.name} at ${business.phone}`}
            className="grid h-11 w-11 place-items-center rounded-btn border border-line-strong text-brand-700 transition-colors hover:bg-brand-50"
          >
            <Icon name="phone" size={20} />
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            className="grid h-11 w-11 place-items-center rounded-btn border border-line-strong text-ink transition-colors hover:bg-surface"
          >
            <Icon name="menu" size={22} />
          </button>
        </div>
      </div>

      <MobileNav open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  )
}
