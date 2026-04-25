/**
 * Tailwind configuration.
 *
 * The visual language is inspired by Linear / Vercel / Raycast:
 * - Slate-950 background, Slate-900 cards
 * - Violet-500 accent for primary actions
 * - Inter as the default UI font
 */
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}'],
  darkMode: 'class', // We always render with the `dark` class on <html>.
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Inter',
          'Geist',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
        mono: [
          'JetBrains Mono',
          'Geist Mono',
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'monospace',
        ],
      },
      colors: {
        // Custom accent so we can swap brand color in one place.
        accent: {
          DEFAULT: '#8b5cf6', // violet-500
          hover: '#7c3aed',   // violet-600
        },
      },
      boxShadow: {
        subtle: '0 1px 2px 0 rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.04)',
      },
    },
  },
  plugins: [],
};
