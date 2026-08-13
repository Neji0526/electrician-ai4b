import type { ServiceArea } from './types.ts'

export const areas: ServiceArea[] = [
  {
    slug: 'austin',
    city: 'Austin',
    state: 'TX',
    county: 'Travis County',
    zips: ['78701', '78702', '78703', '78704', '78722', '78723', '78731', '78745', '78748', '78751', '78756', '78757', '78758', '78759'],
    neighborhoods: ['Hyde Park', 'Travis Heights', 'Crestview', 'Mueller', 'Zilker', 'Allandale', 'South Congress', 'Windsor Park'],
    driveTime: 'Base of operations — trucks are already in the field',
    responseTime: 'Same-day repair slots most weekdays. Emergency response typically 45–75 minutes.',
    population: '~975,000',
    housingNote: 'A mix of 1920s bungalows in Hyde Park and Travis Heights, mid-century ranch homes in Allandale and Crestview, and new builds in Mueller and the far south.',
    localNote:
      'Austin is where most of our work is, and the housing stock is unusually mixed. In one week we might replace knob-and-tube in a Hyde Park bungalow, pigtail aluminum wiring in a 1969 Windsor Park ranch, and add an EV charger to a 2019 Mueller build.',
    intro: [
      {
        type: 'p',
        text: 'We have been working in Austin homes since 2009, and the shop is on Burnet Road in 78756. That matters more than it sounds: most of the neighborhoods we serve are within twenty minutes of the truck, so same-day repair calls are a normal part of the schedule rather than an exception.',
      },
      {
        type: 'p',
        text: 'Austin’s housing stock is what makes the work interesting. Central neighborhoods like Hyde Park, Clarksville and Travis Heights have homes from the 1920s and 30s, many still carrying original knob-and-tube in the attic or cloth-insulated cable at the panel. The 1950s–70s ring — Allandale, Crestview, Windsor Park, Barton Hills — is dominated by 100-amp services and Federal Pacific or Zinsco panels that need replacing. Newer construction east and far south usually has sound wiring but was built with no headroom for an EV charger or a heat pump.',
      },
      {
        type: 'h2',
        text: 'What we see most in Austin',
      },
      {
        type: 'ul',
        items: [
          'Federal Pacific Stab-Lok and Zinsco panels in homes built 1955–1980 — the most common reason we get called by home buyers during an option period',
          'Knob-and-tube discovered under blown-in attic insulation in central neighborhoods',
          '100-amp services that cannot absorb an EV charger without load management or an upgrade',
          'Ungrounded two-prong receptacles throughout pre-1965 homes',
          'Unpermitted garage conversions and ADU wiring that surfaces during a sale',
        ],
      },
      {
        type: 'note',
        title: 'Permits in the City of Austin',
        text: 'Panel replacements, service upgrades, rewires, EV chargers and generators all require a permit inside Austin city limits. We file it, meet the inspector, and hand you the closed permit — which is what a title company will want to see later.',
      },
    ],
    featuredServices: ['electrical-panel-upgrades', 'emergency-electrical-repair', 'ev-charger-installation', 'whole-home-rewiring', 'lighting-installation', 'electrical-inspections'],
    seo: {
      title: 'Electrician in Austin, TX | Licensed & Insured',
      description:
        'Licensed Austin electricians for panel upgrades, EV chargers, rewiring and 24/7 emergency repair. Same-day slots, upfront pricing, 8-year workmanship warranty.',
    },
  },

  {
    slug: 'round-rock',
    city: 'Round Rock',
    state: 'TX',
    county: 'Williamson County',
    zips: ['78664', '78665', '78681'],
    neighborhoods: ['Forest Creek', 'Teravista', 'Behrens Ranch', 'Old Town', 'Stone Oak', 'Chandler Creek'],
    driveTime: '25–35 minutes from the shop',
    responseTime: 'Same-day slots most weekdays. Emergency response typically 60–90 minutes.',
    population: '~125,000',
    housingNote: 'Predominantly 1985–2010 subdivisions with 150- and 200-amp services, plus older homes around Old Town.',
    localNote:
      'Round Rock homes are generally newer than Austin’s, so the work skews toward additions rather than remediation — EV chargers, standby generators, outdoor lighting and panel capacity for pool and shop equipment.',
    intro: [
      {
        type: 'p',
        text: 'Round Rock is our busiest service area outside Austin proper. Most of the housing here was built between 1985 and 2010, which means the wiring is usually sound copper and the panels are usually adequate — the calls we get are about adding capacity rather than fixing decay.',
      },
      {
        type: 'p',
        text: 'The exception is Old Town, where homes from the 1940s and 50s have the same aging-service issues we see in central Austin. And across all of Williamson County we do a steady volume of standby generator work; the grid events of the last few years made that a normal purchase rather than a luxury one.',
      },
      {
        type: 'h2',
        text: 'Common Round Rock jobs',
      },
      {
        type: 'ul',
        items: [
          'EV charger installations in attached garages — usually a short run and a straightforward permit',
          'Standby generator installs with automatic transfer switches',
          'Sub-panels for detached shops, pools and outdoor kitchens',
          'Landscape and security lighting on larger lots in Behrens Ranch and Teravista',
          'Panel replacements in Old Town homes',
        ],
      },
    ],
    featuredServices: ['ev-charger-installation', 'generator-installation', 'lighting-installation', 'electrical-panel-upgrades', 'surge-protection', 'emergency-electrical-repair'],
    seo: {
      title: 'Electrician in Round Rock, TX | Licensed & Insured',
      description:
        'Round Rock electricians for EV chargers, standby generators, panel upgrades and emergency repair. Same-day availability, permits handled, upfront pricing.',
    },
  },

  {
    slug: 'cedar-park',
    city: 'Cedar Park',
    state: 'TX',
    county: 'Williamson County',
    zips: ['78613', '78630'],
    neighborhoods: ['Buttercup Creek', 'Ranch at Brushy Creek', 'Cypress Creek', 'Twin Creeks', 'Anderson Mill West'],
    driveTime: '30–40 minutes from the shop',
    responseTime: 'Same-day slots most weekdays. Emergency response typically 60–90 minutes.',
    population: '~80,000',
    housingNote: 'Largely 1995–2015 construction on larger lots, with a growing number of homes adding solar, batteries and EV charging.',
    localNote:
      'Cedar Park has a high concentration of homes adding solar and battery storage, which brings a specific set of electrical questions about service capacity, interconnection and backup panel design.',
    intro: [
      {
        type: 'p',
        text: 'Cedar Park sits at the edge of the Hill Country, and the lots get bigger as you go west. That shapes the work: longer runs to detached garages and shops, more landscape lighting, more well pumps, and more homes far enough from a substation that a standby generator earns its keep.',
      },
      {
        type: 'p',
        text: 'We also see a lot of solar and battery retrofits here. When a homeowner adds storage, the question is almost never the panels — it is whether the existing service can support the interconnection and whether a critical-load sub-panel makes more sense than backing up the whole house.',
      },
      {
        type: 'h2',
        text: 'Common Cedar Park jobs',
      },
      {
        type: 'ul',
        items: [
          'Critical-load sub-panels for solar battery backup',
          'Long feeder runs to detached shops and workshops',
          'Well pump circuits and controls',
          'Landscape lighting on larger lots',
          'Whole-home surge protection, which matters more at the end of a long feeder',
        ],
      },
    ],
    featuredServices: ['electrical-panel-upgrades', 'generator-installation', 'surge-protection', 'ev-charger-installation', 'lighting-installation', 'new-construction-wiring'],
    seo: {
      title: 'Electrician in Cedar Park, TX | Licensed & Insured',
      description:
        'Cedar Park electricians for panel upgrades, generators, EV chargers, sub-panels and surge protection. Licensed, insured, upfront pricing.',
    },
  },

  {
    slug: 'georgetown',
    city: 'Georgetown',
    state: 'TX',
    county: 'Williamson County',
    zips: ['78626', '78628', '78633'],
    neighborhoods: ['Sun City', 'Old Town Georgetown', 'Berry Creek', 'Wolf Ranch', 'Serenada'],
    driveTime: '40–50 minutes from the shop',
    responseTime: 'Next-day scheduling standard, same-day when a truck is north. Emergency response typically 75–110 minutes.',
    population: '~85,000',
    housingNote: 'Sun City and Wolf Ranch bring newer single-story construction; Old Town has Victorian and early-1900s homes with original systems.',
    localNote:
      'Georgetown splits cleanly in two: newer active-adult and family construction where we do additions and upgrades, and the historic district where the work is careful remediation in homes that are over a century old.',
    intro: [
      {
        type: 'p',
        text: 'Georgetown’s Old Town historic district has some of the oldest housing stock we work in — homes from the 1890s through the 1920s, many with additions layered on across a century. Working in them takes patience: original knob-and-tube, later cloth-insulated runs, and 1970s additions all coexisting in the same attic.',
      },
      {
        type: 'p',
        text: 'On the other side of town, Sun City and Wolf Ranch are newer, well-built, and generate a different kind of call — accessibility lighting, ceiling fans, generator installs, and panel capacity for golf cart charging and workshop equipment.',
      },
      {
        type: 'h2',
        text: 'Common Georgetown jobs',
      },
      {
        type: 'ul',
        items: [
          'Knob-and-tube assessment and staged rewiring in Old Town',
          'Standby generator installation in Sun City',
          'Golf cart and EV charging circuits',
          'Under-cabinet and task lighting for accessibility',
          'Whole-house smoke and CO alarm replacement',
        ],
      },
      {
        type: 'note',
        title: 'Historic district work',
        text: 'Exterior electrical work in the Old Town historic overlay may require design review in addition to the standard permit. We factor that into the schedule up front rather than discovering it mid-project.',
      },
    ],
    featuredServices: ['whole-home-rewiring', 'generator-installation', 'smoke-and-co-detectors', 'lighting-installation', 'electrical-panel-upgrades', 'electrical-inspections'],
    seo: {
      title: 'Electrician in Georgetown, TX | Licensed & Insured',
      description:
        'Georgetown electricians for rewiring, generators, panel upgrades and lighting. Experienced with Old Town historic homes and Sun City construction.',
    },
  },

  {
    slug: 'pflugerville',
    city: 'Pflugerville',
    state: 'TX',
    county: 'Travis County',
    zips: ['78660', '78664'],
    neighborhoods: ['Falcon Pointe', 'Blackhawk', 'Highland Park', 'Springbrook', 'Avalon'],
    driveTime: '25–35 minutes from the shop',
    responseTime: 'Same-day slots most weekdays. Emergency response typically 55–85 minutes.',
    population: '~70,000',
    housingNote: 'Overwhelmingly 1998–2018 subdivision construction with 150- or 200-amp services already in place.',
    localNote:
      'Pflugerville is a young housing market, so the work is almost entirely additions and finish-out: EV chargers, patio and outdoor kitchen circuits, pool equipment, and converting garages into offices.',
    intro: [
      {
        type: 'p',
        text: 'Pflugerville’s housing is newer than almost anywhere else we serve, which means we rarely find failing wiring here. What we do find is families outgrowing what the builder installed — a two-car garage with one outlet, a patio with no power, and a panel that was sized for exactly the loads the house shipped with.',
      },
      {
        type: 'p',
        text: 'Garage conversions are a steady part of the work. A garage becoming a home office or a gym needs dedicated circuits, proper lighting, and often a small sub-panel, and it needs a permit if it changes the use of the space.',
      },
      {
        type: 'h2',
        text: 'Common Pflugerville jobs',
      },
      {
        type: 'ul',
        items: [
          'EV charger installs — usually clean, short runs in attached garages',
          'Garage conversion wiring for offices and gyms',
          'Pool and spa equipment circuits with proper bonding',
          'Outdoor kitchen and patio circuits',
          'Adding capacity for a second HVAC system or a heat pump water heater',
        ],
      },
    ],
    featuredServices: ['ev-charger-installation', 'outlet-and-switch-installation', 'lighting-installation', 'new-construction-wiring', 'ceiling-fan-installation', 'surge-protection'],
    seo: {
      title: 'Electrician in Pflugerville, TX | Licensed & Insured',
      description:
        'Pflugerville electricians for EV chargers, garage conversions, pool circuits, patio power and lighting. Licensed, insured, same-day availability.',
    },
  },

  {
    slug: 'lakeway',
    city: 'Lakeway',
    state: 'TX',
    county: 'Travis County',
    zips: ['78734', '78738', '78732'],
    neighborhoods: ['Rough Hollow', 'The Hills', 'Flintrock Falls', 'Lakeway Highlands', 'Steiner Ranch'],
    driveTime: '35–45 minutes from the shop',
    responseTime: 'Next-day scheduling standard. Emergency response typically 70–100 minutes.',
    population: '~20,000',
    housingNote: 'Larger custom homes, many with multiple HVAC systems, pools, docks and detached structures on steep lots.',
    localNote:
      'Lakeway work tends to be larger in scope: multiple sub-panels, dock and boathouse power, extensive landscape lighting on steep terrain, and whole-home generators sized for houses with three or four air conditioning systems.',
    intro: [
      {
        type: 'p',
        text: 'Homes around Lake Travis are bigger, more complex, and further from the substation. It is common to find three HVAC systems, a pool, a well, a detached casita, and a boat dock all hanging off one service. When any of that grows, the load calculation is the first conversation.',
      },
      {
        type: 'p',
        text: 'Dock and waterfront work has its own rules. Anything near water requires specific GFCI protection, bonding and equipotential planes, and the consequences of getting it wrong are severe. We do not treat a boat lift circuit as a normal exterior receptacle.',
      },
      {
        type: 'h2',
        text: 'Common Lakeway jobs',
      },
      {
        type: 'ul',
        items: [
          'Whole-home standby generators sized for multiple HVAC systems',
          'Dock, boat lift and waterfront circuits with proper GFCI and bonding',
          'Landscape lighting on steep and terraced lots',
          'Sub-panels for casitas, shops and pool equipment',
          'Surge protection at the end of long rural feeders',
        ],
      },
      {
        type: 'warning',
        title: 'Water and electricity',
        text: 'Electric shock drowning is a real hazard around private docks. If you have a boat lift or dock lighting that was installed without GFCI protection and bonding, have it inspected before swim season.',
      },
    ],
    featuredServices: ['generator-installation', 'lighting-installation', 'electrical-panel-upgrades', 'surge-protection', 'electrical-inspections', 'ev-charger-installation'],
    seo: {
      title: 'Electrician in Lakeway & Lake Travis, TX | Licensed & Insured',
      description:
        'Lakeway electricians for whole-home generators, dock and waterfront circuits, landscape lighting and panel upgrades. Licensed, insured, fully permitted.',
    },
  },

  {
    slug: 'kyle',
    city: 'Kyle',
    state: 'TX',
    county: 'Hays County',
    zips: ['78640'],
    neighborhoods: ['Plum Creek', 'Steeplechase', 'Waterleaf', 'Bunton Creek', 'Downtown Kyle'],
    driveTime: '35–45 minutes from the shop',
    responseTime: 'Next-day scheduling standard, same-day when a truck is south. Emergency response typically 70–100 minutes.',
    population: '~60,000',
    housingNote: 'Fast-growing subdivision construction from roughly 2004 onward, plus a small core of older homes downtown.',
    localNote:
      'Kyle has grown quickly, and a lot of the housing was built to a builder-grade minimum. The most common calls are adding what should have been there originally — outdoor circuits, garage power, and enough panel space to add anything at all.',
    intro: [
      {
        type: 'p',
        text: 'Kyle’s growth has been fast, and a lot of the housing was built to hit a price point. That shows up as panels with no spare slots, single-outlet garages, and no exterior receptacles beyond the one by the front door. None of it is unsafe — it is just thin.',
      },
      {
        type: 'p',
        text: 'The older core around downtown Kyle is a different story, with homes from the 1930s–60s where we do panel replacements and grounding upgrades.',
      },
      {
        type: 'h2',
        text: 'Common Kyle jobs',
      },
      {
        type: 'ul',
        items: [
          'Sub-panels to create space in a full builder-grade panel',
          'EV charger installation with load management to avoid a service upgrade',
          'Exterior and patio receptacles with in-use covers',
          'Ceiling fan installation on high great-room ceilings',
          'Panel replacement in older homes near downtown',
        ],
      },
    ],
    featuredServices: ['electrical-panel-upgrades', 'ev-charger-installation', 'outlet-and-switch-installation', 'ceiling-fan-installation', 'emergency-electrical-repair', 'surge-protection'],
    seo: {
      title: 'Electrician in Kyle, TX | Licensed & Insured',
      description:
        'Kyle electricians for panel upgrades, sub-panels, EV chargers, outdoor outlets and ceiling fans. Licensed, insured, upfront pricing.',
    },
  },

  {
    slug: 'buda',
    city: 'Buda',
    state: 'TX',
    county: 'Hays County',
    zips: ['78610'],
    neighborhoods: ['Garlic Creek', 'Sunfield', 'Whispering Hollow', 'Downtown Buda', 'Elm Grove'],
    driveTime: '30–40 minutes from the shop',
    responseTime: 'Next-day scheduling standard, same-day when a truck is south. Emergency response typically 65–95 minutes.',
    population: '~20,000',
    housingNote: 'Newer subdivisions plus rural properties on acreage with wells, shops and detached structures.',
    localNote:
      'Buda mixes new subdivision homes with properties on acreage. The acreage work — long feeder runs to barns and shops, well pump circuits, and generators — is a meaningful share of what we do here.',
    intro: [
      {
        type: 'p',
        text: 'Buda covers two different kinds of work. In the newer subdivisions like Sunfield and Garlic Creek, it is the standard list: EV chargers, patio circuits, fans and lighting. Out on acreage, it gets more involved — running a properly sized feeder 300 feet to a barn or shop, wiring well pumps and pressure controls, and installing generators for properties that lose power more often than town does.',
      },
      {
        type: 'p',
        text: 'Long runs are where corners get cut most often. Voltage drop over distance is real, and undersized feeders to outbuildings are one of the most common problems we get called to correct.',
      },
      {
        type: 'h2',
        text: 'Common Buda jobs',
      },
      {
        type: 'ul',
        items: [
          'Feeders and sub-panels for barns, shops and detached garages',
          'Well pump circuits, controls and pressure switch wiring',
          'Standby generators for properties with frequent outages',
          'Trenching and direct-burial runs across acreage',
          'EV chargers and patio circuits in newer subdivisions',
        ],
      },
    ],
    featuredServices: ['electrical-panel-upgrades', 'generator-installation', 'new-construction-wiring', 'ev-charger-installation', 'lighting-installation', 'electrical-inspections'],
    seo: {
      title: 'Electrician in Buda, TX | Licensed & Insured',
      description:
        'Buda electricians for shop and barn feeders, well pumps, generators, panel upgrades and EV chargers. Licensed, insured, serving Hays County.',
    },
  },
]
