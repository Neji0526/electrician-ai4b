import type { Post } from './types.ts'

export { postCategories } from './taxonomy.ts'

const cover = (slug: string, alt: string) => ({
  src: `/images/blog/${slug}.svg`,
  alt,
  width: 1200,
  height: 675,
})

export const posts: Post[] = [
  {
    slug: 'why-does-my-breaker-keep-tripping',
    title: 'Why Does My Breaker Keep Tripping?',
    category: 'Panels & Breakers',
    excerpt:
      'A tripping breaker is doing its job. The useful question is which of four things it is reacting to — and three of them you can narrow down yourself before calling anyone.',
    author: 'Diego Serrano',
    publishedOn: '2026-07-14',
    readingMinutes: 7,
    featured: true,
    relatedService: 'circuit-breaker-repair',
    image: cover('why-does-my-breaker-keep-tripping', 'Residential electrical panel with one breaker in the tripped position'),
    seo: {
      title: 'Why Does My Breaker Keep Tripping? | Austin Electrician',
      description:
        'Overload, short circuit, ground fault or arc fault — how to tell which one is tripping your breaker, what you can check safely, and when to stop resetting it.',
    },
    body: [
      {
        type: 'p',
        text: 'A breaker that trips has detected something and interrupted the circuit on purpose. It is the cheapest, most reliable safety device in your house doing exactly what it was installed to do. The problem is never the trip itself — it is that most people respond by resetting it repeatedly without finding out what it reacted to.',
      },
      {
        type: 'p',
        text: 'There are four things a breaker responds to, and they behave differently enough that you can usually narrow it down before anyone comes out.',
      },
      { type: 'h2', text: '1. Overload — the most common by far' },
      {
        type: 'p',
        text: 'An overload is simply more current than the circuit is rated to carry, sustained long enough that the breaker heats up and opens. It has a signature: it takes time. You turn on the space heater, and thirty seconds to several minutes later the breaker goes.',
      },
      {
        type: 'p',
        text: 'A standard 15-amp circuit can carry about 1,800 watts, and should not be loaded past 80% of that continuously — roughly 1,440 watts. A 1,500-watt space heater alone exceeds that. Add a lamp and you are over.',
      },
      {
        type: 'table',
        head: ['Appliance', 'Typical draw', 'Share of a 15A circuit'],
        rows: [
          ['Space heater', '1,500 W / 12.5 A', '83%'],
          ['Hair dryer', '1,500 W / 12.5 A', '83%'],
          ['Microwave', '1,000–1,500 W / 8–12.5 A', '55–83%'],
          ['Window AC', '900–1,400 W / 7.5–11.7 A', '50–78%'],
          ['Toaster oven', '1,200 W / 10 A', '67%'],
          ['LED TV', '60–120 W / 0.5–1 A', '~5%'],
        ],
      },
      {
        type: 'p',
        text: 'The fix for an overload is redistribution, not a bigger breaker. Move the heavy appliance to another circuit, or have a dedicated circuit run for it. If you find yourself unplugging one thing to run another in the same room, that room needs another circuit.',
      },
      {
        type: 'warning',
        title: 'Never install a larger breaker to stop overload trips',
        text: 'The breaker protects the wire, not the appliance. A 15-amp breaker is on that circuit because it is wired with 14-gauge conductors, which overheat above 15 amps. Putting a 20-amp breaker on 14-gauge wire removes the protection and leaves the wire to fail instead — inside a wall where you cannot see it.',
      },
      { type: 'h2', text: '2. Short circuit — instant and violent' },
      {
        type: 'p',
        text: 'A short circuit is a hot conductor touching a neutral or a ground directly. Current goes nearly unlimited for a fraction of a second and the breaker opens instantly. The signature is exactly that: instant. You reset, and it trips again the moment you push the handle over, with no delay at all. Often there is a pop, a flash, or a burnt smell.',
      },
      {
        type: 'p',
        text: 'Common causes are a nail or screw driven through a cable, a damaged appliance cord, a failing motor, or a wire pinched behind a device that has been pushed back into its box too hard.',
      },
      {
        type: 'p',
        text: 'This is where you stop. A dead short is not something to keep resetting into.',
      },
      { type: 'h2', text: '3. Ground fault — where GFCI devices come in' },
      {
        type: 'p',
        text: 'A ground fault is current escaping the circuit and finding another path to ground — sometimes through a person. GFCI devices detect an imbalance as small as 5 milliamps between the hot and neutral and cut power in about a fortieth of a second.',
      },
      {
        type: 'p',
        text: 'If a GFCI outlet or breaker in a bathroom, kitchen, garage, or outdoors trips repeatedly, the usual causes are moisture in an outdoor box, a failing appliance, or a long circuit with many devices where small leakage adds up. GFCI devices also simply wear out, typically after ten to fifteen years.',
      },
      { type: 'h2', text: '4. Arc fault — the newest and least understood' },
      {
        type: 'p',
        text: 'AFCI breakers detect the electrical signature of arcing: a loose connection sparking, a damaged conductor, or a stapled cable that was crushed during construction. Arcing does not draw enough current to trip a standard breaker, but it does start fires, which is why AFCI protection is now required on most residential circuits.',
      },
      {
        type: 'p',
        text: 'AFCI trips frustrate people because they often happen with nothing obviously running. Some are genuine wiring faults. Some are nuisance trips caused by motors and electronics — vacuum cleaners and certain LED drivers are frequent culprits. Telling those apart takes testing, not guessing.',
      },
      { type: 'h2', text: 'What you can safely check yourself' },
      {
        type: 'ol',
        items: [
          'Note the timing. Instant trip on reset means a short. A delay of seconds to minutes means overload.',
          'Unplug everything on the circuit, then reset. If it holds, plug things back one at a time and find the offender.',
          'Note whether it only trips when a specific appliance runs. That points at the appliance, not the wiring.',
          'Check for moisture on outdoor and garage circuits after rain.',
          'Look at the panel for scorch marks or a breaker that feels warm — and if you find either, stop and call.',
        ],
      },
      {
        type: 'h2',
        text: 'When to stop and call an electrician',
      },
      {
        type: 'ul',
        items: [
          'The breaker trips instantly every time you reset it',
          'You smell burning, or see scorching around the breaker or the panel',
          'The breaker or the panel cover is warm to the touch',
          'The breaker will not reset or feels loose in its slot',
          'Multiple breakers trip at once, or the main trips',
          'The circuit trips with nothing plugged into it',
        ],
      },
      {
        type: 'quote',
        text: 'People apologize for calling us about a tripping breaker like it is a small thing. Half the time it is a loose neutral we can fix in an hour. The other half it is a circuit that has been arcing behind a wall for a year.',
        attribution: 'Diego Serrano, Service Manager',
      },
      {
        type: 'p',
        text: 'A diagnostic visit is $89 during business hours and it is credited toward the repair. That buys you a clamp meter on the circuit under your real load, an insulation test on the run, and a thermal scan of the panel — which is how you find out whether you have a $200 problem or a $2,000 one.',
      },
    ],
  },

  {
    slug: 'how-much-does-an-electrical-panel-upgrade-cost',
    title: 'How Much Does an Electrical Panel Upgrade Cost in Austin?',
    category: 'Panels & Breakers',
    excerpt:
      'Real 2026 numbers for Austin, what actually drives the price up or down, and how to tell whether you need a panel replacement or a full service upgrade — they are not the same job.',
    author: 'Ray Alvarado',
    publishedOn: '2026-06-25',
    readingMinutes: 8,
    featured: true,
    relatedService: 'electrical-panel-upgrades',
    image: cover('how-much-does-an-electrical-panel-upgrade-cost', 'New 200-amp load center installed with labeled circuits'),
    seo: {
      title: 'Electrical Panel Upgrade Cost in Austin, TX (2026)',
      description:
        'What a panel replacement and a 200-amp service upgrade actually cost in Austin in 2026, what drives the price, and how to tell which one you need.',
    },
    body: [
      {
        type: 'p',
        text: 'Panel pricing gets quoted loosely because two different jobs share the same name. Knowing which one you are buying is most of the battle.',
      },
      { type: 'h2', text: 'Panel replacement vs. service upgrade' },
      {
        type: 'p',
        text: 'A panel replacement swaps the load center — the box, the bus and the breakers — while keeping your existing service size and the conductors coming in from the meter. A service upgrade replaces the whole path: meter base, mast, service entrance conductors, panel and grounding, and it changes your rated capacity, usually from 100 amps to 200.',
      },
      {
        type: 'p',
        text: 'If your panel is dangerous but your capacity is adequate, you want the first. If you are adding an EV charger and a heat pump to a 100-amp service, you probably want the second.',
      },
      { type: 'h2', text: 'What it costs in Austin in 2026' },
      {
        type: 'table',
        head: ['Job', 'Typical range', 'What is included'],
        rows: [
          ['Panel replacement, same service size', '$1,900 – $2,600', 'New load center, breakers, re-terminate circuits, permit'],
          ['200-amp service upgrade', '$2,900 – $4,800', 'Above plus meter base, mast, service conductors, grounding'],
          ['Federal Pacific / Zinsco replacement', '$2,400 – $4,200', 'Often includes repairing heat-damaged branch conductors'],
          ['Sub-panel installation', '$1,100 – $2,200', 'Feeder, sub-panel and grounding for garage, shop or ADU'],
          ['Panel relocation', '+$1,200 – $3,000', 'Added to any of the above'],
        ],
      },
      {
        type: 'note',
        title: 'What is always included in our numbers',
        text: 'Permit fees, the Austin Energy disconnect coordination, meeting the inspector, a typed panel directory, and haul-away. If a quote you are comparing does not list the permit, ask specifically — it is the most common thing left out to make a number look better.',
      },
      { type: 'h2', text: 'What drives the price up' },
      {
        type: 'ul',
        items: [
          'Relocating the panel. Moving it even a few feet means extending every branch circuit, and that is labor-intensive.',
          'Aluminum service entrance conductors that need replacing rather than reusing.',
          'A grounding electrode system that is missing or incomplete — new rods, a water bond and a gas bond.',
          'Heat-damaged branch conductors discovered when the old panel comes off. Burnt insulation cannot be re-landed; the wire has to be cut back and extended.',
          'AFCI and GFCI breakers required by current code. They cost three to four times a standard breaker, and a full panel of them adds real money.',
          'Overhead versus underground service. Overhead mast work is generally cheaper than underground.',
          'Two-story homes and tight equipment access.',
        ],
      },
      { type: 'h2', text: 'What brings it down' },
      {
        type: 'ul',
        items: [
          'Keeping the panel in its existing location.',
          'A sound existing grounding system.',
          'Combining it with other work while the power is already off — an EV charger circuit or a sub-panel costs far less installed on the same day.',
          'Confirming you actually need 200 amps. Plenty of homes do not, and 150-amp service costs less.',
        ],
      },
      { type: 'h2', text: 'How to tell whether you need it at all' },
      {
        type: 'p',
        text: 'Age alone is not a reason. A 1978 panel in good condition, with a sound bus and no heat damage, can be perfectly safe. These are the reasons that hold up:',
      },
      {
        type: 'ol',
        items: [
          'The panel is a Federal Pacific Stab-Lok, Zinsco or Sylvania. These have documented failure-to-trip records and many insurers now decline coverage.',
          'Every slot is full, or full of tandem breakers, so there is no safe way to add a circuit.',
          'There is rust, scorching, or heat discoloration inside the panel.',
          'You are adding a load that the service cannot absorb — EV charger, heat pump, induction range, hot tub, shop equipment.',
          'The panel is a fuse box. Not inherently unsafe, but effectively impossible to add to and a persistent insurance problem.',
        ],
      },
      { type: 'h2', text: 'The timeline nobody mentions in the quote' },
      {
        type: 'p',
        text: 'The work is one day. The calendar is one to two weeks, because that is how long it takes to get the permit and schedule the Austin Energy disconnect. That is the honest constraint, and it is worth knowing before you plan around a closing date.',
      },
      {
        type: 'p',
        text: 'If a contractor offers to start tomorrow, they are not pulling a permit. That saves you a week and costs you at resale, when a title search or a buyer’s inspection turns up an unpermitted panel.',
      },
      { type: 'h2', text: 'Financing' },
      {
        type: 'p',
        text: 'Panels rarely fail at a convenient moment. We work with a local lender offering 0% for 12 months on approved credit, with pre-qualification by soft credit check so it does not affect your score. Most decisions come back the same day, which means you know your number before scheduling rather than after.',
      },
    ],
  },

  {
    slug: 'signs-your-home-needs-rewiring',
    title: 'Signs Your Home Needs Rewiring (And When It Does Not)',
    category: 'Home Rewiring',
    excerpt:
      'Rewiring is the most expensive electrical work a house will ever have, and it is quoted far more often than it is needed. Here is how to tell the difference.',
    author: 'Grace Whitfield',
    publishedOn: '2026-06-02',
    readingMinutes: 7,
    featured: false,
    relatedService: 'whole-home-rewiring',
    image: cover('signs-your-home-needs-rewiring', 'Old cloth-insulated wiring alongside new NM-B cable in an attic'),
    seo: {
      title: 'Signs Your Home Needs Rewiring | Austin Electricians',
      description:
        'Knob-and-tube, cloth-insulated cable and aluminum branch wiring explained — which genuinely need replacing, which can be remediated, and what rewiring costs in Austin.',
    },
    body: [
      {
        type: 'p',
        text: 'We get called out for rewire estimates constantly, and a meaningful share of the time our answer is that the house does not need one. That is not generosity — it is that "old wiring" covers several very different situations, and only some of them require opening walls.',
      },
      { type: 'h2', text: 'What genuinely needs replacing' },
      { type: 'h3', text: 'Knob-and-tube' },
      {
        type: 'p',
        text: 'Common in Austin homes built before about 1945. Individual conductors run through porcelain tubes and are supported by porcelain knobs, with no ground and rubber insulation that is now eighty-plus years old. There is no way to make it safe in place, and most insurers will not write a policy on it.',
      },
      {
        type: 'p',
        text: 'The specific hazard we find most often is blown-in attic insulation covering active knob-and-tube. The system was designed to dissipate heat into open air. Buried in cellulose, it cooks.',
      },
      { type: 'h3', text: 'Deteriorated cloth-insulated cable' },
      {
        type: 'p',
        text: 'Used from roughly the 1930s through the early 1960s. If the jacket flakes or crumbles when you touch it at the panel, it is doing the same thing inside your walls where it is hotter. Some cloth cable is still in reasonable condition and can be left; the test is whether the insulation is intact where it terminates.',
      },
      { type: 'h3', text: 'Ungrounded circuits throughout the house' },
      {
        type: 'p',
        text: 'Two-prong outlets everywhere means no equipment ground anywhere. There is no safe path for a fault and no protection for electronics. GFCI protection is a legal partial remedy, but on a whole house it is a patch rather than a fix.',
      },
      { type: 'h2', text: 'What usually does not need a rewire' },
      { type: 'h3', text: 'Aluminum branch circuit wiring' },
      {
        type: 'p',
        text: 'Used roughly 1965 to 1973 during a copper price spike. It has a real failure mode: aluminum expands and contracts more than copper, so terminations on devices designed for copper loosen over time and eventually arc. But the conductor itself is usually fine — the problem lives at the connection points.',
      },
      {
        type: 'p',
        text: 'The recognized remediation is pigtailing every termination to a short copper tail with a listed connector such as an AlumiConn. On a typical house that is 80 to 100 device locations and runs $2,400 to $5,800, against $18,000 or more for a rewire. Insurers accept it. We have done this on homes where two other contractors had quoted a full rewire.',
      },
      { type: 'h3', text: 'Sound copper wiring in an old house' },
      {
        type: 'p',
        text: 'A 1958 Allandale ranch with intact NM cable and copper conductors does not need rewiring because it is old. It may need a new panel, a proper grounding electrode system, GFCI protection in wet locations, and a few dedicated circuits. That is a few thousand dollars, not twenty.',
      },
      { type: 'h2', text: 'Symptoms worth investigating' },
      {
        type: 'ul',
        items: [
          'Warm switch plates or outlet covers anywhere in the house',
          'Frequent flicker across multiple rooms, not just one fixture',
          'A burning or "hot dust" smell with no obvious source',
          'Two-prong outlets throughout, or three-prong outlets that test as ungrounded',
          'Fabric-covered cable visible at the panel or in the attic',
          'Cloth or rubber insulation that cracks when moved',
          'Discolored or scorched receptacles',
        ],
      },
      {
        type: 'note',
        title: 'A cheap test you can do right now',
        text: 'A $15 outlet tester from any hardware store will tell you whether a three-prong outlet is actually grounded. In pre-1965 homes, ungrounded three-prong outlets are extremely common — someone swapped the device without running a ground, which is both illegal and misleading, because the outlet looks safe.',
      },
      { type: 'h2', text: 'What a rewire costs and how long it takes' },
      {
        type: 'table',
        head: ['Scope', 'Typical Austin range', 'Duration'],
        rows: [
          ['Partial rewire (kitchen + baths)', '$4,500 – $9,000', '4–6 days'],
          ['Whole home, 1,200–1,600 sq ft', '$11,000 – $18,000', '8–12 days'],
          ['Whole home, 2,000–3,000 sq ft', '$18,000 – $32,000', '3–4 weeks'],
          ['Aluminum pigtail remediation', '$2,400 – $5,800', '3–4 days'],
        ],
      },
      {
        type: 'p',
        text: 'Those numbers include the panel, the permit, both inspections, and drywall repair with texture. A quote that excludes drywall repair is not cheaper — it just moves a real cost onto you at the end of the project, when you are trying to find a finisher.',
      },
      { type: 'h2', text: 'You do not have to move out' },
      {
        type: 'p',
        text: 'We stage rewires so there is always a working kitchen and at least one working bathroom. On a Hyde Park bungalow this spring the homeowners had a newborn and stayed in the house for all eleven days. It takes more planning and it is worth it.',
      },
      {
        type: 'p',
        text: 'Before you commit to anything, get an inspection with a written scope. $289 spent finding out you need a $5,000 remediation instead of a $22,000 rewire is the best return available in this trade.',
      },
    ],
  },

  {
    slug: 'can-i-install-an-ev-charger-at-home',
    title: 'Can I Install an EV Charger at Home?',
    category: 'EV Charging',
    excerpt:
      'Almost always yes — but the answer to "do I need a panel upgrade first" is no more often than most people are told. Here is how the calculation actually works.',
    author: 'Sam Okafor',
    publishedOn: '2026-05-19',
    readingMinutes: 8,
    featured: true,
    relatedService: 'ev-charger-installation',
    image: cover('can-i-install-an-ev-charger-at-home', 'Level 2 EV charger mounted in a home garage with conduit to the panel'),
    seo: {
      title: 'Can I Install an EV Charger at Home? | Austin EV Charger Installation',
      description:
        'Level 1 vs Level 2 charging, whether your panel can handle it, load management vs a service upgrade, real Austin costs and the Austin Energy rebate.',
    },
    body: [
      {
        type: 'p',
        text: 'The install itself is one of the simpler jobs we do. The interesting part happens before that: whether your electrical service can carry a 40 to 60 amp continuous load, which is the largest single thing most homes will ever add.',
      },
      { type: 'h2', text: 'Level 1 vs Level 2, in practical terms' },
      {
        type: 'table',
        head: ['', 'Level 1', 'Level 2'],
        rows: [
          ['Voltage', '120V standard outlet', '240V dedicated circuit'],
          ['Range added per hour', '3–5 miles', '25–44 miles'],
          ['Overnight (10 hrs)', '30–50 miles', '250–440 miles'],
          ['Install cost', '$0 (existing outlet)', '$750 – $2,900'],
          ['Good for', 'Plug-in hybrids, short commutes', 'Most EV drivers'],
        ],
      },
      {
        type: 'p',
        text: 'If you drive under 30 miles a day and can plug in every night, Level 1 genuinely works. Beyond that it stops keeping up, and a standard receptacle was never designed for a twelve-hour continuous draw — which is why the plug gets warm.',
      },
      { type: 'h2', text: 'Can your panel handle it?' },
      {
        type: 'p',
        text: 'This is where most people get a wrong answer. The traditional method adds up every load in the house at its rated value and compares that to your service size. On a 100- or 150-amp service with central AC and an electric range, that calculation almost always says no.',
      },
      {
        type: 'p',
        text: 'But NEC 220.87 permits a different method: use your actual measured peak demand over the past year, taken from utility data or a metering device, add the new load, and compare that. Real homes never run everything at once, so measured peak is routinely half of calculated load.',
      },
      {
        type: 'quote',
        text: 'A Mueller homeowner had been quoted a $4,000 service upgrade to add a second charger. His metered peak over thirty days was 62 amps on a 150-amp service. He did not need an upgrade — he needed the right calculation.',
        attribution: 'Sam Okafor, Journeyman Electrician',
      },
      { type: 'h2', text: 'When the answer is genuinely no' },
      {
        type: 'p',
        text: 'Sometimes there is no headroom. You then have three options, and they are not equally expensive:',
      },
      {
        type: 'ol',
        items: [
          'Install a smaller circuit. A 32-amp charger on a 40-amp circuit still adds roughly 200 miles overnight. For most drivers that is indistinguishable from a 48-amp charger, and it may fit where the larger one does not.',
          'Install a load-management device. These monitor total service current and throttle or pause charging when the house draws heavily. Cost is roughly $650 to $1,100 — usually far less than an upgrade.',
          'Upgrade the service to 200 amps. The right answer if you are also adding a heat pump or an induction range, or planning a second EV.',
        ],
      },
      { type: 'h2', text: 'Hardwired or plug-in?' },
      {
        type: 'p',
        text: 'Hardwiring is the better install: no plug to degrade, no receptacle to fail, and it is required above 48 amps. A NEMA 14-50 receptacle makes sense if you may take the charger with you when you move.',
      },
      {
        type: 'warning',
        title: 'If you go with a receptacle, do not use a builder-grade one',
        text: 'The $12 hardware-store NEMA 14-50 is designed for an RV that plugs in occasionally, not for daily cycling at 40 amps. Failed receptacles of exactly this type are behind a large share of EV charging fires. A commercial-grade device costs about $70 and is the only kind we install.',
      },
      { type: 'h2', text: 'What it costs in Austin' },
      {
        type: 'table',
        head: ['Scenario', 'Typical cost'],
        rows: [
          ['Charger within 25 ft of the panel', '$750 – $1,250'],
          ['Long run or detached garage', '$1,300 – $2,900'],
          ['Add a load-management device', '+$650 – $1,100'],
          ['Bundle with a 200A service upgrade', '$3,600 – $5,400'],
        ],
      },
      {
        type: 'p',
        text: 'Permit and inspection are included in all of those. Austin Energy has offered rebates on Level 2 home charging installations; the program terms change, so we check the current amount and prepare the paperwork as part of the job.',
      },
      { type: 'h2', text: 'Sizing, briefly' },
      {
        type: 'p',
        text: 'EV charging is a continuous load, so the circuit must be sized at 125% of the charger’s rating. A 48-amp charger needs a 60-amp circuit, not a 50. This is the single most common error we find on installs done by people who do not do this every week — and an undersized circuit runs hot for hours every night.',
      },
      { type: 'h2', text: 'Two cars' },
      {
        type: 'p',
        text: 'Two chargers on one service almost never means two full circuits. Load-sharing pairs split available current between the vehicles, so both charge overnight while the service never sees more than one charger’s worth of load. It is usually the difference between a $2,800 job and a $7,000 one.',
      },
    ],
  },

  {
    slug: 'why-are-my-lights-flickering',
    title: 'Why Are My Lights Flickering?',
    category: 'Electrical Safety',
    excerpt:
      'One flickering fixture is a nuisance. Every light in the house dimming when the AC starts is a warning — and the difference between them matters a great deal.',
    author: 'Diego Serrano',
    publishedOn: '2026-04-28',
    readingMinutes: 6,
    featured: false,
    relatedService: 'circuit-breaker-repair',
    image: cover('why-are-my-lights-flickering', 'Ceiling light fixture with an electrician testing voltage at the switch'),
    seo: {
      title: 'Why Are My Lights Flickering? | Austin Electrician',
      description:
        'Flickering lights explained: dimmer incompatibility, loose connections, failing neutrals and utility issues — which are harmless and which need a call today.',
    },
    body: [
      {
        type: 'p',
        text: 'Start by answering one question: is it one fixture, one room, or the whole house? That single distinction separates a $15 fix from something that can damage every appliance you own.',
      },
      { type: 'h2', text: 'One fixture flickering' },
      {
        type: 'p',
        text: 'Usually benign. In order of likelihood: a bulb that is not seated tightly, an LED bulb on a dimmer it is not compatible with, a worn socket contact, or a loose connection at the fixture.',
      },
      {
        type: 'p',
        text: 'LED-on-dimmer is by far the most common. LED drivers need a dimmer designed for them, and every manufacturer publishes a compatibility list. A second cause is too little load: some dimmers need a minimum wattage that four LED bulbs do not reach, and the circuit becomes unstable at the low end.',
      },
      { type: 'h2', text: 'One room or one circuit flickering' },
      {
        type: 'p',
        text: 'Now it is worth attention. A loose connection somewhere on that circuit — at a device, in a junction box, or at the breaker — creates intermittent resistance. Resistance creates heat. Heat makes the connection worse. That progression ends in arcing.',
      },
      {
        type: 'p',
        text: 'The most common single cause we find is a backstabbed receptacle: wire pushed into a hole in the back of a device rather than wrapped around a screw terminal. Those contacts lose tension over ten to twenty years. Every device downstream of it flickers.',
      },
      {
        type: 'note',
        title: 'A useful clue',
        text: 'If a room flickers when you plug something in or walk across the floor, it is mechanical — a physically loose connection responding to vibration. That is worth a call this week, not next month.',
      },
      { type: 'h2', text: 'The whole house flickering' },
      {
        type: 'p',
        text: 'This is the one that matters. Whole-house flicker, or every light dimming noticeably each time the air conditioner starts, points to something on the service side: a loose lug in the panel, a failing service entrance conductor, a corroded meter connection, or a failing neutral.',
      },
      {
        type: 'p',
        text: 'A failing neutral deserves a specific warning. In a standard residential service, two 120-volt legs share a neutral. If that neutral connection degrades, the voltage between the legs stops balancing — one side can rise toward 170 volts while the other drops. Anything plugged into the high side gets destroyed, and it happens quietly.',
      },
      {
        type: 'warning',
        title: 'Signs of a failing neutral — call the same day',
        text: 'Lights brightening in one part of the house while dimming in another. Electronics failing in clusters. Flicker that changes when large appliances cycle. Any of these mean stop, and call.',
      },
      { type: 'h2', text: 'When it is the utility, not you' },
      {
        type: 'p',
        text: 'Sometimes the problem is upstream of your meter. Two tells: your neighbors see it at the same time, and it correlates with weather or time of day rather than with what is running in your house. Austin Energy will check the service drop and the transformer at no charge. If we find the fault is on their side, we will tell you so rather than sell you a panel.',
      },
      { type: 'h2', text: 'What we actually do about it' },
      {
        type: 'ol',
        items: [
          'Voltage logging at the panel over time, to catch intermittent events rather than guessing from a single reading',
          'Thermal imaging of the panel under load — loose lugs show up as heat long before they fail',
          'Torque check on service and neutral connections to specification',
          'Circuit-by-circuit inspection of devices on the affected run',
          'Voltage drop measurement across long runs',
        ],
      },
      {
        type: 'p',
        text: 'Most flicker calls resolve in a single visit. The ones that do not are the intermittent ones, which is why we log rather than take one reading and leave.',
      },
    ],
  },

  {
    slug: 'federal-pacific-panel-what-to-do',
    title: 'You Have a Federal Pacific Panel. What Now?',
    category: 'Panels & Breakers',
    excerpt:
      'Stab-Lok breakers have a documented history of failing to trip. Here is how to identify one, why insurers care, and what replacement actually involves.',
    author: 'Ray Alvarado',
    publishedOn: '2026-04-07',
    readingMinutes: 6,
    featured: false,
    relatedService: 'electrical-panel-upgrades',
    image: cover('federal-pacific-panel-what-to-do', 'Federal Pacific Stab-Lok panel with the dead front removed'),
    seo: {
      title: 'Federal Pacific Stab-Lok Panels: What To Do | Austin Electricians',
      description:
        'How to identify a Federal Pacific Stab-Lok or Zinsco panel, why insurers refuse them, what replacement costs in Austin, and why there is no repair option.',
    },
    body: [
      {
        type: 'p',
        text: 'If a home inspector flagged a Federal Pacific panel, or you opened your panel door and saw the Stab-Lok name, this is worth understanding properly rather than through the noise online.',
      },
      { type: 'h2', text: 'What the actual problem is' },
      {
        type: 'p',
        text: 'Federal Pacific Electric sold Stab-Lok panels widely from the 1950s through the early 1980s. Independent testing since has found their breakers failing to trip under fault conditions at rates far above any other manufacturer — in some test sets, a substantial fraction of two-pole breakers failed to open on a dead short.',
      },
      {
        type: 'p',
        text: 'A breaker that does not trip is not a breaker. It is a switch that lets a fault run until something else stops it, and the thing that usually stops it is the wire failing.',
      },
      {
        type: 'p',
        text: 'The Consumer Product Safety Commission investigated in the early 1980s and closed the investigation without a recall, citing budget constraints rather than a finding of safety. That distinction matters — "no recall" is frequently repeated as "no problem," and it is not the same thing.',
      },
      { type: 'h2', text: 'How to identify one' },
      {
        type: 'ul',
        items: [
          'The panel door or dead front says "Federal Pacific Electric," "FPE," or "Stab-Lok"',
          'Breaker handles are typically red-tipped or have a distinctive thin profile',
          'The panel label may read "Federal Pioneer" — a related Canadian brand',
          'Zinsco and Sylvania-Zinsco panels have a separate but comparable failure history, often with breakers in multiple colors',
        ],
      },
      {
        type: 'p',
        text: 'If you are not sure, take a photo of the inside of the panel door — never remove the dead front yourself — and send it to us. We will tell you what you have at no charge.',
      },
      { type: 'h2', text: 'Why your insurer cares' },
      {
        type: 'p',
        text: 'A growing number of carriers now decline to write or renew policies on homes with FPE or Zinsco panels, and it is one of the first things a four-point inspection reports. Homeowners often discover this at renewal or during a sale rather than by choice.',
      },
      {
        type: 'p',
        text: 'Similarly, lenders increasingly require replacement before funding. If you are selling, this is worth addressing before listing rather than eight days before closing — though we have done plenty of the latter.',
      },
      { type: 'h2', text: 'Is there any fix short of replacement?' },
      {
        type: 'p',
        text: 'No. Replacement breakers for these panels are available, but the failure mode is in the design of the bus and stab connection as much as in the breaker itself, and installing new breakers into an old bus does not resolve it. There is no listed retrofit. Any contractor offering to "just replace the breakers" is not solving your problem or your insurance situation.',
      },
      { type: 'h2', text: 'What replacement involves' },
      {
        type: 'p',
        text: 'One day of work, six to eight hours without power, plus one to two weeks of lead time for the permit and the Austin Energy disconnect. Typical Austin cost is $2,400 to $4,200 for a straight replacement, more if the service is also being upgraded to 200 amps.',
      },
      {
        type: 'p',
        text: 'One thing worth budgeting for: when the old panel comes off, it is common to find branch conductors with heat damage at the stab connections. Burnt insulation cannot be re-landed in a new panel — the conductor gets cut back to sound copper and extended with a listed splice. We flag it with a photo and price it before doing it, but on FPE panels specifically it is common enough that you should expect the possibility.',
      },
      {
        type: 'note',
        title: 'What you get at the end',
        text: 'A new load center with copper bus, AFCI and GFCI protection where current code requires it, a corrected grounding electrode system, a typed directory, a closed permit for your records, and a five-year workmanship warranty that transfers to the next owner.',
      },
    ],
  },

  {
    slug: 'recessed-lighting-layout-that-actually-works',
    title: 'Recessed Lighting: The Layout Rules That Actually Matter',
    category: 'Lighting',
    excerpt:
      'Most disappointing recessed lighting is a spacing problem, not a fixture problem. Four rules cover almost every room.',
    author: 'Sam Okafor',
    publishedOn: '2026-03-18',
    readingMinutes: 6,
    featured: false,
    relatedService: 'lighting-installation',
    image: cover('recessed-lighting-layout-that-actually-works', 'Kitchen ceiling with evenly spaced recessed LED downlights'),
    seo: {
      title: 'Recessed Lighting Layout Guide | Austin Lighting Installation',
      description:
        'Spacing, wall distance, color temperature and dimmer compatibility — the four rules that determine whether recessed lighting looks good or looks like a grid of holes.',
    },
    body: [
      {
        type: 'p',
        text: 'When someone tells us their recessed lighting looks bad, the fixtures are almost never the reason. The four things below are.',
      },
      { type: 'h2', text: 'Rule 1: Spacing is half the ceiling height' },
      {
        type: 'p',
        text: 'Divide your ceiling height by two, and that is your fixture spacing in feet. An 8-foot ceiling wants fixtures roughly 4 feet apart. A 10-foot ceiling wants 5 feet.',
      },
      {
        type: 'p',
        text: 'This is a starting point, not a law. It produces even ambient light. Where you want emphasis — over an island, over a reading chair — you tighten the spacing deliberately.',
      },
      { type: 'h2', text: 'Rule 2: Stay 2 to 3 feet off the walls' },
      {
        type: 'p',
        text: 'Fixtures pushed too close to a wall create scalloped arcs of light on the wall and leave the middle of the room dim. Too far out and the perimeter goes dark and the room feels smaller. Two and a half feet is the number that works in most rooms.',
      },
      { type: 'h2', text: 'Rule 3: Light the work surface, not the ceiling grid' },
      {
        type: 'p',
        text: 'This is the one people get wrong most often in kitchens. A perfectly even grid puts fixtures in the middle of the room, which means you stand at the counter with your own shadow on the cutting board.',
      },
      {
        type: 'p',
        text: 'Position fixtures over the front edge of the counter — roughly 24 inches from the wall — so the light comes over your shoulder rather than behind your head. Then fill the rest of the ceiling around that.',
      },
      {
        type: 'note',
        title: 'Tape it out first',
        text: 'Before we cut a single hole we mark every fixture position on the ceiling with painter’s tape and walk it with the homeowner. It costs ten minutes and it is the single most valuable step in the whole job. People move one or two positions almost every time.',
      },
      { type: 'h2', text: 'Rule 4: One color temperature per space' },
      {
        type: 'p',
        text: 'Mixing color temperatures is what produces "something looks off" without anyone being able to name it. Pick one and hold it across every fixture in a connected space, including under-cabinet and pendants.',
      },
      {
        type: 'table',
        head: ['Temperature', 'Character', 'Best for'],
        rows: [
          ['2700K', 'Warm, close to incandescent', 'Living rooms, bedrooms, dining'],
          ['3000K', 'Warm neutral', 'Kitchens, bathrooms, open plans'],
          ['3500K', 'Neutral', 'Offices, laundry, garages'],
          ['4000K+', 'Cool, clinical', 'Workshops, task areas only'],
        ],
      },
      {
        type: 'p',
        text: 'Also check CRI — the color rendering index. Below 90, food looks grey and skin tones look wrong. It is the specification most people never look at and the one they notice most in a kitchen.',
      },
      { type: 'h2', text: 'Fixture size and quantity' },
      {
        type: 'p',
        text: '4-inch fixtures have largely replaced 6-inch in residential work. They are less visually intrusive and modern LED output means you are not giving up light. Six 4-inch fixtures generally read better than four 6-inch ones.',
      },
      { type: 'h2', text: 'Two things that are code, not preference' },
      {
        type: 'ul',
        items: [
          'Fixtures in an insulated ceiling must be IC-rated. Non-IC housings buried in insulation are a fire hazard, and in Austin attics they will be buried.',
          'Airtight housings matter in Central Texas. A non-airtight can is a hole between your conditioned space and a 140-degree attic, and eight of them add up on a July electric bill.',
        ],
      },
      { type: 'h2', text: 'Dimmers' },
      {
        type: 'p',
        text: 'Buy the dimmer for the fixture, not the other way around. Every LED manufacturer publishes a compatibility list, and using something off it is the cause of nearly every flicker and buzz complaint we get. Also set the low-end trim after installation — most dimmers ship with a default that makes LEDs flicker at the bottom of the range, and it takes thirty seconds to adjust.',
      },
    ],
  },

  {
    slug: 'standby-vs-portable-generator',
    title: 'Standby vs. Portable Generator: An Honest Comparison',
    category: 'Generators',
    excerpt:
      'A standby generator costs eight times what a portable does. For some households that is obviously worth it, and for others it clearly is not.',
    author: 'Ray Alvarado',
    publishedOn: '2026-02-11',
    readingMinutes: 7,
    featured: false,
    relatedService: 'generator-installation',
    image: cover('standby-vs-portable-generator', 'Standby generator on a pad beside a house next to a portable generator'),
    seo: {
      title: 'Standby vs Portable Generator in Austin, TX | Cost & Comparison',
      description:
        'Standby and portable generators compared on cost, fuel, capacity and safety — plus the transfer switch and interlock options that make a portable safe to use.',
    },
    body: [
      {
        type: 'p',
        text: 'February 2021 changed how Central Texas thinks about backup power. Since then we have installed a lot of standby generators, and we have also talked a number of people out of one. Both are the right call depending on the house.',
      },
      { type: 'h2', text: 'Side by side' },
      {
        type: 'table',
        head: ['', 'Portable', 'Standby'],
        rows: [
          ['Equipment cost', '$500 – $2,000', '$8,500 – $22,000 installed'],
          ['Starts automatically', 'No', 'Yes, in 10–30 seconds'],
          ['Fuel', 'Gasoline, refill every 8–12 hrs', 'Natural gas or propane, continuous'],
          ['Runs central AC', 'Rarely', 'Yes'],
          ['Noise', '65–75 dB, close by', '55–65 dB, at a distance'],
          ['Maintenance', 'Per use, plus fuel stabilizer', 'Annual service, weekly self-test'],
          ['Works while you are away', 'No', 'Yes'],
          ['Adds resale value', 'No', 'Generally yes'],
        ],
      },
      { type: 'h2', text: 'When a portable is genuinely the right answer' },
      {
        type: 'p',
        text: 'You lose power once every year or two, for hours rather than days. You mainly want the refrigerator, some lights, phone charging and a fan. Someone is home to start it and refuel it. You are comfortable with the routine.',
      },
      {
        type: 'p',
        text: 'If that is you, spend the money on doing it safely instead — see below.',
      },
      { type: 'h2', text: 'When standby earns its cost' },
      {
        type: 'ul',
        items: [
          'Outages several times a year, which is common in parts of Hays and western Travis County',
          'Someone in the house depends on power — medical equipment, refrigerated medication, a well pump',
          'You travel, or the house is sometimes empty during storm season',
          'You work from home and a lost day costs real money',
          'Central Texas summer, where losing AC for two days is a genuine health issue rather than an inconvenience',
        ],
      },
      { type: 'h2', text: 'Whole-home or essential-circuit?' },
      {
        type: 'p',
        text: 'Whole-home backs up everything and costs roughly $14,000 to $22,000. Essential-circuit backs up a defined set of loads — typically one HVAC zone, refrigeration, kitchen outlets, network, selected lighting — for $8,500 to $13,000.',
      },
      {
        type: 'p',
        text: 'Most households are happier with essential-circuit than they expect. The circuits people genuinely miss during an outage are a short list, and deliberately leaving the electric range and the dryer off it makes a smaller, quieter, cheaper generator do the job.',
      },
      {
        type: 'warning',
        title: 'The one thing that must never happen',
        text: 'Never back-feed a portable generator into your house through a dryer or range outlet using a double-male cord. It energizes the utility line outside your house and can kill a lineworker restoring power. It also back-feeds through your transformer at thousands of volts. There is no version of this that is acceptable.',
      },
      { type: 'h2', text: 'Making a portable safe: two options' },
      {
        type: 'p',
        text: 'If you own a portable generator, there are two legal, safe ways to connect it, and both are inexpensive relative to the generator itself.',
      },
      {
        type: 'ol',
        items: [
          'An interlock kit and inlet, $950 to $1,700. A mechanical plate on the panel makes it physically impossible to have the main breaker and the generator breaker on at the same time. You plug into an exterior inlet and choose which circuits to run manually. Cheapest safe option and gives you access to any circuit.',
          'A manual transfer switch, $1,400 to $2,600. A small sub-panel with switches for a fixed set of circuits. Simpler to operate, slightly less flexible.',
        ],
      },
      { type: 'h2', text: 'Sizing, briefly' },
      {
        type: 'p',
        text: 'The number that matters is not running watts, it is starting watts. Air conditioner compressors and well pumps draw three to five times their running current for a moment at startup, and a generator that cannot supply that will stall.',
      },
      {
        type: 'p',
        text: 'On a Lakeway house with three condensers this year, staggering the third compressor with a start delay let us use a 26kW unit instead of jumping to a larger, louder and considerably more expensive one. Sizing is a design decision, not a lookup.',
      },
      { type: 'h2', text: 'The timeline' },
      {
        type: 'p',
        text: 'Three days on site, but four to six weeks overall. Electrical and mechanical permits, gas line sizing and installation by a licensed plumber, and often HOA approval. If you want a generator for this hurricane and storm season, start in spring — every year we take calls the week after a big outage from people who need one installed tomorrow.',
      },
    ],
  },

  {
    slug: 'commercial-led-retrofit-payback',
    title: 'Does an LED Retrofit Actually Pay for Itself?',
    category: 'Commercial Electrical',
    excerpt:
      'For most Austin retail and restaurant spaces, yes — typically in 18 to 30 months. Here is how to run the numbers for your own space before anyone quotes you.',
    author: 'Travis Boyd',
    publishedOn: '2026-01-22',
    readingMinutes: 6,
    featured: false,
    relatedService: 'commercial-electrical',
    image: cover('commercial-led-retrofit-payback', 'Commercial retail space with new LED lighting installed in a drop ceiling'),
    seo: {
      title: 'Commercial LED Retrofit Payback in Austin, TX',
      description:
        'How to calculate LED retrofit payback for a commercial space, including energy, maintenance and HVAC savings plus Austin Energy rebates.',
    },
    body: [
      {
        type: 'p',
        text: 'LED retrofit proposals tend to lead with a payback figure that assumes best-case everything. The math is not complicated and it is worth doing yourself before you evaluate a quote.',
      },
      { type: 'h2', text: 'The four places savings come from' },
      {
        type: 'ol',
        items: [
          'Energy. An LED troffer replacing a 4-lamp T8 fixture typically cuts that fixture from about 112 watts to 40 — roughly 64%.',
          'Maintenance. No relamping. In a space with high ceilings the labor and lift cost of relamping often rivals the energy savings.',
          'HVAC. Lighting waste heat has to be removed by your air conditioning. In Austin, that is a real line item for eight months a year.',
          'Rebates. Austin Energy has run commercial lighting rebate programs that cover a meaningful share of project cost. Terms change annually, so confirm the current program before budgeting.',
        ],
      },
      { type: 'h2', text: 'A worked example' },
      {
        type: 'p',
        text: 'A 3,000 square foot retail space with 40 four-lamp T8 troffers, open 12 hours a day, 6 days a week — about 3,744 operating hours a year.',
      },
      {
        type: 'table',
        head: ['', 'Existing T8', 'LED retrofit'],
        rows: [
          ['Watts per fixture', '112 W', '40 W'],
          ['Total connected load', '4.48 kW', '1.60 kW'],
          ['Annual kWh', '16,773', '5,990'],
          ['Annual energy cost at $0.12/kWh', '$2,013', '$719'],
          ['Annual relamping labour + lamps', '$620', '$0'],
          ['Estimated HVAC load reduction', '—', '~$180'],
        ],
      },
      {
        type: 'p',
        text: 'Total annual saving: roughly $2,094. Project cost for 40 fixtures at $150 installed is about $6,000, less a rebate. Simple payback lands between 24 and 34 months before rebate, and often under 24 months after.',
      },
      {
        type: 'note',
        title: 'The two numbers you need',
        text: 'Your operating hours per year, and your actual blended electricity rate from a recent bill. Everything else can be estimated. A proposal that does not ask you for either of those is using assumptions, not your building.',
      },
      { type: 'h2', text: 'Where the payback is worse than advertised' },
      {
        type: 'ul',
        items: [
          'Low operating hours. A space open 40 hours a week has roughly half the savings of one open 72 hours.',
          'Fixtures already retrofitted to efficient T8 with electronic ballasts — the delta is smaller than replacing T12 or metal halide.',
          'Spaces where fixtures are easily accessible, so maintenance savings are minimal.',
        ],
      },
      { type: 'h2', text: 'Where it is better' },
      {
        type: 'ul',
        items: [
          'High-bay metal halide in warehouses and shops. Replacing 400W metal halide with 150W LED high-bay is often under an 18-month payback, and the light quality difference is dramatic.',
          'Any space with 20-foot ceilings, where every relamp means a lift rental.',
          'Restaurants and bars running 16-hour days.',
          'Parking lots and exterior lighting, which run every night of the year.',
        ],
      },
      { type: 'h2', text: 'Two things worth doing at the same time' },
      {
        type: 'p',
        text: 'While the ceiling is open and the electrician is in the space, occupancy sensors and daylight harvesting controls add relatively little cost and can cut another 20 to 30% in areas like storerooms, restrooms and perimeter zones. And it is the right moment to test and document your emergency and exit lighting, which a fire marshal will ask about eventually.',
      },
      {
        type: 'p',
        text: 'We do most commercial retrofits at night or before opening so the space never closes. On a 40-fixture retail space that is typically two overnight shifts.',
      },
    ],
  },

  {
    slug: 'gfci-vs-afci-what-is-the-difference',
    title: 'GFCI vs. AFCI: What Each One Actually Protects You From',
    category: 'Electrical Safety',
    excerpt:
      'They look similar, they are required in different places, and they protect against completely different hazards. Ten minutes here will save you a lot of confusion at the panel.',
    author: 'Grace Whitfield',
    publishedOn: '2025-12-09',
    readingMinutes: 5,
    featured: false,
    relatedService: 'outlet-and-switch-installation',
    image: cover('gfci-vs-afci-what-is-the-difference', 'GFCI receptacle and AFCI breaker shown side by side'),
    seo: {
      title: 'GFCI vs AFCI: What Is the Difference? | Austin Electricians',
      description:
        'GFCI protects people from shock, AFCI protects the building from fire. Where each is required, why they nuisance trip, and how to test them.',
    },
    body: [
      {
        type: 'p',
        text: 'The short version: GFCI protects people from electrocution. AFCI protects the building from fire. They are not interchangeable and most homes need both, in different places.',
      },
      { type: 'h2', text: 'GFCI — ground fault circuit interrupter' },
      {
        type: 'p',
        text: 'A GFCI compares the current going out on the hot conductor with the current coming back on the neutral. Those should be identical. If they differ by as little as 5 milliamps, current is escaping somewhere — possibly through a person — and the device cuts power in roughly 25 milliseconds.',
      },
      {
        type: 'p',
        text: 'Five milliamps is well below the level that stops a heart. That margin is why bathroom and kitchen shocks so rarely become fatal in homes with working GFCIs.',
      },
      { type: 'h3', text: 'Where GFCI is required' },
      {
        type: 'ul',
        items: [
          'Bathrooms — all receptacles',
          'Kitchens — all countertop receptacles, plus dishwasher circuits',
          'Garages and unfinished basements',
          'Outdoors, including anything on a porch or patio',
          'Within 6 feet of any sink, laundry tub or wet bar',
          'Pools, spas and anything near water',
          'Crawl spaces and laundry areas',
        ],
      },
      { type: 'h2', text: 'AFCI — arc fault circuit interrupter' },
      {
        type: 'p',
        text: 'An arc fault is electricity jumping a gap: a loose terminal screw, a cable crushed by a staple, a nail nicking a conductor, a cord damaged behind furniture. Arcing produces temperatures over 5,000 degrees but often draws so little current that a standard breaker never notices.',
      },
      {
        type: 'p',
        text: 'AFCI devices recognise the electrical waveform signature of arcing and open the circuit. That is a harder problem than the GFCI’s simple imbalance comparison, which is why AFCIs cost more and why they occasionally get it wrong.',
      },
      { type: 'h3', text: 'Where AFCI is required' },
      {
        type: 'p',
        text: 'Under current code, essentially all 120-volt circuits in living areas: bedrooms, living rooms, dining rooms, hallways, closets, kitchens and laundry. In practice, an AFCI or dual-function breaker is the default on most circuits in new work.',
      },
      { type: 'h2', text: 'Dual-function devices' },
      {
        type: 'p',
        text: 'Where both are required — a kitchen or laundry circuit, for example — a dual-function breaker provides both in one device. They cost more than either alone and less than adding a separate GFCI receptacle downstream, and they mean the whole circuit is protected rather than just the outlets past a particular device.',
      },
      { type: 'h2', text: 'Nuisance tripping' },
      {
        type: 'p',
        text: 'Both types trip for real reasons that are not always dangerous.',
      },
      {
        type: 'ul',
        items: [
          'GFCI: moisture in an outdoor box after rain, a failing appliance with leakage, a long circuit with many devices where small leakage sums past 5mA, or a device at end of life.',
          'AFCI: vacuum cleaner and power tool motors, some LED drivers, and — genuinely — shared neutrals between circuits, which is a wiring fault worth finding.',
        ],
      },
      {
        type: 'warning',
        title: 'Do not "solve" repeated trips by replacing the device with a standard one',
        text: 'It happens, and it is the wrong instinct. Both devices detect conditions a standard breaker cannot see. Repeated tripping is information — the correct response is to find out what is generating it.',
      },
      { type: 'h2', text: 'Testing them' },
      {
        type: 'p',
        text: 'Monthly for GFCI receptacles: press "Test," confirm power cuts and the button pops, then press "Reset." AFCI breakers have a test button in the panel; press it and the breaker should trip to the middle position. If either fails to trip, or will not reset, the device has failed and needs replacing. Both wear out — commonly after ten to fifteen years.',
      },
      {
        type: 'note',
        title: 'One retrofit worth doing',
        text: 'If your home was built before 1990, the two highest-value electrical upgrades per dollar are GFCI protection in every wet location and interconnected smoke alarms. Neither is expensive and both address the hazards that actually hurt people.',
      },
    ],
  },
]
