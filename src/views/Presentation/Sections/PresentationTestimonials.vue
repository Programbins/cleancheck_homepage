<script setup>
import DefaultReviewCard from "@/examples/cards/reviewCards/DefaultReviewCard.vue";
</script>
<template>
  <section class="py-7">
    <div class="container">
      <div class="row">
        <div class="col-lg-6 mx-auto text-center">
          <h2 class="text-dark mb-3">지속적으로 발전하는 CleanCheck</h2>
          <p class="lead">
            CleanCheck는 더 나은 위생 환경을 위해 멈추지 않고 나아갈 것 입니다.
          </p>
        </div>
      </div>

      <div class="row mt-6">
        <DefaultReviewCard
          name="모델 고도화"
          review='"데이터 증강, 지식 증류 등 최신 기술로 모델을 더욱 가볍고 빠르게 만들겠습니다."'
        />
        <DefaultReviewCard
          class="ms-md-auto"
          color="bg-gradient-success"
          name="플랫폼 확장"
          review='"모바일과 웹에서도 CleanCheck을 사용하고, 클라우드 대시보드로 데이터를 관리하는 기능을 추가하겠습니다."'
        />
        <DefaultReviewCard
          name="UI/UX 강화"
          review='"어린이, 병원 등 사용 환경에 특화된 테마를 개발하여 누구나 쉽고 재미있게 사용하도록 개선하겠습니다."'
        />
      </div>

      <hr class="horizontal dark my-5" />

      <div class="row">
        <div class="col-12 text-center mb-4">
          <h4 class="text-dark">기술 스택</h4>
        </div>
        <div
          class="d-flex justify-content-center align-items-center flex-wrap"
        >
          <a
            href="https://www.python.org"
            target="_blank"
            data-bs-toggle="tooltip"
            title="Python"
            ><img
              src="https://cdn.simpleicons.org/python/3776AB"
              alt="Python"
              class="w-auto opacity-8 mx-3 my-3"
              style="height: 40px"
          /></a>
          <a
            href="https://opencv.org/"
            target="_blank"
            data-bs-toggle="tooltip"
            title="OpenCV"
            ><img
              src="https://cdn.simpleicons.org/opencv/5C3EE8"
              alt="OpenCV"
              class="w-auto opacity-8 mx-3 my-3"
              style="height: 40px"
          /></a>
          <a
            href="https://developers.google.com/mediapipe"
            target="_blank"
            data-bs-toggle="tooltip"
            title="MediaPipe"
            ><img
              src="@/assets/img/cleancheck/mediapipe.png"
              alt="MediaPipe"
              class="w-auto opacity-8 mx-3 my-3"
              style="height: 40px"
          /></a>
          <a
            href="https://github.com/ultralytics/ultralytics"
            target="_blank"
            data-bs-toggle="tooltip"
            title="YOLOv8"
            ><img
              src="@/assets/img/cleancheck/yolo.png"
              alt="YOLOv8"
              class="w-auto opacity-8 mx-3 my-3"
              style="height: 40px"
          /></a>
          <a
            href="https://github.com/TomSchimansky/CustomTkinter"
            target="_blank"
            data-bs-toggle="tooltip"
            title="CustomTkinter"
            ><img
              src="@/assets/img/cleancheck/customtkingter.png"
              alt="CustomTkinter"
              class="w-auto opacity-8 mx-3 my-3"
              style="height: 40px"
          /></a>
          <a
            href="https://flutter.dev"
            target="_blank"
            data-bs-toggle="tooltip"
            title="Flutter"
            ><img
              src="https://cdn.simpleicons.org/flutter/02569B"
              alt="Flutter"
              class="w-auto opacity-8 mx-3 my-3"
              style="height: 40px"
          /></a>
          <a
            href="https://vuejs.org/"
            target="_blank"
            data-bs-toggle="tooltip"
            title="Vue.js"
            ><img
              src="https://cdn.simpleicons.org/vuedotjs/4FC08D"
              alt="Vue.js"
              class="w-auto opacity-8 mx-3 my-3"
              style="height: 40px"
          /></a>
          <a
            href="https://nodejs.org"
            target="_blank"
            data-bs-toggle="tooltip"
            title="Node.js"
            ><img
              src="https://cdn.simpleicons.org/nodedotjs/339933"
              alt="Node.js"
              class="w-auto opacity-8 mx-3 my-3"
              style="height: 40px"
          /></a>
          <a
            href="https://expressjs.com"
            target="_blank"
            data-bs-toggle="tooltip"
            title="Express"
            ><img
              src="@/assets/img/cleancheck/express.png"
              alt="Express"
              class="w-auto opacity-8 mx-3 my-3"
              style="height: 40px"
          /></a>
        </div>
      </div>
    </div>
  </section>
</template>