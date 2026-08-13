/**
 * Route smoke test.
 *
 * Renders every route through React Router's static handler — the real route
 * table, the real loaders — and asserts the things that actually matter for
 * this site: the page rendered, it has exactly one H1, it carries a canonical
 * URL and structured data, and the phone number and an estimate CTA are on it.
 *
 * Note what this does and does not prove now that the app is a client-rendered
 * SPA. It proves every page renders correctly and emits its metadata. It does
 * NOT prove a crawler sees any of that — nothing is in the served HTML until
 * JS runs. The harness is a test fixture, not a server.
 *
 *   npm run build && npm run smoke
 */
import { existsSync, readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const ORIGIN = 'https://www.hillcountryelectric.com'

// Derived from the content rather than hardcoded, so changing the business
// settings can never silently invalidate the assertions below.
const businessSource = readFileSync(join(root, 'src/content/business.ts'), 'utf8')
const PHONE = /^\s{2}phone: '([^']+)',$/m.exec(businessSource)?.[1]
if (!PHONE) throw new Error('Could not read the business phone number from business.ts')

const CTA =
  /Request your free estimate|Free Estimate|Free Quote|Get a Free Quote|Get a Free Estimate|Request my free estimate|Send My Request/i

// Windows absolute paths must be file:// URLs for the ESM loader.
const harnessPath = join(root, 'dist-render/render-entry.js')
if (!existsSync(harnessPath)) {
  throw new Error('Render harness missing. Run `npm run smoke`, which builds it first.')
}
const { renderRoute } = await import(pathToFileURL(harnessPath).href)

const routes = [
  '/',
  '/services',
  '/emergency-electrician',
  '/service-areas',
  '/projects',
  '/reviews',
  '/about',
  '/team',
  '/blog',
  '/faq',
  '/contact',
  '/request-estimate',
  '/sitemap',
  '/credits',
  '/privacy',
  '/terms',
]

// Add every dynamic route from the same content the pages render.
const readSlugs = (file, key) => {
  const source = readFileSync(join(root, 'src/content', file), 'utf8')
  return [...source.matchAll(new RegExp(`^\\s{4}${key}: '([^']+)',$`, 'gm'))].map((m) => m[1])
}

for (const slug of readSlugs('services.ts', 'slug')) routes.push(`/services/${slug}`)
for (const slug of readSlugs('areas.ts', 'slug')) routes.push(`/service-areas/${slug}`)
for (const slug of readSlugs('projects.ts', 'slug')) routes.push(`/projects/${slug}`)
for (const slug of readSlugs('posts.ts', 'slug')) routes.push(`/blog/${slug}`)

const sitemapRoutes = [...routes]
routes.push('/this-page-does-not-exist')

let failures = 0
const rows = []

const fail = (message) => {
  failures++
  rows.push(`FAIL  ${message}`)
}

/* --------------------------------------------------------------------------
   `src/content/directory.ts` duplicates a handful of slugs so the shell chunk
   stays small. Assert it still matches the real content.
   -------------------------------------------------------------------------- */
{
  const directory = readFileSync(join(root, 'src/content/directory.ts'), 'utf8')
  const dirSlugs = [...directory.matchAll(/slug: '([^']+)'/g)].map((m) => m[1])
  const known = new Set([...readSlugs('services.ts', 'slug'), ...readSlugs('areas.ts', 'slug')])
  const orphans = dirSlugs.filter((slug) => !known.has(slug))
  const areaSlugs = readSlugs('areas.ts', 'slug')
  const missingAreas = areaSlugs.filter((slug) => !dirSlugs.includes(slug))

  if (orphans.length) fail(`directory.ts references unknown slugs: ${orphans.join(', ')}`)
  if (missingAreas.length) fail(`directory.ts is missing service areas: ${missingAreas.join(', ')}`)
  if (!orphans.length && !missingAreas.length) {
    rows.push(`ok    directory.ts in sync (${dirSlugs.length} entries)`)
  }
}

/* --------------------------------------------------------------------------
   The production build is what actually ships. Check it exists and that its
   sitemap covers exactly the routes the content implies — the page list in
   vite.config.ts is maintained by hand and is the most likely thing to drift.
   -------------------------------------------------------------------------- */
{
  const indexHtml = join(root, 'dist/index.html')
  const sitemapXml = join(root, 'dist/sitemap.xml')

  if (!existsSync(indexHtml)) {
    fail('dist/index.html missing — run `npm run build` first')
  } else {
    const html = readFileSync(indexHtml, 'utf8')
    if (!/<div id="root"/.test(html)) fail('dist/index.html has no #root mount point')
    else if (!/<script type="module"[^>]*src="\/assets\//.test(html))
      fail('dist/index.html does not load a hashed entry bundle')
    else rows.push('ok    dist/index.html mounts #root and loads the entry bundle')
  }

  if (!existsSync(sitemapXml)) {
    fail('dist/sitemap.xml missing — the sitemap plugin did not run')
  } else {
    const xml = readFileSync(sitemapXml, 'utf8')
    const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) =>
      m[1].replace(ORIGIN, '').replace(/^$/, '/'),
    )
    const missing = sitemapRoutes.filter((p) => !locs.includes(p))
    const extra = locs.filter((p) => !sitemapRoutes.includes(p))

    if (missing.length) fail(`sitemap.xml is missing routes: ${missing.join(', ')}`)
    if (extra.length) fail(`sitemap.xml lists unknown routes: ${extra.join(', ')}`)
    if (!missing.length && !extra.length) {
      rows.push(`ok    sitemap.xml covers all ${locs.length} routes`)
    }
  }
}

/* --------------------------------------------------------------------------
   Render every route.
   -------------------------------------------------------------------------- */
for (const path of routes) {
  const expectNotFound = path === '/this-page-does-not-exist'
  try {
    const { status, html } = await renderRoute(path)

    const problems = []
    const h1s = [...html.matchAll(/<h1[\s>]/g)].length
    const ld = [...html.matchAll(/application\/ld\+json/g)].length
    const canonical = /rel="canonical"/.test(html)
    const title = html.match(/<title[^>]*>([^<]*)<\/title>/)?.[1] ?? ''
    const description = /name="description"/.test(html)

    const expectedStatus = expectNotFound ? 404 : 200
    if (status !== expectedStatus) problems.push(`status ${status}, expected ${expectedStatus}`)
    if (html.length < 5000) problems.push(`suspiciously short (${html.length}b)`)
    if (h1s !== 1) problems.push(`${h1s} h1 elements`)
    if (!title) problems.push('no <title>')
    if (!description) problems.push('no meta description')

    if (expectNotFound) {
      // A 404 that is indexable, or that leaves the previous page's title in
      // the tab, is worse than a 404.
      if (!/could not find that page/i.test(html)) problems.push('404 page did not render')
      if (!/content="noindex/.test(html)) problems.push('404 is not noindex')
      if (canonical) problems.push('404 declares a canonical URL')
    } else {
      if (!canonical) problems.push('no canonical')
      if (ld === 0) problems.push('no structured data')
      if (!html.includes(PHONE)) problems.push('phone number missing')
      if (!CTA.test(html)) problems.push('no estimate CTA')
    }

    if (problems.length) {
      fail(`${path.padEnd(52)} ${problems.join('; ')}`)
    } else {
      rows.push(
        `ok    ${path.padEnd(52)} ${String(html.length).padStart(6)}b  ld=${ld}  ${title.slice(0, 46)}`,
      )
    }
  } catch (error) {
    fail(`${path.padEnd(52)} ${error.message}`)
  }
}

console.log(rows.join('\n'))
console.log(
  `\n${routes.length} routes checked.` + (failures ? ` ${failures} FAILED.` : ' All clean.'),
)

process.exit(failures ? 1 : 0)
