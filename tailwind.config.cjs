/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    minWidth: {
      8: "2rem",
    },
    extend: {
      fontFamily: {
        sans: ['"Open Sans"', "sans-serif"],
      },
      colors: {
        "primary-blue": "#153673",
        "light-blue": "#2259BF",
        "dark-blue": "#071226",
        "primary-yellow": "#BF8300",
        "light-yellow": "#FFB619",
        "dark-yellow": "#734F00",
        "primary-grey": "#D9DADB",
        "light-grey": "#F6F9FF",
        "dark-grey": "#9699A1",
      },
      screens: {
        phone: { max: "48rem" },
        small: { min: "48rem" },
        normal: { min: "80rem" },
      },
    },
  },
  plugins: [],
};
