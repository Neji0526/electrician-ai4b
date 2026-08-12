import { Icon } from './Icon'
import { cx } from '~/lib/format'
import type { Block } from '~/content/types'

/** Renders the structured editorial blocks used by blog posts and area pages. */
export function Prose({ blocks, className }: { blocks: Block[]; className?: string }) {
  return (
    <div className={cx('prose-hce', className)}>
      {blocks.map((block, i) => (
        <BlockView key={i} block={block} />
      ))}
    </div>
  )
}

function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case 'p':
      return <p>{block.text}</p>

    case 'h2':
      return <h2 id={block.id ?? slugify(block.text)}>{block.text}</h2>

    case 'h3':
      return <h3 id={block.id ?? slugify(block.text)}>{block.text}</h3>

    case 'ul':
      return (
        <ul>
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      )

    case 'ol':
      return (
        <ol>
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ol>
      )

    case 'note':
      return (
        <aside className="not-prose rounded-card border border-brand-100 bg-brand-50 p-5">
          <p className="flex items-center gap-2 text-sm font-bold text-brand-800">
            <Icon name="info" size={18} />
            {block.title ?? 'Worth knowing'}
          </p>
          <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-soft">{block.text}</p>
        </aside>
      )

    case 'warning':
      return (
        <aside className="not-prose rounded-card border border-accent-200 bg-accent-50 p-5">
          <p className="flex items-center gap-2 text-sm font-bold text-accent-800">
            <Icon name="warning" size={18} />
            {block.title ?? 'Safety warning'}
          </p>
          <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-soft">{block.text}</p>
        </aside>
      )

    case 'quote':
      return (
        <figure className="not-prose border-l-4 border-brand-300 pl-5">
          <blockquote className="text-[1.0625rem] italic leading-relaxed text-ink">
            “{block.text}”
          </blockquote>
          {block.attribution ? (
            <figcaption className="mt-2 text-sm font-semibold text-muted">
              — {block.attribution}
            </figcaption>
          ) : null}
        </figure>
      )

    case 'table':
      return (
        <div className="not-prose -mx-5 overflow-x-auto px-5 md:mx-0 md:px-0">
          <table className="w-full min-w-[32rem] border-collapse text-left text-[0.9375rem]">
            <thead>
              <tr className="border-b-2 border-line-strong">
                {block.head.map((h, i) => (
                  <th key={i} scope="col" className="py-2.5 pr-4 font-bold text-ink">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, i) => (
                <tr key={i} className="border-b border-line last:border-0">
                  {row.map((cell, j) => (
                    <td
                      key={j}
                      className={cx('py-2.5 pr-4 align-top', j === 0 ? 'font-semibold text-ink' : 'text-ink-soft')}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )

    default:
      return null
  }
}

export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

/** Table of contents built from the h2 blocks of an article. */
export function BlockToc({ blocks }: { blocks: Block[] }) {
  const headings = blocks.filter((b): b is Extract<Block, { type: 'h2' }> => b.type === 'h2')
  if (headings.length < 3) return null
  return (
    <nav aria-label="On this page" className="rounded-card border border-line bg-surface p-5">
      <p className="text-sm font-bold text-ink">On this page</p>
      <ol className="mt-3 space-y-2 text-[0.9375rem]">
        {headings.map((h, i) => (
          <li key={i}>
            <a
              href={`#${h.id ?? slugify(h.text)}`}
              className="text-brand-700 underline-offset-2 hover:underline"
            >
              {h.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
