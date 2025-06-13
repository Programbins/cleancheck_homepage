<script setup>
import RotatingCard from "../../../examples/cards/rotatingCards/RotatingCard.vue";
import RotatingCardFront from "../../../examples/cards/rotatingCards/RotatingCardFront.vue";
import RotatingCardBack from "../../../examples/cards/rotatingCards/RotatingCardBack.vue";
import DefaultInfoCard from "../../../examples/cards/infoCards/DefaultInfoCard.vue";
</script>
<template>
  <section class="my-5 py-5">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-lg-4 ms-auto me-auto p-lg-4 mt-lg-0 mt-4">
          <RotatingCard>
            <RotatingCardFront
              image="@/assets/img/cleancheck/virus.png"
              icon="warning"
              title="보이지 않는 위협, 병원감염"
              description="전 세계적으로 손 위생 준수율은 여전히 낮으며, 특히 소득 수준에 따른 격차가 심각하여 감염 위험을 높이고 있습니다."
            />

            <RotatingCardBack
              image="@/assets/img/cleancheck/virus.png"
              title="검증된 해결책: WHO 전략"
              description="교육, 모니터링, 실시간 피드백을 결합한 WHO의 다중 전략은 병원감염을 50%까지 예방할 수 있는 가장 효과적인 방법입니다."
              :action="[
                {
                  route:
                    'https://www.who.int/teams/integrated-health-services/infection-prevention-control/hand-hygiene',
                  label: '더 알아보기',
                },
              ]"
            />
          </RotatingCard>
        </div>
        <div class="col-lg-6 ms-auto">
          <div class="row justify-content-start">
            <DefaultInfoCard
              icon="hourglass_empty"
              title="실시간 모니터링의 부재"
              description="의료진의 절차가 번거롭고, 일반인의 동작을 평가하기 어려운 기존 방식은 한계가 명확합니다."
            />
            <DefaultInfoCard
              icon="analytics"
              title="데이터 기반 피드백"
              description="CleanCheck는 AI기반 실시간 피드백으로 WHO 전략의 핵심인 '모니터링과 피드백'을 자동화합니다."
            />
          </div>
          <div class="row justify-content-start mt-5">
            <DefaultInfoCard
              class="mt-3"
              icon="groups"
              title="의료진과 일반인 모두를 위해"
              description="엄격한 절차 평가와 자유로운 손씻기 평가를 모두 지원하여 사용자층을 넓혔습니다."
            />
            <DefaultInfoCard
              class="mt-3"
              icon="checklist"
              title="장기적 습관 형성 유도"
              description="시각적 피드백은 사용자가 스스로 위생 상태를 개선하고 올바른 습관을 형성하도록 돕습니다."
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>