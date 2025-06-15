<template>
  <div class="card-container">
    <button @click="$emit('start')">손 씻기 훈련 시작</button>
  </div>
</template>

<script setup>
defineEmits(['start'])
</script>

<style scoped>
.card-container {
  /* 공통 카드 스타일 */
  width: 640px;
  padding: 20px;
  background-color: #fafafa;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  box-sizing: border-box;

  /* 컨텐츠(버튼)를 중앙 정렬하기 위한 Flex 설정 */
  display: flex;
  justify-content: center;
  align-items: center;

  /* ▼▼▼▼▼ 핵심 변경점 ▼▼▼▼▼
    진행 화면의 최대 높이와 동일하게 고정합니다.
    (컨테이너 padding 40px + UI패널 약 52px + 간격 16px + 영상 480px = 약 588px)
  */
  height: 588px;
}

button {
  padding: 1rem 2rem;
  font-size: 1.5rem;
  font-weight: bold;
  border: none;
  background-color: #63B3ED;
  color: white;
  border-radius: 12px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #4299E1;
}
</style>