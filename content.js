// All site copy lives here. build.js turns it into pages.

exports.software = [
  'ServiceTitan', 'Housecall Pro', 'Jobber', 'FieldEdge', 'Service Fusion', 'Successware',
  'GoHighLevel', 'Podium', 'QuickBooks', 'Google Business Profile', 'Google LSA', 'Angi',
];

exports.stats = [
  { big: '27%', text: 'of calls to HVAC businesses go unanswered. More than one in four.',
    cite: 'WhatConverts, citing WebFX HVAC benchmarks (2026)',
    href: 'https://www.whatconverts.com/blog/why-hvacs-27-missed-call-rate-is-a-bigger-problem-than-high-cpcs/' },
  { big: '7×', text: 'more likely to qualify a lead when you reach it within the hour, versus even an hour later.',
    cite: 'Harvard Business Review, “The Short Life of Online Sales Leads” (2011)',
    href: 'https://hbr.org/2011/03/the-short-life-of-online-sales-leads' },
  { big: '$153', text: 'average cost of a single HVAC lead. Every missed call throws one away.',
    cite: 'WhatConverts, citing WebFX (2026)',
    href: 'https://www.whatconverts.com/blog/why-hvacs-27-missed-call-rate-is-a-bigger-problem-than-high-cpcs/' },
];

exports.pains = [
  'Your tech is on a roof. The phone rings. It goes to voicemail.',
  'The homeowner calls the next company on Google. They pick up.',
  'A web form lands Friday night. Nobody sees it until Monday.',
  'A $14,000 replacement quote goes out. Nobody follows up.',
  'Maintenance agreements lapse because nobody called to renew.',
  'Your software stores every job. It doesn’t act on any of them.',
];

exports.homeFaq = [
  ['What does SetPoint Labs do?',
   'We build and run the front office and follow-up system for residential HVAC companies: an AI receptionist that answers every call and text in seconds, agents that chase estimates, tune-ups and renewals, and one dashboard with every number that matters. It all runs on the software you already use.'],
  ['Will this work with ServiceTitan, Housecall Pro or Jobber?',
   'Yes. We build on top of ServiceTitan, Housecall Pro, Jobber, FieldEdge, Service Fusion, Successware and more. On the first call we confirm exactly what connects to your setup, and put it in writing.'],
  ['Will this replace my CSRs or dispatcher?',
   'No. It takes the overflow, the after-hours calls and the follow-up nobody has time for. Anything that needs a person goes to your team with the full context, so they never start a call cold.'],
  ['What happens with emergency calls?',
   'You set the rules. No heat with a newborn at home, water coming through the ceiling, a burning smell: the agent flags it, follows your emergency script and transfers to your on-call tech. If a caller reports a gas smell, it tells them to leave the house and call the gas company or 911 first.'],
  ['Will customers know they’re talking to AI?',
   'The voice is natural and trained on your services, pricing rules and service area. We recommend introducing it as a virtual assistant. Most callers just care that someone picked up and got them on the schedule.'],
  ['How is it priced?',
   'One build fee, scoped in writing before we start. After 90 days, optional month-to-month maintenance. No annual contract, no per-seat software fees.'],
  ['How fast can it go live?',
   '30 to 45 days from kickoff for the full system. The receptionist alone can be answering your calls in about two weeks.'],
  ['Who owns what you build?',
   'You do. Once the build fee is paid, the call flows, scripts, automations, dashboard and data are yours.'],
];

exports.process = [
  { kick: '01 Discover', h: 'First, we listen.', items: [
    ['The leak audit', 'Missed calls, slow leads, unsold estimates, lapsed agreements. Counted.'],
    ['Scope and price, in writing', 'You know what you’re buying before you pay a dollar.'],
    ['The order that pays back first', 'We start where the money is leaking fastest.'] ] },
  { kick: '02 Build', h: 'Then we build.', items: [
    ['Wired to your software and your phones', 'Your field service software, your numbers, your calendar.'],
    ['Agents written for your shop', 'Your services, your service area, your pricing rules, your voice.'],
    ['The dashboard, live', 'Every number on one page before launch day.'] ] },
  { kick: '03 Go live', h: 'Your shop goes live.', items: [
    ['One afternoon of training', 'Your CSRs and dispatch see exactly what hands off to them.'],
    ['The first booking, on its own', 'A real customer, booked to your board, while you watch.'],
    ['Numbers from day one', 'Answer rate, booked jobs and revenue, live.'] ] },
  { kick: '04 Compound', h: 'Then it compounds.', items: [
    ['Weekly tuning', 'We listen to calls and tighten scripts every week.'],
    ['Results in 90 days, or free until you get them', 'Written targets. We keep working until we hit them.'],
    ['The rest of the system, whenever you want it', 'Add solutions one at a time, on the same record.'] ] },
];

// The ten solutions + the featured one.
exports.featured = {
  slug: 'run-the-whole-shop', icon: 'grid', title: 'Run the whole shop', sub: 'everything together',
  card: 'All ten solutions on one customer record, tuned every week. The way we recommend running it.',
  h1: 'Run the whole shop. On one system.',
  lede: 'Every call answered, every lead chased, every estimate followed up, every agreement renewed and every number on one page. All ten solutions, sharing one record, tuned weekly.',
  leakH: 'Ten tools that don’t talk to each other is the leak.',
  leak: ['Most shops buy an answering service, a texting tool, a review app and an SEO agency. None of them share a customer record, so the homeowner who called Tuesday gets a “we miss you” text Wednesday.', 'The whole system runs on one record. Every agent knows what the others did, and your dashboard shows all of it.'],
  build: ['AI receptionist on every line, 24/7', 'Speed-to-lead on every web, Google and Angi lead', 'Eight follow-up agents: estimates, tune-ups, renewals, no-shows, win-back, replacement timing, reviews, routing', 'Local SEO and service-area pages', 'One live dashboard plus Slack or text reports', 'Weekly tuning and a written 90-day target'],
  steps: [['We map the whole shop', 'Every way a customer reaches you, and every place they fall out.'], ['We build in the order that pays', 'Calls first, then leads, then follow-up, then growth.'], ['We tune it every week', 'Listening to calls, tightening scripts, moving the numbers.']],
  faq: [['Do I have to buy all ten?', 'No. Every solution stands alone. The whole system is what we recommend, because each piece makes the others better.'], ['How long does the full build take?', '30 to 45 days from kickoff, live in stages so the receptionist is answering calls first.']],
};

exports.solutions = [
  { slug: 'answer-every-call', icon: 'phone', title: 'Answer every call',
    card: 'Calls, texts and web chats answered in seconds, 24/7, and booked straight to your board.',
    h1: 'Answer every call. Even the ones at 2 a.m.',
    lede: 'An AI receptionist trained on your shop picks up in seconds, qualifies the job, books it to your board and texts the confirmation. Day, night, weekends and the hottest day of the year.',
    leakH: 'Voicemail is where HVAC jobs go to die.',
    leak: ['More than one in four calls to HVAC businesses never gets answered. The homeowner with a dead AC doesn’t leave a message. They call the next company on Google.', 'Your CSRs can’t be on every line at 8 a.m. on a Monday in July. Nobody can be on the phone at 11 p.m. on a Saturday. The receptionist can.'],
    build: ['A voice agent trained on your services, service area, hours and pricing rules', 'Booking straight into ServiceTitan, Housecall Pro, Jobber or your calendar', 'Emergency rules you set: on-call transfer, after-hours fees, safety scripts', 'Text-back on every missed or abandoned call within seconds', 'Every call recorded, transcribed and summarized for your team'],
    steps: [['We learn your shop', 'Services, zip codes, hours, fees, how you want the phone answered.'], ['We wire it to your number', 'Forward or port your existing number. Customers call the number they know.'], ['It answers, books and hands off', 'Booked jobs land on your board. Anything human goes to your team.']],
    faq: [['Do I need new phones?', 'No. We forward your existing number or port it. Your customers keep calling the number on your trucks.'], ['Can it take a call when my team is busy?', 'Yes. Set it to answer only after-hours, only overflow, or every call. You can change that any day.']] },

  { slug: 'fill-the-schedule', icon: 'calendar', title: 'Fill the schedule',
    card: 'Web, Google and Angi leads called back in under a minute. Cancellations refilled the same day.',
    h1: 'Fill the schedule. Before the competition calls back.',
    lede: 'Every web form, Google LSA lead, Angi lead and Facebook lead gets a call and a text within a minute, gets qualified, and gets booked. Cancellations and no-shows get refilled from your waitlist the same day.',
    leakH: 'You paid for the lead. Then you let it go cold.',
    leak: ['Firms that reach a lead within the hour are about seven times more likely to qualify it than firms that wait even one hour longer. Most shops take a day.', 'Meanwhile a cancelled 9 a.m. becomes an empty truck, because nobody had time to call the next customer.'],
    build: ['Speed-to-lead: call plus text in under 60 seconds, 24/7', 'Qualifying questions: system type, age, symptoms, address in service area', 'Lead sources wired in: website, Google LSA, Angi, Thumbtack, Facebook', 'Cancellation and no-show refill from a live waitlist', 'Reminder and on-my-way texts that cut no-shows'],
    steps: [['We connect every lead source', 'One inbox for every form, ad and marketplace lead.'], ['The agent reaches out instantly', 'Call first, text second, until the lead answers or opts out.'], ['Booked, or handed to your team', 'Ready jobs go on the board. Big replacements go to your comfort advisor.']],
    faq: [['What if a lead doesn’t answer?', 'The agent follows a cadence you approve: call, text, call again, then a final check-in. It stops the moment they reply or opt out.'], ['Does it work for replacement leads?', 'Yes. It books the in-home estimate and sends your comfort advisor the notes before the visit.']] },

  { slug: 'sell-more-memberships', icon: 'shield', title: 'Sell more memberships',
    card: 'Maintenance agreements offered on every call and renewed before they lapse.',
    h1: 'Sell more memberships. Keep every one you sell.',
    lede: 'Maintenance agreements are the steadiest revenue in HVAC. We make sure every customer hears the offer, every member gets their visits, and every renewal gets handled before it lapses.',
    leakH: 'Agreements don’t cancel. They quietly expire.',
    leak: ['Most lapsed members never decided to leave. Nobody called to schedule their visit, and nobody asked them to renew.', 'Every lapsed agreement is a customer who now has no reason to call you first when the system breaks.'],
    build: ['Membership offer built into every booked call and confirmation text', 'Visit scheduling for members, spring and fall, automatically', 'Renewal reminders 60, 30 and 7 days out, with one-tap renew', 'Win-back for members who lapsed in the last 24 months', 'Membership count and churn on your dashboard'],
    steps: [['We pull your member list', 'Active, expiring and lapsed, straight from your software.'], ['We schedule and remind', 'Visits booked, renewals offered, at the right moment.'], ['We report what renewed', 'Members, churn and agreement revenue, weekly.']],
    faq: [['Can it sell the agreement on the phone?', 'It can explain your plan, answer common questions and send a sign-up link. Your tech can close it on-site with the customer already warmed up.'], ['Does it work with my agreement setup?', 'Yes. We read your existing plans and terms; we don’t change your pricing.']] },

  { slug: 'know-your-numbers', icon: 'chart', title: 'Know your numbers',
    card: 'Revenue, average ticket, close rate and tech rankings, live, and in Slack or text.',
    h1: 'Know your numbers. Every morning, on one page.',
    lede: 'Booked revenue, average ticket, close rate, calls answered, members, tech rankings. One live dashboard, plus a morning report in Slack or a text. No spreadsheets, no exporting.',
    leakH: 'You can’t fix what you see a month late.',
    leak: ['Most owners find out about a bad month when the bank account tells them. By then the jobs are gone.', 'The numbers already exist in your software. They just aren’t on one page, and nobody looks until it’s too late.'],
    build: ['A live dashboard: money, front desk, customers, techs, job mix, marketing', 'Daily and weekly reports by Slack or text', 'Slack commands: /report, /revenue, /techs, /pipeline', 'Tech leaderboards: close rate, average ticket, memberships sold', 'Alerts when something slips: missed calls, a slow day ahead, a stuck estimate'],
    steps: [['We connect your sources', 'Field service software, phones, ads and reviews.'], ['We build your one page', 'The numbers you actually run the shop on, nothing else.'], ['It reports itself', 'Every morning, in the channel you already check.']],
    faq: [['Do I need to buy a BI tool?', 'No. The dashboard is included in the build.'], ['Can my managers see it?', 'Yes. Give each person the view they need: owner, GM, dispatch or techs.']] },

  { slug: 'close-more-estimates', icon: 'file', title: 'Close more estimates',
    card: 'Every unsold estimate and replacement quote followed up until it’s a yes or a no.',
    h1: 'Close more estimates. Without nagging anyone.',
    lede: 'Unsold estimates are the biggest pile of money sitting in your software. An agent follows up every one, answers the common questions, offers financing and gets the yes back to your comfort advisor.',
    leakH: 'The quote went out. Then nobody called.',
    leak: ['A replacement quote is a five-figure decision. Homeowners shop it, sleep on it, and then pick whoever followed up.', 'Your comfort advisors are busy running new appointments, so last week’s quotes go quiet.'],
    build: ['Follow-up cadence on every open estimate: day 1, 3, 7, 14, 30', 'Answers to the usual questions: warranty, financing, timing, rebates', 'Financing link and options sent at the right moment', 'Hot replies routed to your comfort advisor with the full thread', 'Estimate pipeline and close rate on your dashboard'],
    steps: [['We pull every open estimate', 'Repair and replacement, by advisor and age.'], ['The agent follows up', 'By text and email, in your voice, on your cadence.'], ['Your advisor closes', 'Warm replies land with the advisor who wrote the quote.']],
    faq: [['Will it pressure my customers?', 'No. You approve every message. It’s helpful, short, and stops the moment someone says no.'], ['Can it handle rebate questions?', 'It answers from the rebate and financing details you give us, and hands anything unusual to your team.']] },

  { slug: 'time-the-tune-ups', icon: 'thermo', title: 'Time the tune-ups',
    card: 'Spring AC and fall furnace tune-ups booked before the rush, timed to each system.',
    h1: 'Time the tune-ups. Fill the shoulder season.',
    lede: 'Spring AC checks and fall furnace tune-ups, booked in the weeks you need work, based on each customer’s equipment, last visit and agreement. Your slow months stop being slow.',
    leakH: 'The shoulder season is empty because nobody booked it.',
    leak: ['Every shop knows the dead weeks between seasons. They’re dead because tune-ups get booked when the customer remembers, not when you have trucks free.', 'Your software knows every system’s age and last service date. Nobody is using it to fill the calendar.'],
    build: ['Seasonal campaigns: pre-summer AC, pre-winter heat, timed to your calendar', 'Targeting by equipment age, last visit and membership', 'Capacity-aware booking that fills the weeks you choose', 'Reminder, confirmation and on-my-way texts', 'Repair and replacement opportunities flagged from tune-up notes'],
    steps: [['We read your equipment data', 'System type, age, last service, membership.'], ['We pick the weeks', 'You tell us where the calendar is thin. We aim there.'], ['Customers book themselves', 'By text, in a few taps, into the slots you open.']],
    faq: [['Does it work if my data is messy?', 'Yes. We clean what we can and fill gaps on the first tune-up visit.'], ['Can I limit how many it books per day?', 'Yes. Set daily caps per tech or per zone.']] },

  { slug: 'win-the-heat-wave', icon: 'sun', title: 'Win the heat wave',
    card: 'Surge mode for 100° days: triage, emergency routing, overflow booked, nobody on hold.',
    h1: 'Win the heat wave. While everyone else is on hold.',
    lede: 'When the temperature spikes, call volume triples. Surge mode answers every call at once, triages by urgency, books the overflow into the next open slots and keeps every customer updated, so nobody calls a competitor while they wait.',
    leakH: 'Your best week is also your most leaky.',
    leak: ['The first 100-degree week of summer is when the most money calls you, and when the most calls go unanswered.', 'Homeowners don’t wait on hold with a dead AC. They hang up and dial the next number.'],
    build: ['Unlimited simultaneous calls, no hold queue', 'Triage rules: elderly, infants, medical needs, no AC versus weak AC', 'Overflow booking into the next open slots, with honest arrival windows', 'Proactive updates by text if the schedule slips', 'Weather-triggered surge mode, on automatically'],
    steps: [['We write your triage rules', 'Who goes first, who gets a call-back, what to promise.'], ['Surge mode switches on', 'Triggered by call volume or the forecast.'], ['Every caller gets a time', 'Booked, updated and kept, even on your busiest day.']],
    faq: [['Will it over-book my techs?', 'No. It books against real capacity and offers the next honest window.'], ['Can it charge a priority fee?', 'Yes, if you charge one. It quotes it exactly as you set it.']] },

  { slug: 'bring-customers-back', icon: 'refresh', title: 'Bring customers back',
    card: 'Dormant customers won back and aging systems flagged for replacement at the right time.',
    h1: 'Bring customers back. Before their system dies.',
    lede: 'Your past customers are your cheapest jobs. We win back the ones who drifted, and reach out to owners of 12-plus-year-old systems before the breakdown, so the replacement comes to you, not the lowest bidder.',
    leakH: 'You already paid to get these customers.',
    leak: ['Every customer in your software cost you a lead to get. Most haven’t heard from you since their last invoice.', 'When their 15-year-old system finally fails, they’ll search Google, not their junk drawer for your magnet.'],
    build: ['Dormant win-back for customers with no visit in 18+ months', 'Replacement-timing outreach by equipment age and repair history', 'Seasonal check-ins that don’t read like spam', 'Rebate and financing updates when they change', 'Reactivated customers and revenue on your dashboard'],
    steps: [['We segment your customer list', 'Dormant, aging equipment, repeat repairs, members.'], ['We reach out at the right time', 'Short, useful, in your voice, by text and email.'], ['Replies become booked jobs', 'Straight to the board, or to your comfort advisor.']],
    faq: [['Is this allowed by text?', 'We only text customers with consent on file and honor STOP instantly. Everything runs from your registered business number.'], ['How far back can it go?', 'As far as your software does. Most shops start with the last five years.']] },

  { slug: 'get-found-first', icon: 'search', title: 'Get found first',
    card: 'Local SEO, Google Business Profile, LSAs, and service and city pages that rank.',
    h1: 'Get found first. When the AC dies, they search.',
    lede: 'Homeowners don’t shop HVAC until they need it, and then they search “AC repair near me.” We get you into the map pack, sharpen your Google Business Profile and LSAs, and build the service and city pages that rank.',
    leakH: 'If you’re not in the top three, you’re not in the race.',
    leak: ['Most emergency HVAC calls come from people who searched minutes earlier and called whoever showed up first.', 'A thin Google profile and a five-page website hand those calls to the shop down the road.'],
    build: ['Google Business Profile tuned: categories, services, photos, posts, Q&A', 'Local Services Ads setup and lead disputes', 'Service pages: AC repair, furnace repair, heat pumps, IAQ, replacement', 'City and neighborhood pages for every area you serve', 'Rank tracking for your money keywords on the dashboard'],
    steps: [['We audit how you show up', 'Map pack, LSAs, organic, reviews, against your top competitors.'], ['We fix and build', 'Profile, pages and citations, in the order that moves rank fastest.'], ['We track the calls it brings', 'Every ranking tied to the calls and jobs it produced.']],
    faq: [['Do I need a new website?', 'Not always. We can build pages on your current site, or rebuild it if it’s holding you back.'], ['How long does SEO take?', 'Profile and LSA fixes can move in weeks; new pages usually take a few months to rank.']] },

  { slug: 'get-more-reviews', icon: 'star', title: 'Get more reviews',
    card: 'A review request after every job, routed so happy customers post and unhappy ones reach you.',
    h1: 'Get more reviews. From every happy customer.',
    lede: 'Every completed job triggers a short, personal review request with your tech’s name in it. Happy customers land on Google in one tap. Unhappy ones reach you first, so you can make it right.',
    leakH: 'Your happiest customers never get asked.',
    leak: ['Techs forget to ask. Office staff forget to send. So your review count grows slower than the shop down the street with worse service.', 'Reviews are one of the biggest factors in who shows up in the map pack, and who gets the call.'],
    build: ['Review request by text after every completed job', 'Tech name and job details in the message, so it feels personal', 'Unhappy feedback routed to you privately first', 'Replies drafted for every new Google review', 'Review count, rating and tech leaderboard on the dashboard'],
    steps: [['We connect job completion', 'Your software tells us when the tech closes the job.'], ['The request goes out', 'Within the hour, while the cool air is still blowing.'], ['You see every result', 'New reviews, ratings and who earned them.']],
    faq: [['Is review gating allowed?', 'We never filter who can post to Google. Every customer gets the link; unhappy ones also get a direct line to you.'], ['Can techs see their reviews?', 'Yes. A leaderboard keeps it friendly and visible.']] },
];

exports.system = {
  journey: [
    ['Capture', 'Every call, form, LSA lead, text and chat lands in one place.'],
    ['Answer', 'In seconds, 24/7, in your shop’s voice.'],
    ['Qualify', 'System, age, symptoms, address, membership. Before a truck rolls.'],
    ['Book', 'Right slot, right tech, straight onto your board.'],
    ['Prep', 'Confirmation, reminder and on-my-way texts.'],
    ['Recover', 'No-shows, cancellations and unsold estimates, chased.'],
    ['Return', 'Tune-ups, renewals, replacement timing and reviews.'],
  ],
  services: [
    ['phone', 'AI receptionist', 'Answers every call in seconds, books to your board, transfers emergencies to on-call, texts back every missed call.'],
    ['bolt', 'Speed-to-lead and texting', 'Every web, LSA and marketplace lead called and texted in under a minute, from your registered business number.'],
    ['refresh', 'Follow-up agents', 'Eight agents that chase estimates, tune-ups, renewals, no-shows and dormant customers, in your voice.'],
    ['search', 'Website, pages and local SEO', 'Service and city pages, Google Business Profile and LSAs, tuned to get you into the map pack.'],
    ['chart', 'Reporting in Slack', 'One live dashboard, plus /report, /revenue, /techs and /pipeline in the channel you already check.'],
    ['lock', 'Your data, your rules', 'Encrypted, access-logged, never used to train outside models. Call recording follows your state’s consent rules.'],
  ],
  agents: [
    ['Estimate follow-up', 'Chases every open repair and replacement quote until it’s a yes or a no.'],
    ['Tune-up scheduler', 'Books spring and fall visits into the weeks you need work.'],
    ['Membership renewal', 'Renews agreements before they lapse, and wins back the ones that did.'],
    ['No-show recovery', 'Reaches missed appointments within 15 minutes and rebooks them.'],
    ['Dormant win-back', 'Re-engages customers with no visit in 18+ months.'],
    ['Replacement timing', 'Reaches owners of aging, repeat-repair systems before the breakdown.'],
    ['Review requester', 'Asks every happy customer, routes unhappy ones to you.'],
    ['Router', 'Sends anything that needs a human to the right person, with context.'],
  ],
  roles: [
    ['Owner', ['Every number on one page', 'Steadier shoulder seasons', 'A system that runs without you on the phone']],
    ['CSRs and dispatch', ['No hold queue in a heat wave', 'Every call pre-qualified', 'Less chasing, more booking']],
    ['Techs', ['Fuller, tighter routes', 'Customers prepped before arrival', 'Reviews with their name on them']],
    ['The business', ['Higher booked-call rate', 'More members, fewer lapses', 'More replacements from your own list']],
  ],
  faq: [
    ['How fast can it go live?', '30 to 45 days for the whole system. The receptionist can be answering calls in about two weeks.'],
    ['Do I need new phones or software?', 'No. We forward or port your existing number and build on the field service software you already run.'],
    ['What about after-hours and emergency calls?', 'You set the rules: what counts as an emergency, who’s on call, what fee to quote. The agent follows them every time, and sends anyone reporting a gas smell to the gas company or 911 first.'],
    ['Who owns the system?', 'You do, once the build fee is paid. Scripts, automations, dashboard and data.'],
  ],
};
