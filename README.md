# Hill Country Electric — lead-generation website

Production-ready **frontend** for a local electrical contractor, built with React 19 and
TanStack Start (TanStack Router SSR) on Vite.

Every page is server-rendered, every route emits its own metadata and structured data, and
the whole site is optimised around four questions a visitor actually has: *what do they do,
do they serve me, can I trust them, how do I get hold of them.*

> **Scope:** this build is frontend only, as requested. There is no backend and no database.
> All content is served from typed modules under `src/content`, shaped so each one can be
> swapped for a Supabase query without touching a route or a component. See
> [Wiring up a backend](#wiring-up-a-backend).

---

## Quick start

```bash
npm install
npm run photos             # downloads the licensed photography into public/
npm run dev                # http://localhost:3000
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Vite dev server with SSR and HMR |
| `npm run build` | Production build → `dist/client` + `dist/server`, and writes `sitemap.xml` |
| `npm start` | Serves the production build |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run smoke` | Renders **every** route through the built SSR handler and asserts the output |
| `npm run photos` | Downloads licensed photography from Wikimedia Commons + writes credits |
| `npm run gen:placeholders` | Regenerates the SVG placeholders (team slots, fallbacks) |

**Node 22.12+ is recommended** — that is what `@tanstack/react-start` declares. It builds and
runs on Node 20, which is what this was developed against, but you will see an engine warning.

### The smoke test

`npm run build && npm run smoke` imports the built server handler and renders all 60 URLs
in-process. For each one it asserts a 200 (404 for the not-found route), exactly one `<h1>`,
a `<title>`, a meta description, a canonical URL, at least one JSON-LD block, the phone
number present in the *server* HTML, and an estimate CTA. It also checks that
`src/content/directory.ts` has not drifted from the real content.

This is the fastest way to catch a broken route — it takes a couple of seconds and needs no
browser or network.

---

## Project structure

```txt
src/
  routes/            One file per URL. Loader + head() + component.
    __root.tsx       Document shell: <html>, header, footer, sticky mobile bar
    index.tsx        Homepage
    services.index.tsx / services.$serviceSlug.tsx
    emergency-electrician.tsx
    service-areas.index.tsx / service-areas.$locationSlug.tsx
    projects.index.tsx / projects.$projectSlug.tsx
    blog.index.tsx / blog.$articleSlug.tsx
    reviews.tsx  about.tsx  team.tsx  faq.tsx  contact.tsx
    request-estimate.tsx  sitemap.tsx  privacy.tsx  terms.tsx

  components/        Reusable UI. See the component list below.
  content/           The "CMS" — typed records + an async access layer
  lib/               seo, schema, analytics, leads, format helpers
  styles/app.css     Design tokens (Tailwind v4 @theme) + base + primitives
  router.tsx         createRouter()

scripts/
  fetch-photos.mjs       Downloads licensed photography + generates credits
  gen-placeholders.mjs   Generates the SVG placeholders
  smoke.mjs              SSR smoke test
```

### Routes

| Path | Page |
| --- | --- |
| `/` | Homepage — hero + lead form, trust strip, services, emergency, why-us, projects, areas, reviews, safety, financing, FAQ, final CTA |
| `/services` | Filterable services grid (category × property type) |
| `/services/$serviceSlug` | 15 service pages: signs → what's included → process → pricing → safety → projects → reviews → related → FAQ |
| `/emergency-electrician` | Conversion-focused 24/7 page with 8 scenarios and what-to-do-now steps |
| `/service-areas` | 8 cities, ZIP coverage, map |
| `/service-areas/$locationSlug` | Local SEO page per city with local intro, services, projects, reviews |
| `/projects` · `/projects/$projectSlug` | Before/after gallery with service + location filters |
| `/blog` · `/blog/$articleSlug` | 10 long-form guides with search, category filters and a TOC |
| `/reviews` | 20 reviews, rating distribution, per-service filter |
| `/about` · `/team` | Company story, timeline, licensing, safety philosophy, 8 staff |
| `/faq` | 39 questions across 9 categories with search + category nav |
| `/contact` | Two-column contact details, live open/closed status, map, lead form |
| `/request-estimate` | Two-step estimate form with photo upload |
| `/sitemap` · `/credits` · `/privacy` · `/terms` | HTML sitemap, photo attribution and legal pages |

### Components

`TopBar` `Header` `MobileNav` `MobileActionBar` `Logo` `Breadcrumbs` `PageHero` `TrustStrip`
`ServiceCard` / `ServiceGrid` / `ServiceLinkCard` `EmergencyBanner` `MetricCard` `ProjectCard`
`ReviewCard` `RatingStars` `AreaCard` `TeamCard` `FAQAccordion` `CTASection` `LeadForm`
`EstimateForm` `BusinessHours` `MapSection` `Photo` / `BeforeAfter` `Prose` `Icon` `NotFound`
`ErrorPage`, plus form primitives in `components/fields.tsx` and layout primitives in
`components/ui.tsx`.

---

## Design system

Tokens live in one place: the `@theme` block at the top of `src/styles/app.css`. Change a
value there and it propagates through every Tailwind utility.

- **Light theme only.** White and warm off-white surfaces, `--color-surface` slate sections.
- **Brand blue** (`brand-50`…`brand-950`) is the only primary colour.
- **Safety amber** (`accent-*`) is reserved for emergency and warning contexts — never a
  large surface. Emergency blocks use amber accents on dark navy rather than a red alarm
  treatment, which reads as an error state.
- **Ink navy** for text (`--color-ink`, `--color-ink-soft`, `--color-muted`).
- Soft borders, very subtle shadows (`--shadow-card`, `--shadow-lift`), 0.5–1rem radii.
- Content max-width 1220px via `.container-page`.
- System sans-serif stack — no webfont request, no FOUT, no layout shift.

### Conversion strategy

Two CTAs per view, never more: **request an estimate** and **call**. The mobile action bar is
pinned with exactly those two. The emergency phone number is never behind a modal or a form —
on `/emergency-electrician` it is a 3rem tap target in the hero and repeated in the closing
block.

---

## Content layer (`src/content`)

| File | Contains |
| --- | --- |
| `business.ts` | Everything a "Business Settings" screen would own — name, phones, address, hours, licence, warranty, emergency settings, financing, review stats, default SEO |
| `services.ts` | 15 services with full detail content |
| `areas.ts` | 8 service areas with local intro prose |
| `projects.ts` | 10 projects with challenge/solution/scope |
| `reviews.ts` | 20 reviews |
| `faqs.ts` | 39 FAQs across 9 categories |
| `posts.ts` | 10 long-form articles as structured blocks |
| `team.ts` | 8 team members |
| `taxonomy.ts` | Category vocabularies |
| `directory.ts` | Slug + label pairs for the header/footer/404 (see note below) |
| `photo-credits.json` | Generated attribution data, rendered at `/credits` |
| `types.ts` | All record types plus the card/option projections |
| `index.ts` | **The access layer.** Async getters that routes call from loaders |

### Two performance decisions worth knowing about

Both exist because **loader return values are serialised into the SSR HTML** and **loaders
also run in the browser during client-side navigation**.

1. **Card projections.** `getServiceCards()`, `getProjectCards()`, `getPostCards()` and
   `getAreaCards()` return only the fields a card renders. Returning full records instead put
   every service's pricing tables and every article body into the HTML of pages that render a
   grid — `/services` was 156KB of HTML, and `/sitemap` was 202KB. They are now 99KB and 53KB.

2. **Dynamic imports in `content/index.ts`.** The record modules are loaded with
   `await import()` rather than a static import, so they compile to their own chunks that the
   browser only fetches when a loader actually runs client-side. This moved ~150KB out of the
   chunk needed for first paint: the eager bundle went from 573KB to 323KB.

`directory.ts` exists for the same reason — the footer and 404 render on every page, so
importing `services.ts` from them would drag the entire catalogue back into the shell chunk.
`npm run smoke` asserts it stays in sync with the real content so it cannot silently drift.

---

## SEO

Handled by `src/lib/seo.ts` and `src/lib/schema.ts`, applied per route via `head()`:

- SSR title, meta description, canonical, Open Graph, Twitter card, geo tags
- Structured data: `Electrician` / `LocalBusiness`, `WebSite`, `Service`, `FAQPage`,
  `Review` + `AggregateRating`, `Article`, `CreativeWork`, `BreadcrumbList`
- `sitemap.xml` is generated at build time from the same content the pages render, so a new
  service or article cannot silently fall out of it (see `vite.config.ts`)
- `public/robots.txt`, plus a human-readable `/sitemap` page
- Location pages for each city served

**Prerendering** is available and commented out in `vite.config.ts`. Every public page is
identical for all visitors, so enabling it turns the site fully static on top of SSR. It needs
a machine that permits loopback HTTP — the prerenderer drives a local server to capture pages.

---

## Accessibility

- Skip-to-content link; one `<h1>` per page (asserted by the smoke test)
- Semantic landmarks and heading order; `aria-labelledby` on every major section
- FAQ accordions are native `<details>`/`<summary>` — keyboard support and screen reader
  semantics with zero JavaScript, and answers stay in the DOM for crawlers
- Every form control has a real `<label>`; errors use `aria-invalid` + `aria-describedby`,
  with a focusable error summary
- Mobile menu traps nothing it shouldn't: Escape closes it, focus moves to the close button,
  background scroll locks
- One global `:focus-visible` treatment, 3px brand outline
- Status is never colour-only — open/closed, emergency and rating all carry text
- `prefers-reduced-motion` disables transitions and smooth scrolling
- Minimum 44px tap targets on all mobile actions

## Performance

- SSR-first; loaders fetch server-side so nothing SEO-critical waits for hydration
- Route-level code splitting (39 chunks); content chunks load on demand
- ~30 hand-written SVG icons instead of an icon package
- System font stack — zero font requests
- `Photo` reserves space from intrinsic dimensions; only the hero image is eager/high-priority
- The Google Maps iframe is lazy-loaded
- Animations are CSS-only

---

## Wiring up a backend

Everything funnels through two files.

**Reading content — `src/content/index.ts`.** Every getter is already `async` and returns
plain serialisable data. Replace the bodies:

```ts
export async function getServiceCards(): Promise<ServiceCardData[]> {
  const { data } = await supabase
    .from('services')
    .select('slug, name, short_name, category, icon, audience, summary, starting_price, …')
    .eq('active', true)
    .order('sort_order')
  return data ?? []
}
```

No route or component changes. You can then delete the dynamic-import indirection at the top
of the file, since the data will arrive over the wire instead of being bundled.

**Writing leads — `src/lib/leads.ts`.** `submitLead()` is the single submission path for the
hero form, the contact form and the estimate form. It currently validates, logs and resolves
with a reference number, so the whole success path — validation → pending state → confirmation
screen → conversion event — is real and testable. Replace its body with a Supabase insert (and
upload `photoNames`' underlying `File[]` to Storage). Validation helpers and the
`Lead` interface stay as they are.

**Analytics.** `src/lib/analytics.ts` already emits `phone_click`, `estimate_cta_click`,
`emergency_call_click`, `form_start`, `form_submit`, `form_error`, `service_view`,
`directions_click` and `email_click` to `dataLayer`, `gtag` and a DOM `CustomEvent`. Add GTM
or GA4 and every CTA is instrumented already.

### What is *not* built

- **The admin CMS.** The master brief specifies a full operations dashboard — lead pipeline,
  service/area/project/review/team/blog management, emergency settings, business settings.
  Every one of those screens is a CRUD surface over tables that do not exist yet, so it was
  left out of this frontend-only build. The content types in `src/content/types.ts` were
  written as the schema for it: they carry the admin-facing fields (`sortOrder`, `featured`,
  `published`, `active`, `seo`, `priceNote`, `emergencyEligible`, …) even where the public
  site does not render them.
- **Auth**, file upload targets, and email/SMS notification — all backend concerns.

---

## Imagery

**47 real photographs** are wired in across services, projects, blog covers, the homepage
hero and the Open Graph image. They come from **Wikimedia Commons**, filtered to licences
that permit commercial use — public domain, CC0, CC BY and CC BY-SA. Fetch or refresh them
with:

```bash
node scripts/fetch-photos.mjs           # only downloads what is missing
node scripts/fetch-photos.mjs --force   # re-picks everything
node scripts/fetch-photos.mjs services  # just one group
```

### Attribution is a licence condition, not a courtesy

42 of the 47 images are CC BY or CC BY-SA, which **require** credit. That is handled:

- `src/content/photo-credits.json` is generated by the fetch script
- `/credits` renders it as a table with author, licence and source link
- The footer links to `/credits` on every page
- `public/images/CREDITS.md` holds the same data for your records

If you swap the photos, re-run the script so the credits stay in step. If you replace them
with your own photography or licensed stock, you can delete the `/credits` route and its
footer link.

### Why not Google Images

Google Images is a search index over other people's websites — those photos are copyrighted
by default, and putting them on a commercial contractor site is straightforward infringement.
Stock agencies actively pursue it, and the demand letters are not small. Unsplash was the
first choice here (better-looking photography, more permissive licence) but it now blocks
unauthenticated clients; if you register for an Unsplash API key, swapping the source in
`scripts/fetch-photos.mjs` is a contained change.

### What still needs your own photography

| Slot | Status | Why |
| --- | --- | --- |
| **Team portraits** (8) | Placeholders | Commons photos are of real, identifiable people. Presenting one as "Ray Alvarado, Master Electrician, licence ME 21874" is misrepresentation, and it carries personality-rights exposure on top. These need actual staff photos. |
| **Project before/after** (10 pairs) | Stock stand-ins | No library has genuine before-and-after pairs of a specific job. The current images are two related photos, not the same panel photographed twice. Presented as your completed work, that is deceptive — replace with real job photos before launch. |
| **Everything else** | Ready to ship | Illustrative photos of electrical work. Legitimate use, correctly licensed and credited. |

### Alt text needs one review pass

Alt text was written for the *intended* photograph and has not been reconciled against the
images that actually landed. `public/images/CREDITS.md` lists each file's uploader
description next to it so a human can check them in one pass. Wrong alt text is worse than
none for screen reader users.

### Replacing an image

Drop a JPG/WebP at the same path in `public/images/**`. Filenames are derived from content
slugs, so nothing else needs to change:

```txt
public/images/services/<service-slug>.jpg
public/images/projects/<project-slug>-before.jpg
public/images/projects/<project-slug>-after.jpg
public/images/blog/<post-slug>.jpg
public/images/team/<member-slug>.svg      ← still placeholders
public/images/home/hero-house.jpg
```

## Notes on the content

The copy is written to sound like an electrical contractor explaining work to a homeowner,
not like marketing. It commits to specifics — Federal Pacific Stab-Lok panels, NEC 220.87
load calculations, AlumiConn pigtails, fan-rated brace boxes, voltage drop over long feeders —
because that is what makes a trade site credible.

The business itself (Hill Country Electric, Austin TX), its staff, licence number, phone
numbers, reviews and projects are **fictional placeholders**. Phone numbers use the reserved
555 range. Replace `src/content/business.ts` and the records first; the licence number and
address in particular appear in structured data and legal pages.
