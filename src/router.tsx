import { createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import { NotFound } from './components/NotFound'
import { ErrorPage } from './components/ErrorPage'

export function getRouter() {
  return createRouter({
    routeTree,
    // Prefetch on hover/touch-start. The pages are small and mostly static, so
    // navigation feels instant without speculatively loading the whole site.
    defaultPreload: 'intent',
    defaultPreloadStaleTime: 30_000,
    scrollRestoration: true,
    defaultNotFoundComponent: NotFound,
    defaultErrorComponent: ErrorPage,
  })
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>
  }
}
