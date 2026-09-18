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
        // Technical Precision Design Tokens
        'canvas-light': '#F8F9FB',       // Warm Paper Off-White
        'canvas-dark': '#090D16',        // Deep Obsidian Slate
        'surface-light': '#FFFFFF',      // Pure White Card Surface
        'surface-dark': '#111624',       // Elevated Card Dark Surface
        'surface-elevated-dark': '#161D2E', // High-elevation Dark Card
        'border-subtle-light': '#E2E8F0',// Razor-thin light border
        'border-subtle-dark': '#1E293B', // High-precision dark border
        'cobalt': '#0066FF',             // Electric Precision Cobalt
        'cobalt-hover': '#0052CC',       // Deep Cobalt Active
        'cobalt-glow': 'rgba(0, 102, 255, 0.25)',

        // Existing palette compatibility
        'pastel-bg': '#F8F9FB',
        'pastel-bg-dark': '#090D16',
        'pastel-card-dark': '#111624',
        'pastel-border-dark': '#1E293B',
        'pastel-navy': '#0F172A',
        'pastel-text-dark': '#F8FAFC',
        'pastel-yellow': '#FEF08A',
        'pastel-yellow-hover': '#FDE047',
        'pastel-blue': '#BAE6FD',
        'pastel-blue-dark': '#0284C7',
        'pastel-green': '#BBF7D0',
        'pastel-peach': '#FFEDD5',
        'pastel-purple': '#E9D5FF',
        'pastel-pink': '#FBCFE8',
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
        'pastel-sm': '0 4px 6px -1px rgba(30, 41, 59, 0.04), 0 2px 4px -1px rgba(30, 41, 59, 0.02)',
        'pastel-md': '0 10px 15px -3px rgba(30, 41, 59, 0.07), 0 4px 6px -2px rgba(30, 41, 59, 0.04)',
        'pastel-lg': '0 20px 25px -5px rgba(30, 41, 59, 0.1), 0 10px 10px -5px rgba(30, 41, 59, 0.04)',
        'neon-yellow': '0 0 18px rgba(253, 224, 71, 0.35)',
        'neon-blue': '0 0 18px rgba(186, 230, 253, 0.45)',
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        'spring-ios': 'cubic-bezier(0.16, 1, 0.3, 1)',
      }
    },
  },
  plugins: [],
}
