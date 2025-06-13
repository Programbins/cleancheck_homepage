<script setup>
import { onMounted, onUnmounted } from "vue";
import NavbarDefault from "../examples/navbars/NavbarDefault.vue";
import DefaultFooter from "../examples/footers/FooterDefault.vue";
import Header from "../examples/Header.vue";
import vueMkHeader from "@/assets/img/vue-mk-header.jpg";

// 1. 표시할 포스터 이미지 파일을 import 합니다.
// public 폴더에 이미지를 넣고 절대 경로로 사용하는 방법도 있습니다.
import posterImage from "@/assets/img/cleancheck/poster-image.jpg"; // PDF를 변환한 이미지 경로

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
  <div class="container position-sticky z-index-sticky top-0">
    <div class="row">
      <div class="col-12">
        <NavbarDefault :sticky="true" />
      </div>
    </div>
  </div>

  <Header>
    <div
      class="page-header min-vh-75"
      :style="`background-image: url(${vueMkHeader})`"
      loading="lazy"
    >
      <div class="container">
        <div class="row">
          <div class="col-lg-7 text-center mx-auto position-relative">
            <h1 class="text-white pt-3 mt-n5 me-2">포스터 (Poster)</h1>
            <p class="lead text-white px-5 mt-3">
              CleanCheck 프로젝트의 핵심 연구 내용과 결과를 시각적으로 정리한 포스터입니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  </Header>

  <div class="card card-body blur shadow-blur mx-3 mx-md-4 mt-n6">
    <p class="text-sm mt-2 text-muted">
        
    </p>
    <div class="container py-5">
      <div class="row">
        <div class="col-lg-10 mx-auto text-center">
          <img
            :src="posterImage"
            class="img-fluid border-radius-lg shadow-lg"
            alt="CleanCheck 연구 포스터"
          />

      <a
        href="/files/CleanCheck_Poster.pdf"
        download="CleanCheck_Poster.pdf"
        class="btn btn-success mt-5"
      >
        포스터 원본 파일(PDF) 다운로드
      </a>
      <p class="text-sm mt-2 text-muted">
        이미지가 선명하게 보이지 않는 경우, 위 버튼을 클릭하여 원본 PDF 파일을
        다운로드하세요.
      </p>
    </div>
    </div>
  </div>
</div>

  <DefaultFooter />
</template>