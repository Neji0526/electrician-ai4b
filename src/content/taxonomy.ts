/**
 * Category vocabularies.
 *
 * These live apart from the records that use them so a component can render a
 * filter bar without statically importing (and therefore bundling) every
 * service, FAQ and article body. See the note in `src/content/index.ts` about
 * why the record modules are loaded dynamically.
 */

export const serviceCategories = [
  'Repairs & Troubleshooting',
  'Panels & Power',
  'Installations',
  'Safety & Inspections',
  'Commercial',
] as const

export const faqCategories = [
  'Appointments & Scheduling',
  'Pricing & Estimates',
  'Emergency Service',
  'Electrical Safety',
  'Panels & Breakers',
  'Installations',
  'Permits & Inspections',
  'Commercial Work',
  'Warranty & Guarantees',
] as const

export const postCategories = [
  'Electrical Safety',
  'Panels & Breakers',
  'Lighting',
  'EV Charging',
  'Home Rewiring',
  'Energy Efficiency',
  'Generators',
  'Commercial Electrical',
  'Homeowner Guides',
] as const
