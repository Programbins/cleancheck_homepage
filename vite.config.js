// vite.config.ts / vite.config.js
import { fileURLToPath, URL } from "url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    host: "0.0.0.0",
    port: 5173,
    strictPort: true,

    // ✅ HMR 설정 — 서버는 내부 포트로, 브라우저는 443(wss) 로 접속
    hmr: {
      protocol: "wss",
      host: "cleancheck.org",
      clientPort: 443,   // 🔑 브라우저-측 포트만 지정
      // port: 24678      // (생략 → 기본값: 내부가 듣는 포트)
    },
  },
});