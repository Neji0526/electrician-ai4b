import type { ReactNode } from 'react'
import { Link } from '@tanstack/react-router'

/**
 * A loosely-typed internal link.
 *
 * Most navigation in the app uses TanStack's `<Link to="/services/$serviceSlug" params={…}>`
 * so paths stay type-checked against the route tree. This escape hatch exists
 * for the handful of places where the destination is a plain string built from
 * data — breadcrumb trails and CMS-driven nav lists — and keeps the cast in one
 * file rather than scattered through components.
 */
export interface AppLinkProps {
  to: string
  children: ReactNode
  className?: string
  title?: string
  id?: string
  hash?: string
  'aria-label'?: string
  'aria-current'?: 'page' | 'true' | undefined
  onClick?: () => void
}

export function AppLink({ to, children, ...rest }: AppLinkProps) {
  return (
    <Link to={to as never} {...rest}>
      {children}
    </Link>
  )
}
