/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#ffffff",
      purple: "#3f3cbb",
      midnight: "#121063",
      blue: "#1d4ed8",
      yellow: "#f59e0b",
      metal: "#565584",
      emerald: "#047857",
      rose: "#9f1239",
      tahiti: "#3ab7bf",
      silver: "#ecebff",
      "bubble-gum": "#ff77e9",
      bermuda: "#78dcca",
    },
    screens: {
      sm: { max: "400px" },
      // => @media (max-width: 767px) { ... }

      md: { min: "401px", max: "767px" },
      // => @media (max-width: 767px) { ... }

      lg: { min: "768px", max: "1023px" },
      // => @media (min-width: 768px and max-width: 1023px) { ... }

      xl: { min: "1024px" },
      // => @media (min-width: 1024px) { ... }
    },
    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  variants: {},
  plugins: [],
};
