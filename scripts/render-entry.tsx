/**
 * Render harness for the smoke test. Not shipped to the browser.
 *
 * The app is a client-rendered SPA, so there is no server bundle to point a
 * test at — but "every page still renders with a title, one H1 and its
 * structured data" is exactly the assertion worth keeping. React Router's
 * static handler runs the real route table, loaders and all, in Node.
 *
 * Built on demand by `npm run smoke` (see package.json), never by `npm run
 * build`.
 */
import { renderToStaticMarkup } from 'react-dom/server'
import { createStaticHandler, createStaticRouter, StaticRouterProvider } from 'react-router'

import { routes } from '~/routes'

const ORIGIN = 'https://www.hillcountryelectric.com'

export interface RenderResult {
  status: number
  html: string
}

export async function renderRoute(path: string): Promise<RenderResult> {
  const handler = createStaticHandler(routes)
  const context = await handler.query(new Request(`${ORIGIN}${path}`))

  // A loader that redirected rather than rendered.
  if (context instanceof Response) {
    return { status: context.status, html: '' }
  }

  const router = createStaticRouter(handler.dataRoutes, context)
  const html = renderToStaticMarkup(
    <StaticRouterProvider router={router} context={context} hydrate={false} />,
  )

  return { status: context.statusCode, html }
}
