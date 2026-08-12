/**
 * SSR smoke test.
 *
 * Imports the built server handler and renders every route in-process, then
 * asserts the things that actually matter for this site: the page rendered,
 * it has exactly one H1, it carries a canonical URL and structured data, and
 * the phone number is present in the server HTML (not injected after hydration).
 *
 *   npm run build && npm run smoke
 */
import { readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const ORIGIN = 'https://www.hillcountryelectric.com'
const PHONE = '(512) 555-0142'

// Windows absolute paths must be file:// URLs for the ESM loader.
const server = await import(pathToFileURL(join(root, 'dist/server/server.js')).href)
const handler = server.default ?? server

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

routes.push('/this-page-does-not-exist')

let failures = 0
const rows = []

/* --------------------------------------------------------------------------
   `src/content/directory.ts` duplicates a handful of slugs so the shell chunk
   stays small. Assert it still matches the real content.
   -------------------------------------------------------------------------- */
{
  const directory = readFileSync(join(root, 'src/content/directory.ts'), 'utf8')
  const dirSlugs = [...directory.matchAll(/slug: '([^']+)'/g)].map((m) => m[1])
  const known = new Set([
    ...readSlugs('services.ts', 'slug'),
    ...readSlugs('areas.ts', 'slug'),
  ])
  const orphans = dirSlugs.filter((slug) => !known.has(slug))
  const areaSlugs = readSlugs('areas.ts', 'slug')
  const missingAreas = areaSlugs.filter((slug) => !dirSlugs.includes(slug))

  if (orphans.length) {
    failures++
    rows.push(`FAIL  directory.ts references unknown slugs: ${orphans.join(', ')}`)
  }
  if (missingAreas.length) {
    failures++
    rows.push(`FAIL  directory.ts is missing service areas: ${missingAreas.join(', ')}`)
  }
  if (!orphans.length && !missingAreas.length) {
    rows.push(`ok    directory.ts in sync (${dirSlugs.length} entries)`)
  }
}

for (const path of routes) {
  const expectNotFound = path === '/this-page-does-not-exist'
  try {
    const response = await handler.fetch(new Request(`${ORIGIN}${path}`))
    const html = await response.text()

    const problems = []
    const h1s = [...html.matchAll(/<h1[\s>]/g)].length
    const ld = [...html.matchAll(/application\/ld\+json/g)].length
    const canonical = /rel="canonical"/.test(html)
    const title = html.match(/<title[^>]*>([^<]*)<\/title>/)?.[1] ?? ''
    const description = /name="description"/.test(html)

    const expectedStatus = expectNotFound ? 404 : 200
    if (response.status !== expectedStatus)
      problems.push(`status ${response.status}, expected ${expectedStatus}`)
    if (html.length < 5000) problems.push(`suspiciously short (${html.length}b)`)
    if (h1s !== 1) problems.push(`${h1s} h1 elements`)
    if (!title) problems.push('no <title>')
    if (!description) problems.push('no meta description')
    if (!expectNotFound) {
      if (!canonical) problems.push('no canonical')
      if (ld === 0) problems.push('no structured data')
      if (!html.includes(PHONE)) problems.push('phone number missing from SSR html')
      if (!/Request your free estimate|Free Estimate|Get a Free Estimate|Request my free estimate/i.test(html))
        problems.push('no estimate CTA')
    }
    if (expectNotFound && !/could not find that page/i.test(html)) {
      problems.push('404 page did not render')
    }

    if (problems.length) {
      failures++
      rows.push(`FAIL  ${path.padEnd(52)} ${problems.join('; ')}`)
    } else {
      rows.push(
        `ok    ${path.padEnd(52)} ${String(html.length).padStart(6)}b  ld=${ld}  ${title.slice(0, 46)}`,
      )
    }
  } catch (error) {
    failures++
    rows.push(`ERROR ${path.padEnd(52)} ${error.message}`)
  }
}

console.log(rows.join('\n'))
console.log(
  `\n${routes.length - failures}/${routes.length} routes rendered cleanly.` +
    (failures ? ` ${failures} FAILED.` : ''),
)

process.exit(failures ? 1 : 0)
