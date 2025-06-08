/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      // 모바일 전용 스타일에 사용할 브레이크포인트
      mobile: { max: "767px" },
    },
    extend: {},
  },
  plugins: [
    require("./plugins/krds-theme.js"),
    require("tailwind-scrollbar-hide"),
    require("@tailwindcss/line-clamp"),
  ],
};
