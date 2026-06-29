import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.vihrenlabs.com',
  integrations: [tailwind(), sitemap()],
  redirects: {
    // Renamed 2026-06-29: "AI-Ready Operations — Readiness Assessment" → "… Assessment Pro"
    // (free/paid tiering: free "Assessment" lead magnet, paid "Assessment Pro"). Keep the
    // old URL alive for inbound links, the lead-magnet PDF, and SEO equity.
    '/products/ai-ready-operations-readiness-assessment': '/products/ai-ready-operations-assessment-pro',
  },
});
