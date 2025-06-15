<template>
  <div class="card-container">
    <!-- 로딩 -->
    <div v-if="isLoading" class="loading-wrapper">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <p class="mt-3 text-muted">{{ loadingMessage }}</p>
    </div>

    <!-- 시작 버튼 -->
    <button v-else @click="$emit('start')" class="start-button">
      6단계 손 씻기 시작
    </button>
  </div>
</template>

<script setup>
defineProps({
  isLoading:      { type: Boolean, default: true },
  loadingMessage: { type: String,  default: '모델 로딩 중...' }
});
defineEmits(['start']);
</script>

<style scoped>
/* ───────── 카드 래퍼 ───────── */
.card-container {
  width: 100%;
  max-width: 640px;          /* 데스크톱 상한 */
  aspect-ratio: 4 / 3;       /* 비디오와 같은 비율 */
  padding: 20px;
  background: #fafafa;
  border: 1px solid #e9ecef;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,.1);
  display: flex; justify-content: center; align-items: center;
  box-sizing: border-box;
  text-align: center;
  min-height: 300px;         /* ↓ 모바일에서 override */
}

/* ───────── 로딩 뷰 ───────── */
.loading-wrapper {
  display: flex; flex-direction: column;
  justify-content: center; align-items: center;
}

/* Spinner (Bootstrap 없을 때) */
.spinner-border {
  width: 2rem; height: 2rem;
  border: .25em solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: spinner 0.75s linear infinite;
}
@keyframes spinner { to { transform: rotate(360deg); } }

.text-primary     { color: #fd7e14 !important; }
.visually-hidden  { position: absolute; width:1px; height:1px; margin:-1px; overflow:hidden; }

/* ───────── 버튼 ───────── */
.start-button {
  padding: 1rem 2rem;
  font-size: 1.2rem;
  font-weight: 700;
  color: #fff;
  background: #fd7e14;
  border: none; border-radius: 12px;
  cursor: pointer; transition: background .3s;
}
.start-button:hover { background: #e8590c; }

/* ───────── 모바일 (≤480 px) ───────── */
@media (max-width: 480px) {
  .card-container {
    aspect-ratio: auto;      /* 비율 고정 해제 → 높이 자동 */
    min-height: auto;        /* 높이 제약 해제 */
    padding: 14px;
  }
  .start-button {
    width: 100%;
    font-size: 1rem;
    padding: .9rem 1.2rem;
  }
  .spinner-border {          /* 스피너도 살짝 축소 */
    width: 1.6rem; height: 1.6rem;
    border-width: .2em;
  }
}
</style>
