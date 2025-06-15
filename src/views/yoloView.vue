<script setup>
import { onMounted, onUnmounted } from 'vue';
import NavbarDefault   from '../examples/navbars/NavbarDefault.vue';
import DefaultFooter   from '../examples/footers/FooterDefault.vue';
import Header          from '../examples/Header.vue';

/* ▶️ YOLO 트레이너 컴포넌트 */
import HandwashingTrainer from '@/components/yolo/YoloTrainer.vue';

/* 히어로 배경 */
import vueMkHeader from '@/assets/img/vue-mk-header.jpg';

/* 페이지 배경 클래스 토글 */
const body = document.body;
onMounted   (() => body.classList.add('presentation-page', 'bg-gray-200'));
onUnmounted(() => body.classList.remove('presentation-page', 'bg-gray-200'));
</script>

<template>
  <!-- ─── 고정 네비바 ─── -->
  <div class="container position-sticky z-index-sticky top-0">
    <div class="row"><div class="col-12">
      <NavbarDefault :sticky="true" />
    </div></div>
  </div>

  <!-- ─── 히어로 배너 ─── -->
  <Header>
    <div
      class="page-header min-vh-75"
      :style="`background-image: url(${vueMkHeader})`"
      loading="lazy"
    >
      <div class="container"><div class="row">
        <div class="col-lg-7 mx-auto text-center position-relative">
          <h1 class="text-white pt-3 mt-n5">Clean Check</h1>
          <p class="lead text-white px-5 mt-3">
            YOLO 모델로 작동하는 30초 손씻기 자가 측정을 체험해 보세요.
          </p>
        </div>
      </div></div>
    </div>
  </Header>

  <!-- ─── 메인 카드 ─── -->
  <div class="card card-body blur shadow-blur mx-3 mx-md-4 mt-n6">
    <div class="container py-5">

      <!-- 1) 자율 손씻기 측정 (YOLO) -->
      <section id="selfcheck-section" class="mb-6">
        <h3 class="font-weight-bold text-center mb-4">
          6단계 손 씻기 측정 <small class="text-primary">(YOLO v8)</small>
        </h3>

        <!-- 실제 트레이너 -->
        <HandwashingTrainer />
      </section>

      <!-- 2) 사용 가이드 -->
      <section id="guide-section" class="mb-6">
        <h3 class="font-weight-bold text-center mb-4">프로그램 사용 가이드</h3>
        <div class="row"><div class="col-lg-10 mx-auto">
          <div class="card shadow-sm border-0"><div class="card-body p-4">
            <h5 class="font-weight-bolder text-primary mb-3">⭐ 사용 방법</h5>
            <ol class="list-group list-group-numbered mb-5">
              <li class="list-group-item border-0">
                <b>시작:</b> ‘손 씻기 훈련 시작’ 버튼을 누르고 웹캠 사용을 허용해 주세요.
              </li>
              <li class="list-group-item border-0">
                <b>준비:</b> 양손을 카메라 중앙 하단에 위치시키고 0.5 초 정도 유지하면
                타이머가 자동으로 시작됩니다.
              </li>
              <li class="list-group-item border-0">
                <b>측정:</b> 30초 동안 손을 씻어주세요. 화면의 진행률·현재 동작·WHO 6단계
                추천 이미지를 참고하면 더욱 꼼꼼히 씻을 수 있습니다.
              </li>
              <li class="list-group-item border-0">
                <b>종료:</b> 30초가 지나거나 ‘종료’ 버튼을 누르면 초기 화면으로
                자동 복귀합니다.
              </li>
            </ol>

            <h5 class="font-weight-bolder text-primary mb-3">⭐ 핵심 기술</h5>
            <ul class="list-group list-group-flush mb-5">
              <li class="list-group-item border-0 ps-0">
                <b>모델:</b> YOLO v8 클래스 분류 헤드를 변형해 손씻기 WHO 6단계를
                인식하도록 학습한 ONNX 모델을 WebAssembly로 실행합니다.
              </li>
              <li class="list-group-item border-0 ps-0">
                <b>실시간 추론:</b> 640×640 프레임을 초당 ~20 FPS 수준으로 분석해
                가장 신뢰도 높은 동작을 매 프레임 판정합니다.
              </li>
              <li class="list-group-item border-0 ps-0">
                <b>스무딩:</b> 최근 10 프레임 히스토리로 노이즈를 완화하여
                잘못된 단계 전환을 줄였습니다.
              </li>
              <li class="list-group-item border-0 ps-0">
                <b>추천 로직:</b> 6개 WHO 단계별 완수 여부를 누적 집계해
                아직 완료되지 않은 부위를 실시간으로 추천(이미지 + 설명)합니다.
              </li>
            </ul>

            <h5 class="font-weight-bolder text-primary mb-3">
              ⭐ 정확한 측정을 위한 팁
            </h5>
            <ul class="list-group list-group-flush">
              <li class="list-group-item border-0 ps-0">
                <b>조명·배경:</b> 손이 선명하게 보이도록 밝고 단색 배경에서 사용하세요.
              </li>
              <li class="list-group-item border-0 ps-0">
                <b>손 위치:</b> 화면 테두리에 손이 잘리지 않도록 카메라와 거리를 조정하세요.
              </li>
              <li class="list-group-item border-0 ps-0">
                <b>속도:</b> 과도하게 빠른 움직임은 인식률을 떨어뜨립니다. 부드럽게
                문지르는 동작을 권장합니다.
              </li>
              <li class="list-group-item border-0 ps-0">
                <b>한계:</b> 한 손이 다른 손을 완전히 가리면 가려진 손의 인식이
                어려울 수 있습니다.
              </li>
            </ul>
          </div></div>
        </div></div>
      </section>

      <!-- 3) 영상 처리 안내 -->
      <section id="how-it-works" class="mb-6">
        <h3 class="font-weight-bold text-center mb-4">방법 및 영상 처리 안내</h3>
        <div class="col-lg-8 mx-auto">
          <ul class="list-group list-group-flush">
            <li class="list-group-item">
              ✅ 웹캠 영상은 <strong>브라우저 메모리</strong>에서만 처리되며 서버로
              전송되지 않습니다.
            </li>
            <li class="list-group-item">
              ✅ ONNX 추론은 <strong>온-디바이스 WebAssembly</strong>로 실행됩니다.
            </li>
            <li class="list-group-item">
              ✅ 측정 데이터는 필요 시 <strong>로컬 스토리지</strong>에만 임시 저장되며
              탭을 닫으면 삭제됩니다.
            </li>
            <li class="list-group-item">
              ❗ 모바일 브라우저 지원이 제한적일 수 있습니다.
              Chrome/Edge 데스크톱 최신 버전을 권장합니다.
            </li>
          </ul>
        </div>
      </section>

    </div>
  </div>

  <DefaultFooter />
</template>

<style scoped>
section { scroll-margin-top: 80px; } /* 앵커 클릭 시 오프셋 */
</style>
