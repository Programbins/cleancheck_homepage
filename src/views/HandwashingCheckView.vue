<script setup>
import { onMounted, onUnmounted } from "vue";
import NavbarDefault from "../examples/navbars/NavbarDefault.vue";
import DefaultFooter from "../examples/footers/FooterDefault.vue";
import Header from "../examples/Header.vue";
import vueMkHeader from "@/assets/img/vue-mk-header.jpg";

// Placeholder GIFs (put actual files in /assets/img or public folder)
import comingSoonGif from "@/assets/img/cleancheck/coming-soon.gif";

const body = document.getElementsByTagName("body")[0];
onMounted(() => {
  body.classList.add("presentation-page");
  body.classList.add("bg-gray-200");
});
onUnmounted(() => {
  body.classList.remove("presentation-page");
  body.classList.remove("bg-gray-200");
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
        <p class="lead text-white px-5 mt-3">YOLO·MediaPipe 기반 손 씻기 분석 기능을 여기에 탑재할 예정입니다.</p>
      </div></div></div>
    </div>
  </Header>

  <!-- Main card -->
  <div class="card card-body blur shadow-blur mx-3 mx-md-4 mt-n6">
    <div class="container py-5">
      <!-- YOLO Section Placeholder -->
      <section class="mb-6 text-center">
        <h3 class="font-weight-bold mb-4">YOLO Handwashing Tracker</h3>
        <p class="text-muted col-lg-7 mx-auto">실시간 손 동작 인식 및 오염 영역 감지를 제공할 예정입니다.</p>
        <img :src="comingSoonGif" class="img-fluid border-radius-lg shadow-lg" alt="YOLO Coming Soon" style="max-width: 420px;" />
        <p class="small text-muted mt-3">🚧 기능 개발 중 – 곧 만나보실 수 있어요!</p>
      </section>

      <hr class="my-5" />

      <!-- MediaPipe Section Placeholder -->
      <section class="mb-6 text-center">
        <h3 class="font-weight-bold mb-4">MediaPipe 3D Hand Model</h3>
        <p class="text-muted col-lg-7 mx-auto">3D Skeleton &amp; 세정율 히트맵 시각화를 제공할 예정입니다.</p>
        <img :src="comingSoonGif" class="img-fluid border-radius-lg shadow-lg" alt="MediaPipe Coming Soon" style="max-width: 420px;" />
        <p class="small text-muted mt-3">🚧 기능 개발 중 – 곧 만나보실 수 있어요!</p>
      </section>
    </div>
  </div>

  <DefaultFooter />
</template>

<style scoped>
section {
  scroll-margin-top: 80px; /* anchor offset for navbar */
}
</style>
