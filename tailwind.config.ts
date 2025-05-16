import type { Config } from "tailwindcss";

// TailwindCSS 설정
const config: Config = {
  // 어떤 파일에서 Tailwind 클래스를 사용할 것인지 지정
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {}, // 커스텀 테마 확장 가능
  },
  plugins: [], // shadcn/ui 설치 시 여기에 추가 플러그인 등록 가능
};
export default config;