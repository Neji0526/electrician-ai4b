import { useId } from 'react'
import { cx } from '~/lib/format'

/**
 * Star rating. The visual stars are decorative — the rating is also stated in
 * text so it is never communicated by colour or shape alone.
 */
export function RatingStars({
  rating,
  size = 18,
  className,
  label,
  showValue = false,
  tone = 'accent',
}: {
  rating: number
  size?: number
  className?: string
  label?: string
  showValue?: boolean
  tone?: 'accent' | 'light'
}) {
  const rounded = Math.round(rating * 2) / 2
  const text = label ?? `${rating.toFixed(1)} out of 5 stars`

  return (
    <span className={cx('inline-flex items-center gap-1.5', className)}>
      <span
        className={cx('inline-flex gap-0.5', tone === 'light' ? 'text-accent-300' : 'text-accent-500')}
        aria-hidden="true"
      >
        {[1, 2, 3, 4, 5].map((i) => {
          const fill = rounded >= i ? 1 : rounded >= i - 0.5 ? 0.5 : 0
          return <Star key={i} size={size} fill={fill} />
        })}
      </span>
      <span className="sr-only">{text}</span>
      {showValue ? (
        <span
          className={cx(
            'text-sm font-semibold',
            tone === 'light' ? 'text-white' : 'text-ink',
          )}
          aria-hidden="true"
        >
          {rating.toFixed(1)}
        </span>
      ) : null}
    </span>
  )
}

function Star({ size, fill }: { size: number; fill: number }) {
  // useId keeps the gradient id stable between SSR and hydration.
  const id = useId()
  const d = 'm12 3.2 2.6 5.4 5.9.8-4.3 4.1 1.1 5.9L12 16.6l-5.3 2.8 1.1-5.9-4.3-4.1 5.9-.8Z'
  if (fill === 1) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d={d} />
      </svg>
    )
  }
  if (fill === 0) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.35">
        <path d={d} />
      </svg>
    )
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <defs>
        <linearGradient id={id}>
          <stop offset="50%" stopColor="currentColor" />
          <stop offset="50%" stopColor="currentColor" stopOpacity="0.25" />
        </linearGradient>
      </defs>
      <path d={d} fill={`url(#${id})`} />
    </svg>
  )
}
