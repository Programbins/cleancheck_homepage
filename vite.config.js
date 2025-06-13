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
    host: "0.0.0.0", // 내부망 IP 허용
    port: 5173,      // 기본 포트 (원하는 경우 변경 가능)
    strictPort: true, // 포트 충돌 시 에러 발생 (선택사항)
    proxy: {
      // 프론트엔드에서 '/cleancheck'로 시작하는 모든 요청을 'https://www.cleancheck.org'로 프록시합니다.
      // 예시: axios.get('/cleancheck/api/data') -> https://www.cleancheck.org/api/data 로 요청
      '/cleancheck': {
        target: 'https://www.cleancheck.org', // cleancheck.org 의 주소
        changeOrigin: true, // 대상 서버의 호스트 헤더를 변경 (CORS 해결에 중요)
        rewrite: (path) => path.replace(/^\/cleancheck/, ''), // 요청 경로에서 '/cleancheck' 제거 (선택 사항)
        secure: true, // 대상 서버가 HTTPS인 경우 true로 설정
        ws: true, // 웹소켓 프록시 활성화 (필요한 경우)
      },
      // 다른 프록시 설정이 있다면 여기에 추가할 수 있습니다.
    },
  },
});