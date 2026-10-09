# LocoTrails Trip Guidebook

A standalone mobile-web prototype of the LocoTrails trip guidebook — one always-live link that shows the
trip in three states: **Pre-Trip → In-Trip → Post-Trip**.

It is built as a **real mobile app, not a page-by-page reader**: every phase is driven by a bottom tab bar
and the traveller chooses what to look at, in any order.

## Stack

- React 19 + TypeScript
- Vite 8
- Tailwind CSS v4 (`@tailwindcss/vite`)
- lucide-react icons
- No backend — a static trip mock lives in `src/data/trip.ts`

## Run

```bash
cd guidebook-app
npm install
npm run dev        # http://localhost:5173
```

Other scripts: `npm run build` (typecheck + production build), `npm run preview`, `npm run lint`.

> **Note:** this repo's shell exports `NODE_ENV=production`, which makes `npm install` skip
> devDependencies. The `.npmrc` here sets `include=dev` so `@vitejs/plugin-react`, `typescript` and
> `oxlint` install correctly. If you ever install outside this folder's config, run
> `NODE_ENV=development npm install --include=dev`.

## How it works

The app opens on a **state picker** (the prototype has no live phase detection). Pick a phase to explore.

### Pre-Trip — tabs: Home · Packing · Docs · Connect

| Tab | What's inside |
|---|---|
| **Home** | Countdown (days + hours), an **airline departure board** (colour-coded airline logo, flag, IATA code), and a **Start Trip** button |
| **Packing** | *What to pack* (grouped checklist) and *How much to pack* (baggage allowance by airline policy, auto-totalled) |
| **Docs** | Documentation as preview cards — tickets, e-visa, stay confirmations, insurance — each with a **Download PDF** |
| **Connect** | eSIM providers, roaming, and how to be online the moment you land |

**Start Trip** moves the app into the In-Trip state.

### In-Trip — tabs: Today · Tickets · Reference · Support

| Tab | What's inside |
|---|---|
| **Today** | Day switcher, weather + "carry today" tips, today's activities with durations, food (breakfast / lunch / dinner with **must-try** dishes and *At liberty*), a **map view** of the plan, tickets, PTAC/coordinator & driver, photo spots, and a rating |
| **Tickets** | Flight and activity tickets with **Download PDF** |
| **Reference** | Accommodation, contacts, quick language (tap to hear the phrase), and must-try food & drinks |
| **Support** | Common support FAQs, plus a **Raise an issue** button → "we'll call within 2 minutes" |

### Post-Trip

Masked feedback ("what did you enjoy most?"), next Travel Storytelling Circle, and referral.

Global: an **offline banner** appears when the browser goes offline, and everything respects
`prefers-reduced-motion`.

## Airline branding

`AirlineMark` renders a colour-coded airline logo tile and `FlightBoard` renders a departure-board table
(Flight · Destination · Airline) with the airline colour on the plane icon, the country flag, and an IATA
code pill — echoing the reference board.

## Structure

```
src/
  App.tsx                 phase switch (entry / pre_trip / on_trip / post_trip)
  data/trip.ts            mock Vietnam–Hanoi trip + all content
  types.ts                shared types
  hooks/                  useCountdown, useOnline
  lib/                    cn(), date/clock formatting, pdf.ts (client-side PDF export)
  components/             MobileFrame, AppHeader, ActionButton, FlightBoard, AirlineMark, MapCard,
                          DayDetails, RatingPanel, BottomTabBar, ...
  phases/                 StatePicker, PreTripApp, InTripApp, PostTripApp
  index.css               Tailwind theme + go-* animation system
```

## Swapping in real data

Replace the contents of `src/data/trip.ts` (or fetch it from the LocoTrails API) — the phase components
read everything from that single object. Images currently use `picsum.photos` placeholders and maps are
rendered with Leaflet over OpenStreetMap tiles (`components/RouteMap.tsx`); swap those for real assets/a
hosted tile provider before shipping.
