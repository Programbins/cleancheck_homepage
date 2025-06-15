<script setup>
import { onMounted, onUnmounted } from "vue";
import NavbarDefault from "../examples/navbars/NavbarDefault.vue";
import DefaultFooter from "../examples/footers/FooterDefault.vue";
import Header from "../examples/Header.vue";
import vueMkHeader from "@/assets/img/vue-mk-header.jpg";

/* ⬇️ 새로 추가 */
import HandwashingTrainer from "@/components/handwashing/HandwashingTrainer.vue";

const body = document.getElementsByTagName("body")[0];
onMounted(() => {
  body.classList.add("presentation-page", "bg-gray-200");
});
onUnmounted(() => {
  body.classList.remove("presentation-page", "bg-gray-200");
});
</script>

<template>
  <!-- Sticky navbar -->
  <div class="container position-sticky z-index-sticky top-0">
    <div class="row"><div class="col-12"><NavbarDefault :sticky="true" /></div></div>
  </div>

  <!-- Hero banner -->
  <Header>
    <div class="page-header min-vh-75" :style="`background-image: url(${vueMkHeader})`" loading="lazy">
      <div class="container"><div class="row"><div class="col-lg-7 text-center mx-auto position-relative">
        <h1 class="text-white pt-3 mt-n5">Handwashing Check (Demo)</h1>
        <p class="lead text-white px-5 mt-3">MediaPipe 기반 손씻기 자율 측정 기능을 체험해보세요.</p>
      </div></div></div>
    </div>
  </Header>

  <!-- Main card -->
  <div class="card card-body blur shadow-blur mx-3 mx-md-4 mt-n6">
    <div class="container py-5">

      <!-- 1) 자율 손씻기 측정 (MediaPipe) -->
      <section id="selfcheck-section" class="mb-6">
        <h3 class="font-weight-bold text-center mb-4">
          자율 손씻기 측정 <small class="text-primary">(MediaPipe)</small>
        </h3>

        <!-- 👉 여기만 교체: 플레이스홀더 → 실제 트래이너 컴포넌트 -->
        <HandwashingTrainer />
      </section>

      <!-- 2) MediaPipe 3D 손 모델 (아직 준비 중) -->
      <section id="guide-section" class="mb-6">
        <h3 class="font-weight-bold text-center mb-4">프로그램 사용 가이드</h3>
        <div class="row">
          <div class="col-lg-10 mx-auto">
            <div class="card shadow-sm border-0">
              <div class="card-body p-4">

                <h5 class="font-weight-bolder text-primary mb-3">✅ 사용 방법</h5>
                <ol class="list-group list-group-numbered mb-5">
                  <li class="list-group-item border-0"><b>시작:</b> '손 씻기 훈련 시작' 버튼을 누르고 웹캠 사용을 허용해 주세요.</li>
                  <li class="list-group-item border-0"><b>준비:</b> 화면의 안내에 따라 양손을 카메라 중앙 하단에 위치시켜 주세요. 약 0.5초간 자세를 유지하면 측정이 자동으로 시작됩니다.</li>
                  <li class="list-group-item border-0"><b>측정:</b> 30초 동안 손을 씻어주세요. 화면의 점, 진행률 표시줄, 그리고 하단의 추천 동작을 참고하여 꼼꼼하게 씻어보는 것을 권장합니다.</li>
                  <li class="list-group-item border-0"><b>종료:</b> 30초가 지나거나 '종료' 버튼을 누르면 측정이 완료되고 초기 화면으로 돌아갑니다.</li>
                </ol>

                <h5 class="font-weight-bolder text-primary mb-3">💡 원리 및 특징</h5>
                <ul class="list-group list-group-flush mb-5">
                  <li class="list-group-item border-0 ps-0"><b>핵심 기술:</b> Google의 MediaPipe Holistic 기술을 사용하여 웹캠 영상에서 실시간으로 양손의 21개 주요 지점(랜드마크)을 추적합니다.</li>
                  <li class="list-group-item border-0 ps-0"><b>판정 로직:</b> 손목과 손가락 관절의 3차원적 위치 관계를 분석하여 손바닥/손등을 구분하고, 양손이 겹쳐 문지르는 동작이 감지되면 해당 부위가 세척된 것으로 판단합니다.</li>
                  <li class="list-group-item border-0 ps-0"><b>실시간 추천:</b> 매 순간 6개의 주요 세척 부위별 달성도를 계산하여, 가장 점수가 낮은 구역에 해당하는 추천 동작(이미지+설명)을 실시간으로 제시합니다.</li>
                </ul>

                <h5 class="font-weight-bolder text-primary mb-3">⭐ 정확한 측정을 위한 팁 및 주의사항</h5>
                <p>
                  본 기능은 최신 기술을 적용한 프로토타입 데모입니다. 더 정확한 측정을 위해 아래 팁을 참고해 주세요.
                </p>
                <ul class="list-group list-group-flush">
                  <li class="list-group-item border-0 ps-0"><b>조명과 배경:</b> 손이 잘 보일 수 있도록 가급적 밝은 환경과 단색 배경에서 실행해 주세요.</li>
                  <li class="list-group-item border-0 ps-0"><b>손의 위치:</b> 양손이 화면에서 잘리거나 다른 물체에 가려지지 않도록 카메라와 적절한 거리를 유지해 주세요.</li>
                  <li class="list-group-item border-0 ps-0"><b>움직임의 속도:</b> 너무 빠르고 격한 움직임은 모델이 손을 놓치는 원인이 될 수 있습니다. 부드럽게 움직이며 측정하는 것을 권장합니다.</li>
                  <li class="list-group-item border-0 ps-0"><b>인식의 한계:</b> 한 손이 다른 손을 완전히 가리는 경우, 가려진 손의 점들은 추적이 어려울 수 있습니다. 이는 모델의 자연스러운 특성입니다.</li>
                  <li class="list-group-item border-0 ps-0"><b>결과의 활용:</b> 표시되는 점수와 추천은 올바른 손 씻기 습관을 기르기 위한 참고 자료로 활용해 주시면 감사하겠습니다. 앞으로도 지속적으로 모델을 개선해 나가겠습니다.</li>
                </ul>

              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 3) 방법 및 영상 처리 안내 -->
      <section id="how-it-works" class="mb-6">
        <h3 class="font-weight-bold text-center mb-4">방법 및 영상 처리 안내</h3>
        <div class="col-lg-8 mx-auto">
          <ul class="list-group list-group-flush">
            <li class="list-group-item">✅ 웹캠 영상은 <strong>브라우저 메모리</strong>에서만 처리되며 서버로 전송되지 않습니다.</li>
            <li class="list-group-item">✅ MediaPipe 추론은 <strong>온-디바이스 WebGL/WebAssembly</strong>로 실행됩니다.</li>
            <li class="list-group-item">✅ 측정 데이터는 필요 시 <strong>로컬 스토리지</strong>에 임시 저장 후 탭을 닫으면 삭제됩니다.</li>
            <li class="list-group-item">❗ 모바일 브라우저 지원이 제한적일 수 있으니 Chrome/Edge 데스크톱 최신 버전을 권장합니다.</li>
          </ul>
        </div>
      </section>

    </div>
  </div>

  <DefaultFooter />
</template>

<style scoped>
section { scroll-margin-top: 80px; } /* 앵커 오프셋 */
</style>
