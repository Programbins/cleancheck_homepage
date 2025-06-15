// useYoloHandwashing.js
import { ref, computed } from 'vue';
import * as ort from 'onnxruntime-web';
import step1 from '@/assets/img/steps/1step.png';
import step2 from '@/assets/img/steps/2step.png';
import step3 from '@/assets/img/steps/3step.png';
import step4 from '@/assets/img/steps/4step.png';
import step5 from '@/assets/img/steps/5step.png';
import step6 from '@/assets/img/steps/6step.png';

// ─── 설정 및 상수 ──────────────────────────────────────────────
const TOTAL_TIME   = 30;                        // 전체 손씻기 시간 (초)
const MODEL_PATH   = '/Train_v1_best.onnx';     // ONNX 모델 경로
const CLASS_NAMES  = [
  '손바닥 마주대고', '손등과 손바닥', '손깍지 끼고',
  '손가락 마주잡고', '엄지손가락',  '손톱 밑'
];

export const ACTION_DETAILS = {
  '손바닥 마주대고' : { image: step1, text: 'WHO 1단계입니다. 해당 손씻기는 손바닥 전체를 닦습니다.' },
  '손등과 손바닥'   : { image: step2, text: 'WHO 2단계입니다. 해당 손씻기는 손등 전체를 닦습니다.' },
  '손깍지 끼고'     : { image: step3, text: 'WHO 3단계입니다. 해당 손씻기는 손가락 사이를 닦습니다.' },
  '손가락 마주잡고' : { image: step4, text: 'WHO 4단계입니다. 해당 손씻기는 손가락 마디(손가락 등쪽)를 닦습니다.' },
  '엄지손가락'      : { image: step5, text: 'WHO 5단계입니다. 해당 손씻기는 엄지손가락을 닦습니다.' },
  '손톱 밑'         : { image: step6, text: 'WHO 6단계입니다. 해당 손씻기는 손톱 밑(손가락 끝)을 닦습니다.' },
};

const INPUT_SIZE   = 640;   // 모델 입력 크기
const CONF_THRES   = 0.19;   // 신뢰도 임계값
const SMOOTH_LEN   = 10;    // 스무딩 히스토리 길이

/* ─── softmax ──────────────────────────────────────────────── */
function softmax(arr) {
  if (!arr?.length) return [];
  const maxLogit = Math.max(...arr);
  const exps     = arr.map(x => Math.exp(x - maxLogit));
  const sum      = exps.reduce((a, b) => a + b, 0);
  return exps.map(e => e / sum);
}

/* ─── Composable ───────────────────────────────────────────── */
export function useYoloHandwashing() {
  /* 상태 (reactive) */
  const isLoading         = ref(true);
  const loadingMessage    = ref('모델 로드 중...');
  const gameState         = ref('initial');   // 'initial' | 'ready' | 'running' | 'finished'
  const countdown         = ref(TOTAL_TIME);
  const currentActionName = ref('준비 중...');
  const completedActions  = ref(new Set());

 const currentActionInfo = computed(() => {
    const name = currentActionName.value;
    return name && ACTION_DETAILS[name]
        ? { name, ...ACTION_DETAILS[name] }
        : { name, image: null, text: '' };
    });

  /* ✅ 진행률 계산 (UI 연동용) */
  const progress = computed(() =>
    (completedActions.value.size / CLASS_NAMES.length) * 100
  );

  /* 내부 변수 */
  let session            = null;
  let videoStream        = null;
  let countdownInterval  = null;
  let animationFrameId   = null;
  const history          = [];

  /* ─── Helper: 상태 초기화 ────────────────────────────────── */
  const resetState = () => {
    countdown.value         = TOTAL_TIME;
    currentActionName.value = '준비 중...';
    completedActions.value.clear();
    history.length          = 0;

    if (countdownInterval) {
      clearInterval(countdownInterval);
      countdownInterval = null;
    }
  };

  /* ─── Helper: 가장 빈번 값 찾기 (스무딩) ─────────────────── */
  const mostFrequent = (arr) => {
    if (!arr.length) return null;
    const counts = arr.reduce((acc, v) => {
      if (v) acc[v] = (acc[v] || 0) + 1;
      return acc;
    }, {});
    if (!Object.keys(counts).length) return null;
    return Object.keys(counts).reduce((a, b) =>
      counts[a] > counts[b] ? a : b
    );
  };

  /* ─── ✅ ready 상태 진입 함수 (UI에서 직접 호출 가능) ───── */
  const enterReadyState = () => {
    if (gameState.value === 'initial' || gameState.value === 'finished') {
      resetState();
      gameState.value = 'ready';
    }
  };

  /* ─── ✅ 진행률 초기화 함수 (필요 시 외부에서 호출) ─────── */
  const resetProgress = () => {
    completedActions.value.clear();
  };

  /* ─── 모델 로드 ─────────────────────────────────────────── */
  const loadModel = async () => {
    isLoading.value    = true;
    loadingMessage.value = 'ONNX Runtime 초기화 중...';
    try {
      ort.env.wasm.wasmPaths = '/ort-files/';
      session = await ort.InferenceSession.create(MODEL_PATH, {
        executionProviders      : ['wasm'],
        graphOptimizationLevel  : 'all',
      });
      loadingMessage.value = '모델 로드 완료!';
    } catch (e) {
      console.error('모델 로드 실패:', e);
      loadingMessage.value = '모델 로딩 실패';
    } finally {
      isLoading.value = false;
    }
  };

  /* ─── 비디오 → 텐서 변환 ────────────────────────────────── */
  const imageToTensor = (video) => {
    const canvas = document.createElement('canvas');
    canvas.width  = INPUT_SIZE;
    canvas.height = INPUT_SIZE;
    const ctx     = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, INPUT_SIZE, INPUT_SIZE);
    const { data } = ctx.getImageData(0, 0, INPUT_SIZE, INPUT_SIZE);

    /* CHW RGB */
    const float32 = new Float32Array(3 * INPUT_SIZE * INPUT_SIZE);
    for (let i = 0; i < data.length / 4; i++) {
      float32[i]                           = data[i * 4]     / 255; // R
      float32[i +   INPUT_SIZE ** 2]       = data[i * 4 + 1] / 255; // G
      float32[i + 2 * INPUT_SIZE ** 2]     = data[i * 4 + 2] / 255; // B
    }
    return new ort.Tensor('float32', float32, [1, 3, INPUT_SIZE, INPUT_SIZE]);
  };

  /* ─── 메인 루프 ─────────────────────────────────────────── */
  const detectLoop = async (videoEl) => {
    if (!session || (gameState.value !== 'running' && gameState.value !== 'ready'))
      return;

    /* 1. 추론 */
    const feeds     = { [session.inputNames[0]]: imageToTensor(videoEl) };
    const results   = await session.run(feeds);
    const preds     = results[session.outputNames[0]].data;

    const numCls    = CLASS_NAMES.length;
    const numBoxes  = 8400;
    let   bestName  = null;
    let   bestScore = -1;

    /* 2. 출력 재구성 & 최고 클래스 찾기 */
    for (let i = 0; i < numBoxes; i++) {
      const logits = [];
      for (let j = 4; j < 4 + numCls; j++) logits.push(preds[j * numBoxes + i]);

      const probs     = softmax(logits);
      const maxProb   = Math.max(...probs);

      if (maxProb > bestScore) {
        bestScore  = maxProb;
        bestName   = CLASS_NAMES[probs.indexOf(maxProb)];
      }
    }

    if (bestScore < CONF_THRES) bestName = null;

    /* 3. 스무딩 */
    history.push(bestName);
    if (history.length > SMOOTH_LEN) history.shift();
    const smoothName = mostFrequent(history);

    /* 4. ready → running 전환 & 타이머 */
    if (gameState.value === 'ready' && smoothName) {
      gameState.value = 'running';
      countdownInterval = setInterval(() => {
        countdown.value--;
        if (countdown.value <= 0) {
        stopTracking(false);       // ← 영상·스트림 정지, 상태는 유지
        gameState.value = 'finished';
        }
      }, 1000);
    }

    /* 5. 진행률 업데이트 */
    if (smoothName) completedActions.value.add(smoothName);

    currentActionName.value = smoothName || '동작 없음';

    /* 6. 다음 프레임 */
    animationFrameId = requestAnimationFrame(() => detectLoop(videoEl));
  };

  /* ─── Tracking 시작 ─────────────────────────────────────── */
  const startTracking = async (videoEl) => {
    if (isLoading.value || !session) {
      alert('모델 준비 중입니다. 잠시 후 다시 시도해주세요.');
      return;
    }
    if (!videoEl) {
      console.error('비디오 엘리먼트가 없습니다.');
      return;
    }

    resetState();
    enterReadyState();               // ← ready 상태 진입

    try {
      videoStream        = await navigator.mediaDevices.getUserMedia({ video: true });
      videoEl.srcObject  = videoStream;

      videoEl.onloadedmetadata = () => {
        videoEl.play().catch(console.error);
        detectLoop(videoEl);
      };
    } catch (e) {
      console.error('웹캠 접근 실패:', e);
      alert('웹캠 권한을 확인해주세요.');
      gameState.value = 'initial';
    }
  };

  /* ─── Tracking 중지 ─────────────────────────────────────── */
  const stopTracking = (resetToInitial = true) => {
    if (animationFrameId) cancelAnimationFrame(animationFrameId);
    if (countdownInterval) clearInterval(countdownInterval);
    countdownInterval = null;

    if (videoStream) {
      videoStream.getTracks().forEach(t => t.stop());
      videoStream = null;
    }
    if (resetToInitial) gameState.value = 'initial';
  };

  /* ─── 반환 (컴포넌트에서 사용) ───────────────────────────── */
  return {
    /* 상태 */
    isLoading, loadingMessage,
    gameState, countdown,
    currentActionName, progress,
    currentActionInfo,

    /* 주요 함수 */
    loadModel, startTracking, stopTracking,

    /* ✅ 추가 함수 (ready & 진행률) */
    enterReadyState,   // 외부 컴포넌트가 수동으로 ready 상태 진입
    resetProgress,     // 진행률(완료 동작) 초기화
  };
}
