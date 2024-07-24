/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        'custom-gray': '#e3e3e3',
        'custom-green': '#17BF63',
      },
      fontFamily: {
        "outfit": ['Outfit', 'sans-serif'],
        "fugaz-one": ['Fugaz One', 'sans-serif']
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
