# HANDOFF — upready-cadence

**Repo:** `file:///Users/ivanprotsko/upready/projects/upready-cadence/`
**Remote:** `https://github.com/ivanprotsko/upready-cadence.git` (private)
**Branch:** `main` — diverged from `origin/main` (**+34 local / +54 remote**)
**Tip:** `bcbd044` (2026-05-15 session 5 last commit)
**Dev:** `pnpm dev` → `http://127.0.0.1:3340/`
**Stack:** Vite 6 + React 19 + TypeScript + Tailwind v4 + shadcn (radix-nova preset) + hugeicons + `next-themes` for light/dark
**Last touched:** 2026-05-15 ~09:55 WITA (session 5 — Pricing polish: AfterFork dot refactor + anchor spine alignment + footnote removal + chip breathing + mobile chip drop)

Forked from `ivanprotsko.com /products/cadence v1` (starter commit `834e9b5`, 2026-05-13). Standalone pitch landing for **Bonus Agent** — automates ACMS bonus-campaign setup for iGaming CRM teams. The product UI shown inside the illustrations is real; the page itself is the sales surface.

---

## Snapshot — session 5 of 2026-05-15 (~09:55 WITA)

Pricing-block polish round driven by Ivan's screenshot feedback after session 4. Three commits. Two structural fixes (AfterFork dot squish across viewports, anchor paragraph spine alignment) + three composition trims (footnote callout removed, AfterFork chip breathing doubled, mobile branch chip dropped).

### What landed (in order)

| # | Commit | What |
|---|---|---|
| 1 | `0733787` | **AfterFork dots SVG → HTML offset-path.** Root cause: SVG `<ellipse rx ry>` packet dots squashed at narrower viewports because `preserveAspectRatio="none"` stretches viewBox X≫Y by a ratio that varies with container width — no single `rx`/`ry` value reads round at every breakpoint. Replaced with HTML `<span size-1.5 rounded-full>` riding CSS `offset-path: path(...)` where the path is recomputed in real pixels via `ResizeObserver` on the container. Real circles at any viewport. Static dashed lines stay in SVG (`vector-effect="non-scaling-stroke"` preserves stroke width under non-uniform stretch). Per `ux-031`: `offset-rotate: 0deg` on the vertical-stem ride. Same commit: primary after-card mobile `pt-5 → pt-10` so the DEFAULT-NEXT-STEP badge has breathing room; rewrote `poc.footnote` copy (dropped €5000 repeat, added €1000/mo floor + scaling factors). |
| 2 | `3388e08` | **Drop the footnote callout + anchor para aligned to spine.** Ivan: «давай вообще уберём этот блок» — the rewritten footnote was, on re-read, redundant with take-home + after-fork already telling the next-step story. Surface-1 footer band, `CheckmarkBadge01Icon` import, `max-w-3xl` centred wrap, and the `poc.footnote` field removed from EN/RU. **Same commit:** header reflow `lg:grid-cols-[auto_1fr] gap-x-12 → lg:grid-cols-3 gap-x-10`. Anchor paragraph spans cols 2-3 (`lg:col-span-2`) so its LEFT edge lands on the same vertical spine as Week 2 / 02 below; top pushed down with `lg:mt-10` to align with the €5000 digit-cap. Yellow-line guide image-64 → exact match. |
| 3 | `bcbd044` | **AfterFork chip breathing + mobile branch chip drop.** AfterFork container `sm:h-36 → sm:h-48` + chip `top-[30%] → top-[35%]`. Chip-top to card-bottom ≈ 51 px (was 27 px) — doubled. Stem still touches the card at y=0 (outer Reveal stays `mt-0`). Fork-dot clearance ≈ 0.8 rem below chip. BranchCard chip (`approve batch` / `written to ACMS`) hidden on mobile via `hidden sm:inline-flex` — wrapped to 2 lines on narrow column and read as visual noise duplicating title + desc. sm+ keeps it (one line, anchors centred body per `ux-041`). |

### Files touched (session 5)

```
src/AppCadence.tsx                            — AfterFork SVG-ellipse → HTML offset-path refactor; Pricing offer card top-region reflow (3-col grid); footnote removal; primary after-card mobile pt-5 → pt-10; AfterFork h-36 → h-48 + chip top-[30%] → top-[35%]; CheckmarkBadge01Icon import removed
src/components/sections/cadence-pipeline.tsx  — BranchCard chip hidden on mobile (hidden sm:inline-flex)
src/copy/en.ts                                — poc.footnote field removed
src/copy/ru.ts                                — poc.footnote field removed
```

### Visual / structural decisions logged session 5

- **HTML offset-path is option #3 for dots on curved SVG paths.** `docs/AGENT-CONTEXT.md` § 6 currently lists two ways to handle the `preserveAspectRatio="none"` ellipse-distortion problem: (1) inverse-aspect ellipse (only at constant aspect ratio); (2) HTML CSS dots on STRAIGHT lines. Session 5 demonstrates option (3): CSS `offset-path: path(...)` + `ResizeObserver` for live-pixel paths — works for curves too. **Update AGENT-CONTEXT.md when next docs pass happens.**
- **Pricing card ends on take-home, not on footnote callout.** The footnote was doing three jobs weakly (re-anchor price, scope ongoing, reassure no subscription) and the first job was redundant — the €5000 had been the 60 px headline directly above. Take-home + after-fork together cover the rest. Cleaner punctuation: card now ends on what you walk away with.
- **One vertical spine through the offer card body.** Anchor paragraph LEFT lands on Week 2 column-start (same `lg:grid-cols-3 gap-x-10` template used by Weeks and Take-home below). The 3-col template is the card's structural rhythm — header now obeys it too.
- **`mt-0` for stem-connection + bump container height for chip breathing.** When you need more chip-above space without losing stem-touches-card aesthetic, the right knob is container `h-X`, not Reveal `mt-X`. Chip moves down inside the fork, stem still starts at y=0 of the container.
- **Mobile fork-step decoration must be single-line or hidden.** A multi-line inverted pill on a ~150 px card reads as a card-within-a-card, not as a status marker. Hide on mobile, show on sm+ where it can stay on one line.

### Open threads / context to carry forward

- **AGENT-CONTEXT.md § 6** has 2 options for SVG-stretch dot distortion; session 5 unlocked a 3rd. Add it on next docs pass (or when next AfterFork-like component is built and the issue resurfaces).
- **Phase 4 Economics / Phase 6 Final CTA / Phase 7 Global polish** unchanged from session 4 — no direct Ivan feedback.
- **Walk-away cdnFlow flowing-dashes animation** unchanged — particles only.
- **Remote divergence widened to +37 / -54** vs `origin/main`. Same options as before (force-push / cherry-pick / park) — DO NOT touch without explicit ask.
- **Deploy not triggered.**

---

## Snapshot — session 4 of 2026-05-15 (~08:30 WITA)

Mobile composition refactor across every section of the landing, driven by Ivan's full-page mobile screenshots (image-37 / image-39 / image-40 / image-41 / image-43 / image-44–47 / image-48–50 / image-53 / image-56). The page was built desktop-first; mobile inherited desktop scale tokens that overwhelmed the narrow column. Plan written first (`~/.claude/plans/image-39-reactive-mochi.md`), then executed phase-by-phase.

### What landed (in order)

| # | Commit | Phase | What |
|---|---|---|---|
| 1 | `de40df2` | pre | session-3 HANDOFF snapshot (this section's predecessor) committed before any code work |
| 2 | `620fee2` | 1a-e | How-it-works core: step-numbers `text-6xl/7xl` → `text-base` eyebrow at marketing floor, titles bumped one notch at every breakpoint; mobile `FlowConnector` width `w-4 → w-6`, base wire opacity `/20 → /35`; caption `mb-14 → mb-8` + connector `-bottom-20 → -bottom-14`; HandoffPanel cards always 2-col (was sm:grid-cols-2) so fork SVG matches stacked layout; BranchCard full redesign — chrome-header strip (`bg-foreground/5 + border-b`) with centred eyebrow mirrors Window panels above, body content centred (`text-center items-center`), title demoted `text-xl/2xl` (below step-title scale), bottom chip-badge bumped (`px-2.5 py-1 → px-4 py-2`, `size-3.5 → size-4`); inter-step `Chip` matched AfterFork vocabulary (`bg-primary text-primary-foreground text-sm`) |
| 3 | `2ca8850` | 1f | Right-column step-caption gets `border-2 border-dashed border-foreground/20` + 4 borderRide particles on `lg+` (mobile keeps text-only); same vocabulary as Walk-away pattern, makes caption a visual peer to the panel on left |
| 4 | `bc4ebe5` | 3 | Problem→Fix mobile: inside-pair `gap-y-12 → gap-y-6` (1:2 ratio between inside vs between, was 1:1); connector `h-12 → h-6`; connector pushed to `-z-10` so SVG stroke bleed is occluded by Card's `bg-surface-1` (Card already creates own stacking context via `z-10`) |
| 5 | `9e014b8` | 5a/b/e | Pricing reflow: drop inline `scope` tail beside €5000, merge into anchor body; restructure top region as 2-col on `lg+` (auto + 1fr) so paragraph aligns top-left to right-of-€5000; promote closing phrase "the engagement pays itself back on the first catch" → `text-foreground font-medium`; copy split into `anchor + anchorHighlight`; `inlineLabel` `text-sm → text-base + tabular-nums` (back to marketing floor, parallel WEEK ↔ TAKE-HOME); after-fork three-card REBALANCE — options reordered `[Just this brand, Across your brands, Walk away]`; Across (default) moves to CENTER with strongest treatment (inverted + Default-next-step badge + `border-2 border-dashed border-background/40` + 4 borderRide particles `bg-background`); Walk-away loses dashed + particles, becomes plain border; option titles `text-base font-semibold → text-xl font-medium` (resolves session-3 carry-over flag) |
| 6 | `b24a567` | 2 + 5d | Hero focal stat: `< 1 min` standalone full-width card (`text-5xl/6xl/7xl`) + 2-col supporting row of `−90% / €13k/yr` (`text-4xl/5xl`); AfterFork height `h-24/h-28 → h-32/h-36` + chip `top-[25%] → top-[30%]` for breathing room (1.7rem above, 0.8rem to fork-dot) |
| 7 | `9bd1af2` | A1 | Hero secondary CTA: shadcn outline variant on dark mode reads as ghost (`dark:bg-transparent + border-border`); bump to `border-foreground/30 + hover:border-foreground/50` so secondary carries actual button weight |
| 8 | `2edefc8` | 1f polish | Right-caption `lg:rounded-xl → lg:rounded-2xl` to match Window panel left; borderRide `inset(0 round 0.75rem) → inset(0 round 1rem)` |

### External — `~/upready` repo

- `71a689ed` — `ux-041` appended to `ivan-ux-patterns.jsonl` + BLOCK-SPEC.md UX-patterns section updated. New rule: fork-step option-cards may carry the chrome-header strip + centred body + bigger chip (supersedes part of `ux-039` — body still no fill).

### Files touched (session 4)

```
src/AppCadence.tsx                            — Hero stat tiles refactor; Pricing PoC reflow + after-fork rebalance + chip padding; secondary CTA border lift
src/components/sections/cadence-pipeline.tsx  — step-numbers/titles, FlowConnector geometry + brightness, BranchCard chrome + centred + bigger chip; right-caption border + particles + rounded-2xl
src/copy/en.ts                                — pricing.poc anchor restructured (anchor + anchorHighlight); pricing.after.options reordered (Just / Across / Walk)
src/copy/ru.ts                                — mirror
HANDOFF.md                                    — this snapshot
```

### Visual / structural decisions logged this session

- **Eyebrow scale on pipeline** — step numbers `01–04` were the visual anti-pattern of the page (rendered at `text-6xl sm:text-7xl` they dominated every step, swamping the actual step titles). Demoted to `text-base font-medium uppercase tracking-[0.18em]` with prefix "step" so the full label "step 01" reads at marketing floor (ux-037). Step titles bumped one notch at every breakpoint (mobile `text-2xl → text-3xl`, sm `text-3xl → text-4xl`, lg `text-4xl → text-5xl`) so titles actually dominate. Visual weight now matches narrative weight.
- **Right-caption as bordered card on `lg+`** — turning the caption text into a visible bordered container with the same `borderRide` particle vocabulary as the Walk-away card. Pairs the caption with the Window panel on the left as a "card-pair" instead of "image + free text". Mobile keeps text-only — the bordered treatment would read heavy stacked under the panel.
- **HandoffPanel cards always 2-col** — was `sm:grid-cols-2` so on mobile the fork SVG branched into 2 paths but cards stacked vertically: the metaphor visibly broke. Now `grid-cols-2` always, cards are smaller on mobile (140-150 px each) but the fork meaning reads.
- **Problem→Fix mobile pair coupling** — was 6 equally-spaced cards (`gap-y-12` everywhere). Halved inside-pair to `gap-y-6` (1.5 rem) so each problem-card visibly couples with its fix-card; between-pair stays `gap-12` (3 rem). Ratio 1:2 reads as 3 distinct pairs. Connector at `-z-10` lets the Card's `bg-surface-1` occlude the SVG stroke bleed at the card edges (was visible bug per image-41).
- **AfterFork rebalance** — the default-next-step (Across-your-brands) was at LEFT with inverted-only treatment; Walk-away was at RIGHT with dashed + particles (the strongest visual). The strongest treatment was on the trust-anchor, not the recommended path — backwards. Moved Across to CENTER and stacked four visual emphases on it (inverted + badge + dashed border + particles). Walk-away to plain border (the trust anchor reads as "leave with everything" not as a deemphasized escape hatch). Just-this-brand to LEFT (quietest neutral). Fork SVG branches stay symmetric; only the cards moved.
- **`borderRide` on inverted card** — particles needed to be `bg-background` (dark dots) not `bg-foreground` (white dots) so they'd read against the inverted white card. Walk-away particles were `bg-foreground` because the card was on dark page; on the inverted center-card they'd be invisible.
- **€5000 layout reflow** — paragraph moved from BELOW €5000 to RIGHT of €5000 on `lg+` so the price + value sentence read as one beat, not two. Mobile keeps 1-col stacked. The "Three weeks, one brand, all bonus types" scope now opens the value sentence ("Three weeks, one brand, all bonus types — about two months of one promo operator's salary…") rather than dangling beside the price as a chip. Closing phrase ("the engagement pays itself back on the first catch") promoted to `text-foreground font-medium` — it's the rhetorical pay-off.
- **`ux-041` chrome-header on fork-step option-cards** — extends `ux-039` (which said "border-only frame, no fill" for the option cards in a fork step). The header STRIP can carry the Window-panel chrome (`bg-foreground/5 + border-b`, no traffic-light dots, centred eyebrow); the BODY stays unfilled. The bigger bottom chip-badge (`bg-primary px-4 py-2 + size-4 icon`) anchors the centred-body layout against being top-heavy.
- **Hero focal stat** — promoted "< 1 min" to a standalone card the full width of the section; `−90 % errors / €13k/yr hire` demoted to a 2-col supporting row beneath. The focal stat reads as the emotional pay-off of the hero ("none of them typed by hand"); the supporting metrics quantify the same story without competing for the eye.

### Open threads / context to carry forward

- **Walk-away dashed-flow animation** (still). Particles only; if Ivan asks for cdnFlow-style flowing dashes around a rounded-rect path, needs an SVG `<path>` overlay tracing the card outline.
- **Phase 4 Economics** not touched — current 2-card structure works (badges as column heads, big stat + sub + rows). No direct Ivan feedback. Plan items D1/D2 stand if/when revisited.
- **Phase 6 Final CTA** not touched — F1 "duplicates Pricing headline" was based on plan, not Ivan ask; current copy ("One brand. All bonus types. Three weeks.") is structurally distinct from Pricing title.
- **Phase 7 Global polish** not touched — eyebrow color accent (G1) and section vertical rhythm token (G2) deferred.
- **Remote divergence widened** to `+34 local / +54 remote` vs `origin/main`. Same options as before (force-push / cherry-pick / park) — DO NOT touch without explicit ask.

---

## Snapshot — session 3 of 2026-05-15 (06:27 WITA)

Six-round iterative redesign of the **Pricing section** plus a one-line rewrite of the **Hero sub**. Seven commits on `main`, none pushed. Ivan's working-style note: this session he caught me twice (rounds 1→2 and rounds 4→6) "перетягивая" copy/structure from previous versions without owning what each line meant. Re-reading every line for "do I understand this myself" became the working contract for this section.

### What landed (in order)

| # | Commit | Round | What |
|---|---|---|---|
| 1 | `8791490` | 1 | **Initial Pricing redesign.** Replaced naked €5,000 with structured offer card: anchor line ("about two months of one promo operator's salary"), 3-week timeline (Sandbox+parser / Real run+measurement / Report+decision), needs block ("what we need from you"), reweighted After options (Network License inverted + Default-next-step badge, Single Brand neutral, Walk away muted dashed). Footnote dropped credit-toward-Network-License mechanic for a confusing-math reason later confirmed. |
| 2 | `b31ba8f` | 2 | **Rewrite each line from first principles.** Ivan called out that round 1 just shuffled the old copy. Rewrote: bot → agent everywhere; dropped "cost per prevented mistake" (logically impossible to measure something that didn't happen); split "baseline numbers / edge-case catalog / go/no-go" from one bullet into three distinct take-home items (`takeHome[]` shape); "no clawback" dropped (finance jargon); reframed Single Brand from "cheaper brand" to "we hold here on this one brand"; reshaped needs from flat strings to `{n, body}` for 01/02/03 column eyebrows. |
| 3 | `deb6dc4` | 3 | **Drop needs block + inline icon+label header.** Ivan: last beat should be take-home (what you get), not what we need from you. Dropped `poc.needs`/`needsLabel` entirely; Take-home now closes the offer card. Fixed Week 3 body — "recommendation" was referenced without definition (made self-contained: "our recommendation on extending the agent across the rest of your brands"). Dropped "network" jargon + COO/CFO mention from Recommendation copy. Weeks + Take-home columns redesigned to one shared shape: `[icon size-7] [small inline label]` as header row, then title, then body. 3-row subgrid. |
| 4 | `05c0cd6` | 4 | **Plain-English tier names + grounded anchor + walk-away + finalCta + spacing.** Renamed `Network License` → `Across your brands`, `Single Brand` → `Just this brand`. Footnote dropped tier names entirely. Anchor grounded in €30k–€60k Class A wager mistakes from research. Walk-away rewritten as value-retained ("nothing to pay back" was a doubt-mechanic I invented). FinalCta dropped doubled "three weeks" and the doubt-language "if data doesn't make the case". Spacing: `mt-6` → `mt-16` between section label and column grid; sm:mt-3 → sm:mt-6 between icon-header and title; inline labels text-base → text-sm (ux-037 exception, pending ux-040 log); column titles text-base font-semibold → text-xl font-medium. |
| 5 | `8b9bffc` | 5 | **3-arm AfterFork connector + drop €30-60k from anchor.** Built `AfterFork({chip})` inline in `AppCadence.tsx` — viewBox 0 0 100 44 preserveAspectRatio="none", stem M50 0 V22 + three branches to x=17/50/83 at y=44 matching `sm:grid-cols-3` centres, same FlowConnector vocabulary as CadencePipeline (faint base + cdnFlow dashes + animateMotion packet dots rotate=0 per ux-031). Chip parked at top-[25%] mid-stem. Anchor dropped €30-60k specifics — Ivan said the number came in cold; replaced with "one misset wager rule on a busy promo can wipe out the whole promo's revenue". `after.label` reworked to chip-style lowercase verb-action ("after the engagement — you choose"). |
| 6 | `aabcbb4` | 5b | **Hero sub punch rewrite.** Ivan picked option A from the three I proposed. Dense 4-clause pipeline-explainer → one sentence: "The agent reads your retention calendar and writes every bonus into your ACMS — without operators, without field errors, at any volume." (Mirror in RU.) Hero stops explaining; pipeline section below demonstrates. |
| 7 | `020100e` | 6 | **Chip/badge solid fills, fork dots retuned, Walk-away particles, gap-x-10, footnote promoted to icon+centred-text callout.** Six targeted polishes: (a) Connector chip `bg-foreground/[0.06]` → `bg-primary text-primary-foreground`, text-[11px] → text-sm, px-4 py-2; (b) "Default next step" badge outlined → filled `bg-background text-foreground` (interpreted Ivan's `bg-primary` as "strong fill" — literal `bg-primary` on the white card was invisible in dark mode), text-base → text-xs; (c) Fork dots ellipse rx/ry retuned from 0.7/1.83 (HandoffPanel tune for narrower container) to 0.4/2.0 (right for 1280×112 After grid) — dots now round; (d) After Reveal `mt-10` → `mt-0` so fork stem connects to offer card above; mobile eyebrow gets own mt-10; (e) After grid added `sm:gap-x-10` — matches take-home columns above; (f) Walk-away card kept dashed but `border` → `border-2 border-foreground/20` for bigger dashes, plus 4 particles riding offset-path inset(0 round 0.75rem) — same `borderRide` as offer card; (g) Footnote callout: bg-surface-1 px-8 py-4 grey-muted → py-12 sm:py-16 centred icon (CheckmarkBadge01Icon size-8 sm:size-9) + text-xl text-foreground. |

### Files touched (session 3)

```
src/AppCadence.tsx                 — Pricing rebuilt across 6 rounds; new AfterFork() function;
                                     style constants (blockEyebrow / inlineLabel / columnTitle);
                                     new imports: TestTube01Icon, Activity03Icon, Note02Icon,
                                     AnalyticsUpIcon, BookOpen01Icon, Compass01Icon, CheckmarkBadge01Icon;
                                     WEEK_ICONS, TAKEHOME_ICONS constants alongside AFTER_ICONS.
src/copy/en.ts                     — pricing.poc + pricing.after rewritten round-by-round;
                                     hero.sub replaced with one-sentence punch; finalCta rewritten.
src/copy/ru.ts                     — mirror; all keys parity-checked by tsc each round.
HANDOFF.md                         — this snapshot (you're in it).
```

External (in `~/upready` design-log + memory):

```
docs/design-log/upready-cadence/2026-05-15_043244_1335/   — round 1 unit
docs/design-log/upready-cadence/2026-05-15_045202_c0e3/   — round 2 unit
docs/design-log/upready-cadence/2026-05-15_050712_a63f/   — round 3 unit
docs/design-log/upready-cadence/2026-05-15_053206_2b47/   — round 4 unit
docs/design-log/upready-cadence/2026-05-15_055745_dd7e/   — round 5 unit
docs/design-log/upready-cadence/2026-05-15_062117_761c/   — round 6 unit
```

Each unit has the matching prompt + response + 1:1 `changes.patch` per the design-log protocol; commit subjects carry the `[design-log:<id>]` tag.

### Visual / copy decisions logged this session

- **Sales structure** (rounds 1-4 cumulative). Single offer at €5,000 + three risk-reversed continuation paths is the right strategy (kept). What changed: every line in the offer card now grounds itself (`anchor` cites ops salary + concrete stake; `weeks[]` shows the engagement is a visible contract not a black box; `takeHome[]` lists three distinct artefacts not a bullet salad; `footnote` is the only commitment statement, not a credit-mechanic). Tier names plain English (`Across your brands` / `Just this brand` / `Walk away`). Walk-away is the trust anchor — its copy lists what they retain (baseline, handbook, recommendation, picture of what automation can/can't do in their ACMS), not "nothing to pay back" (that's a debt-language we don't bring into the conversation).
- **Anchor wording** (rounds 4 → 5). Initial concrete number (€30k–€60k) came from research-brief Class A wager incidents — but the page has no earlier reference setting up that number, so it read as fabricated. Dropped specific numbers, kept the scenario language ("one misset wager rule on a busy promo can wipe out the whole promo's revenue"). The buyer recognises the scenario; we don't claim a number we can't ground.
- **Visual vocabulary on the After section** (round 5). 3-arm fork connector reuses the FlowConnector vocabulary from CadencePipeline (faint base + cdnFlow dashed flow + animateMotion packet dots + on-stem chip with font-mono text). Inline geometry tuned for the actual width (rx=0.4 ry=2.0 cancels the X≫Y aspect distortion in a 1280×112 stretched viewBox).
- **Walk-away animation** (round 6). CSS `border-dashed` doesn't expose dash-offset → can't animate the dashes themselves. Workaround = particles riding offset-path inset(0 round 0.75rem), 4 particles, same `borderRide` keyframe as the offer card. If Ivan wants strictly flowing-dashes (cdnFlow on a rounded-rect path), needs an SVG overlay — flagged.
- **`bg-primary` interpretation** (round 6). In dark mode `--primary == --foreground` (both near-white). Ivan's `bg-primary` on the inverted-white Network License card would be invisible — interpreted as "strong solid fill" and used `bg-background` (the dark twin). For the connector chip on the dark page, `bg-primary` worked literally (white pill, dark text).
- **`ux-040` carry-forward.** Inline column-header label paired with size-7 icon dropped to `text-sm` (below the ux-037 text-base floor). The icon carries the visual anchor; the label is the auxiliary marker. Not yet appended to `ivan-ux-patterns.jsonl` — batched in this save (see "Save 7 / atomic notes").

### Open threads / context to carry forward

- **Walk-away dashed-flow animation.** Currently particles only. If Ivan asks for actual flowing dashes (cdnFlow style), we need an SVG `<path>` overlay tracing a rounded rect at the card's exact pixel dimensions (preserveAspectRatio caveats — would need either runtime measurement or a clever non-scaling-stroke trick). Defer until asked.
- **After-block option titles** ("Across your brands", "Just this brand", "Walk away") still at `text-base font-semibold`. Adjacent Take-home / Weeks column titles are `text-xl font-medium` after round 4. Inconsistent. Flag if Ivan wants harmonised — easy bump.
- **`Just this brand` strategic question.** Copy now clearly explains it ("we keep the agent on the one brand only — no commitment to scale"), but I'm not certain this option pulls weight in the buyer's actual decision tree. Possible ballast. Strategic call for Ivan.
- **`finalCta` still mentions "three weeks" once.** Down from twice (round 4) but the section duplicates structure with the Pricing block right above. Could shrink finalCta further or merge into Pricing. Defer.
- **Remote divergence widened.** Local now `+25 / -54` vs `origin/main` (was `+17` at start of session). Same three options (force-push / cherry-pick / park) — DO NOT touch without explicit ask.
- **Deploy NOT triggered.** Per rule 21c. Default = commit + local only.

### Quick verify on next pick-up

1. `git log --oneline -10` — top should be `020100e`.
2. `pnpm dev` → open `http://127.0.0.1:3340/`. Toggle dark/light + EN/RU (Cmd+Shift+L).
3. Hero: sub is now one sentence ("The agent reads your retention calendar...").
4. Pricing section, in order:
   - Header card: PROOF OF CONCEPT label, big €5,000, scope chip, then anchor sentence (no concrete €30-60k number).
   - "How the three weeks run": 3 cols, each `[icon] [WEEK N]` + Sandbox / Real run / Report titles. text-xl font-medium titles.
   - "What you take home": 3 cols, each `[icon] [01/02/03]` + Measured baseline / Agent handbook / Recommendation titles.
   - **Footnote callout** (bottom of offer card): centred CheckmarkBadge icon + text-xl white text. py-12 sm:py-16. NOT a thin grey strip.
   - **AfterFork connector** between offer card and the three After cards: 3-arm SVG fork, white chip mid-stem ("after the engagement — you choose"), 4 round packet dots (NOT flat ovals). Stem starts immediately below offer card.
   - **After cards**: Network License = inverted white card with `DEFAULT NEXT STEP` filled black pill in the corner; Single Brand = neutral surface-1 card; Walk away = dashed border-2 card with 4 particles riding the perimeter.
5. Pricing block must NOT include "What we need from you" anymore (dropped round 3).

---

## Snapshot — session 2 of 2026-05-15 (afternoon)

Two-stage redesign of the **Handoff panel** + a polish pass across the rest of the landing. Six commits on `main`, none pushed. Everything below is on top of the morning session (see "session 1" snapshot further down).

### What landed (in order, with commit refs)

| # | Commit | What |
|---|---|---|
| 1 | `5a01f14` | **`HandoffPanel` lost its `<Window>` chrome.** The two BranchCards (Moderated / Direct) now ARE the panel, filling the `PanelStage` 16:9 cell directly. `BranchCard` restructured: mode tag (`autopilot` / `review step`) stacks ABOVE the title as a kicker; `bg-foreground/5` fill → `border border-border`; title `text-base` → `text-2xl sm:text-3xl font-semibold leading-tight`; desc `text-[13px]` → `text-base sm:text-lg`; chip switched from filled to border-only. Calendar / Config / Review panels keep their Window unchanged — those depict real product screens; only the fork step (a CHOICE, not a screen) goes headerless. Logged as `ux-039` in the UX log. |
| 2 | `24fda5f` · `8a126d6` | Docs — updated this HANDOFF (OPEN→DONE for the redesign) + logged `ux-039` in HANDOFF visual-decisions section. |
| 3 | `eddc6c0d` (in `~/upready` repo) | UX log — added `ux-039 fork-step-drops-window-chrome` to `/Users/ivanprotsko/upready/docs/reference/ivan-ux-patterns.jsonl` + mirrored as a one-liner in `BLOCK-SPEC.md` § UX Patterns (#17). |
| 4 | `be31fe6` | **Handoff polish — taller cards, inverted chip, caption rides the wire.** `lg:min-h-[28rem]` on HandoffPanel root so the cards stand ~3rem taller than the caption block on the right. `PANEL_CHIPS[2]` changed from `"→ batch of 17"` to `"handoff — you choose, per brand"` — the marketing tagline now rides the connector chip ABOVE the panel instead of sitting as a `<p>` at the bottom of the panel (that `<p>` deleted). BranchCard chip flipped to the inverted pill pattern: `bg-primary text-primary-foreground` + bare `Tick01Icon` (no enclosing circle) — same precedent as `ux-036`. |
| 5 | `f7da685` | **Polish: window header fill back, chip above the dots, drop trailing —.** (a) `Window` title-bar fill restored to `bg-foreground/5` (the hairline-only divider from `441fc0d` was letting the chrome melt into the dark page bg). (b) The connector `Chip` now sits at `relative z-10 backdrop-blur-2xl` and its absolute wrapper carries `z-10` — the packet dots that ride the wire have `bg-foreground` (solid white in dark mode); when one passed the chip it was showing THROUGH the chip's 6%-opacity fill, not over it. Z-index lifts the chip explicitly; the blur softens whatever still crosses behind. Also dropped `bg-foreground/[0.04]` from the `ConfigPanel` Ticker (last compartment, the "25 fields · 0 invalid / ready for review" lines) — surface no longer needs a fill distinct from the panel body. (c) Economics rows: removed the trailing em-dash (`"—"` as the 3rd tuple element) from both en/ru copy AND `Economics`-component renderer; type narrowed to `[string, string][]`. Rows now read `label · value`, no orphan glyph on the right. |
| 6 | `cfa2891` | **`font-mono` dropped from marketing prices/stats + Calendar active cell inverted.** (a) `font-mono` removed from: hero stats, problem/fix stats, economics big numbers, POC price (`€2 500`), pipeline caption numbers (`01–04`). `tabular-nums` is kept — Geist supports it, digits still align in stat cards. (b) Calendar active cell (`CalendarPanel`, Offer row · Wed): the absolute pulsing ring overlay is gone (its `rounded-[5px]` over the cell's `rounded-md` edge was aliasing the corner). The cell itself is now `bg-primary` with a slow `animate-pulse motion-reduce:animate-none`; decorative lines inside flip to `bg-primary-foreground/70` for contrast against the inverted fill. |

### Files touched (session 2)

```
src/AppCadence.tsx                           — font-mono dropped from prices/stats + economics row renderer simplified ([k, v, delta] → [k, v])
src/components/sections/cadence-pipeline.tsx — HandoffPanel + BranchCard redesign · Window header bg restored · Chip z-10 + backdrop-blur · Calendar active cell inverted · caption number de-mono'd · PANEL_CHIPS[2] swapped · Ticker bg dropped
src/copy/en.ts                               — economics rows: dropped 3rd tuple element ("—"), type tightened to [string, string][]
src/copy/ru.ts                               — economics rows: same drop
HANDOFF.md                                   — OPEN→DONE for redesign + ux-039 visual-decision row (this file)
```

External (in `~/upready` repo, parent of project):

```
docs/reference/ivan-ux-patterns.jsonl  — appended ux-039
specs/BLOCK-SPEC.md                    — § UX Patterns gained item #17 referencing ux-039
```

### Visual decisions logged this session

- **`ux-039` — `fork-step-drops-window-chrome`** (commit `5a01f14`). In a how-it-works pipeline illustration, the step that represents a *choice* (Moderated / Direct) drops the `<Window>` chrome — the option cards themselves ARE the panel, at the same `PanelStage` 16:9 height as the windowed steps before and after. Mode label stacks ABOVE the title as a kicker; frame is `border border-border`, no fill; title `text-2xl sm:text-3xl`, desc `text-base sm:text-lg`. Calendar / Config / Review keep their Window — those are real product screens.

### Open threads / context to carry forward

- **Font system.** Ivan asked "what font is currently used?" — `--font-sans: Geist`, `--font-mono: Geist Mono` (declared in `src/index.css:9-12`). After commit `cfa2891`, `font-mono` is used **only inside the in-product illustrations** (`cadence-pipeline.tsx`): calendar grid, ACMS config rows, review table, Window chrome, BranchCard tag/chip, Ticker, connector Chip — those surfaces sell the "screenshot of the real product UI" reading (ux-031). Marketing typography (prices, stats, caption numbers, body copy, headings) is all Geist sans now. Brand badge `copy.badgeMono` in the top nav (`"ba"`) also kept mono — it's a logotype. If Ivan wants to push further and drop mono from illustration text too, that breaks the screenshot feel — flag before doing it.
- **Geist `tabular-nums`.** Kept on every stat/price after the mono drop — Geist supports tabular figures so digits still align (`"20 min"` ↔ `"<1 min"` and `"€2 500"` numerals stay column-aligned). Don't remove `tabular-nums` blindly.
- **Calendar active cell.** Now uses `animate-pulse` from Tailwind's defaults — `opacity 1 → .5 → 1` over 2s. If Ivan calls it too aggressive, two options: (a) replace with a custom keyframe pulsing `1 → .85 → 1` (subtler); (b) drop the animation entirely and rely on `bg-primary` alone as the highlight. Don't reach for `animation: blink` from `src/index.css:172-179` — that one drops to opacity 0 (hard blink, used by the caret).
- **Remote divergence still unresolved.** Local is now **+17 / -54** vs `origin/main` (six more local commits this session). Same three options as before (force-push / cherry-pick onto remote / park as separate fork) — DO NOT touch without Ivan's explicit ask. The remote has the "Cadencio" rebrand we haven't pulled.
- **Deploy is NOT triggered.** Per global rule 21c, "default = commit + push to dev, STOP." This session committed locally and did NOT push — Ivan didn't ask. To deploy: explicit instruction needed.

### Quick verify on next pick-up

1. `git log --oneline -10` — top should be `cfa2891`.
2. `pnpm dev` → open `http://127.0.0.1:3340/` (or `/pitch`). Toggle dark/light (theme switch in top right). Toggle EN/RU with **Cmd+Shift+L** (no visible control).
3. Scroll the pipeline illustrations:
   - Calendar (step 01): the Wednesday Offer cell should be a solid white tile (in dark mode) pulsing softly. No ring.
   - Config (step 02): bottom Ticker block has no fill anymore — same flat surface as the panel body.
   - Review (step 03): unchanged.
   - Handoff (step 04): no Window header, two cards (Moderated / Direct) standing tall, each with kicker → title → desc → solid white Tick pill. Connector chip above them reads "handoff — you choose, per brand".
4. Economics cards: no trailing em-dash on the right side of any row.
5. Pricing: `€2 500` is in Geist sans, not Geist Mono.

---

## Snapshot — session 1 of 2026-05-15 (~02:30 → 03:05 WITA)

Pipeline of design touches on the landing, then i18n. Six commits, all on `main`, none pushed (remote has 54 commits we haven't pulled — see "Remote divergence" below).

### What landed (in order, with commit refs)

| # | Commit | What |
|---|---|---|
| 1 | `e646453` → `44da15d` | Archived old `Archive.zip` into history then dropped from working tree. Slot freed for a new version. |
| 2 | `b24bd18` | **Picked up the new landing version from `/Users/ivanprotsko/Downloads/bonus`** (a Lovable-style export of the same repo). Brought in: refactored `src/AppCadence.tsx` (129 ins / 116 del), new `borderRide` CSS keyframes in `src/index.css` (pricing-card perimeter particles), new `src/components/ui/contact-modal.tsx` (CTA button → inline form → success state). Workspace cruft (`Downloads/bonus/.ai/`, `.claude/`, `cost-report.md`) deliberately NOT copied — per global rule 4 those don't belong in a project repo. |
| 3 | `1d5b3b7` | **Restored card borders** — reverses commit `0cbad37` (`style: drop all card borders — flat surfaces only`) for the marketing surfaces. The "flat surfaces only" experiment read as a regression on the dark theme: bg-surface-1 melted into the page bg, the illustration Window stopped looking like a window, problem/fix pairs lost their stat-card framing. Touched: `Card` wrapper in `AppCadence.tsx` (rounded-2xl bg-surface-1) and the `Window` frame in `cadence-pipeline.tsx` (rounded-2xl bg-background) — both got `border border-border` back. Pricing card NOT touched — it has its own intentional dashed-border + bg-foreground/[0.04] tile, that's a deliberate frame. Internal content separators (border-t/border-b between rows, between Window header and body) were already kept and stay. Logged as `ux-038` in `/Users/ivanprotsko/upready/docs/reference/ivan-ux-patterns.jsonl`. |
| 4 | `441fc0d` | **Redistributed the Window-header fill across the panels.** Ivan: "у иллюстрации добавь линию в хедере, но убери при этом фон. У последней иллюстрации (Moderated/Direct) сделай фон такой же как фон хедера, который мы убираем. То же — у карточек первой иллюстрации (календарь); а у неактивных-выглядящих карточек — старый цвет BranchCard." Result: Window header `bg-foreground/5` → `border-b border-border` (hairline, no fill). The 0.05 tone moved INTO the panels: `BranchCard` (Moderated/Direct in HandoffPanel) 0.04 → 0.05; `CalendarPanel` cells: active + filled → 0.05 (was 0.12 / 0.05), empty/inactive → 0.04 (was 0.02). Active cell still distinguished by its existing ring-pulse overlay. |
| 5 | `d6c151d` | **Pricing "after the engagement" tier cards** — 3 cards (Network License / Single Brand / Walk away): added top icon (`AiNetworkIcon` / `LicenseIcon` / `Logout01Icon` from hugeicons), bumped gap between icon and title (`gap-y-4` mobile, `sm:mt-2` between title and desc). **Equal-row alignment across columns via CSS `grid-rows-subgrid`** — parent defines 3 row tracks (`auto_auto_1fr`), each card spans them (`sm:row-span-3 sm:grid-rows-subgrid`), so the title row aligns across all three columns and the description row stretches to the height of the tallest copy. No JS, no equal-height hack. Tailwind v4 supports `grid-rows-subgrid` natively. Mobile (`<sm`): falls back to a natural block stack with the `gap-y-4` still applied. |
| 6 | `f078e34` | **i18n EN/RU with Cmd+Shift+L toggle (no visible control).** New `src/copy/` module:<br/>· `money.ts` — `eur()` / `grp()` formatters, shared (currency formatting doesn't change per locale; narrow no-break space U+202F).<br/>· `en.ts` — full English copy (extracted from the old module-level `COPY` const), exports `type Copy = typeof en`.<br/>· `ru.ts` — full Russian translation, `const ru: Copy = {...}` → TS enforces shape parity.<br/>· `index.ts` — `LocaleProvider`, `useCopy()`, `useLocale()`. Cmd+Shift+L (Ctrl+Shift+L on non-mac) flips `en ↔ ru`. Choice persisted in `localStorage['cadence:locale']`. `<html lang="…">` updated on every change.<br/>Page wrapped with `<LocaleProvider>`. Every section now consumes `useCopy()` instead of the import. Tier icons pulled out of the dictionary into a top-level `AFTER_ICONS = [AiNetworkIcon, LicenseIcon, Logout01Icon]` zipped by index — dictionaries stay pure strings.<br/>**Deliberately untranslated: in-product illustration text** (`cadence-pipeline.tsx` — DAYS, CAL_ROWS labels, FIELDS table, TYPING, TICKER, REVIEW table, Window file names like `"promo-calendar · this week"`, BranchCard tag/chip strings). It's a screenshot of the actual product UI, translating `"promocode"` inside it would be incoherent. The MARKETING captions around the illustration (`pipeline.captions[]`) ARE translated. |

### Files now in src/copy/

```
src/copy/
├── index.ts   — LocaleProvider + useCopy() + Cmd+Shift+L hotkey + localStorage persistence
├── money.ts   — eur()/grp() formatters (shared)
├── en.ts      — English dictionary + exports `type Copy = typeof en`
└── ru.ts      — Russian dictionary, typed as `Copy`
```

Any new copy string: add to `en.ts` first (defines the shape), TypeScript will then error on `ru.ts` until the matching key is added. That's the parity-enforcement contract.

### Visual decisions logged session 1 (ivan-ux-patterns.jsonl)

- **`ux-038` — `keep-card-borders-on-marketing-cards`**. Card-level containers on marketing pages MUST carry `border border-border` (Card wrapper + Window illustration frame). Reverses the "drop all card borders — flat surfaces only" attempt (`0cbad37`). Pricing card with its intentional dashed-border tile is exempt. Internal content separators are not card frames and always stay.

(Session 2 added `ux-039` — see session-2 snapshot above.)

---

## Remote divergence (housekeeping)

Local `main` is **+25 / -54** vs `origin/main` (was +11 at session 1 start, +17 at session 2 start, +18 at end of session 2). The 54 remote commits (latest: `6192c8f Reprice /pitch tiers for 100% minimum gross margin`, `2bad510 Rename UI brand: Bonus (Automation) Agent → Cadencio`) come from a parallel direction Ivan was running on GitHub. Decision still pending — do we:
- **A.** Force-push local to remote (overwrite the Cadencio rebrand). **Destructive, needs Ivan's explicit approval per rule 22.**
- **B.** Pull remote, integrate selectively (cherry-pick our 11 onto theirs). Requires merging the i18n + border changes onto a renamed-brand base — non-trivial.
- **C.** Park: keep local as-is, treat remote as a different fork.

Not actioned this session. Don't touch without asking.

---

## What's NOT translated (deliberate)

`src/components/sections/cadence-pipeline.tsx` keeps English strings for the in-product UI illustration:

- `DAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"]`
- `CAL_ROWS` labels: Channel / Segment / Offer / Promo
- `FIELDS` table: title, trigger, bonus_percent, freespin_count, max_amount, …
- `TYPING`: ["promocode", "BACK85"]
- `TICKER` lines: "→ parse offer · …", "✓ schema · 25 fields · 0 invalid", "⚑ flag for review · …"
- `REVIEW` table rows
- `Window` file names: "promo-calendar · this week", "config-acms · welcome-back-85", "batch-review · 17 campaigns", "handoff · per brand"
- `BranchCard` tag / chip: "review step", "autopilot", "approve batch", "written to ACMS"

These are content INSIDE fake product screenshots — the product itself is English, translating them would break the "this is a screenshot of the actual product" reading. If Ivan wants the product UI shipped in RU, that's a separate pass on the product, not on the landing.

---

## Dev / build / typecheck

```sh
pnpm dev        # vite --host 127.0.0.1 → :3340
pnpm build      # tsc -b && vite build
pnpm typecheck  # tsc -b --noEmit
pnpm preview    # vite preview --host 127.0.0.1
```

Typecheck stays clean after every commit this session.

---

## Pointers

- **UX log:** `file:///Users/ivanprotsko/upready/docs/reference/ivan-ux-patterns.jsonl` — sessions 1+2+3 of 2026-05-15 added `ux-038` (card borders restored), `ux-039` (fork-step drops Window chrome), `ux-040` (inline icon-paired label exception to ux-037 — see "atomic notes" in this save).
- **Design spec:** `file:///Users/ivanprotsko/upready/specs/BLOCK-SPEC.md` — read before any UI work (design-stack-guard hook enforces this).
- **Design-stack manifest:** `file:///Users/ivanprotsko/upready/specs/DESIGN-STACK.md`.
- **Source of the new landing version** (already integrated, can be discarded): `file:///Users/ivanprotsko/Downloads/bonus/` — same repo state as us up to `bb61d51`, plus the AppCadence refactor / index.css `borderRide` / ContactModal that's now in `b24bd18`.
- **Sibling project (the original):** `file:///Users/ivanprotsko/upready/projects/ivanprotsko.com/` — `/products/cadence` v1–v5 layout exploration; this `upready-cadence` repo is v1 lifted into its own deployable.
