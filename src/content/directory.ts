/**
 * Navigation directory — slugs and labels only.
 *
 * The header, footer, 404 page and the city/service pickers on the lead forms
 * render on *every* page, so they live in the shared client chunk. Importing
 * `services.ts` or `areas.ts` from any of them drags every service's process,
 * pricing and safety copy — and every area's intro prose — into that chunk,
 * which is roughly 50KB the visitor downloads to render a footer.
 *
 * This module holds just the labels those components need. `npm run smoke`
 * asserts it stays in sync with the real content, so it cannot silently drift.
 */

export interface DirectoryEntry {
  slug: string
  label: string
}

/** Featured services, in the order the footer lists them. */
export const serviceDirectory: DirectoryEntry[] = [
  { slug: 'emergency-electrical-repair', label: 'Emergency Repair' },
  { slug: 'electrical-panel-upgrades', label: 'Panel Upgrades' },
  { slug: 'circuit-breaker-repair', label: 'Breaker Repair' },
  { slug: 'lighting-installation', label: 'Lighting' },
  { slug: 'ev-charger-installation', label: 'EV Chargers' },
  { slug: 'whole-home-rewiring', label: 'Rewiring' },
]

/** Every city we serve, in display order. */
export const areaDirectory: DirectoryEntry[] = [
  { slug: 'austin', label: 'Austin' },
  { slug: 'round-rock', label: 'Round Rock' },
  { slug: 'cedar-park', label: 'Cedar Park' },
  { slug: 'georgetown', label: 'Georgetown' },
  { slug: 'pflugerville', label: 'Pflugerville' },
  { slug: 'lakeway', label: 'Lakeway' },
  { slug: 'kyle', label: 'Kyle' },
  { slug: 'buda', label: 'Buda' },
]
