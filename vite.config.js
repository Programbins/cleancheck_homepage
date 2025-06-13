import { fileURLToPath, URL } from "url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
    server: {
    host: "0.0.0.0",     // 내부망 IP 허용
    port: 5173,          // 기본 포트 (원하는 경우 변경 가능)
    strictPort: true,    // 포트 충돌 시 에러 발생 (선택사항)
  },
});
