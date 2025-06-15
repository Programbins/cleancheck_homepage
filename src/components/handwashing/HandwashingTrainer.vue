<template>
  <div class="trainer-container">
    <StartScreen v-if="gameState === 'initial'" @start="gameState = 'ready'" />
    <TrackingScreen
      v-else
      ref="trackingScreenRef"
      :gameState="gameState"
      :countdown="countdown"
      :progress="progress"
      :recommendation="realtimeRecommendation"
      @exit="stopTracking"
    />
  </div>
</template>

<script setup>
// ... script 내용은 이전과 동일하게 유지됩니다 ...
import { ref, watch, onMounted, onUnmounted, nextTick } from 'vue'
import StartScreen from './StartScreen.vue'
import TrackingScreen from './TrackingScreen.vue'
import { useHandWashing } from '../../composables/useHandWashing.js'

const { 
  gameState, 
  progress, 
  countdown, 
  realtimeRecommendation, 
  startTracking, 
  stopTracking, 
  resetWashStatus 
} = useHandWashing()

const trackingScreenRef = ref(null)

watch(gameState, (newState, oldState) => {
  if (newState === 'ready' && oldState === 'initial') {
    nextTick(() => {
      if (trackingScreenRef.value) {
        startTracking(
          trackingScreenRef.value.videoEl,
          trackingScreenRef.value.canvasEl
        );
      }
    });
  }
})

const handleKeyPress = (event) => {
  if ((event.key === 'r' || event.key === 'R') && gameState.value !== 'initial') {
    resetWashStatus()
  }
}

onMounted(() => window.addEventListener('keydown', handleKeyPress));
onUnmounted(() => {
  stopTracking()
  window.removeEventListener('keydown', handleKeyPress)
});
</script>

<style scoped>
.trainer-container {
  /* ▼▼▼ 핵심 변경점 ▼▼▼ */
  width: 100%;
  max-width: 640px; /* 데스크톱에서 최대 너비 640px로 제한 */
  margin: 0 auto;   /* 페이지 중앙에 위치 */
  display: grid;
  /* ▲▲▲ 핵심 변경점 ▲▲▲ */
}

/* 자식 컴포넌트가 항상 동일한 공간을 차지하도록 설정 */
.trainer-container > :deep(div) {
  grid-area: 1 / 1;
}
</style>