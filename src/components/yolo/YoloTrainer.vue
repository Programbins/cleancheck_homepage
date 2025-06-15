<template>
  <div class="trainer-container">
    <YoloStartScreen
      v-if="gameState === 'initial'"
      :is-loading="isLoading"
      :loading-message="loadingMessage"
      @start="gameState = 'running'"
    />
    <YoloTrackingScreen
      v-else
      ref="trackingScreenRef"
      :countdown="countdown"
      :current-action-name="currentActionName"
      @exit="stopTracking"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue';
import YoloStartScreen from './YoloStartScreen.vue';
import YoloTrackingScreen from './YoloTrackingScreen.vue';
// 경로가 ../../ 이라면 실제 파일 위치에 맞게 수정해주세요.
import { useYoloHandwashing } from '../../composables/useYoloHandwashing.js'; 

const { 
  gameState, 
  countdown, 
  currentActionName,
  isLoading,
  loadingMessage,
  loadModel,
  startTracking, 
  stopTracking, 
} = useYoloHandwashing();

const trackingScreenRef = ref(null);

onMounted(() => {
  loadModel();
});

onUnmounted(() => {
  stopTracking();
});

watch(gameState, (newState, oldState) => {
  if (newState === 'running' && oldState === 'initial') {
    nextTick(() => {
      if (trackingScreenRef.value) {

        startTracking(trackingScreenRef.value.videoEl);

      }
    });
    }

  /* ✅ 30초가 끝나면 ('finished') → stopTracking() → 초기 화면 */
  if (newState === 'finished') {
    stopTracking();           // 초기화(+스트림 완전 해제)
    gameState.value = 'initial';
  }
});
</script>

<style scoped>
.trainer-container {
  width: 100%;
  max-width: 640px;
  margin: 0 auto;
  display: grid;
}
.trainer-container > :deep(div) {
  grid-area: 1 / 1;
}
</style>