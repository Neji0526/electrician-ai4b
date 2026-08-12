/**
 * A small hand-rolled icon set. Deliberately not an icon package — the site
 * uses about thirty glyphs and shipping a full library for that would cost more
 * bundle than every other piece of client JS on the page combined.
 *
 * All icons are 24×24, stroke-based, and inherit `currentColor`.
 */
import type { SVGProps } from 'react'

const paths: Record<string, React.ReactNode> = {
  /* ---- service icons ---- */
  'bolt-alert': (
    <>
      <path d="M11 3 4.5 13.2a.6.6 0 0 0 .5.9h4.2l-1 6.9 6.4-9.9a.6.6 0 0 0-.5-.9h-4.2Z" />
      <path d="M19 4v5" />
      <path d="M19 13h.01" />
    </>
  ),
  panel: (
    <>
      <rect x="4" y="2.5" width="16" height="19" rx="2" />
      <path d="M8 7h3M8 11h3M8 15h3M13.5 7h2.5M13.5 11h2.5M13.5 15h2.5" />
    </>
  ),
  breaker: (
    <>
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <path d="M9 6v12" />
      <path d="M13 9.5h4l-2.5 5" />
    </>
  ),
  outlet: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
      <path d="M9.5 9v2.5M14.5 9v2.5" />
      <path d="M9 15.5h6" />
    </>
  ),
  fan: (
    <>
      <circle cx="12" cy="12" r="2" />
      <path d="M12 10c0-3 .8-6 3-6s2.6 3.4.6 5" />
      <path d="M14 12c3 0 6 .8 6 3s-3.4 2.6-5 .6" />
      <path d="M10 14c0 3-.8 6-3 6s-2.6-3.4-.6-5" />
      <path d="M10 10c-3 0-6-.8-6-3s3.4-2.6 5-.6" />
    </>
  ),
  bulb: (
    <>
      <path d="M9 18h6" />
      <path d="M10 21h4" />
      <path d="M12 2a6.5 6.5 0 0 0-3.8 11.8c.5.4.8 1 .8 1.6v.6h6v-.6c0-.6.3-1.2.8-1.6A6.5 6.5 0 0 0 12 2Z" />
    </>
  ),
  ev: (
    <>
      <rect x="3" y="10" width="12" height="8" rx="2" />
      <path d="M4.5 10 6 6.2A2 2 0 0 1 7.9 5h2.2A2 2 0 0 1 12 6.2L13.5 10" />
      <path d="M6 18v1.5M12 18v1.5" />
      <path d="M18.5 6.5 17 10h2.5L18 13.5" />
    </>
  ),
  wire: (
    <>
      <path d="M3 17c3 0 3-10 6-10s3 10 6 10 3-6 6-6" />
      <circle cx="4" cy="17" r="1.4" />
      <circle cx="20" cy="11" r="1.4" />
    </>
  ),
  clipboard: (
    <>
      <path d="M9 4H7a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2" />
      <rect x="9" y="2.5" width="6" height="3.5" rx="1" />
      <path d="M8.5 12l2 2 4-4" />
    </>
  ),
  surge: (
    <>
      <path d="M12 2.5 4 6v6c0 4.6 3.2 8.3 8 9.5 4.8-1.2 8-4.9 8-9.5V6Z" />
      <path d="M12.8 8.5 10 12.6h3L11.2 16" />
    </>
  ),
  alarm: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="2.5" />
      <path d="M12 3.5v-1M12 21.5v-1M3.5 12h-1M21.5 12h-1" />
    </>
  ),
  generator: (
    <>
      <rect x="3" y="7" width="18" height="11" rx="2" />
      <path d="M7 7V5h10v2" />
      <path d="M7.5 18v2M16.5 18v2" />
      <path d="M12.6 10 10.5 13h2.9L11.4 16" />
    </>
  ),
  building: (
    <>
      <path d="M4 21V5a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v16" />
      <path d="M14 10h5a1 1 0 0 1 1 1v10" />
      <path d="M7 8h4M7 12h4M7 16h4M17 14h.01M17 17.5h.01" />
      <path d="M2.5 21h19" />
    </>
  ),
  blueprint: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 9h18M9 9v11" />
      <path d="M13 13h4M13 16.5h4" />
    </>
  ),
  smart: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <circle cx="12" cy="10" r="2.5" />
      <path d="M8.5 15.5h7" />
      <path d="M8.5 6h7" />
    </>
  ),

  /* ---- UI icons ---- */
  shield: (
    <>
      <path d="M12 2.5 4 6v6c0 4.6 3.2 8.3 8 9.5 4.8-1.2 8-4.9 8-9.5V6Z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  tag: (
    <>
      <path d="M20.5 12.5 12 21a2 2 0 0 1-2.8 0l-6.2-6.2a2 2 0 0 1 0-2.8L11.5 3.5H19a1.5 1.5 0 0 1 1.5 1.5Z" />
      <circle cx="16.5" cy="7.5" r="1.2" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5.2l3.2 2" />
    </>
  ),
  badge: (
    <>
      <circle cx="12" cy="9" r="6" />
      <path d="M9 14.2 8 22l4-2 4 2-1-7.8" />
      <path d="M9.8 9l1.5 1.5L14.2 7.6" />
    </>
  ),
  phone: (
    <path d="M6.5 3h-2A1.5 1.5 0 0 0 3 4.6C3 13.1 10.9 21 19.4 21a1.5 1.5 0 0 0 1.6-1.5v-2a1.5 1.5 0 0 0-1.2-1.5l-2.9-.6a1.5 1.5 0 0 0-1.5.6l-1 1.3a13.6 13.6 0 0 1-5.7-5.7l1.3-1a1.5 1.5 0 0 0 .6-1.5l-.6-2.9A1.5 1.5 0 0 0 6.5 3Z" />
  ),
  mail: (
    <>
      <rect x="2.5" y="5" width="19" height="14" rx="2" />
      <path d="m3 7 8.1 5.4a1.6 1.6 0 0 0 1.8 0L21 7" />
    </>
  ),
  'map-pin': (
    <>
      <path d="M12 21s7-5.7 7-11a7 7 0 1 0-14 0c0 5.3 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.6" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="16" rx="2" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
    </>
  ),
  check: <path d="m4.5 12.5 5 5 10-11" />,
  'check-circle': (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m8 12.2 2.7 2.7L16 9.5" />
    </>
  ),
  'chevron-down': <path d="m6 9.5 6 6 6-6" />,
  'chevron-right': <path d="m9.5 5.5 6.5 6.5-6.5 6.5" />,
  'arrow-right': (
    <>
      <path d="M4 12h15" />
      <path d="m13 6 6 6-6 6" />
    </>
  ),
  'arrow-left': (
    <>
      <path d="M20 12H5" />
      <path d="m11 6-6 6 6 6" />
    </>
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="m6 6 12 12M18 6 6 18" />,
  quote: (
    <path d="M9.5 5C6.5 6.6 5 9.3 5 13v6h6v-6H8c0-2.6.8-4.3 2.5-5.3Zm9 0C15.5 6.6 14 9.3 14 13v6h6v-6h-3c0-2.6.8-4.3 2.5-5.3Z" />
  ),
  warning: (
    <>
      <path d="M10.3 3.9 2.6 17.3A2 2 0 0 0 4.3 20.3h15.4a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" />
      <path d="M12 9v4.5M12 17h.01" />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5M12 8h.01" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20a6.5 6.5 0 0 1 13 0" />
      <path d="M16 5.2a3.5 3.5 0 0 1 0 6.6" />
      <path d="M17.5 14.4A6.5 6.5 0 0 1 21.5 20" />
    </>
  ),
  wrench: (
    <path d="M20 6.5a5 5 0 0 1-6.6 4.7L6 18.6a2.3 2.3 0 0 1-3.3-3.3l7.4-7.4A5 5 0 0 1 16.4 3l-3 3 1.6 3.1L18 8.5Z" />
  ),
  home: (
    <>
      <path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1Z" />
      <path d="M9.5 21v-6h5v6" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4.5 4.5" />
    </>
  ),
  star: (
    <path d="m12 3.2 2.6 5.4 5.9.8-4.3 4.1 1.1 5.9L12 16.6l-5.3 2.8 1.1-5.9-4.3-4.1 5.9-.8Z" />
  ),
  directions: (
    <>
      <path d="m12 2.5 9.5 9.5L12 21.5 2.5 12Z" />
      <path d="M9.5 14v-2.2a1.8 1.8 0 0 1 1.8-1.8h4" />
      <path d="m13 8 2.3 2-2.3 2" />
    </>
  ),
  document: (
    <>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z" />
      <path d="M14 3v5h5" />
      <path d="M8.5 13h7M8.5 16.5h4" />
    </>
  ),
  upload: (
    <>
      <path d="M4 15v3.5A1.5 1.5 0 0 0 5.5 20h13a1.5 1.5 0 0 0 1.5-1.5V15" />
      <path d="M12 15.5V4M8 8l4-4 4 4" />
    </>
  ),
  filter: <path d="M3 5h18l-7 8v6l-4 2v-8Z" />,
  bolt: <path d="M13 2 4.5 13.4a.5.5 0 0 0 .4.8h5.3l-1.2 7.8 8.5-11.4a.5.5 0 0 0-.4-.8h-5.3Z" />,
  dollar: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 6.5v11" />
      <path d="M14.7 9.4a2.6 2.6 0 0 0-2.4-1.3h-.6a2.2 2.2 0 0 0-.4 4.4h1.4a2.2 2.2 0 0 1-.4 4.4h-.6a2.6 2.6 0 0 1-2.4-1.3" />
    </>
  ),
  'hand-heart': (
    <>
      <path d="M12 8.2 11.2 7.4a2 2 0 0 0-2.9 2.8L12 14l3.7-3.8a2 2 0 0 0-2.9-2.8Z" />
      <path d="M3 15.5 6 15l4.4 1.6a2 2 0 0 0 1.4 0l4.6-1.7a1.6 1.6 0 0 1 1.6 2.7L14 21H7l-4-1.5Z" />
    </>
  ),
  package: (
    <>
      <path d="M20.5 7.7 12 3 3.5 7.7v8.6L12 21l8.5-4.7Z" />
      <path d="m3.7 7.8 8.3 4.5 8.3-4.5" />
      <path d="M12 12.3V21" />
    </>
  ),
  wallet: (
    <>
      <path d="M3.5 8.5A2.5 2.5 0 0 1 6 6h11.5a2 2 0 0 1 2 2v.5" />
      <rect x="3.5" y="8.5" width="17" height="11" rx="2" />
      <path d="M20.5 12.5H16a1.75 1.75 0 0 0 0 3.5h4.5" />
    </>
  ),
  facebook: (
    <path d="M22 12a10 10 0 1 0-11.6 9.9v-7h-2.5V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.7l-.4 2.9h-2.3v7A10 10 0 0 0 22 12Z" />
  ),
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
    </>
  ),
  google: (
    <path d="M21.6 12.2c0-.7-.1-1.4-.2-2H12v3.9h5.4a4.6 4.6 0 0 1-2 3v2.5h3.2c1.9-1.7 3-4.3 3-7.4ZM12 22c2.7 0 5-.9 6.6-2.4l-3.2-2.5c-.9.6-2 1-3.4 1-2.6 0-4.8-1.7-5.6-4.1H3.1v2.6A10 10 0 0 0 12 22ZM6.4 14a6 6 0 0 1 0-3.8V7.6H3.1a10 10 0 0 0 0 8.8ZM12 5.9c1.5 0 2.8.5 3.8 1.5l2.8-2.8A10 10 0 0 0 3.1 7.6l3.3 2.6C7.2 7.7 9.4 5.9 12 5.9Z" />
  ),
}

export type IconName = keyof typeof paths

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'name'> {
  name: IconName | string
  size?: number
  /** Filled icons (star, quote, bolt) render better without a stroke. */
  filled?: boolean
}

const FILLED = new Set(['star', 'quote', 'bolt', 'filter', 'facebook', 'google'])

export function Icon({ name, size = 20, filled, className, ...rest }: IconProps) {
  const d = paths[name] ?? paths.bolt
  const isFilled = filled ?? FILLED.has(name)
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={isFilled ? 'currentColor' : 'none'}
      stroke={isFilled ? 'none' : 'currentColor'}
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
      {...rest}
    >
      {d}
    </svg>
  )
}
