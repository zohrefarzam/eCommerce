import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

const globalPalette = {
  'neutral-700': '#969696',
  'neutral-900': '#2E2E2E',
} as const;

/** Single source for storefront palette (Tailwind utilities + HeroUI CSS variables). */
export const storefrontTheme = {
  colors: {
    ...globalPalette,
    /** Page canvas — warm neutral, easier on the eyes than pure white */
    background: '#f5f5f4',
    foreground: '#1a1a1a',
    muted: '#717171',
    /** Elevated panels and cards */
    surface: '#ffffff',
    'surface-secondary': '#efefec',
    'surface-tertiary': '#e4e3e1',
    /** Search / text fields — soft gray, visible on page background */
    'input-bg': '#ecebe8',
    'input-bg-hover': '#e7e6e3',
    default: '#efefec',
    'hero-bg': '#212121',
    'hero-fg': '#ffffff',
    'hero-fg-muted': 'rgb(255 255 255 / 0.72)',
    'category-bar-bg': globalPalette['neutral-900'],
    'category-bar-fg': globalPalette['neutral-700'],
  },
  radius: '0.5rem',
  accent: 'oklch(0.55 0.22 25)',
  accentForeground: '#ffffff',
} as const;

const lightRootSelectors =
  ':root, .light, [data-theme="light"], [data-theme="default"]';

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: storefrontTheme.colors,
      fontFamily: {
        sans: [
          'var(--font-iran-sans-x)',
          'ui-sans-serif',
          'system-ui',
          'sans-serif',
        ],
      },
      borderRadius: {
        DEFAULT: storefrontTheme.radius,
      },
    },
  },
  plugins: [
    plugin(({ addBase }) => {
      const { colors, radius, accent, accentForeground } = storefrontTheme;
      addBase({
        [lightRootSelectors]: {
          'color-scheme': 'light',
          '--background': colors.background,
          '--foreground': colors.foreground,
          '--muted': colors.muted,
          '--surface': colors.surface,
          '--surface-foreground': colors.foreground,
          '--surface-secondary': colors['surface-secondary'],
          '--surface-tertiary': colors['surface-tertiary'],
          '--input-bg': colors['input-bg'],
          '--input-bg-hover': colors['input-bg-hover'],
          '--default': colors.default,
          '--default-foreground': colors.foreground,
          '--radius': radius,
          '--accent': accent,
          '--accent-foreground': accentForeground,
          '--hero-bg': colors['hero-bg'],
          '--hero-fg': colors['hero-fg'],
          '--hero-fg-muted': colors['hero-fg-muted'],
          '--neutral-700': colors['neutral-700'],
          '--neutral-900': colors['neutral-900'],
          '--category-bar-bg': colors['category-bar-bg'],
          '--category-bar-fg': colors['category-bar-fg'],
        },
        body: {
          backgroundColor: 'var(--background)',
          color: 'var(--foreground)',
        },
      });
    }),
  ],
} satisfies Config;
