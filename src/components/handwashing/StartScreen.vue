<template>
  <div class="card-container">
    <button @click="$emit('start')">자율 손 씻기 시작</button>
  </div>
</template>

<script setup>
defineEmits(['start']);
</script>

<style scoped>
/* ───────── 카드 랩 ───────── */
.card-container {
  width: 100%;
  /* 기본 : 4 : 3 비율 유지 */
  aspect-ratio: 4 / 3;
  min-height: 300px;

  padding: 20px;
  background: #fafafa;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,.15);
  box-sizing: border-box;
  display: flex; justify-content: center; align-items: center;
}

/* ───────── 버튼 ───────── */
button {
  padding: 1rem 2rem;
  font-size: 1.2rem; font-weight: 700;
  color: #fff; background: #63B3ED;
  border: none; border-radius: 12px;
  cursor: pointer; transition: background .3s;
  white-space: nowrap;
}
button:hover { background: #4299E1; }

/* ───────── 모바일 (≤480 px) ───────── */
@media (max-width: 480px) {
  .card-container {
    aspect-ratio: auto;  /* 비율 고정 해제 */
    min-height: auto;    /* 높이 제약 해제 */
    padding: 14px;
  }
  button {
    width: 100%;
    font-size: 1rem;
    padding: .9rem 1.4rem;
  }
}
</style>
