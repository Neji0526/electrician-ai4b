import { Link } from '@tanstack/react-router'
import { AppLink } from './AppLink'
import { Icon } from './Icon'
import { footerNav } from './nav'
import { business } from '~/content/business'
import { areaDirectory, serviceDirectory } from '~/content/directory'
import { trackPhone } from '~/lib/analytics'

const SOCIAL_ICONS: Record<string, string> = {
  Facebook: 'facebook',
  Instagram: 'instagram',
  'Google Business Profile': 'google',
}

export function Footer() {
  const year = new Date().getFullYear()
  const socials = business.social.filter((s) => SOCIAL_ICONS[s.label])

  return (
    <footer className="bg-brand-950 text-brand-100">
      {/* ----------------------------------------------------------- columns */}
      <div className="container-page py-12 md:py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12">
          {/* Identity */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2.5">
              <Icon name="bolt" size={26} className="shrink-0 text-accent-400" />
              <span className="flex flex-col text-sm font-extrabold uppercase leading-[1.05] tracking-tight text-white">
                <span>Hill Country</span>
                <span>Electric</span>
              </span>
            </div>
            <p className="mt-4 max-w-xs text-[0.9375rem] leading-relaxed text-brand-300">
              Reliable electrical services for homes and businesses in {business.address.city} and
              the surrounding Hill Country.
            </p>

            {socials.length ? (
              <ul className="mt-6 flex items-center gap-3">
                {socials.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="grid h-9 w-9 place-items-center rounded-lg bg-white/10 text-white transition-colors hover:bg-white/20"
                    >
                      <Icon name={SOCIAL_ICONS[social.label]} size={17} />
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          {/* Quick links */}
          <nav aria-labelledby="footer-quick" className="lg:col-span-2">
            <p id="footer-quick" className="text-sm font-bold text-white">
              Quick Links
            </p>
            <ul className="mt-4 space-y-2.5 text-[0.9375rem]">
              {footerNav.quickLinks.map((item) => (
                <li key={item.href}>
                  <AppLink
                    to={item.href}
                    className="text-brand-300 underline-offset-2 hover:text-white hover:underline"
                  >
                    {item.label}
                  </AppLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services */}
          <nav aria-labelledby="footer-services" className="lg:col-span-2">
            <p id="footer-services" className="text-sm font-bold text-white">
              Our Services
            </p>
            <ul className="mt-4 space-y-2.5 text-[0.9375rem]">
              {serviceDirectory.map((service) => (
                <li key={service.slug}>
                  <Link
                    to="/services/$serviceSlug"
                    params={{ serviceSlug: service.slug }}
                    className="text-brand-300 underline-offset-2 hover:text-white hover:underline"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/services"
                  className="font-semibold text-white underline-offset-2 hover:underline"
                >
                  View All Services
                </Link>
              </li>
            </ul>
          </nav>

          {/* Areas */}
          <nav aria-labelledby="footer-areas" className="lg:col-span-2">
            <p id="footer-areas" className="text-sm font-bold text-white">
              Service Areas
            </p>
            <ul className="mt-4 space-y-2.5 text-[0.9375rem]">
              {areaDirectory.slice(0, 5).map((area) => (
                <li key={area.slug}>
                  <Link
                    to="/service-areas/$locationSlug"
                    params={{ locationSlug: area.slug }}
                    className="text-brand-300 underline-offset-2 hover:text-white hover:underline"
                  >
                    {area.label}, {business.address.state}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/service-areas"
                  className="font-semibold text-white underline-offset-2 hover:underline"
                >
                  View All Areas
                </Link>
              </li>
            </ul>
          </nav>

          {/* Contact */}
          <div className="lg:col-span-2">
            <p className="text-sm font-bold text-white">Contact Us</p>
            <address className="mt-4 space-y-3 not-italic text-[0.9375rem]">
              <a
                href={business.phoneHref}
                onClick={() => trackPhone('footer')}
                className="flex items-start gap-2.5 font-bold text-white underline-offset-2 hover:underline"
              >
                <Icon name="phone" size={16} className="mt-0.5 shrink-0 text-accent-400" />
                {business.phone}
              </a>
              <a
                href={`mailto:${business.email}`}
                className="flex items-start gap-2.5 break-all text-brand-300 underline-offset-2 hover:text-white hover:underline"
              >
                <Icon name="mail" size={16} className="mt-0.5 shrink-0 text-accent-400" />
                {business.email}
              </a>
              <span className="flex items-start gap-2.5 text-brand-300">
                <Icon name="map-pin" size={16} className="mt-0.5 shrink-0 text-accent-400" />
                <span>
                  {business.address.street}
                  <br />
                  {business.address.city}, {business.address.state} {business.address.zip}
                </span>
              </span>
            </address>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- legal */}
      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-4 py-6 text-sm text-brand-400 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {business.legalName}. All rights reserved. {business.license.label}.
          </p>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {footerNav.legal.map((item) => (
              <li key={item.href}>
                <AppLink to={item.href} className="underline-offset-2 hover:text-white hover:underline">
                  {item.label}
                </AppLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
