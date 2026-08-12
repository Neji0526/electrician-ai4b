import { Icon } from './Icon'
import { btn } from './ui'
import { business } from '~/content/business'
import { track } from '~/lib/analytics'
import { cx } from '~/lib/format'

/**
 * Location block. The map iframe is lazy-loaded — an eagerly loaded Google
 * embed costs more than the rest of the page combined and it sits well below
 * the fold on every page that uses it.
 */
export function MapSection({ className }: { className?: string }) {
  const src = `https://www.google.com/maps?q=${business.mapEmbedQuery}&output=embed`

  return (
    <div className={cx('overflow-hidden rounded-card border border-line bg-white shadow-card', className)}>
      <iframe
        title={`Map showing ${business.name} at ${business.address.street}, ${business.address.city}`}
        src={src}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="block h-64 w-full border-0 md:h-72"
      />
      <div className="flex flex-col gap-3 border-t border-line p-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="flex items-start gap-2.5 text-[0.9375rem] text-ink-soft">
          <Icon name="map-pin" size={18} className="mt-0.5 shrink-0 text-brand-600" />
          <span>
            <span className="block font-bold text-ink">{business.name}</span>
            {business.address.street}, {business.address.city}, {business.address.state}{' '}
            {business.address.zip}
          </span>
        </p>
        <a
          href={business.directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track('directions_click', { location: 'map_section' })}
          className={btn('secondary', 'md', 'shrink-0')}
        >
          <Icon name="directions" size={17} />
          Get directions
        </a>
      </div>
    </div>
  )
}
