# LocoTrails Trip Guidebook

A standalone mobile-web prototype of the LocoTrails trip guidebook — one always-live link that shows the
trip in three states: **Pre-Trip → In-Trip → Post-Trip**.

Built from `../guidebook-lovable-spec.md`. It matches the existing LocoTrails "Go" mobile apps: a
full-screen phone view, sharp edges, and the `go-*` animation system (entrance float-in, pulsing CTA,
`active:scale-[0.98]` tap feedback).

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

The app opens on a **state picker** (the prototype has no live phase detection). Pick a phase to explore:

| Phase | What you can see |
|---|---|
| **Pre-Trip** | Countdown (days + hours only), flight card, baggage calculator (27 kg/pax × travellers), packing checklist, destination covers |
| **In-Trip** | Day-by-day covers + day detail (plan, stay, coordinator, driver with tap-to-call, photo spots, weather, transit), ratings, City Basics with audio phrases, tabs for Itinerary / Contacts / Issues |
| **Post-Trip** | Masked feedback ("what did you enjoy most?"), next Travel Storytelling Circle, referral |

Global: an **offline banner** appears when the browser goes offline, and everything respects
`prefers-reduced-motion`.

## Structure

```
src/
  App.tsx                 phase switch (entry / pre_trip / on_trip / post_trip)
  data/trip.ts            mock Vietnam–Hanoi trip + all content
  types.ts                shared types
  hooks/                  useCountdown, useOnline
  lib/                    cn(), date/clock formatting
  components/             MobileFrame, AppHeader, ActionButton, DayCover, RatingPanel, ...
  phases/                 StatePicker, PreTripApp, InTripApp, PostTripApp
  index.css               Tailwind theme + go-* animation system + sharp-edge reset
```

## Swapping in real data

Replace the contents of `src/data/trip.ts` (or fetch it from the LocoTrails API) — the phase components
read everything from that single object. Images currently use `picsum.photos` placeholders; swap the
`cover()` / `thumb()` helpers for real photography.
