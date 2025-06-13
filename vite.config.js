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
    host: "0.0.0.0",   // 여전히 모든 IP에서 수신
    port: 5173,
    strictPort: true,

    // ① CORS – cleancheck.org 만 허용 (필요 시 배열로 여러 도메인 추가 가능)
    cors: {
      origin: "https://cleancheck.org",
      credentials: true,   // 인증 쿠키/헤더가 필요하다면
    },

    // ② HMR(핫 모듈 리로드) 클라이언트가 외부 도메인을 사용하도록
    hmr: {
      host: "cleancheck.org", // Cloudflare·Nginx 등 프록시 뒤라면 반드시 지정
      protocol: "wss",        // SSL로 접속할 때는 wss
      port: 443,              // 프록시된 외부 포트 (443) — 내부는 5173 그대로
    },
  },
});
