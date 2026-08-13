import { Outlet, ScrollRestoration } from 'react-router'

import { TopBar } from './TopBar'
import { Header } from './Header'
import { Footer } from './Footer'
import { MobileActionBar } from './MobileActionBar'
import { localBusinessSchema, websiteSchema } from '~/lib/schema'

/**
 * The chrome every page sits inside.
 *
 * Note what is *not* here: no title, description or Open Graph tags. React 19
 * does not dedupe metadata, so anything emitted at this level would double up
 * with the page's own `<Seo>`. The organisation-level structured data is the
 * exception — it describes the business rather than the page, so it belongs on
 * every route exactly once.
 */
export function RootLayout() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([localBusinessSchema(), websiteSchema()]),
        }}
      />

      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <TopBar />
      <Header />

      <main id="main" className="flex-1">
        <Outlet />
      </main>

      <Footer />
      <MobileActionBar />

      <ScrollRestoration />
    </>
  )
}
