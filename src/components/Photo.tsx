import { cx } from '~/lib/format'
import type { Image } from '~/content/types'

/**
 * Image wrapper that reserves space from the intrinsic dimensions so nothing
 * on the page shifts while an image loads, and lazy-loads by default.
 *
 * Set `priority` on the single largest image above the fold (the hero) — that
 * one must load eagerly and be fetched at high priority for LCP.
 */
export function Photo({
  image,
  className,
  imgClassName,
  priority = false,
  sizes,
  rounded = true,
  aspect,
}: {
  image: Image
  className?: string
  imgClassName?: string
  priority?: boolean
  sizes?: string
  rounded?: boolean
  /** e.g. "4/3" — overrides the intrinsic ratio for cropped presentation. */
  aspect?: string
}) {
  return (
    <div
      className={cx(
        'relative overflow-hidden bg-surface-2',
        rounded && 'rounded-card',
        className,
      )}
      style={aspect ? { aspectRatio: aspect } : undefined}
    >
      <img
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes={sizes}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : 'auto'}
        className={cx('h-full w-full object-cover', imgClassName)}
      />
    </div>
  )
}

/** Before/after pair used on project cards and detail pages. */
export function BeforeAfter({
  before,
  after,
  className,
}: {
  before: Image
  after: Image
  className?: string
}) {
  return (
    <div className={cx('grid grid-cols-2 gap-1', className)}>
      <figure className="relative">
        <Photo image={before} aspect="4/3" rounded={false} className="rounded-l-card" />
        <figcaption className="absolute left-2 top-2 rounded bg-ink/80 px-2 py-0.5 text-[0.6875rem] font-bold uppercase tracking-wide text-white">
          Before
        </figcaption>
      </figure>
      <figure className="relative">
        <Photo image={after} aspect="4/3" rounded={false} className="rounded-r-card" />
        <figcaption className="absolute left-2 top-2 rounded bg-brand-600 px-2 py-0.5 text-[0.6875rem] font-bold uppercase tracking-wide text-white">
          After
        </figcaption>
      </figure>
    </div>
  )
}
