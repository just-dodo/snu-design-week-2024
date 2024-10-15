const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    colors: {
      primary: "#E22613",
      secondary: "#FFEFD3",
      myblack: "#4b4b4b",
      ...colors,
    },
    fontFamily: {
      sans: ["Pretendard", "sans-serif"],
      bold: ["Pretendard Bold", "sans-serif"],
      semibold: ["Pretendard SemiBold", "sans-serif"],
      medium: ["Pretendard Medium", "sans-serif"],
      regular: ["Pretendard Regular", "sans-serif"],
      light: ["Pretendard Light", "sans-serif"],
    },
    fontWeight: {
      bold: 600,
      semibold: 500,
      medium: 400,
      regular: 300,
      light: 200,
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
