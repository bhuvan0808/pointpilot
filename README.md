# ✦ PointPilot

**Fly further on the points you already have.**

PointPilot helps Indian travellers turn credit-card reward points into the most
valuable flight redemptions. Pick your card, your points balance and your route —
PointPilot ranks every airline transfer partner by **value-per-point** and tells
you whether your balance actually covers the trip.

No sign-up. No fees. No data leaves your browser.

---

## ✨ Features

- **Redemption finder** — choose a card, balance, departure city and destination
  and get a ranked shortlist of transfer partners.
- **Recommendation score (0–100)** — a transparent blend of value-per-point and
  whether your balance covers a round trip.
- **Searchable destinations** — 30+ destinations grouped by award region.
- **Card comparison** — see how the same trip stacks up across all five cards.
- **Transfer-partner comparison** — ratios, miles received and estimated value
  for every airline programme.
- **Vintage-minimal, mobile-first UI** built with Tailwind + shadcn/ui.
- **SEO-ready** — generated `sitemap.xml`, `robots.txt`, metadata, OpenGraph image
  and web manifest.

## 🃏 Supported cards

| Card | Issuer | Currency |
| --- | --- | --- |
| HSBC TravelOne | HSBC | Reward Points |
| Axis Atlas | Axis Bank | EDGE Miles |
| Amex Membership Rewards | American Express | Membership Rewards |
| HDFC Infinia | HDFC Bank | Reward Points |
| ICICI Emeralde Private | ICICI Bank | Emeralde Reward Points |

Airline programmes: Singapore KrisFlyer, Qatar Avios, British Airways Avios,
Etihad Guest, Air France–KLM Flying Blue, Emirates Skywards, Air India Flying
Returns and Turkish Miles&Smiles.

> ⚠️ **All values are illustrative.** Transfer ratios, award charts and point
> values change frequently. Always confirm live pricing in your card's rewards
> portal and on the airline's website before transferring — transfers are usually
> irreversible.

## 🧱 Tech stack

- [Next.js 15](https://nextjs.org/) (App Router) + React 19
- TypeScript
- Tailwind CSS + [shadcn/ui](https://ui.shadcn.com/)
- [Lucide](https://lucide.dev/) icons
- **Data:** plain JSON files in [`/data`](./data) — no database, no paid services

## 📂 Project structure

```
pointpilot/
├── app/                 # routes, layout, SEO (sitemap, robots, manifest, OG image)
│   ├── page.tsx         # landing page
│   ├── finder/          # the redemption finder tool
│   ├── sitemap.ts
│   ├── robots.ts
│   └── opengraph-image.tsx
├── components/
│   ├── ui/              # shadcn/ui primitives
│   ├── landing/         # hero, how-it-works, supported cards, CTA
│   └── finder/          # form, result cards, comparisons
├── data/                # cards / airlines / routes / redemptions (JSON)
├── lib/                 # data loaders + calculator engine
├── types/               # shared TypeScript types
└── public/
```

## 🧮 How the engine works

For the chosen card, every transfer partner is evaluated:

```
milesReceived          = floor(points × ratio)
estimatedRedemption(₹) = milesReceived × valuePerMile
valuePerPoint(₹)       = ratio × valuePerMile
score (0–100)          = 70 × (valuePerPoint / bestValuePerPoint)
                       + 30 × min(1, milesReceived / roundTripMilesNeeded)
```

Results are sorted by score, then by value-per-point. See
[`lib/calculator.ts`](./lib/calculator.ts).

## 🚀 Getting started

Requires **Node.js 18.18+**.

```bash
# 1. install dependencies
npm install

# 2. run the dev server
npm run dev
# open http://localhost:3000

# 3. production build
npm run build
npm run start
```

### Editing the data

All numbers live in [`/data`](./data). Update `cards.json`, `airlines.json`,
`routes.json` or `redemptions.json` and the tool recalculates automatically —
no code changes required.

## ☁️ Deployment (Vercel)

This app is optimised for the **Vercel Hobby plan**.

1. Push the repo to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new) and **import the repository**.
3. Framework preset is auto-detected as **Next.js** — no configuration needed.
4. (Optional) set `NEXT_PUBLIC_SITE_URL` to your final domain so canonical URLs,
   the sitemap and OpenGraph tags use it.
5. Click **Deploy**.

Or with the CLI:

```bash
npm i -g vercel
vercel          # preview
vercel --prod   # production
```

### Environment variables

| Variable | Required | Description |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | optional | Canonical site URL used for SEO/sitemap. Defaults to the Vercel URL. |

## 📜 License

MIT — free to use, learn from and adapt.

---

*PointPilot is an independent project and is not affiliated with any bank or
airline. Information only; not financial advice.*
