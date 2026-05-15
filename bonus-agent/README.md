# upready-cadence

Single-page pitch landing for **Bonus Agent** — automated ACMS bonus-campaign setup for iGaming CRM teams. The page maps a promo calendar to ACMS, fills 25+ fields, flags what a human should check, and prepares the handoff.

Forked from the v1 layout developed in [`ivanprotsko.com`](../ivanprotsko.com)'s `feature/products-cadence` branch (`/products/cadence`). Pages other than the cadence landing are stripped; the landing is the home page (`/`).

## Stack

- React 19 + Vite 6
- Tailwind CSS 4
- Radix UI (only `Slot` for shadcn-style polymorphic buttons)
- shadcn-style local components (`src/components/ui/button.tsx`)
- Hugeicons for the few line icons used inside the illustration

## Quickstart

### Prerequisites

- **Node.js** ≥ 20 (any recent LTS — 20 / 22).
- **pnpm** ≥ 9. Install with `corepack enable && corepack prepare pnpm@latest --activate`, or `npm i -g pnpm`.

### Setup

```bash
git clone https://github.com/ivanprotsko/upready-cadence.git
cd upready-cadence
pnpm install
```

### Run the dev server

```bash
pnpm dev
```

Open **http://127.0.0.1:3340/**.

The dev server is locked to port 3340 (`vite.config.ts` → `strictPort: true`). If 3340 is already in use, Vite will refuse to start — find and stop the other process (`lsof -nP -iTCP:3340 -sTCP:LISTEN`, then `kill <pid>`) rather than switching ports.

### Other scripts

```bash
pnpm build        # tsc -b && vite build → dist/
pnpm preview      # serves dist/ on :3340
pnpm typecheck    # tsc -b --noEmit
```

### Deploy

There is no auto-deploy from this repo. Push to `main` does not trigger a Cloudflare Pages deploy — publishing happens only when Ivan explicitly says so.

## Layout

```
src/
├── main.tsx                            single-route renderer → <AppCadence />
├── AppCadence.tsx                      landing — Hero · HowItWorks · ProblemFix · Economics · Pricing · FinalCta · Footer
├── components/
│   ├── sections/cadence-pipeline.tsx   the "how it works" illustration + step notes
│   └── ui/button.tsx                   shadcn-style Button
├── lib/utils.ts                        cn()
├── index.css                           Tailwind v4 + cdn-* keyframes (flow / packet / fork)
└── vite-env.d.ts
```

Visual language: dark page (`bg-background`), monochrome semantic tokens, surface-1/2 cards, Geist/Geist Mono, full pipeline of `cdnFlow` / `cdnPacket` / `cdnPacketH` keyframes for the flowing connectors.

## Notes for future edits

- Floor for marketing text is `text-base` — eyebrows use `text-base uppercase tracking-[0.18em]`. `text-xs` / `text-sm` reserved for in-illustration micro-info (chips, status pills, ticker rows, the `[1778659284]` timestamp prefix inside the `Window` panels). See `ux-037` in the parent design system.
- The flowing connectors come in two flavours: vertical (`FlowConnector` component — non-scaling stroke + `<animateMotion>` packet circles riding paths), and horizontal (inline SVG + CSS `<span size-1.5 rounded-full>` dots animating `left 0%→100%` via `cdnPacketH`). Mobile mirrors the desktop pipeline with vertical lines inside captions and inside problem-cards.
- The desktop inter-panel connector uses `relative -z-10` to tuck the bleed behind the opaque panels; the CadencePipeline outer grid carries `isolate` to scope that negative z-index so it doesn't leak behind the page's `bg-background`.

🤖 Generated with [Claude Code](https://claude.com/claude-code)
