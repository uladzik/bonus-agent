import { eur } from "./money"

export const en = {
  brand: "Bonus Agent",
  badgeMono: "ba",
  nav: { cta: "Start now" },

  hero: {
    eyebrow: "For iGaming CRM & Promotions teams",
    titleHead: "Hundreds of campaigns a month.",
    titleTail: "None of them typed by hand.",
    sub: "The agent reads your retention calendar and writes every bonus into your Promo Engine — without operators, without field errors, at any volume.",
    stats: [
      { value: "< 1 min", label: "To prepare a campaign for review" },
      { value: "−99%", label: "Configuration errors at any scale" },
      { value: eur("13k", "/yr"), label: "Promo operator hire avoided at 2–5× volume" },
    ],
  },

  how: {
    eyebrow: "How it works",
    title: "From the spreadsheet your team keeps to Promo Engine — without the typing.",
  },

  pipeline: {
    captions: [
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
    ],
  },

  problemFix: {
    eyebrow: "Problem → Fix",
    title: "Manual today. Multiplies tomorrow. The agent flattens both.",
    problemLabel: "The problem",
    fixLabel: "The fix",
    flows: [
      {
        pain: { stat: "~20 min", title: "Manual entry — 16 h/week, grows with volume" },
        fix: { stat: "< 1 min", title: "Auto-fills 25+ Promo Engine fields" },
      },
      {
        pain: { stat: "1–2/mo", title: `Field mistakes, ~${eur(200)} each` },
        fix: { stat: "0 invalid", title: "JSON Schema validation on every field" },
      },
      {
        pain: { stat: eur("13k", "/yr"), title: "Another junior promo operator" },
        fix: { stat: "Same team", title: "Headcount flat at 2–5× volume" },
      },
    ],
  },

  economics: {
    eyebrow: "Economics",
    title: "The hard ROI is the floor. The scaling ROI is the real story.",
    cards: [
      {
        badge: "Direct savings",
        big: "< 1 min",
        sub: "per bonus · was 20 min",
        rows: [
          ["Time per bonus", "20 min → under 1 min"],
          ["Operator hours freed", "~16 h/week → under 1 h"],
          ["Error correction time", "~2 h/week → under 15 min"],
        ] as [string, string][],
      },
      {
        badge: "Scaling savings",
        big: "same team",
        sub: "at 2× volume",
        rows: [
          ["Second promo operator", "avoided at 2× volume"],
          ["Error rate at 2× volume", "stays flat"],
        ] as [string, string][],
      },
    ],
    footnote: "",
  },

  pricing: {
    eyebrow: "Pricing",
    title: "One engagement. Then you decide.",
    sub: "Three weeks on your real Promo Engine, with the agent running under your moderation. You walk away with measured numbers and a written recommendation — even if we don't continue.",
    poc: {
      label: "Proof of Concept",
      price: eur(5000),
      anchor:
        "About two months of one promo operator's salary. One misset wager rule can wipe a busy promo's whole revenue —",
      anchorHighlight: "the engagement pays itself back on the first catch.",
      weeksLabel: "How the three weeks run",
      weeks: [
        {
          n: "Week 1",
          title: "Sandbox",
          body: "We map your retention sheet to your Promo Engine contract on a sandbox brand. Production isn't touched yet.",
        },
        {
          n: "Week 2",
          title: "Real run",
          body: "The agent fills real campaigns under your moderation. Every minute, every field, every catch goes in the log.",
        },
        {
          n: "Week 3",
          title: "Report",
          body: "We write up the numbers, the handbook and our recommendation on extending the agent across the rest of your brands. Then we walk through it with your team.",
        },
      ],
      takeHomeLabel: "What you take home",
      takeHome: [
        {
          name: "Measured baseline",
          desc: "Your team's real numbers — minutes per campaign, manual hours per week, field errors validation caught before they shipped.",
        },
        {
          name: "Agent handbook",
          desc: "How the agent was configured for your data: parser cascade, validation schema, field map, and every unusual case it ran into.",
        },
        {
          name: "Recommendation",
          desc: "A short written go/no-go on extending the agent across the rest of your brands — for your decision.",
        },
      ],
    },
    after: {
      label: "after the engagement — you choose",
      shortLabel: "Then you choose",
      primaryBadge: "Default next step",
      options: [
        {
          name: "Just this brand",
          desc:
            "We stay on support and react fast to any changes — field types, schemas, Promo Engine shifts. Our team owns stability and delivery of every campaign.\n\nWhen something non-standard shows up, we fix it quickly and keep the agent running uninterrupted.",
        },
        {
          name: "Across your brands",
          desc:
            "We extend the agent to every brand in your stack.\n\nEach new brand goes live faster than the last.",
        },
        {
          name: "Walk away",
          desc:
            "A clear picture of what automation can and can't do in your Promo Engine.\n\nBuild it in-house, hire for it, or stay manual — your call.",
        },
      ],
    },
    ctaTalk: "Start talking",
  },

  finalCta: {
    titleHead: "Ready for changes?",
    cta: "Start now",
  },

  footer: {
    copyright: "© Bonus Agent",
  },
}

export type Copy = typeof en
