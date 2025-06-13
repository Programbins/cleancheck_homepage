<template>
  <footer class="bg-light text-dark py-4 border-top">
    <div class="container d-flex justify-content-between align-items-center flex-wrap">
      <!-- 왼쪽: 프로젝트 이름과 설명 -->
      <div class="mb-2">
        <strong>🧼 CleanCheck</strong>
        <p class="mb-0 small">AI 기반 손위생 코칭 시스템</p>
      </div>

      <!-- 오른쪽: 링크 -->
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
    </div>
  </footer>
</template>

<script setup>
// 필요 시 스크립트 작성
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
