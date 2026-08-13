import { fileURLToPath } from 'node:url'
import { defineConfig, type Plugin } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import viteReact from '@vitejs/plugin-react'

import { business } from './src/content/business.ts'
import { services } from './src/content/services.ts'
import { areas } from './src/content/areas.ts'
import { projects } from './src/content/projects.ts'
import { posts } from './src/content/posts.ts'

type ChangeFreq = 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'

interface SitemapPage {
  path: string
  priority: number
  changefreq: ChangeFreq
  lastmod?: string
}

const page = (
  path: string,
  priority: number,
  changefreq: ChangeFreq,
  lastmod?: string,
): SitemapPage => ({ path, priority, changefreq, ...(lastmod ? { lastmod } : {}) })

/**
 * The sitemap is derived from the same content the pages render, so a new
 * service or article can never silently fall out of it. These paths are the
 * contract with `src/routes.tsx`; `npm run smoke` fails if the two disagree.
 */
export const sitemapPages: SitemapPage[] = [
  page('/', 1.0, 'weekly'),
  page('/services', 0.9, 'monthly'),
  ...services.map((s) => page(`/services/${s.slug}`, 0.8, 'monthly')),
  page('/emergency-electrician', 0.9, 'monthly'),
  page('/service-areas', 0.8, 'monthly'),
  ...areas.map((a) => page(`/service-areas/${a.slug}`, 0.8, 'monthly')),
  page('/projects', 0.7, 'weekly'),
  ...projects.map((p) => page(`/projects/${p.slug}`, 0.6, 'yearly', p.completedOn)),
  page('/reviews', 0.7, 'weekly'),
  page('/about', 0.6, 'yearly'),
  page('/team', 0.5, 'yearly'),
  page('/blog', 0.7, 'weekly'),
  ...posts.map((p) => page(`/blog/${p.slug}`, 0.6, 'yearly', p.updatedOn ?? p.publishedOn)),
  page('/faq', 0.6, 'monthly'),
  page('/contact', 0.8, 'monthly'),
  page('/request-estimate', 0.9, 'monthly'),
  page('/sitemap', 0.3, 'weekly'),
  page('/credits', 0.2, 'yearly'),
  page('/privacy', 0.2, 'yearly'),
  page('/terms', 0.2, 'yearly'),
]

/**
 * Emits `sitemap.xml` alongside the built app.
 *
 * This used to come from the TanStack Start plugin. The app is a client-rendered
 * SPA now, so nothing else walks the routes — without this the file would simply
 * stop being produced, which is the kind of regression nobody notices until
 * rankings drop.
 */
function sitemap(pages: SitemapPage[], host: string): Plugin {
  let isSsrBuild = false

  return {
    name: 'hce:sitemap',
    apply: 'build',
    configResolved(config) {
      // `npm run smoke` does a separate SSR build of the render harness. That
      // one is a test artifact and has no business emitting a sitemap.
      isSsrBuild = Boolean(config.build.ssr)
    },
    generateBundle() {
      if (isSsrBuild) return

      const urls = pages
        .map((p) => {
          const parts = [
            `    <loc>${host}${p.path === '/' ? '/' : p.path}</loc>`,
            p.lastmod ? `    <lastmod>${p.lastmod}</lastmod>` : null,
            `    <changefreq>${p.changefreq}</changefreq>`,
            `    <priority>${p.priority.toFixed(1)}</priority>`,
          ].filter(Boolean)
          return `  <url>\n${parts.join('\n')}\n  </url>`
        })
        .join('\n')

      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
      })
    },
  }
}

export default defineConfig({
  resolve: {
    alias: {
      // `~` is declared in tsconfig `paths` for the editor and the type checker.
      // Vite resolves imports itself and does not read tsconfig paths, so the
      // alias has to be repeated here. Keep both in sync.
      '~': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    // Bind IPv4 explicitly. Vite prefers `::1` by default, which is refused on
    // some Windows hosts (EACCES) and makes the dev server look dead even
    // though it started fine.
    host: '127.0.0.1',
  },
  plugins: [
    tailwindcss(),
    viteReact(),
    sitemap(sitemapPages, business.seo.siteUrl),
  ],
  build: {
    // The site ships very little client JS; keep the warning threshold honest.
    chunkSizeWarningLimit: 400,
  },
})
