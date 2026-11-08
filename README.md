# Country API Explorer

An interactive world map built with Next.js. Click any country (or search for it) to see its capital, currency, languages, population and more, next to the live API request and response that produced the data.

Free to run: no API key, no account, no database.

## Features

- Clickable SVG world map with hover highlight, zoom buttons and drag-to-pan
- Country search with autocomplete
- Three "API windows" for every click: request headers, payload / body, and the response with HTTP status and timing
- Country details card: flag, capital, population, area, currency, languages, region, timezones, calling code, domain, demonym and borders
- Light and dark theme (light by default, choice is remembered)
- Sticky header, full-screen layout, responsive on phones, tablets and desktops
- SEO and GEO: metadata, Open Graph and Twitter cards, JSON-LD, `robots.txt`, `sitemap.xml`, web manifest, generated icon and social image, and `llms.txt`

## Tech stack

| Area | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router), React 19, TypeScript |
| Styling | Tailwind CSS 4 |
| Map | `d3-geo` + `topojson-client` + `world-atlas` (Natural Earth) |
| Country data | [countries.dev](https://countries.dev) REST API (free, no key) |

## Prerequisites

- Node.js **20.9 or newer** (check with `node -v`)
- npm 10 or newer (comes with Node)
- Git

## Setup

```bash
# 1. Clone the repository
git clone https://github.com/imninjafunction/country-api-explorer.git
cd country-api-explorer

# 2. Install dependencies
npm install
```

### Environment variables (optional)

Create a `.env.local` file in the project root if you want to override the defaults:

```bash
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

| Variable | Default | Used for |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | `http://localhost:3000` | Canonical URL, Open Graph URLs, `sitemap.xml` and `robots.txt` |

Set it to your real domain before deploying, otherwise the SEO tags will point to localhost.

## Run the server

### Development

```bash
npm run dev
```

Open http://localhost:3000. The page hot-reloads when you edit files.

To use a different port:

```bash
npm run dev -- -p 3100
```

### Production

```bash
npm run build
npm run start
```

`npm run start` serves the production build on http://localhost:3000 (use `-- -p 3100` to change the port).

### Other scripts

| Command | What it does |
| --- | --- |
| `npm run lint` | Runs ESLint |
| `npx tsc --noEmit` | Type-checks the project |

## How it works

1. The browser renders the world map from the bundled `world-atlas` shapes. Each country carries an ISO numeric code (for example `356` for India).
2. Clicking a country calls this app's own route: `GET /api/country/356`.
3. The route (`app/api/country/[id]/route.ts`) turns the numeric code into an alpha-2 code (`IN`) using the countries.dev list, then calls `https://countries.dev/alpha/IN`. It measures the time taken and returns the request, the response, the status and the timing.
4. The three API windows show that request and response. The details card shows the country data.

Example response from `GET /api/country/356` (shortened):

```json
{
  "request": { "method": "GET", "url": "https://countries.dev/alpha/IN", "headers": { "Accept": "application/json" }, "body": null },
  "response": { "status": 200, "statusText": "OK", "timeMs": 265, "body": { "name": "India", "capital": "New Delhi" } }
}
```

## Project structure

```
app/
  api/country/[id]/route.ts   API route: looks up a country and returns request + response
  layout.tsx                  Metadata, viewport, theme script
  page.tsx                    Page layout, JSON-LD, footer
  icon.tsx, opengraph-image.tsx, twitter-image.tsx   Generated icon and social images
  manifest.ts, robots.ts, sitemap.ts                 Web manifest and crawler files
  globals.css                 Tailwind import and theme variables
components/
  CountryExplorer.tsx         Page state: selected country, loading, search
  WorldMap.tsx                SVG map with hover, zoom and pan
  ApiWindows.tsx              Request headers, payload / body, and response windows
  CountryDetails.tsx          Details card, skeleton and empty state
  AboutSection.tsx            "How it works" and FAQ
  SiteHeader.tsx, ThemeToggle.tsx
lib/
  atlas.ts                    Map data and the list of country names
  content.ts                  Steps and FAQ text (also used for JSON-LD)
  site.ts                     Site name, URL, description and maker info
  types.ts                    Shared TypeScript types
public/
  llms.txt                    Plain-text site summary for AI search engines
```

## Troubleshooting

- **Port already in use:** another server is running. Stop it, or start this one on another port with `npm run dev -- -p 3100`.
- **A country shows an error:** a few disputed or very small territories have no ID in the map data, so they can't be looked up. This is expected.
- **Every country fails with 502:** the app can't reach countries.dev. Check your internet connection. The upstream API is a free community service with no guarantee, so if it moves or changes its response shape, update `BASE` and the types in `app/api/country/[id]/route.ts` and `lib/types.ts`.
- **Wrong URLs in page source or sitemap:** set `NEXT_PUBLIC_SITE_URL` and rebuild.

## Credits

- Country data: [countries.dev](https://countries.dev)
- Map shapes: [world-atlas](https://github.com/topojson/world-atlas) (Natural Earth)
- Built by [NinjaFunction](https://ninjafunction.com)

## License

MIT. See [LICENSE](LICENSE).
