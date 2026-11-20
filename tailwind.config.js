/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'canvas-light': '#F8F9FB',
        'canvas-dark': '#090D16',
        'surface-light': '#FFFFFF',
        'surface-dark': '#111624',
        'surface-elevated-dark': '#161D2E',
        'border-subtle-light': '#E2E8F0',
        'border-subtle-dark': '#1E293B',
        'cobalt': '#0066FF',
        'cobalt-hover': '#0052CC',
        'cobalt-glow': 'rgba(0, 102, 255, 0.25)',

        // Compat aliases used across components
        'pastel-bg': '#F8F9FB',
        'pastel-bg-dark': '#090D16',
        'pastel-card-dark': '#111624',
        'pastel-border-dark': '#1E293B',
        'pastel-navy': '#0F172A',
        'pastel-text-dark': '#F8FAFC',
        'pastel-blue-dark': '#0284C7',
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
        space: ['Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'Monaco', 'Courier New', 'monospace'],
      },
      boxShadow: {
        'precision-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'precision-card': '0 4px 20px -2px rgba(15, 23, 42, 0.05), 0 2px 6px -1px rgba(15, 23, 42, 0.02)',
        'precision-card-dark': '0 4px 24px -2px rgba(0, 0, 0, 0.4)',
        'cobalt-glow': '0 0 24px rgba(0, 102, 255, 0.28)',
        'card-hover': '0 8px 30px -4px rgba(0, 0, 0, 0.12)',
        'card-hover-dark': '0 8px 30px -4px rgba(0, 0, 0, 0.5)',
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        'spring-ios': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        'reveal-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'reveal-up': 'reveal-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) both',
        'fade-in': 'fade-in 0.5s ease both',
      },
    },
  },
  plugins: [],
}
