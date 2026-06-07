// Vihren Labs — canonical product catalog data
//
// Imported by:
//   - src/pages/index.astro (landing — uses courses + freeItems only)
//   - src/pages/products.astro (full catalog — uses everything)
//
// Each product carries `line` (product line) + `tier` (course | toolkit | bundle)
// so render blocks can filter/group consistently. Adding a new product = append
// to `products`; new line = append to `lineGroups` + tag relevant products.
//
// Verified live on Gumroad as of 2026-05-25.

export type Tier = 'course' | 'toolkit' | 'bundle';
export type LineSlug =
  | 'procurement'
  | 'programme-delivery'
  | 'sap'
  | 'master-data'
  | 'ai-governance'
  | 'transformation'
  | 'regulatory';

export interface Product {
  line: LineSlug;
  tier: Tier;
  tag: string;
  name: string;
  sub: string;
  price: string;
  team: string;
  url: string;
  // Optional retention/LTV surfaces (rendered on the product detail page).
  // Set lastUpdated ONLY on a genuine revision — it powers the "Last updated"
  // trust signal AND the update-announce loop (Gumroad Post to existing holders).
  // Never fabricate a date. See docs/RETENTION-PLAYBOOK.md.
  lastUpdated?: string;   // ISO date of the last real update
  changelog?: string;     // one-line "what's new", shown next to lastUpdated
  // Editorial override for the value-ladder CTA: the exact `name` of the next
  // product to recommend. Defaults to a derived within-line step (see ladderNext).
  next?: string;
  // Optional hand-written, buyer-intent FAQ entries for marquee products.
  // Merged with auto-generated brand/price/audience Q&As by buildProductFaq().
  // Phrase questions the way a buyer asks an AI assistant — these are the
  // GEO/AEO citation surface. Keep answers accurate + day-job-safe.
  faq?: { q: string; a: string }[];
}

export interface FreeItem {
  tag: string;
  name: string;
  sub: string;
  price: string;
  team: string;
  url: string;
}

export interface LineGroup {
  slug: LineSlug;
  title: string;
  sub: string;
}

export const products: Product[] = [
  // ─── COURSES ────────────────────────────────────────────────────────
  {
    line: 'master-data', tier: 'course',
    tag: 'Course · 10 modules',
    name: 'Master Data Excellence — Product & SKU Management',
    sub: '10 modules · 10 workbooks · 6 visual one-pagers · editable maturity heatmap · 25-50 page capstone. The full operator curriculum for product master data — from data model and lifecycle to governance, DQ, architecture, operations and value realization.',
    price: '$499', team: '$999',
    url: 'https://vihrenlabs.gumroad.com/l/ijyliz',
    faq: [
      {
        q: 'What does the Master Data Excellence course cover?',
        a: '10 modules spanning the product master-data lifecycle — data model and governance, data quality engineering, architecture, MDM operations and value realization — each with a workbook, plus 6 visual one-pagers, an editable maturity heatmap, and a 25-50 page capstone you complete against your own organization.',
      },
    ],
  },
  {
    line: 'transformation', tier: 'course',
    tag: 'Course · 10 modules',
    name: "The Transition Operator's Course — SSC, GBS & BPO Transitions",
    sub: '10 modules for running an enterprise transition from kickoff to BAU exit — engagement, FTE sizing, RACI, knowledge transfer, governance, UAT, go-live, hypercare. 18-tab transition management workbook + delivery-execution playbook + 6 visual one-pagers.',
    price: '$499', team: '$999',
    url: 'https://vihrenlabs.gumroad.com/l/iivnut',
    faq: [
      {
        q: 'What does the Transition Operator\'s Course cover?',
        a: '10 modules for running a shared-services, GBS or BPO transition end to end — engagement and scoping, FTE sizing, RACI, knowledge transfer, governance, UAT, go-live and hypercare to BAU exit — plus an 18-tab transition management workbook, a delivery-execution playbook and 6 visual one-pagers.',
      },
    ],
  },

  // ─── PROCUREMENT & VENDOR MANAGEMENT ────────────────────────────────
  {
    line: 'procurement', tier: 'toolkit',
    tag: 'Excel workbook',
    name: 'IT Vendor & SaaS Procurement TCO',
    sub: 'Vendor registry, 3-year TCO model, 12-month renewal pipeline, RFP scoring — from the distributor side of the table.',
    price: '$49', team: '$99',
    url: 'https://vihrenlabs.gumroad.com/l/eujpqc',
  },
  {
    line: 'procurement', tier: 'toolkit',
    tag: 'Ebook',
    name: 'Vendor-Side IT Procurement — The Playbook',
    sub: '8 chapters on how IT distributors and vendors actually price, discount and renew — and how to negotiate against it.',
    price: '$29', team: '$79',
    url: 'https://vihrenlabs.gumroad.com/l/ovyxjl',
  },
  {
    line: 'procurement', tier: 'bundle',
    tag: 'Operator pack',
    name: "Procurement Operator's Pack",
    sub: 'IT Vendor TCO + Procurement Playbook + bundle-exclusive Renewal Negotiation Cheat-Sheet. The full IT-procurement operator kit.',
    price: '$69', team: '$129',
    url: 'https://vihrenlabs.gumroad.com/l/lhigyh',
  },

  // ─── PROGRAMME DELIVERY & ENTERPRISE IT PMO ────────────────────────
  {
    line: 'programme-delivery', tier: 'toolkit',
    tag: 'Playbook + Excel',
    name: 'ERP Modernisation Strategy Playbook + Business Case Workbook',
    sub: 'Whether to modernise · which of 5 options · how to phase it. 4-page strategy guide + 6-tab business-case workbook. Before a consultant is on site.',
    price: '$49', team: '$99',
    url: 'https://vihrenlabs.gumroad.com/l/cryqw',
  },

  // ─── SAP / ERP OPERATIONS ──────────────────────────────────────────
  {
    line: 'sap', tier: 'toolkit',
    tag: 'Excel workbook',
    name: 'SAP S/4HANA Migration Cutover Excel',
    sub: '52-check readiness matrix, 46-step cutover run sheet, hypercare runbook. What breaks at 3 AM.',
    price: '$99', team: '$249',
    url: 'https://vihrenlabs.gumroad.com/l/fsslk',
    faq: [
      {
        q: 'What does the SAP S/4HANA cutover checklist include?',
        a: 'A 52-check go-live readiness matrix, a 46-step cutover run sheet sequenced for cutover weekend, and a hypercare runbook for the days after go-live — the operator controls that decide whether a cutover holds at 3 AM, in a workbook you can adapt to your own programme.',
      },
      {
        q: 'When does SAP ECC maintenance end, and how long does an S/4HANA migration take?',
        a: 'SAP ECC mainstream maintenance ends 31 December 2027. Because transformation capacity is finite, the practical planning cut-off for most mid-market organizations is well before then — the workbook is built to compress readiness and cutover planning rather than the multi-month implementation itself.',
      },
    ],
  },
  {
    line: 'sap', tier: 'toolkit',
    tag: 'Playbook ebook',
    name: "SAP S/4HANA Migration Playbook",
    sub: "The operator's guide beneath the workbook — phase gates, failure modes, the cutover-week methodology.",
    price: '$39', team: '$99',
    url: 'https://vihrenlabs.gumroad.com/l/bsxhb',
  },
  {
    line: 'sap', tier: 'bundle',
    tag: 'Operator pack',
    name: 'SAP Migration Operator\'s Pack',
    sub: 'The complete SAP S/4HANA migration kit — cutover workbook + playbook ebook + comms templates. The bundle a real cutover needs.',
    price: '$129', team: '$249',
    url: 'https://vihrenlabs.gumroad.com/l/yjebue',
  },

  // ─── MASTER DATA OPERATIONS ────────────────────────────────────────
  {
    line: 'master-data', tier: 'toolkit',
    tag: 'Excel workbook',
    name: 'Master Data Quality Audit Workbook',
    sub: '75 named SAP Master Data Management quality checks, field-level scoring, defect log and remediation tracker.',
    price: '$79', team: '$149',
    url: 'https://vihrenlabs.gumroad.com/l/znhthm',
    faq: [
      {
        q: 'What does the master data quality audit workbook check?',
        a: '75 named master-data quality checks with field-level scoring, a defect log and a remediation tracker — so you can score data quality across your master-data domains, prioritise the fixes that matter, and evidence the improvement over time.',
      },
    ],
  },
  {
    line: 'master-data', tier: 'toolkit',
    tag: 'Assessment',
    name: 'Master Data Management Maturity Assessment',
    sub: '78 anchored questions across 5 domains — a scored, banded read on master-data maturity.',
    price: '$79', team: '$149',
    url: 'https://vihrenlabs.gumroad.com/l/nwbvrn',
  },
  {
    line: 'master-data', tier: 'toolkit',
    tag: 'Playbook',
    name: 'MDG Operating Model Playbook',
    sub: 'Data owner + steward roles, RACI and governance-forum design — how to stand up an SAP MDG operating model.',
    price: '$49', team: '$79',
    url: 'https://vihrenlabs.gumroad.com/l/qwlgi',
  },
  {
    line: 'ai-governance', tier: 'toolkit',
    tag: 'Handbook + Excel',
    name: 'AI Center of Excellence Handbook',
    sub: 'Stand up an AI CoE and run the agent lifecycle end to end — org, governance, reference architecture, the 10-gate delivery lifecycle, RACI, metrics, maturity — with 3 worked use cases + a 9-tab tracking workbook. ~80-page handbook.',
    price: '$199', team: '$399',
    url: 'https://vihrenlabs.gumroad.com/l/mmkqsg',
    lastUpdated: '2026-06-06',
    changelog: 'Expanded to the ~80-page handbook + 9-tab workbook, with three end-to-end worked use cases.',
    faq: [
      {
        q: 'What does the AI Center of Excellence Handbook cover?',
        a: 'How to design and run an AI CoE end to end: the mandate and funding model, operating-model patterns, roles and RACI, the reference architecture and control plane, the governance framework (risk tiers, acceptable-use, approval gates), quality and incident standards, the 10-gate agent delivery lifecycle from intake to retirement, metrics and maturity — plus three end-to-end worked use cases (low, medium and high risk) and a 9-tab tracking workbook.',
      },
    ],
  },
  {
    line: 'ai-governance', tier: 'toolkit',
    tag: 'Excel + guide',
    name: 'AI Agent Use-Case Selection & Feasibility Scorecard',
    sub: 'Decide which use cases are good, feasible candidates for an AI agent before you build — score 6 weighted criteria, gate on data and risk, get a GO / PILOT / PARK verdict. 4-tab Excel + guide.',
    price: '$49', team: '$99',
    url: 'https://vihrenlabs.gumroad.com/l/hjtvm',
    lastUpdated: '2026-06-06',
    changelog: 'New SKU — 6-criteria weighted scorecard with the data/risk blocker rule and a GO / PILOT / PARK verdict.',
    faq: [
      {
        q: 'How do I choose which processes are good candidates for an AI agent?',
        a: 'Score each candidate 1-5 on six agent-suitability criteria — task structure, data readiness, value/ROI, risk containability, build feasibility, adoption readiness — with editable weights. The workbook returns a weighted score and a GO / PILOT / PARK verdict, plus a blocker rule that forces FIX-FIRST if data readiness or risk containability is too low, so a fatal weakness cannot hide behind a good average.',
      },
    ],
  },
  {
    line: 'ai-governance', tier: 'toolkit',
    tag: 'Assessment + Handbook',
    name: 'AI-Ready Operations — Readiness Assessment',
    sub: 'Score whether your data and process can carry an AI revenue or triage agent — 18 checks across 5 dimensions (identity, completeness, consistency, governance, process) returning a GO / FIX-FIRST / NOT-READY verdict, with a fix-first plan. Excel assessment + 15-page handbook + worked example + go/no-go brief.',
    price: '$149', team: '$299',
    url: 'https://vihrenlabs.gumroad.com/l/jrjbvp',
    lastUpdated: '2026-06-07',
    changelog: 'The Readiness Playbook expanded to a 15-page handbook — a 0–4 scoring rubric, two worked examples end to end, per-dimension remediation, autonomy calibration, a go-live runbook, and monitoring readiness over time. (Workbook also adds a re-score cadence + target.)',
    faq: [
      {
        q: 'Should I run this before deploying an AI agent on sales, support or operations?',
        a: 'Yes. An AI agent acts on whatever your data says — on duplicated or incomplete records it confidently produces the wrong rankings. This scores your data and process across five dimensions (identity, completeness, consistency, governance, process) and returns a GO / FIX-FIRST / NOT-READY verdict before you deploy, with a blocker gate so one weak dimension cannot hide behind a good average.',
      },
      {
        q: 'Is this a tool for building an AI agent?',
        a: 'No — it is the data and process readiness layer underneath, and it is deliberately tool-agnostic. It tells you whether your data can carry an agent and, if not, exactly what to fix and in what order. It does not recommend or build any specific AI tool, and it makes no revenue-multiple claims.',
      },
    ],
  },
  {
    line: 'ai-governance', tier: 'toolkit',
    tag: 'Excel workbook',
    name: 'AI Vendor Evaluation & TCO Workbook',
    sub: '6-tab Excel — AI vendor registry, 3-year TCO model, weighted evaluation scorecard, a governance quick-check, and a renewal/usage tracker. Price, govern and compare the AI tools you buy — before you sign.',
    price: '$39', team: '$79',
    url: 'https://vihrenlabs.gumroad.com/l/scbtwe',
    faq: [
      {
        q: 'How do I compare AI vendors and work out the real cost before buying?',
        a: 'This workbook gives you an AI vendor registry, a 3-year total-cost-of-ownership model, a weighted evaluation scorecard, a governance quick-check and a renewal/usage tracker — so you can score competing AI tools on the same basis, surface the true multi-year cost rather than the sticker price, and keep a governance and renewal record after you buy.',
      },
    ],
  },
  {
    line: 'ai-governance', tier: 'bundle',
    tag: 'Operator pack',
    name: 'AI Adoption & Governance Operator\'s Pack',
    sub: 'The complete AI governance system, bundled: the AI Center of Excellence Handbook (the frame) + the Use-Case Selection Scorecard, AI-Ready Operations, AI Adoption & AI Agents Playbook and AI Vendor Evaluation & TCO (the tools at each gate). Five products, one operator system.',
    price: '$349', team: '$649',
    url: 'https://vihrenlabs.gumroad.com/l/aglxp',
    lastUpdated: '2026-06-06',
    changelog: 'Evolved into the full 5-component system (Handbook + Scorecard + AI-Ready Ops + Adoption Playbook + Vendor TCO).',
  },
  {
    line: 'master-data', tier: 'bundle',
    tag: 'Operator pack',
    name: 'Master Data Operator\'s Pack',
    sub: 'Audit workbook + maturity assessment + governance playbook — the full master-data operating toolkit, bundled.',
    price: '$179', team: '$299',
    url: 'https://vihrenlabs.gumroad.com/l/oocvu',
  },

  // ─── TRANSFORMATION & SSC/GBS ──────────────────────────────────────
  {
    line: 'transformation', tier: 'toolkit',
    tag: 'Excel workbook',
    name: 'Transition Management Operator\'s Workbook',
    sub: 'Run an offshoring, SSC or BPO transition end to end — 18-tab Excel workbook + 12-phase delivery playbook + SOP + engagement templates. The standalone toolkit beneath Course 01.',
    price: '$179', team: '$349',
    url: 'https://vihrenlabs.gumroad.com/l/ehmnt',
  },

  // ─── REGULATORY & COMPLIANCE ───────────────────────────────────────
  {
    line: 'regulatory', tier: 'toolkit',
    tag: 'Starter pack',
    name: 'EU AI Act SME Compliance Starter',
    sub: 'Article 50 transparency tracker, high-risk register, deployer readiness assessment. Enforcement: 2 Aug 2026.',
    price: '€149', team: '€249',
    url: 'https://vihrenlabs.gumroad.com/l/rqems',
    faq: [
      {
        q: 'Is the EU AI Act SME Compliance Starter legal advice?',
        a: 'No. It is an operator-grade organizational and evidence toolkit — an Article 50 transparency tracker, a high-risk register and a deployer readiness assessment — built to help you structure and document compliance work. It is not legal advice; confirm your specific obligations with qualified counsel.',
      },
      {
        q: 'When does the EU AI Act apply?',
        a: 'Key deployer transparency obligations under Article 50 apply from 2 August 2026. The Starter is built so an SME can structure its readiness and evidence ahead of that date rather than starting from a blank page.',
      },
    ],
  },

  // ===== STAGED: Digital Transformation line — INERT until uncommented =====
  // The 6 below are built + audited (see Spreadsheet OS Collection/docs/DT-LINE-PUBLISH-PACK.md).
  // On each Gumroad publish: uncomment the entry, replace url 'TODO-…' with the real /l/ slug,
  // then rebuild + deploy. (Line slug 'transformation' reused; add a 'digital-transformation'
  // LineGroup above if you later want them split into their own line.)
  {
    line: 'transformation', tier: 'toolkit', tag: 'Excel + playbook',
    name: 'Process Transformation & Automation Toolkit',
    sub: 'Process inventory, automation scoring, a ranked backlog and a benefits model — plus a 15-page operating handbook on which automation type fits (integration › workflow › RPA › AI agent). Decide what to automate before you buy a tool.',
    price: '$79', team: '$149', url: 'https://vihrenlabs.gumroad.com/l/sjunh',
    lastUpdated: '2026-06-07',
    changelog: 'Playbook expanded to a 15-page operating handbook — a maturity self-check, the automatability test + re-engineering, a 5-process scorecard, the integration/workflow/RPA/AI tool decision with a worked example, the RPA true-cost model, a payback model, the operating discipline, a 90-day plan, two worked examples, and a glossary + templates.',
  },
  {
    line: 'ai-governance', tier: 'toolkit', tag: 'PDF + Excel (7 tabs)',
    name: 'AI Adoption & AI Agents Operating Playbook',
    sub: 'A 15-page operating handbook + a 7-tab workbook: scored use-case pipeline, dashboard, pilot scorecard, AI governance register, and an agents-in-production tracker — adopt AI without scaling the mess.',
    price: '$79', team: '$149', url: 'https://vihrenlabs.gumroad.com/l/ttxneg',
    lastUpdated: '2026-06-07',
    changelog: 'Expanded to a 15-page operating handbook — scoring rubrics, a worked example carried end to end, the agent operating model, a glossary, and fillable templates.',
  },
  {
    line: 'transformation', tier: 'toolkit', tag: 'Excel + Word',
    name: 'Organizational Change Management Pack',
    sub: 'Stakeholder map, change-impact, comms plan, training plan and adoption tracker — the people side of transformation.',
    price: '$59', team: '$119', url: 'https://vihrenlabs.gumroad.com/l/aqbqzl',
  },
  {
    line: 'transformation', tier: 'toolkit', tag: 'Excel + playbook',
    name: 'Transformation Delivery & PMO Pack',
    sub: 'Programme plan, initiative tracker, milestone gates, RAID, an auto-summarising status report and benefits — plus a 15-page operating handbook. Run the delivery PMO.',
    price: '$79', team: '$149', url: 'https://vihrenlabs.gumroad.com/l/mdntjx',
    lastUpdated: '2026-06-07',
    changelog: 'Playbook expanded to a 15-page operating handbook — a PMO maturity self-check, sizing the PMO, change control, the defensible-RAG rubric, reading-the-dashboard signals, budget burn-vs-progress, the conditional-pass discipline, the RAID dependency that bites, steering the steering committee, the benefits-realization gap, the recovery PMO, early-warning signals, metrics that matter, a worked example throughout, and templates + a governance RACI.',
  },
  {
    line: 'transformation', tier: 'toolkit', tag: 'Excel + playbook',
    name: 'Digital Transformation Operating Model & Roadmap Toolkit',
    sub: 'Assessment, a capability-maturity radar, multi-wave roadmap, value tracker and RAID — plus a 15-page operating handbook. The flagship operating model + roadmap.',
    price: '$149', team: '$299', url: 'https://vihrenlabs.gumroad.com/l/mgvuae',
    lastUpdated: '2026-06-07',
    changelog: 'Playbook expanded to a 15-page operating handbook — a transformation-readiness self-check, the 7 failure modes, the operating spine, the five domains and what to probe in each, honest maturity scoring + reading the radar shape, the optimisation-not-transformation pattern, wave sequencing, phased gate-tied funding, the target operating model that makes change stick, governance that decides, value net of run-cost, sponsorship + change management, the team you need, leading-vs-lagging metrics, the stop/pause/re-sequence discipline, the first 90 days, and a worked example (a distributor turning "modernise IT" into a defensible programme) carried through all six moves — plus templates + a glossary.',
  },
  {
    line: 'transformation', tier: 'toolkit', tag: 'Excel + playbook',
    name: 'Application Portfolio & Cloud Migration Planner',
    sub: 'App portfolio, 6R disposition, migration waves, business case and cutover runbook — plus a 15-page operating handbook. Plan the cloud move.',
    price: '$79', team: '$149', url: 'https://vihrenlabs.gumroad.com/l/bddcwz',
    lastUpdated: '2026-06-07',
    changelog: 'Playbook expanded to a 15-page operating handbook — a maturity self-check, the 6R disposition with a worked split + reading-the-mix, the landing zone, security/residency, wave sequencing, a worked TCO with the run-cost trap + hidden costs, big-bang/phased/strangler approaches, data-migration validation, two worked examples (wave-1 + the ERP cluster), FinOps, when-cloud-is-wrong, roles, a 90-day plan, and a glossary + templates.',
  },
];

// Free items — paired on the site for visual clarity. Renders in its own
// sub-grid above the line groups on /products and on the landing.
export const freeItems: FreeItem[] = [
  {
    tag: 'Free PDF',
    name: 'The Vihren Labs Operator Standard',
    sub: 'The 7 operating principles behind every template in the catalogue.',
    price: '$0', team: '',
    url: 'https://vihrenlabs.gumroad.com/l/bwzklq',
  },
  {
    tag: 'Free · PWYW',
    name: 'SAP Cutover Comms Kit',
    sub: 'Pre-cutover, go-live, hypercare and incident announcement templates — the comms templates a real cutover sends. Pay what you want.',
    price: 'Free+', team: '',
    url: 'https://vihrenlabs.gumroad.com/l/dlzxfu',
  },
];

// Line metadata — display order follows hero eyebrow ordering. To add a new
// line: append here AND tag the relevant products.line above.
export const lineGroups: LineGroup[] = [
  {
    slug: 'procurement',
    title: 'Procurement & Vendor Management',
    sub: 'Procurement-side IT operations — vendor TCO, contract leverage, the discount stack. From the distributor side of the table.',
  },
  {
    slug: 'programme-delivery',
    title: 'Programme Delivery & Enterprise IT PMO',
    sub: 'Pre-implementation strategy — the operator decisions before a consultant is on site. ERP modernisation framing, business cases, decision scorecards.',
  },
  {
    slug: 'sap',
    title: 'SAP / ERP Operations',
    sub: 'S/4HANA migration governance, cutover discipline, the operator stack for the December 2027 ECC end-of-maintenance deadline.',
  },
  {
    slug: 'master-data',
    title: 'Master Data Operations',
    sub: 'From product master data to data quality engineering and MDM operating models — Course 02 plus 3 standalone toolkits and the operator bundle.',
  },
  {
    slug: 'ai-governance',
    title: 'AI Adoption & Governance',
    sub: 'The operator layer for putting AI agents into production — data and process readiness, an AI governance register, an agents-in-production tracker, and AI vendor TCO. Govern the agent, don\'t just buy it.',
  },
  {
    slug: 'transformation',
    title: 'Transformation & SSC/GBS',
    sub: 'Offshoring, GBS rollouts, and BPO transitions — from kickoff to BAU exit. Course 01 plus the standalone $179 workbook.',
  },
  {
    slug: 'regulatory',
    title: 'Regulatory & Compliance',
    sub: 'EU regulatory toolkits — AI Act, DORA, GDPR — built operator-first, not legal-first.',
  },
];

// Slugify a product name into a clean, keyword-rich URL segment for the on-site
// product detail pages (/products/<slug>). Single source of truth — imported by
// products.astro (card hrefs) and products/[slug].astro (getStaticPaths) so the
// links and the routes can never drift.
export function productSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/['’]/g, '')          // drop apostrophes (Operator's -> operators)
    .replace(/&/g, ' and ')        // & -> and
    .replace(/[^a-z0-9]+/g, '-')   // non-alnum -> hyphen
    .replace(/^-+|-+$/g, '')       // trim hyphens
    .replace(/-+/g, '-');          // collapse repeats
}

// The product-line display metadata, keyed for quick lookup on detail pages.
export const lineBySlug: Record<LineSlug, LineGroup> = Object.fromEntries(
  lineGroups.map((g) => [g.slug, g]),
) as Record<LineSlug, LineGroup>;

// The "next step up" in a product's value ladder — powers the cross-sell CTA on
// the product detail page (the "pay more / go deeper" lever). Derived, so it
// needs no per-product upkeep and can't drift: a toolkit points to its line's
// Operator's Pack (bundle), else the line's course; a bundle points to the
// course. Returns undefined at the top of a ladder. A product may set `next`
// (an exact product name) to override with an editorial / cross-line pointer.
export function ladderNext(p: Product): Product | undefined {
  if (p.next) return products.find((x) => x.name === p.next);
  const inLine = products.filter((x) => x.line === p.line && x.name !== p.name);
  if (p.tier === 'toolkit') {
    return inLine.find((x) => x.tier === 'bundle') ?? inLine.find((x) => x.tier === 'course');
  }
  if (p.tier === 'bundle') {
    return inLine.find((x) => x.tier === 'course');
  }
  return undefined; // course = top of the ladder
}

// Build the FAQ for a product detail page: page-specific Q&As derived from the
// product's own fields (so no two pages are duplicate-FAQ), plus any hand-written
// buyer-intent entries on the product, plus one shared brand-credibility Q&A.
// Rendered visibly on the page AND emitted as FAQPage schema (Google requires
// the FAQ to be visible — keep the two in sync via this single source).
export function buildProductFaq(
  p: Product,
  line?: LineGroup,
): { q: string; a: string }[] {
  const faqs: { q: string; a: string }[] = [];

  // 1. What it is — page-specific (uses the product's own description).
  faqs.push({ q: `What is the ${p.name}?`, a: p.sub });

  // 2. Hand-written buyer-intent specifics (marquee products only).
  if (p.faq) faqs.push(...p.faq);

  // 3. Price + licence model — answers the cost + "is it a subscription" intent.
  const priceLine = p.team
    ? `${p.price} for a single-operator licence, or ${p.team} for a team licence.`
    : `${p.price}.`;
  faqs.push({
    q: `How much does the ${p.name} cost, and is it a subscription?`,
    a: `${priceLine} It is a one-time purchase on Gumroad — you download it and own it, with no subscription or recurring fee.`,
  });

  // 4. Who it's for — line-specific.
  if (line) {
    faqs.push({
      q: `Who is the ${p.name} for?`,
      a: `It is part of the Vihren Labs ${line.title} line. ${line.sub}`,
    });
  }

  // 5. Shared brand-credibility answer (the question AI assistants ask).
  faqs.push({
    q: 'Who builds Vihren Labs products?',
    a: 'Petko Petkov — a 15-year enterprise IT operator who has worked both the vendor-distribution and buyer-operator sides of the table: SAP S/4HANA migrations, master data management and governance, IT vendor procurement from the distribution side, EU regulatory rollouts, and large shared-services / GBS transitions across Europe. Every product is built from real scenarios — real SAP T-codes, real regulation article numbers, real cutover-night failure modes — not consultant theory.',
  });

  return faqs;
}
