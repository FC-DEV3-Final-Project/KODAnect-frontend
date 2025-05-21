/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@krds-ui/**/*.{js,ts,jsx,tsx}", // KRDS 패키지
    "./.storybook/**/*.{js,ts,jsx,tsx}", // Storybook
  ],
  theme: {
    extend: {},
  },
  plugins: [require("./plugins/krds-theme.js")],
};
