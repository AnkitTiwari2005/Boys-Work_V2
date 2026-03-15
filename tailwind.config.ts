import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/app/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        error: 'var(--error)',
        errorContainer: 'var(--error-container)',
        inverseOnSurface: 'var(--inverse-on-surface)',
        inversePrimary: 'var(--inverse-primary)',
        inverseSurface: 'var(--inverse-surface)',
        onBackground: 'var(--on-background)',
        onError: 'var(--on-error)',
        onErrorContainer: 'var(--on-error-container)',
        onPrimary: 'var(--on-primary)',
        onPrimaryContainer: 'var(--on-primary-container)',
        onPrimaryFixed: 'var(--on-primary-fixed)',
        onPrimaryFixedVariant: 'var(--on-primary-fixed-variant)',
        onSecondary: 'var(--on-secondary)',
        onSecondaryContainer: 'var(--on-secondary-container)',
        onSecondaryFixed: 'var(--on-secondary-fixed)',
        onSecondaryFixedVariant: 'var(--on-secondary-fixed-variant)',
        onSurface: 'var(--on-surface)',
        onSurfaceVariant: 'var(--on-surface-variant)',
        onTertiary: 'var(--on-tertiary)',
        onTertiaryContainer: 'var(--on-tertiary-container)',
        onTertiaryFixed: 'var(--on-tertiary-fixed)',
        onTertiaryFixedVariant: 'var(--on-tertiary-fixed-variant)',
        outline: 'var(--outline)',
        outlineVariant: 'var(--outline-variant)',
        primary: 'var(--primary)',
        primaryContainer: 'var(--primary-container)',
        primaryFixed: 'var(--primary-fixed)',
        primaryFixedDim: 'var(--primary-fixed-dim)',
        secondary: 'var(--secondary)',
        secondaryContainer: 'var(--secondary-container)',
        secondaryFixed: 'var(--secondary-fixed)',
        secondaryFixedDim: 'var(--secondary-fixed-dim)',
        surface: 'var(--surface)',
        surfaceBright: 'var(--surface-bright)',
        surfaceContainer: 'var(--surface-container)',
        surfaceContainerHigh: 'var(--surface-container-high)',
        surfaceContainerHighest: 'var(--surface-container-highest)',
        surfaceContainerLow: 'var(--surface-container-low)',
        surfaceContainerLowest: 'var(--surface-container-lowest)',
        surfaceDim: 'var(--surface-dim)',
        surfaceTint: 'var(--surface-tint)',
        surfaceVariant: 'var(--surface-variant)',
        tertiary: 'var(--tertiary)',
        tertiaryContainer: 'var(--tertiary-container)',
        tertiaryFixed: 'var(--tertiary-fixed)',
        tertiaryFixedDim: 'var(--tertiary-fixed-dim)',
        accent: 'var(--accent)',
        primaryLight: 'var(--primary-light)',
        primaryDark: 'var(--primary-dark)'
      },
      fontFamily: {
        heading: ['var(--font-heading)'],
        body: ['var(--font-body)'],
        mono: ['var(--font-mono)']
      },
      borderRadius: {
        'lg': 'var(--radius-lg)'
      },
      boxShadow: {
        'ambient': '0 12px 24px -12px rgba(0, 0, 0, 0.07)',
      }
    },
  },
  plugins: [],
}
export default config
