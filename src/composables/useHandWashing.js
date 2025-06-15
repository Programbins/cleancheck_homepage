import { ref, reactive, nextTick } from 'vue'
import { Holistic } from '@mediapipe/holistic'
import { Camera } from '@mediapipe/camera_utils'
import step1Image from '@/assets/img/steps/1step.png';
import step2Image from '@/assets/img/steps/2step.png';
import step3Image from '@/assets/img/steps/3step.png';
import step4Image from '@/assets/img/steps/4step.png';
import step5Image from '@/assets/img/steps/5step.png';
import step6Image from '@/assets/img/steps/6step.png';

// --- 설정 및 상수 ---
const CONTACT_TIME_THRESHOLD = 0.5;
const UNWASHED_COLOR = '#F87171';
const PALM_WASHED_COLOR = '#42b983';
const BACK_WASHED_COLOR = '#60A5FA';
const ORIENTATION_CONFIRM_FRAMES = 5;
const KEYPOINT_RADIUS = 6;
const TOTAL_TIME = 30;
const READY_CONFIRM_FRAMES = 15; // 손 위치 확인을 위한 프레임 수 (약 0.5초)

// 6단계 세척 구역 정의
const WASH_ZONES = {
  STEP_1: {
    name: "손바닥",
    keypoints: { 'Left-palm': [...Array(21).keys()], 'Right-palm': [...Array(21).keys()] },
    totalPoints: 42,
    recommendationText: "손바닥과 손바닥을 마주대고 문질러 주세요.",
    image: step1Image,
  },
  STEP_2: {
    name: "손등",
    keypoints: { 'Left-back': [...Array(21).keys()], 'Right-back': [...Array(21).keys()] },
    totalPoints: 42,
    recommendationText: "손등과 손가락 사이사이를 꼼꼼히 문질러 주세요.",
    image: step2Image,
  },
  STEP_3: {
    name: "손가락 사이",
    keypoints: {
      'Left-palm': [5, 9, 13, 17], 'Right-palm': [5, 9, 13, 17],
      'Left-back': [5, 9, 13, 17], 'Right-back': [5, 9, 13, 17],
    },
    totalPoints: 16,
    recommendationText: "손바닥을 마주대고 손깍지를 끼고 문질러 주세요.",
    image: step3Image,
  },
  STEP_4: {
    name: "두 손 모아",
    keypoints: {
      'Left-palm': [6,7,8, 10,11,12, 14,15,16, 18,19,20],
      'Right-palm': [6,7,8, 10,11,12, 14,15,16, 18,19,20],
    },
    totalPoints: 24,
    recommendationText: "손가락을 마주잡고 손톱 밑을 깨끗하게 문질러 주세요.",
    image: step4Image,
  },
  STEP_5: {
    name: "엄지",
    keypoints: {
      'Left-palm': [1, 2, 3, 4], 'Right-palm': [1, 2, 3, 4],
      'Left-back': [1, 2, 3, 4], 'Right-back': [1, 2, 3, 4],
    },
    totalPoints: 16,
    recommendationText: "엄지손가락을 다른 편 손바닥으로 돌려주며 문질러 주세요.",
    image: step5Image,
  },
  STEP_6: {
    name: "손톱 밑",
    keypoints: {
      'Left-palm': [8, 12, 16, 20], 'Right-palm': [8, 12, 16, 20]
    },
    totalPoints: 8,
    recommendationText: "손가락을 반대편 손바닥에 놓고 문지르며 손톱 밑을 깨끗하게 하세요.",
    image: step6Image,
  },
};


export function useHandWashing() {
  const gameState = ref('initial'); // 'initial', 'ready', 'running'
  const progress = ref(0);
  const countdown = ref(TOTAL_TIME);
  
  const realtimeRecommendation = ref(null);
  const zoneProgress = reactive({});

  let camera = null;
  let countdownInterval = null;
  let readyFrameCounter = 0;
  let cleansed_state, contact_timers, stable_orientations, orientation_counters, last_known_landmarks;

  const resetWashStatus = () => {
    cleansed_state = reactive({
      Left: { palm: Array(21).fill(false), back: Array(21).fill(false) },
      Right: { palm: Array(21).fill(false), back: Array(21).fill(false) },
    });
    contact_timers = {
      Left: { palm: Array(21).fill(0), back: Array(21).fill(0) },
      Right: { palm: Array(21).fill(0), back: Array(21).fill(0) },
    };
    stable_orientations = reactive({ Left: 'palm', Right: 'palm' });
    orientation_counters = { Left: 0, Right: 0 };
    last_known_landmarks = reactive({ Left: null, Right: null });
    progress.value = 0;
    countdown.value = TOTAL_TIME;
    realtimeRecommendation.value = null;
    Object.keys(WASH_ZONES).forEach(key => zoneProgress[key] = 0);
  };

  const updateRealtimeAnalysis = () => {
    if (!cleansed_state) return;

    let minPercentage = 101;
    let weakestZoneKey = null;

    for (const key in WASH_ZONES) {
      const zone = WASH_ZONES[key];
      let washedCount = 0;
      
      for (const side in zone.keypoints) {
        const [hand, surface] = side.split('-');
        zone.keypoints[side].forEach(pointIndex => {
          if (cleansed_state[hand][surface][pointIndex]) {
            washedCount++;
          }
        });
      }
      
      const percentage = (zone.totalPoints > 0) ? (washedCount / zone.totalPoints) * 100 : 0;
      zoneProgress[key] = percentage;

      if (percentage < minPercentage) {
        minPercentage = percentage;
        weakestZoneKey = key;
      }
    }

    if (weakestZoneKey) {
      const weakestZoneInfo = WASH_ZONES[weakestZoneKey];
      realtimeRecommendation.value = {
        name: weakestZoneInfo.name,
        text: weakestZoneInfo.recommendationText,
        image: weakestZoneInfo.image,
      };
    }
  };

  const drawHandVisuals = (ctx, landmarks, is_palm, label) => {
    if (!landmarks) return;
    const side = is_palm ? 'palm' : 'back';
    const hull_points = Object.values(landmarks);
    if (hull_points.length > 2) {
        const hull = convexHull(hull_points);
        const washed_count = cleansed_state[label][side].filter(Boolean).length;
        const wash_ratio = washed_count / 21;
        if (wash_ratio > 0.1) {
            ctx.globalAlpha = Math.min(0.1 + wash_ratio * 0.6, 0.7);
            ctx.fillStyle = is_palm ? PALM_WASHED_COLOR : BACK_WASHED_COLOR;
            ctx.beginPath();
            ctx.moveTo(hull[0].x, hull[0].y);
            for (let i = 1; i < hull.length; i++) ctx.lineTo(hull[i].x, hull[i].y);
            ctx.closePath();
            ctx.fill();
            ctx.globalAlpha = 1.0;
        }
    }
    for (const i in landmarks) {
        const point = landmarks[i];
        const color = cleansed_state[label][side][i] ? (is_palm ? PALM_WASHED_COLOR : BACK_WASHED_COLOR) : UNWASHED_COLOR;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(point.x, point.y, KEYPOINT_RADIUS, 0, 2 * Math.PI);
        ctx.fill();
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(point.x, point.y, KEYPOINT_RADIUS, 0, 2 * Math.PI);
        ctx.stroke();
    }
  };

const estimate_palm_direction = (landmarks, label) => {
  if (!landmarks || landmarks.length < 18) return true;
  const wrist = landmarks[0], index_mcp = landmarks[5], pinky_mcp = landmarks[17];
  const v1 = { x: index_mcp.x - wrist.x, y: index_mcp.y - wrist.y };
  const v2 = { x: pinky_mcp.x - wrist.x, y: pinky_mcp.y - wrist.y };
  const z = v1.x * v2.y - v1.y * v2.x;
  
  // 기존 로직(z < 0 : z > 0)에서 부등호 방향을 반대로 변경하여
  // 손바닥/손등 인식을 뒤집습니다.
  return label === 'Left' ? z > 0 : z < 0; 
};

  const convexHull = (points) => {
    if (points.length <= 3) return points;
    const sortedPoints = [...points].sort((a, b) => a.x - b.x || a.y - b.y);
    const cross = (o, a, b) => (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x);
    const lower = [], upper = [];
    for (const p of sortedPoints) {
        while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], p) <= 0) lower.pop();
        lower.push(p);
    }
    for (let i = sortedPoints.length - 1; i >= 0; i--) {
        const p = sortedPoints[i];
        while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], p) <= 0) upper.pop();
        upper.push(p);
    }
    return lower.slice(0, -1).concat(upper.slice(0, -1));
  };

  const pointInPolygon = (point, polygon) => {
    let isInside = false;
    const n = polygon.length;
    if (n === 0) return false;
    for (let i = 0, j = n - 1; i < n; j = i++) {
        const xi = polygon[i].x, yi = polygon[i].y;
        const xj = polygon[j].x, yj = polygon[j].y;
        const intersect = ((yi > point.y) !== (yj > point.y)) &&
            (point.x < (xj - xi) * (point.y - yi) / (yj - yi) + xi);
        if (intersect) isInside = !isInside;
    }
    return isInside;
  };

  const update_cleansed_status = (landmarks_left, landmarks_right, facing_left_is_palm, facing_right_is_palm) => {
    const now = Date.now() / 1000;
    if (!landmarks_left || !landmarks_right) return;
    const left_points = Object.values(landmarks_left);
    const right_points = Object.values(landmarks_right);
    const left_hull = convexHull(left_points);
    const right_hull = convexHull(right_points);
    if (left_hull.length < 3 || right_hull.length < 3) return;
    const [side_left, opposite_side_left] = facing_left_is_palm ? ["palm", "back"] : ["back", "palm"];
    const [side_right, opposite_side_right] = facing_right_is_palm ? ["palm", "back"] : ["back", "palm"];
    for (const i in landmarks_left) {
        const is_in_contact = pointInPolygon(landmarks_left[i], right_hull);
        if (is_in_contact) {
            if (contact_timers.Left[side_left][i] === 0) contact_timers.Left[side_left][i] = now;
            contact_timers.Left[opposite_side_left][i] = 0;
            if (now - contact_timers.Left[side_left][i] > CONTACT_TIME_THRESHOLD) {
                cleansed_state.Left[side_left][i] = true;
            }
        } else {
            contact_timers.Left.palm[i] = 0;
            contact_timers.Left.back[i] = 0;
        }
    }
    for (const i in landmarks_right) {
        const is_in_contact = pointInPolygon(landmarks_right[i], left_hull);
        if (is_in_contact) {
            if (contact_timers.Right[side_right][i] === 0) contact_timers.Right[side_right][i] = now;
            contact_timers.Right[opposite_side_right][i] = 0;
            if (now - contact_timers.Right[side_right][i] > CONTACT_TIME_THRESHOLD) {
                cleansed_state.Right[side_right][i] = true;
            }
        } else {
            contact_timers.Right.palm[i] = 0;
            contact_timers.Right.back[i] = 0;
        }
    }
  };

  const isHandInReadyZone = (landmarks) => {
    if (!landmarks) return false;
    const wrist = landmarks[0];
    return wrist.x > 0.25 && wrist.x < 0.75 && wrist.y > 0.5 && wrist.y < 0.9;
  };

  const onResults = (canvasEl, results) => {
    if (!canvasEl) return;

    if (gameState.value === 'ready') {
      if (isHandInReadyZone(results.leftHandLandmarks) && isHandInReadyZone(results.rightHandLandmarks)) {
        readyFrameCounter++;
      } else {
        readyFrameCounter = 0;
      }

      if (readyFrameCounter > READY_CONFIRM_FRAMES) {
        gameState.value = 'running';
        startMainCountdown();
      }
    }
    
    if (gameState.value === 'running') {
        if (!cleansed_state) resetWashStatus();
        
        const canvasCtx = canvasEl.getContext('2d');
        const w = canvasEl.width;
        const h = canvasEl.height;
        canvasCtx.save();
        canvasCtx.clearRect(0, 0, w, h);
        canvasCtx.scale(-1, 1);
        canvasCtx.translate(-w, 0);
        
        const detected_hands_pixels = { Left: null, Right: null };
        if (results.leftHandLandmarks) {
            detected_hands_pixels.Left = results.leftHandLandmarks.map(lm => ({ x: lm.x * w, y: lm.y * h }));
            const raw_orientation_is_palm = estimate_palm_direction(results.leftHandLandmarks, 'Left');
            if (raw_orientation_is_palm === (stable_orientations.Left === 'palm')) {
                orientation_counters.Left = 0;
            } else if (++orientation_counters.Left > ORIENTATION_CONFIRM_FRAMES) {
                stable_orientations.Left = raw_orientation_is_palm ? 'palm' : 'back';
            }
        }
         if (results.rightHandLandmarks) {
            detected_hands_pixels.Right = results.rightHandLandmarks.map(lm => ({ x: lm.x * w, y: lm.y * h }));
            const raw_orientation_is_palm = estimate_palm_direction(results.rightHandLandmarks, 'Right');
            if (raw_orientation_is_palm === (stable_orientations.Right === 'palm')) {
                orientation_counters.Right = 0;
            } else if (++orientation_counters.Right > ORIENTATION_CONFIRM_FRAMES) {
                stable_orientations.Right = raw_orientation_is_palm ? 'palm' : 'back';
            }
        }

        if (detected_hands_pixels.Left) last_known_landmarks.Left = detected_hands_pixels.Left;
        if (detected_hands_pixels.Right) last_known_landmarks.Right = detected_hands_pixels.Right;
        
        const final_facing_left = stable_orientations.Left === 'palm';
        const final_facing_right = stable_orientations.Right === 'palm';

        update_cleansed_status(last_known_landmarks.Left, last_known_landmarks.Right, final_facing_left, final_facing_right);
        drawHandVisuals(canvasCtx, last_known_landmarks.Left, final_facing_left, 'Left');
        drawHandVisuals(canvasCtx, last_known_landmarks.Right, final_facing_right, 'Right');
        
        const total_points = 84; 
        const washed_points = Object.values(cleansed_state.Left).flat().filter(Boolean).length +
                              Object.values(cleansed_state.Right).flat().filter(Boolean).length;
        progress.value = total_points > 0 ? (washed_points / total_points) * 100 : 0;

        updateRealtimeAnalysis();

        canvasCtx.restore();
    }
  };

  const startMainCountdown = () => {
    countdownInterval = setInterval(() => {
      countdown.value--;
      if (countdown.value <= 0) {
        stopTracking();
      }
    }, 1000);
  };

  const stopTracking = () => {
    if (camera) {
      camera.stop();
      camera = null;
    }
    if (countdownInterval) {
      clearInterval(countdownInterval);
      countdownInterval = null;
    }
    gameState.value = 'initial';
  };

  const startTracking = async (videoEl, canvasEl) => {
    if (!videoEl || !canvasEl) return;
    
    resetWashStatus();
    readyFrameCounter = 0;
    
    await nextTick();

    const holistic = new Holistic({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/holistic/${file}`,
    });
    holistic.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      minDetectionConfidence: 0.7,
      minTrackingConfidence: 0.7,
    });
    holistic.onResults((results) => onResults(canvasEl, results));
    
    camera = new Camera(videoEl, {
      onFrame: async () => {
        if (videoEl && videoEl.readyState >= 3) {
          await holistic.send({ image: videoEl });
        }
      },
      width: 640,
      height: 480,
    });
    camera.start();

    gameState.value = 'ready';
  };

  return {
    gameState,
    progress,
    countdown,
    realtimeRecommendation,
    zoneProgress,
    startTracking,
    stopTracking,
    resetWashStatus,
  };
}