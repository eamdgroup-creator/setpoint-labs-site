// ─────────────────────────────────────────────────────────────
//  PeakLoad: the only file you need to edit for contact info.
//  Leave a value as "" to hide it on the site.
//  After editing, push to GitHub; Render redeploys automatically.
// ─────────────────────────────────────────────────────────────
module.exports = {
  brand: "PeakLoad",
  legalName: "PeakLoad",
  siteUrl: "https://peakload-0kog.onrender.com",

  // Contact (hidden on the site while empty)
  phone: "(239) 896-7774",
  email: "eamdgroup@gmail.com",
  city: "Florida",      // shown in the footer and About page

  // Where booking-form submissions go. Any URL that accepts a JSON POST:
  // a GoHighLevel inbound webhook, Zapier/Make catch hook, Formspree endpoint…
  // While empty, the form opens a pre-filled email to the address above.
  formEndpoint: "",

  // Optional scheduling link (Calendly, GHL calendar, Cal.com).
  // When set, a "Pick a time" embed appears on /book/.
  calendarUrl: "",
};
