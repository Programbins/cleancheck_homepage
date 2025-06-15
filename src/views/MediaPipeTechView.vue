<script setup>
import { onMounted, onUnmounted } from "vue";
import NavbarDefault  from "../examples/navbars/NavbarDefault.vue";
import DefaultFooter  from "../examples/footers/FooterDefault.vue";
import Header         from "../examples/Header.vue";
import vueMkHeader    from "@/assets/img/vue-mk-header.jpg";

/* 이미지 경로는 실제 프로젝트 구조에 맞춰 교체하세요 */
import hands from "@/assets/img/cleancheck/hands.png";
import Holistic from "@/assets/img/cleancheck/Holistic.png";
import occlusionBefore from "@/assets/img/cleancheck/occlusionBefore.png";
import occlusionAfter  from "@/assets/img/cleancheck/occlusionAfter.png";
import realtimeTable   from "@/assets/img/cleancheck/realtimeTable.png";

const body = document.body;
onMounted(() => body.classList.add("presentation-page", "bg-gray-200"));
onUnmounted(() => body.classList.remove("presentation-page", "bg-gray-200"));
</script>

<template>
  <!-- ───────── NAVBAR ───────── -->
  <div class="container position-sticky z-index-sticky top-0">
    <div class="row"><div class="col-12"><NavbarDefault :sticky="true" /></div></div>
  </div>

  <!-- ───────── HERO ───────── -->
  <Header>
    <div
      class="page-header min-vh-75 d-flex align-items-center"
      :style="`background-image: url(${vueMkHeader})`"
      loading="lazy"
    >
      <div class="container">
        <div class="row">
          <div class="col-lg-8 mx-auto text-center">
            <h1 class="text-white pt-3 mt-n5 d-inline-block">MediaPipe&nbsp;기술&nbsp;정리</h1>
            <p class="lead text-white px-5 mt-3 fw-medium">
              MediaPipe가&nbsp;무엇인지,&nbsp;그리고&nbsp;손&nbsp;씻기&nbsp;분석에&nbsp;어떻게&nbsp;쓰이는지&nbsp;소개합니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  </Header>

  <!-- ───────── MAIN CARD ───────── -->
  <div class="card card-body blur shadow-blur mx-3 mx-md-4 mt-n6">
    <div class="container py-5">

      <!-- WHAT IS MEDIAPIPE -->
      <section class="text-center mb-7">
        <h3 class="fw-bold mb-3">MediaPipe란?</h3>
        <p class="text-muted">
          <b>MediaPipe</b>는&nbsp;Google이&nbsp;제공하는&nbsp;멀티플랫폼&nbsp;<em>실시간&nbsp;비전·센서&nbsp;AI&nbsp;파이프라인</em>입니다.&nbsp;
          손·포즈·얼굴&nbsp;등&nbsp;다양한&nbsp;랜드마크를&nbsp;경량&nbsp;모델로&nbsp;추출하여&nbsp;AR/VR,&nbsp;헬스케어,&nbsp;로봇&nbsp;등에&nbsp;폭넓게&nbsp;활용됩니다.
        </p>
        <ul class="list-group list-group-flush text-center mt-3">
          <li class="list-group-item border-0">모듈: Hands, Pose, Holistic, FaceMesh, Selfie&nbsp;Segmentation</li>
          <li class="list-group-item border-0">특징: GPU·CPU&nbsp;자동&nbsp;최적화,&nbsp;낮은&nbsp;지연,&nbsp;작은&nbsp;모델&nbsp;사이즈</li>
        </ul>
      </section>

      <!-- WHY FOR HANDWASHING -->
      <section class="mb-7">
        <h3 class="fw-bold text-center mb-3">손&nbsp;씻기&nbsp;분석에&nbsp;MediaPipe를&nbsp;쓰는&nbsp;이유</h3>
        <ul class="list-group list-group-flush text-center">
          <li class="list-group-item border-0"><b>정밀&nbsp;추적</b>&nbsp;―&nbsp;양손&nbsp;21&nbsp;키포인트로&nbsp;위치·각도·형태&nbsp;실시간&nbsp;분석</li>
          <li class="list-group-item border-0"><b>비접촉&nbsp;센싱</b>&nbsp;―&nbsp;웹캠만으로&nbsp;별도&nbsp;센서&nbsp;불필요</li>
          <li class="list-group-item border-0"><b>세척률&nbsp;자동화</b>&nbsp;―&nbsp;부위별&nbsp;세척&nbsp;정도&nbsp;즉시&nbsp;피드백</li>
          <li class="list-group-item border-0"><b>가벼운&nbsp;추론</b>&nbsp;―&nbsp;웹·모바일&nbsp;모두&nbsp;24&nbsp;FPS&nbsp;이상&nbsp;유지</li>
        </ul>
      </section>

      <!-- BASELINE MODEL -->
      <section class="text-center mb-7">
        <h3 class="fw-bold mb-3">Holistic&nbsp;모델&nbsp;채택</h3>
        <p class="text-muted">
          포즈·손·얼굴을&nbsp;통합&nbsp;추적하는&nbsp;<b>Holistic</b>은&nbsp;손목&nbsp;랜드마크&nbsp;안정성이&nbsp;우수해&nbsp;손&nbsp;좌표&nbsp;<em>보간</em>&nbsp;및&nbsp;오클루전&nbsp;처리에&nbsp;유리합니다.
        </p>
        <div class="d-flex flex-column flex-md-row justify-content-center gap-3 mt-4">
          <img :src="occlusionBefore" class="img-fluid rounded shadow" style="max-width:320px" alt="보정 전" />
          <img :src="occlusionAfter"  class="img-fluid rounded shadow" style="max-width:320px" alt="보정 후" />
        </div>
        <figcaption class="text-muted small mt-2">Hands&nbsp;모델&nbsp;대비&nbsp;Holistic&nbsp;모델&nbsp;비교</figcaption>
      </section>

      <!-- OCCLUSION ALGORITHM -->
      <section class="mb-7">
        <h3 class="fw-bold text-center mb-3">오클루전&nbsp;보완&nbsp;알고리즘</h3>
        <ol class="ps-3">
          <li class="mb-1"><b>Pose-Guided&nbsp;Hand&nbsp;Assignment</b>&nbsp;―&nbsp;포즈&nbsp;손목으로&nbsp;좌/우&nbsp;라벨&nbsp;재할당</li>
          <li class="mb-1"><b>칼만&nbsp;필터&nbsp;평활화</b>&nbsp;―&nbsp;노이즈&nbsp;감소·궤적&nbsp;부드럽게</li>
          <li class="mb-1"><b>Wrist-Δ&nbsp;보간</b>&nbsp;―&nbsp;키포인트&nbsp;누락&nbsp;시&nbsp;직전&nbsp;손목&nbsp;벡터로&nbsp;예측</li>
        </ol>

        <div class="d-flex flex-column flex-md-row justify-content-center gap-3 mt-4">
          <img :src="occlusionBefore" class="img-fluid rounded shadow" style="max-width:320px" alt="보정 전" />
          <img :src="occlusionAfter"  class="img-fluid rounded shadow" style="max-width:320px" alt="보정 후" />
        </div>
        <figcaption class="text-muted small mt-2 text-center">보정&nbsp;전&nbsp;vs&nbsp;보정&nbsp;후</figcaption>
      </section>

      <!-- REALTIME PERFORMANCE -->
      <section class="text-center mb-7">
        <h3 class="fw-bold mb-3">실시간&nbsp;성능</h3>
        <p class="text-muted">
          60초&nbsp;테스트&nbsp;결과&nbsp;<b>평균&nbsp;FPS&nbsp;24.5</b>,&nbsp;지연&nbsp;40.9&nbsp;ms.&nbsp;
          CPU·RAM&nbsp;증가는&nbsp;0.8%p&nbsp;/&nbsp;4&nbsp;MB로&nbsp;무시할&nbsp;수준입니다.
        </p>
        <img :src="realtimeTable" class="img-fluid rounded shadow mt-4" alt="실시간 성능 표" />
      </section>

      <!-- SUMMARY -->
      <section class="text-center">
        <h3 class="fw-bold mb-3">결론&nbsp;및&nbsp;향후&nbsp;계획</h3>
        <p class="text-muted">
          MediaPipe와&nbsp;보정&nbsp;알고리즘을&nbsp;결합해&nbsp;<em>정확도·실시간성</em>을&nbsp;동시에&nbsp;확보했습니다.&nbsp;
          앞으로&nbsp;YOLO&nbsp;기반&nbsp;동작&nbsp;인식과&nbsp;통합하여&nbsp;더&nbsp;정밀한&nbsp;손&nbsp;위생&nbsp;코칭&nbsp;플랫폼으로&nbsp;확장할&nbsp;예정입니다.
        </p>
      </section>
    </div>
  </div>

  <!-- ───────── FOOTER ───────── -->
  <DefaultFooter />
</template>

<style scoped>
/* 리스트 hover 효과 */
.list-group-item:hover { background: rgba(0,0,0,0.03); }

/* ul·ol 기본 불릿 제거 + 중앙 정렬 */
ul, ol { list-style: none; padding-left: 0; margin: 0 auto; }

/* 이미지 최대 크기 제한 */
img { max-width: 100%; height: auto; }
</style>
