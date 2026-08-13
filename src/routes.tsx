import type { RouteObject } from 'react-router'

import { RootLayout } from './components/RootLayout'
import { RouteError } from './components/RouteError'

/**
 * The route table.
 *
 * Every page is `lazy`-loaded, so each route ships as its own chunk and the
 * initial download stays close to the shell plus whichever page was asked for.
 * The lazy module exports the route's `Component` and (where it needs data) its
 * `loader`; React Router picks both up by name.
 *
 * Paths here are the contract with `vite.config.ts`, which builds `sitemap.xml`
 * from the same content the pages render. Adding a route means adding it in
 * both places — `npm run smoke` fails if they disagree.
 */
export const routes: RouteObject[] = [
  {
    path: '/',
    Component: RootLayout,
    ErrorBoundary: RouteError,
    children: [
      { index: true, lazy: () => import('./routes/home') },

      { path: 'services', lazy: () => import('./routes/services-list') },
      { path: 'services/:serviceSlug', lazy: () => import('./routes/service-detail') },
      { path: 'emergency-electrician', lazy: () => import('./routes/emergency-electrician') },

      { path: 'service-areas', lazy: () => import('./routes/areas-list') },
      { path: 'service-areas/:locationSlug', lazy: () => import('./routes/area-detail') },

      { path: 'projects', lazy: () => import('./routes/projects-list') },
      { path: 'projects/:projectSlug', lazy: () => import('./routes/project-detail') },

      { path: 'blog', lazy: () => import('./routes/blog-list') },
      { path: 'blog/:articleSlug', lazy: () => import('./routes/article-detail') },

      { path: 'reviews', lazy: () => import('./routes/reviews') },
      { path: 'about', lazy: () => import('./routes/about') },
      { path: 'team', lazy: () => import('./routes/team') },
      { path: 'faq', lazy: () => import('./routes/faq') },
      { path: 'contact', lazy: () => import('./routes/contact') },
      { path: 'request-estimate', lazy: () => import('./routes/request-estimate') },

      { path: 'sitemap', lazy: () => import('./routes/sitemap') },
      { path: 'credits', lazy: () => import('./routes/credits') },
      { path: 'privacy', lazy: () => import('./routes/privacy') },
      { path: 'terms', lazy: () => import('./routes/terms') },

      // Anything else renders the 404 page through the same boundary that
      // handles a loader throwing `notFound()`, so both look identical.
      {
        path: '*',
        loader: () => {
          throw new Response('Not Found', { status: 404 })
        },
      },
    ],
  },
]
