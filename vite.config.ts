import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import svgr from "vite-plugin-svgr";

// Vite 기본 설정
export default defineConfig({
  plugins: [react(), svgr()],

  // 절대경로 import 설정
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
