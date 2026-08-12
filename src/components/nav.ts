/** Single source of truth for the primary navigation. */
export const primaryNav = [
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Reviews', href: '/reviews' },
  { label: 'Service Areas', href: '/service-areas' },
  { label: 'FAQs', href: '/faq' },
  { label: 'Contact', href: '/contact' },
] as const

export const footerNav = {
  quickLinks: [
    { label: 'About Us', href: '/about' },
    { label: 'Our Team', href: '/team' },
    { label: 'Reviews', href: '/reviews' },
    { label: 'Projects', href: '/projects' },
    { label: 'Tips & Guides', href: '/blog' },
    { label: 'FAQs', href: '/faq' },
    { label: 'Contact', href: '/contact' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Photo Credits', href: '/credits' },
    { label: 'Sitemap', href: '/sitemap' },
  ],
} as const
