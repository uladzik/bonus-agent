# Agent context — `upready-cadence`

This is the starter prompt for any AI agent (Claude, ChatGPT, Cursor, etc.) working in this repo. Read it once at session start; it covers what we're building, the design language, the technical decisions already made, and the traps to avoid.

---

## 1. What this project is

`upready-cadence` is a **single-page pitch landing** for a product called **Bonus Agent** — an AI agent that automates ACMS bonus-campaign setup for **iGaming CRM & Promotions teams**. The landing exists to convert one specific audience: non-technical CRM team leads and heads of retention at iGaming operators who run dozens to hundreds of bonus campaigns a month and currently type each ACMS config by hand.

The reader sees:

- **Hero** — `Hundreds of campaigns a month. None of them typed by hand.`
- **How it works** — a vertical pipeline of four browser-window-styled "screenshots" (promo calendar → ACMS config → batch review → handoff) with flowing-data connectors between them.
- **Problem → Fix** — three pairs (12 min → < 1 min, 1–2 mistakes/mo → 0 invalid, € 13k/yr extra hire → same team) connected by animated wires.
- **Economics** — concrete savings + scaling math.
- **Pricing** — three tiers.
- **Final CTA** — `t.me/blabbing` (placeholder Telegram handle — swap when going live).

CTAs all route to `t.me/blabbing`. Replace the constant in `src/AppCadence.tsx` (`TELEGRAM_URL`) before launch.

## 2. Origin

This repo was forked on **2026-05-13** from the `feature/products-cadence` branch of [`ivanprotsko.com`](https://github.com/ivanprotsko) — specifically from the `/products/cadence` route, layout variant **v1**. The full design-decision history (8 visual rounds, design-logs, all the failed experiments) lives in the source repo's `HANDOFF.md` if you ever need archeology. Don't re-litigate decisions made there unless you have new information.

What we kept from the source:

- The pipeline (`CadencePipeline`) and its four panels (`CalendarPanel`, `ConfigPanel`, `ReviewPanel`, `HandoffPanel`).
- The flow-connector vocabulary (vertical `FlowConnector`, the dashed `cdnFlow` keyframe, packet-dot `cdnPacket` / `cdnPacketH`).
- The ProblemFix three-row layout with horizontal connectors.
- Surface-tier / monochrome design language.

What we stripped:

- All other Apps (`App`, `AppDev*`, `AppCadenceV2..V5`) and their sections.
- All routes other than `/`.
- `i18n/dict.ts` (cadence currently has placeholder English copy inline; lift into i18n when RU is wanted).
- Heavy deps not used by this landing (`gsap`, `swiper`, modal/effects/lead infrastructure).

## 3. Stack & layout

```
React 19 · Vite 6 · Tailwind v4 · TypeScript ~5.6
Single route home → <AppCadence />
Dev server: http://127.0.0.1:3340 (strict port)
```

```
src/
├── main.tsx                            single-route renderer
├── AppCadence.tsx                      page sections (Hero · HowItWorks · ProblemFix · Economics · Pricing · FinalCta · Footer)
├── components/
│   ├── sections/cadence-pipeline.tsx   the pipeline + its four panels + FlowConnector
│   └── ui/button.tsx                   shadcn-style Button (uses radix-ui Slot)
├── lib/utils.ts                        cn()
├── index.css                           Tailwind v4 + cdn-* keyframes (cdnFlow / cdnPacket / cdnPacketH / cdnRide / cdnSpin / fadeFloat / fadeUp / blink / .cdn-backdrop)
└── vite-env.d.ts
```

Use `@/` alias for `src/` (configured in `vite.config.ts` and `tsconfig.app.json`).

## 4. Visual language — the strict rules

### Color
Monochrome only. Semantic tokens only — never raw Tailwind colors. The allowed palette:

| Token | Use |
|---|---|
| `text-foreground` | Primary text, headings, stats |
| `text-muted-foreground` | Secondary text, labels, descriptions |
| `text-primary` / `text-primary-foreground` | ONLY CTA-button text |
| `bg-background` | Page base |
| `bg-surface-1` / `bg-surface-2` | Cards / panels — opaque elevation tiers (defined in `index.css`) |
| `bg-muted` / `bg-foreground/5` / `bg-foreground/[0.04]` | Subtle backgrounds |
| `border-border` | All borders |

Forbidden: `text-red-*`, `bg-blue-*`, raw hex / `oklch()` / `rgb()`. Status meaning via tiny dots (`size-1.5 bg-emerald-500`) is OK — color is the indicator, not decoration.

### Typography
Geist Sans + Geist Mono (mono for stats, captions, status pills, mono illustration content).

**Floor for the marketing page: `text-base` (16 px).** This is `ux-037` from the parent design system. It applies to body, descriptions, stat sublines, list items, AND meta labels (eyebrows, kickers, "THE PROBLEM" / "THE FIX" / "PROBLEM → FIX"). Eyebrows compensate for the bigger size with `uppercase` + `tracking-[0.18em]` so they still read as labels, not headlines.

`text-xs` and `text-sm` are reserved for one specific use only: **in-illustration micro-info** inside the product-UI "screenshots" (`Window` panels) — chips, status pills, ticker rows, the `[1778659284]` timestamp prefix, the `CHECK` tag, etc. Inside the window the reader interprets the type as a tiny product UI, not as page typography.

If you find yourself wanting `text-sm` on visible page copy, the answer is "no — bump it to `text-base`."

### Illustration philosophy (ux-031)
The product-UI panels (`CalendarPanel` / `ConfigPanel` / `ReviewPanel` / `HandoffPanel`) read as **clean recordings of the actual product** — real-feeling window panels, real-typed mono values, real status pills. They are explicitly NOT whimsical schematics. The previous version had factory metaphors (gears, pistons, conveyor) — those were thrown out.

The live feeling comes from:

- Real UI choreography (rows settling in, a blinking type caret in `ConfigPanel`, a `pulse` ring on the active day in `CalendarPanel`, dashes flowing along the connector wires, dot "packets" travelling the spine).
- Density (skeleton bars, gutter dots on flagged rows, column headers, progress meters, cell refs like `C3`).
- Monochrome (`currentColor` + white fills + subtle `drop-shadow`).

All animations collapse under `prefers-reduced-motion` (`motion-reduce:[animation:none]` for dashes; `motion-reduce:hidden` for packet dots so they don't freeze on one spot).

### Composition
- The whole page sits inside `SHELL = "mx-auto w-full max-w-[1280px] px-6 sm:px-16"` — every section, nav, footer aligns at ≤ 1280 px content with a fixed 64 px gutter on `sm+`, 24 px on mobile.
- Pipeline (`HowItWorks`) is a `lg:grid-cols-[1.15fr_0.85fr]` grid — ~58 % panel column / ~42 % caption column.
- ProblemFix is a `grid-cols-12 gap-x-6` grid: problem card `lg:col-span-5` · connector `lg:col-span-2` · fix card `lg:col-span-5`.

## 5. The flow-connector vocabulary

This page has FIVE places where the same "dashed line with packet dots" motif appears. Read this section before touching any of them — they share keyframes and visual rules.

### The keyframes (in `src/index.css`)

| Keyframe | What | Used by |
|---|---|---|
| `cdnFlow` | `stroke-dashoffset: 0 → -10` | All dashed SVG `<line>`s — wire is `strokeDasharray="2 8"` (one period = 10) on a `vectorEffect="non-scaling-stroke"`, so dash size stays constant at any wire length and the loop is seamless. |
| `cdnPacket` | `top: 0% → 100%`, fades in/out at the ends | Vertical packet dots — CSS spans riding inside a `relative` container. Used by `FlowConnector` (the vertical version). |
| `cdnPacketH` | `left: 0% → 100%`, fades in/out | Horizontal packet dots — CSS spans riding a horizontal connector. Used by `ProblemFix` desktop. |
| `cdnRide` | `translateY(0 → 7rem)` | Legacy from the very first pipeline (no longer used; leave in place — file carries unrelated WIP). |
| `cdnSpin` | `rotate(0 → 360deg)` | Was used by a removed `ProcessGraphic` gear. Unused now. |

### Vertical flow connector — the `FlowConnector` component

Exported from `src/components/sections/cadence-pipeline.tsx`. Caller sizes and positions it via `className` (it spreads onto the outer wrapper). Use:

```tsx
<FlowConnector
  dots={3}
  className="absolute -bottom-4 -top-4 left-1/2 w-4 -translate-x-1/2"
/>
```

Inside the component, the SVG is `viewBox="0 0 4 100"` with `preserveAspectRatio="none"` and an inner `relative size-full` for absolute children — packet dots are CSS `<span size-1.5 rounded-full>` with `cdnPacket`. The line itself uses `y1="-4"` `y2="104"` so it bleeds a hair past both ends — it visually meets the panel borders with no hairline gap.

Used in:
- Inter-panel desktop connectors in `CadencePipeline` (with `chip` overlaid in the centre).
- The mobile vertical line inside each caption (`-top-6 -bottom-20 right-4`) — bleeds up into the inside-pair gap and down through the between-pair gap.
- The mobile vertical line inside each `ProblemFix` problem-card (`top-full h-12`) — top edge touches the card, bottom edge touches the fix-card below.

### Horizontal flow connector — inline SVG + CSS dots

Used inside `ProblemFix` desktop only. The wire is a `<svg viewBox="0 0 100 4">` with two `<line>`s (faint base wire + flowing dashes) — `x1="-50" x2="150"` so the wire bleeds 50 % of cell width past each side, far enough to overshoot the `gap-x-6` AND punch into the card interior; the cards' `z-10` covers the bleed so the wire visibly ENDS at each card's border with no hairline gap.

Dots are NOT SVG circles — they are CSS `<span size-1.5 rounded-full>` animating `left: 0% → 100%` via `cdnPacketH`. Three dots staggered `0 / -0.8s / -1.6s` so there's always one packet on the wire.

### The fork in `HandoffPanel`

Two paths plus a stem (`M50 0 V16` + two Béziers down to `(25, 44)` and `(75, 44)`). Wire is the same `cdnFlow` dashed treatment; packet dots are SVG `<ellipse rx="0.7" ry="1.83">` riding the paths via `<animateMotion>` with `rotate="0"`. The fork stem touches the bottom of the Window header; each branch touches the top of its BranchCard (the SVG is `absolute`, bleeds `-top-5 -bottom-4 sm:-top-6 sm:-bottom-5` to absorb the panel's padding and gap).

## 6. Technical decisions you must NOT re-litigate

These were settled the hard way. Don't undo them.

### `preserveAspectRatio="none"` distorts every SVG shape

When an SVG uses `viewBox="0 0 X Y"` + `preserveAspectRatio="none"` to stretch to a container, **the line stays straight, the dasharray stays constant (via `vectorEffect="non-scaling-stroke"`), but circles, ellipses, and any shape inside the viewBox get squashed** in proportion to the container/viewBox aspect ratio mismatch.

Two ways to deal with it:

1. **Cancel the stretch with an `<ellipse>` whose `rx/ry` ratio is the inverse of the container's aspect ratio.** Works only when the container has a known, roughly constant aspect ratio. Used on the `HandoffPanel` fork (container has a fixed-via-bleed height, X/Y ratio is consistent → `<ellipse rx="0.7" ry="1.83">` reads round at ~640×108 px desktop).
2. **Move the dots out of SVG entirely** into CSS `<span size-1.5 rounded-full>` and animate them with CSS keyframes. Works when the dots travel a straight line (no path curvature). Used on the ProblemFix horizontal connector — at any cell width the `<span>` stays perfectly round.

**Don't replace `<circle>` with `<circle>` and hope a different `r` will fix it. It can't.**

### `display:contents` for pair-bundling broke desktop

A previous iteration wrapped panel + caption in `<div className="grid gap-y-6 lg:contents">` to make a "tight inside-pair, big between-pair" rhythm on mobile while letting desktop's 2-col grid see the cells directly. **It broke the inter-panel connector on desktop** (whether via grid auto-placement edge cases or something else — never fully diagnosed, just reverted).

Current approach: keep panel and caption as **direct Fragment children** of the outer grid; non-last captions get a mobile `mb-14 lg:mb-0` to add the between-pair distance. Same visual rhythm, no `lg:contents` weirdness. **Don't bring `lg:contents` back here.**

### `isolate` on the pipeline outer grid is CRITICAL

The desktop inter-panel connector cell uses `relative -z-10` so its wire bleed tucks behind the opaque panels. **Without `isolation: isolate` on the `CadencePipeline` outer grid**, that `-z-10` escapes into body's stacking context and gets covered by the App wrapper's `bg-background` paint → connector invisible.

Same trick on ProblemFix rows (`isolate` on the row grid + `relative z-10` on the cards). The cards' `z-10` is what hides the connector's `x1=-50 x2=150` bleeds at each card's edge.

If you ever see "the connector disappeared, but the chip is still where it should be" — your `isolate` is missing somewhere.

### Caption centres against the PANEL, not against `panel + connector`

`CadencePipeline` lays out three siblings per Fragment on lg+: panel (col 1), caption (col 2, `lg:self-center`), connector (its own row, `lg:col-span-2` with nested grid mirroring the outer template). Row height = panel height alone → `self-center` pins the caption to the panel's vertical middle. Don't merge the connector back into the panel cell — it ruins the centring.

### The connector cell uses a nested grid with the same track template

```tsx
className="hidden lg:col-span-2 lg:grid lg:grid-cols-[1.15fr_0.85fr] lg:gap-x-16"
```

This puts the wire under the panel column — visually it stays on the page's vertical spine. The min-height (`lg:min-h-[14rem]`) goes on the INNER positioning div, not on the outer cell — outer is `lg:grid` and reserves the height but doesn't propagate it down to a single-cell-content inner without explicit `min-h`.

### Cloudflare deploy is gated on Ivan's explicit "deploy" / "publish"

This repo doesn't auto-deploy. If you push to `main` (per workflow), publishing to Cloudflare Pages requires Ivan to say so. Don't presume.

## 7. How Ivan works — feedback patterns

- He gives feedback iteratively, **mostly via screenshots**. Read them carefully — small details (a 16 px offset, a horizontal-vs-vertical ellipse) matter a lot.
- He cares about **physical contact between elements** — lines that "almost touch" a card edge read as broken. Bleed wire into the card and let the card's bg/z hide the overshoot.
- He values **equal rhythm** on mobile — if there are 4 spacings on a page, all four had better be equal unless the difference is *intentional* (e.g. inside-pair vs between-pair).
- He uses `hard-reload` to bust HMR — sometimes a fix you applied "doesn't work" because Vite's HMR mis-applied state. If a fix looks right in the source but the screen disagrees, ask him to hard-reload.
- He's not strict about asking permission. Auto-commit per logical unit; don't ask "should I commit?" / "should I push to feature?". Don't deploy without explicit "deploy".
- He's strict about: **never invent data** (numbers, names, cases — placeholder is fine only if he says "use placeholder"); **respect text-base floor** (ux-037); **never delete files without asking**.

## 8. Conventions for your work

- **Read this doc first.** That's the contract.
- **Read** `src/AppCadence.tsx` and `src/components/sections/cadence-pipeline.tsx` end-to-end before editing UI. They are heavily commented — the comments encode the decisions in §6.
- **Typecheck before commit**: `pnpm run typecheck` (or `pnpm build` for a full smoke).
- **Auto-commit per logical unit** with descriptive messages. Multi-paragraph commit messages are fine and welcome.
- **Don't introduce new colors.** Use semantic tokens. Status dots only.
- **Stay on the `text-base` floor.** Outside the Window panels.
- **Reuse `FlowConnector`** for new connectors when geometry allows. Only roll your own SVG when the geometry doesn't fit (e.g. horizontal connector, fork).
- **Hard-reload before you trust HMR.** If unsure, ask Ivan to hard-reload + screenshot.

## 9. Open backlog (snapshot at fork date, 2026-05-13)

These are known issues Ivan flagged before this repo was forked. Some may already be addressed; check the screen first.

- **`ConfigPanel` is taller than the other three 16:9 panels** (9 field rows + footer + ticker need ≈ 470 px vs ≈ 352 px for a 16:9 frame). Ivan wants equal heights — that needs `ConfigPanel` compacted (fewer rows / drop the ticker / smaller text). Separate pass.
- **Inner panel sub-surfaces** (`ConfigPanel` footer/ticker, `BranchCards` — `bg-foreground/[0.04]`) read very faint over the opaque `bg-background` panels. Bump them if Ivan says washed out.
- **Real per-step copy** for `CADENCE_CAPTIONS` and the "what's happening" transition pills — currently placeholder. Ivan is preparing project data in a parallel session.
- **i18n** — page is EN only. Lift COPY into `i18n/dict.ts` when RU is requested.
- **CTAs** all point to `https://t.me/blabbing` (placeholder) — swap to Ivan's real Telegram handle before launch.
- **Product name** — page copy says "Bonus Agent"; route is `/` (formerly `/products/cadence`). Open question whether the public name is "Bonus Agent" or "Cadence" or something else.

## 10. Links

- This repo: <https://github.com/ivanprotsko/upready-cadence> (private).
- Parent project & full history: `/Users/ivanprotsko/upready/projects/ivanprotsko.com/HANDOFF.md` (the section `## Snapshot — 2026-05-13 — /products/cadence`).
- Design system anchors (in the parent monorepo): `/Users/ivanprotsko/upready/specs/BLOCK-SPEC.md` and `/Users/ivanprotsko/upready/docs/reference/ivan-ux-patterns.jsonl` (search for `ux-031`, `ux-032`, `ux-034`, `ux-037`).
- Design-log entries that produced this layout: `/Users/ivanprotsko/upready/docs/design-log/ivanprotsko.com/2026-05-13_*` (12 entries from this single day's work).

---

**TL;DR:** monochrome single-page Vite/React/Tailwind landing for an iGaming AI agent product. Read the comments in the source. Don't break `isolate` on the pipeline grid. Stay at `text-base` floor. Don't deploy without "deploy".
