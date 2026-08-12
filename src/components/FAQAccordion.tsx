import { Icon } from './Icon'
import { cx } from '~/lib/format'
import type { Faq } from '~/content/types'

/**
 * Built on native `<details>`/`<summary>`.
 *
 * That gets keyboard support, screen reader semantics and expand/collapse with
 * zero client JavaScript — and the answers stay in the DOM for crawlers, which
 * matters because these questions carry FAQ structured data.
 */
export function FAQAccordion({
  faqs,
  className,
  defaultOpenFirst = false,
}: {
  faqs: Faq[]
  className?: string
  defaultOpenFirst?: boolean
}) {
  return (
    <div className={cx('divide-y divide-line overflow-hidden rounded-card border border-line bg-white', className)}>
      {faqs.map((faq, i) => (
        <details
          key={faq.id}
          open={defaultOpenFirst && i === 0}
          className="group [&_summary::-webkit-details-marker]:hidden"
        >
          <summary
            className={cx(
              'flex cursor-pointer list-none items-start justify-between gap-4 p-5',
              'text-[1.0625rem] font-bold leading-snug text-ink',
              'transition-colors hover:bg-surface group-open:bg-surface/60',
            )}
          >
            {faq.question}
            <Icon
              name="chevron-down"
              size={20}
              className="mt-0.5 shrink-0 text-brand-600 transition-transform duration-200 group-open:rotate-180"
            />
          </summary>
          <div className="px-5 pb-5 pt-0">
            <p className="max-w-3xl text-[0.9375rem] leading-relaxed text-ink-soft">{faq.answer}</p>
          </div>
        </details>
      ))}
    </div>
  )
}
