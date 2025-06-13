<template>
  <footer class="bg-light text-dark py-4 border-top">
    <div class="container text-center">
      <h5 class="fw-bold">🧼 CleanCheck</h5>
      <p class="small mb-2">
        AI 기반 손씻기 분석 시스템 | WHO 기준 + 자유 손씻기 지원
      </p>
      <div class="mb-2">
        <a
          href="https://github.com/chanwoopark11/CleanCheck"
          target="_blank"
          class="text-decoration-none me-3 text-primary"
        >
          GitHub
        </a>
        <a href="mailto:cleancheck@support.ai" class="text-decoration-none text-primary">
          문의하기
        </a>
      </div>
      <p class="text-muted small mb-0">© 2025 CleanCheck Team. MIT License.</p>
    </div>
  </footer>
</template>

<script setup>
// 스크립트 필요 시 작성
</script>

<style scoped>
footer {
  transition: background-color 0.3s, color 0.3s;
}

@media (prefers-color-scheme: dark) {
  footer {
    background-color: #121212;
    color: #ccc;
  }
  a {
    color: #90caf9 !important;
  }
}
</style>
