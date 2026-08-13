import type { Faq } from './types.ts'

export { faqCategories } from './taxonomy.ts'

export const faqs: Faq[] = [
  // Appointments & Scheduling
  {
    id: 'f-01',
    category: 'Appointments & Scheduling',
    sortOrder: 1,
    featured: true,
    question: 'How soon can you get someone out?',
    answer:
      'We hold same-day slots open every weekday for repairs that cannot wait, and those are usually gone by mid-morning. Non-urgent work — new lighting, fans, outlets — typically books two to five days out. Panel upgrades and EV chargers depend on permit and utility timing, usually one to two weeks. Emergencies are 24/7 with a typical 60–90 minute on-site response in the Austin area.',
  },
  {
    id: 'f-02',
    category: 'Appointments & Scheduling',
    sortOrder: 2,
    question: 'Do you give a real arrival time or a four-hour window?',
    answer:
      'A two-hour window, and we call or text when the electrician is on the way with an ETA. If we are running late because a job ahead of you turned out to be bigger than expected, you will hear from us before your window ends rather than after.',
  },
  {
    id: 'f-03',
    category: 'Appointments & Scheduling',
    sortOrder: 3,
    question: 'Do I need to be home?',
    answer:
      'For a diagnostic or an estimate, yes — we need to talk to you about what the house is doing and get your approval on price before we work. For a scheduled install where the scope is already agreed, an adult over 18 needs to be present, but it does not have to be you.',
  },
  {
    id: 'f-04',
    category: 'Appointments & Scheduling',
    sortOrder: 4,
    question: 'Will my power be off, and for how long?',
    answer:
      'Most repairs only require shutting off one circuit for a few minutes. Panel replacements mean the whole house is off for roughly six to eight hours, and we schedule those to start early so power is back before evening. We tell you the day before exactly what to expect so you can plan around refrigeration and work calls.',
  },
  {
    id: 'f-05',
    category: 'Appointments & Scheduling',
    sortOrder: 5,
    question: 'Do you work weekends?',
    answer:
      'Saturday mornings for scheduled work, and 24/7 for emergencies. Sunday is emergency calls only. After-hours and weekend emergency work carries a higher rate, and we tell you what it is on the phone before we dispatch.',
  },

  // Pricing & Estimates
  {
    id: 'f-10',
    category: 'Pricing & Estimates',
    sortOrder: 1,
    featured: true,
    question: 'Do you charge by the hour or by the job?',
    answer:
      'By the job for residential work. You get a fixed price before we start, and it does not change because the job took longer than we expected — that is our risk to carry, not yours. Commercial service work is hourly at a published rate. The only thing that changes a residential price is if you ask us to do something different, and that gets a new written price first.',
  },
  {
    id: 'f-11',
    category: 'Pricing & Estimates',
    sortOrder: 2,
    featured: true,
    question: 'Is the estimate free?',
    answer:
      'Estimates for planned work — panel upgrades, EV chargers, lighting, rewires, generators — are free, and that includes the site visit and the load calculation. Diagnostics are different: if something is broken and we have to find out why, that is $89 during business hours and it gets credited toward the repair if you proceed with us.',
  },
  {
    id: 'f-12',
    category: 'Pricing & Estimates',
    sortOrder: 3,
    question: 'Why is there a diagnostic fee when the estimate is free?',
    answer:
      'Quoting a panel upgrade takes twenty minutes of looking. Finding out why a breaker trips only when the dryer runs can take two hours of testing, and that testing is the actual work — it is what tells you whether the fix is $200 or $2,000. We credit it to the repair because we would rather you have the answer than avoid the call.',
  },
  {
    id: 'f-13',
    category: 'Pricing & Estimates',
    sortOrder: 4,
    question: 'Do you offer financing?',
    answer:
      'Yes, through a local lender, for projects over $1,000. There is 0% for 12 months on approved credit, and terms up to 84 months on larger projects. Pre-qualification is a soft credit check that does not affect your score, and the decision usually comes back the same day so you know before we schedule.',
  },
  {
    id: 'f-14',
    category: 'Pricing & Estimates',
    sortOrder: 5,
    question: 'How do you handle price changes once work has started?',
    answer:
      'We do not change a price for work we already quoted. If we open a wall and find something genuinely unknown — a buried junction box, damaged conductors, an unpermitted circuit — we stop, show you a photo, and price that separately. You decide whether to include it. Nothing gets added to your invoice that you did not approve first.',
  },
  {
    id: 'f-15',
    category: 'Pricing & Estimates',
    sortOrder: 6,
    question: 'What forms of payment do you take?',
    answer:
      'Cash, check, all major cards, and ACH. Cards carry no surcharge. On projects over $5,000 we take a deposit for materials and bill the balance on completion — we never ask for the full amount up front.',
  },

  // Emergency Service
  {
    id: 'f-20',
    category: 'Emergency Service',
    sortOrder: 1,
    featured: true,
    question: 'What actually counts as an electrical emergency?',
    answer:
      'A burning smell, visible sparks, a hot panel or outlet, buzzing from a wall or panel, exposed live wiring, storm damage to the service, water contacting electrical equipment, or a breaker that trips instantly every time you reset it. Losing power to one room is usually not an emergency — losing power to half the house without a tripped breaker is, because that often means a lost neutral.',
  },
  {
    id: 'f-21',
    category: 'Emergency Service',
    sortOrder: 2,
    question: 'What should I do before you arrive?',
    answer:
      'If you can safely reach the panel, shut off the breaker feeding the affected area — or the main if you are unsure which one it is. Unplug what is on that circuit. Do not use water near the equipment, and do not keep resetting a breaker that trips again. If there is fire, smoke, or water on live equipment, call 911 first. We will walk you through all of it on the phone.',
  },
  {
    id: 'f-22',
    category: 'Emergency Service',
    sortOrder: 3,
    question: 'Do I reach a real electrician at 2am, or an answering service?',
    answer:
      'A licensed electrician. That matters because the first useful thing that happens on an emergency call is somebody telling you what to shut off, and an answering service cannot do that.',
  },
  {
    id: 'f-23',
    category: 'Emergency Service',
    sortOrder: 4,
    question: 'What does emergency service cost?',
    answer:
      'The after-hours diagnostic is $149 and it is credited toward the repair. Repair pricing is quoted after we find the fault, in writing, before we start — the same as during business hours. We do not price by how worried you sound.',
  },
  {
    id: 'f-24',
    category: 'Emergency Service',
    sortOrder: 5,
    question: 'Can you fix it the same night?',
    answer:
      'Usually. Our trucks carry breakers, receptacles, connectors, lugs and service parts, so most emergency repairs are completed on the first visit. When a permanent repair needs a part we do not stock or a utility disconnect, we make the situation safe, restore what power we safely can, and come back with the part.',
  },

  // Electrical Safety
  {
    id: 'f-30',
    category: 'Electrical Safety',
    sortOrder: 1,
    featured: true,
    question: 'Why do my lights flicker?',
    answer:
      'One fixture flickering is usually a loose bulb or an incompatible dimmer. Lights flickering across the whole house, or dimming every time the AC starts, is different — that points to a loose service connection, a failing neutral, or an undersized service. Whole-house flicker is worth a call, because a loose neutral can push high voltage into 120-volt equipment.',
  },
  {
    id: 'f-31',
    category: 'Electrical Safety',
    sortOrder: 2,
    question: 'Is it safe to keep resetting a breaker that trips?',
    answer:
      'Once, to see if it holds. If it trips again, stop. The breaker is detecting something — overload, a short, or an arc — and it is the only thing standing between that fault and a fire. Repeatedly resetting it also wears out the breaker itself, so eventually it stops protecting you at all.',
  },
  {
    id: 'f-32',
    category: 'Electrical Safety',
    sortOrder: 3,
    question: 'My outlet is warm. Is that normal?',
    answer:
      'No. Outlets and switches should be at room temperature. Warmth means electrical resistance where there should be none — usually a loose connection or a device whose contacts have worn out. It is an early-stage arcing fault and it gets worse, not better. Stop using it and have it looked at.',
  },
  {
    id: 'f-33',
    category: 'Electrical Safety',
    sortOrder: 4,
    question: 'How often should I test GFCI outlets?',
    answer:
      'Monthly. Press "Test" — the outlet should cut power and the button should pop out. Press "Reset" to restore it. If it does not trip, or will not reset, the device has failed and needs replacing. GFCIs are the reason bathroom and kitchen shocks rarely become fatal, and they do wear out, typically after ten to fifteen years.',
  },
  {
    id: 'f-34',
    category: 'Electrical Safety',
    sortOrder: 5,
    question: 'Are extension cords and power strips a fire risk?',
    answer:
      'Used temporarily, no. Used permanently, yes. Extension cords are not rated for continuous duty, they get run under rugs and behind furniture where heat cannot escape, and they encourage overloading a single circuit. If a cord is a permanent fixture in a room, that room needs another outlet.',
  },
  {
    id: 'f-35',
    category: 'Electrical Safety',
    sortOrder: 6,
    question: 'How often should smoke alarms be replaced?',
    answer:
      'Every ten years from the manufacture date printed on the back — not from when you installed it. The sensor degrades whether or not the test button still beeps. CO alarms have a shorter life, usually seven years. If you cannot find a date on the back, it is old enough to replace.',
  },

  // Panels & Breakers
  {
    id: 'f-40',
    category: 'Panels & Breakers',
    sortOrder: 1,
    featured: true,
    question: 'How do I know if I need a panel upgrade?',
    answer:
      'A few clear signals: the panel is a Federal Pacific Stab-Lok, Zinsco or Sylvania; every slot is full or doubled up with tandem breakers; you are adding a large load like an EV charger or heat pump; or there is rust, scorching or heat discoloration inside. If none of those apply, a 100-amp service in good condition is often fine and does not need replacing just because it is old.',
  },
  {
    id: 'f-41',
    category: 'Panels & Breakers',
    sortOrder: 2,
    question: 'What is wrong with Federal Pacific panels specifically?',
    answer:
      'Independent testing has shown Stab-Lok breakers failing to trip under fault conditions at rates far above any other brand. A breaker that does not trip is not a breaker. Many insurers now decline to write policies on homes that have them, which is often how homeowners find out. Replacement is the only fix — there is no repair.',
  },
  {
    id: 'f-42',
    category: 'Panels & Breakers',
    sortOrder: 3,
    question: 'Can I just add a sub-panel instead of replacing the main panel?',
    answer:
      'Sometimes, and it is usually cheaper. A sub-panel adds breaker space, which solves a full panel. It does not add capacity — if your service itself is undersized, a sub-panel just gives you more ways to overload it. The load calculation tells us which problem you actually have.',
  },
  {
    id: 'f-43',
    category: 'Panels & Breakers',
    sortOrder: 4,
    question: 'How long does a panel replacement take?',
    answer:
      'One day on site, six to eight hours without power. The calendar time is longer — usually one to two weeks — because it takes that long to get the permit and schedule the Austin Energy disconnect. Anyone offering to do it tomorrow is not pulling a permit.',
  },
  {
    id: 'f-44',
    category: 'Panels & Breakers',
    sortOrder: 5,
    question: 'Do I need 200-amp service?',
    answer:
      'Not automatically. 200 amps is the right answer for most homes adding an EV charger, a heat pump, or an induction range, and it is what we install most often. But a 1,400 square foot home with gas heat and gas cooking may be perfectly served by 150 amps. We run the calculation and tell you which one your house actually needs.',
  },

  // Installations
  {
    id: 'f-50',
    category: 'Installations',
    sortOrder: 1,
    featured: true,
    question: 'Can I install an EV charger on my existing panel?',
    answer:
      'Often, yes. The question is not whether there is a spare slot — it is whether the service has capacity for a 40 to 60 amp continuous load on top of everything else. We measure your actual metered demand rather than assuming worst case, and real usage frequently comes in low enough that no upgrade is needed. When it does not, a load-management device is usually cheaper than a service upgrade.',
  },
  {
    id: 'f-51',
    category: 'Installations',
    sortOrder: 2,
    question: 'Why will my smart switch not turn on?',
    answer:
      'Almost always because there is no neutral conductor in the switch box. Homes wired before roughly 2011 frequently used a switch loop, which brings only the hot leg to the switch. The fixes are pulling a neutral to the box, using a no-neutral-rated device, or moving the smart control to the fixture. We check the boxes before you buy anything else.',
  },
  {
    id: 'f-52',
    category: 'Installations',
    sortOrder: 3,
    question: 'Can you put a ceiling fan where there is only a light?',
    answer:
      'Yes, and it usually does not require opening the ceiling. A standard light box is not rated to hold a moving load, so it gets replaced with a fan-rated brace box that installs through the existing opening and expands against the joists. Skipping that step is why fans come down.',
  },
  {
    id: 'f-53',
    category: 'Installations',
    sortOrder: 4,
    question: 'Why do my new LED lights flicker or buzz when dimmed?',
    answer:
      'Dimmer incompatibility, nearly every time. LED drivers need a dimmer designed for them, and each manufacturer publishes a compatibility list. The second most common cause is too little load on the dimmer — some need a minimum wattage that four LED bulbs do not reach. Both are fixable without changing the fixtures.',
  },
  {
    id: 'f-54',
    category: 'Installations',
    sortOrder: 5,
    question: 'Will you have to cut into my walls?',
    answer:
      'Sometimes, and we plan for it. We fish through attics, crawl spaces and baseboards wherever possible. When we do have to open drywall we cut clean, patch-ready rectangles rather than ragged holes, and on larger projects we include the drywall repair and texture in the price rather than leaving you to find a finisher.',
  },

  // Permits & Inspections
  {
    id: 'f-60',
    category: 'Permits & Inspections',
    sortOrder: 1,
    featured: true,
    question: 'Which jobs need a permit?',
    answer:
      'In the City of Austin: panel replacements, service upgrades, new circuits, rewires, EV chargers, generators, and any new construction or remodel wiring. Replacing an existing outlet, switch or fixture like-for-like does not. When a permit is required we file it, meet the inspector, and give you the closed permit.',
  },
  {
    id: 'f-61',
    category: 'Permits & Inspections',
    sortOrder: 2,
    question: 'Can I skip the permit to save money and time?',
    answer:
      'You can, and people do. It shows up later. Unpermitted electrical work surfaces in a title search or a buyer’s inspection, and it can delay or kill a sale. Insurers have also denied claims where a fire traced back to unpermitted work. The permit fee is a small part of the job cost, and we will not do permit-required work without one.',
  },
  {
    id: 'f-62',
    category: 'Permits & Inspections',
    sortOrder: 3,
    question: 'What happens if the inspection fails?',
    answer:
      'We correct it and re-inspect at our cost, not yours. That is what a licensed contractor’s responsibility means. In practice our first-visit pass rate is high because we build to the inspection rather than hoping.',
  },
  {
    id: 'f-63',
    category: 'Permits & Inspections',
    sortOrder: 4,
    question: 'How long does the permit process add to a project?',
    answer:
      'For a panel or EV charger, typically one to two weeks before we can start — the utility disconnect scheduling is usually the longest part. Larger projects with plan review take longer. We tell you the realistic date up front and we do not promise a start date before the permit is in hand.',
  },

  // Commercial Work
  {
    id: 'f-70',
    category: 'Commercial Work',
    sortOrder: 1,
    question: 'Do you work after hours so we do not have to close?',
    answer:
      'Yes. Most of our retail and restaurant work happens at night or before opening. After-hours labor is $225 per hour versus $145 during business hours, and for most businesses that difference is far smaller than a day of lost revenue.',
  },
  {
    id: 'f-71',
    category: 'Commercial Work',
    sortOrder: 2,
    question: 'Can you provide a certificate of insurance for our landlord?',
    answer:
      'Yes, and we issue it before work starts, naming the landlord or property manager as additional insured. We carry $2M general liability and full workers’ compensation. If your lease requires specific limits, send us the requirement and we will confirm we meet it before quoting.',
  },
  {
    id: 'f-72',
    category: 'Commercial Work',
    sortOrder: 3,
    question: 'Do you handle tenant finish-outs from drawings?',
    answer:
      'Yes — takeoff, proposal, permit, rough-in, trim and final inspection. The most useful thing you can do is bring us in before the drawings are finalized. Equipment schedules and panel locations are cheap to change on paper and expensive to change in a wall.',
  },
  {
    id: 'f-73',
    category: 'Commercial Work',
    sortOrder: 4,
    question: 'Do you offer maintenance agreements?',
    answer:
      'Yes, starting at $1,200 a year. That covers an annual thermal scan of all panels and distribution, torque checks on connections, emergency and exit lighting testing, and a written report. Insurers and franchisors increasingly ask for that documentation, and thermal scanning catches loose connections before they become an outage.',
  },

  // Warranty & Guarantees
  {
    id: 'f-80',
    category: 'Warranty & Guarantees',
    sortOrder: 1,
    featured: true,
    question: 'What does your warranty cover?',
    answer:
      'Eight years on workmanship, covering the labor on every repair and installation we do. Materials carry the manufacturer warranty, and we handle the claim on your behalf rather than handing you a phone number. If something we installed fails within the warranty period, we come back at no charge.',
  },
  {
    id: 'f-81',
    category: 'Warranty & Guarantees',
    sortOrder: 2,
    question: 'Is the warranty transferable if I sell the house?',
    answer:
      'Yes. The workmanship warranty follows the property, not the owner. Along with the closed permits, it is a useful thing to hand a buyer.',
  },
  {
    id: 'f-82',
    category: 'Warranty & Guarantees',
    sortOrder: 3,
    question: 'Are your electricians licensed and background-checked?',
    answer:
      'Every electrician is licensed by the State of Texas and works under our master electrician’s license, TECL 34291. All are W-2 employees — we do not subcontract residential work — and all are background-checked and drug-tested. You can verify any Texas license number at the TDLR website.',
  },
  {
    id: 'f-83',
    category: 'Warranty & Guarantees',
    sortOrder: 4,
    question: 'What if I am not satisfied with the work?',
    answer:
      'Call the office and ask for the owner. We would rather come back and fix something than have it sit. In eighteen years the number of jobs we could not put right has been very small, and it has never been because we argued about whether we should.',
  },
]
