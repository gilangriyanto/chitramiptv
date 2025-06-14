/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        'purple': {
          '900': '#581c87',
          '800': '#7c3aed',
          '700': '#8b5cf6',
          '600': '#a855f7',
          '500': '#c084fc',
        },
        'pink': {
          '500': '#ec4899',
          '400': '#f472b6',
        }
      },
      backdropBlur: {
        'sm': '4px',
      }
    },
  },
  plugins: [],
}