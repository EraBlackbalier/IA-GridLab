// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

/**
 * Astro configuration for IA GridLab.
 *
 * - `output: 'static'` ensures the entire site is pre-rendered at build time,
 *   which is the lightest, cheapest deploy target on Vercel (no SSR runtime).
 * - Tailwind is wired through the official integration so we get its JIT
 *   compiler and class purging out of the box.
 * - We do NOT need adapters because Vercel's static build works automatically
 *   with the `dist/` output of `astro build`.
 */
export default defineConfig({
  output: 'static',
  integrations: [tailwind({ applyBaseStyles: true })],
  // The `[id]` page is dynamic; in static mode we mark the base path
  // and rely on `getStaticPaths` returning a single placeholder entry.
  // The actual id is read from the URL on the client at runtime.
  trailingSlash: 'ignore',
  build: {
    // Inline tiny stylesheets to reduce blocking requests on first paint.
    inlineStylesheets: 'auto',
  },
});
