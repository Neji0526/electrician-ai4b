/**
 * Downloads real, properly-licensed photography for the site's image slots and
 * writes the attribution file those licences require.
 *
 * SOURCE: Wikimedia Commons, via its public API (no key required). Results are
 * filtered to licences that permit commercial use — public domain, CC0, CC BY
 * and CC BY-SA — and every file's author, licence and source page is recorded
 * in `public/images/CREDITS.md` and rendered at /credits.
 *
 * NOT used: Google Images. Those results are indexed from third-party websites
 * and are copyrighted by default; using them on a commercial contractor site is
 * infringement, and stock agencies actively pursue it. Unsplash was the first
 * choice here but now blocks unauthenticated clients outright.
 *
 * NOT fetched: team portraits. Commons photographs are of real, identifiable
 * people — presenting one as a named licensed electrician is misrepresentation,
 * so those slots keep their labelled placeholders until real staff photos exist.
 *
 * Images are requested through Commons' thumbnailer at the width we render, so
 * nothing oversized ships and no local image processing is needed.
 *
 *   node scripts/fetch-photos.mjs            # everything
 *   node scripts/fetch-photos.mjs services   # only slots whose path matches
 */
import { execFile } from 'node:child_process'
import { mkdirSync, writeFileSync, statSync, existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const publicDir = join(root, 'public')

const args = process.argv.slice(2)
const force = args.includes('--force')
const filter = args.find((a) => !a.startsWith('--'))
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

/** Licences that permit commercial use. Anything else is rejected outright. */
const ALLOWED_LICENCE = /^(public domain|cc0|cc by(-sa)? \d|pd-|no restrictions)/i

/* ---------------------------------------------------------------- manifest */

const W = { service: 1200, project: 1200, blog: 1200, hero: 1400, og: 1200 }

const GROUPS = [
  {
    query: 'suburban house',
    slots: [{ file: 'images/home/hero-house.jpg', w: W.hero, pick: 0 }],
  },
  {
    query: 'electrical breaker panel',
    slots: [
      { file: 'images/services/electrical-panel-upgrades.jpg', w: W.service, pick: 0 },
      { file: 'images/services/circuit-breaker-repair.jpg', w: W.service, pick: 1 },
      { file: 'images/projects/crestview-federal-pacific-panel-replacement-before.jpg', w: W.project, pick: 2 },
      { file: 'images/projects/crestview-federal-pacific-panel-replacement-after.jpg', w: W.project, pick: 3 },
      { file: 'images/projects/cedar-park-battery-backup-subpanel-before.jpg', w: W.project, pick: 4 },
      { file: 'images/projects/cedar-park-battery-backup-subpanel-after.jpg', w: W.project, pick: 5 },
      { file: 'images/blog/how-much-does-an-electrical-panel-upgrade-cost.jpg', w: W.blog, pick: 6 },
      { file: 'images/blog/federal-pacific-panel-what-to-do.jpg', w: W.blog, pick: 7 },
      { file: 'images/blog/why-does-my-breaker-keep-tripping.jpg', w: W.blog, pick: 8 },
      { file: 'images/services/surge-protection.jpg', w: W.service, pick: 9 },
    ],
  },
  {
    query: 'electrician',
    slots: [
      { file: 'images/services/emergency-electrical-repair.jpg', w: W.service, pick: 0 },
      { file: 'images/services/electrical-inspections.jpg', w: W.service, pick: 1 },
      { file: 'images/projects/travis-heights-service-mast-storm-repair-before.jpg', w: W.project, pick: 2 },
      { file: 'images/projects/travis-heights-service-mast-storm-repair-after.jpg', w: W.project, pick: 3 },
      { file: 'images/og-default.jpg', w: W.og, pick: 4 },
    ],
  },
  {
    query: 'electrical wiring cable',
    slots: [
      { file: 'images/services/whole-home-rewiring.jpg', w: W.service, pick: 0 },
      { file: 'images/services/new-construction-wiring.jpg', w: W.service, pick: 1 },
      { file: 'images/projects/hyde-park-1926-bungalow-rewire-before.jpg', w: W.project, pick: 2 },
      { file: 'images/projects/hyde-park-1926-bungalow-rewire-after.jpg', w: W.project, pick: 3 },
      { file: 'images/projects/round-rock-aluminum-wiring-remediation-before.jpg', w: W.project, pick: 4 },
      { file: 'images/projects/round-rock-aluminum-wiring-remediation-after.jpg', w: W.project, pick: 5 },
      { file: 'images/blog/signs-your-home-needs-rewiring.jpg', w: W.blog, pick: 6 },
    ],
  },
  {
    query: 'electrical outlet',
    slots: [
      { file: 'images/services/outlet-and-switch-installation.jpg', w: W.service, pick: 0 },
      { file: 'images/blog/gfci-vs-afci-what-is-the-difference.jpg', w: W.blog, pick: 1 },
    ],
  },
  {
    query: 'ceiling fan',
    slots: [{ file: 'images/services/ceiling-fan-installation.jpg', w: W.service, pick: 0 }],
  },
  {
    query: 'recessed lighting',
    slots: [
      { file: 'images/services/lighting-installation.jpg', w: W.service, pick: 0 },
      { file: 'images/projects/allandale-kitchen-lighting-redesign-before.jpg', w: W.project, pick: 1 },
      { file: 'images/projects/allandale-kitchen-lighting-redesign-after.jpg', w: W.project, pick: 2 },
      { file: 'images/blog/recessed-lighting-layout-that-actually-works.jpg', w: W.blog, pick: 3 },
      { file: 'images/blog/why-are-my-lights-flickering.jpg', w: W.blog, pick: 4 },
    ],
  },
  {
    query: 'electric vehicle charging station',
    slots: [
      { file: 'images/services/ev-charger-installation.jpg', w: W.service, pick: 0 },
      { file: 'images/projects/mueller-dual-ev-charger-load-management-before.jpg', w: W.project, pick: 1 },
      { file: 'images/projects/mueller-dual-ev-charger-load-management-after.jpg', w: W.project, pick: 2 },
      { file: 'images/blog/can-i-install-an-ev-charger-at-home.jpg', w: W.blog, pick: 3 },
    ],
  },
  {
    query: 'smoke detector',
    slots: [{ file: 'images/services/smoke-and-co-detectors.jpg', w: W.service, pick: 0 }],
  },
  {
    query: 'diesel generator',
    slots: [
      { file: 'images/services/generator-installation.jpg', w: W.service, pick: 0 },
      { file: 'images/projects/lakeway-whole-home-generator-before.jpg', w: W.project, pick: 1 },
      { file: 'images/projects/lakeway-whole-home-generator-after.jpg', w: W.project, pick: 2 },
      { file: 'images/blog/standby-vs-portable-generator.jpg', w: W.blog, pick: 3 },
    ],
  },
  {
    query: 'restaurant interior',
    slots: [
      { file: 'images/services/commercial-electrical.jpg', w: W.service, pick: 0 },
      { file: 'images/projects/south-congress-restaurant-finish-out-before.jpg', w: W.project, pick: 1 },
      { file: 'images/projects/south-congress-restaurant-finish-out-after.jpg', w: W.project, pick: 2 },
      { file: 'images/blog/commercial-led-retrofit-payback.jpg', w: W.blog, pick: 3 },
    ],
  },
  {
    query: 'light switch',
    slots: [{ file: 'images/services/smart-home-electrical.jpg', w: W.service, pick: 0 }],
  },
  {
    query: 'workshop workbench',
    slots: [
      { file: 'images/projects/buda-shop-feeder-and-subpanel-before.jpg', w: W.project, pick: 0 },
      { file: 'images/projects/buda-shop-feeder-and-subpanel-after.jpg', w: W.project, pick: 1 },
    ],
  },
]

/* ----------------------------------------------------------------- fetching */

const UA = 'HillCountryElectricSiteBuild/1.0 (photo asset fetch; contact: hello@hillcountryelectric.com)'

function curl(args) {
  return new Promise((resolve, reject) => {
    execFile('curl', args, { maxBuffer: 96 * 1024 * 1024, encoding: 'buffer' }, (err, stdout) => {
      if (err) reject(new Error(String(err.message).split(/\r?\n/)[0]))
      else resolve(stdout)
    })
  })
}

const stripTags = (html) =>
  String(html ?? '')
    .replace(/<[^>]*>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim()

async function search(query, width, need) {
  const url =
    'https://commons.wikimedia.org/w/api.php?action=query&format=json' +
    `&generator=search&gsrsearch=${encodeURIComponent(`filetype:bitmap ${query}`)}` +
    `&gsrnamespace=6&gsrlimit=${Math.max(need + 12, 20)}` +
    `&prop=imageinfo&iiprop=url|size|extmetadata&iiurlwidth=${width}`

  const out = await curl(['-s', '--fail', '--max-time', '60', '-A', UA, url])
  const json = JSON.parse(out.toString('utf8'))
  const pages = json?.query?.pages ?? {}

  return Object.values(pages)
    .map((page) => {
      const info = page.imageinfo?.[0]
      if (!info) return null
      const meta = info.extmetadata ?? {}
      return {
        title: page.title,
        thumburl: info.thumburl?.split('?')[0],
        width: info.width,
        height: info.height,
        licence: stripTags(meta.LicenseShortName?.value) || 'unknown',
        licenceUrl: stripTags(meta.LicenseUrl?.value),
        author: stripTags(meta.Artist?.value) || 'Unknown',
        describes: stripTags(meta.ImageDescription?.value).slice(0, 160),
        pageUrl: info.descriptionurl,
      }
    })
    .filter(Boolean)
    // Commercial-use licences only, and big enough to render sharply.
    .filter((p) => ALLOWED_LICENCE.test(p.licence) && p.width >= 800 && p.thumburl)
    // JPEG only. On Commons, PNG/SVG files are overwhelmingly diagrams, scans
    // and paintings rather than photographs — and they are far heavier per pixel.
    .filter((p) => /\.jpe?g$/i.test(p.title))
    // Prefer a natural landscape crop (~3:2). Sorting purely by widest picked
    // panoramas, which look wrong in a 4:3 card.
    .sort(
      (a, b) => Math.abs(a.width / a.height - 1.45) - Math.abs(b.width / b.height - 1.45),
    )
}

async function download(photo, slot) {
  const full = join(publicDir, slot.file)
  mkdirSync(dirname(full), { recursive: true })
  await curl(['-s', '--fail', '--max-time', '120', '-A', UA, '-o', full, photo.thumburl])
  const bytes = statSync(full).size
  if (bytes < 4000) throw new Error(`suspiciously small download (${bytes}b)`)
  return bytes
}

/* -------------------------------------------------------------------- run */

const credits = []
const failures = []

for (const group of GROUPS) {
  const slots = filter ? group.slots.filter((s) => s.file.includes(filter)) : group.slots
  if (!slots.length) continue

  let results
  try {
    results = await search(group.query, Math.max(...slots.map((s) => s.w)), slots.length)
  } catch (error) {
    slots.forEach((s) => failures.push(`${s.file} — ${error.message}`))
    continue
  }

  if (!results.length) {
    slots.forEach((s) => failures.push(`${s.file} — no commercially-licensed results`))
    continue
  }

  console.log(`\n${group.query}  (${results.length} usable)`)

  for (const [i, slot] of slots.entries()) {
    if (!force && existsSync(join(publicDir, slot.file))) {
      console.log(`  ${slot.file.padEnd(62)} (already present, skipped)`)
      continue
    }
    const photo = results[slot.pick] ?? results[i % results.length]
    try {
      const bytes = await download(photo, slot)
      credits.push({ file: `/${slot.file}`, query: group.query, bytes, ...photo })
      console.log(`  ${slot.file.padEnd(62)} ${Math.round(bytes / 1024)}kB  ${photo.licence}`)
    } catch (error) {
      failures.push(`${slot.file} — ${error.message}`)
    }
    await sleep(150)
  }
  await sleep(250)
}

/* ------------------------------------------------------------- attribution */

if (credits.length) {
  writeFileSync(
    join(root, 'src/content/photo-credits.json'),
    `${JSON.stringify(
      credits.map(({ file, author, licence, licenceUrl, pageUrl, title, describes }) => ({
        file,
        title: title.replace(/^File:/, ''),
        author,
        licence,
        licenceUrl,
        pageUrl,
        describes,
      })),
      null,
      2,
    )}\n`,
    'utf8',
  )

  const lines = [
    '# Photo credits',
    '',
    'Photography sourced from [Wikimedia Commons](https://commons.wikimedia.org) under',
    'licences that permit commercial use. CC BY and CC BY-SA **require** attribution, so',
    'this list is also rendered on the site at `/credits` and linked from the footer.',
    '',
    'Regenerate with `node scripts/fetch-photos.mjs`.',
    '',
    '> **Before launch:** `describes` is the uploader’s own description. Check it against',
    '> the `alt` text in `src/content/*`, which was written for the *intended* photograph.',
    '',
    '| File | Author | Licence | Source |',
    '| --- | --- | --- | --- |',
    ...credits.map(
      (c) =>
        `| \`${c.file}\` | ${c.author.replace(/\|/g, '\\|').slice(0, 60)} | ${c.licence} | [Commons](${c.pageUrl}) |`,
    ),
    '',
  ]
  writeFileSync(join(publicDir, 'images/CREDITS.md'), lines.join('\n'), 'utf8')
}

console.log(`\n${credits.length} photos downloaded.`)
if (failures.length) {
  console.log(`${failures.length} FAILED (the .svg placeholder is still in place):`)
  failures.forEach((f) => console.log(`  - ${f}`))
}
process.exit(failures.length ? 1 : 0)
