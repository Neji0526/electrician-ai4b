import { buildSeo, type SeoInput } from '~/lib/seo'

/**
 * Per-page document metadata.
 *
 * React 19 hoists `<title>`, `<meta>` and `<link>` rendered anywhere in the
 * tree into `<head>`, and removes them again when the component unmounts — so
 * a route swap replaces the previous page's tags rather than stacking on top
 * of them. That is why this is a plain component and not an effect.
 *
 * Two rules keep it honest:
 *   1. Exactly one `<Seo>` per page. React does not dedupe tags, so a second
 *      one would emit a second title and a second description.
 *   2. Invariant tags (charset, viewport, favicon, manifest) live in
 *      `index.html`, never here — they do not change between routes.
 *
 * JSON-LD renders in place rather than in the head. That is valid, and Google
 * reads it either way. Note the caveat that comes with a client-rendered app:
 * none of this exists until JS runs, so scrapers that do not execute
 * JavaScript — most social and chat link previewers — will not see it.
 */
export function Seo(props: SeoInput) {
  const { title, meta, canonical, schema } = buildSeo(props)

  return (
    <>
      <title>{title}</title>

      {/* A noindex page has no canonical URL worth declaring — 404 and error
          pages are states, not addresses. */}
      {props.noindex ? null : <link rel="canonical" href={canonical} />}

      {meta.map((tag) => (
        <meta key={tag.name ?? tag.property} {...tag} />
      ))}

      {schema.map((entry, i) => (
        <script
          // eslint-disable-next-line react/no-array-index-key -- schema order is stable per page
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(entry) }}
        />
      ))}
    </>
  )
}
