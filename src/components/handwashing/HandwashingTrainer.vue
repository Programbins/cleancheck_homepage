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
import { ref, watch, onMounted, onUnmounted, nextTick } from 'vue'
import StartScreen from './StartScreen.vue'
import TrackingScreen from './TrackingScreen.vue'
import { useHandWashing } from '../../composables/useHandWashing.js'

// 1. Composable에서 모든 상태와 제어 함수를 가져옵니다.
const { 
  gameState, 
  progress, 
  countdown, 
  realtimeRecommendation, 
  startTracking, 
  stopTracking, 
  resetWashStatus 
} = useHandWashing()

// 2. TrackingScreen 컴포넌트를 가리킬 ref를 생성합니다.
const trackingScreenRef = ref(null)

// 3. gameState가 'ready'로 변경되는 시점을 감지하여 카메라와 추적을 시작합니다.
watch(gameState, (newState, oldState) => {
  if (newState === 'ready' && oldState === 'initial') {
    // TrackingScreen 컴포넌트가 DOM에 렌더링된 직후에 실행합니다.
    nextTick(() => {
      if (trackingScreenRef.value) {
        // 자식 컴포넌트가 노출한 video, canvas 엘리먼트를 넘겨줍니다.
        startTracking(
          trackingScreenRef.value.videoEl,
          trackingScreenRef.value.canvasEl
        );
      }
    });
  }
})

// 4. 키보드 'R' 키로 진행 상태를 초기화하는 이벤트를 설정합니다.
const handleKeyPress = (event) => {
  if ((event.key === 'r' || event.key === 'R') && gameState.value !== 'initial') {
    resetWashStatus()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyPress)
});

onUnmounted(() => {
  stopTracking() // 컴포넌트가 사라질 때 모든 리소스를 정리합니다.
  window.removeEventListener('keydown', handleKeyPress)
});
</script>

<style scoped>
.trainer-container {
  display: grid;
  justify-content: center;
  align-items: start; /* 컨텐츠 높이가 변하므로 상단 정렬 */
}

/* 자식 컴포넌트(StartScreen, TrackingScreen)의 루트 엘리먼트를
  동일한 그리드 셀(1행 1열)에 배치하여 겹치게 만듭니다.
  이를 통해 화면이 전환될 때 크기가 변경되지 않고 안정적으로 유지됩니다.
*/
.trainer-container > :deep(div) {
  grid-area: 1 / 1;
}
</style>