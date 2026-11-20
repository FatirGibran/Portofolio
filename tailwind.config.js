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
        // OBSIDIAN NOIR MASTER PALETTE
        'obsidian': '#08090D',
        'carbon': '#11131B',
        'midnight': '#151D35',
        'electric-indigo': '#5146E5',
        'ultraviolet': '#963CFF',
        'aurora-cyan': '#43D9E8',
        'liquid-silver': '#C9D0DF',
        'champagne': '#D8B77A',
        'soft-white': '#F1F0F5',

        'canvas-light': '#F8F9FB',
        'canvas-dark': '#08090D',
        'surface-light': '#FFFFFF',
        'surface-dark': '#11131B',
        'surface-elevated-dark': '#151D35',
        'border-subtle-light': '#E2E8F0',
        'border-subtle-dark': 'rgba(201, 208, 223, 0.12)',
        'cobalt': '#5146E5',
        'cobalt-hover': '#4338CA',
        'cobalt-glow': 'rgba(81, 70, 229, 0.35)',

        // Compat aliases used across components
        'pastel-bg': '#F8F9FB',
        'pastel-bg-dark': '#08090D',
        'pastel-card-dark': '#11131B',
        'pastel-border-dark': 'rgba(201, 208, 223, 0.12)',
        'pastel-navy': '#151D35',
        'pastel-text-dark': '#F1F0F5',
        'pastel-blue-dark': '#43D9E8',
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
        space: ['Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'Monaco', 'Courier New', 'monospace'],
      },
      boxShadow: {
        'precision-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'precision-card': '0 4px 20px -2px rgba(15, 23, 42, 0.05), 0 2px 6px -1px rgba(15, 23, 42, 0.02)',
        'precision-card-dark': '0 8px 32px 0 rgba(0, 0, 0, 0.65)',
        'cobalt-glow': '0 0 28px rgba(81, 70, 229, 0.40)',
        'aurora-glow': '0 0 35px -5px rgba(67, 217, 232, 0.40)',
        'ultraviolet-glow': '0 0 35px -5px rgba(150, 60, 255, 0.40)',
        'champagne-glow': '0 0 35px -5px rgba(216, 183, 122, 0.35)',
        'card-hover': '0 8px 30px -4px rgba(0, 0, 0, 0.12)',
        'card-hover-dark': '0 12px 40px -4px rgba(0, 0, 0, 0.8)',
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
