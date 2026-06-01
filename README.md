# ✦ PointPilot

**The travel rewards platform for Indian travellers.**

PointPilot is a complete, free travel-rewards toolkit: search award flights worldwide,
optimise which credit card to swipe, analyse transfer partners, redeem hotel points,
find lounge access, track airline elite status and set fare alerts — all running on
free-tier infrastructure, with no login and nothing stored on a server.

🌐 **Live:** https://pointpilot-sigma.vercel.app

---

## ✨ Modules

| Route | Module | What it does |
| --- | --- | --- |
| `/award-search` | **Award Flight Search** | Any city → any city, ranked by value-per-point across 6 programmes. |
| `/value-calculator` | **Value Calculator** | Cents-per-point math → redeem or pay cash? |
| `/fare-alerts` | **Fare Alerts** | Target a fare for a route; stored locally (cron/email/push on the roadmap). |
| `/card-optimizer` | **Credit Card Optimizer** | Best card per spend category + projected annual rewards + lost-rewards. |
| `/transfer-analysis` | **Transfer Partner Analyzer** | Ratios, bonuses, sweet spots and recommended uses per card. |
| `/transfer-simulator` | **Point Transfer Simulator** | Exact miles received, transfer time, bonus history. |
| `/hotel-redemptions` | **Hotel Points Redemption** | Marriott / Hilton / IHG / Hyatt nightly value by destination. |
| `/lounges` | **Lounge Access Finder** | Which lounges your cards unlock, by airport. |
| `/status-tracker` | **Airline Status Tracker** | Progress bars toward the next elite tier (localStorage). |
| `/dashboard` | **Travel Dashboard** | Everything you've saved, in one private view. |
| `/finder` | Quick Redemption Finder | The original card→airline value finder. |

## 🌍 Global search

City / airport search covers the whole world via a bundled **OurAirports** dataset
(3,200+ airports with IATA codes, served from `/api/airports`). It is:

- **Debounced** (250 ms) with an **IndexedDB cache** layer.
- **Offline-capable** — falls back to a bundled `popular-airports.json`.
- Backed by an optional **OpenStreetMap Nominatim** proxy (`/api/geocode`, keyless &
  free) for arbitrary cities, returning the nearest airport.
- Stores **recent searches** in `localStorage`.

Every airport maps to an award "region" relative to India, which drives the value engine.

## 🧱 Tech stack

- **Next.js 15** (App Router) + React 19 + TypeScript
- **Tailwind CSS** + **shadcn/ui** primitives + **Lucide** icons
- **Data:** JSON files in [`/data`](./data) — no database
- **Client storage:** `localStorage` (status, alerts, recent searches) + `IndexedDB`
  (search cache)
- **Hosting:** Vercel Hobby. No paid services, no API keys required.

## 📂 Project structure

```
pointpilot/
├── app/
│   ├── page.tsx                 # landing
│   ├── <module>/page.tsx        # 10 module routes (server components)
│   ├── api/airports/route.ts    # airport search (bundled dataset)
│   ├── api/geocode/route.ts     # Nominatim proxy (free, keyless)
│   ├── sitemap.ts / robots.ts / manifest.ts / opengraph-image.tsx
│   └── layout.tsx               # shell + JSON-LD structured data
├── components/
│   ├── ui/                      # shadcn primitives
│   ├── cards/                   # AwardCard, TransferCard, LoungeCard, HotelCard,
│   │                            #   StatusCard, DashboardCard, FareAlertCard
│   ├── search/airport-search.tsx
│   ├── modules/                 # one client tool per module
│   └── landing/                 # hero, modules, supported cards, partners, CTA
├── data/                        # cards, airlines, routes, redemptions, hotels,
│                                #   lounges, transfer-partners, status-programs,
│                                #   sample-awards, fare-history, airports (+popular)
├── lib/                         # engines: award, optimizer, hotel, simulator,
│                                #   estimate, regions, data loaders, storage, idb, seo
├── scripts/build-airports.mjs   # regenerates the airport dataset
└── types/index.ts
```

## 🧮 Engines (all deterministic & transparent)

- **Award value:** `valuePerMile = (cashFare − taxes) ÷ milesRoundTrip`, rated
  Excellent / Good / Average / Poor.
- **Card optimizer:** per-category effective reward rate × spend → best card + lost rewards.
- **Hotel value:** `nightlyPoints = nightlyCash ÷ pointValue`; nights & value per point.
- **Region engine:** ISO-country → award region relative to India; great-circle distance.

See [`lib/`](./lib).

## 🚀 Getting started

Requires **Node.js 18.18+**.

```bash
npm install
npm run dev          # http://localhost:3000
npm run build && npm run start
```

Regenerate the airport dataset (optional):

```bash
node scripts/build-airports.mjs
```

## ⚙️ Environment variables

PointPilot needs **no** API keys to run. One optional variable:

| Variable | Required | Description |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | optional | Canonical site URL for SEO / sitemap / OG tags. Defaults to the deployed Vercel URL. |

## ☁️ Deployment (Vercel Hobby)

1. Push to GitHub.
2. Import the repo at [vercel.com/new](https://vercel.com/new) — framework auto-detected
   as **Next.js**, no config needed.
3. (Optional) set `NEXT_PUBLIC_SITE_URL`.
4. Deploy. Or via CLI: `vercel --prod`.

The repo is connected to Vercel, so pushes to `main` auto-deploy.

### Architecture diagram

```
                       ┌──────────────────────────────┐
   Browser  ──────────▶│  Next.js App Router (Vercel)  │
   localStorage/IDB    │                               │
   (status, alerts,    │  Server Components  ── data/*.json (read at build)
    recent, cache)     │  Route Handlers:              │
                       │   /api/airports ── airports.json (bundled)
                       │   /api/geocode  ──────────────┼──▶ OpenStreetMap Nominatim
                       └──────────────────────────────┘     (free, keyless)
```

## 📜 License

MIT.

---

*PointPilot is independent and not affiliated with any bank, airline or hotel. All
values are illustrative estimates — verify before transferring or booking. Not
financial advice.*
