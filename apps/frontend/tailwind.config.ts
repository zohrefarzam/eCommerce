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
    background: '#ffffff',
    foreground: '#000000',
    muted: '#717171',
    surface: '#ffffff',
    'surface-secondary': '#f5f5f5',
    'surface-tertiary': '#ededed',
    default: '#f5f5f5',
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
