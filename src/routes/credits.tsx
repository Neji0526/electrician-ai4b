import { createFileRoute } from '@tanstack/react-router'

import { PageHero } from '~/components/PageHero'
import { Section } from '~/components/ui'
import { business } from '~/content/business'
import { seo } from '~/lib/seo'
import { breadcrumbSchema } from '~/lib/schema'
import credits from '~/content/photo-credits.json'

const TRAIL = [
  { label: 'Home', href: '/' },
  { label: 'Photo Credits', href: '/credits' },
]

interface Credit {
  file: string
  title: string
  author: string
  licence: string
  licenceUrl: string
  pageUrl: string
  describes: string
}

export const Route = createFileRoute('/credits')({
  loader: async () => ({ credits: credits as Credit[] }),
  head: () =>
    seo({
      title: 'Photo Credits & Licences',
      description: `Attribution for the photography used on the ${business.name} website, with the author, licence and source for every image.`,
      path: '/credits',
      schema: breadcrumbSchema(TRAIL),
    }),
  component: CreditsPage,
})

function CreditsPage() {
  const { credits: list } = Route.useLoaderData()

  return (
    <>
      <PageHero
        trail={TRAIL}
        title="Photo credits"
        intro={
          <>
            Photography on this site comes from Wikimedia Commons under licences that permit
            commercial use. Several of those licences require attribution, so every image is
            credited below with its author, licence and source.
          </>
        }
        showActions={false}
      />

      <Section>
        <p className="text-[0.9375rem] text-muted">
          {list.length} images. Team portraits are placeholders pending real staff photography and
          are not listed here.
        </p>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[46rem] border-collapse text-left text-[0.9375rem]">
            <caption className="sr-only">Attribution for every photograph used on this site</caption>
            <thead>
              <tr className="border-b-2 border-line-strong">
                <th scope="col" className="py-3 pr-4 font-bold text-ink">
                  Image
                </th>
                <th scope="col" className="py-3 pr-4 font-bold text-ink">
                  Author
                </th>
                <th scope="col" className="py-3 pr-4 font-bold text-ink">
                  Licence
                </th>
                <th scope="col" className="py-3 font-bold text-ink">
                  Source
                </th>
              </tr>
            </thead>
            <tbody>
              {list.map((credit) => (
                <tr key={credit.file} className="border-b border-line last:border-0 align-top">
                  <td className="py-3 pr-4">
                    <span className="block font-semibold text-ink">{credit.title}</span>
                    <code className="text-xs text-muted">{credit.file}</code>
                  </td>
                  <td className="py-3 pr-4 text-ink-soft">{credit.author}</td>
                  <td className="py-3 pr-4">
                    {credit.licenceUrl ? (
                      <a
                        href={credit.licenceUrl}
                        target="_blank"
                        rel="noopener noreferrer license"
                        className="text-brand-700 underline underline-offset-2"
                      >
                        {credit.licence}
                      </a>
                    ) : (
                      <span className="text-ink-soft">{credit.licence}</span>
                    )}
                  </td>
                  <td className="py-3">
                    <a
                      href={credit.pageUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-700 underline underline-offset-2"
                    >
                      Wikimedia Commons
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </>
  )
}
