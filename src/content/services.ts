import type { Service } from './types.ts'

const img = (slug: string, alt: string) => ({
  src: `/images/services/${slug}.svg`,
  alt,
  width: 1200,
  height: 800,
})

export { serviceCategories } from './taxonomy.ts'

export const services: Service[] = [
  {
    slug: 'emergency-electrical-repair',
    name: 'Emergency Electrical Repair',
    shortName: 'Emergency Repair',
    category: 'Repairs & Troubleshooting',
    icon: 'bolt-alert',
    audience: 'both',
    summary:
      'Burning smell, sparking outlet, hot panel or no power? A licensed electrician answers the phone 24/7 and we roll a truck the same night.',
    intro:
      'Electrical emergencies do not wait for business hours. If you smell something burning, see sparks, or lose power to part of the house, the safe move is to stop using the circuit and call. We keep an on-call electrician and a stocked truck available every night and weekend, and we tell you over the phone what to shut off before we arrive.',
    heroImage: img('emergency-electrical-repair', 'Electrician testing a residential panel by flashlight during an after-hours call'),
    startingPrice: 149,
    priceNote: 'After-hours diagnostic fee, applied to the repair',
    emergencyEligible: true,
    sameDayEligible: true,
    featured: true,
    sortOrder: 1,
    signs: [
      {
        title: 'You smell burning plastic or hot metal',
        text: 'That smell is insulation cooking on an overloaded or loose connection. Shut off the breaker feeding that area if you can do it safely, and call. Do not wait to see whether it goes away.',
      },
      {
        title: 'An outlet, switch or panel is warm to the touch',
        text: 'Devices should be room temperature. Warmth means resistance where there should be none — usually a backstabbed wire or a loose lug that is on its way to arcing.',
      },
      {
        title: 'Sparks, buzzing or a popping sound',
        text: 'A brief spark when unplugging a heavy appliance is normal. Sparks that repeat, buzzing from a wall or panel, and popping are not — those are arcing faults and they start fires.',
      },
      {
        title: 'Half the house lost power but no breaker tripped',
        text: 'That pattern usually means a lost neutral or a failing service conductor, not a normal breaker trip. It can push 240 volts into 120-volt equipment and damage everything plugged in.',
      },
    ],
    includes: [
      'Licensed electrician on the phone, not an answering service',
      'Safety guidance before we arrive — what to shut off and what to unplug',
      'Full diagnostic with thermal and circuit-tracing tools',
      'Temporary make-safe so you can sleep in the house tonight',
      'Written repair options and prices before we start',
      'Most common parts on the truck: breakers, receptacles, lugs, whips, connectors',
      'Photos of what we found, sent to you for insurance or landlord records',
    ],
    process: [
      {
        title: 'Call and stabilize',
        text: 'We pick up 24/7. Before anything else, we walk you through shutting off the affected circuit or the main, and tell you what not to touch.',
      },
      {
        title: 'Dispatch and ETA',
        text: 'You get the electrician’s name and a real arrival window, not a four-hour block. Most Austin-area calls have a truck on site in 60 to 90 minutes.',
      },
      {
        title: 'Diagnose the actual fault',
        text: 'We test rather than guess: load readings, voltage drop, thermal imaging on the panel, and circuit tracing to find the exact failure point.',
      },
      {
        title: 'Make safe, then quote',
        text: 'We isolate the hazard first so the house is safe, then show you what we found and price the permanent repair. You decide before we go further.',
      },
      {
        title: 'Repair and verify',
        text: 'We complete the repair, re-test under load, and confirm every affected circuit is back to normal before we leave.',
      },
    ],
    pricing: [
      { label: 'After-hours diagnostic', range: '$149', note: 'Credited toward the repair if you proceed' },
      { label: 'Breaker replacement', range: '$185 – $340', note: 'Depends on breaker type — AFCI and GFCI cost more' },
      { label: 'Burned receptacle or switch repair', range: '$210 – $450', note: 'Includes replacing damaged wire back to good copper' },
      { label: 'Failed service entrance or meter repair', range: '$900 – $2,800', note: 'Utility coordination and permit included where required' },
    ],
    safetyNotes: [
      'If you see fire, smoke, or water touching live equipment, call 911 first. We are the second call.',
      'Never reset a breaker that trips again immediately. It is doing its job — resetting it repeatedly is how a fault becomes a fire.',
      'Do not run extension cords from a working circuit to a dead one. That is how a temporary problem becomes an overloaded circuit.',
    ],
    related: ['circuit-breaker-repair', 'electrical-panel-upgrades', 'electrical-inspections'],
    seo: {
      title: '24/7 Emergency Electrician in Austin, TX',
      description:
        'Sparking outlet, burning smell, or sudden power loss in Austin? Licensed emergency electricians answer 24/7 with 60–90 minute typical on-site response.',
    },
  },

  {
    slug: 'electrical-panel-upgrades',
    name: 'Electrical Panel Upgrades',
    shortName: 'Panel Upgrades',
    category: 'Panels & Power',
    icon: 'panel',
    audience: 'both',
    summary:
      'Replace an undersized, obsolete or unsafe panel with a 200-amp service that can carry a modern house — HVAC, EV charger, induction range and all.',
    intro:
      'A panel replacement is the single most common job we do in Austin homes built before 1990. Most were built with 100-amp service and a panel designed for a house with one air conditioner and no dishwasher. Add a heat pump, a hot tub and an EV charger and there is nowhere left to land a breaker. We replace the panel, and where the service itself is undersized we upgrade the meter, mast and grounding along with it.',
    heroImage: img('electrical-panel-upgrades', 'New 200-amp load center with neatly dressed circuit conductors'),
    startingPrice: 2400,
    priceNote: 'Typical 200-amp panel replacement, permit included',
    emergencyEligible: false,
    sameDayEligible: false,
    featured: true,
    sortOrder: 2,
    signs: [
      {
        title: 'Your panel is a Federal Pacific Stab-Lok, Zinsco or Sylvania',
        text: 'These brands have a documented history of breakers that fail to trip under fault. Insurers increasingly refuse to write policies on them. If you have one, replacement is not optional maintenance — it is the fix.',
      },
      {
        title: 'The panel is full, or full of tandem breakers',
        text: 'When every slot is doubled up, the bus is likely carrying more than it was listed for. There is no safe way to add a circuit until the panel is replaced.',
      },
      {
        title: 'You are adding a big load',
        text: 'EV chargers, heat pumps, tankless water heaters, hot tubs and shop equipment all require a load calculation. A 100-amp service usually cannot absorb one without an upgrade.',
      },
      {
        title: 'Rust, scorch marks, or a warm dead front',
        text: 'Corrosion on the bus or heat discoloration around a breaker means connections are degrading. Both are replace-now conditions.',
      },
    ],
    includes: [
      'Full load calculation to NEC Article 220 before we quote a size',
      'New load center with copper bus and a main breaker sized to your service',
      'New AFCI and GFCI protection where current code requires it',
      'Re-terminating and labeling every branch circuit',
      'Grounding electrode system brought up to code — rods, water bond, gas bond',
      'Meter base, riser and weatherhead replacement when the service is upgraded',
      'Permit filed with the City of Austin and the inspection scheduled',
      'Coordination with Austin Energy for the disconnect and reconnect',
      'A typed directory so every breaker is actually labeled',
    ],
    process: [
      {
        title: 'On-site load evaluation',
        text: 'We open the panel, photograph the bus and breakers, count circuits, and run a load calculation against what you plan to add over the next few years. You get a written recommendation for 150-amp or 200-amp service, not a guess.',
      },
      {
        title: 'Permit and utility scheduling',
        text: 'We file the permit and coordinate the Austin Energy disconnect. This is the step that takes calendar time — usually one to two weeks — and it is the step unlicensed installers skip.',
      },
      {
        title: 'Replacement day',
        text: 'Power is off for most of the day, typically 6 to 8 hours. We set the new can, land and label every circuit, upgrade the grounding, and reinstall the meter.',
      },
      {
        title: 'Inspection',
        text: 'We meet the city inspector, walk the work, and handle any correction on our dime. You get the closed permit for your records — it matters when you sell.',
      },
      {
        title: 'Walkthrough',
        text: 'We go through the new directory with you, show you which breakers are AFCI and GFCI, and explain how to reset them.',
      },
    ],
    pricing: [
      { label: 'Panel replacement, same 100A service', range: '$1,900 – $2,600', note: 'Existing service conductors reused' },
      { label: '200-amp service upgrade', range: '$2,900 – $4,800', note: 'New panel, meter base, mast and grounding' },
      { label: 'Sub-panel installation', range: '$1,100 – $2,200', note: 'Garage, shop, addition or ADU' },
      { label: 'Federal Pacific / Zinsco replacement', range: '$2,400 – $4,200', note: 'Often includes replacing damaged branch conductors' },
    ],
    safetyNotes: [
      'A panel swap requires a permit and an inspection in the City of Austin. An unpermitted panel shows up in a title search and can hold up a sale.',
      'Never buy breakers by "it fits." Breakers are listed for a specific panel; a mismatched brand voids the listing and the insurance.',
      'If your panel is a Federal Pacific Stab-Lok, do not treat it as a future project. Those breakers can fail to trip on a dead short.',
    ],
    related: ['circuit-breaker-repair', 'ev-charger-installation', 'whole-home-rewiring', 'electrical-inspections'],
    seo: {
      title: 'Electrical Panel Upgrades & 200-Amp Service in Austin, TX',
      description:
        'Panel replacement and 200-amp service upgrades in Austin. Federal Pacific and Zinsco specialists. Permit, inspection and load calculation included.',
    },
  },

  {
    slug: 'circuit-breaker-repair',
    name: 'Circuit Breaker Repair & Replacement',
    shortName: 'Breaker Repair',
    category: 'Repairs & Troubleshooting',
    icon: 'breaker',
    audience: 'both',
    summary:
      'Breaker keeps tripping? We test the circuit under load and find what is actually overloading it instead of just swapping the breaker.',
    intro:
      'A breaker that trips is usually not a broken breaker. It is a circuit telling you something: too much load, a damaged conductor, moisture in a box, or an appliance that has started to fail. We measure the circuit under real load, isolate the fault, and fix the cause. Replacing a tripping breaker with a bigger one is the single most dangerous "fix" in a house, and we will not do it.',
    heroImage: img('circuit-breaker-repair', 'Electrician clamping an ammeter around a branch circuit conductor inside a panel'),
    startingPrice: 89,
    priceNote: 'Diagnostic, applied to the repair',
    emergencyEligible: true,
    sameDayEligible: true,
    featured: true,
    sortOrder: 3,
    signs: [
      {
        title: 'The same breaker trips every few days',
        text: 'A repeating trip on one circuit means either sustained overload or a developing fault. We log the actual amperage over the loads you really run.',
      },
      {
        title: 'A breaker trips only when a specific appliance runs',
        text: 'Usually a failing motor, a heating element with a partial short, or a shared neutral. The appliance is often the culprit, and we can tell you which one before you pay for a rewire.',
      },
      {
        title: 'An AFCI or GFCI trips with nothing plugged in',
        text: 'That points to a wiring fault — a nicked conductor, a shared neutral across circuits, or moisture. It is exactly what those devices were designed to catch.',
      },
      {
        title: 'The breaker feels loose or will not reset',
        text: 'A breaker that will not latch has usually failed internally, or the bus stab behind it is burned. The second case needs to be seen immediately.',
      },
    ],
    includes: [
      'Amperage logging on the circuit under your real load',
      'Insulation resistance and continuity testing to find damaged conductors',
      'Receptacle-by-receptacle isolation to locate the fault',
      'Thermal scan of the panel to catch loose or heating connections',
      'Breaker replacement with the correct listed breaker for your panel',
      'Load redistribution across the panel when a circuit is simply overloaded',
      'Plain-English explanation of what was wrong and what to watch for',
    ],
    process: [
      {
        title: 'Reproduce the trip',
        text: 'We ask what runs when it trips and try to make it happen while we are watching, with meters on the circuit.',
      },
      {
        title: 'Measure, do not guess',
        text: 'Clamp meter on the conductor, insulation test on the run, and a thermal look at the panel connections.',
      },
      {
        title: 'Isolate the fault',
        text: 'We split the circuit at junction points until the fault sits in one identifiable section, so the repair is targeted instead of a full rewire.',
      },
      {
        title: 'Repair and re-test',
        text: 'Replace the failed device, conductor section, or breaker, then load the circuit again and confirm it holds.',
      },
    ],
    pricing: [
      { label: 'Circuit diagnostic', range: '$89', note: 'Applied to the repair if you proceed' },
      { label: 'Standard breaker replacement', range: '$185 – $260', note: 'Listed breaker for your panel' },
      { label: 'AFCI / GFCI breaker replacement', range: '$245 – $340', note: 'Required on most modern circuits' },
      { label: 'Branch circuit fault repair', range: '$280 – $900', note: 'Depends on where the damaged section runs' },
    ],
    safetyNotes: [
      'Never replace a 15-amp breaker with a 20-amp breaker to stop nuisance tripping. The breaker protects the wire, and 14-gauge wire cannot carry 20 amps safely.',
      'If a breaker trips instantly every time you reset it, stop resetting it. There is a dead short on that circuit.',
      'A warm breaker handle or a scorch mark on the dead front means stop and call the same day.',
    ],
    related: ['electrical-panel-upgrades', 'emergency-electrical-repair', 'electrical-inspections'],
    seo: {
      title: 'Circuit Breaker Repair in Austin, TX | Breaker Keeps Tripping',
      description:
        'Breaker tripping repeatedly? Austin electricians test the circuit under load, find the real cause, and fix it. Same-day appointments available.',
    },
  },

  {
    slug: 'outlet-and-switch-installation',
    name: 'Outlet & Switch Installation',
    shortName: 'Outlets & Switches',
    category: 'Installations',
    icon: 'outlet',
    audience: 'both',
    summary:
      'New outlets where you actually need them, GFCI protection where code requires it, and replacement of the loose or scorched devices you already have.',
    intro:
      'Most houses have outlets where the builder found it cheapest, not where you live. Adding a receptacle behind a wall-mounted TV, putting GFCI protection on a 1970s kitchen counter, or replacing two-prong outlets with grounded ones are all straightforward jobs — but each one has a code requirement behind it that determines how it has to be done.',
    heroImage: img('outlet-and-switch-installation', 'Electrician installing a tamper-resistant receptacle in a residential wall box'),
    startingPrice: 145,
    priceNote: 'First device, installed',
    emergencyEligible: false,
    sameDayEligible: true,
    featured: false,
    sortOrder: 4,
    signs: [
      {
        title: 'You are running power strips and extension cords',
        text: 'Permanent extension cords are a sign the circuit layout does not match how the room is used. Adding a properly placed receptacle is usually cheaper than you expect.',
      },
      {
        title: 'Plugs fall out of the outlet',
        text: 'The contacts inside have lost tension. That means arcing every time you plug something in, and it gets worse with heat.',
      },
      {
        title: 'Two-prong outlets with no ground',
        text: 'Ungrounded receptacles are common in Austin homes built before 1965. There are three legal ways to handle them, and only one is right for your wiring.',
      },
      {
        title: 'No GFCI in a kitchen, bath, garage, or outdoors',
        text: 'Every one of those locations requires GFCI protection today. It is the single cheapest safety upgrade in a house.',
      },
    ],
    includes: [
      'Tamper-resistant receptacles as required by current code',
      'GFCI and AFCI protection where the location or circuit demands it',
      'Fishing new runs through finished walls with minimal drywall opening',
      'Weather-resistant receptacles and in-use covers for exterior locations',
      'USB-C combination receptacles where you want them',
      'Dimmers matched to your fixtures so LEDs do not buzz or flicker',
      'Smart switches configured and tested on your Wi-Fi before we leave',
      'Patch-ready openings — we cut clean and leave the drywall repairable',
    ],
    process: [
      {
        title: 'Walk the room',
        text: 'We look at where you actually need power, then check which circuit can carry it and where the nearest accessible junction is.',
      },
      {
        title: 'Confirm the circuit can take it',
        text: 'A new receptacle on an already-loaded kitchen circuit just moves the problem. We check the load before we add.',
      },
      {
        title: 'Install',
        text: 'Cut, fish, box, terminate with screw connections rather than backstabs, and secure the device square to the wall.',
      },
      {
        title: 'Test and label',
        text: 'Polarity, ground, and GFCI trip test on every device, plus a note in the panel directory if we added a circuit.',
      },
    ],
    pricing: [
      { label: 'Replace an existing outlet or switch', range: '$145', note: 'First device; $45 each additional at the same visit' },
      { label: 'Add a new receptacle on an existing circuit', range: '$240 – $420', note: 'Depends on wall access and run length' },
      { label: 'GFCI receptacle install', range: '$185 – $265', note: 'Protects downstream outlets on the same circuit' },
      { label: 'Exterior weather-resistant outlet', range: '$310 – $520', note: 'Includes in-use cover and GFCI protection' },
    ],
    safetyNotes: [
      'A three-prong outlet on ungrounded wiring is illegal and dangerous unless it is GFCI-protected and labeled "No Equipment Ground."',
      'Backstabbed devices — where wire pushes into a hole instead of wrapping a screw — are the most common cause of failed receptacles we find.',
      'Outdoor receptacles need weather-resistant devices and in-use covers, not just a flip lid.',
    ],
    related: ['lighting-installation', 'smart-home-electrical', 'whole-home-rewiring'],
    seo: {
      title: 'Outlet & Switch Installation in Austin, TX',
      description:
        'Add outlets, install GFCI protection, replace two-prong receptacles and upgrade switches. Licensed Austin electricians, same-day availability.',
    },
  },

  {
    slug: 'ceiling-fan-installation',
    name: 'Ceiling Fan Installation',
    shortName: 'Ceiling Fans',
    category: 'Installations',
    icon: 'fan',
    audience: 'residential',
    summary:
      'Fan-rated boxes, correct bracing, and balanced installation — including tall ceilings, sloped ceilings and covered patios.',
    intro:
      'A ceiling fan weighs 15 to 50 pounds and it moves the whole time it runs. The box it hangs from has to be listed for fan support, and most standard light boxes are not. Roughly half the fan calls we take in Austin are replacements for fans mounted to a plain plastic light box that has started to pull loose.',
    heroImage: img('ceiling-fan-installation', 'Electrician mounting a ceiling fan to a fan-rated brace box'),
    startingPrice: 225,
    priceNote: 'Standard replacement on an existing fan-rated box',
    emergencyEligible: false,
    sameDayEligible: true,
    featured: false,
    sortOrder: 5,
    signs: [
      {
        title: 'The fan wobbles or the canopy has shifted',
        text: 'Wobble is either a blade balance issue or a box that is working loose. The second one is the reason fans come down.',
      },
      {
        title: 'You want a fan where there is only a light',
        text: 'A light box is not rated to support a moving load. It has to be replaced with a fan-rated brace box, usually without opening the ceiling.',
      },
      {
        title: 'The fan hums or the light flickers on the dimmer',
        text: 'Fan motors on a standard dimmer will hum and can burn out. They need a fan-rated control or a separate switch leg.',
      },
      {
        title: 'Outdoor fan on a covered patio',
        text: 'Patio fans need a damp- or wet-rated fan and the right box. Indoor fans rust out fast in Central Texas humidity.',
      },
    ],
    includes: [
      'Fan-rated brace box installed from below where the ceiling is finished',
      'Down-rod sized for your ceiling height so the fan actually moves air',
      'Sloped-ceiling adapters where needed',
      'Separate switch legs for fan and light, or a fan-rated wall control',
      'Balancing so the fan runs without wobble at high speed',
      'Damp- and wet-rated fans for patios and porches',
      'Removal and haul-away of the old fan',
    ],
    process: [
      {
        title: 'Check what is above the ceiling',
        text: 'We confirm the joist location and whether the existing box is fan-rated. If it is not, it gets replaced — that is not optional.',
      },
      {
        title: 'Set the support',
        text: 'A fan-rated brace box goes in through the existing opening and expands against the joists. No attic access needed in most cases.',
      },
      {
        title: 'Wire and hang',
        text: 'We size the down rod to your ceiling, wire the fan and light legs the way you want them switched, and hang the fan.',
      },
      {
        title: 'Balance and test',
        text: 'Run all speeds, balance the blades, and confirm the remote or wall control is paired and working.',
      },
    ],
    pricing: [
      { label: 'Replace an existing fan', range: '$225 – $325', note: 'Existing fan-rated box, standard ceiling' },
      { label: 'New fan where a light exists', range: '$345 – $520', note: 'Includes fan-rated brace box' },
      { label: 'High or vaulted ceiling', range: '$420 – $680', note: 'Lift or scaffold, sloped adapter and down rod' },
      { label: 'Covered patio fan', range: '$395 – $640', note: 'Damp/wet-rated install with weatherproof box' },
    ],
    safetyNotes: [
      'A ceiling fan must hang from a box marked "Acceptable for Fan Support." A standard plastic light box is not.',
      'Fan motors on a standard light dimmer will overheat. Use the control the manufacturer specifies.',
      'Blades must clear 7 feet above the floor and 18 inches from any wall.',
    ],
    related: ['lighting-installation', 'outlet-and-switch-installation', 'smart-home-electrical'],
    seo: {
      title: 'Ceiling Fan Installation in Austin, TX',
      description:
        'Ceiling fan installation and replacement in Austin — fan-rated boxes, vaulted ceilings, sloped adapters and covered patios. Same-day slots available.',
    },
  },

  {
    slug: 'lighting-installation',
    name: 'Indoor & Outdoor Lighting',
    shortName: 'Lighting',
    category: 'Installations',
    icon: 'bulb',
    audience: 'both',
    summary:
      'Recessed lighting, under-cabinet, landscape and security lighting — laid out properly so the room is lit evenly and the LEDs do not flicker.',
    intro:
      'Good lighting is a layout problem before it is an electrical problem. Six cans in the wrong places will light a kitchen worse than four in the right ones. We plan the layout on site, match the color temperature across the room, and pair the dimmer to the fixture so you do not end up with buzzing or flicker at low levels.',
    heroImage: img('lighting-installation', 'Recessed LED lighting installed in a kitchen ceiling'),
    startingPrice: 195,
    priceNote: 'Per recessed fixture in an accessible ceiling',
    emergencyEligible: false,
    sameDayEligible: false,
    featured: true,
    sortOrder: 6,
    signs: [
      {
        title: 'The room has dark corners and hot spots',
        text: 'A spacing problem. Recessed cans need to be laid out against ceiling height and wall distance, not just spread evenly.',
      },
      {
        title: 'Your LEDs buzz, flicker or will not dim low',
        text: 'Almost always a dimmer that is not on the fixture manufacturer’s compatibility list, or too small a load on the dimmer.',
      },
      {
        title: 'Mismatched light color between fixtures',
        text: 'One 2700K bulb next to a 4000K bulb reads as "something looks off." We spec a consistent color temperature across the space.',
      },
      {
        title: 'The yard is dark or the security light is on all night',
        text: 'Landscape and security lighting should be zoned, on a timer or photocell, and aimed so it lights the ground rather than the neighbor’s window.',
      },
    ],
    includes: [
      'On-site layout with fixture spacing planned to ceiling height',
      'Airtight, IC-rated housings where fixtures sit in insulated ceilings',
      'Consistent color temperature and CRI across the space',
      'Dimmers matched to the fixture compatibility list',
      'Under-cabinet lighting with hidden drivers and switching',
      'Low-voltage landscape lighting with transformer sizing and burial-rated cable',
      'Motion-sensor and photocell security lighting, aimed and set on site',
      'Minimal-cut installation with patch-ready openings',
    ],
    process: [
      {
        title: 'Lay out the room',
        text: 'We mark positions on the ceiling with tape first so you can see the plan before a single hole is cut.',
      },
      {
        title: 'Check ceiling and circuit',
        text: 'Joist direction, insulation type, HVAC ducting and available circuit capacity all shape what is possible.',
      },
      {
        title: 'Install',
        text: 'Cut, run cable, set housings, and terminate. Attic runs are stapled and supported, not draped across joists.',
      },
      {
        title: 'Dial it in',
        text: 'We set dimmer low-end trim, confirm no flicker across the range, and aim adjustable fixtures with you in the room.',
      },
    ],
    pricing: [
      { label: 'Recessed light, accessible attic', range: '$195 – $265', note: 'Per fixture, on an existing circuit' },
      { label: 'Recessed light, no attic access', range: '$285 – $420', note: 'Per fixture, includes fishing the run' },
      { label: 'Under-cabinet lighting run', range: '$550 – $1,400', note: 'Typical kitchen, driver and switching included' },
      { label: 'Landscape lighting package', range: '$1,800 – $6,500', note: 'Transformer, burial cable, 8–20 fixtures' },
    ],
    safetyNotes: [
      'Recessed fixtures in an insulated ceiling must be IC-rated. Non-IC housings buried in insulation are a fire risk.',
      'Landscape wiring must be listed for direct burial and protected by a GFCI-protected circuit.',
      'Exterior fixtures need a wet-rated listing — damp-rated is only for covered locations.',
    ],
    related: ['ceiling-fan-installation', 'outlet-and-switch-installation', 'smart-home-electrical'],
    seo: {
      title: 'Recessed, Landscape & Security Lighting Installation in Austin, TX',
      description:
        'Lighting installation in Austin: recessed cans, under-cabinet, landscape and security lighting. Proper layout, matched dimmers, no LED flicker.',
    },
  },

  {
    slug: 'ev-charger-installation',
    name: 'EV Charger Installation',
    shortName: 'EV Chargers',
    category: 'Panels & Power',
    icon: 'ev',
    audience: 'both',
    summary:
      'Level 2 charger installation with a real load calculation, the right circuit size, and a permitted install that will pass inspection.',
    intro:
      'A Level 2 charger is a 40 to 60 amp continuous load — the largest single thing most homes will ever add. The install itself is straightforward. The part that matters is whether your service can carry it, and whether the answer is a panel upgrade or a load-management device. We run the calculation first and tell you honestly which one you need.',
    heroImage: img('ev-charger-installation', 'Level 2 EV charger mounted on a garage wall with conduit run to the panel'),
    startingPrice: 750,
    priceNote: 'Typical garage install near the panel, permit included',
    emergencyEligible: false,
    sameDayEligible: false,
    featured: true,
    sortOrder: 7,
    signs: [
      {
        title: 'You are charging on a standard 120-volt outlet',
        text: 'Level 1 adds roughly 3 to 5 miles of range per hour. For most drivers that is not enough, and a standard receptacle was never designed for a 12-hour continuous draw.',
      },
      {
        title: 'The charger cord gets warm at the plug',
        text: 'Heat at the plug means the receptacle or connection cannot handle sustained current. Stop using it and have the circuit checked.',
      },
      {
        title: 'You have a 100-amp panel',
        text: 'A 100-amp service with central AC and an electric range usually has no headroom for a 48-amp charger. There are good answers — load management, a smaller circuit, or an upgrade — but it needs the calculation first.',
      },
      {
        title: 'You are buying a second EV',
        text: 'Two chargers on one service almost always needs either load sharing between units or a service upgrade.',
      },
    ],
    includes: [
      'NEC 220.87 load calculation against your actual service',
      'Dedicated 40A, 50A or 60A circuit sized for continuous duty',
      'Hardwired install or NEMA 14-50 receptacle, whichever your unit calls for',
      'GFCI protection as required for the receptacle option',
      'EMT or surface conduit run cleanly along the wall, not draped cable',
      'Load-management device installation when a service upgrade is not needed',
      'Permit and inspection with the City of Austin',
      'Charger commissioned, app connected, and charge session verified before we leave',
      'Austin Energy rebate paperwork prepared for you',
    ],
    process: [
      {
        title: 'Load calculation and site check',
        text: 'We measure your existing service load, look at the panel, and measure the run from panel to parking spot. That determines circuit size and price.',
      },
      {
        title: 'Give you the honest options',
        text: 'Sometimes the answer is a 60-amp circuit. Sometimes it is a 40-amp circuit that charges just as well overnight and saves you a panel upgrade. We show both.',
      },
      {
        title: 'Permit and install',
        text: 'Permit filed, then a one-day install in most cases. Conduit run, circuit landed, charger mounted at a height that lets the cable reach without strain.',
      },
      {
        title: 'Commission and inspect',
        text: 'We verify a real charge session at full rate, walk you through the app, and meet the inspector.',
      },
    ],
    pricing: [
      { label: 'Charger install near the panel', range: '$750 – $1,250', note: 'Under 25 feet, permit included' },
      { label: 'Long run or detached garage', range: '$1,300 – $2,900', note: 'Includes trenching or attic run as needed' },
      { label: 'Load-management device', range: '$650 – $1,100', note: 'Added cost; often avoids a panel upgrade' },
      { label: 'Charger install with panel upgrade', range: '$3,600 – $5,400', note: 'Bundled 200A upgrade and charger circuit' },
    ],
    safetyNotes: [
      'A NEMA 14-50 receptacle used for EV charging must be a commercial-grade device. The $12 hardware-store version is not rated for daily plug cycles at 40 amps.',
      'Continuous loads are sized at 125%. A 48-amp charger requires a 60-amp circuit — not a 50.',
      'Charging on an extension cord or a shared circuit is the most common cause of EV-related electrical fires.',
    ],
    related: ['electrical-panel-upgrades', 'circuit-breaker-repair', 'electrical-inspections'],
    seo: {
      title: 'EV Charger Installation in Austin, TX | Level 2 Home Charging',
      description:
        'Level 2 EV charger installation in Austin. Load calculation, correct circuit sizing, permitted install, Austin Energy rebate paperwork handled.',
    },
  },

  {
    slug: 'whole-home-rewiring',
    name: 'Whole-Home Rewiring',
    shortName: 'Rewiring',
    category: 'Panels & Power',
    icon: 'wire',
    audience: 'residential',
    summary:
      'Replacing knob-and-tube, cloth-wrapped and aluminum branch wiring — done in stages so you can keep living in the house.',
    intro:
      'Rewiring is the largest electrical job a house will ever have, and it is not always necessary. Plenty of Austin homes from the 1950s and 60s have sound copper wiring that just needs grounding and a new panel. What genuinely needs replacing is knob-and-tube, deteriorated cloth-insulated cable, and aluminum branch circuits. We inspect and tell you which category you are in before anyone talks about opening walls.',
    heroImage: img('whole-home-rewiring', 'New NM-B cable runs through open wall framing during a home rewire'),
    startingPrice: 12000,
    priceNote: 'Typical 1,500 sq ft home, permit included',
    emergencyEligible: false,
    sameDayEligible: false,
    featured: false,
    sortOrder: 8,
    signs: [
      {
        title: 'Knob-and-tube wiring',
        text: 'Common in Austin homes built before 1945. It has no ground, the insulation is 80 years old, and most insurers will not write a policy on it.',
      },
      {
        title: 'Cloth-insulated cable that crumbles',
        text: 'If the jacket flakes when touched at the panel, it is doing the same thing inside your walls where the heat is.',
      },
      {
        title: 'Aluminum branch circuit wiring',
        text: 'Used in homes built roughly 1965–1973. Aluminum expands more than copper and loosens connections over time. Sometimes it can be pigtailed with listed connectors instead of replaced.',
      },
      {
        title: 'Two-prong outlets throughout the house',
        text: 'No equipment ground anywhere means no safe path for a fault, and no protection for electronics.',
      },
    ],
    includes: [
      'Full pre-inspection with a written scope before any commitment',
      'Staged plan so you can live in the house — usually room by room or floor by floor',
      'New NM-B branch circuits, grounded throughout',
      'Dedicated circuits for kitchen, laundry, bathrooms and HVAC',
      'AFCI and GFCI protection to current code',
      'New panel and grounding electrode system',
      'Smoke and CO detectors interconnected as required on a rewire',
      'Permit, rough-in inspection and final inspection',
      'Drywall cut, patched and textured — we include the repair, not just the wire',
    ],
    process: [
      {
        title: 'Inspection and honest scope',
        text: 'We open representative boxes, check the panel, and sample the wiring. Some houses need a full rewire. Many need a partial. You get the real answer in writing.',
      },
      {
        title: 'Design and staging plan',
        text: 'We map circuits to how you use the house, then stage the work so you always have a working kitchen and at least one bathroom.',
      },
      {
        title: 'Permit and rough-in',
        text: 'New cable pulled, boxes set, panel installed. City inspector signs off the rough-in before anything is closed up.',
      },
      {
        title: 'Devices and finish',
        text: 'Receptacles, switches, fixtures and detectors installed and tested circuit by circuit.',
      },
      {
        title: 'Patch and final inspection',
        text: 'Drywall repaired and textured to match, then the final inspection and your closed permit.',
      },
    ],
    pricing: [
      { label: 'Partial rewire (kitchen + baths)', range: '$4,500 – $9,000', note: 'Where the rest of the house is sound' },
      { label: 'Whole-home rewire, 1,200–1,600 sq ft', range: '$11,000 – $18,000', note: 'Includes panel and drywall repair' },
      { label: 'Whole-home rewire, 2,000–3,000 sq ft', range: '$18,000 – $32,000', note: 'Two story adds access cost' },
      { label: 'Aluminum wiring pigtail remediation', range: '$2,400 – $5,800', note: 'Listed AlumiConn connectors at every device' },
    ],
    safetyNotes: [
      'Never let anyone extend knob-and-tube with modern cable. Mixing the two creates ungrounded circuits that look grounded.',
      'Aluminum branch wiring is not automatically a rewire. Listed pigtail connectors are an approved remediation and cost far less.',
      'Insulation blown over active knob-and-tube is a fire hazard and a code violation — it is a common finding in Austin attic upgrades.',
    ],
    related: ['electrical-panel-upgrades', 'electrical-inspections', 'outlet-and-switch-installation'],
    seo: {
      title: 'Whole-Home Rewiring in Austin, TX | Knob & Tube, Aluminum Wiring',
      description:
        'Whole-home and partial rewiring in Austin. Knob-and-tube, cloth-insulated and aluminum branch wiring replacement, staged so you can stay in the house.',
    },
  },

  {
    slug: 'electrical-inspections',
    name: 'Electrical Safety Inspections',
    shortName: 'Inspections',
    category: 'Safety & Inspections',
    icon: 'clipboard',
    audience: 'both',
    summary:
      'Pre-purchase, pre-sale and peace-of-mind inspections with a written, photographed report you can actually act on.',
    intro:
      'A general home inspector will note that a panel is a Federal Pacific. An electrician will tell you what that costs to fix, whether the branch wiring behind it is sound, and what has to happen before closing. We do full-system inspections for buyers, sellers, landlords and homeowners who simply want to know where they stand.',
    heroImage: img('electrical-inspections', 'Electrician documenting panel findings on a tablet during a safety inspection'),
    startingPrice: 289,
    priceNote: 'Full residential inspection with written report',
    emergencyEligible: false,
    sameDayEligible: true,
    featured: false,
    sortOrder: 9,
    signs: [
      {
        title: 'You are buying a home built before 1990',
        text: 'Panel brand, grounding, and the presence of aluminum or cloth wiring all materially change what the house will cost you. Better to know before the option period ends.',
      },
      {
        title: 'Your insurer asked for a four-point inspection',
        text: 'Common on older homes. We complete the electrical section with the documentation carriers accept.',
      },
      {
        title: 'You are selling and want no surprises',
        text: 'Finding an unpermitted sub-panel two days before closing is expensive. Finding it in advance is a scheduling problem.',
      },
      {
        title: 'Something just feels wrong',
        text: 'Warm switch plates, occasional flicker, a smell you cannot place. Those are worth a full look rather than a single service call.',
      },
    ],
    includes: [
      'Panel and sub-panel evaluation, including thermal imaging under load',
      'Service entrance, meter, mast and grounding electrode system',
      'Representative sampling of receptacles, switches and fixtures',
      'GFCI and AFCI presence and function testing',
      'Smoke and CO detector age, placement and interconnection check',
      'Attic and crawl space wiring inspection where accessible',
      'Identification of unpermitted or DIY work',
      'Written report with photos, severity ranking and repair cost ranges',
    ],
    process: [
      {
        title: 'Systems first',
        text: 'Service, meter, panel, grounding. Most consequential findings live here.',
      },
      {
        title: 'Circuit sampling',
        text: 'We test a representative set of devices in every room and every wet location, and open boxes where something looks off.',
      },
      {
        title: 'Concealed spaces',
        text: 'Attic and crawl space runs, junction boxes, and anything spliced outside a box.',
      },
      {
        title: 'Report',
        text: 'Same-day written report, ranked by urgency, each item with a photo and a real cost range so you can negotiate or plan.',
      },
    ],
    pricing: [
      { label: 'Residential safety inspection', range: '$289', note: 'Up to 2,500 sq ft, written report included' },
      { label: 'Pre-purchase inspection', range: '$329', note: 'Report formatted for option-period negotiation' },
      { label: 'Insurance four-point (electrical section)', range: '$225', note: 'Carrier-accepted documentation' },
      { label: 'Commercial inspection', range: 'From $650', note: 'Scoped to square footage and service size' },
    ],
    safetyNotes: [
      'A closed permit history matters. Unpermitted electrical work is a common reason lenders delay a closing.',
      'Thermal imaging finds loose connections before they arc. It is the highest-value ten minutes of any inspection.',
      'Smoke alarms have a 10-year service life from the manufacture date printed on the back, not from when you installed them.',
    ],
    related: ['electrical-panel-upgrades', 'whole-home-rewiring', 'smoke-and-co-detectors'],
    seo: {
      title: 'Electrical Safety Inspections in Austin, TX',
      description:
        'Pre-purchase and safety electrical inspections in Austin with a photographed written report, severity ranking and real repair cost ranges.',
    },
  },

  {
    slug: 'surge-protection',
    name: 'Whole-Home Surge Protection',
    shortName: 'Surge Protection',
    category: 'Safety & Inspections',
    icon: 'surge',
    audience: 'both',
    summary:
      'Panel-mounted surge protection that catches what a power strip cannot — grid switching, lightning, and the surges that come from inside your own house.',
    intro:
      'Central Texas gets storms, grid switching events, and a lot of large motor loads cycling on hot afternoons. Most damage to electronics is not one dramatic lightning strike; it is thousands of small surges that wear insulation down over years. A Type 2 device at the panel handles the large events, and point-of-use protection handles the rest.',
    heroImage: img('surge-protection', 'Type 2 whole-home surge protective device mounted beside a residential panel'),
    startingPrice: 545,
    priceNote: 'Type 2 device installed at the panel',
    emergencyEligible: false,
    sameDayEligible: true,
    featured: false,
    sortOrder: 10,
    signs: [
      {
        title: 'You have lost electronics after a storm',
        text: 'If a TV, router or appliance board has failed after weather, the house has no upstream protection.',
      },
      {
        title: 'Lights dim or flicker when the AC starts',
        text: 'That is a voltage event on your own service. Repeated ones degrade electronics and often point to a service or neutral issue worth checking.',
      },
      {
        title: 'You just installed solar, an EV charger, or a heat pump',
        text: 'Those systems have expensive electronics and are the most common surge casualties.',
      },
      {
        title: 'The house has a lot of connected equipment',
        text: 'Smart panels, security systems and networked appliances all have boards that a $30 power strip will not save.',
      },
    ],
    includes: [
      'Type 2 SPD installed at the service panel on a dedicated breaker',
      'Correct short-lead installation — lead length is what determines performance',
      'Grounding system verified and corrected if needed, since an SPD is only as good as its ground',
      'Point-of-use Type 3 protection at sensitive equipment where you want it',
      'Coax and ethernet surge protection for entry points',
      'Manufacturer connected-equipment warranty registered for you',
      'Indicator light explained so you know when the device has done its job and needs replacement',
    ],
    process: [
      {
        title: 'Check the grounding first',
        text: 'A surge protector diverts energy to ground. If the grounding electrode system is incomplete, the device cannot work. We verify and correct it.',
      },
      {
        title: 'Install at the panel',
        text: 'Device mounted directly beside the panel with the shortest possible conductors. Every extra inch of lead reduces clamping performance.',
      },
      {
        title: 'Add point-of-use where it matters',
        text: 'Media equipment, home office, and networking gear benefit from a second layer.',
      },
      {
        title: 'Register and explain',
        text: 'We file the connected-equipment warranty and show you the status indicator.',
      },
    ],
    pricing: [
      { label: 'Type 2 whole-home SPD', range: '$545 – $780', note: 'Installed at the panel, includes breaker' },
      { label: 'SPD with grounding correction', range: '$850 – $1,600', note: 'Where ground rods or bonding are missing' },
      { label: 'Point-of-use protection', range: '$120 – $290', note: 'Per location' },
      { label: 'Commercial SPD', range: 'From $1,400', note: 'Sized to service and equipment' },
    ],
    safetyNotes: [
      'A surge protector with long leads to the panel loses most of its effectiveness. Installation quality matters more than the device rating.',
      'Whole-home protection does not replace point-of-use protection for sensitive electronics. Use both.',
      'The status light on an SPD is not decorative. Once it changes, the device has absorbed its capacity and needs replacing.',
    ],
    related: ['electrical-panel-upgrades', 'generator-installation', 'electrical-inspections'],
    seo: {
      title: 'Whole-Home Surge Protection in Austin, TX',
      description:
        'Type 2 whole-home surge protector installation in Austin. Correct panel-mounted install, grounding verification and connected-equipment warranty.',
    },
  },

  {
    slug: 'smoke-and-co-detectors',
    name: 'Smoke & CO Detector Installation',
    shortName: 'Smoke & CO Alarms',
    category: 'Safety & Inspections',
    icon: 'alarm',
    audience: 'both',
    summary:
      'Hardwired, interconnected smoke and carbon monoxide alarms placed where code requires them — so every alarm sounds when one detects.',
    intro:
      'Battery alarms in the hallway are the minimum. Current code requires an alarm in every bedroom, outside each sleeping area, and on every level — all interconnected so an alarm in the garage wakes you upstairs. Most Austin homes built before 1995 have about half of what is required, and detectors older than ten years have sensors that no longer reliably detect.',
    heroImage: img('smoke-and-co-detectors', 'Electrician installing a hardwired interconnected smoke alarm on a hallway ceiling'),
    startingPrice: 165,
    priceNote: 'Per hardwired alarm replaced on existing wiring',
    emergencyEligible: false,
    sameDayEligible: true,
    featured: false,
    sortOrder: 11,
    signs: [
      {
        title: 'Alarms chirp even with new batteries',
        text: 'End-of-life chirp. Look at the manufacture date on the back — ten years is the service life, and after that the sensor is unreliable.',
      },
      {
        title: 'No alarm inside the bedrooms',
        text: 'Required today. A hallway alarm alone may not wake someone behind a closed door.',
      },
      {
        title: 'The alarms are not interconnected',
        text: 'If a fire starts in the garage and only the garage alarm sounds, you lose the minutes that matter.',
      },
      {
        title: 'No CO alarm with gas appliances or an attached garage',
        text: 'Carbon monoxide has no smell. Any home with gas heat, a gas water heater, a fireplace or an attached garage needs CO detection.',
      },
    ],
    includes: [
      'Code-compliant placement in every bedroom, outside sleeping areas, and on each level',
      'Hardwired alarms with battery backup and interconnection',
      'Wireless interconnection where running new cable is impractical',
      'Combination smoke/CO units where appropriate',
      '10-year sealed-battery units for locations without wiring',
      'Correct clearance from HVAC vents, fans and corners so alarms do not nuisance-trip',
      'Removal and disposal of old units',
      'Full-system test with every alarm sounding from a single trigger',
    ],
    process: [
      {
        title: 'Survey placement',
        text: 'We walk the house against current code requirements and note where alarms are missing, misplaced, or too close to a vent.',
      },
      {
        title: 'Choose the interconnection method',
        text: 'Hardwired where there is existing cable or attic access; wireless interconnect where opening walls is not worth it.',
      },
      {
        title: 'Install',
        text: 'Mount, wire, and set the interconnect group. Combination CO units go on the levels where they are required.',
      },
      {
        title: 'Test the whole system',
        text: 'We trigger one alarm and confirm every other alarm in the house responds, then log the install date on each unit.',
      },
    ],
    pricing: [
      { label: 'Replace hardwired alarm', range: '$165', note: 'Per unit on existing wiring' },
      { label: 'Whole-house alarm replacement', range: '$680 – $1,450', note: 'Typical 3–4 bedroom home' },
      { label: 'Add hardwired alarm to a new location', range: '$285 – $480', note: 'Includes running interconnect cable' },
      { label: 'Wireless interconnect system', range: '$520 – $1,100', note: 'No new cable required' },
    ],
    safetyNotes: [
      'Smoke alarms expire. The manufacture date is printed on the back — replace at ten years regardless of how it sounds when tested.',
      'CO alarms have a shorter life, typically seven years.',
      'Alarms mounted within 3 feet of an HVAC supply vent or a ceiling fan will nuisance-trip and get disabled, which is worse than not having them.',
    ],
    related: ['electrical-inspections', 'generator-installation', 'whole-home-rewiring'],
    seo: {
      title: 'Smoke & Carbon Monoxide Detector Installation in Austin, TX',
      description:
        'Hardwired, interconnected smoke and CO alarm installation in Austin. Code-compliant placement in every bedroom and on every level.',
    },
  },

  {
    slug: 'generator-installation',
    name: 'Standby Generator Installation',
    shortName: 'Generators',
    category: 'Panels & Power',
    icon: 'generator',
    audience: 'both',
    summary:
      'Whole-home and essential-circuit standby generators with an automatic transfer switch, sized to what you actually need to keep running.',
    intro:
      'After February 2021, a lot of Austin homeowners decided they were not going through that again. A standby generator sits outside like a condenser, runs on natural gas or propane, and starts automatically within seconds of an outage. The two decisions that matter are what you need to keep running and whether you want a whole-home or essential-circuit setup — one costs roughly twice the other.',
    heroImage: img('generator-installation', 'Standby generator installed on a concrete pad beside a home with transfer switch'),
    startingPrice: 8500,
    priceNote: 'Essential-circuit system installed, permit included',
    emergencyEligible: false,
    sameDayEligible: false,
    featured: false,
    sortOrder: 12,
    signs: [
      {
        title: 'You lose power more than once or twice a year',
        text: 'Parts of Travis and Williamson County see several outages a year from storms and grid events. Frequency is the main argument for standby over portable.',
      },
      {
        title: 'Someone in the house depends on power',
        text: 'Medical equipment, refrigerated medication, or a well pump changes an outage from an inconvenience to a real problem.',
      },
      {
        title: 'You are running extension cords from a portable unit',
        text: 'Portable generators back-feeding through a dryer outlet kill utility workers. If you own one, at minimum we can install a proper interlock and inlet.',
      },
      {
        title: 'You work from home',
        text: 'A lost day of work usually pays for a meaningful part of an essential-circuit system.',
      },
    ],
    includes: [
      'Load study to size the unit against what you actually want running',
      'Automatic transfer switch — whole-home or essential-circuit',
      'Concrete or composite pad, set level with proper clearances',
      'Gas line coordination with a licensed plumber, sized for generator demand',
      'Electrical and mechanical permits, plus HOA documentation where needed',
      'Weekly self-test schedule configured',
      'Wi-Fi monitoring set up so you get outage and fault alerts',
      'Startup, commissioning and a full load test',
      'First-year maintenance visit included',
    ],
    process: [
      {
        title: 'Load study and siting',
        text: 'We measure your real usage and walk the site for clearances — generators need distance from windows, doors and the meter.',
      },
      {
        title: 'Size and quote both options',
        text: 'You see the whole-home number and the essential-circuit number side by side, with exactly which circuits each one covers.',
      },
      {
        title: 'Permits and gas',
        text: 'Electrical and mechanical permits filed, gas line sized and run by a licensed plumber. This is the longest phase.',
      },
      {
        title: 'Install and commission',
        text: 'Pad set, unit placed, transfer switch installed at the service, then a full commissioning with a simulated outage under load.',
      },
      {
        title: 'Handover',
        text: 'We show you the monitoring app, the maintenance interval, and what the weekly exercise cycle will sound like.',
      },
    ],
    pricing: [
      { label: 'Essential-circuit system (10–14kW)', range: '$8,500 – $13,000', note: 'Covers HVAC, kitchen, and selected circuits' },
      { label: 'Whole-home system (18–26kW)', range: '$14,000 – $22,000', note: 'Runs the full service' },
      { label: 'Portable generator inlet + interlock', range: '$950 – $1,700', note: 'Safe alternative if you already own a portable' },
      { label: 'Annual maintenance plan', range: '$320 / year', note: 'Oil, filters, plugs, load test' },
    ],
    safetyNotes: [
      'Never back-feed a generator through a dryer or range outlet. It energizes the utility line and can kill a lineworker.',
      'Standby generators require minimum clearances from windows, doors and combustible walls — siting is a code issue, not a preference.',
      'Generator installs require both an electrical and a mechanical permit in most Central Texas jurisdictions.',
    ],
    related: ['electrical-panel-upgrades', 'surge-protection', 'commercial-electrical'],
    seo: {
      title: 'Standby Generator Installation in Austin, TX',
      description:
        'Whole-home and essential-circuit standby generator installation in Austin with automatic transfer switch, permits, gas coordination and commissioning.',
    },
  },

  {
    slug: 'commercial-electrical',
    name: 'Commercial Electrical Services',
    shortName: 'Commercial',
    category: 'Commercial',
    icon: 'building',
    audience: 'commercial',
    summary:
      'Tenant finish-out, three-phase service, lighting retrofits and scheduled maintenance for Austin restaurants, retail, offices and light industrial.',
    intro:
      'Commercial work runs on a different clock. A restaurant cannot lose its walk-in during dinner service, and a retail space cannot close for a lighting retrofit. We schedule around your hours, carry the insurance and bonding your landlord requires, and work directly with your general contractor and the city on finish-outs.',
    heroImage: img('commercial-electrical', 'Commercial electrician working on a three-phase panel in a mechanical room'),
    startingPrice: null,
    priceNote: 'Quoted per scope — free walkthrough',
    emergencyEligible: true,
    sameDayEligible: true,
    featured: false,
    sortOrder: 13,
    signs: [
      {
        title: 'You are taking on a new lease space',
        text: 'Finish-outs live or die on the permit timeline. Getting an electrician involved before the drawings are final saves weeks.',
      },
      {
        title: 'Breakers trip during peak hours',
        text: 'In restaurants and salons this is almost always a load distribution problem that got worse as equipment was added.',
      },
      {
        title: 'Your lighting bill is high and the space looks dated',
        text: 'LED retrofits in commercial spaces typically pay back in 18 to 30 months, and Austin Energy rebates cover part of it.',
      },
      {
        title: 'You need documented maintenance',
        text: 'Insurers and franchisors increasingly want scheduled thermal scans and documented panel maintenance.',
      },
    ],
    includes: [
      'Tenant finish-out from drawings through final inspection',
      'Three-phase service, distribution and panel work',
      'Dedicated equipment circuits for kitchen, HVAC and production equipment',
      'LED retrofits with Austin Energy rebate paperwork handled',
      'Emergency and exit lighting, tested and certified',
      'Data, low-voltage and AV rough-in coordination',
      'Annual thermal imaging and documented panel maintenance',
      'After-hours and overnight scheduling to avoid business disruption',
      'Certificates of insurance issued directly to your landlord or GC',
    ],
    process: [
      {
        title: 'Walkthrough and scope',
        text: 'We walk the space with you or your GC, review drawings, and identify the items that drive permit time.',
      },
      {
        title: 'Written proposal',
        text: 'Line-item scope with allowances called out, so change orders are the exception rather than the plan.',
      },
      {
        title: 'Permit and schedule',
        text: 'We file, coordinate inspections, and build a schedule around your operating hours.',
      },
      {
        title: 'Execute',
        text: 'Rough-in, trim, and final. Daily progress notes to you or the GC so nothing surprises anyone.',
      },
      {
        title: 'Close out',
        text: 'Final inspection, as-built panel schedules, and warranty documentation for your records.',
      },
    ],
    pricing: [
      { label: 'Service call', range: '$145 / hour', note: 'One-hour minimum, standard business hours' },
      { label: 'After-hours commercial', range: '$225 / hour', note: 'Nights, weekends, holidays' },
      { label: 'Tenant finish-out', range: 'Quoted per drawings', note: 'Free walkthrough and written proposal' },
      { label: 'Maintenance agreement', range: 'From $1,200 / year', note: 'Thermal scan, panel service, documented report' },
    ],
    safetyNotes: [
      'Three-phase work requires arc-flash-rated PPE and documented lockout procedures. Ask any contractor to show you both.',
      'Emergency and exit lighting must be tested on a documented schedule — it is one of the first things a fire marshal checks.',
      'Landlord-required certificates of insurance should name the landlord as additional insured. We issue them before we start.',
    ],
    related: ['generator-installation', 'lighting-installation', 'new-construction-wiring'],
    seo: {
      title: 'Commercial Electrician in Austin, TX | Finish-Out & Service',
      description:
        'Commercial electrical contractor in Austin: tenant finish-outs, three-phase service, LED retrofits and documented maintenance. After-hours scheduling available.',
    },
  },

  {
    slug: 'new-construction-wiring',
    name: 'New Construction & Remodel Wiring',
    shortName: 'New Construction',
    category: 'Commercial',
    icon: 'blueprint',
    audience: 'both',
    summary:
      'Full rough-in through trim for custom homes, additions, ADUs and remodels — on a schedule your builder can actually plan around.',
    intro:
      'On new construction the electrician is a schedule dependency for everyone else. Rough-in has to clear inspection before insulation, and trim has to land after paint but before the final walkthrough. We build the plan around the builder’s schedule, walk the circuits with the homeowner before a single hole is drilled, and hit our dates.',
    heroImage: img('new-construction-wiring', 'Electrical rough-in with boxes and cable runs in open framing'),
    startingPrice: null,
    priceNote: 'Quoted per plan — free takeoff',
    emergencyEligible: false,
    sameDayEligible: false,
    featured: false,
    sortOrder: 14,
    signs: [
      {
        title: 'You are building a custom home or ADU',
        text: 'Austin ADU permits have their own path and their own service requirements. Getting the service sized right at design time avoids an expensive change later.',
      },
      {
        title: 'You are adding on to an existing house',
        text: 'Additions usually push the existing service past its limit. The load calculation should happen before the foundation is poured.',
      },
      {
        title: 'You are gutting a kitchen or bath',
        text: 'A remodel triggers current code for that space — dedicated circuits, GFCI, AFCI and often new panel capacity.',
      },
      {
        title: 'Your builder needs a reliable electrical sub',
        text: 'We do a limited number of builder projects at a time specifically so we can hold our schedule dates.',
      },
    ],
    includes: [
      'Plan takeoff and written per-plan proposal',
      'Homeowner walkthrough to place every switch, outlet and fixture before rough-in',
      'Service and load calculation sized for the finished house plus planned future loads',
      'Complete rough-in: boxes, cable, panel, low-voltage conduit',
      'Structured wiring and conduit for future runs while walls are open',
      'Rough-in and final inspections coordinated with the city',
      'Full trim: devices, fixtures, fans, detectors, panel directory',
      'As-built panel schedule and circuit map handed over at close',
    ],
    process: [
      {
        title: 'Takeoff and proposal',
        text: 'We price from the plans with allowances clearly stated so the number holds.',
      },
      {
        title: 'Pre-rough walkthrough',
        text: 'We mark every device location on the studs and walk it with you. This is the cheapest hour in the whole project.',
      },
      {
        title: 'Rough-in',
        text: 'Boxes set, cable pulled, panel installed, low-voltage conduit stubbed. Then rough-in inspection.',
      },
      {
        title: 'Trim',
        text: 'After paint: devices, plates, fixtures, fans, detectors, and the panel directory.',
      },
      {
        title: 'Final and handover',
        text: 'Final inspection, as-built documentation, and a walkthrough of the finished system.',
      },
    ],
    pricing: [
      { label: 'Custom home rough + trim', range: 'Quoted per plan', note: 'Typically $6.50–$11 per sq ft in Central Texas' },
      { label: 'ADU / garage conversion', range: '$7,500 – $16,000', note: 'Includes sub-panel and feeder' },
      { label: 'Kitchen remodel wiring', range: '$3,200 – $7,500', note: 'Dedicated circuits, GFCI/AFCI, lighting' },
      { label: 'Room addition', range: '$2,800 – $6,400', note: 'Depends on service capacity' },
    ],
    safetyNotes: [
      'Rough-in must pass inspection before insulation goes in. Covering unapproved work means opening it back up.',
      'Additions and ADUs almost always require a service load calculation. Skipping it is the most common cause of a failed inspection.',
      'Run conduit for future low-voltage while the walls are open. It costs almost nothing now and thousands later.',
    ],
    related: ['commercial-electrical', 'electrical-panel-upgrades', 'smart-home-electrical'],
    seo: {
      title: 'New Construction & Remodel Electrical Wiring in Austin, TX',
      description:
        'Electrical rough-in and trim for custom homes, ADUs, additions and remodels in Austin. Plan takeoffs, on-schedule inspections and as-built documentation.',
    },
  },

  {
    slug: 'smart-home-electrical',
    name: 'Smart Home Electrical Installation',
    shortName: 'Smart Home',
    category: 'Installations',
    icon: 'smart',
    audience: 'residential',
    summary:
      'Smart switches, lighting scenes, doorbells and connected panels installed with the neutral wiring they need — and set up so they actually work.',
    intro:
      'Most smart switch installations fail for one boring reason: the switch box has no neutral conductor. Homes wired before about 2011 frequently ran a switch loop with no neutral at the box, and no amount of app troubleshooting fixes that. We check what is actually in your boxes first, then install hardware that fits your wiring instead of hardware that fits the marketing.',
    heroImage: img('smart-home-electrical', 'Smart lighting switch installed in a wall box with neutral conductor connected'),
    startingPrice: 165,
    priceNote: 'Per smart switch on a box with a neutral',
    emergencyEligible: false,
    sameDayEligible: true,
    featured: false,
    sortOrder: 15,
    signs: [
      {
        title: 'Your smart switch will not power on',
        text: 'Nine times out of ten there is no neutral in the box. We can pull one, use a no-neutral device, or move the smarts to the fixture.',
      },
      {
        title: 'Three-way switches stopped working after a smart install',
        text: 'Three-way circuits need a matched companion switch or a rewire of the traveler. Mixing brands rarely works.',
      },
      {
        title: 'Devices keep dropping off Wi-Fi',
        text: 'Usually 2.4GHz coverage or too many devices on a consumer mesh. Hardwired or Thread/Zigbee hardware fixes it permanently.',
      },
      {
        title: 'You want scenes, not just remote control',
        text: 'Real scene control needs a consistent platform and dimmers matched to your fixtures. Piecemeal devices from four brands will not get there.',
      },
    ],
    includes: [
      'Box-by-box neutral audit before anything is ordered',
      'Smart switch and dimmer installation with correct fixture compatibility',
      'Three-way and four-way configurations with matched companion devices',
      'Smart doorbell installation with transformer upgrade where needed',
      'Hardwired access point and structured cable drops',
      'Smart panel and circuit-level energy monitoring',
      'Scene programming and app setup with your household accounts',
      'A written map of which device controls what, for the next person who lives there',
    ],
    process: [
      {
        title: 'Audit the wiring',
        text: 'We open representative switch boxes and check for neutrals, three-way travelers, and doorbell transformer capacity.',
      },
      {
        title: 'Spec hardware to the wiring',
        text: 'You get a device list that will actually work in your house, and a note about anything that needs a wire pulled.',
      },
      {
        title: 'Install',
        text: 'Devices installed, neutrals pulled where necessary, and everything tested at the switch before it touches an app.',
      },
      {
        title: 'Set up and hand over',
        text: 'Devices joined, named consistently, scenes built with you, and a printed map of the system.',
      },
    ],
    pricing: [
      { label: 'Smart switch or dimmer', range: '$165', note: 'Per device where a neutral is present' },
      { label: 'Pull a neutral to a switch box', range: '$220 – $480', note: 'Depends on access' },
      { label: 'Smart doorbell + transformer', range: '$285 – $460', note: 'Includes transformer upgrade' },
      { label: 'Whole-home smart lighting', range: '$2,400 – $9,500', note: 'Scene design, dimmers and setup included' },
    ],
    safetyNotes: [
      'No-neutral smart switches work by trickling current through the load. With some LED fixtures that causes a faint glow or flicker — the fix is a bypass at the fixture.',
      'Smart doorbells often need a 16–24VAC transformer. Undersized transformers are the cause of most "keeps rebooting" complaints.',
      'Smart devices should never be the only control for a critical circuit. Physical switches stay in place.',
    ],
    related: ['lighting-installation', 'outlet-and-switch-installation', 'new-construction-wiring'],
    seo: {
      title: 'Smart Home Electrical Installation in Austin, TX',
      description:
        'Smart switch, dimmer, doorbell and lighting scene installation in Austin. Neutral audits, three-way configurations and full setup by licensed electricians.',
    },
  },
]
