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
        'pastel-bg': '#FDFBF7',         // Soft warm cream
        'pastel-bg-dark': '#0F172A',    // Sleek dark navy/slate
        'pastel-card-dark': '#1E293B',  // Elevated card dark
        'pastel-border-dark': '#334155',// Subtle dark border
        'pastel-navy': '#1E293B',       // Friendly slate/navy text
        'pastel-text-dark': '#F8FAFC',  // Crisp light text
        'pastel-yellow': '#FEF08A',     // Warm pastel yellow
        'pastel-yellow-hover': '#FDE047', // Vibrant yellow
        'pastel-blue': '#BAE6FD',       // Pastel sky blue
        'pastel-blue-dark': '#0284C7',  // Deep sky blue
        'pastel-green': '#BBF7D0',      // Soft mint green
        'pastel-peach': '#FFEDD5',      // Playful orange/peach
        'pastel-purple': '#E9D5FF',     // Soft lavender purple
        'pastel-pink': '#FBCFE8',       // Playful pink
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
        space: ['Space Grotesk', 'sans-serif'],
      },
      boxShadow: {
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
