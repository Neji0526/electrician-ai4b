import { useLoaderData, type Params } from 'react-router'

/**
 * `useLoaderData` typed against the route module's own loader.
 *
 * React Router returns `unknown` from `useLoaderData()`, so every page would
 * otherwise have to restate the shape its loader already describes. Call it as
 * `useRouteData<typeof loader>()` and the inference comes back for free.
 */
export function useRouteData<L extends (...args: never[]) => unknown>() {
  return useLoaderData() as Awaited<ReturnType<L>>
}

/**
 * Throw from a loader when the slug does not resolve to a record.
 *
 * React Router treats a thrown `Response` as a route error rather than a crash,
 * so it lands on the nearest `ErrorBoundary` — see `RouteError`, which renders
 * the 404 page for this and the generic error page for anything else.
 */
export function notFound(): never {
  throw new Response('Not Found', { status: 404 })
}

/**
 * Reads a path param the route pattern requires.
 *
 * `/services/:serviceSlug` cannot match without a slug, but React Router types
 * every param as optional. Treating a missing one as a 404 keeps that guarantee
 * enforced instead of asserted with `!`, and costs nothing — an unknown slug
 * already ends up on the same page.
 */
export function requireParam(params: Params, name: string): string {
  const value = params[name]
  if (!value) notFound()
  return value
}
