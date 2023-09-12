/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'm-green': '#38A3A5',
        'm-dark-green': '#144339',
        'm-gray': '#ACB4C9',
      }
    },
  },
  important: '#root',
  plugins: [],
  corePlugins: {
    preflight: false,
  },
}
