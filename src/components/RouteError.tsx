import { isRouteErrorResponse, useRouteError } from 'react-router'

import { NotFound } from './NotFound'
import { ErrorPage } from './ErrorPage'

/**
 * Single error boundary for every route.
 *
 * A 404 thrown by a loader (`notFound()`) is an expected outcome, not a fault,
 * so it gets the helpful not-found page. Everything else is a real failure and
 * gets the error page — which still shows the phone number, because a visitor
 * who hits a broken page is exactly the one most likely to just call.
 */
export function RouteError() {
  const error = useRouteError()

  if (isRouteErrorResponse(error) && error.status === 404) return <NotFound />

  return <ErrorPage error={error instanceof Error ? error : new Error(String(error))} />
}
