// ─────────────────────────────────────────────────────────────
//  SetPoint Labs: the only file you need to edit for contact info.
//  Leave a value as "" to hide it on the site.
//  After editing, push to GitHub, then deploy the latest commit on Render.
// ─────────────────────────────────────────────────────────────
module.exports = {
  brand: "SetPoint Labs",
  legalName: "SetPoint Labs",
  siteUrl: "https://setpoint-labs-site.onrender.com",

  // Contact (hidden on the site while empty)
  phone: "",            // e.g. "(813) 555-0100"
  email: "",            // e.g. "hello@setpointlabs.com"
  city: "Florida",      // shown in the footer and About page

  // Where booking-form submissions go. Any URL that accepts a JSON POST:
  // a GoHighLevel inbound webhook, Zapier/Make catch hook, Formspree endpoint…
  formEndpoint: "",

  // Optional scheduling link (Calendly, GHL calendar, Cal.com).
  // When set, a "Pick a time" button and embed appear on /book/.
  calendarUrl: "",
};
