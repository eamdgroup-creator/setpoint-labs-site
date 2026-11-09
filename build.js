#!/usr/bin/env node
// SetPoint Labs static site builder. No dependencies: `node build.js` → ./dist
const fs = require('fs');
const path = require('path');
const C = require('./site.config.js');
const K = require('./content.js');

const OUT = path.join(__dirname, 'dist');
const YEAR = new Date().getFullYear();
const BASE = C.siteUrl.replace(/\/$/, '');
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const telHref = (p) => 'tel:+1' + String(p).replace(/\D/g, '').replace(/^1/, '');
const ALL = [K.featured, ...K.solutions];

// ── Icons ────────────────────────────────────────────────────
const P = {
  phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M16 3v4M8 3v4M3 10h18M8 14h3M8 17h6"/>',
  shield: '<path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6z"/><path d="m9 12 2 2 4-4"/>',
  chart: '<path d="M3 3v18h18"/><path d="m7 15 4-4 3 3 5-6"/>',
  file: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 14l2 2 4-4"/>',
  thermo: '<path d="M14 14.8V5a2 2 0 0 0-4 0v9.8a4 4 0 1 0 4 0z"/><path d="M12 9v7"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  refresh: '<path d="M21 12a9 9 0 0 1-15.5 6.2L3 16M3 12a9 9 0 0 1 15.5-6.2L21 8"/><path d="M21 3v5h-5M3 21v-5h5"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
  star: '<path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1 6.2L12 17.3 6.5 20.2l1-6.2L3 9.6l6.2-.9z"/>',
  grid: '<rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/>',
  bolt: '<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
  lock: '<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
  check: '<path d="m5 12 5 5L20 7"/>',
  tick: '<circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  chev: '<path d="m6 9 6 6 6-6"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
};
const ico = (n, cls = '') => `<svg${cls ? ` class="${cls}"` : ''} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[n]}</svg>`;
const ARROW = ico('arrow');
const logoMark = `<svg viewBox="0 0 32 32" aria-hidden="true"><defs><linearGradient id="lg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0CC481"/><stop offset="1" stop-color="#14FFB0"/></linearGradient></defs><rect width="32" height="32" rx="9" fill="url(#lg)"/><circle cx="16" cy="16" r="8.5" fill="none" stroke="#06130D" stroke-width="2.4" stroke-dasharray="40 13.4" stroke-linecap="round" transform="rotate(115 16 16)"/><path d="M16 16 21.2 10.8" stroke="#06130D" stroke-width="2.4" stroke-linecap="round"/><circle cx="16" cy="16" r="2.7" fill="#06130D"/></svg>`;

// ── Shared pieces ────────────────────────────────────────────
const bookBtn = (label = 'Book a call', cls = '') => `<a class="btn ${cls}" href="/book/">${label} ${ARROW}</a>`;

const header = () => `
<a class="skip" href="#main">Skip to content</a>
<header class="hdr">
  <nav class="nav" aria-label="Main">
    <a class="logo" href="/" aria-label="${esc(C.brand)} home">${logoMark}<span>${esc(C.brand)}</span></a>
    <ul class="nav-links">
      <li>
        <button type="button" data-dd-btn aria-expanded="false" aria-controls="dd-solutions">Solutions ${ico('chev', 'chev')}</button>
        <div class="dd" id="dd-solutions" data-dd>
          ${K.solutions.map(s => `<a href="/solutions/${s.slug}/"><span class="ico">${ico(s.icon)}</span><span><b>${esc(s.title)}</b><span>${esc(s.card.split('.')[0])}.</span></span></a>`).join('')}
          <a class="dd-all" href="/solutions/">All ten solutions ${ARROW}</a>
        </div>
      </li>
      <li><a href="/system/">The whole system</a></li>
      <li><a href="/tools/">Calculator</a></li>
      <li><a href="/about/">About</a></li>
    </ul>
    ${C.phone ? `<a class="nav-tel" href="${telHref(C.phone)}">${esc(C.phone)}</a>` : ''}
    <a class="btn btn-sm" href="/book/">Book a call</a>
    <button class="menu-btn" type="button" data-menu-btn aria-expanded="false" aria-controls="mnav"><i></i><span>MENU</span></button>
  </nav>
  <div class="mnav" id="mnav" data-mnav>
    <div class="mnav-h">Solutions</div>
    <a href="/solutions/run-the-whole-shop/">Run the whole shop</a>
    ${K.solutions.map(s => `<a href="/solutions/${s.slug}/">${esc(s.title)}</a>`).join('')}
    <div class="mnav-h">Company</div>
    <a href="/system/">The whole system</a>
    <a href="/tools/">Missed-call calculator</a>
    <a href="/about/">About</a>
    ${C.phone ? `<a href="${telHref(C.phone)}">Call ${esc(C.phone)}</a>` : ''}
    <a class="btn" href="/book/">Book a call ${ARROW}</a>
  </div>
</header>`;

const footer = () => `
<footer class="ftr">
  <div class="wrap">
    <div class="ftr-top">
      <div>
        <a class="logo" href="/">${logoMark}<span>${esc(C.brand)}</span></a>
        <p>The RevOps and strategy partner for residential HVAC companies. We answer every call, chase every lead and put every number on one page, on the software you already run.</p>
        <a class="link-arrow" href="/about/" style="color:var(--green-2)">About us ${ARROW}</a>
      </div>
      <div><h4>Solutions</h4><ul>${ALL.map(s => `<li><a href="/solutions/${s.slug}/">${esc(s.title)}</a></li>`).join('')}</ul></div>
      <div><h4>Also</h4><ul>
        <li><a href="/system/">The whole system</a></li>
        <li><a href="/solutions/">All solutions</a></li>
        <li><a href="/system/#software">The software we run on</a></li>
        <li><a href="/tools/">Missed-call calculator</a></li>
        <li><a href="/book/">Book a call</a></li>
      </ul></div>
      <div><h4>Company</h4><ul>
        <li><a href="/about/">About</a></li>
        ${C.city ? `<li><span style="font-size:14.5px">${esc(C.city)}</span></li>` : ''}
        <li><a href="/book/">Book a call</a></li>
        ${C.email ? `<li><a href="mailto:${esc(C.email)}">${esc(C.email)}</a></li>` : ''}
        ${C.phone ? `<li><a href="${telHref(C.phone)}">${esc(C.phone)}</a></li>` : ''}
      </ul></div>
      <div><h4>Legal</h4><ul>
        <li><a href="/terms/">Terms of service</a></li>
        <li><a href="/privacy-policy/">Privacy policy</a></li>
        <li><a href="/privacy-policy/#choices">Privacy choices</a></li>
        <li><a href="/llms.txt">llms.txt</a></li>
        <li><a href="/sitemap.xml">Sitemap</a></li>
      </ul></div>
    </div>
    <div class="ftr-legal">
      <p>Every engagement is scoped in a written agreement. Nothing on this site is an offer or a contract.</p>
      <p>Industry statistics come from the third-party sources cited next to them. Results vary by shop, and no outcome is promised outside a signed agreement. Dashboard figures shown are a format example.</p>
      <p>ServiceTitan, Housecall Pro, Jobber, FieldEdge and other product names are trademarks of their owners, used only to describe compatibility. No endorsement is implied.</p>
      <p>Customer data we handle for HVAC companies is covered by a written data agreement and encrypted in transit and at rest. ${esc(C.brand)} is not an HVAC contractor and does not perform HVAC work.</p>
      <div class="ftr-bottom"><span>© ${YEAR} ${esc(C.legalName)}${C.city ? ` · ${esc(C.city)}` : ''}</span><span>Built for the trades.</span></div>
    </div>
  </div>
</footer>`;

const ctaBlock = (h = 'Bring the system into your shop.') => `
  <div class="wrap">
    <div class="cta rv" id="book">
      <div class="cta-grid">
        <div>
          <div class="eyebrow">Book a call</div>
          <h2>${h}</h2>
          <p>Thirty minutes. We’ll show you where calls and jobs are leaking, what we’d build first, and what it would cost.</p>
          <div class="btn-row">${bookBtn()}${C.phone ? `<a class="btn btn-ghost" href="${telHref(C.phone)}">Call ${esc(C.phone)}</a>` : `<a class="btn btn-ghost" href="/tools/">Run the calculator</a>`}</div>
        </div>
        <div class="cta-side">
          <div class="cta-box"><b>No card, no contract</b><span>Pick a time and you’ll get a calendar invite and a video link. That’s it.</span></div>
          ${C.email ? `<div class="cta-box"><b>Prefer email?</b><a href="mailto:${esc(C.email)}">${esc(C.email)}</a></div>` : `<div class="cta-box"><b>Not ready for a call?</b><a href="/tools/">See what missed calls cost your shop →</a></div>`}
        </div>
      </div>
    </div>
  </div>`;

const closeSection = (lines) => `
<section class="close t-grey">
  ${lines ? `<div class="wrap rv"><p class="close-line">${lines[0]}</p><p class="close-line mute">${lines[1]}</p></div>` : ''}
  ${ctaBlock()}
</section>`;

const faqList = (items) => `<div class="faq">${items.map(([q, a], i) => `<details${i === 0 ? ' open' : ''}><summary>${esc(q)}<i aria-hidden="true"></i></summary><div class="ans"><p>${esc(a)}</p></div></details>`).join('')}</div>`;
const faqSchema = (items) => ({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: items.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) });
const crumbsSchema = (trail) => ({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: trail.map(([name, url], i) => ({ '@type': 'ListItem', position: i + 1, name, item: BASE + url })) });
const crumbs = (trail) => `<nav class="crumbs" aria-label="Breadcrumb">${trail.map(([n, u], i) => i < trail.length - 1 ? `<a href="${u}">${esc(n)}</a><span aria-hidden="true">/</span>` : `<span aria-current="page">${esc(n)}</span>`).join('')}</nav>`;
const card = (s) => `<a class="card rv" href="/solutions/${s.slug}/"><span class="ico">${ico(s.icon)}</span><h3>${esc(s.title)}</h3><p>${esc(s.card)}</p><span class="link-arrow">See the solution ${ARROW}</span></a>`;
const ticks = (items) => `<ul class="ticks">${items.map(t => `<li>${ico('tick')}<span>${esc(t)}</span></li>`).join('')}</ul>`;

const org = {
  '@context': 'https://schema.org', '@type': 'Organization', name: C.brand, url: BASE + '/',
  logo: BASE + '/assets/favicon.svg',
  description: 'The RevOps and strategy partner for residential HVAC companies: AI receptionist, speed-to-lead, follow-up agents and one dashboard, on the software you already run.',
  ...(C.email || C.phone ? { contactPoint: { '@type': 'ContactPoint', contactType: 'sales', ...(C.phone ? { telephone: C.phone } : {}), ...(C.email ? { email: C.email } : {}) } } : {}),
};

// ── Page shell ───────────────────────────────────────────────
function page({ route, title, desc, body, schema = [] }) {
  const url = BASE + route;
  const runtime = { formEndpoint: C.formEndpoint, email: C.email, phone: C.phone, calendarUrl: C.calendarUrl };
  return `<!doctype html>
<html lang="en" class="no-js">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${url}">
<meta name="theme-color" content="#F3F8F5">
<meta name="color-scheme" content="light">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(C.brand)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${url}">
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(desc)}">
<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&family=Figtree:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap">
<link rel="stylesheet" href="/assets/site.css?v=${Date.now().toString(36)}">
<script>window.SITE=${JSON.stringify(runtime)};</script>
${[org, ...schema].map(s => `<script type="application/ld+json">${JSON.stringify(s)}</script>`).join('\n')}
</head>
<body>
${header()}
<main id="main">
${body}
</main>
${footer()}
<script src="/assets/app.js?v=${Date.now().toString(36)}" defer></script>
</body>
</html>`;
}

// ── Homepage ─────────────────────────────────────────────────
function home() {
  const waves = Array.from({ length: 46 }, (_, i) => `<i style="animation-delay:${((i * 37) % 23) / 20}s;animation-duration:${0.7 + ((i * 13) % 9) / 10}s"></i>`).join('');
  const body = `
<section class="hero" id="top">
  <div class="wrap">
    <div class="hero-grid">
      <div>
        <h1 class="rv">We grow HVAC companies <span class="grad-text">better than anyone.</span></h1>
        <p class="lede rv">You focus on keeping homes comfortable. We make everything behind it run just as well: every call answered in seconds, the board full in shoulder season, maintenance plans renewed, every number on one page. All on the software you already run.</p>
        <div class="btn-row rv">${bookBtn()}<a class="btn btn-ghost" href="/system/">See the whole system</a></div>
        <p class="runs rv">Runs on top of <b>ServiceTitan</b>, <b>Housecall Pro</b>, <b>Jobber</b>, <b>FieldEdge</b>, <b>Service Fusion</b>, <b>Successware</b>, <b>GoHighLevel</b> and <b>Podium</b>. No new software for your team.</p>
      </div>
      <div class="hero-vis rv">
        <div class="chip c1">${ico('phone')}Answered in 2 seconds</div>
        <div class="call" role="img" aria-label="Demo: an AI receptionist answers an HVAC call and books an AC repair for today between 4 and 6 PM">
          <div class="call-top"><span class="live">Live call</span><span>Inbound · 2:47 PM</span><span class="temp">96°F outside</span></div>
          <div class="wave" aria-hidden="true">${waves}</div>
          <div class="tx" data-tx aria-hidden="true">
            <div class="msg ai"><small>AI receptionist</small>Thanks for calling Comfort Pros, this is Ava. What’s going on with your system?</div>
            <div class="msg caller"><small>Homeowner</small>AC’s blowing warm air and it’s 84 inside.</div>
            <div class="msg ai"><small>AI receptionist</small>That’s miserable in this heat. I have a tech free today between 4 and 6. Want me to lock that in?</div>
            <div class="msg caller"><small>Homeowner</small>Yes, please.</div>
          </div>
          <div class="booked" data-booked aria-hidden="true"><span class="ck">${ico('check')}</span><div><b>Booked: AC repair, today 4–6 PM</b><span>On your board · confirmation texted</span></div></div>
          <span class="demo-tag">Demo call</span>
        </div>
        <div class="chip c2">${ico('calendar')}Booked to your dispatch board</div>
      </div>
    </div>
    <p class="hero-note rv">A small start fee. Then results in 90 days, or we keep working free until you have them.</p>
  </div>
</section>

<div class="band" aria-label="Software we build on">
  <div class="band-in">
    <span class="band-label">Built on what you run</span>
    <div class="marquee"><div class="marquee-track">${[...K.software, ...K.software].map((s, i) => `<span${i >= K.software.length ? ' aria-hidden="true"' : ''}>${esc(s)}</span>`).join('')}</div></div>
  </div>
</div>

<section class="thesis t-grey" id="why">
  <div class="wrap">
    <div class="eyebrow rv">Why ${esc(C.brand)} exists</div>
    <h2 class="rv" style="max-width:900px">HVAC shops don’t lose jobs on the roof. They lose them at the phone.</h2>
    <div class="pains">${K.pains.map((p, i) => `<div class="pain rv"><span class="n">0${i + 1}</span>${esc(p)}</div>`).join('')}</div>
    <div class="turn rv">
      <p>We build the follow-up, timing and targeting your field service software is missing. We fix the numbers first, then the strategy. Everything is scoped and priced in writing before we start.</p>
      <p class="big-quote">Stop buying software. <span class="grad-text">Start owning growth.</span></p>
    </div>
  </div>
</section>

<section class="statband">
  <div class="wrap">
    <h2 class="rv">The money is already calling. Most of it goes to voicemail.</h2>
    <div class="stats">${K.stats.map(s => `<div class="stat rv"><b>${s.big}</b><p>${esc(s.text)}</p><cite>Source: <a href="${s.href}" target="_blank" rel="noopener">${esc(s.cite)}</a></cite></div>`).join('')}</div>
  </div>
</section>

<section class="sec t-light" id="solutions">
  <div class="wrap">
    <div class="sec-head">
      <div><div class="eyebrow rv">Solutions</div><h2 class="rv">Ten solutions. One system.</h2></div>
      <p class="rv">Every solution runs on the same customer record, so each one makes the others better. We recommend the whole system, but every piece stands on its own.</p>
    </div>
    <a class="feature rv" href="/solutions/${K.featured.slug}/">
      <div><p class="eyebrow">${esc(K.featured.sub)}</p><h3>${esc(K.featured.title)}</h3><p>${esc(K.featured.card)}</p><span class="link-arrow">See the solution ${ARROW}</span></div>
      <div class="feature-tiles" aria-hidden="true">${K.solutions.map(s => `<span>${ico(s.icon)}</span>`).join('')}</div>
    </a>
    <div class="cards">${K.solutions.map(card).join('')}</div>
  </div>
</section>

<section class="sec t-grey" id="running">
  <div class="wrap">
    <div class="sec-head">
      <div><div class="eyebrow rv">Know your numbers</div><h2 class="rv">Every number that actually matters, on one dashboard.</h2></div>
      <p class="rv">Money, the front desk, your customers and your techs, live, plus a morning report in Slack or a text. The figures below are a format example, not a promise.</p>
    </div>
    <div class="dash rv" aria-label="Example dashboard">
      <div class="dash-bar"><i></i><i></i><i></i>Your shop · this month<span class="ml">updated 2 min ago</span></div>
      <div class="dash-grid">
        <div class="panel"><h4>Money</h4><div class="kpis">
          <div class="kpi"><b>$96,480</b><span>Booked</span></div><div class="kpi"><b>$112,000</b><span>Projected</span></div>
          <div class="kpi"><b>$642</b><span>Avg ticket</span></div><div class="kpi"><b>49%</b><span>Gross margin</span></div></div></div>
        <div class="panel"><h4>Front desk</h4><div class="kpis">
          <div class="kpi"><b>238</b><span>Calls answered</span></div><div class="kpi good"><b>0</b><span>Missed</span></div>
          <div class="kpi"><b>41</b><span>After-hours booked</span></div><div class="kpi"><b>2s</b><span>Avg pickup</span></div></div></div>
        <div class="panel w2"><h4>Customers</h4><div class="list">
          <div><span>Tune-ups due</span><b>186</b></div><div><span>Agreements expiring</span><b>34</b></div>
          <div><span>Systems 12+ years</span><b>61</b></div><div><span>Reactivated</span><b>11</b></div></div></div>
        <div class="panel w2"><h4>Techs</h4><div class="list">
          <div><span>Tech A close rate</span><b>44%</b></div><div><span>Tech B close rate</span><b>37%</b></div>
          <div><span>Active members</span><b>428</b></div><div><span>Reviews requested</span><b>97</b></div></div></div>
        <div class="panel w2"><h4>Job mix</h4><div class="bars">
          <div class="bar"><span>Repair</span><span class="track"><span class="fill" style="--w:46%"></span></span><b>46%</b></div>
          <div class="bar"><span>Replacement</span><span class="track"><span class="fill" style="--w:24%"></span></span><b>24%</b></div>
          <div class="bar"><span>Maintenance</span><span class="track"><span class="fill" style="--w:22%"></span></span><b>22%</b></div>
          <div class="bar"><span>Air quality</span><span class="track"><span class="fill" style="--w:8%"></span></span><b>8%</b></div></div></div>
        <div class="panel w6"><h4>Found and back</h4><div class="kpis">
          <div class="kpi good"><b>#1</b><span>“ac repair near me”</span></div><div class="kpi"><b>3,920</b><span>Site visitors</span></div>
          <div class="kpi"><b>7</b><span>Rebooked cancellations</span></div><div class="kpi"><b>4.9★</b><span>Google rating</span></div></div></div>
      </div>
    </div>
    <p class="small dash-note">Sample data. Your dashboard shows your shop’s real numbers.</p>
  </div>
</section>

<section class="sec t-light" id="how">
  <div class="wrap">
    <div class="sec-head">
      <div><div class="eyebrow rv">How it works</div><h2 class="rv">An engagement, in four steps.</h2></div>
      <p class="rv">Scoped in writing. Live in 30 to 45 days. Owned by you. <a class="link-arrow" href="/system/">See the whole system ${ARROW}</a></p>
    </div>
    <div class="steps">${K.process.map((s, i) => `
      <div class="step rv"><span class="num">0${i + 1}</span>
        <div><div class="kick">${esc(s.kick)}</div><h3>${esc(s.h)}</h3></div>
        <ul>${s.items.map(([a, b]) => `<li>${ico('tick')}<span>${esc(a)}<small>${esc(b)}</small></span></li>`).join('')}</ul>
      </div>`).join('')}
    </div>
  </div>
</section>

<section class="sec t-dark" id="guarantee">
  <div class="wrap">
    <div class="guar">
      <div class="rv">
        <div class="eyebrow">The guarantee</div>
        <h2>Skin in the game. On both sides.</h2>
        <p>You pay a small start fee. We carry the rest of the build. Before we start, we put targets in writing: answer rate, booked jobs, reactivations, revenue. If we haven’t hit them in 90 days, we keep working, free, until we do.</p>
        <div class="btn-row" style="margin-top:28px">${bookBtn()}</div>
      </div>
      <div class="terms-list rv">
        <div class="term"><b>Small</b><span>start fee. We carry the rest of the build.</span></div>
        <div class="term"><b>30–45</b><span>days from kickoff to live.</span></div>
        <div class="term"><b>90</b><span>days to hit written targets, or we keep working free.</span></div>
        <div class="term"><b>0</b><span>annual contracts. Month to month after launch.</span></div>
      </div>
    </div>
  </div>
</section>

<section class="sec t-light" id="answers">
  <div class="wrap faq-wrap">
    <div class="sticky"><div class="eyebrow rv">FAQ</div><h2 class="rv">Questions we get asked.</h2><p class="rv" style="margin-top:20px">Anything else, ask us on the call.</p><div class="rv">${bookBtn()}</div></div>
    <div class="rv">${faqList(K.homeFaq)}</div>
  </div>
</section>

${closeSection(['You keep homes comfortable.', 'We keep the business behind you just as comfortable.'])}`;
  return page({
    route: '/', title: `${C.brand} | The RevOps and Strategy Partner for HVAC Companies`,
    desc: `${C.brand} grows residential HVAC companies: an AI receptionist that answers every call in seconds, speed-to-lead, estimate and tune-up follow-up, and one dashboard. On the software you already run.`,
    body, schema: [faqSchema(K.homeFaq)],
  });
}

// ── Solutions ────────────────────────────────────────────────
function solutionsIndex() {
  const trail = [['Home', '/'], ['Solutions', '/solutions/']];
  const body = `
<section class="phero">
  <div class="wrap">
    ${crumbs(trail)}
    <div class="eyebrow">Solutions</div>
    <h1>Ten solutions. <span class="grad-text">One system.</span></h1>
    <p class="lede">Every solution fixes one leak between the phone ringing and the customer coming back next season. Start with one, or run the whole shop on all ten.</p>
    <div class="btn-row">${bookBtn()}<a class="btn btn-ghost" href="/system/">See the whole system</a></div>
  </div>
</section>
<section class="sec t-light" style="padding-top:20px">
  <div class="wrap">
    <a class="feature rv" href="/solutions/${K.featured.slug}/">
      <div><p class="eyebrow">${esc(K.featured.sub)}</p><h3>${esc(K.featured.title)}</h3><p>${esc(K.featured.card)}</p><span class="link-arrow">See the solution ${ARROW}</span></div>
      <div class="feature-tiles" aria-hidden="true">${K.solutions.map(s => `<span>${ico(s.icon)}</span>`).join('')}</div>
    </a>
    <div class="cards">${K.solutions.map(card).join('')}</div>
  </div>
</section>
${closeSection()}`;
  return page({ route: '/solutions/', title: `HVAC Growth Solutions: AI Receptionist, Follow-Up & Local SEO | ${C.brand}`,
    desc: 'Ten solutions for residential HVAC companies: answer every call, fill the schedule, sell memberships, close estimates, time tune-ups, win heat waves and more.',
    body, schema: [crumbsSchema(trail)] });
}

function solutionPage(s) {
  const trail = [['Home', '/'], ['Solutions', '/solutions/'], [s.title, `/solutions/${s.slug}/`]];
  const others = ALL.filter(x => x.slug !== s.slug);
  const start = ALL.indexOf(s) % others.length;
  const related = [0, 1, 2].map(i => others[(start + i) % others.length]);
  const body = `
<section class="phero">
  <div class="wrap">
    ${crumbs(trail)}
    <div class="eyebrow">${esc(s.title)}</div>
    <h1>${esc(s.h1)}</h1>
    <p class="lede">${esc(s.lede)}</p>
    <div class="btn-row">${bookBtn()}<a class="btn btn-ghost" href="/system/">See the whole system</a></div>
  </div>
</section>
<section class="sec t-light" style="padding-top:20px">
  <div class="wrap split">
    <div class="leak rv"><div class="eyebrow">The leak</div><h2>${esc(s.leakH)}</h2>${s.leak.map(p => `<p>${esc(p)}</p>`).join('')}</div>
    <div class="rv"><div class="eyebrow">What we build</div><h2 style="font-size:clamp(28px,3.2vw,44px);margin-bottom:28px">Built for your shop, on your software.</h2>${ticks(s.build)}</div>
  </div>
</section>
<section class="sec t-grey">
  <div class="wrap">
    <div class="sec-head"><div><div class="eyebrow rv">How it runs</div><h2 class="rv">Three steps. Then it runs itself.</h2></div><p class="rv">Scoped in writing, live in 30 to 45 days, tuned every week after launch.</p></div>
    <div class="mini-steps">${s.steps.map(([h, p]) => `<div class="rv"><h3>${esc(h)}</h3><p>${esc(p)}</p></div>`).join('')}</div>
  </div>
</section>
<section class="sec t-light">
  <div class="wrap faq-wrap">
    <div class="sticky"><div class="eyebrow rv">FAQ</div><h2 class="rv" style="font-size:clamp(30px,3.4vw,48px)">Questions about ${esc(s.title.toLowerCase())}.</h2></div>
    <div class="rv">${faqList(s.faq)}</div>
  </div>
</section>
<section class="sec t-white" style="padding-top:clamp(60px,8vw,100px)">
  <div class="wrap">
    <div class="sec-head"><div><div class="eyebrow rv">Pairs well with</div><h2 class="rv" style="font-size:clamp(30px,3.4vw,48px)">Every solution shares one record.</h2></div><p class="rv"><a class="link-arrow" href="/solutions/">All ten solutions ${ARROW}</a></p></div>
    <div class="related">${related.map(card).join('')}</div>
  </div>
</section>
${closeSection()}`;
  const service = { '@context': 'https://schema.org', '@type': 'Service', name: s.title, serviceType: s.title + ' for HVAC companies', description: s.lede, provider: { '@type': 'Organization', name: C.brand, url: BASE + '/' }, areaServed: 'US', audience: { '@type': 'BusinessAudience', name: 'Residential HVAC companies' } };
  return page({ route: `/solutions/${s.slug}/`, title: `${s.title} for HVAC Companies | ${C.brand}`, desc: s.lede.slice(0, 158), body, schema: [service, faqSchema(s.faq), crumbsSchema(trail)] });
}

// ── The whole system ─────────────────────────────────────────
function system() {
  const S = K.system, trail = [['Home', '/'], ['The whole system', '/system/']];
  const body = `
<section class="phero">
  <div class="wrap">
    ${crumbs(trail)}
    <div class="eyebrow">The whole system</div>
    <h1>The operating system for <span class="grad-text">the whole shop.</span></h1>
    <p class="lede">One system that captures every lead, answers it in seconds, books it, follows up and brings the customer back next season. On the software you already run.</p>
    <div class="btn-row">${bookBtn('Book a walkthrough')}<a class="btn btn-ghost" href="#build">See what we build</a></div>
  </div>
</section>
<section class="sec t-white">
  <div class="wrap turn">
    <p class="big-quote rv">Most HVAC shops don’t have a lead problem. <span class="grad-text">They have a follow-through problem.</span></p>
    <div class="rv"><p>You already pay for the calls, the ads, the trucks and the software. The money leaks out between them: the call nobody answered, the estimate nobody chased, the agreement nobody renewed.</p><p>We close those gaps with one system, built on one customer record, so nothing falls between tools.</p></div>
  </div>
</section>
<section class="sec t-grey">
  <div class="wrap">
    <div class="sec-head"><div><div class="eyebrow rv">The customer journey</div><h2 class="rv">One customer. Seven steps. Nothing dropped.</h2></div><p class="rv">From the first ring to the tune-up next spring, every step is handled, logged and measured.</p></div>
    <div class="journey">${S.journey.map(([h, p]) => `<div class="rv"><h3>${esc(h)}</h3><p>${esc(p)}</p></div>`).join('')}</div>
  </div>
</section>
<section class="sec t-dark" id="build">
  <div class="wrap">
    <div class="sec-head"><div><div class="eyebrow rv">What we build</div><h2 class="rv">Six parts. One system.</h2></div><p class="rv">Each part works alone. Together they share one record, so every agent knows what the others did.</p></div>
    <div class="svc">${S.services.map(([i, h, p]) => `<div class="rv"><span class="ico">${ico(i)}</span><h3>${esc(h)}</h3><p>${esc(p)}</p></div>`).join('')}</div>
  </div>
</section>
<section class="sec t-light">
  <div class="wrap">
    <div class="sec-head"><div><div class="eyebrow rv">The agents</div><h2 class="rv">Eight agents. One customer record.</h2></div><p class="rv">Each one does one job, in your voice, by text, email or phone, from your registered business number.</p></div>
    <div class="agents">${S.agents.map(([h, p], i) => `<div class="agent rv"><span class="tag">agent_0${i + 1}</span><b>${esc(h)}</b><span>${esc(p)}</span></div>`).join('')}</div>
  </div>
</section>
<section class="sec t-grey">
  <div class="wrap">
    <div class="sec-head"><div><div class="eyebrow rv">Who wins</div><h2 class="rv">What changes, by role.</h2></div></div>
    <div class="roles">${S.roles.map(([h, l]) => `<div class="rv"><h3>${esc(h)}</h3><ul>${l.map(x => `<li>${esc(x)}</li>`).join('')}</ul></div>`).join('')}</div>
  </div>
</section>
<section class="sec t-white" id="software">
  <div class="wrap">
    <div class="sec-head"><div><div class="eyebrow rv">Integrations</div><h2 class="rv">Built on the software you already run.</h2></div><p class="rv">No new software for your team. We confirm exactly what connects to your setup on the first call, in writing.</p></div>
    <div class="soft rv">${K.software.map(s => `<span>${esc(s)}</span>`).join('')}</div>
    <p class="small rv" style="margin-top:20px">Product names are trademarks of their owners and are used only to describe compatibility.</p>
  </div>
</section>
<section class="sec t-light">
  <div class="wrap">
    <div class="sec-head"><div><div class="eyebrow rv">Built around your shop</div><h2 class="rv">From first call to fully live.</h2></div></div>
    <div class="mini-steps">
      <div class="rv"><h3>Discovery call</h3><p>Thirty minutes on where your calls, leads and follow-up leak, and what to build first.</p></div>
      <div class="rv"><h3>Custom build and launch</h3><p>30 to 45 days. Wired to your phones and software, written for your shop, live in stages.</p></div>
      <div class="rv"><h3>Ninety-day optimization</h3><p>Weekly tuning against targets we put in writing. Miss them, and we keep working free.</p></div>
    </div>
  </div>
</section>
<section class="sec t-white">
  <div class="wrap faq-wrap">
    <div class="sticky"><div class="eyebrow rv">FAQ</div><h2 class="rv">Questions about the system.</h2></div>
    <div class="rv">${faqList(S.faq)}</div>
  </div>
</section>
${closeSection()}`;
  return page({ route: '/system/', title: `HVAC AI Receptionist, Follow-Up & Reporting System | ${C.brand}`,
    desc: 'The operating system for the whole HVAC shop: AI receptionist, speed-to-lead, eight follow-up agents, local SEO and one dashboard, built on ServiceTitan, Housecall Pro or Jobber.',
    body, schema: [faqSchema(S.faq), crumbsSchema(trail)] });
}

// ── About ────────────────────────────────────────────────────
function about() {
  const trail = [['Home', '/'], ['About', '/about/']];
  const body = `
<section class="phero">
  <div class="wrap">
    ${crumbs(trail)}
    <div class="eyebrow">About ${esc(C.brand)}</div>
    <h1>A small firm that builds the systems <span class="grad-text">and stays to run them.</span></h1>
    <p class="lede">We work with one kind of business: residential HVAC companies. We build their front office and follow-up, then we stay and tune it every week.</p>
  </div>
</section>
<section class="sec t-white">
  <div class="wrap split">
    <div class="rv"><div class="eyebrow">Our why</div><h2 style="font-size:clamp(30px,3.4vw,48px)">You got into HVAC to fix systems. Not to chase voicemails at 9 p.m.</h2></div>
    <div class="rv">
      <p>Every HVAC owner we talk to has the same story. The work is good. The techs are good. The money leaks out at the front desk: the call that went to voicemail during a heat wave, the quote nobody followed up, the member who lapsed because nobody called.</p>
      <p>Software didn’t fix it. Most shops already pay for more tools than they use. What’s missing is someone to wire it together, write the follow-up and watch the numbers every week.</p>
      <p>That’s the whole job. We do it for HVAC companies only, so we already know your busy season, your service agreements and what your customers ask on the phone.</p>
    </div>
  </div>
</section>
<section class="sec t-dark">
  <div class="wrap">
    <div class="sec-head"><div><div class="eyebrow rv">How we work</div><h2 class="rv">Three rules that do not move.</h2></div></div>
    <div class="rules">
      <div class="rv"><b>01</b><h3>Documentation beats conversation.</h3><p>Scope, price, targets and every handoff rule are written down before we build. You never have to remember what was promised on a call.</p></div>
      <div class="rv"><b>02</b><h3>You own the build.</h3><p>Once the build fee is paid, the scripts, automations, dashboard and data are yours. No hostage software.</p></div>
      <div class="rv"><b>03</b><h3>Built on what you already run.</h3><p>We build on your phones and your field service software. No new platform for your team to learn.</p></div>
    </div>
  </div>
</section>
<section class="sec t-light">
  <div class="wrap split">
    <div class="rv"><div class="eyebrow">Who we work with</div><h2 style="font-size:clamp(30px,3.4vw,48px)">Built for owner-led HVAC shops.</h2></div>
    <div class="rv">${ticks(['Residential HVAC, with or without plumbing and electrical', 'Roughly 3 to 30 techs on the road', 'Running ServiceTitan, Housecall Pro, Jobber or similar', 'Getting calls and leads, but losing too many between the phone and the board', 'An owner who wants growth they can see on one page, not another tool'])}</div>
  </div>
</section>
${closeSection()}`;
  return page({ route: '/about/', title: `About | ${C.brand}`, desc: `${C.brand} builds and runs the front office and follow-up system for residential HVAC companies, then stays to tune it every week.`, body, schema: [crumbsSchema(trail)] });
}

// ── Book ─────────────────────────────────────────────────────
function book() {
  const trail = [['Home', '/'], ['Book a call', '/book/']];
  const opt = (arr) => arr.map(v => `<option>${esc(v)}</option>`).join('');
  const body = `
<section class="phero" style="padding-bottom:clamp(60px,8vw,110px)">
  <div class="wrap book-grid">
    <div>
      ${crumbs(trail)}
      <div class="eyebrow">Book a strategy call</div>
      <h1 style="font-size:clamp(40px,5.2vw,76px)">Results in 90 days. <span class="grad-text">Or we keep working until you have them.</span></h1>
      <p class="lede">A 30-minute call with the people who would build your system. No slides, no pressure.</p>
      <h2 style="font-size:24px;letter-spacing:-.02em;margin:36px 0 16px">What happens on the call</h2>
      <div class="call-agenda">
        <div><b>01</b><div><h3>What’s leaking</h3><p>We walk through your calls, leads and follow-up and put a number on what’s slipping.</p></div></div>
        <div><b>02</b><div><h3>The system, running live</h3><p>Hear the receptionist answer a real HVAC call and book it.</p></div></div>
        <div><b>03</b><div><h3>What gets built first</h3><p>The order that pays back fastest for your shop.</p></div></div>
        <div><b>04</b><div><h3>Cost and timing</h3><p>In writing after the call. No card, no contract.</p></div></div>
      </div>
      <div class="btn-row" style="margin-top:24px"><a class="btn btn-ghost" href="/system/">See the whole system</a></div>
    </div>
    <form class="form" data-book-form novalidate id="form">
      <h2>Book your call</h2>
      <p>Tell us a little about your shop. We’ll confirm a time within one business day.</p>
      <div class="fgrid">
        <div class="field"><label for="f-name">Your name</label><input id="f-name" name="name" autocomplete="name" required></div>
        <div class="field"><label for="f-company">Company</label><input id="f-company" name="company" autocomplete="organization" required></div>
        <div class="field"><label for="f-phone">Mobile</label><input id="f-phone" name="phone" type="tel" autocomplete="tel" required></div>
        <div class="field"><label for="f-email">Email</label><input id="f-email" name="email" type="email" autocomplete="email" required></div>
        <div class="field"><label for="f-techs">Techs on the road</label><select id="f-techs" name="techs" required><option value="">Choose…</option>${opt(['1–2', '3–5', '6–15', '16–30', '30+'])}</select></div>
        <div class="field"><label for="f-software">Field service software</label><select id="f-software" name="software" required><option value="">Choose…</option>${opt(['ServiceTitan', 'Housecall Pro', 'Jobber', 'FieldEdge', 'Service Fusion', 'Successware', 'Other', 'None yet'])}</select></div>
        <div class="field full"><label for="f-leak">Biggest leak right now</label><select id="f-leak" name="leak" required><option value="">Choose…</option>${opt(['Missed calls', 'Slow follow-up on leads', 'Unsold estimates', 'Empty shoulder season', 'Lapsed maintenance agreements', 'Not enough reviews', 'Not showing up on Google', 'Not sure, want an audit'])}</select></div>
        <div class="field full"><label for="f-notes">Anything else <span class="opt">(optional)</span></label><textarea id="f-notes" name="notes" placeholder="Service area, call volume, what you’ve tried…"></textarea></div>
        <label class="consent full"><input type="checkbox" name="sms_conversational" value="yes"><span>I agree to receive conversational text messages from ${esc(C.brand)} about my inquiry and scheduled call. Message frequency varies. Msg &amp; data rates may apply. Reply STOP to opt out, HELP for help.</span></label>
        <label class="consent full"><input type="checkbox" name="sms_marketing" value="yes"><span>I agree to receive occasional marketing text messages from ${esc(C.brand)}. Consent is not a condition of purchase. Reply STOP to opt out. See our <a href="/privacy-policy/">Privacy policy</a> and <a href="/terms/">Terms</a>.</span></label>
      </div>
      <button class="btn" type="submit">Book my call ${ARROW}</button>
      <div class="form-msg" role="status" aria-live="polite"></div>
      ${C.calendarUrl ? `<div class="cal-embed"><iframe src="${esc(C.calendarUrl)}" title="Pick a time" loading="lazy"></iframe></div>` : ''}
    </form>
  </div>
</section>
<section class="statband">
  <div class="wrap">
    <h2 class="rv" style="margin-bottom:40px">Why speed matters.</h2>
    <div class="stats">${K.stats.map(s => `<div class="stat rv"><b>${s.big}</b><p>${esc(s.text)}</p><cite>Source: <a href="${s.href}" target="_blank" rel="noopener">${esc(s.cite)}</a></cite></div>`).join('')}</div>
  </div>
</section>
<section class="sec t-light">
  <div class="wrap faq-wrap">
    <div class="sticky"><div class="eyebrow rv">FAQ</div><h2 class="rv">Before you book.</h2></div>
    <div class="rv">${faqList([K.homeFaq[1], K.homeFaq[5], K.homeFaq[6], K.homeFaq[7]])}</div>
  </div>
</section>`;
  return page({ route: '/book/', title: `Book a Strategy Call for Your HVAC Company | ${C.brand}`, desc: 'Book a 30-minute strategy call: see where your HVAC shop is losing calls and jobs, hear the AI receptionist live, and get cost and timing in writing.', body, schema: [crumbsSchema(trail)] });
}

// ── Tools: missed-call calculator ────────────────────────────
function tools() {
  const trail = [['Home', '/'], ['Calculator', '/tools/']];
  const rng = (id, label, min, max, step, val, help) => `<div class="rng"><div class="rng-top"><label for="${id}">${label}</label><output id="o-${id.slice(2)}" for="${id}"></output></div><input type="range" id="${id}" min="${min}" max="${max}" step="${step}" value="${val}">${help ? `<p class="small">${help}</p>` : ''}</div>`;
  const body = `
<section class="phero" style="padding-bottom:40px">
  <div class="wrap">
    ${crumbs(trail)}
    <div class="eyebrow">Missed-call calculator</div>
    <h1>What are missed calls <span class="grad-text">costing your shop?</span></h1>
    <p class="lede">Move the sliders to match your shop. The math runs in your browser; nothing is saved or sent.</p>
  </div>
</section>
<section class="sec t-light" style="padding-top:20px">
  <div class="wrap">
    <div class="calc" data-calc>
      <div class="calc-in">
        ${rng('c-calls', 'Inbound calls per week', 10, 600, 5, 120, '')}
        ${rng('c-missed', 'Calls that go unanswered', 0, 60, 1, 27, 'Industry figure: about 27% of calls to HVAC businesses go unanswered.')}
        ${rng('c-gone', 'Missed callers who don’t call back', 0, 100, 5, 70, 'Most homeowners with a broken system call the next company instead.')}
        ${rng('c-book', 'Answered calls that become booked jobs', 10, 100, 5, 50, '')}
        ${rng('c-ticket', 'Average ticket', 100, 3000, 25, 450, 'Use your blended average across repair, maintenance and installs.')}
      </div>
      <div class="calc-out">
        <div><div class="out-label">Revenue walking out the door, per month</div><div class="big-num" id="r-month">$0</div></div>
        <div class="out-rows">
          <div><b id="r-year">$0</b><span>per year</span></div>
          <div><b id="r-missed">0</b><span>missed calls a month</span></div>
          <div><b id="r-jobs">0</b><span>lost jobs a month</span></div>
          <div><b>2 sec</b><span>how fast our receptionist picks up</span></div>
        </div>
        <div style="position:relative">${bookBtn('Stop the leak')}<p class="small" style="margin-top:14px;color:var(--muted-2)">An estimate based on the numbers you enter, not a guarantee. It doesn’t count replacements, memberships or referrals a lost customer would have brought.</p></div>
      </div>
    </div>
  </div>
</section>
${closeSection()}`;
  return page({ route: '/tools/', title: `HVAC Missed-Call Cost Calculator | ${C.brand}`, desc: 'Free calculator: see how much revenue your HVAC company loses each month to missed and unanswered calls.', body, schema: [crumbsSchema(trail)] });
}

// ── Legal ────────────────────────────────────────────────────
const contactLine = () => `${C.email ? `email us at <a href="mailto:${esc(C.email)}">${esc(C.email)}</a>${C.phone ? `, call ${esc(C.phone)},` : ''} or ` : (C.phone ? `call ${esc(C.phone)} or ` : '')}use the form on our <a href="/book/">Book a call</a> page`;
function legal(route, title, intro, sections) {
  const body = `
<section class="legal">
  <div class="wrap">
    <div class="prose">
      ${crumbs([['Home', '/'], [title, route]])}
      <h1>${title}</h1>
      <p class="small">Effective November 9, 2026 · Last updated November 9, 2026</p>
      <p>${intro}</p>
      <nav class="toc" aria-label="Contents">${sections.map(([h, , id], i) => `<a href="#${id || 's' + (i + 1)}">${i + 1}. ${h}</a>`).join('')}</nav>
      ${sections.map(([h, html, id], i) => `<h2 id="${id || 's' + (i + 1)}">${i + 1}. ${h}</h2>${html}`).join('\n')}
    </div>
  </div>
</section>`;
  return page({ route, title: `${title} | ${C.brand}`, desc: `${C.brand} ${title.toLowerCase()}.`, body });
}
function privacy() {
  const B = esc(C.brand);
  return legal('/privacy-policy/', 'Privacy policy', `This policy explains what ${B} (“we,” “us”) collects through this website, our forms, texts and calls, how we use it, and the choices you have.`, [
    ['Who we are', `<p>${B} builds and runs front-office, follow-up and reporting systems for residential HVAC companies. ${C.city ? `We are based in ${esc(C.city)}.` : ''}</p>`],
    ['What this policy covers', `<p>This website, our booking form, and the texts, emails and calls we send or take about your inquiry. It does not cover the systems we run for our clients under a separate written agreement (see section 9).</p>`],
    ['Information we collect', `<ul><li><b>You give us:</b> name, company, phone, email, number of techs, software used, the problem you want solved, and anything you write in the form.</li><li><b>Collected automatically:</b> pages viewed, device and browser type, approximate location from IP address, and referring page, only where analytics are switched on (see section 8).</li><li><b>From calls and texts:</b> phone number, message content, call recordings and transcripts, where permitted (see section 6).</li></ul>`],
    ['How we use it', `<p>To respond to your inquiry, schedule and hold your call, send the texts and emails you agreed to, prepare a proposal, improve this website, keep records required by law, and protect against fraud or abuse. We do not sell your personal information.</p>`],
    ['Text messages (SMS)', `<p>We text you only if you check a consent box. Conversational and marketing consents are separate, unchecked by default, and never a condition of purchase. Message frequency varies; message and data rates may apply. Reply <b>STOP</b> to opt out at any time and <b>HELP</b> for help. Mobile numbers and SMS consent are never shared with third parties for their own marketing.</p>`],
    ['Calls, AI voice and recording', `<p>Calls with us, including demo calls with an AI voice agent, may be recorded and transcribed for quality, training and record-keeping. Where the law requires all-party consent, we tell you at the start of the call. You can ask to speak with a person at any time.</p>`],
    ['How we share it', `<p>With service providers who help us run the business (hosting, email, texting, scheduling, CRM, analytics), bound by contract to use the data only for us; with professional advisers; when required by law; or in a business sale or merger. We do not sell or rent personal information.</p>`],
    ['Advertising and analytics', `<p>Analytics and advertising tools (for example Google Analytics, PostHog or the Meta Pixel) run only after you accept them in our cookie banner. If you reject them, only cookies strictly needed for the site to work are used.</p>`],
    ['Client data we process for HVAC companies', `<p>When we build systems for an HVAC company, we process their customers’ data on their behalf, under a written agreement and their instructions. That data is encrypted in transit and at rest, access-logged, and never used to train outside AI models. Questions about it should go to the HVAC company you do business with.</p>`],
    ['Your choices', `<p>You can opt out of texts (reply STOP), unsubscribe from emails (link in every email), reject analytics cookies in the banner, and ask us to access, correct or delete your information: ${contactLine()}.</p>`, 'choices'],
    ['State privacy rights', `<p>Depending on where you live, you may have rights to know, access, correct, delete or port your personal information and to opt out of targeted advertising. We honor these requests and will not discriminate against you for using them. We may verify your identity before acting.</p>`],
    ['Children', `<p>This site is for business owners and is not directed to anyone under 18. We do not knowingly collect information from children.</p>`],
    ['Security', `<p>We use encryption, access controls and logging to protect information. No system is perfectly secure, so we cannot guarantee absolute security.</p>`],
    ['Retention', `<p>We keep inquiry information as long as needed to respond and follow up, and as required for legal and tax records, then delete or de-identify it.</p>`],
    ['Changes', `<p>We will post any changes here and update the date at the top.</p>`],
    ['Contact', `<p>For privacy questions or requests, ${contactLine()}.</p>`],
  ]);
}
function terms() {
  const B = esc(C.brand);
  return legal('/terms/', 'Terms of service', `These terms govern your use of the ${B} website and the forms, texts and calls connected to it. By using the site you agree to them.`, [
    ['Acceptance', `<p>You must be 18 or older and using the site for business purposes. If you don’t agree to these terms, please don’t use the site.</p>`],
    ['Using the site', `<p>Don’t misuse the site: no scraping at scale, no attempts to break security, no submitting false information or someone else’s contact details.</p>`],
    ['Forms, demos and calculators', `<p>Submitting a form or booking a call does not create a contract. Calculator results are estimates based on the numbers you enter, not guarantees.</p>`],
    ['SMS program terms', `<p>Program name: ${B} messaging. With your consent we send texts about your inquiry and, if you opt in separately, occasional marketing. Frequency varies. Msg &amp; data rates may apply. Reply STOP to cancel, HELP for help, START to resubscribe. Carriers are not liable for delayed or undelivered messages.</p>`],
    ['Calls and recording', `<p>Calls, including demos with an AI voice agent, may be recorded and transcribed, as described in our <a href="/privacy-policy/">Privacy policy</a>.</p>`],
    ['Services are under a separate agreement', `<p>Any work we do for your company is governed by a separate written services agreement. If that agreement conflicts with these terms, the services agreement controls.</p>`],
    ['Intellectual property', `<p>The site’s content, design and the ${B} name and logo belong to us. Other product names are trademarks of their owners and are used only to describe compatibility.</p>`],
    ['Third-party services', `<p>Links and embedded tools from other companies (for example scheduling or analytics) are governed by their own terms. We aren’t responsible for them.</p>`],
    ['Disclaimers', `<p>The site is provided “as is.” Statistics come from the third-party sources cited; results vary, and nothing on the site promises a specific outcome. Any guarantee applies only as written in a signed services agreement.</p>`],
    ['Limitation of liability', `<p>To the fullest extent the law allows, our total liability arising from your use of the site is limited to $100, and we are not liable for indirect or consequential damages.</p>`],
    ['Indemnification', `<p>You agree to cover our reasonable losses arising from your misuse of the site or violation of these terms.</p>`],
    ['Governing law', `<p>These terms are governed by the laws of the State of Florida. Disputes will be resolved in the state or federal courts located in Florida.</p>`],
    ['Changes', `<p>We may update these terms and will post changes here with a new date.</p>`],
    ['Contact', `<p>Questions about these terms? ${contactLine().replace(/^./, c => c.toUpperCase())}.</p>`],
  ]);
}

function notFound() {
  const body = `<section class="nf"><div class="wrap"><b>404</b><h1 style="font-size:clamp(32px,4vw,52px);margin:10px 0 16px">This page went to voicemail.</h1><p class="lede" style="margin:0 auto 28px">We couldn’t find that page. Unlike your customers’ calls, this one we can’t answer.</p><div class="btn-row" style="justify-content:center">${bookBtn()}<a class="btn btn-ghost" href="/">Back home</a></div></div></section>`;
  return page({ route: '/404.html', title: `Page not found | ${C.brand}`, desc: 'Page not found.', body });
}

// ── Write everything ─────────────────────────────────────────
function write(route, html) {
  const file = route.endsWith('.html') ? path.join(OUT, route) : path.join(OUT, route, 'index.html');
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
}
fs.rmSync(OUT, { recursive: true, force: true });
const routes = [];
const add = (route, html) => { write(route, html); if (!route.endsWith('.html')) routes.push(route); };
add('/', home());
add('/system/', system());
add('/solutions/', solutionsIndex());
ALL.forEach(s => add(`/solutions/${s.slug}/`, solutionPage(s)));
add('/tools/', tools());
add('/about/', about());
add('/book/', book());
add('/privacy-policy/', privacy());
add('/terms/', terms());
write('/404.html', notFound());

fs.mkdirSync(path.join(OUT, 'assets'), { recursive: true });
for (const f of ['site.css', 'app.js', 'favicon.svg']) fs.copyFileSync(path.join(__dirname, f), path.join(OUT, 'assets', f));

const today = new Date().toISOString().slice(0, 10);
fs.writeFileSync(path.join(OUT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes.map(r => `  <url><loc>${BASE}${r}</loc><lastmod>${today}</lastmod></url>`).join('\n')}\n</urlset>\n`);
fs.writeFileSync(path.join(OUT, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${BASE}/sitemap.xml\n`);
fs.writeFileSync(path.join(OUT, 'llms.txt'), `# ${C.brand}\n\n> The RevOps and strategy partner for residential HVAC companies.\n\n${C.brand} builds and runs the front office and follow-up system for HVAC shops: an AI receptionist that answers every call in seconds, speed-to-lead on every web and marketplace lead, eight follow-up agents (estimates, tune-ups, memberships, no-shows, win-back, replacement timing, reviews, routing), local SEO, and one dashboard. It runs on ServiceTitan, Housecall Pro, Jobber, FieldEdge and similar software. Engagements: small start fee, live in 30-45 days, written 90-day targets.\n\n## Pages\n${routes.map(r => `- [${r}](${BASE}${r})`).join('\n')}\n`);

console.log(`Built ${routes.length} pages + 404 into dist/`);
