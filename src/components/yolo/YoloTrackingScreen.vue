<template>
  <div class="card-container">
    <!-- ✅ 로딩 오버레이 -->
    <div v-if="isLoading" class="loading-overlay">
      <p>{{ loadingMessage }}</p>
    </div>

    <!-- ✅ READY 오버레이 (손 인식 대기) -->
    <div v-else-if="gameState === 'ready'" class="ready-overlay">
      <div class="ready-text">
        <p>양손을 화면 중앙 아래에 위치시켜 주세요.</p>
        <span>준비가 되면 타이머가 시작됩니다.</span>
      </div>
    </div>

    <!-- ─── 상단 UI 패널 ─── -->
    <div class="ui-panel">
      <div class="timer">남은 시간: {{ countdown }}초</div>
      <div class="progress-container">
        <div class="progress-bar" :style="{ width: progress + '%' }"></div>
        <span class="progress-text">진행률: {{ Math.round(progress) }}%</span>
      </div>
    </div>

    <!-- ─── 비디오 스택 ─── -->
    <div class="stack">
      <video ref="videoEl" autoplay playsinline muted></video>
      <button @click="handleExit" class="exit-button">종료</button>
    </div>

    <!-- ─── 동작 피드백 ─── -->
    <!-- ─── 동작 피드백 ─── -->
    <div
    v-if="gameState !== 'ready'"
    class="action-feedback-area"
    >
  <!-- 이미지 -->
  <img
    v-if="currentActionInfo.image"
    :src="currentActionInfo.image"
    alt="현재 동작"
    class="action-image"
  />

  <!-- 텍스트 -->
  <div class="feedback-text">
    <p class="current-action-text">{{ currentActionInfo.name }}</p>
   <span class="current-action-desc">{{ currentActionInfo.text }}</span>
  </div>
</div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick, watch } from 'vue';
import { useYoloHandwashing } from '@/composables/useYoloHandwashing';

const emit    = defineEmits(['exit']);
const videoEl = ref(null);

/* ─── Composable 가져오기 ─── */
const {
  isLoading, loadingMessage,
  gameState, countdown, currentActionName, progress,currentActionInfo,
  loadModel, startTracking, stopTracking
} = useYoloHandwashing();

/* ─── 시작 로직 ─── */
onMounted(async () => {
  await loadModel();          // 1) 모델 로드
  await nextTick();           // 2) videoEl DOM 확보
  if (videoEl.value) startTracking(videoEl.value);  // 3) 추적 시작
});

/* ─── 종료 처리 ─── */
const handleExit = () => {
  stopTracking();
  emit('exit');               // 부모 컴포넌트로 종료 이벤트 전파
};

watch(gameState, (val) => {
  if (val === 'finished') handleExit();
});

onBeforeUnmount(stopTracking);
</script>

<style scoped>
/* ───────── 카드 컨테이너 ───────── */
.card-container {
  width: 100%; max-width: none;
  padding: 20px;
  background: #fafafa;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,.15);
  display: flex; flex-direction: column; gap: 1rem;
  position: relative;
}

/* ───────── 로딩 오버레이 ───────── */
.loading-overlay {
  position: absolute; inset: 0;
  display: flex; justify-content: center; align-items: center;
  background: rgba(0,0,0,.55); color: #fff; z-index: 40;
  border-radius: 12px; font-size: 1.1rem; text-align: center;
}

/* ───────── READY 오버레이 ───────── */
.ready-overlay {
  position: absolute; inset: 0;
  display: flex; flex-direction: column; justify-content: center; align-items: center;
  background: rgba(0,0,0,.6); color: #fff; z-index: 30;
  border-radius: 12px; text-align: center; padding: 1rem;
}
.ready-text p   { font-size: 1.2rem; font-weight: 700; margin: 0; }
.ready-text span{ font-size: .9rem; opacity: .85; }

/* ───────── UI 패널 ───────── */
.ui-panel {
  background: #f0f0f0; padding: 10px; border-radius: 10px;
  display: flex; flex-direction: column; gap: .5rem;
}
.timer { font: 700 1.1rem/1 'inherit'; color: #2c3e50; text-align: center; }
.progress-container {
  width: 100%; height: 28px; border: 1px solid #ccc;
  background: #e0e0e0; border-radius: 15px; overflow: hidden; position: relative;
}
.progress-bar   { height: 100%; background: #42b983; transition: width .5s; }
.progress-text  {
  position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%);
  font: 700 .9rem/1 'inherit'; color: #2c3e50; white-space: nowrap;
  text-shadow: 1px 1px 2px #fff;
}

/* ───────── 비디오 스택 ───────── */
.stack {
  position: relative; width: 100%; aspect-ratio: 4/3;
  border-radius: 12px; overflow: hidden; background: #000;
}
.stack video {
  position: absolute; inset: 0; width: 100%; height: 100%;
  object-fit: cover; transform: scaleX(-1);
}

/* 종료 버튼 */
.exit-button{
  position: absolute; top:10px; right:10px; z-index: 20;
  padding:6px 14px; font-size:.8rem; font-weight:700;
  border:1px solid rgba(255,255,255,.7);
  background: rgba(99,179,237,.85); color:#fff; border-radius:20px;
  cursor:pointer; transition:.3s background, .2s transform;
}
.exit-button:hover{ background: rgba(99,179,237,1); transform:scale(1.05);} 

/* ───────── 동작 피드백 ───────── */
.action-feedback-area{
width:100%; padding:1rem;
background:#f8f9fa; border:1px solid #e9ecef; border-radius:8px;
display:flex; align-items:center; gap:1rem; flex-wrap:wrap;
}
.action-image{ width:80px; height:80px; border-radius:8px; object-fit:cover; flex-shrink:0; }
.feedback-text p{ font-size:1rem; font-weight:700; margin:0; }
.feedback-text span{ font-size:.85rem; color:#6c757d; }
/* ───────── 모바일 (≤400px) ───────── */
@media (max-width:400px){
  .ui-panel{ align-items:center; }
  .timer   { margin-bottom:.5rem; }
}
</style>
