import type { ReactNode } from 'react'
import { Link } from 'react-router'

/**
 * An internal link whose destination is built from data.
 *
 * Breadcrumb trails, footer nav lists and the sitemap page take their paths
 * from content records rather than writing them inline, so they cannot be
 * checked against the route table. This wrapper marks those call sites as
 * deliberate and keeps their prop surface small.
 *
 * For navigation that needs an active state, use `NavLink` directly — see
 * `Header`.
 */
export interface AppLinkProps {
  to: string
  children: ReactNode
  className?: string
  title?: string
  id?: string
  'aria-label'?: string
  'aria-current'?: 'page' | 'true' | undefined
  onClick?: () => void
}

export function AppLink({ to, children, ...rest }: AppLinkProps) {
  return (
    <Link to={to} {...rest}>
      {children}
    </Link>
  )
}
