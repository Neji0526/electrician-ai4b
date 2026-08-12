/**
 * Generates branded SVG placeholders for every image the site references.
 *
 * These exist so the layout, aspect ratios and alt text are all real and
 * testable before photography arrives. Each file is labelled with what belongs
 * there, so replacing them is a matter of dropping a JPG/WebP in at the same
 * path and updating the `src` in `src/content/*`.
 *
 *   npm run gen:placeholders
 */
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const publicDir = join(root, 'public')

const INK = '#0f1e33'
const BRAND = '#175bb4'
const BRAND_LIGHT = '#dbeafd'
const ACCENT = '#fbb02b'
const LINE = '#cfd8e3'

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

/** Wraps text to a column width and returns tspan lines. */
function wrap(text, maxChars) {
  const words = String(text).split(' ')
  const lines = []
  let line = ''
  for (const word of words) {
    if ((line + ' ' + word).trim().length > maxChars && line) {
      lines.push(line.trim())
      line = word
    } else {
      line = `${line} ${word}`.trim()
    }
  }
  if (line) lines.push(line)
  return lines
}

/** A repeating "conduit and junction box" motif so the placeholders read as electrical. */
function motif(w, h, tone) {
  const stroke = tone === 'dark' ? 'rgba(255,255,255,0.14)' : 'rgba(23,91,180,0.12)'
  const dot = tone === 'dark' ? 'rgba(251,176,43,0.35)' : 'rgba(23,91,180,0.18)'
  const step = 96
  const parts = []
  for (let x = step / 2; x < w; x += step) {
    for (let y = step / 2; y < h; y += step) {
      const isNode = ((x / step) | 0) % 3 === ((y / step) | 0) % 3
      parts.push(
        `<path d="M${x - 26} ${y} H${x + 26} M${x} ${y - 26} V${y + 26}" stroke="${stroke}" stroke-width="2" stroke-linecap="round"/>`,
      )
      if (isNode) parts.push(`<circle cx="${x}" cy="${y}" r="5" fill="${dot}"/>`)
    }
  }
  return parts.join('')
}

const BOLT =
  'M13.4 2 5.2 13.1a.55.55 0 0 0 .44.88h4.7l-1.2 8L18.8 10.6a.55.55 0 0 0-.44-.88h-4.7l1.2-7.72Z'

function svg({ width, height, label, caption, tone = 'light', tag }) {
  const bg = tone === 'dark' ? INK : '#f2f6fb'
  const panel = tone === 'dark' ? 'rgba(255,255,255,0.06)' : '#ffffff'
  const titleColor = tone === 'dark' ? '#ffffff' : INK
  const bodyColor = tone === 'dark' ? 'rgba(226,235,245,0.75)' : '#5b7089'
  const chipBg = tone === 'dark' ? 'rgba(251,176,43,0.18)' : BRAND_LIGHT
  const chipText = tone === 'dark' ? ACCENT : BRAND

  const titleSize = Math.round(width / 22)
  const bodySize = Math.round(width / 42)
  const lines = wrap(label, 30)
  const captionLines = caption ? wrap(caption, 52) : []

  const cardW = Math.round(width * 0.78)
  const cardH = Math.round(
    titleSize * 1.32 * lines.length + bodySize * 1.6 * captionLines.length + width * 0.14,
  )
  const cardX = (width - cardW) / 2
  const cardY = (height - cardH) / 2

  let textY = cardY + width * 0.075 + titleSize

  const titleTspans = lines
    .map((line, i) => {
      const y = textY + i * titleSize * 1.28
      return `<text x="${width / 2}" y="${y}" text-anchor="middle" font-family="system-ui, -apple-system, 'Segoe UI', sans-serif" font-size="${titleSize}" font-weight="700" fill="${titleColor}">${esc(line)}</text>`
    })
    .join('')

  textY += lines.length * titleSize * 1.28 + bodySize * 0.6

  const captionTspans = captionLines
    .map((line, i) => {
      const y = textY + i * bodySize * 1.55
      return `<text x="${width / 2}" y="${y}" text-anchor="middle" font-family="system-ui, -apple-system, 'Segoe UI', sans-serif" font-size="${bodySize}" fill="${bodyColor}">${esc(line)}</text>`
    })
    .join('')

  const chip = tag
    ? `<g transform="translate(${width / 2 - (String(tag).length * bodySize * 0.32 + 46) / 2}, ${cardY - bodySize * 2.6})">
         <rect width="${String(tag).length * bodySize * 0.64 + 46}" height="${bodySize * 2.1}" rx="${bodySize}" fill="${chipBg}"/>
         <g transform="translate(14, ${bodySize * 0.42}) scale(${bodySize / 20})"><path d="${BOLT}" fill="${chipText}"/></g>
         <text x="${bodySize * 1.9 + 8}" y="${bodySize * 1.42}" font-family="system-ui, -apple-system, 'Segoe UI', sans-serif" font-size="${bodySize * 0.92}" font-weight="700" letter-spacing="0.06em" fill="${chipText}">${esc(String(tag).toUpperCase())}</text>
       </g>`
    : ''

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="img" aria-label="${esc(label)}">
  <rect width="${width}" height="${height}" fill="${bg}"/>
  ${motif(width, height, tone)}
  <rect x="${cardX}" y="${cardY}" width="${cardW}" height="${cardH}" rx="18" fill="${panel}" stroke="${tone === 'dark' ? 'rgba(255,255,255,0.12)' : LINE}"/>
  ${chip}
  ${titleTspans}
  ${captionTspans}
</svg>
`
}

function write(relPath, contents) {
  const full = join(publicDir, relPath)
  mkdirSync(dirname(full), { recursive: true })
  writeFileSync(full, contents, 'utf8')
  return relPath
}

/* --------------------------------------------------------------- content */

const services = [
  ['emergency-electrical-repair', 'Emergency electrical repair', 'After-hours diagnostic at a residential panel'],
  ['electrical-panel-upgrades', 'Electrical panel upgrade', '200-amp load center with dressed circuit conductors'],
  ['circuit-breaker-repair', 'Circuit breaker repair', 'Clamp meter on a branch circuit inside the panel'],
  ['outlet-and-switch-installation', 'Outlet & switch installation', 'Tamper-resistant receptacle in a wall box'],
  ['ceiling-fan-installation', 'Ceiling fan installation', 'Fan mounted to a fan-rated brace box'],
  ['lighting-installation', 'Indoor & outdoor lighting', 'Recessed LED lighting in a kitchen ceiling'],
  ['ev-charger-installation', 'EV charger installation', 'Level 2 charger with conduit run to the panel'],
  ['whole-home-rewiring', 'Whole-home rewiring', 'New NM-B cable runs through open framing'],
  ['electrical-inspections', 'Electrical inspections', 'Documenting panel findings during an inspection'],
  ['surge-protection', 'Whole-home surge protection', 'Type 2 SPD mounted beside the service panel'],
  ['smoke-and-co-detectors', 'Smoke & CO detectors', 'Hardwired interconnected alarm on a ceiling'],
  ['generator-installation', 'Standby generator installation', 'Generator on a pad with transfer switch'],
  ['commercial-electrical', 'Commercial electrical', 'Three-phase panel in a mechanical room'],
  ['new-construction-wiring', 'New construction wiring', 'Electrical rough-in with boxes and cable'],
  ['smart-home-electrical', 'Smart home electrical', 'Smart switch wired with a neutral conductor'],
]

const projects = [
  'hyde-park-1926-bungalow-rewire',
  'crestview-federal-pacific-panel-replacement',
  'mueller-dual-ev-charger-load-management',
  'south-congress-restaurant-finish-out',
  'lakeway-whole-home-generator',
  'allandale-kitchen-lighting-redesign',
  'round-rock-aluminum-wiring-remediation',
  'cedar-park-battery-backup-subpanel',
  'travis-heights-service-mast-storm-repair',
  'buda-shop-feeder-and-subpanel',
]

const posts = [
  ['why-does-my-breaker-keep-tripping', 'Why does my breaker keep tripping?'],
  ['how-much-does-an-electrical-panel-upgrade-cost', 'Panel upgrade cost in Austin'],
  ['signs-your-home-needs-rewiring', 'Signs your home needs rewiring'],
  ['can-i-install-an-ev-charger-at-home', 'Can I install an EV charger at home?'],
  ['why-are-my-lights-flickering', 'Why are my lights flickering?'],
  ['federal-pacific-panel-what-to-do', 'Federal Pacific panels: what now?'],
  ['recessed-lighting-layout-that-actually-works', 'Recessed lighting layout rules'],
  ['standby-vs-portable-generator', 'Standby vs portable generators'],
  ['commercial-led-retrofit-payback', 'Does an LED retrofit pay for itself?'],
  ['gfci-vs-afci-what-is-the-difference', 'GFCI vs AFCI explained'],
]

const team = [
  ['ray-alvarado', 'Ray Alvarado'],
  ['diego-serrano', 'Diego Serrano'],
  ['monica-reyes', 'Monica Reyes'],
  ['travis-boyd', 'Travis Boyd'],
  ['sam-okafor', 'Sam Okafor'],
  ['grace-whitfield', 'Grace Whitfield'],
  ['noah-kim', 'Noah Kim'],
  ['karen-doyle', 'Karen Doyle'],
]

const written = []

for (const [slug, label, caption] of services) {
  written.push(
    write(
      `images/services/${slug}.svg`,
      svg({ width: 1200, height: 800, label, caption, tag: 'Service photo' }),
    ),
  )
}

for (const slug of projects) {
  const pretty = slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
  written.push(
    write(
      `images/projects/${slug}-before.svg`,
      svg({
        width: 1200,
        height: 900,
        label: pretty,
        caption: 'Existing conditions photographed before work began',
        tone: 'dark',
        tag: 'Before',
      }),
    ),
  )
  written.push(
    write(
      `images/projects/${slug}-after.svg`,
      svg({
        width: 1200,
        height: 900,
        label: pretty,
        caption: 'Completed installation photographed at handover',
        tag: 'After',
      }),
    ),
  )
}

for (const [slug, title] of posts) {
  written.push(
    write(
      `images/blog/${slug}.svg`,
      svg({ width: 1200, height: 675, label: title, caption: 'Article cover image', tag: 'Guide' }),
    ),
  )
}

for (const [slug, name] of team) {
  written.push(
    write(
      `images/team/${slug}.svg`,
      svg({ width: 600, height: 600, label: name, caption: 'Team portrait', tag: 'Portrait' }),
    ),
  )
}

written.push(
  write(
    'images/og-default.svg',
    svg({
      width: 1200,
      height: 630,
      label: 'Hill Country Electric',
      caption: 'Licensed electricians in Austin, TX · TECL 34291 · (512) 555-0142',
      tone: 'dark',
      tag: 'Austin, TX',
    }),
  ),
)

/* ------------------------------------------------------- brand marks */

const logoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 64" width="320" height="64" role="img" aria-label="Hill Country Electric">
  <rect x="0" y="12" width="40" height="40" rx="10" fill="${BRAND}"/>
  <g transform="translate(8, 20) scale(1)"><path d="${BOLT}" fill="#ffffff"/></g>
  <text x="54" y="34" font-family="system-ui, -apple-system, 'Segoe UI', sans-serif" font-size="21" font-weight="800" fill="${INK}">Hill Country <tspan fill="${BRAND}">Electric</tspan></text>
  <text x="54" y="50" font-family="system-ui, -apple-system, 'Segoe UI', sans-serif" font-size="10" font-weight="600" letter-spacing="0.08em" fill="#5b7089">TECL 34291 · AUSTIN, TX</text>
</svg>
`
written.push(write('images/logo.svg', logoSvg))

const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">
  <rect width="32" height="32" rx="7" fill="${BRAND}"/>
  <g transform="translate(4, 4) scale(1)"><path d="${BOLT}" fill="#ffffff"/></g>
</svg>
`
written.push(write('favicon.svg', faviconSvg))

console.log(`Generated ${written.length} placeholder assets in public/`)
