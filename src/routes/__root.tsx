/// <reference types="vite/client" />
import type { ReactNode } from 'react'
import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'

import appCss from '~/styles/app.css?url'
import { Header } from '~/components/Header'
import { TopBar } from '~/components/TopBar'
import { Footer } from '~/components/Footer'
import { MobileActionBar } from '~/components/MobileActionBar'
import { NotFound } from '~/components/NotFound'
import { ErrorPage } from '~/components/ErrorPage'
import { business } from '~/content/business'
import { seo } from '~/lib/seo'
import { localBusinessSchema, websiteSchema } from '~/lib/schema'

export const Route = createRootRoute({
  head: () => {
    const base = seo({
      title: business.seo.defaultTitle,
      description: business.seo.defaultDescription,
      path: '/',
      schema: [localBusinessSchema(), websiteSchema()],
    })

    return {
      meta: [
        { charSet: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
        { name: 'theme-color', content: '#175bb4' },
        { name: 'format-detection', content: 'telephone=no' },
        ...base.meta,
      ],
      links: [
        { rel: 'stylesheet', href: appCss },
        { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
        { rel: 'manifest', href: '/site.webmanifest' },
      ],
      scripts: base.scripts,
    }
  },
  shellComponent: RootDocument,
  notFoundComponent: NotFound,
  errorComponent: ErrorPage,
})

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="flex min-h-screen flex-col bg-white antialiased">
        <a href="#main" className="skip-link">
          Skip to content
        </a>

        <TopBar />
        <Header />

        <main id="main" className="flex-1">
          {children}
        </main>

        <Footer />
        <MobileActionBar />

        <Scripts />
      </body>
    </html>
  )
}
