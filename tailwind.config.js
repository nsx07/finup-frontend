const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {},
    colors: {
      ...colors,
      white: "#eee",
      "blue-light": "#00adb4",
      "gray-light": "#3a4750",
      "gray-dark": "#303942",
    },
  },
  plugins: [],
};
