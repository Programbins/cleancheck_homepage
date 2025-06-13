import { fileURLToPath, URL } from "url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

/**
 * ▷ 외부 프록시(예: Nginx Proxy Manager, Traefik, Caddy)가
 *   1) SSL 종단(TLS termination)
 *   2) cleancheck.org → localhost:5173 프록시
 *   를 모두 맡고 있다고 가정한 설정입니다.
 *
 *  - 개발 서버는 **HTTP 로컬 호스트(5173)** 로만 뜨고,
 *    브라우저‑측 WebSocket 연결은 wss://cleancheck.org 로 요청됩니다.
 *  - 따라서 server.https 설정이나 self‑signed SSL 플러그인은 필요 없습니다.
 */
export default defineConfig({
  plugins: [vue()],

  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },

  server: {
    host: true,   // 모든 인터페이스 바인딩
  },
});
