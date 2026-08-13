import type { Project } from './types.ts'

const shot = (slug: string, kind: 'before' | 'after', alt: string) => ({
  src: `/images/projects/${slug}-${kind}.jpg`,
  alt,
  width: 1200,
  height: 900,
})

export const projects: Project[] = [
  {
    slug: 'hyde-park-1926-bungalow-rewire',
    title: '1926 bungalow rewired without moving the family out',
    serviceSlug: 'whole-home-rewiring',
    city: 'Austin',
    neighborhood: 'Hyde Park',
    completedOn: '2026-04-18',
    costRange: '$16,000 – $19,000',
    durationLabel: '11 working days, staged in 3 phases',
    featured: true,
    summary:
      'Original knob-and-tube under blown-in insulation, a 60-amp fuse panel, and no ground anywhere in the house. Rewired room by room so the family kept a working kitchen and bathroom the entire time.',
    scope: [
      'Complete replacement of knob-and-tube and 1950s cloth-insulated branch circuits',
      'New 200-amp service, meter base, mast and grounding electrode system',
      'Dedicated circuits for kitchen, laundry, both bathrooms and HVAC',
      'AFCI and GFCI protection throughout',
      'Interconnected hardwired smoke and CO alarms on both levels',
      'Drywall and original plaster repair, textured and primed',
    ],
    challenge:
      'The attic had eighteen inches of blown-in cellulose covering active knob-and-tube — a combination that is both a fire hazard and a code violation. The homeowners had a newborn and could not move out, and the original 1926 plaster in the front rooms could not be cut and patched like modern drywall without a visible scar.',
    solution:
      'We staged the rewire in three phases so the kitchen and one bathroom stayed live at all times. In the plaster rooms we fished from the attic and baseboards to avoid opening wall faces, and where we did have to cut, we used a plaster-matching finisher rather than standard texture. The old knob-and-tube was fully removed rather than abandoned in place, so the insulation could go back down safely.',
    before: shot('hyde-park-1926-bungalow-rewire', 'before', 'Original knob-and-tube wiring buried under blown-in attic insulation'),
    after: shot('hyde-park-1926-bungalow-rewire', 'after', 'New grounded branch circuits neatly run and stapled through the attic'),
    permitNote: 'City of Austin permit #2026-EL-04412, rough-in and final inspections passed on first visit.',
  },

  {
    slug: 'crestview-federal-pacific-panel-replacement',
    title: 'Federal Pacific panel replaced two days before closing',
    serviceSlug: 'electrical-panel-upgrades',
    city: 'Austin',
    neighborhood: 'Crestview',
    completedOn: '2026-05-29',
    costRange: '$3,400 – $3,900',
    durationLabel: '1 day, plus utility coordination',
    featured: true,
    summary:
      'A buyer’s inspection flagged a Federal Pacific Stab-Lok panel and the lender would not fund until it was replaced. We handled the permit, the Austin Energy disconnect and the inspection inside the option period.',
    scope: [
      'Removal of Federal Pacific Stab-Lok panel and breakers',
      'New 200-amp load center with copper bus',
      'Meter base and mast replacement',
      'Two new ground rods, water bond and gas bond',
      'AFCI protection added on bedroom circuits',
      'Typed panel directory',
    ],
    challenge:
      'Ten days on the clock, a lender waiting on documentation, and three branch circuits with heat damage at the bus stab that nobody had noticed. Any of those could have pushed the closing.',
    solution:
      'We pulled the permit the morning after the walkthrough and booked the Austin Energy disconnect for the following week — the long pole in every panel job. The heat-damaged conductors were cut back to sound copper and extended with listed splices inside the new can rather than being re-landed on burnt insulation. Inspection passed on the first visit and the closed permit went to the title company the same afternoon.',
    before: shot('crestview-federal-pacific-panel-replacement', 'before', 'Federal Pacific Stab-Lok panel with scorch marks around several breaker stabs'),
    after: shot('crestview-federal-pacific-panel-replacement', 'after', 'New 200-amp load center with labeled, neatly dressed circuits'),
    permitNote: 'City of Austin permit #2026-EL-05877, final inspection passed and closed before funding.',
  },

  {
    slug: 'mueller-dual-ev-charger-load-management',
    title: 'Two EV chargers on a 150-amp service, no upgrade needed',
    serviceSlug: 'ev-charger-installation',
    city: 'Austin',
    neighborhood: 'Mueller',
    completedOn: '2026-06-11',
    costRange: '$2,600 – $3,100',
    durationLabel: '1 day',
    featured: true,
    summary:
      'The homeowner had been quoted a full service upgrade to add a second charger. A load study showed a load-sharing pair would charge both cars overnight without touching the service — for about a third of the price.',
    scope: [
      'NEC 220.87 load study using 30 days of metered usage data',
      'Two hardwired Level 2 chargers with load sharing between units',
      '60-amp shared circuit in EMT along the garage wall',
      'Panel directory updated and circuit labeled',
      'Austin Energy rebate paperwork prepared',
    ],
    challenge:
      'A 150-amp service already carrying a heat pump, an electric range and a heat pump water heater. On paper, adding 96 amps of continuous charger load looked impossible, and the previous quote reflected that.',
    solution:
      'We pulled the actual metered peak demand rather than relying on a worst-case calculated load. Real peak was well under half the service rating. A pair of load-sharing chargers on a single 60-amp circuit splits available current between the two cars — both charge overnight, and the service never sees more than 48 amps of charger load. The homeowner avoided a $4,000 service upgrade.',
    before: shot('mueller-dual-ev-charger-load-management', 'before', 'Garage wall with a single 120-volt outlet and an extension cord running to a car'),
    after: shot('mueller-dual-ev-charger-load-management', 'after', 'Two wall-mounted Level 2 chargers with conduit run neatly to the panel'),
    permitNote: 'City of Austin permit #2026-EL-06103, passed inspection.',
  },

  {
    slug: 'south-congress-restaurant-finish-out',
    title: 'Restaurant finish-out delivered on the builder’s date',
    serviceSlug: 'commercial-electrical',
    city: 'Austin',
    neighborhood: 'South Congress',
    completedOn: '2026-03-07',
    costRange: '$48,000 – $56,000',
    durationLabel: '7 weeks',
    featured: true,
    summary:
      'Full electrical scope for a 2,900 sq ft restaurant conversion: three-phase distribution, kitchen equipment circuits, dining lighting design and emergency egress lighting.',
    scope: [
      'New 400-amp three-phase service and distribution',
      'Dedicated circuits for hood, walk-in, ranges, dish machine and POS',
      'Kitchen equipment coordination with the equipment supplier’s cut sheets',
      'Dining room lighting with zoned dimming for lunch and dinner scenes',
      'Emergency and exit lighting with documented testing',
      'Data and POS low-voltage rough-in',
    ],
    challenge:
      'The equipment package changed twice during construction — a different hood and a larger dish machine — after the panel schedule was already submitted. The lease had a hard opening date with penalty clauses attached.',
    solution:
      'We had built spare capacity and empty conduit into the original distribution design specifically because equipment packages change on restaurant builds. The revised loads landed in existing spare breaker positions and the added dish machine circuit pulled through conduit that was already in the wall. We resubmitted the panel schedule and kept the inspection date. The restaurant opened on its scheduled day.',
    before: shot('south-congress-restaurant-finish-out', 'before', 'Empty commercial lease space with exposed ceiling and no electrical distribution'),
    after: shot('south-congress-restaurant-finish-out', 'after', 'Finished restaurant kitchen with equipment circuits and organized panel room'),
    permitNote: 'Commercial permit, three inspections, all passed on first visit.',
  },

  {
    slug: 'lakeway-whole-home-generator',
    title: 'Whole-home generator for a house with three HVAC systems',
    serviceSlug: 'generator-installation',
    city: 'Lakeway',
    neighborhood: 'Rough Hollow',
    completedOn: '2026-02-20',
    costRange: '$19,000 – $23,000',
    durationLabel: '3 days on site, 5 weeks including permits and gas',
    featured: false,
    summary:
      'A 26kW natural gas standby generator with a whole-home automatic transfer switch, sized to run three air conditioning systems, a well pump and a pool without load shedding.',
    scope: [
      'Load study across a full summer of utility data',
      '26kW natural gas standby generator on a composite pad',
      'Whole-home automatic transfer switch at the service',
      'Gas line sizing and installation coordinated with a licensed plumber',
      'Electrical and mechanical permits plus HOA approval package',
      'Wi-Fi monitoring and weekly exercise schedule configured',
      'Full commissioning with a simulated outage under real load',
    ],
    challenge:
      'Three condensers starting at once produce an inrush that will stall an undersized generator. The HOA also restricted where the unit could sit, and the only compliant location was 80 feet from the meter.',
    solution:
      'We specified a unit with enough motor-starting capacity to handle two compressors simultaneously and staggered the third with a start delay, which let us avoid jumping to a larger and much louder generator. The 80-foot run was sized up a conductor gauge to hold voltage drop under 2%. The HOA package was submitted with a sound study and approved without a variance hearing.',
    before: shot('lakeway-whole-home-generator', 'before', 'Side yard with utility meter and no backup power equipment'),
    after: shot('lakeway-whole-home-generator', 'after', 'Standby generator on a pad with transfer switch installed beside the meter'),
    permitNote: 'Travis County electrical and mechanical permits, both passed.',
  },

  {
    slug: 'allandale-kitchen-lighting-redesign',
    title: 'Kitchen lighting redesigned around how the room is actually used',
    serviceSlug: 'lighting-installation',
    city: 'Austin',
    neighborhood: 'Allandale',
    completedOn: '2026-05-02',
    costRange: '$4,200 – $5,000',
    durationLabel: '3 days',
    featured: false,
    summary:
      'A 1962 kitchen with one center fixture and permanent shadows over every work surface. Rebuilt as three lighting layers on separate dimmers.',
    scope: [
      'Eight 4-inch airtight IC-rated recessed fixtures, laid out to the counters rather than the ceiling grid',
      'Under-cabinet LED with hidden drivers on a dedicated switch',
      'Three pendants over the island on a separate dimmer',
      'Consistent 2700K, 90+ CRI across every fixture',
      'Dimmers matched to the fixture compatibility list',
      'New dedicated circuit for the lighting load',
    ],
    challenge:
      'The homeowner had already tried a smart bulb retrofit that flickered at low dim levels and gave the room a green cast. The ceiling had ductwork running through the middle of it, exactly where the layout wanted fixtures.',
    solution:
      'We taped out the fixture positions on the ceiling and walked the plan with the homeowner before cutting anything, then shifted two fixtures to clear the duct without leaving a dark spot at the sink. The flicker problem was a dimmer compatibility issue, not a bulb problem — matching the dimmer to the manufacturer list fixed it completely. All fixtures were specified at the same color temperature and CRI so the room reads consistent.',
    before: shot('allandale-kitchen-lighting-redesign', 'before', 'Dated kitchen lit by a single ceiling fixture with dark counters'),
    after: shot('allandale-kitchen-lighting-redesign', 'after', 'Kitchen with layered recessed, under-cabinet and pendant lighting'),
  },

  {
    slug: 'round-rock-aluminum-wiring-remediation',
    title: 'Aluminum branch wiring remediated instead of rewired',
    serviceSlug: 'whole-home-rewiring',
    city: 'Round Rock',
    neighborhood: 'Old Town',
    completedOn: '2026-01-24',
    costRange: '$4,600 – $5,200',
    durationLabel: '4 days',
    featured: false,
    summary:
      'A 1971 home with aluminum branch circuits. The insurer wanted it addressed; two other contractors quoted a full rewire. Listed pigtail connectors solved it for a quarter of the price.',
    scope: [
      'Every device in the house opened and inspected',
      'AlumiConn listed connectors at 94 device locations',
      'Replacement of 12 devices with heat damage at the terminals',
      'Panel connections inspected, re-torqued and thermally scanned',
      'Documentation package prepared for the insurance carrier',
    ],
    challenge:
      'Aluminum branch wiring gets treated as an automatic rewire, and the homeowner had been quoted $22,000 on that basis. But the aluminum itself was in good condition; the problem was where it terminated on devices designed for copper.',
    solution:
      'Pigtailing with listed AlumiConn connectors is a recognized remediation, and it addresses the actual failure mode — the connection point, not the conductor. We opened every box in the house, pigtailed each aluminum termination to a copper tail, and replaced the devices that already showed heat damage. The carrier accepted the documentation and wrote the policy.',
    before: shot('round-rock-aluminum-wiring-remediation', 'before', 'Aluminum conductor terminated directly on a receptacle screw showing discoloration'),
    after: shot('round-rock-aluminum-wiring-remediation', 'after', 'Aluminum conductor pigtailed to copper with a listed connector inside the box'),
  },

  {
    slug: 'cedar-park-battery-backup-subpanel',
    title: 'Critical-load sub-panel for solar battery backup',
    serviceSlug: 'electrical-panel-upgrades',
    city: 'Cedar Park',
    neighborhood: 'Ranch at Brushy Creek',
    completedOn: '2026-06-27',
    costRange: '$3,800 – $4,400',
    durationLabel: '2 days',
    featured: false,
    summary:
      'The solar installer wired the array but left the backup design undone. We built a critical-load sub-panel so the battery covers what matters for two full days instead of the whole house for four hours.',
    scope: [
      'Critical-load sub-panel installation and feeder',
      'Relocation of 14 circuits: refrigeration, well pump, network, primary HVAC zone, selected lighting and outlets',
      'Interconnection coordination with the battery inverter',
      'Load testing under simulated outage',
      'Circuit map documenting exactly what stays on',
    ],
    challenge:
      'Whole-home backup on a single battery sounds appealing but empties the battery in a few hours. The homeowner wanted the refrigerator, the well pump and a home office running through a multi-day outage.',
    solution:
      'We separated the house into backed-up and non-backed-up loads with a critical-load sub-panel, moving only the circuits that genuinely matter during an outage. We deliberately left the electric range, the dryer and two of three HVAC zones off the backed-up panel. Simulated outage testing showed the battery carrying the critical loads for just over two days.',
    before: shot('cedar-park-battery-backup-subpanel', 'before', 'Main panel with solar interconnection and no backup separation'),
    after: shot('cedar-park-battery-backup-subpanel', 'after', 'Critical load sub-panel installed beside the main panel with labeled circuits'),
  },

  {
    slug: 'travis-heights-service-mast-storm-repair',
    title: 'Storm-torn service mast repaired the same night',
    serviceSlug: 'emergency-electrical-repair',
    city: 'Austin',
    neighborhood: 'Travis Heights',
    completedOn: '2026-05-16',
    costRange: '$1,900 – $2,400',
    durationLabel: 'Same night, 6 hours',
    featured: false,
    summary:
      'A falling limb pulled the service mast and weatherhead off the wall during a storm, leaving live conductors hanging. On site in 50 minutes, power restored before morning.',
    scope: [
      'Emergency make-safe and coordination with Austin Energy for disconnect',
      'New service mast, weatherhead and riser',
      'Meter base replaced — the old one had cracked at the hub',
      'Service entrance conductors replaced back to the panel',
      'Emergency permit filed and inspection scheduled next business day',
    ],
    challenge:
      'Live service conductors down at head height in a back yard, during rain, with a family in the house and no power. Austin Energy could not reconnect until the customer-owned mast was rebuilt.',
    solution:
      'We isolated the area, coordinated the utility disconnect, and rebuilt the mast and meter base that night. The utility reconnected at 4am and the family had power for the morning. The emergency permit was filed the same night and the inspection cleared the following afternoon.',
    before: shot('travis-heights-service-mast-storm-repair', 'before', 'Service mast pulled away from a home exterior wall with damaged weatherhead'),
    after: shot('travis-heights-service-mast-storm-repair', 'after', 'Rebuilt service mast, weatherhead and meter base securely mounted'),
    permitNote: 'City of Austin emergency permit #2026-EL-05512, inspected and closed.',
  },

  {
    slug: 'buda-shop-feeder-and-subpanel',
    title: '280-foot feeder to a metal shop on acreage',
    serviceSlug: 'new-construction-wiring',
    city: 'Buda',
    neighborhood: 'Elm Grove',
    completedOn: '2026-04-03',
    costRange: '$7,200 – $8,600',
    durationLabel: '5 days',
    featured: false,
    summary:
      'A 100-amp sub-panel in a detached shop 280 feet from the house, sized so a welder and an air compressor can run without dimming the lights in the kitchen.',
    scope: [
      'Voltage drop calculation and conductor sizing for the full run',
      '280 feet of direct-burial feeder, trenched at code depth',
      '100-amp sub-panel with separate grounding electrode system at the shop',
      'Dedicated welder, compressor and dust collector circuits',
      'High-bay LED lighting on two switched zones',
      'GFCI-protected receptacles at the workbench and overhead door',
    ],
    challenge:
      'Voltage drop over 280 feet is the whole problem. Undersized conductors would have meant a welder that struck poorly and lights that dipped every time the compressor kicked on. Rock also made the trench route harder than the straight line.',
    solution:
      'We sized the feeder to hold voltage drop under 3% at full load rather than to the minimum ampacity, which meant going up two conductor sizes. The trench routed around the caliche shelf, adding 40 feet of run that the conductor sizing already had margin for. The shop got its own grounding electrode system as required for a detached structure.',
    before: shot('buda-shop-feeder-and-subpanel', 'before', 'Detached metal shop building with no electrical service'),
    after: shot('buda-shop-feeder-and-subpanel', 'after', 'Shop interior with sub-panel, high-bay lighting and equipment circuits'),
    permitNote: 'Hays County permit, inspection passed.',
  },
]
