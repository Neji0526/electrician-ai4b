import { Fragment } from 'react'
import { AppLink } from './AppLink'
import { Icon } from './Icon'
import { cx } from '~/lib/format'

export interface Crumb {
  label: string
  href: string
}

/**
 * `trail` should include Home and every ancestor. The final item is the current
 * page and renders as plain text with aria-current.
 */
export function Breadcrumbs({
  trail,
  className,
  tone = 'dark',
}: {
  trail: Crumb[]
  className?: string
  tone?: 'dark' | 'light'
}) {
  return (
    <nav aria-label="Breadcrumb" className={cx('text-sm', className)}>
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
        {trail.map((crumb, i) => {
          const isLast = i === trail.length - 1
          return (
            <Fragment key={crumb.href}>
              <li className="flex items-center">
                {isLast ? (
                  <span
                    aria-current="page"
                    className={cx(
                      'font-semibold',
                      tone === 'light' ? 'text-white' : 'text-ink',
                    )}
                  >
                    {crumb.label}
                  </span>
                ) : (
                  <AppLink
                    to={crumb.href}
                    className={cx(
                      'underline-offset-2 hover:underline',
                      tone === 'light' ? 'text-brand-100' : 'text-muted hover:text-brand-700',
                    )}
                  >
                    {crumb.label}
                  </AppLink>
                )}
              </li>
              {!isLast ? (
                <li aria-hidden="true" className={tone === 'light' ? 'text-brand-300' : 'text-line-strong'}>
                  <Icon name="chevron-right" size={14} />
                </li>
              ) : null}
            </Fragment>
          )
        })}
      </ol>
    </nav>
  )
}
