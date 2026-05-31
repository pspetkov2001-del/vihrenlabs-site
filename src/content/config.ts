import { defineCollection, z } from 'astro:content';

// Essays — operator-voice content republished on-site from the LinkedIn cadence.
// This is the on-site content surface: gives Google something to rank AND gives
// AI assistants (ChatGPT/Claude/Perplexity/Google AI Mode) citable content.
const essays = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
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
