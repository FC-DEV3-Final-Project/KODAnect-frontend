/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      // 모바일 전용 스타일에 사용할 브레이크포인트
      mobile: { max: "767px" },
    },
    extend: {
      boxShadow: {
        1: "0px 1px 2px 0px rgba(0, 0, 0, 0.05), 0px 0px 2px 0px rgba(0, 0, 0, 0.05);",
        2: "0px 0px 2px 0px rgba(0, 0, 0, 0.05), 0px 4px 8px 0px rgba(0, 0, 0, 0.08)",
      },
    },
  },
  plugins: [
    require("./plugins/krds-theme.js"),
    require("tailwind-scrollbar-hide"),
    require("@tailwindcss/line-clamp"),
  ],
};
