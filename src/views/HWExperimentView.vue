<script setup>
import { onMounted, onUnmounted } from "vue";
import NavbarDefault from "../examples/navbars/NavbarDefault.vue";
import DefaultFooter from "../examples/footers/FooterDefault.vue";
import Header from "../examples/Header.vue";
import vueMkHeader from "@/assets/img/vue-mk-header.jpg";

const body = document.getElementsByTagName("body")[0];
onMounted(() => {
  body.classList.add("presentation-page", "bg-gray-200");
});
onUnmounted(() => {
  body.classList.remove("presentation-page", "bg-gray-200");
});
</script>

<template>
  <!-- ★ 상단 고정 내비게이션 -->
  <div class="container position-sticky z-index-sticky top-0">
    <div class="row"><div class="col-12"><NavbarDefault :sticky="true" /></div></div>
  </div>

  <!-- ★ 헤더(배너) -->
<Header>
  <div class="page-header min-vh-75" :style="`background-image: url(${vueMkHeader})`" loading="lazy">
    <div class="container">
      <div class="row">
        <div class="col-lg-8 text-center mx-auto position-relative">
          <h1 class="text-white pt-3 mt-n5" :style="{ display: 'inline-block' }">손 위생 연구 : 최신 조사 결과</h1>
          <p class="lead text-white px-5 mt-3" :style="{ fontWeight: '500' }">2025년 5월 14일부터 6월 5일까지 내과 의료진을 대상으로 진행된 기초 조사 결과를 요약합니다.</p>
        </div>
      </div>
    </div>
  </div>
</Header>

  <!-- ★ 본문 카드 -->
  <div class="card card-body blur shadow-blur mx-3 mx-md-4 mt-n6">
    <div class="container py-5">
      <!-- ───── WHY HAND HYGIENE RESEARCH? ───── -->
 <!-- ───── 왜 손 위생 연구인가? ───── -->
<section id="why" class="mb-7">
  <h3 class="font-weight-bold text-center mb-4">Why Hand Hygiene Research?</h3>
  <div class="row justify-content-center mb-3">
    <div class="col-lg-8 text-center">
      <p>손은 여전히 <b>의료 관련 감염의 주요 매개체</b>입니다. 수십 년간의 캠페인에도 불구하고, 손 위생 준수율과 세척 기술의 질은 여전히 크게 차이가 납니다. 근거 기반 연구는 <em>어떤 동작, 시간, 부위</em>가 간과되는지를 밝혀내어, 데이터 기반 피드백과 맞춤형 교육, 그리고 보다 정밀한 감염 관리 정책 수립을 가능하게 합니다.</p>
      <p class="mt-2">세척되지 않은 부위와 마찰 횟수를 수치화함으로써, 눈에 보이지 않는 미생물 감염 위험을 <b>눈에 보이고 실천 가능한 지표</b>로 전환해, 지침과 실제 현장 사이의 간극을 줄입니다.</p>
    </div>
  </div>
</section>


      <!-- ───── 자료 수집 개요 ───── -->
      <section id="section1" class="mb-7">
        <h3 class="font-weight-bold text-center mb-4">자료 수집 개요</h3>
        <div class="row justify-content-center mb-4">
          <div class="col-lg-8">
            <div class="table-responsive">
              <table class="table">
                <tbody>
                  <tr><th class="w-25">사전 조사 기간</th><td>2025‑05‑14 ~ 2025‑06‑05</td></tr>
                  <tr><th>조사 대상</th><td>내과계 의료인 (직접 관찰)</td></tr>
                  <tr><th>수집 항목</th><td>올바른 손위생 수행(손 전체 면적), 올바른 손위생 수행(마찰 횟수)</td></tr>
                  <tr><th>조사 방법</th><td>WHO 6단계 기준 직접 관찰</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <!-- ───── 손 위생 동작별 표면적 기여율 ───── -->
      <section id="section2" class="mb-7">
        <h3 class="font-weight-bold text-center mb-4">손 위생 동작별 표면적 기여율</h3>
        <div class="row justify-content-center mb-3">
          <div class="col-md-8 text-center">
            <img src="@/assets/img/cleancheck/surface_contribution.png" class="uniform-img rounded shadow mx-auto" alt="표면적 기여율" />
            <small class="text-muted d-block mt-2">양손 전체 면적 100 % 기준 <b>표면적 기여율</b> 도식.</small>
          </div>
        </div>
      </section>

      <!-- ───── 올바른 손 위생 수행 (손 전체 면적) ───── -->
      <section id="section3" class="mb-7">
        <h3 class="font-weight-bold text-center mb-4">올바른 손 위생 수행 (손 전체 면적)</h3>
        <div class="row row-cols-1 row-cols-md-2 g-4 mb-4 justify-content-center">
          <div class="col"><img src="@/assets/img/cleancheck/coverage_01.png" class="uniform-img rounded shadow" alt="손위생 전체 면적 1" /></div>
          <div class="col"><img src="@/assets/img/cleancheck/coverage_02.png" class="uniform-img rounded shadow" alt="손위생 전체 면적 2" /></div>
          <div class="col"><img src="@/assets/img/cleancheck/coverage_03.png" class="uniform-img rounded shadow" alt="손위생 전체 면적 3" /></div>
          <div class="col"><img src="@/assets/img/cleancheck/coverage_04.png" class="uniform-img rounded shadow" alt="손위생 전체 면적 4" /></div>
        </div>
      </section>

      <!-- ───── 올바른 손 위생 수행 (마찰 횟수) ───── -->
      <section id="section4" class="mb-7">
        <h3 class="font-weight-bold text-center mb-4">올바른 손 위생 수행 (마찰 횟수)</h3>
        <div class="row row-cols-1 row-cols-md-2 g-4 mb-4 justify-content-center">
          <div class="col"><img src="@/assets/img/cleancheck/area_metric_graph.png" class="uniform-img rounded shadow" alt="면적 지표 그래프" /></div>
          <div class="col"><img src="@/assets/img/cleancheck/sr_vs_friction_graph.png" class="uniform-img rounded shadow" alt="수행률 vs 마찰 횟수" /></div>
        </div>
        <ul class="list-group list-group-flush mb-4 col-lg-8 mx-auto">
          <li class="list-group-item">총 마찰 횟수의 전체 평균 : <b>25.82회</b></li>
          <li class="list-group-item">엄지손가락 세척 누락 : <b>54.3 %</b></li>
          <li class="list-group-item">손톱 밑 세척 누락 : <b>40.3 %</b></li>
          <li class="list-group-item">손바닥은 높은 충실도, 반면 <b>엄지·두 손 모아 문지르기·손톱 밑</b> 단계는 매우 낮음</li>
          <li class="list-group-item">해당 부위들은 감염 전파의 잠재적 경로 → 집중 개선 필요</li>
        </ul>
      </section>

      <!-- ───── HSAC-% 모델 ───── -->
      <section id="section5" class="mb-7">
        <h3 class="font-weight-bold text-center mb-4">HSAC‑% (Hand Surface Area Coverage) 모델</h3>
        <div class="row justify-content-center mb-3">
          <div class="col-lg-8">
            <p class="mb-3"><b>HSAC‑%</b>는 <em>해부학적 면적</em>과 <em>임상적 중요도</em> 가중치에 <em>관찰된 수행률 격차</em>를 교정하여 산출한 면적 기반 품질 지표입니다.</p>
            <ul class="list-group list-group-flush mb-4">
              <li class="list-group-item">0‑15초 구간(N = 77) : <b>73 %</b> – 기본 커버리지 확보</li>
              <li class="list-group-item">16‑30초 구간(N = 37) : <b>86.9 %</b> – 커버리지 상승</li>
              <li class="list-group-item">30초 초과 구간(N = 14) : <b>89.1 %</b> – 증가폭 2.2 %p로 정체</li>
              <li class="list-group-item">평균 HSAC‑% : <b>77.80 %</b> (손 표면 22.2 % 누락)</li>
              <li class="list-group-item">중앙값 HSAC‑% : <b>75.00 %</b> – 절반 이상이 평균 이하 품질</li>
            </ul>
          </div>
        </div>
        <div class="row justify-content-center mb-4">
          <div class="col-md-8 text-center">
            <img src="@/assets/img/cleancheck/hsac_time_curve.png" class="uniform-img rounded shadow mx-auto" alt="HSAC 분포 그래프" />
            <small class="text-muted d-block mt-2">HSAC‑% 분포 및 단계별 변화.</small>
          </div>
        </div>
      </section>

      <!-- ───── CONCLUSION ───── -->
<!-- ───── 결론 ───── -->
<section id="conclusion" class="mb-7">
  <h3 class="font-weight-bold text-center mb-4">결론 — 왜 손 씻기가 중요한가</h3>
  <div class="row justify-content-center">
    <div class="col-lg-8">
      <p>손 세척 시 표면이 제대로 덮이지 않거나 마찰 횟수가 부족하면 병원체를 제거하지 못해 감염 위험이 커집니다. 남은 <b>22%의 미세 세척 영역</b>을 채우는 것만으로도 병원 내 감염의 약 4건 중 1건을 예방할 수 있습니다. 이 데이터는 간단한 사실을 말해줍니다: <b>시간을 효율적으로 사용하고, 표면을 인지한 손 씻기는 생명을 구합니다</b>.</p>
    </div>
  </div>
</section>

<!-- ───── 데이터 및 개인정보 처리 ───── -->
<section id="dataprivacy" class="mb-7">
  <h3 class="font-weight-bold text-center mb-4">연구 데이터 처리 및 개인정보 보호</h3>
  <ul class="list-group list-group-flush col-lg-8 mx-auto">
    <li class="list-group-item"><b>수집 항목</b> : 비디오 스트림, UV 이미지, 마찰 횟수, 참여자 ID(해시 처리), 타임스탬프.</li>
    <li class="list-group-item"><b>저장 및 암호화</b> : 저장 시 AES-256 암호화 적용, 접근은 역할 기반 VPN을 통해서만 가능.</li>
    <li class="list-group-item"><b>보존 정책</b> : 원본 영상은 3년 보관 후 폐기, 익명화된 데이터는 과학적 목적을 위해 무기한 보관.</li>
    <li class="list-group-item"><b>활용 목적</b> : 알고리즘 학습, 학술지 논문 발표, 교육용 대시보드에 사용. 상업적 재판매는 없음.</li>
  </ul>
</section>

    </div>
  </div>

  <!-- ★ 푸터 -->
  <DefaultFooter />
</template>


<style scoped>
.uniform-img {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: contain;
  padding: 0.5rem; /* 이미지와 카드 경계 간 여백 */
  background-color: #fff;
}


.list-group-item:hover {
  background-color: rgba(0, 0, 0, 0.03);
}
</style>
