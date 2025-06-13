<script setup>
import ExampleCard from "../Components/ExampleCard.vue";
import MaterialBadge from "../../../components/MaterialBadge.vue";
import yolo from "@/assets/img/cleancheck/yolo_test.gif";
import mediapipe from "@/assets/img/cleancheck/mediapipe_test.gif";
</script>

<template>
  <section class="py-5">
    <div class="container">
      <div class="row">
        <div class="row text-center my-sm-5 mt-5">
          <div class="col-lg-6 mx-auto">
            <MaterialBadge color="success" class="mb-3">
              실제 사용 예시
            </MaterialBadge>
            <h2 class="">CleanCheck 실제 작동 모습</h2>
            <p class="lead">
              CleanCheck의 두 가지 핵심<br /> 모드가 어떻게 작동하는지
              직접 확인해보세요.
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="container mt-5">
      <div class="row">
        <div class="col-md-8">
          <div class="row mt-4">
            <div class="col-md-6 mt-md-0 mt-5">
              <ExampleCard
                class="shadow-lg"
                title="6단계 모드"
                :image="yolo"
              />
            </div>
            <div class="col-md-6 mt-md-0 mt-5">
              <ExampleCard
                class="shadow-lg"
                title="자율 모드"
                :image="mediapipe"
              />
            </div>
          </div>
        </div>
        <div class="col-md-3 mx-auto mt-md-0 mt-3">
          <div class="position-sticky" style="top: 100px !important">
            <h3>두 가지 맞춤형 코칭 모드</h3>
            <h6 class="text-secondary font-weight-normal">
              표준 절차를 배우고 싶을 땐 '6단계 모드'를, 평소 습관을 점검하고
              싶을 땐 '자율 모드'를 선택하여 60초 안에 손 위생 상태를 점검하고
              개선할 수 있습니다.
            </h6>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
