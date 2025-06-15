<template>
  <div class="card-container">
    <div v-if="gameState === 'ready'" class="ready-overlay">
      <div class="ready-text">
        <p>양손을 화면 중앙 아래에 위치시켜 주세요.</p>
        <span>준비가 되면 타이머가 시작됩니다.</span>
      </div>
    </div>
    <div class="ui-panel">
      <div class="timer">남은 시간: {{ countdown }}초</div>
      <div class="progress-container">
        <div class="progress-bar" :style="{ width: progress + '%' }"></div>
        <span class="progress-text">세척 진행률: {{ Math.round(progress) }}%</span>
      </div>
    </div>
    <div class="stack">
      <video ref="videoEl" autoplay playsinline muted></video>
      <canvas ref="canvasEl" width="640" height="480"></canvas>
      <button @click="$emit('exit')" class="exit-button">종료</button>
    </div>
    <div v-if="gameState === 'running' && recommendation" class="recommendation-area">
       <img :src="recommendation.image" alt="추천 동작" class="recommendation-image" />
       <div class="recommendation-text">
         <p><strong class="text-primary">{{ recommendation.name }}</strong> 부분을 더 신경써주세요!</p>
         <span>{{ recommendation.text }}</span>
       </div>
    </div>
  </div>
</template>

<script setup>
// ... script 내용은 변경 없음 ...
import { ref } from 'vue';
defineProps({
  gameState: { type: String, required: true },
  countdown: { type: Number, required: true },
  progress: { type: Number, required: true },
  recommendation: { type: Object, default: null },
});
defineEmits(['exit']);
const videoEl = ref(null);
const canvasEl = ref(null);
defineExpose({ videoEl, canvasEl });
</script>

<style scoped>
.card-container {
  /* ▼▼▼ 핵심 변경점 ▼▼▼ */
  width: 100%; /* 부모 너비를 100% 채움 */
  max-width: none; /* 부모가 최대 너비를 제어하므로 여기서는 제한 없음 */
  /* ▲▲▲ 핵심 변경점 ▲▲▲ */

  padding: 20px;
  background-color: #fafafa;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: relative; 
  justify-content: flex-start;
}
.ready-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 30;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: white;
  padding: 1rem;
  box-sizing: border-box;
}

.ready-text p {
  font-size: 1.2rem;
  font-weight: bold;
  margin: 0;
}

.ready-text span {
  font-size: 0.9rem;
  opacity: 0.8;
}

.ui-panel {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 0.5rem;
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 10px;
  box-sizing: border-box;
}

.timer {
  font-size: 1.1rem;
  font-weight: bold;
  color: #2c3e50;
  text-align: center;
}

.progress-container {
  width: 100%;
  height: 28px;
  background-color: #e0e0e0;
  border-radius: 15px;
  position: relative;
  overflow: hidden;
  border: 1px solid #ccc;
}

.progress-bar {
  height: 100%;
  background-color: #42b983;
  border-radius: 15px;
  transition: width 0.5s ease-in-out;
}

.progress-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #2c3e50;
  font-weight: bold;
  font-size: 0.9rem;
  text-shadow: 1px 1px 2px white;
  white-space: nowrap;
}

.stack {
  position: relative;
  width: 100%;
  height: auto;
  aspect-ratio: 4 / 3; /* 반응형 비율 유지 */
  border-radius: 12px;
  overflow: hidden;
  background-color: #000;
}

.stack video,
.stack canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.stack video {
  transform: scaleX(-1);
  object-fit: cover;
}

.exit-button {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 20;
  padding: 6px 14px;
  font-size: 0.8rem;
  font-weight: bold;
  border: 1px solid rgba(255, 255, 255, 0.7);
  background-color: rgba(237, 137, 54, 0.8);
  color: white;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

.exit-button:hover {
  background-color: rgba(213, 117, 44, 1);
  transform: scale(1.05);
}

.recommendation-area {
  width: 100%;
  margin-top: 0.5rem;
  padding: 0.75rem;
  background-color: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.recommendation-image {
  width: 80px;
  height: 80px;
  border-radius: 8px;
  object-fit: cover;
  flex-shrink: 0;
}

.recommendation-text {
  text-align: left;
}

.recommendation-text p {
  font-size: 1rem;
  font-weight: bold;
  margin: 0 0 0.25rem 0;
}

.recommendation-text span {
  font-size: 0.85rem;
  color: #6c757d;
}

/* 모바일 화면 대응 (가로 400px 이하) */
@media (max-width: 400px) {
  .ui-panel {
    flex-direction: column;
    align-items: center;
  }
  .timer {
    margin-bottom: 0.5rem;
  }
  .progress-container {
    margin-left: 0;
  }
  .recommendation-area {
    flex-direction: column;
    text-align: center;
  }
  .recommendation-text {
    text-align: center;
  }
}
</style>