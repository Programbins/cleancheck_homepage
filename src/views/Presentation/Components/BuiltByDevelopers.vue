<script setup>
// 요청하신 '@/assets/img/cleancheck/handwash.png' 경로를 사용합니다.
// Vue가 빌드 시 올바른 최종 경로를 찾을 수 있도록 new URL()로 경로를 생성합니다.
const backgroundImageUrl = new URL('@/assets/img/cleancheck/handwash.png', import.meta.url).href;
</script>

<template>
  <div class="container mt-sm-5">
    <div
      class="page-header py-6 py-md-5 my-sm-3 mb-3 border-radius-xl"
      :style="{
        backgroundImage: `url(${backgroundImageUrl})`,
      }"
    >
      <span class="mask bg-gradient-dark opacity-5"></span>
      <div class="container">
        <div class="row">
          <div class="col-lg-8 ms-lg-5">
            <h4 class="text-white">과학적 검증</h4>
            <h1 class="text-white">UV 형광 실험으로 검증된 정확도</h1>
            <p class="lead text-white opacity-8">
              형광 손소독제를 사용하여 형광 물질을 바르고 손을 씻은 뒤, UV
              블랙라이트로 남은 영역을 촬영했습니다. 이 영상을 Ground Truth
              데이터로 활용하여 알고리즘의 정확도를 객관적으로 측정하고
              개선했습니다.
            </p>
            <router-link to="/uv-experiment" class="text-white icon-move-right">
              연구 과정 더보기
              <i class="fas fa-arrow-right text-sm ms-1"></i>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 필요한 경우 여기에 스타일을 추가할 수 있습니다. */
</style>