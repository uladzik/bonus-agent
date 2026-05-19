/**
 * /products/cadence — pitch landing for "Bonus Agent" (automates Promo Engine bonus-
 * campaign setup for iGaming CRM teams). Content recreated 1:1 from the source
 * pitch (bonus-agent-demo · app/pitch/page.tsx + components/pitch/PipelineScene),
 * redesigned in this site's visual language: monochrome semantic tokens, our
 * surface tiers (--surface-1/2), tailark-style window illustration, Geist /
 * Geist Mono, our Button, IntersectionObserver fadeUp reveals, a faint backdrop
 * texture so a dark page doesn't read as a void.
 *
 * Copy lives in COPY below (EN). Lift into i18n/dict.ts when RU is wanted.
 */
import { useEffect, useRef, useState, type ReactNode } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  AiNetworkIcon,
  LicenseIcon,
  Logout01Icon,
  TestTube01Icon,
  Activity03Icon,
  Note02Icon,
  AnalyticsUpIcon,
  BookOpen01Icon,
  Compass01Icon,
  ArrowRight01Icon,
} from "@hugeicons/core-free-icons"
import { Button } from "@/components/ui/button"
import { ThemeSwitch } from "@/components/ui/theme-switch"
import { CadencePipeline, FlowConnector } from "@/components/sections/cadence-pipeline"
import { LocaleProvider, useCopy } from "@/copy"

const TELEGRAM_URL = "https://t.me/upreadydev"
/* New Cadencio dashboard (`~/repos/agentbonus/cademcio`, branch
   `cadencio-2026-05-17`). Runs on `next dev -p 3002`. The previously
   deployed `bonus-agent-demo.pages.dev` is the older version and is
   not used here. Once the new dashboard is deployed, swap this to
   the public URL. */
const DASHBOARD_URL = "https://cademcio.vercel.app"

/* Icons for the "after the engagement" tier cards. Pulled out of COPY so the
   translated dictionaries stay pure strings — the icons don't change per
   locale, only the labels do. Order matches `pricing.after.options[]`. */
const AFTER_ICONS = [AiNetworkIcon, LicenseIcon, Logout01Icon] as const

/* Icons for the three columns inside the PoC card. Order matches
   `pricing.poc.weeks[]` and `pricing.poc.takeHome[]` respectively. Sandbox →
   activity → memo for the timeline; analytics → handbook → compass for the
   take-home (numbers / reference / direction). */
const WEEK_ICONS = [TestTube01Icon, Activity03Icon, Note02Icon] as const
const TAKEHOME_ICONS = [AnalyticsUpIcon, BookOpen01Icon, Compass01Icon] as const

/* ── page ──────────────────────────────────────────────────────────────── */
export function AppCadence() {
  return (
    <LocaleProvider>
      <AppCadenceInner />
    </LocaleProvider>
  )
}

function AppCadenceInner() {
  return (
    <div className="relative flex min-h-screen flex-col bg-background text-foreground">
      <div
        aria-hidden
        className="cdn-backdrop pointer-events-none absolute inset-x-0 top-0 h-[150vh]"
      />
      <CadenceNav />
      <main className="relative flex flex-1 flex-col">
        <Hero />
        <SeeItInAction />
        <HowItWorks />
        <ProblemFix />
        <Economics />
        <Pricing />
        <FinalCta />
      </main>
      <CadenceFooter />
    </div>
  )
}

/* ── reveal-on-scroll ──────────────────────────────────────────────────── */
function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === "undefined") {
      setShown(true)
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          io.disconnect()
        }
      },
      { rootMargin: "0px 0px -10% 0px" }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <div
      ref={ref}
      className={
        (className ?? "") +
        " transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none " +
        (shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3")
      }
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  )
}

/* ── shared bits ───────────────────────────────────────────────────────────
   One container width for the whole page — nav, hero, every section and the
   footer share it, so the 16:9 illustration block lines up with everything
   else. Caps at 1280px with a fixed 64px (px-16) gutter left and right at sm+
   (24px below that, so phones aren't crushed). Section copy still caps itself
   for readability via its own inner max-w-*. */
const SHELL = "mx-auto w-full max-w-[1280px] px-6 sm:px-16"

function Eyebrow({ children }: { children: ReactNode }) {
  // Bumped text-xs → text-base per ux-037 ("minimum text-base on the site");
  // tracking + uppercase compensate so it still reads as a meta-label, not a
  // heading. Slightly tighter tracking at this size keeps it from feeling loud.
  return (
    <p className="text-base font-medium uppercase tracking-[0.18em] text-muted-foreground">
      {children}
    </p>
  )
}

function SectionHeader({
  eyebrow,
  title,
  subtitle,
  className,
  titleClassName,
}: {
  eyebrow: string
  title: string
  subtitle?: string
  // Override the wrapper's max-width when a section needs a wider title (e.g.,
  // a single-line headline that would otherwise wrap inside `max-w-2xl`).
  className?: string
  // Optional title-only override — used to force `whitespace-nowrap` on
  // headlines that must stay on one line at large breakpoints.
  titleClassName?: string
}) {
  return (
    <Reveal className={`flex flex-col gap-4 ${className ?? "max-w-2xl"}`}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2
        className={`text-balance text-3xl font-semibold leading-[1.12] text-foreground sm:text-4xl lg:text-5xl ${
          titleClassName ?? ""
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="text-balance text-base leading-relaxed text-muted-foreground sm:text-lg">
          {subtitle}
        </p>
      )}
    </Reveal>
  )
}

function Card({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-border bg-surface-1 ${className ?? ""}`}>
      {children}
    </div>
  )
}

/* ── nav ───────────────────────────────────────────────────────────────── */
function CadenceNav() {
  const copy = useCopy()
  return (
    <>
      {/* Fade overlay — opaque page bg at the top, dissolving to
          transparent over 120 px. The previous progressive-blur
          (backdrop-filter: blur(10px) + mask + tint) hit the GPU hard
          on long-scroll pages and visibly jankied the scroll on
          mid-range hardware. A plain linear-gradient gives the same
          visual seal between the nav and the content beneath at zero
          paint cost.  Sits at `z-20`; the nav row sits at `z-30`. */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-x-0 top-0 z-20 h-[120px] select-none [background:linear-gradient(to_bottom,var(--background),transparent)]"
      />
      <header className="sticky top-0 z-30">
        <div className={`flex h-16 items-center justify-between ${SHELL}`}>
          <a href="/" className="flex items-center gap-2.5 text-base font-semibold tracking-tight">
            <span className="inline-flex size-7 items-center justify-center rounded-md bg-surface-1 font-mono text-base">
              {copy.badgeMono}
            </span>
            <span>{copy.brand}</span>
          </a>
          <Button asChild>
            <a href={TELEGRAM_URL} target="_blank" rel="noreferrer">
              {copy.nav.cta}
            </a>
          </Button>
        </div>
      </header>
    </>
  )
}

/* ── hero ──────────────────────────────────────────────────────────────── */
function Hero() {
  const { hero } = useCopy()
  return (
    <section className="pb-12 pt-10 sm:pb-16 sm:pt-12">
      <div className={SHELL}>
        <Reveal delay={0.05}>
          <h1 className="mt-6 max-w-4xl text-balance text-4xl font-semibold leading-[1.05] text-foreground sm:text-5xl lg:text-[3.75rem] lg:leading-[1.05]">
            {hero.titleHead} {hero.titleTail}
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-2xl text-balance text-lg leading-relaxed text-muted-foreground sm:text-xl">
            {hero.sub}
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild size="lg" data-icon="inline-end">
              <a href={DASHBOARD_URL} target="_blank" rel="noreferrer">
                Open live dashboard
                <HugeiconsIcon icon={ArrowRight01Icon} className="size-4" />
              </a>
            </Button>
          </div>
        </Reveal>
        {/* Stat tiles — 3 equal columns on sm+ (mobile stacks 1-col).
            Number type scales by viewport: text-3xl on mobile / sm
            (narrow 3-col columns ≈ 150–200 px would wrap a text-5xl
            "< 1 min" between the digit and the unit), md:text-4xl
            once columns reach ~210 px, lg:text-5xl at the full
            desktop ~330 px column. */}
        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
          {hero.stats.map((s, i) => (
            <Reveal key={s.label} delay={0.2 + i * 0.06}>
              <Card className="flex h-full flex-col gap-1.5 p-5 sm:p-6">
                <div className="text-3xl font-semibold tabular-nums text-foreground md:text-4xl lg:text-5xl">
                  {s.value}
                </div>
                <div className="text-base leading-snug text-muted-foreground">{s.label}</div>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── see it in action ──────────────────────────────────────────────────────
   Two live iframes of the dashboard, sized to actual device proportions:
   desktop at 1280×720 (HD), mobile at 375×812 (iPhone X-class). On lg+ the
   grid is `[3.85fr_1fr]` — exactly (1280/720) / (375/812), the ratio that
   lands both cards on the SAME visible height while each keeps its native
   aspect. `items-start` top-aligns the two cards so they read as a matched
   pair. On < lg the row collapses into a stack; each card caps its own
   max-width (`640` / `240`) so the desktop preview still looks like a
   screen and the phone still looks like a phone. A single shared caption
   sits below the grid naming what's currently on screen — one line of
   context for both previews, no per-card repetition. */
function SeeItInAction() {
  return (
    <section id="demo" className="scroll-mt-20 py-14 sm:py-20">
      <div className={SHELL}>
        <SectionHeader
          eyebrow="See it in action"
          title="The dashboard the operator actually uses."
          subtitle="Two live previews of the same tool — desktop on the left, mobile on the right. Both are interactive: click the timeline, expand a campaign, edit any field."
          // Wider wrapper + nowrap on lg+ keeps the headline on a single
          // line at the breakpoint where text-5xl kicks in.
          className="max-w-5xl"
          titleClassName="lg:whitespace-nowrap"
        />
        <div className="mt-12 grid grid-cols-1 items-start justify-items-center gap-6 lg:mt-14 lg:grid-cols-[3fr_1fr] lg:justify-items-stretch">
          <Reveal delay={0.05} className="w-full max-w-[640px] lg:max-w-none">
            <FramePreview
              nativeWidth={1280}
              nativeHeight={720}
              ariaLabel="Live desktop preview of Bonus Agent dashboard"
            />
          </Reveal>
          <Reveal delay={0.08} className="w-full max-w-[240px] lg:max-w-none">
            <FramePreview
              nativeWidth={375}
              nativeHeight={812}
              ariaLabel="Live mobile preview of Bonus Agent dashboard"
            />
          </Reveal>
        </div>
        <Reveal delay={0.12}>
          <p className="mx-auto mt-5 max-w-2xl text-balance text-center text-sm leading-snug text-muted-foreground sm:text-base">
            On screen: timeline kanban — 14 days of promos at a glance. Click any card to expand the inline Promo Engine editor.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-3 sm:mt-14">
            <Button asChild size="lg" data-icon="inline-end">
              <a href={DASHBOARD_URL} target="_blank" rel="noreferrer">
                Open the live dashboard
                <HugeiconsIcon icon={ArrowRight01Icon} className="size-4" />
              </a>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* Window-chrome card wrapping a live <iframe> rendered at a chosen native
   viewport (`nativeWidth` × `nativeHeight`) and scaled via ResizeObserver
   to exactly fill the card width. The card's own aspect ratio is derived
   from the native dimensions so the iframe always fills the surface with
   no letterboxing, regardless of viewport.

   Used for both desktop (1280×720) and mobile (375×812) variants — the
   only difference is the native size passed in. Scaling preserves
   readability across viewports: the dashboard renders ONCE at the chosen
   breakpoint and is then zoomed visually, instead of forcing its
   responsive logic to re-flow at an awkward container width. */
function FramePreview({
  nativeWidth,
  nativeHeight,
  ariaLabel,
}: {
  nativeWidth: number
  nativeHeight: number
  ariaLabel: string
}) {
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  // Initial scale is a reasonable fallback before the ResizeObserver fires
  // so the iframe isn't rendered at 1× and overflowing for one paint.
  const [scale, setScale] = useState(0.5)

  useEffect(() => {
    const el = wrapperRef.current
    if (!el || typeof ResizeObserver === "undefined") return
    const ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width
      if (w && w > 0) setScale(w / nativeWidth)
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [nativeWidth])

  return (
    <div>
      <Card className="overflow-hidden">
        <div className="flex items-center gap-1.5 border-b border-border px-4 py-3">
          <span className="size-3 rounded-full bg-foreground/15" />
          <span className="size-3 rounded-full bg-foreground/15" />
          <span className="size-3 rounded-full bg-foreground/15" />
          <span className="ml-3 truncate font-mono text-xs text-muted-foreground">
            bonus-agent-demo.pages.dev
          </span>
        </div>
        <div
          ref={wrapperRef}
          className="relative h-[350px] overflow-hidden bg-surface-1 lg:h-[450px]"
        >
          <iframe
            src={DASHBOARD_URL}
            title={ariaLabel}
            loading="lazy"
            className="absolute left-0 top-0 origin-top-left border-0"
            style={{
              width: `${nativeWidth}px`,
              height: `${nativeHeight}px`,
              transform: `scale(${scale})`,
            }}
          />
        </div>
      </Card>
    </div>
  )
}

/* ── how it works ──────────────────────────────────────────────────────────
   Four panels joined by connector lines, each level with its own short note —
   CadencePipeline owns that grid. Caption copy is provisional; swap in the real
   per-step text when it lands. */
function HowItWorks() {
  const { how, pipeline } = useCopy()
  return (
    <section id="how" className="scroll-mt-20 py-14 sm:py-20">
      <div className={SHELL}>
        <SectionHeader eyebrow={how.eyebrow} title={how.title} />
        <div className="mt-14 lg:mt-20">
          <CadencePipeline captions={pipeline.captions} />
        </div>
      </div>
    </section>
  )
}

/* ── problem → fix ─────────────────────────────────────────────────────────
   Three rows, each = problem-card (5 cols) · horizontal flow connector
   (2 cols) · fix-card (5 cols), of a 12-column grid that fills the section
   shell. The "THE PROBLEM" / "THE FIX" labels live OUTSIDE the cards (above
   the first row, aligned to the same 5-col tracks), so the cards read as
   individual stat-cards and the connector visually pairs each problem with
   its fix. Connector — `cdnFlow` flowing dashes on a non-scaling stroke +
   three `<animateMotion>` packet dots riding a horizontal `M0 2 H100` path,
   same vocabulary as the pipeline's vertical connectors. Mobile (`<lg`):
   single column, problem card → fix card (connector hidden). Per ux-037
   (minimum text-base on the site): description text is `text-base` (was
   `text-sm`); stat text scales up to `text-3xl sm:text-4xl lg:text-5xl`
   for the wider 5-col card. */
function ProblemFix() {
  const { problemFix } = useCopy()
  return (
    <section className={`${SHELL} py-14 sm:py-20`}>
      <SectionHeader eyebrow={problemFix.eyebrow} title={problemFix.title} />
      {/* Column labels — outside the cards, aligned to the 5-of-12 tracks */}
      <Reveal delay={0.05}>
        <div className="mt-12 grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-5">
            <Eyebrow>{problemFix.problemLabel}</Eyebrow>
          </div>
          <div aria-hidden className="hidden lg:col-span-2 lg:block" />
          <div className="col-span-12 lg:col-span-5">
            <Eyebrow>{problemFix.fixLabel}</Eyebrow>
          </div>
        </div>
      </Reveal>
      {/* Three rows — one per problem→fix pair. Vertical rhythm:
          - mobile: inside-pair gap halved to 1.5 rem (`gap-y-6`) so the
            paired metrics couple visually; between-pair gap stays 3 rem
            (outer `gap-12`) — ratio 1 : 2 reads as 3 distinct pairs, not
            6 separate cards. The mobile-only vertical line lives INSIDE
            this 1.5 rem inter-card gap, anchored at the bottom of the
            problem-card via `top-full` so its top edge touches
            problem.bottom and its bottom edge touches fix.top (h-6 =
            1.5 rem exactly). The connector sits at `-z-10` so the SVG
            stroke bleed (y=-4..104% in viewBox units) is occluded by the
            card's `bg-surface-1` at the bleed overlap — line visibly ENDS
            at each card's border instead of painting over it.
          - desktop: outer `lg:gap-6` (1.5 rem between pairs), row's
            `lg:gap-y-0` (irrelevant — single row), `lg:gap-x-6` (1.5 rem
            between cards). The connector cell appears as `lg:col-span-2`
            with a horizontal SVG line + CSS packet dots. */}
      <div className="mt-6 flex flex-col gap-12 lg:gap-6">
        {problemFix.flows.map((f, i) => (
          <Reveal key={i} delay={0.08 + i * 0.05}>
            {/* `isolate` on the row so the connector's negative-area paint
                (and the cards' `z-10`) is scoped — no leakage into App bg. */}
            <div className="isolate grid grid-cols-12 items-stretch gap-x-6 gap-y-6 lg:gap-y-0">
              {/* Cards live at `z-10` so the connector's extended SVG line
                  bleeds (x1=-50, x2=150 — far past the gap-x-6) hide under
                  the card's `bg-surface-1` at the card's edges. Visually the
                  line ENDS exactly at each card's border on both sides. */}
              <Card className="relative z-10 col-span-12 p-7 lg:col-span-5 lg:p-10">
                <div className="text-3xl font-semibold tabular-nums text-foreground sm:text-4xl lg:text-5xl">
                  {f.pain.stat}
                </div>
                <div className="mt-3 text-base leading-relaxed text-muted-foreground lg:text-lg">{f.pain.title}</div>
                {/* Mobile-only vertical connector — anchored to THIS card's
                    bottom edge via `top-full`. Height `h-6` (1.5 rem) =
                    exactly the row's `gap-y-6`, so the line spans the gap
                    between problem-card and fix-card cleanly. `-z-10` puts
                    the connector behind the card's static content in the
                    card's stacking context (Card has `z-10` so it owns its
                    own context); the SVG bleed (y=-4..104% in viewBox
                    units) is therefore occluded by the card's bg at the
                    overlap — line visibly ENDS at the card's border.
                    Round 12: dropped to 2 packet dots (was 3) — the line
                    reads tidier on narrow viewports without losing the
                    "data moving" cue. */}
                <FlowConnector
                  dots={2}
                  className="pointer-events-none absolute -z-10 left-1/2 top-full h-6 w-4 -translate-x-1/2 lg:hidden"
                />
              </Card>
              {/* Desktop-only connector cell — horizontal SVG line + CSS
                  packet dots between problem and fix cards in the same row.
                  Hidden on mobile (line lives inside problem-card above).
                  The SVG line's x1=-50 / x2=150 bleeds 50% of cell-width past
                  each edge — far enough to cross the gap-x-6 (1.5 rem) AND
                  punch into the cards' interior; the cards' `z-10` covers
                  that bleed so the line visibly ENDS at each card's border. */}
              <div
                aria-hidden
                className="hidden lg:col-span-2 lg:flex lg:items-center lg:justify-center"
              >
                <div className="relative w-full">
                  <svg
                    viewBox="0 0 100 4"
                    preserveAspectRatio="none"
                    className="block h-4 w-full overflow-visible"
                  >
                    {/* faint always-there wire — extended bleed past the gap */}
                    <line
                      x1="-50"
                      y1="2"
                      x2="150"
                      y2="2"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      vectorEffect="non-scaling-stroke"
                      className="text-foreground/20"
                    />
                    {/* flowing dashes — extended bleed past the gap */}
                    <line
                      x1="-50"
                      y1="2"
                      x2="150"
                      y2="2"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeDasharray="2 8"
                      vectorEffect="non-scaling-stroke"
                      className="text-foreground/60 [animation:cdnFlow_0.9s_linear_infinite] motion-reduce:[animation:none]"
                    />
                  </svg>
                  {/* two packet dots — CSS divs riding `left: 0% → 100%`
                      via cdnPacketH; staggered half-a-cycle apart so
                      there's always one travelling. Round 12: halved
                      from 3 → 2 dots — line reads cleaner, the receiving
                      fix-card's borderRide particles (see below) now
                      carry the "data arrives" beat the third dot used
                      to. */}
                  {[0, -1.2].map((delay, idx) => (
                    <span
                      key={idx}
                      className="pointer-events-none absolute top-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground shadow-[0_0_9px_2px_#ffffff33] [animation:cdnPacketH_2.4s_linear_infinite] motion-reduce:hidden"
                      style={{ animationDelay: `${delay}s` }}
                    />
                  ))}
                </div>
              </div>
              <Card className="relative z-10 col-span-12 p-7 lg:col-span-5 lg:p-10">
                <div className="text-3xl font-semibold tabular-nums text-foreground sm:text-4xl lg:text-5xl">
                  {f.fix.stat}
                </div>
                <div className="mt-3 text-base leading-relaxed text-muted-foreground lg:text-lg">{f.fix.title}</div>
              </Card>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/* ── economics ─────────────────────────────────────────────────────────── */
function Economics() {
  const { economics } = useCopy()
  return (
    <section className={`${SHELL} py-14 sm:py-20`}>
      <SectionHeader eyebrow={economics.eyebrow} title={economics.title} />
      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
        {economics.cards.map((c, i) => (
          <Reveal key={c.badge} delay={i * 0.06}>
            <Card className="h-full p-6 lg:p-8">
              <Eyebrow>{c.badge}</Eyebrow>
              <div className="mt-5 flex items-baseline gap-2">
                <span className="text-3xl font-semibold tabular-nums text-foreground sm:text-4xl">
                  {c.big}
                </span>
                <span className="text-base text-muted-foreground">{c.sub}</span>
              </div>
              <div className="mt-6 flex flex-col gap-3">
                {c.rows.map(([k, v]) => (
                  <div key={k} className="flex items-baseline justify-between gap-3 border-t border-border pt-3 first:border-t-0 first:pt-0">
                    <span className="text-base text-foreground">{k}</span>
                    <span className="text-base text-muted-foreground">{v}</span>
                  </div>
                ))}
              </div>
            </Card>
          </Reveal>
        ))}
      </div>
      {economics.footnote && (
        <Reveal delay={0.1}>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {economics.footnote}
          </p>
        </Reveal>
      )}
    </section>
  )
}

/* ── after-engagement fork connector ───────────────────────────────────────
   3-arm dashed fork (stem → split → left/center/right) in the same visual
   vocabulary as CadencePipeline / HandoffPanel: faint base wire + cdnFlow
   dashed stream + packet dots riding each segment via animateMotion. Chip
   parked mid-stem carries the section label.

   Geometry (viewBox 0 0 100 44, preserveAspectRatio="none"):
     · stem            M50 0  V22        (top → fork point)
     · left branch     M50 22 C 50 33 17 32 17 44   (curves out to col 1 centre)
     · center branch   M50 22 V 44                  (straight down to col 2)
     · right branch    M50 22 C 50 33 83 32 83 44   (curves out to col 3 centre)
   Column centres at 17 / 50 / 83 % match the 3-col grid below (gap-3 nudges
   the column centres slightly off the gridless ideal of 16.7 / 50 / 83.3 %,
   close enough). All packet dots use `rotate="0"` so they don't tilt along
   tangents (ux-031). Hidden under sm: cards stack vertically there. */
function AfterFork({ chip }: { chip: string }) {
  // Round 8: SVG <ellipse rx ry> packet dots squished at narrower viewports
  // because preserveAspectRatio="none" stretches the viewBox X≫Y by a ratio
  // that varies with container width — no single rx/ry value reads round at
  // every breakpoint. Moved the dots out of SVG entirely: now HTML <span>s
  // ride CSS `offset-path: path(...)` with pixel coords computed from the
  // live container size. Dots are real `rounded-full` circles, so they stay
  // round at any viewport. Static dashed lines stay in SVG (vector-effect
  // preserves stroke width, so non-uniform stretch is fine for lines).
  // Per ux-031: offset-rotate: 0deg on vertical offset-path rides.
  const ref = useRef<HTMLDivElement>(null)
  const [dims, setDims] = useState({ w: 0, h: 0 })

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const update = () => setDims({ w: el.clientWidth, h: el.clientHeight })
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // Pixel paths matching the original 100×44 viewBox geometry:
  // stem (50,0)→(50,22), then left/middle/right branches splitting at y=22.
  const { w, h } = dims
  const cx = w / 2
  const yFork = (h * 22) / 44
  const yC1 = (h * 33) / 44
  const yC2 = (h * 32) / 44
  const xL = (w * 17) / 100
  const xR = (w * 83) / 100
  const stemPath = `M ${cx} 0 V ${yFork}`
  const leftPath = `M ${cx} ${yFork} C ${cx} ${yC1}, ${xL} ${yC2}, ${xL} ${h}`
  const middlePath = `M ${cx} ${yFork} V ${h}`
  const rightPath = `M ${cx} ${yFork} C ${cx} ${yC1}, ${xR} ${yC2}, ${xR} ${h}`

  return (
    // Round 9: bumped sm:h-36 → sm:h-48 + chip top-[30%] → top-[35%] so
    // the chip has more breathing room above (chip-top ↔ offer card bottom
    // ≈ 51 px now, was 27 px). Stem still touches the card top (mt-0 on
    // outer Reveal stays). Below sm: cards stack so the fork is hidden.
    <div ref={ref} className="relative hidden h-32 w-full sm:block sm:h-48">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <svg viewBox="0 0 100 44" preserveAspectRatio="none" className="block size-full overflow-visible">
          {/* faint always-there base wire — four segments */}
          <g className="text-foreground/20">
            <path d="M50 0 V22" fill="none" stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
            <path d="M50 22 C 50 33 17 32 17 44" fill="none" stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
            <path d="M50 22 V 44" fill="none" stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
            <path d="M50 22 C 50 33 83 32 83 44" fill="none" stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
          </g>
          {/* stem dashes, in phase */}
          <g className="text-foreground/60 [animation:cdnFlow_0.9s_linear_infinite] motion-reduce:[animation:none]">
            <path d="M50 0 V22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 8" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
          </g>
          {/* branch dashes, phase-shifted half a cycle — reads as "stem feeds
              into all three branches", not one continuous tape */}
          <g
            className="text-foreground/60 [animation:cdnFlow_0.9s_linear_infinite] motion-reduce:[animation:none]"
            style={{ animationDelay: "-0.45s" }}
          >
            <path d="M50 22 C 50 33 17 32 17 44" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 8" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
            <path d="M50 22 V 44" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 8" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
            <path d="M50 22 C 50 33 83 32 83 44" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 8" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
          </g>
        </svg>
      </div>
      {/* HTML packet dots — `size-1.5 rounded-full` real circles riding
          CSS offset-path. Stem fires at 0 s, branches at 0.4 s so the
          pulse reads as "arrives at the fork, splits three ways". The
          `borderRide` keyframe animates offset-distance 0→100% with the
          same 0.12 / 0.88 opacity envelope we had on the SVG version. */}
      {w > 0 && h > 0 && (
        <div aria-hidden className="pointer-events-none absolute inset-0 motion-reduce:hidden">
          {(
            [
              { path: stemPath, delay: "0s" },
              { path: leftPath, delay: "0.4s" },
              { path: middlePath, delay: "0.4s" },
              { path: rightPath, delay: "0.4s" },
            ] as const
          ).map((d, i) => (
            <span
              key={i}
              style={{
                offsetPath: `path("${d.path}")`,
                offsetRotate: "0deg",
                animationDelay: d.delay,
              }}
              className="absolute left-0 top-0 size-1.5 rounded-full bg-foreground [animation:borderRide_2.4s_linear_infinite] [filter:drop-shadow(0_0_2px_rgba(255,255,255,0.45))]"
            />
          ))}
        </div>
      )}
      {/* Chip parked above the fork-dot. With the bumped sm:h-48 (192 px)
          container, top-[35%] puts chip-center at ≈ 67 px from the top —
          chip-top ≈ 51 px (≈ 3.2 rem above the card, doubled from round 7),
          chip-bottom ≈ 83 px, fork-dot at 50% = 96 px → chip-bottom ≈
          0.8 rem above the fork-dot. */}
      <span className="absolute left-1/2 top-[35%] z-10 inline-flex -translate-x-1/2 -translate-y-1/2 items-center whitespace-nowrap rounded-full bg-primary px-4 py-2 font-mono text-sm text-primary-foreground">
        {chip}
      </span>
    </div>
  )
}

/* ── pricing ───────────────────────────────────────────────────────────── */
function Pricing() {
  const { pricing } = useCopy()
  const { poc, after } = pricing
  /* Block-level section labels ("How the three weeks run", "What you take
     home") stay at the marketing-site eyebrow floor (text-base) per ux-037. */
  const blockEyebrow =
    "text-base font-medium uppercase tracking-[0.18em] text-muted-foreground"
  /* Inline column-header labels ("Week 1", "01") sit RIGHT of a size-7 icon
     as a paired header row. Bumped back to text-base (the marketing floor
     per ux-037) for parity with the WHAT YOU TAKE HOME row — Ivan: "цифры
     рядом с WEEK выглядят меньше букв". `tabular-nums` keeps the digit
     glyphs at fixed width so 1/2/3 align cleanly between rows. */
  const inlineLabel =
    "text-base font-medium uppercase tracking-[0.18em] tabular-nums text-muted-foreground"
  const columnTitle = "text-xl font-medium text-foreground"
  return (
    <section id="pricing" className={`${SHELL} scroll-mt-20 pt-14 sm:pb-0 sm:pt-20`}>
      <SectionHeader eyebrow={pricing.eyebrow} title={pricing.title} subtitle={pricing.sub} />

      {/* Main offer */}
      <Reveal className="relative mt-12">
        {/* Card — overflow-hidden clips bg-surface-1 footer to rounded-2xl.
            Round 14: dropped the dashed `border-foreground/20` ux-038 frame
            and the 7-particle perimeter ride. The plain `border-border`
            now matches the rest of the section; the offer reads as a
            content surface, not a decorated one. */}
        <div className="overflow-hidden rounded-2xl border border-border">
          {/* Header: label + 2-col reflow on lg+. Left col: PROOF OF CONCEPT
              eyebrow + €5000. Right col: anchor paragraph. The header uses a
              tighter `lg:gap-x-4` (1 rem) so the paragraph reads pulled-in
              against the €5000 digit (was lg:gap-x-10 → too airy, the price
              and the price-anchor argument felt unrelated). The Weeks /
              Take-home grids below keep their own wider `sm:gap-x-10`
              between column items — different grid, different rhythm.
              `lg:mt-10` puts the anchor TOP at the €5000 digit-cap
              (eyebrow line-height 24 px + mt-4 gap 16 px = 40 px). The
              closing phrase "pays itself back on the first catch" gets
              text-foreground font-medium — the rhetorical pay-off that
              re-frames €5000 from cheque to obvious bet. Mobile: stacks
              1-col with gap-y-5 between price and paragraph.

              pb-16 (2× the top pt-8 / 32 px → 64 px) levels the subsection
              against its top — without doubling the bottom, the eyebrow
              row added visual height at the top that left the section
              feeling unbalanced. Same correction on the Weeks / Take-home
              subsections below. */}
          <div className="grid gap-y-5 px-8 pb-8 pt-8 sm:pb-16 lg:grid-cols-3 lg:items-start lg:gap-x-4 lg:gap-y-0 lg:px-10">
            <div>
              <p className={blockEyebrow}>{poc.label}</p>
              <span className="mt-4 block text-5xl font-semibold tabular-nums text-foreground sm:text-6xl">
                {poc.price}
              </span>
            </div>
            <p className="max-w-2xl text-base leading-relaxed text-muted-foreground lg:col-span-2 lg:mt-10">
              {poc.anchor}{" "}
              <span className="font-medium text-foreground">{poc.anchorHighlight}</span>
            </p>
          </div>

          {/* Three weeks — 3-col grid. Each column header is icon + small
              "Week N" label inline; subgrid keeps header / title / body rows
              aligned across the three columns regardless of body length.
              Block-label → columns gap = mt-16 (round 4 bump from mt-6, ≈2.7×)
              so the section heading actually feels like a heading. */}
          <div className="border-t border-border px-8 pb-8 pt-8 sm:pb-16 lg:px-10">
            <p className={blockEyebrow}>{poc.weeksLabel}</p>
            <div className="mt-16 grid gap-y-16 sm:grid-cols-3 sm:grid-rows-[auto_auto_1fr] sm:gap-x-10 sm:gap-y-10">
              {poc.weeks.map((w, i) => (
                <div
                  key={w.n}
                  className="grid gap-y-4 sm:row-span-3 sm:grid-rows-subgrid sm:gap-y-0"
                >
                  <div className="flex items-center gap-4">
                    <HugeiconsIcon icon={WEEK_ICONS[i]} className="size-7 shrink-0 text-foreground" aria-hidden />
                    <span className={inlineLabel}>{w.n}</span>
                  </div>
                  <p className={`${columnTitle} sm:mt-6`}>{w.title}</p>
                  <p className="text-base leading-snug text-muted-foreground sm:mt-4">{w.body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* What you take home — three distinct artefacts (baseline / handbook
              / recommendation). Same column shape as Weeks above: icon + 01/02/03
              inline as the header row, then title, then body. This is the LAST
              block in the card — the "what you get" beat that should land on
              the eye-out. */}
          <div className="border-t border-border px-8 pb-8 pt-8 sm:pb-16 lg:px-10">
            <p className={blockEyebrow}>{poc.takeHomeLabel}</p>
            <div className="mt-16 grid gap-y-16 sm:grid-cols-3 sm:grid-rows-[auto_auto_1fr] sm:gap-x-10 sm:gap-y-10">
              {poc.takeHome.map((t, i) => (
                <div
                  key={t.name}
                  className="grid gap-y-4 sm:row-span-3 sm:grid-rows-subgrid sm:gap-y-0"
                >
                  <div className="flex items-center gap-4">
                    <HugeiconsIcon icon={TAKEHOME_ICONS[i]} className="size-7 shrink-0 text-foreground" aria-hidden />
                    <span className={`${inlineLabel} tabular-nums`}>{`0${i + 1}`}</span>
                  </div>
                  <p className={`${columnTitle} sm:mt-6`}>{t.name}</p>
                  <p className="text-base leading-snug text-muted-foreground sm:mt-4">{t.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </Reveal>

      {/* After the engagement — REBALANCED 2026-05-15: Across-your-brands
          (the default) moves from LEFT to CENTER and gets the strongest
          treatment — inverted white card + Default-next-step badge +
          dashed border + 4 borderRide particles. Just-this-brand moves
          to LEFT (quiet neutral). Walk-away stays RIGHT but loses the
          dashed treatment and the particles — now plain border, the
          trust anchor reads as "you can leave with everything", not as
          a deemphasized escape hatch. Subgrid keeps icon / title / desc
          rows aligned across all three. A 3-arm fork connector sits
          above the grid on sm+; hidden on mobile — cards stack. */}
      <Reveal delay={0.06} className="mt-0">
        {/* Fork connector on sm+; the chip carries the section label.
            Below sm: just render the label as an eyebrow (cards stack
            vertically; a horizontal 3-arm fork would look wrong). */}
        <AfterFork chip={after.label} />
        {/* Mobile-only connector slot — replaces the prior plain
            eyebrow with a short vertical FlowConnector + a centred
            `bg-primary` chip, matching the desktop fork-chip vocabulary
            (AfterFork above) on a narrow viewport where the 3-arm fork
            can't render. The chip uses `after.shortLabel` so the line
            doesn't wrap. */}
        <div className="relative flex h-32 items-center justify-center sm:hidden">
          <FlowConnector
            dots={3}
            className="pointer-events-none absolute inset-y-0 left-1/2 w-4 -translate-x-1/2"
          />
          <span className="relative z-10 inline-flex items-center whitespace-nowrap rounded-full bg-primary px-4 py-2 font-mono text-sm text-primary-foreground">
            {after.shortLabel}
          </span>
        </div>
        <div className="grid gap-3 sm:mt-0 sm:grid-cols-3 sm:grid-rows-[auto_auto_1fr] sm:gap-x-10">
          {after.options.map((o, i) => {
            // After 2026-05-15 reorder: options = [Just this brand, Across
            // your brands, Walk away]. Across (the default) is the center
            // slot (i === 1) with the strongest treatment — inverted white
            // card. Round 12: stripped the card to plain white — dropped
            // the dashed border AND the left-side running-dots strip
            // (rounds 10/11). The bare inversion alone is the
            // recommendation cue now; the dashed border + animated dots
            // felt over-decorated against the calm flanking cards.
            const isPrimary = i === 1
            const cardClass = isPrimary
              ? "bg-foreground text-background"
              : "border border-border bg-surface-1"
            const titleClass = isPrimary ? "text-background" : "text-foreground"
            const descClass = isPrimary ? "text-background/75" : "text-muted-foreground"
            const iconClass = isPrimary ? "text-background" : "text-foreground"
            return (
              <div
                key={o.name}
                className={`relative grid gap-y-4 rounded-xl p-5 sm:row-span-3 sm:grid-rows-subgrid sm:gap-y-0 ${cardClass}`}
              >
                <div className="flex items-center gap-3">
                  <HugeiconsIcon icon={AFTER_ICONS[i]} className={`size-7 ${iconClass}`} aria-hidden />
                </div>
                <div className={`text-xl font-medium sm:mt-2 ${titleClass}`}>{o.name}</div>
                {/* Description: copy is authored with `\n\n` paragraph
                    breaks (round 21) so the three cards land at roughly
                    the same height. Render each chunk as its own `<p>`
                    with a 12 px gap between them. */}
                <div className={`flex flex-col gap-3 text-base leading-snug sm:mt-2 ${descClass}`}>
                  {o.desc.split("\n\n").map((para, idx) => (
                    <p key={idx}>{para}</p>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </Reveal>
      {/* No mid-page CTA here — the redesigned FinalCta below is the
          single Contact-us anchor for the bottom of the page (ux-042). */}
    </section>
  )
}

/* ── final cta ─────────────────────────────────────────────────────────────
   2026-05-15 redesign — the old block was a verbatim restatement of the
   pricing pitch ("One brand. All bonus types. Three weeks." + the full
   walk-away copy). Replaced with a tighter "Ready for changes?" panel:
   a full-width surface-1 container with a mirrored 3-arm fork dropping
   into it (visual continuation of the AfterFork section above — the
   three brand options converge here), and a centred ~25 rem inner card
   on a slightly lighter surface-2 tint, carrying the question, a one-
   sentence value re-anchor, and a single Telegram CTA. Border particles
   ride both the outer container AND the inner card (offset-path: inset
   round 1rem · borderRide). Mirror fork hidden on mobile (the 3
   AfterFork cards stack there; a 3→1 fork would read wrong). */
function FinalCta() {
  const { finalCta } = useCopy()
  // Live container dims for the mirrored fork — same pattern as AfterFork:
  // HTML <span> dots ride CSS `offset-path: path(...)` with pixel coords
  // computed from the container size, so the dots stay perfectly round at
  // any viewport (SVG <ellipse> + preserveAspectRatio="none" squashes the
  // dots non-uniformly). Static dashed lines stay in SVG (non-scaling
  // stroke handles their width).
  const forkRef = useRef<HTMLDivElement>(null)
  const [forkDims, setForkDims] = useState({ w: 0, h: 0 })
  useEffect(() => {
    const el = forkRef.current
    if (!el) return
    const update = () => setForkDims({ w: el.clientWidth, h: el.clientHeight })
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])
  // Pixel paths matching the SVG's 100×44 viewBox geometry:
  // 3 entry paths from top (xL/cx/xR, 0) curve / drop down to the fork
  // point (cx, yFork); stem then drops (cx, yFork) → (cx, h).
  const { w, h } = forkDims
  const cx = w / 2
  const xL = (w * 17) / 100
  const xR = (w * 83) / 100
  const yC1 = (h * 11) / 44
  const yC2 = (h * 12) / 44
  const yFork = (h * 22) / 44
  const leftEntryPath = `M ${xL} 0 C ${xL} ${yC1}, ${cx} ${yC2}, ${cx} ${yFork}`
  const centerEntryPath = `M ${cx} 0 V ${yFork}`
  const rightEntryPath = `M ${xR} 0 C ${xR} ${yC1}, ${cx} ${yC2}, ${cx} ${yFork}`
  const stemPath = `M ${cx} ${yFork} V ${h}`
  return (
    <section id="cta" className={`${SHELL} scroll-mt-20 pb-14 sm:pb-20 sm:pt-0`}>
      {/* Mirrored fork — 3 entry stems from above (x = 17 / 50 / 83 align
          with the AfterFork brand-card centres in the Pricing section
          above) converge at the fork-point (50, 22), then one stem drops
          to (50, 44) where it meets the outer container's top edge. Same
          dashed-flow + packet-dot vocabulary as AfterFork; hidden < sm
          where the brand cards stack vertically and a horizontal fork
          would read as a glitch. */}
      <Reveal>
        {/* Mobile (< sm): vertical FlowConnector with packet dots, since
            the 3-arm mirror fork doesn't read on a stack-of-cards layout.
            Replaces the dead-air gap between the last AfterFork card and
            the FinalCta panel with a continuation cue. */}
        <FlowConnector
          dots={3}
          className="mx-auto h-24 w-4 sm:hidden"
        />
      </Reveal>
      <Reveal>
        <div ref={forkRef} aria-hidden className="relative hidden h-32 w-full sm:block sm:h-40">
          <svg viewBox="0 0 100 44" preserveAspectRatio="none" className="block size-full overflow-visible">
            {/* faint always-there base wire */}
            <g className="text-foreground/20">
              <path d="M17 0 C 17 11 50 12 50 22" fill="none" stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
              <path d="M50 0 V 22" fill="none" stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
              <path d="M83 0 C 83 11 50 12 50 22" fill="none" stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
              <path d="M50 22 V 44" fill="none" stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
            </g>
            {/* branch dashes — the 3 entry stems, in phase (they all feed
                the same fork-point so a single phase reads as "all three
                arriving together") */}
            <g className="text-foreground/60 [animation:cdnFlow_0.9s_linear_infinite] motion-reduce:[animation:none]">
              <path d="M17 0 C 17 11 50 12 50 22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 8" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
              <path d="M50 0 V 22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 8" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
              <path d="M83 0 C 83 11 50 12 50 22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 8" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
            </g>
            {/* stem dashes, phase-shifted half a cycle — "the three converge,
                then a single packet drops into the CTA" */}
            <g
              className="text-foreground/60 [animation:cdnFlow_0.9s_linear_infinite] motion-reduce:[animation:none]"
              style={{ animationDelay: "-0.45s" }}
            >
              <path d="M50 22 V 44" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 8" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
            </g>
          </svg>
          {/* HTML packet dots — real `size-1.5 rounded-full` circles
              riding CSS offset-path. The 3 entries fire at 0 s, stem
              fires at 0.4 s — mirrors the AfterFork timing inversely
              (there: stem-then-branches; here: branches-then-stem) so
              the pulse reads as "the three brand paths arrive at the
              fork, then a single signal drops into the CTA". */}
          {w > 0 && h > 0 && (
            <div aria-hidden className="pointer-events-none absolute inset-0 motion-reduce:hidden">
              {(
                [
                  { path: leftEntryPath, delay: "0s" },
                  { path: centerEntryPath, delay: "0s" },
                  { path: rightEntryPath, delay: "0s" },
                  { path: stemPath, delay: "0.4s" },
                ] as const
              ).map((d, i) => (
                <span
                  key={i}
                  style={{
                    offsetPath: `path("${d.path}")`,
                    offsetRotate: "0deg",
                    animationDelay: d.delay,
                  }}
                  className="absolute left-0 top-0 size-1.5 rounded-full bg-foreground [animation:borderRide_2.4s_linear_infinite] [filter:drop-shadow(0_0_2px_rgba(255,255,255,0.45))]"
                />
              ))}
            </div>
          )}
        </div>
      </Reveal>

      <Reveal delay={0.05}>
        {/* Final container — bg-primary (round 22). The whole closing
            beat reverses the page's dark palette: primary fill, with a
            tight monochrome inversion — heading in `text-primary-
            foreground`, the CTA pill flipped to `bg-background +
            text-foreground` so it stands as the only dark element on
            the white field. No subtitle — the heading carries the
            entire beat in two lines; further explanation here would
            restate the page (ux-042). */}
        <div className="relative overflow-hidden rounded-2xl bg-primary px-6 py-24 text-center sm:px-12 sm:py-32">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-10">
            {/* Heading split on the first space so it renders in two
                lines (Ready / for changes?  · Готовы / к изменениям?).
                A simple `<br/>` between the first word and the rest is
                cleaner than crafting an awkward `text-balance` break. */}
            <h2 className="text-balance text-4xl font-semibold leading-[1.05] text-primary-foreground sm:text-5xl md:text-6xl lg:text-7xl">
              {finalCta.titleHead.split(/\s/, 1)[0]}
              <br />
              {finalCta.titleHead.split(/\s/).slice(1).join(" ")}
            </h2>
            {/* Primary CTA — dark pill on the white field, bigger than the
                standard `size="lg"` (h-12 / px-6) so it lands as the page's
                terminal action: h-14 + px-8 + text-base + size-5 icon.
                Explicit `rounded-full` so the corners read as a true pill
                regardless of the Button preset (was rounded-4xl). The
                Telegram glyph is a filled inline SVG (free Hugeicons ships
                only the outlined Telegram variant). */}
            <Button
              asChild
              size="lg"
              className="h-14 rounded-full bg-background px-8 text-base text-foreground hover:bg-background/90"
            >
              <a
                href={TELEGRAM_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden
                  className="size-5"
                >
                  <path d="M2.01 21 23 12 2.01 3 2 10l15 2-15 2 .01 7z" />
                </svg>
                {finalCta.cta}
              </a>
            </Button>
          </div>
        </div>
      </Reveal>
    </section>
  )
}

/* ── footer ────────────────────────────────────────────────────────────── */
function CadenceFooter() {
  const { footer } = useCopy()
  return (
    <footer className="bg-surface-1">
      <div className={`flex items-center justify-between gap-4 py-10 text-base text-muted-foreground ${SHELL}`}>
        <span>{footer.copyright}</span>
        <ThemeSwitch />
      </div>
    </footer>
  )
}
