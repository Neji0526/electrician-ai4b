import { Link } from '@tanstack/react-router'
import { AppLink } from './AppLink'
import { Icon } from './Icon'
import { RatingStars } from './RatingStars'
import { footerNav } from './nav'
import { business } from '~/content/business'
import { areaDirectory, serviceDirectory } from '~/content/directory'
import { trackPhone } from '~/lib/analytics'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-brand-800 bg-brand-900 text-brand-100">
      <div className="container-page py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12">
          {/* Identity */}
          <div className="lg:col-span-4">
            <p className="text-lg font-extrabold text-white">{business.name}</p>
            <p className="mt-3 max-w-sm text-[0.9375rem] leading-relaxed text-brand-200">
              {business.tagline}. Family-owned since {business.founded}.
            </p>

            <div className="mt-5 flex items-center gap-2.5">
              <RatingStars rating={business.rating} tone="light" size={17} />
              <span className="text-sm text-brand-200">
                <span className="font-bold text-white">{business.rating}</span> from{' '}
                {business.reviewCount} reviews
              </span>
            </div>

            <address className="mt-6 space-y-3 not-italic text-[0.9375rem]">
              <a
                href={business.phoneHref}
                onClick={() => trackPhone('footer')}
                className="flex items-center gap-2.5 font-bold text-white underline-offset-2 hover:underline"
              >
                <Icon name="phone" size={17} className="text-brand-300" />
                {business.phone}
              </a>
              <a
                href={`mailto:${business.email}`}
                className="flex items-center gap-2.5 text-brand-100 underline-offset-2 hover:text-white hover:underline"
              >
                <Icon name="mail" size={17} className="text-brand-300" />
                {business.email}
              </a>
              <span className="flex items-start gap-2.5 text-brand-200">
                <Icon name="map-pin" size={17} className="mt-0.5 shrink-0 text-brand-300" />
                <span>
                  {business.address.street}
                  <br />
                  {business.address.city}, {business.address.state} {business.address.zip}
                </span>
              </span>
            </address>
          </div>

          {/* Services */}
          <nav aria-labelledby="footer-services" className="lg:col-span-3">
            <p id="footer-services" className="text-sm font-bold uppercase tracking-wider text-white">
              Popular services
            </p>
            <ul className="mt-4 space-y-2.5 text-[0.9375rem]">
              {serviceDirectory.map((service) => (
                <li key={service.slug}>
                  <Link
                    to="/services/$serviceSlug"
                    params={{ serviceSlug: service.slug }}
                    className="text-brand-200 underline-offset-2 hover:text-white hover:underline"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/services"
                  className="inline-flex items-center gap-1 font-semibold text-white underline-offset-2 hover:underline"
                >
                  All services
                  <Icon name="arrow-right" size={15} />
                </Link>
              </li>
            </ul>
          </nav>

          {/* Company */}
          <nav aria-labelledby="footer-company" className="lg:col-span-2">
            <p id="footer-company" className="text-sm font-bold uppercase tracking-wider text-white">
              Company
            </p>
            <ul className="mt-4 space-y-2.5 text-[0.9375rem]">
              {footerNav.company.map((item) => (
                <li key={item.href}>
                  <AppLink
                    to={item.href}
                    className="text-brand-200 underline-offset-2 hover:text-white hover:underline"
                  >
                    {item.label}
                  </AppLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Support + areas */}
          <div className="lg:col-span-3">
            <nav aria-labelledby="footer-support">
              <p id="footer-support" className="text-sm font-bold uppercase tracking-wider text-white">
                Get in touch
              </p>
              <ul className="mt-4 space-y-2.5 text-[0.9375rem]">
                {footerNav.support.slice(0, 4).map((item) => (
                  <li key={item.href}>
                    <AppLink
                      to={item.href}
                      className="text-brand-200 underline-offset-2 hover:text-white hover:underline"
                    >
                      {item.label}
                    </AppLink>
                  </li>
                ))}
              </ul>
            </nav>

            <p className="mt-7 text-sm font-bold uppercase tracking-wider text-white">Areas served</p>
            <ul className="mt-3 flex flex-wrap gap-x-2 gap-y-1.5 text-sm">
              {areaDirectory.map((area, i) => (
                <li key={area.slug} className="flex items-center gap-2">
                  <Link
                    to="/service-areas/$locationSlug"
                    params={{ locationSlug: area.slug }}
                    className="text-brand-200 underline-offset-2 hover:text-white hover:underline"
                  >
                    {area.label}
                  </Link>
                  {i < areaDirectory.length - 1 ? (
                    <span aria-hidden="true" className="text-brand-700">
                      ·
                    </span>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Emergency strip */}
        {business.emergency.enabled ? (
          <div className="mt-12 flex flex-col gap-3 rounded-card border border-brand-700 bg-brand-950/60 p-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="flex items-center gap-3 text-[0.9375rem] text-brand-100">
              <Icon name="bolt-alert" size={22} className="shrink-0 text-accent-300" />
              <span>
                <span className="font-bold text-white">24/7 emergency electricians.</span>{' '}
                {business.emergency.bannerText}
              </span>
            </p>
            <a
              href={business.emergencyPhoneHref}
              onClick={() => trackPhone('footer_emergency', true)}
              className="shrink-0 rounded-btn bg-accent-500 px-5 py-2.5 text-center font-bold text-accent-900 transition-colors hover:bg-accent-400"
            >
              {business.emergencyPhone}
            </a>
          </div>
        ) : null}
      </div>

      {/* Legal */}
      <div className="border-t border-brand-800">
        <div className="container-page flex flex-col gap-4 py-6 text-sm text-brand-300 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {business.legalName}. {business.license.label}.
          </p>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {footerNav.support.slice(4).map((item) => (
              <li key={item.href}>
                <AppLink to={item.href} className="underline-offset-2 hover:text-white hover:underline">
                  {item.label}
                </AppLink>
              </li>
            ))}
            <li>
              <Link to="/sitemap" className="underline-offset-2 hover:text-white hover:underline">
                Sitemap
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
