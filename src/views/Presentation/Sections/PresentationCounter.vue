<script setup>
import DefaultCounterCard from "../../../examples/cards/counterCards/DefaultCounterCard.vue";
</script>

<template>
  <section class="pt-3 pb-4" id="count-stats">
    <div class="container">
      <div class="row">
        <div class="col-lg-9 z-index-2 border-radius-xl mx-auto py-3">
          <div class="row">
            <div class="col-md-4 position-relative">
              <DefaultCounterCard
                color="success"
                title="저소득국 병원감염 발생률"
                description="입원환자 100명 중 15명은 병원 내에서 감염에 노출됩니다."
                :count="15"
                suffix="%"
                :duration="3000"
                divider="vertical"
              />
            </div>
            <div class="col-md-4 position-relative">
              <DefaultCounterCard
                color="success"
                title="의료진 평균 손위생 준수율"
                description="WHO 권고안이 있지만, 절반 가까이는 제대로 지켜지지 않고 있습니다."
                :count="60"
                suffix="%"
                :duration="3000"
                divider="vertical"
              />
            </div>
            <div class="col-md-4">
              <DefaultCounterCard
                color="success"
                title="손 위생 개선의 경제적 효과"
                description="손 위생 프로그램에 대한 투자는 16배의 비용 절감 효과를 가져옵니다."
                :count="16"
                suffix="배"
                :duration="3000"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>