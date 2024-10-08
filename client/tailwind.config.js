const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}',
  "./components/**/*.{js,ts,jsx,tsx}", './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    colors: {
      primary: '#6495ED',
      secondary: '#FFE900',
      myblack: '#4b4b4b',
      ...colors,
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
