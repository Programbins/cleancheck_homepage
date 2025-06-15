<script setup>
import { onMounted, onUnmounted } from "vue";
import NavbarDefault from "../examples/navbars/NavbarDefault.vue";
import DefaultFooter from "../examples/footers/FooterDefault.vue";
import Header from "../examples/Header.vue";
import vueMkHeader from "@/assets/img/vue-mk-header.jpg";

/* 이미지 예시 — 실제 프로젝트 경로에 맞게 교체하세요 */
import labelExample from "@/assets/img/cleancheck/dataset_labeling.png";
import splitChart from "@/assets/img/cleancheck/dataset.png";
import mapChart from "@/assets/img/cleancheck/results.png";
import testDemo from "@/assets/img/cleancheck/yolo_test.gif";

const body = document.getElementsByTagName("body")[0];
onMounted(() => {
  body.classList.add("presentation-page", "bg-gray-200");
});
onUnmounted(() => {
  body.classList.remove("presentation-page", "bg-gray-200");
});
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
            <h1 class="text-white pt-3 mt-n5">YOLO 기술 정리</h1>
            <p class="lead text-white px-5 mt-3 fw-medium">
              YOLO 기술과 손 씻기에 어떻게 사용되는지 정리했습니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  </Header>

  <!-- ───────── MAIN CARD ───────── -->
  <div class="card card-body blur shadow-blur mx-3 mx-md-4 mt-n6">
    <div class="container py-5">
      <!-- WHY YOLO -->
      <div class="row text-center mb-5">
        <div class="col-lg-8 mx-auto">
          <h3 class="font-weight-bold">YOLO(You Only Live Once) 모델 설명</h3>
          <p class="text-muted">
            <b>YOLO</b>는 이미지를 한 번만 스캔해 객체 종류와 위치를 동시에 예측하는 실시간 객체 탐지 모델입니다. 높은 FPS와 정확도로 자율주행·스마트 시티·의료영상 등 다양한 분야에서 활용됩니다.
          </p>
          <p class="text-muted">
            이미지가 작은 그리드로 분할되고, 각 셀이 객체 존재 여부·클래스·바운딩 박스를 예측합니다.
          </p>
        </div>
      </div>

      <hr class="my-5" />

      <!-- ADVANTAGES -->
      <div class="row text-center mb-5">
        <div class="col-lg-8 mx-auto">
          <h3 class="font-weight-bold mb-4">YOLO의 주요 활용</h3>
        </div>
        <div class="col-12">
          <ul class="list-group list-group-flush">
            <li class="list-group-item border-0">자율주행차: 보행자·차선·차량 탐지</li>
            <li class="list-group-item border-0">스마트 시티: 교통 흐름·불법 투기 감지</li>
            <li class="list-group-item border-0">의료 영상: 병변·종양 탐색</li>
            <li class="list-group-item border-0">농업: 병충해 작물 자동 분류</li>
            <li class="list-group-item border-0">산업 안전: 위험 물체 경고</li>
          </ul>
        </div>
      </div>

      <hr class="my-5" />

      <!-- SYSTEM OVERVIEW -->
      <div class="row mb-5">
        <div class="col-lg-10 mx-auto">
          <h3 class="font-weight-bold text-center mb-4">손 씻기 자동 인식 시스템</h3>
          <p class="text-muted text-center">
            WHO 6단계 손 씻기 동작을 <b>YOLOv8n</b>으로 학습해 웹캠 영상을 실시간 분석·피드백합니다. 각 동작이 권장 시간(6초) 이상 수행되는지 체크하여 부족한 단계는 즉시 경고합니다.
          </p>
        </div>
      </div>

      <!-- PIPELINE & DATA -->
      <div class="row mb-5 align-items-center">
        <div class="col-md-6">
          <h4 class="font-weight-bold mb-3">학습 과정</h4>
          <ol class="list-group list-group-numbered">
            <li class="list-group-item border-0 ps-3">데이터 5,816장(동작별 ≈970) 촬영·라벨링</li>
            <li class="list-group-item border-0 ps-3">Train 4,652 / Val 582 / Test 582 분할</li>
            <li class="list-group-item border-0 ps-3">YOLOv8n, 640×640, 100 Epoch, A100 GPU</li>
          </ol>
        </div>
        <div class="col-md-6 text-center">
          <img :src="labelExample" class="img-fluid rounded shadow-lg" alt="라벨링 예시" />
          <figcaption class="text-muted small mt-2">라벨링 예시</figcaption>
        </div>
      </div>

      <!-- SPLIT CHART -->
      <div class="row mb-5 justify-content-center">
        <div class="col-md-8 text-center">
          <img :src="splitChart" class="img-fluid rounded shadow-lg" alt="데이터셋 분할 비율" />
          <figcaption class="text-muted small mt-2">데이터셋 정리</figcaption>
        </div>
      </div>

      <hr class="my-5" />

      <!-- PERFORMANCE -->
      <div class="row text-center mb-5">
        <div class="col-lg-8 mx-auto">
          <h3 class="font-weight-bold mb-4">모델 성능</h3>
          <p class="text-muted mb-1">mAP<sub>50</sub> : 0.992</p>
          <p class="text-muted">mAP<sub>50-95</sub> : 0.926</p>
        </div>
        <div class="col-12 mt-4">
          <img :src="mapChart" class="img-fluid rounded shadow-lg" alt="mAP 그래프" />
          <figcaption class="text-muted small mt-2">성능 그래프</figcaption>
        </div>
      </div>

      <!-- DEMO -->
      <div class="row mb-5 justify-content-center">
        <div class="col-md-8 text-center">
          <img :src="testDemo" class="img-fluid rounded shadow-lg" alt="실시간 데모" />
          <figcaption class="text-muted small mt-2">실시간 예측 데모</figcaption>
        </div>
      </div>

      <hr class="my-5" />

      <!-- SUMMARY -->
      <div class="row mb-5">
        <div class="col-lg-8 mx-auto">
          <h3 class="font-weight-bold text-center mb-4">결론 및 향후 계획</h3>
          <p class="text-muted">
            CleanCheck의 YOLO 기반 손 씻기 인식 시스템은 높은 정확도로 실시간 피드백을 제공합니다. 향후 Medipipe Holistic 기반 세척 영역 분석과 결합해 더욱 정밀한 위생 코칭 플랫폼으로 발전시킬 예정입니다.
          </p>
        </div>
      </div>
    </div>
  </div>

  <DefaultFooter />
</template>

<style scoped>
.list-group-item:hover {
  background-color: rgba(0, 0, 0, 0.03);
}
</style>