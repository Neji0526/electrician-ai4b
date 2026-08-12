import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'

import { business } from './src/content/business.ts'
import { services } from './src/content/services.ts'
import { areas } from './src/content/areas.ts'
import { projects } from './src/content/projects.ts'
import { posts } from './src/content/posts.ts'

type ChangeFreq = 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'

const page = (path: string, priority: number, changefreq: ChangeFreq, lastmod?: string) => ({
  path,
  sitemap: { priority, changefreq, ...(lastmod ? { lastmod } : {}) },
})

/**
 * The sitemap is derived from the same content the pages render, so a new
 * service or article can never silently fall out of it.
 */
const sitemapPages = [
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
  page('/privacy', 0.2, 'yearly'),
  page('/terms', 0.2, 'yearly'),
]

export default defineConfig({
  plugins: [
    tailwindcss(),
    tanstackStart({
      pages: sitemapPages,
      sitemap: {
        enabled: true,
        host: business.seo.siteUrl,
        outputPath: 'sitemap.xml',
      },
      // Every public page is content-driven and identical for all visitors, so
      // they are good candidates for build-time prerendering on top of SSR.
      // Enable this on a machine/CI runner that allows loopback HTTP — the
      // prerenderer drives a local server to capture each page.
      //   prerender: { enabled: true, concurrency: 4, crawlLinks: true, failOnError: true },
    }),
    viteReact(),
  ],
  build: {
    // The site ships very little client JS; keep the warning threshold honest.
    chunkSizeWarningLimit: 400,
  },
})
