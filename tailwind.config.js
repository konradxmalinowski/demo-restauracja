/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        restaurant: {
          parchment: '#FDFCF0',
          burgundy: '#7C2D12',
          gold: '#B7860B',
          cream: '#F9F5E7',
          dark: '#1A0A00',
          charcoal: '#2C2C2C',
        },
      },
    },
  },
  plugins: [],
}
