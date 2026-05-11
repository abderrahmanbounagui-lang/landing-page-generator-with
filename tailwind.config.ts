import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Professional, minimal palette
        'brand-accent': 'var(--accent-color, #2563EB)', // Default: blue
        'fg': '#1A1A1A',
        'fg-muted': '#9CA3AF',
        'bg': '#FAFAF9',
        'bg-alt': '#FFFFFF',
        'border': '#E5E7EB',
        'border-light': '#F3F4F6',
      },
      fontFamily: {
        // Geist for display, IBM Plex Sans for body
        sans: ['var(--font-ibm-plex)', 'system-ui', 'sans-serif'],
        display: ['var(--font-geist)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
      fontSize: {
        // Tight, refined hierarchy
        xs: ['12px', { lineHeight: '1.5' }],
        sm: ['14px', { lineHeight: '1.5' }],
        base: ['16px', { lineHeight: '1.6' }],
        lg: ['18px', { lineHeight: '1.6' }],
        xl: ['20px', { lineHeight: '1.6' }],
        '2xl': ['24px', { lineHeight: '1.4' }],
        '3xl': ['32px', { lineHeight: '1.2' }],
        '4xl': ['40px', { lineHeight: '1.2' }],
        '5xl': ['48px', { lineHeight: '1' }],
      },
      spacing: {
        // 4px baseline grid
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
        '2xl': '48px',
        '3xl': '64px',
      },
      borderRadius: {
        // Restrained: 8px default
        DEFAULT: '8px',
        sm: '4px',
        lg: '12px',
      },
      boxShadow: {
        // Minimal, precise shadows
        sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
        DEFAULT: '0 1px 3px rgba(0, 0, 0, 0.12)',
        md: '0 2px 4px rgba(0, 0, 0, 0.08)',
        lg: '0 4px 6px rgba(0, 0, 0, 0.1)',
      },
      animation: {
        // Restrained motion
        'spin-subtle': 'spin 2s linear infinite',
        'fade-in': 'fadeIn 0.3s ease-out',
        'pulse-subtle': 'pulsSubtle 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        pulsSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
      },
      transitionDuration: {
        // Snappy but not jarring
        DEFAULT: '200ms',
      },
    },
  },
  plugins: [],
}
export default config
