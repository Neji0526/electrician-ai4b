/** Single source of truth for the primary navigation. */
export const primaryNav = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Service Areas', href: '/service-areas' },
  { label: 'Projects', href: '/projects' },
  { label: 'Reviews', href: '/reviews' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
] as const

export const footerNav = {
  services: { title: 'Popular services', href: '/services' },
  company: [
    { label: 'About us', href: '/about' },
    { label: 'Our team', href: '/team' },
    { label: 'Recent projects', href: '/projects' },
    { label: 'Customer reviews', href: '/reviews' },
    { label: 'Resource center', href: '/blog' },
    { label: 'FAQ', href: '/faq' },
  ],
  support: [
    { label: 'Contact us', href: '/contact' },
    { label: 'Request an estimate', href: '/request-estimate' },
    { label: 'Emergency electrician', href: '/emergency-electrician' },
    { label: 'Service areas', href: '/service-areas' },
    { label: 'Privacy policy', href: '/privacy' },
    { label: 'Terms of service', href: '/terms' },
  ],
} as const
