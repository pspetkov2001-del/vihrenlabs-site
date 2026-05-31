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

export const collections = { essays };
