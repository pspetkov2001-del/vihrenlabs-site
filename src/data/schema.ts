// Vihren Labs — reusable JSON-LD builders for FAQPage + HowTo.
//
// Added 2026-05-31 (SEO quick wins, per docs/SEO-GEO-AUDIT-2026-05-31.md).
// FAQPage + HowTo are the highest-ROI rich-results + AI-citation levers:
// they are how Google builds rich results AND how AI assistants
// (ChatGPT/Claude/Perplexity/Google AI Mode) extract a quotable answer.
//
// Pass the result into Base.astro's `schema` prop — Schema.astro renders any
// node (or array of nodes) as <script type="application/ld+json">.
//
// IMPORTANT (Google policy): FAQPage / HowTo rich results require the same
// content to be VISIBLE on the page. Always render a matching FAQ / step
// section alongside the schema — never emit these nodes for hidden content.

export interface QA {
  q: string;
  a: string;
}

// FAQPage node from a list of question/answer pairs.
export function faqSchema(faqs: QA[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export interface HowToStep {
  name: string;
  text: string;
  url?: string;
}

// HowTo node for step-by-step guide pages (the P0 buyer-intent guides).
export function howToSchema(opts: {
  name: string;
  description: string;
  url?: string;
  steps: HowToStep[];
  totalTime?: string; // ISO 8601 duration, e.g. "PT2H"
}) {
  const node: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: opts.name,
    description: opts.description,
    step: opts.steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.name,
      text: s.text,
      ...(s.url ? { url: s.url } : {}),
    })),
  };
  if (opts.url) node.url = opts.url;
  if (opts.totalTime) node.totalTime = opts.totalTime;
  return node;
}
