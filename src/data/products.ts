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
  },
  {
    line: 'transformation', tier: 'course',
    tag: 'Course · 10 modules',
    name: "The Transition Operator's Course — SSC, GBS & BPO Transitions",
    sub: '10 modules for running an enterprise transition from kickoff to BAU exit — engagement, FTE sizing, RACI, knowledge transfer, governance, UAT, go-live, hypercare. 18-tab transition management workbook + delivery-execution playbook + 6 visual one-pagers.',
    price: '$499', team: '$999',
    url: 'https://vihrenlabs.gumroad.com/l/iivnut',
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
    price: '$69', team: '',
    url: 'https://vihrenlabs.gumroad.com/l/qeeja',
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
