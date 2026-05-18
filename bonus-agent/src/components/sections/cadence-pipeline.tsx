/**
 * CadencePipeline — the "how it works" illustration + step notes for
 * /products/cadence.
 *
 * Four product panels, read top → bottom, joined by a centred connector with a
 * token dot riding each segment and a chip parked on it; the last one forks into
 * the two handoff options. Each panel is a glassmorphic window worked out in our
 * tailark style — real-feeling product UI, not a schematic. Owns a 2-column grid
 * so every panel sits level with its own short note on the right (~9 : 3); on
 * mobile each panel is followed by its note.
 *
 *   01 · promo calendar — the spreadsheet the team keeps; the agent reads a cell
 *   02 · Promo Engine config    — 25+ fields auto-filled, three flagged for a human
 *   03 · batch review   — every campaign, planned → filled
 *   04 · handoff        — fork: Moderated (a manager approves) / Direct (into Promo Engine)
 *
 * Caret + dots drop under prefers-reduced-motion.
 *
 * The panel components and CADENCE_CAPTIONS are exported so the layout variants
 * (/products/cadence/v2, /v3) can reuse the same blocks and copy.
 */
import { Fragment, useEffect, useState, type ReactNode } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { CheckmarkCircle02Icon, Tick01Icon } from "@hugeicons/core-free-icons"

export type CadenceCaption = { n: string; title: string; body: string }

/** PLACEHOLDER step notes — short copy beside each block. Swap for the real
 *  per-step text from the project brief once it lands. */
export const CADENCE_CAPTIONS: readonly CadenceCaption[] = [
  {
    n: "01",
    title: "Reads your promo calendar",
    body: "Picks the right row — channel, segment, dates — and expands the offer string into structured values.",
  },
  {
    n: "02",
    title: "Types the Promo Engine config",
    body: "25+ fields auto-filled against your per-currency limits and the schema; the handful that need a human are flagged.",
  },
  {
    n: "03",
    title: "Reviews the whole batch",
    body: "Planned vs filled, every campaign side by side — one screen instead of clicking Promo Engine row by row.",
  },
  {
    n: "04",
    title: "Hands off your way",
    body: "Moderated — a manager approves before it ships. Direct — straight into Promo Engine. You pick, per brand.",
  },
]

/** PLACEHOLDER "what's happening" captions for the gaps between illustration
 *  panels (3 — 01→02 / 02→03 / 03→04). Deliberately non-technical, so the
 *  connector reads as "real work being done", not a debug log. Swap later. */
export const CADENCE_TRANSITIONS: readonly string[] = [
  "Reading this week's promo plan",
  "Filling the config — checking it against your limits",
  "Assembling the batch for handoff",
]

/* ── content ────────────────────────────────────────────────────────────── */
const DAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"]
const CAL_ROWS: Array<{ label: string; filled: number[]; active?: number }> = [
  { label: "Channel", filled: [0, 1, 2, 3, 4] },
  { label: "Segment", filled: [0, 2, 4] },
  { label: "Offer", filled: [1, 2, 4], active: 2 },
  { label: "Promo", filled: [2, 4] },
]
const CAL_LITERAL = "“85% up to €500 + 100 FS · md 100 · 24h”"

// [field, value, flaggedForHuman]
const FIELDS: Array<[string, string, boolean]> = [
  ["title", "Welcome back · 85%", false],
  ["trigger", "deposit", false],
  ["bonus_percent", "85", false],
  ["freespin_count", "100", false],
  ["max_amount", "€ 500", true],
  ["min_dep", "€ 100", true],
  ["currency", "EUR · PLN", true],
  ["wager", "x40", false],
]
const TYPING: [string, string] = ["promocode", "BACK85"]

const TICKER = [
  "→ parse offer · " + CAL_LITERAL,
  "✓ schema · 25 fields · 0 invalid",
  "⚑ flag for review · max_amount, min_dep, currency",
  "→ apply per-currency limits · EUR, PLN",
  "✓ campaign 14/17 · ready for review",
]

// [campaign, field, planned, filled]
const REVIEW: Array<[string, string, string, string]> = [
  ["Mon · AM", "wager", "x40", "x40"],
  ["Mon · PM", "max_amount", "€ 500", "€ 500"],
  ["Tue", "currency", "EUR · PLN", "EUR · PLN"],
  ["Wed", "min_dep", "€ 100", "€ 100"],
]

// Last chip used to be "→ batch of 17" (a product-UI data token riding the
// wire); it's now the marketing tagline for the fork step below, since the
// handoff panel dropped its in-panel caption when it lost the Window chrome.
const PANEL_CHIPS = ["85% · €500 · x40", "✓ 25 fields valid", "handoff — you choose, per brand", null] as const
export const CADENCE_PANELS = [CalendarPanel, ConfigPanel, ReviewPanel, HandoffPanel] as const

/* ── component ──────────────────────────────────────────────────────────────
   Two columns on `lg+` — the 16:9 panel on the left (~58%), its numbered caption
   on the right (~42%), the caption centred against the *panel* (not against
   panel + connector). The grid lays out three siblings per fragment: a panel
   cell (col 1), a caption cell (col 2, `lg:self-center` → centred in the row,
   whose height = the panel's), and a connector cell that takes its own row
   (`lg:col-span-2`, with `lg:gap-y-0` flushing it against the panels above
   and below). The connector cell nests its own grid with the SAME track
   template (`lg:grid-cols-[1.15fr_0.85fr] lg:gap-x-16`) so the wire sits in
   the inner col 1 — visually under the panel column, centred on the panel's
   vertical axis. The wire still gets a `-top-4 -bottom-4` bleed so it overlaps
   the panel edges (no hairline gap); `relative -z-10` on the connector cell
   tucks that overlap behind the opaque `bg-background` panels.

   Mobile (`<lg`): one column. Outer grid `gap-y-6` puts a tight 1.5 rem
   between every visible cell (panel↔caption inside a pair). Each non-last
   caption gets an extra `mb-8` (2 rem) — combined with the outer 1.5 rem,
   that yields 3.5 rem from caption.bottom to the next panel.top: the
   between-pair gap reads bigger than the inside-pair gap, so each caption
   still visibly belongs to the panel above it. A mobile-only vertical flow
   line sits inside the caption cell on the RIGHT side (`-top-6 -bottom-14
   right-3 w-6 …`): it bleeds 1.5 rem up into the inner pair-gap so the
   line meets the panel above, and 3.5 rem down so it meets the panel
   below — turning the gap into a visible connector. The caption text
   gets `pr-8` so the line sits in dedicated empty space on the right,
   never crossing the type. */
export function CadencePipeline({ captions }: { captions: readonly CadenceCaption[] }) {
  return (
    // `isolate` is CRITICAL: the connector cells use `-z-10` so the wire's
    // bleed tucks behind the opaque panels. Without `isolation: isolate` on
    // this grid, `-z-10` escapes into body's stacking context and the wire
    // ends up BEHIND the App wrapper's `bg-background` — invisible. With
    // `isolate` here the `-z-10` is scoped to this grid's SC, the wire
    // paints against this grid (transparent) and the panels' `z-10` still
    // paint over the bleed.
    <div className="isolate grid gap-y-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-x-16 lg:gap-y-0">
      {CADENCE_PANELS.map((Panel, i) => {
        const chip = PANEL_CHIPS[i]
        const c = captions[i]
        const last = i === CADENCE_PANELS.length - 1
        return (
          <Fragment key={i}>
            {/* Panel — col 1 of its row on lg+. The row's height = the
                panel's, so the caption next to it can centre against the
                *panel*. */}
            <div
              className="relative z-10 opacity-0 [animation:fadeFloat_0.9s_ease-out_forwards] motion-reduce:[animation:none] motion-reduce:opacity-100"
              style={{ animationDelay: `${i * 0.16}s` }}
            >
              {/* 16:9 (1280×720) — the panel reads as a browser-window screenshot, scaling with the column */}
              <PanelStage ratio="16/9">
                <Panel />
              </PanelStage>
            </div>
            {/* Caption — col 2 on lg+, same row as the panel, vertically
                centred against it (`lg:self-center`). On mobile the text
                is shifted left (`pr-8`) so the mobile vertical flow line
                (rendered just below) has its own 16 px column to live in
                on the RIGHT side of the caption, never crossing the type.
                Non-last captions get a mobile `mb-14` (3.5 rem) so the gap
                to the next panel reads BIGGER than the inside-pair gap
                (1.5 rem). The step number recedes (`text-foreground/30`). */}
            <div
              className={
                "relative flex flex-col gap-4 pr-8 opacity-0 [animation:fadeUp_0.6s_ease-out_forwards] motion-reduce:[animation:none] motion-reduce:opacity-100 lg:gap-6 lg:pr-0 lg:self-center" +
                (!last ? " mb-8 lg:mb-0" : "") +
                // HandoffPanel (last) has a fork-connector at the TOP of
                // the panel that eats ~84 px (spacer h-16 + outer gap-5)
                // before the BranchCards start. With `lg:self-center` the
                // caption centres against the WHOLE panel row — including
                // the fork — so it sits above the cards' visual centre.
                // `translate-y` (not margin) shifts the caption purely
                // visually without growing the grid-cell margin box —
                // `align-self: center` would otherwise absorb half of any
                // margin-top back into its own centring math.
                (last ? " lg:translate-y-10" : "")
              }
              style={{ animationDelay: `${i * 0.16 + 0.08}s` }}
            >
              <span className="text-base font-medium uppercase tracking-[0.18em] tabular-nums text-muted-foreground">step {c?.n}</span>
              <h3 className="text-balance text-3xl font-semibold leading-tight text-foreground sm:text-4xl lg:text-5xl">
                {c?.title}
              </h3>
              <p className="text-balance text-lg leading-relaxed text-muted-foreground lg:text-xl">{c?.body}</p>
              {/* Mobile-only vertical flow line — runs from the bottom of
                  the panel above (via `-top-6` = outer inside-pair gap-y-6)
                  down to the top of the next pair's panel (via `-bottom-14`
                  = caption `mb-8` + outer gap-y-6 = 3.5rem). Lives `right-3`
                  (12 px from the caption's right edge); text is offset by
                  `pr-8` (32 px), so line sits in dedicated empty space,
                  never crossing the type. Width bumped from w-4 → w-6 so the
                  pipeline metaphor reads on narrow viewports. */}
              {!last && (
                <FlowConnector
                  dots={3}
                  className="pointer-events-none absolute -bottom-14 -top-6 right-3 w-6 translate-x-1/2 lg:hidden"
                />
              )}
            </div>
            {/* Desktop connector — its own grid row on `lg+` (full-width via
                `col-span-2`), with a nested grid mirroring the outer track
                template so the wire stays under the panel column. Hidden on
                mobile (`hidden lg:grid` — display:none collapses the row, so
                gap-y doesn't double up between mobile panel/caption pairs).
                IMPORTANT: `lg:min-h-[14rem]` MUST sit on the INNER positioning
                div, not on the outer `lg:grid` cell — the inner div holds no
                regular content (only absolute children), so without an
                explicit min-height it collapses to 0 in the nested grid row
                and the FlowConnector's `-top-4 -bottom-4` bleed renders as a
                ~2rem stub. With min-h on the inner div the row sizes to 14rem
                and the bleed reaches both panels above and below. */}
            {!last && (
              <div
                aria-hidden
                className="relative -z-10 hidden lg:col-span-2 lg:grid lg:grid-cols-[1.15fr_0.85fr] lg:gap-x-16"
              >
                <div className="relative lg:min-h-[14rem]">
                  <FlowConnector
                    dots={3}
                    className="absolute -bottom-4 -top-4 left-1/2 w-4 -translate-x-1/2"
                  />
                  {chip !== null && (
                    // z-10 lifts the chip above the dot-packets that ride the
                    // connector wire (otherwise solid white dots momentarily
                    // sit ON the chip text as they pass).
                    <span className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
                      <Chip text={chip} />
                    </span>
                  )}
                </div>
              </div>
            )}
          </Fragment>
        )
      })}
    </div>
  )
}

/* ── panels ─────────────────────────────────────────────────────────────── */

export function CalendarPanel() {
  return (
    <Window file="promo-calendar · this week" caption="retention · promo">
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="grid grid-cols-[64px_repeat(7,minmax(0,1fr))] gap-1.5 pb-2">
          <span aria-hidden />
          {DAYS.map((d) => (
            <span key={d} className="text-center font-mono text-[11px] text-muted-foreground/50">
              {d}
            </span>
          ))}
        </div>
        <div className="flex flex-1 flex-col justify-evenly gap-2">
          {CAL_ROWS.map((row, r) => (
            <div key={row.label} className="grid grid-cols-[64px_repeat(7,minmax(0,1fr))] items-center gap-1.5">
              <span className="truncate font-mono text-xs text-muted-foreground/60">{row.label}</span>
              {DAYS.map((_, c) => {
                const filled = row.filled.includes(c)
                const active = row.active === c
                return (
                  <span
                    key={c}
                    // Active cell is an inverted tile — `bg-primary` (theme
                    // swaps cleanly) with a slow `animate-pulse` so the eye
                    // catches it without the old ring-outline aliasing
                    // against the cell's own corner radius. Decorative lines
                    // inside flip to `bg-primary-foreground/70` for contrast
                    // against the inverted fill.
                    className={
                      "relative flex h-10 flex-col justify-center gap-1.5 rounded-md px-2 sm:h-12 " +
                      (active
                        ? "bg-primary animate-pulse motion-reduce:animate-none"
                        : filled
                          ? "bg-foreground/5"
                          : "bg-foreground/[0.04]")
                    }
                  >
                    {filled &&
                      [0, 1].map((ln) => (
                        <span
                          key={ln}
                          className={
                            "block h-[3px] rounded-full " +
                            (active ? "bg-primary-foreground/70" : "bg-foreground/20")
                          }
                          style={{ width: `${[82, 56][ln] - ((c + r + ln) % 3) * 12}%` }}
                        />
                      ))}
                  </span>
                )
              })}
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-baseline gap-2.5 border-t border-border pt-3 font-mono text-xs">
          <span className="text-muted-foreground/50">C3</span>
          <span className="truncate text-foreground/80">{CAL_LITERAL}</span>
        </div>
      </div>
    </Window>
  )
}

export function ConfigPanel() {
  const rows = [
    ...FIELDS.map(([k, v, f]) => ({ k, v, flagged: f, typing: false })),
    { k: TYPING[0], v: TYPING[1], flagged: false, typing: true },
  ]
  return (
    <Window file="campaign · promo-engine-config" status="auto-filling" pulse>
      <div className="flex flex-1 flex-col justify-evenly gap-1.5 p-5 font-mono text-sm leading-relaxed sm:p-6">
        <div className="pb-1 text-xs uppercase tracking-wider text-muted-foreground/55">
          deposit-cash · brand aurora · row 14
        </div>
        {rows.map((row) => (
          <div key={row.k} className="flex items-center gap-3.5">
            <span className="inline-flex w-2.5 shrink-0 justify-center">
              {row.flagged && <span className="size-2 rounded-full bg-foreground" aria-hidden />}
            </span>
            <span className={"w-[34%] shrink-0 truncate " + (row.flagged ? "text-muted-foreground" : "text-muted-foreground/65")}>
              {row.k}
            </span>
            <span className="flex-1 truncate text-foreground/90">
              {row.v}
              {row.typing && (
                <span
                  aria-hidden
                  className="ml-0.5 inline-block h-4 w-2 translate-y-px bg-foreground [animation:blink_1.05s_steps(1)_infinite] motion-reduce:[animation:none]"
                />
              )}
            </span>
            {row.flagged && (
              <span className="shrink-0 rounded-full bg-foreground/[0.06] px-2 py-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">
                check
              </span>
            )}
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between gap-4 border-t border-border px-5 py-3 font-mono text-xs sm:px-6">
        <span className="text-muted-foreground">
          12 / 25+ fields · <span className="text-foreground">3 flagged for a human</span>
        </span>
        <span className="h-1.5 w-28 shrink-0 overflow-hidden rounded-full bg-foreground/15">
          <span className="block h-full w-[48%] rounded-full bg-foreground" />
        </span>
      </div>
      <Ticker lines={TICKER} />
    </Window>
  )
}

export function ReviewPanel() {
  const cols = "grid-cols-[1.1fr_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_auto]"
  return (
    <Window file="batch-review · 17 campaigns" caption="planned → filled">
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className={`grid ${cols} gap-x-3 border-b border-border pb-2 font-mono text-[10px] uppercase tracking-wider text-muted-foreground/45`}>
          <span>campaign</span>
          <span>field</span>
          <span>planned</span>
          <span>filled</span>
          <span aria-hidden> </span>
        </div>
        <div className="flex flex-1 flex-col justify-evenly">
          {REVIEW.map(([c, f, p, fl]) => (
            <div key={c} className={`grid ${cols} items-center gap-x-3 border-b border-border py-2.5 font-mono text-[13px] last:border-b-0`}>
              <span className="truncate text-muted-foreground/80">{c}</span>
              <span className="truncate text-muted-foreground/65">{f}</span>
              <span className="truncate text-muted-foreground/45">{p}</span>
              <span className="truncate text-foreground/90">{fl}</span>
              <HugeiconsIcon icon={CheckmarkCircle02Icon} className="size-4 shrink-0 text-foreground" aria-hidden />
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-center justify-between font-mono text-[11.5px] text-muted-foreground">
          <span>5 of 17 shown</span>
          <span>3 flagged for a human</span>
        </div>
      </div>
    </Window>
  )
}

export function HandoffPanel() {
  return (
    // No browser-chrome wrapper here: the two branch cards ARE the panel,
    // so they stand at the PanelStage 16:9 height (matching the ReviewPanel
    // Window above) instead of nesting inside one. The prior `lg:min-h-[28rem]`
    // (~3rem above 16:9) pushed the cards taller than the caption block on
    // the right, so the caption read off-centre against them — dropped, the
    // panel now sits at the same 16:9 footprint as the rest.
    <div className="relative flex h-full flex-col gap-4 sm:gap-5">
        {/* Fork connector — dashed + animated + packet dots, in the same vocabulary as
            FlowConnector (faint base wire + cdnFlow dashes on a non-scaling stroke +
            an SVG `<animateMotion>` packet riding each path). `rotate="0"` on every
            animateMotion so the riders don't tilt along the tangent (ux-031).

            Two geometries: < lg picks up the caption's right-side vertical
            FlowConnector — top-right stem at x≈96, quarter-bend into a horizontal
            bar, vertical drops onto each BranchCard, so the pipeline reads as one
            continuous wire down the right side and then forks. lg+ keeps the
            centred tree (M50 0 V16 stem with two symmetric Béziers down to (25,44)
            / (75,44)) since the right vertical line is `lg:hidden` and the desktop
            connectors run centred between panels. */}
        <div aria-hidden className="pointer-events-none relative h-11 shrink-0 sm:h-16">
          <div className="absolute inset-x-0 -bottom-4 -top-5 sm:-bottom-5 sm:-top-6">
            {/* < lg — two drop verticals only. The horizontal bus is no
                longer drawn inside this SVG: a full-width SVG horizontal
                produces a visible LEFT TAIL (from panel x=0 to the left
                drop at x=25%, ≈25% of the panel width) and overshoots
                the right caption FlowConnector by ~12px. Instead, the
                horizontal is an HTML element below — positioned exactly
                from `left-1/4` (= 25% of panel width = left drop center)
                to `right-3` (= 12px from panel right = caption
                FlowConnector center), so it terminates AT both verticals
                instead of running past them. This SVG keeps the drops at
                x=25/x=75 so they still line up with Moderated/Direct
                card centers in the 2-col grid below. */}
            <svg viewBox="0 0 100 44" preserveAspectRatio="none" className="block size-full lg:hidden">
              <g className="text-foreground/20">
                <path d="M25 11 V44" fill="none" stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
                <path d="M75 11 V44" fill="none" stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
              </g>
              <g
                className="text-foreground/60 [animation:cdnFlow_0.9s_linear_infinite] motion-reduce:[animation:none]"
                style={{ animationDelay: "-0.45s" }}
              >
                <path d="M25 11 V44" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 8" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
                <path d="M75 11 V44" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 8" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
              </g>
            </svg>
            {/* Horizontal bus — HTML-positioned so the line spans EXACTLY
                from the left drop (`left-1/4` = 25% of panel width =
                Moderated drop center, aligned with the SVG's x=25 V44
                drop above) to the right caption FlowConnector (`right-3`
                = 12px from panel right = caption FlowConnector center,
                matching its own `right-3 w-6 translate-x-1/2` placement
                on the panel above). Sits at `top-1/4` (= 25% of the bled
                container's height) so it lands at the same y as where
                the SVG's viewBox y=11 used to render. `-translate-y-1/2`
                centres the line on that mark. The inner SVG draws the
                static base wire + the cdnFlow dashes (path drawn R→L so
                dashes flow leftward, matching the packet dots). The HTML
                packet dots now ride this narrowed track too, so they
                travel only between the two vertical lines instead of
                across the full panel width. */}
            <div className="pointer-events-none absolute left-1/4 right-3 top-1/4 h-1.5 -translate-y-1/2 lg:hidden">
              <svg viewBox="0 0 100 2" preserveAspectRatio="none" className="absolute inset-0 block size-full overflow-visible">
                <line x1="0" y1="1" x2="100" y2="1" stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke" className="text-foreground/20" />
                <line
                  x1="100"
                  y1="1"
                  x2="0"
                  y2="1"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeDasharray="2 8"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                  className="text-foreground/60 [animation:cdnFlow_0.9s_linear_infinite] motion-reduce:[animation:none]"
                />
              </svg>
              {/* HTML packet dots — confined to the same narrowed track,
                  `[animation-direction:reverse]` flips cdnPacketH so dots
                  travel right→left between the two verticals. */}
              <div aria-hidden className="absolute inset-0 motion-reduce:hidden">
                {[0, -0.8, -1.6].map((delay, i) => (
                  <span
                    key={i}
                    style={{ animationDelay: `${delay}s` }}
                    className="absolute top-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground shadow-[0_0_9px_2px_#ffffff33] [animation:cdnPacketH_2.4s_linear_infinite] [animation-direction:reverse]"
                  />
                ))}
              </div>
            </div>
            {/* lg+ — centred tree fork. preserveAspectRatio="none" stretches
                the viewBox unevenly (X-scale ≫ Y-scale), so a plain `<circle>`
                renders as a horizontal ellipse. We use `<ellipse>` with rx/ry
                tuned at the desktop panel column (~640 px wide, ~108 px tall
                with bleed): rx=0.7 ry=1.83 → displayed ≈ 4.5 × 4.5 px. */}
            <svg viewBox="0 0 100 44" preserveAspectRatio="none" className="hidden size-full overflow-visible lg:block">
              <g className="text-foreground/20">
                <path d="M50 0 V16" fill="none" stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
                <path d="M50 16 C 50 30 25 28 25 44" fill="none" stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
                <path d="M50 16 C 50 30 75 28 75 44" fill="none" stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
              </g>
              {/* flowing dashes (cdnFlow); branches phase-shifted half a cycle
                  so the dashes read as "stem feeds into both branches" rather
                  than one continuous tape */}
              <g className="text-foreground/60 [animation:cdnFlow_0.9s_linear_infinite] motion-reduce:[animation:none]">
                <path d="M50 0 V16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 8" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
              </g>
              <g
                className="text-foreground/60 [animation:cdnFlow_0.9s_linear_infinite] motion-reduce:[animation:none]"
                style={{ animationDelay: "-0.45s" }}
              >
                <path d="M50 16 C 50 30 25 28 25 44" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 8" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
                <path d="M50 16 C 50 30 75 28 75 44" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 8" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
              </g>
              <g fill="currentColor" className="text-foreground motion-reduce:hidden [filter:drop-shadow(0_0_2px_rgba(255,255,255,0.45))]">
                <ellipse rx="0.7" ry="1.83" opacity="0">
                  <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.12;0.88;1" dur="2.4s" repeatCount="indefinite" />
                  <animateMotion dur="2.4s" repeatCount="indefinite" rotate="0" path="M50 0 V16" />
                </ellipse>
                <ellipse rx="0.7" ry="1.83" opacity="0">
                  <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.12;0.88;1" dur="2.4s" begin="0.4s" repeatCount="indefinite" />
                  <animateMotion dur="2.4s" begin="0.4s" repeatCount="indefinite" rotate="0" path="M50 16 C 50 30 25 28 25 44" />
                </ellipse>
                <ellipse rx="0.7" ry="1.83" opacity="0">
                  <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.12;0.88;1" dur="2.4s" begin="0.4s" repeatCount="indefinite" />
                  <animateMotion dur="2.4s" begin="0.4s" repeatCount="indefinite" rotate="0" path="M50 16 C 50 30 75 28 75 44" />
                </ellipse>
              </g>
            </svg>
          </div>
        </div>
        <div className="grid flex-1 grid-cols-2 items-stretch gap-3.5">
          <BranchCard
            title="Moderated"
            tag="review step"
            desc="A manager reviews the batch and approves before it ships."
            chip="approve batch"
          />
          <BranchCard
            title="Direct"
            tag="autopilot"
            desc="The agent writes straight into Promo Engine — no middle step."
            chip="written to Promo Engine"
          />
        </div>
    </div>
  )
}

/* ── shared with the layout variants (/products/cadence/v2, /v3) ─────────── */

/**
 * Wraps a panel so the window stands at *at least* a fixed aspect ratio — the
 * panel reads as a screenshot, not a content card. Grid-cell trick: the box
 * height is max(<ratio> of its width, the panel's own content height), so the
 * short panels gain breathing room while a tall one (config) can still overflow
 * taller; the ratio scales with the column width but never distorts. v2/v3 use
 * the panels at content height and skip this; v4/v5 take the default 16:10; v1
 * passes 16:9 (1280×720 proportions).
 */
export function PanelStage({
  children,
  className = "",
  ratio = "16/10",
}: {
  children: ReactNode
  className?: string
  /** the box stands at *at least* this width:height; content can push it taller */
  ratio?: "16/10" | "16/9"
}) {
  // padding-top % = height / width: 16:10 → 62.5%, 16:9 → 56.25% (both literal so the JIT picks them up)
  const pad = ratio === "16/9" ? "before:[padding-top:56.25%]" : "before:[padding-top:62.5%]"
  return (
    <div
      className={`grid w-full before:block before:content-[''] before:[grid-area:1/1] ${pad} [&>*]:[grid-area:1/1] ${className}`}
    >
      {children}
    </div>
  )
}

/**
 * A thin vertical connector with data trickling down it — joins consecutive
 * illustration panels in the v2 / v3 layouts. It stretches to fill whatever box
 * it is dropped into (size + position it via `className`, e.g.
 * `absolute left-1/2 inset-y-0 w-4 -translate-x-1/2`); the stroke is
 * non-scaling so the dash size and flow speed stay constant however tall it
 * gets. Static dashes under prefers-reduced-motion.
 */
export function FlowConnector({
  className = "",
  dots = 0,
}: {
  className?: string
  /** how many small "packet" circles ride the wire into the next panel (0 = just the dashed stream) */
  dots?: number
}) {
  return (
    // the caller's className positions + sizes the outer box (e.g. `absolute
    // inset-y-0 left-1/2 w-4 -translate-x-1/2`); the inner div is the
    // positioning context for the line + dots, so the caller can freely pass
    // `absolute` without it colliding with a hard-coded `relative` in here
    <div aria-hidden className={className}>
      <div className="relative size-full">
        <svg
          viewBox="0 0 4 100"
          preserveAspectRatio="none"
          className="absolute inset-0 block size-full overflow-visible"
        >
          {/* faint always-there wire — terminates exactly at the container's
              top and bottom (y=0..100) so the line doesn't overshoot past
              its parent's bounds. Callers control position via the outer
              className: when the wire needs to "bleed" into a neighbouring
              element, do it via the wrapping container's `-top-X / -bottom-Y`
              (the wire then fills the now-extended container fully). */}
          <line
            x1="2"
            y1="0"
            x2="2"
            y2="100"
            stroke="currentColor"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
            className="text-foreground/35"
          />
          {/* the flowing dashes */}
          <line
            x1="2"
            y1="0"
            x2="2"
            y2="100"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray="2 8"
            vectorEffect="non-scaling-stroke"
            className="text-foreground/60 [animation:cdnFlow_0.9s_linear_infinite] motion-reduce:[animation:none]"
          />
        </svg>
        {dots > 0 &&
          Array.from({ length: dots }).map((_, i) => (
            <span
              key={i}
              className="absolute left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-foreground shadow-[0_0_9px_2px_#ffffff33] [animation:cdnPacket_3s_linear_infinite] motion-reduce:hidden"
              style={{ animationDelay: `${(-(i * 3) / dots).toFixed(2)}s` }}
            />
          ))}
      </div>
    </div>
  )
}

/* ── primitives ─────────────────────────────────────────────────────────── */

function Window({
  file,
  status,
  caption,
  pulse,
  children,
}: {
  file: string
  status?: string
  caption?: string
  pulse?: boolean
  children: ReactNode
}) {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-border bg-background">
      {/* Header strip — bg-foreground/5 tint creates the visual divide
          from the body below; no `border-b` because the line read more
          contrasty than the panel's outer border (light strip's edge
          against dark body painted it as a hard cut). The tint alone
          carries the separation. */}
      <div className="flex shrink-0 items-center justify-between gap-3 bg-foreground/5 px-5 py-3">
        <div className="flex shrink-0 items-center gap-1.5">
          <span className="size-2 rounded-full bg-muted-foreground/30" />
          <span className="size-2 rounded-full bg-muted-foreground/30" />
          <span className="size-2 rounded-full bg-muted-foreground/30" />
        </div>
        <span className="truncate font-mono text-xs text-muted-foreground/70">{file}</span>
        {status ? (
          <span className="flex shrink-0 items-center gap-1.5 font-mono text-xs text-muted-foreground/70">
            <span className={"size-1.5 rounded-full bg-foreground" + (pulse ? " animate-pulse motion-reduce:animate-none" : "")} />
            {status}
          </span>
        ) : caption ? (
          <span className="shrink-0 truncate font-mono text-[11px] uppercase tracking-wider text-muted-foreground/40">
            {caption}
          </span>
        ) : (
          <span aria-hidden className="w-10 shrink-0" />
        )}
      </div>
      <div className="flex flex-1 flex-col">{children}</div>
    </div>
  )
}

function BranchCard({ title, tag, desc, chip }: { title: string; tag: string; desc: string; chip: string }) {
  return (
    // Chrome-header strip mirrors the Window vocabulary used by the
    // illustration panels above (bg-foreground/5 + border-b border-border),
    // minus the traffic-light dots — the centred eyebrow is the only
    // header content. Body content centred (text-center, items-center).
    // Title demoted to text-xl/2xl so it sits BELOW the step-title scale
    // upstream (text-3xl mobile / text-5xl lg) — the option card is a
    // child of the step, not a peer (ux-039 v2: header strip allowed on
    // fork-step option cards as a marker of card-kind, not a fill).
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-border">
      {/* Header strip — see Window above; `border-b` dropped, tint
          alone carries the separation. */}
      <div className="flex shrink-0 items-center justify-center bg-foreground/5 px-5 py-3">
        <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground/70">
          {tag}
        </span>
      </div>
      <div className="flex flex-1 flex-col items-center gap-3 p-4 text-center sm:gap-4 sm:p-8">
        <span className="text-xl font-semibold leading-tight text-foreground sm:text-2xl">{title}</span>
        <p className="text-base leading-snug text-muted-foreground sm:text-lg">{desc}</p>
        {/* Inverted pill (bg-primary + text-primary-foreground) — bigger
            padding + icon to read confidently against the centred layout
            and chrome-header strip above. Hidden on mobile: the BranchCards
            are already narrow there and the chip wrapped to 2 lines, which
            read as visual noise on top of the title + desc already saying
            the same thing. sm+ keeps the chip — it lands on one line and
            anchors the centred body against being top-heavy (ux-041). */}
        <div className="mt-auto hidden w-fit items-center gap-2 rounded-full bg-primary px-4 py-2 font-mono text-sm text-primary-foreground sm:inline-flex">
          <HugeiconsIcon icon={Tick01Icon} className="size-4" aria-hidden />
          {chip}
        </div>
      </div>
    </div>
  )
}

function Chip({ text }: { text: string }) {
  // `relative z-10` lifts the chip above the connector's packet dots (which
  // are absolutely positioned siblings inside the same connector cell — the
  // dots otherwise show THROUGH the chip's near-transparent fill). Solid
  // primary fill matches the AfterFork chip style on the Pricing section
  // — the same visual vocabulary across the page.
  return (
    <span className="relative z-10 inline-flex items-center whitespace-nowrap rounded-full bg-primary px-4 py-2 font-mono text-sm text-primary-foreground">
      {text}
    </span>
  )
}

function Ticker({ lines }: { lines: readonly string[] }) {
  const [head, setHead] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setHead((h) => h + 1), 1500)
    return () => clearInterval(t)
  }, [])
  const visible = [0, 1, 2].map((i) => {
    const idx = ((head - i) % lines.length + lines.length) % lines.length
    return lines[idx]
  })
  const tone = ["text-foreground/80", "text-muted-foreground/55", "text-muted-foreground/30"]
  return (
    <div className="border-t border-border px-5 py-3 font-mono text-xs sm:px-6">
      <div className="flex flex-col gap-1">
        {visible.map((line, i) => (
          <div key={`${head}-${i}`} className={tone[i] + (i === 0 ? " [animation:fadeUp_0.4s_ease-out]" : "")}>
            <span className="text-muted-foreground/35">[{(Date.now() / 1000) | 0}]</span> {line}
          </div>
        ))}
      </div>
    </div>
  )
}
