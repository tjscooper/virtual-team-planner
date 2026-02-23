/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'void': {
          DEFAULT: '#0a0a0f',
          50: '#1a1a24',
          100: '#12121a',
        },
        'areas': '#00f5ff',
        'projects': '#ff00ff',
        'resources': '#a855f7',
        'discovery': '#00f5ff',
        'design': '#ff00ff',
        'implementation': '#a855f7',
        'qa': '#fbbf24',
        'compliance': '#10b981',
      },
      fontFamily: {
        pixel: ['"Press Start 2P"', 'cursive'],
        terminal: ['"Fira Code"', '"Jetbrains Mono"', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        glow: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        },
      },
    },
  },
  plugins: [],
}
