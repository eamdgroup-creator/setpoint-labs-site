# SetPoint Labs website

Marketing site for SetPoint Labs, the RevOps and strategy partner for residential HVAC companies. Static HTML built by one dependency-free Node script.

## Edit
- **Contact info, form webhook, calendar link:** `site.config.js` (empty values stay hidden on the site)
- **All copy** (solutions, FAQs, stats, process): `content.js`
- **Page layouts:** `build.js`
- **Styles / behavior / icon:** `site.css`, `app.js`, `favicon.svg` (copied to `/assets/` at build)

## Build locally
```
node build.js        # writes ./dist
npx serve dist       # or: python3 -m http.server --directory dist
```

## Render (Static Site)
| Setting | Value |
| --- | --- |
| Build command | `node build.js` |
| Publish directory | `dist` |
| Branch | `main` |

## Booking form
Set `formEndpoint` in `site.config.js` to any URL that accepts a JSON POST (GoHighLevel inbound webhook, Zapier/Make catch hook, Formspree). If only `email` is set, the form opens a pre-filled email instead. With neither, submissions are not sent anywhere.
