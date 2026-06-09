/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        restauracja: {
          parchment: '#FDFCF0',
          cream: '#F5F0DC',
          burgundy: '#7C2D12',
          wine: '#991B1B',
          dark: '#1C1510',
          gold: '#B8860B',
        },
      },
    },
  },
  plugins: [],
}
