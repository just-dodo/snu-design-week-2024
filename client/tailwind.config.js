const colors = require("tailwindcss/colors");
const fontSize = require("tailwindcss/defaultTheme");

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
    extend: {
      boxShadow: {
        inner: "inset 0 0 0 2px",
      },
      fontSize: {
        "3xl": "32px",
      },
      lineHeight: {
        "3xl": "38.2px",
      },
      letterSpacing: {
        "3xl": "-0.01em",
      },
    },
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
    screens : {
      'md' : '1194px'
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
