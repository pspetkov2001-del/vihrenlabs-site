import { defineCollection, z } from 'astro:content';

// Essays — operator-voice content republished on-site from the LinkedIn cadence.
// This is the on-site content surface: gives Google something to rank AND gives
// AI assistants (ChatGPT/Claude/Perplexity/Google AI Mode) citable content.
const essays = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // SEO overrides (added 2026-09-10). The on-page H1 and the card blurb keep using
    // `title`/`description` - these two feed ONLY the <title> and <meta description>.
    // Decoupled because the editorial title is long by design and a SERP is not:
    // Google trims titles past ~60 chars and descriptions past ~158, so every page
    // was shipping a snippet Google either cut mid-word or rewrote. The .max() here
    // is the regression guard - an over-long value fails the build, not the SERP.
    seoTitle: z.string().max(60).optional(),
    seoDescription: z.string().max(165).optional(),
    date: z.string(), // ISO date string
    line: z.string(), // the product line this essay warms (display + relatedness)
    keywords: z.array(z.string()).default([]),
    featured: z.boolean().default(false), // pin to top of /essays regardless of date
  }),
});

// Guides — buyer-intent, answer-first how-to pages. Each ranks for the search
// term, answers it in genuine operator depth (free), and funnels to the matching
// product. `answer` is the answer-first lead (the GEO/AEO extract target); `steps`
// drive a visible numbered list + HowTo schema; `faq` drives a visible FAQ +
// FAQPage schema; the body (markdown) carries the depth.
const guides = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    seoTitle: z.string().max(60).optional(),      // see essays collection for why
    seoDescription: z.string().max(165).optional(),
    date: z.string(),
    line: z.string(),
    keywords: z.array(z.string()).default([]),
    answer: z.string(), // answer-first lead paragraph
    steps: z
      .array(z.object({ name: z.string(), text: z.string() }))
      .default([]),
    faq: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
    stepsTitle: z.string().default('The checklist'),
    ctaLabel: z.string().optional(),
    ctaUrl: z.string().optional(),
    ctaSub: z.string().optional(),
    featured: z.boolean().default(false),
  }),
});

export const collections = { essays, guides };
