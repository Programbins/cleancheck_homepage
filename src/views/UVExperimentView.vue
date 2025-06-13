<script setup>
import { onMounted, onUnmounted } from "vue";

// example components
import NavbarDefault from "../examples/navbars/NavbarDefault.vue";
import DefaultFooter from "../examples/footers/FooterDefault.vue";
import Header from "../examples/Header.vue";

// images
import vueMkHeader from "@/assets/img/vue-mk-header.jpg";
import guidePage1 from "@/assets/img/cleancheck/protocol_1.jpg";
import guidePage2 from "@/assets/img/cleancheck/protocol_2.jpg";

// hooks
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
          <div class="col-lg-8 text-center mx-auto position-relative">
            <h1
              class="text-white pt-3 mt-n5 me-2"
              :style="{ display: 'inline-block' }"
            >
              UV 형광 실험
            </h1>
            <p class="lead text-white px-5 mt-3" :style="{ fontWeight: '500' }">
              손 씻기 전후의 세정 효과를 UV 램프를 통해 시각적으로 분석하고,
              올바른 손 씻기 습관의 중요성을 확인합니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  </Header>

  <div class="card card-body blur shadow-blur mx-3 mx-md-4 mt-n6">
    <div class="container py-5">
      <div class="row mb-5 text-center">
        <div class="col-lg-8 mx-auto">
          <h3 class="font-weight-bold">Why UV Test?</h3>
          <p class="text-muted">
            우리는 매일 손을 씻지만, 얼마나 '제대로' 씻고 있을까요? 눈에 보이지 않는 세균이나 바이러스는 대충 씻는 습관 속에서 손 곳곳에 남아있을 수 있습니다. UV 형광 실험은 눈에 보이지 않던 세균을 형광 물질로 대체하여, 손 씻기 후에도 남아있는 오염 부위를 눈으로 직접 확인하게 해주는 가장 효과적인 시각 교육 방법입니다. 자신의 손 씻기 습관을 객관적으로 점검하고 개선할 수 있습니다.
          </p>
        </div>
      </div>

      <hr class="my-5" />

      <div class="row mb-5">
        <div class="col-12 text-center">
          <h3 class="font-weight-bold mb-4">실험 장비</h3>
          <div class="row">
            <div class="col-md-4 mb-4">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">UV 손소독제</h5>
                  <p class="card-text">UV측정을 위한 소독제</p>
                </div>
              </div>
            </div>
            <div class="col-md-4 mb-4">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">태블릿</h5>
                  <p class="card-text">영상 녹화 및 안내</p>
                </div>
              </div>
            </div>
            <div class="col-md-4 mb-4">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">UV 박스</h5>
                  <p class="card-text">세정 결과 확인</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr class="my-5" />

    <div class="row mb-5">
      <div class="col-lg-10 mx-auto">
        <div class="card shadow border-0 p-4 bg-white">
          <h3 class="font-weight-bold text-center mb-5">실험 절차</h3>
          <ol class="list-group list-group-numbered">
            <li class="list-group-item border-0 ps-3"><b>테스트 일시 기록:</b> 기기 하단 A4용지에 테스트 일시와 이름을 기재합니다.</li>
            <li class="list-group-item border-0 ps-3"><b>RFID 카드 인식:</b> 카드를 기기 위 RFID 인식 영역에 태그합니다.</li>
            <li class="list-group-item border-0 ps-3"><b>영상 녹화 시작:</b> 태블릿 카메라를 켜고 얼굴과 상체가 모두 나오도록 위치를 조정한 뒤 녹화 버튼을 누릅니다.</li>
            <li class="list-group-item border-0 ps-3"><b>손소독제 도포:</b> 파란색 통의 손소독제를 2회 깊숙이 눌러 손에 충분히 확보합니다.</li>
            <li class="list-group-item border-0 ps-3"><b>손 씻기 동작 수행:</b> 안내된 6단계 동작, 자유 손 씻기, 또는 지정된 동작 중 하나를 30초간 수행합니다.</li>
            <li class="list-group-item border-0 ps-3"><b>영상 녹화 정지:</b> 동작이 끝나면 녹화를 정지하고 저장합니다.</li>
            <li class="list-group-item border-0 ps-3"><b>결과 확인:</b> UV 기기 화면의 안내에 따라 손을 넣어 결과를 확인합니다.</li>
            <li class="list-group-item border-0 ps-3"><b>형광 물질 세척:</b> 기름과 비누를 이용해 손에 남은 형광 물질을 깨끗이 씻어냅니다.</li>
          </ol>

          <img
            src="@/assets/img/cleancheck/uv_graph.png"
            class="img-fluid mt-4 border-radius-lg"
            alt="실험 절차 요약 이미지"
          />
          </div>
      </div>
    </div>

      <div class="row mb-5">
        <div class="col-lg-8 mx-auto text-center">
          <h3 class="font-weight-bold mb-4">손씻기 프로토콜 영상</h3>
          <div class="ratio ratio-16x9">
            <iframe
              src="https://www.youtube.com/embed/JPkMxK59nXU"
              title="UV 촬영 방법"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
        </div>
      </div>

      <hr class="my-5" />

      <div class="row mb-5">
        <div class="col-lg-10 mx-auto text-center">
          <h3 class="font-weight-bold mb-4">실험 안내문</h3>
          <div class="row">
            <div class="col-md-6 mb-4">
              <img
                :src="guidePage1"
                class="img-fluid border-radius-lg shadow-lg"
                alt="안내문 1페이지"
              />
            </div>
            <div class="col-md-6 mb-4">
              <img
                :src="guidePage2"
                class="img-fluid border-radius-lg shadow-lg"
                alt="안내문 2페이지"
              />
            </div>
          </div>
          <a
            href="/files/protocol.pdf"
            download="손씻기_실험_안내문.pdf"
            class="btn btn-success mt-4"
          >
            안내문 원본(PDF) 다운로드
          </a>
        </div>
      </div>

      <hr class="my-5" />

      <div class="row mb-5">
      <div class="col-12 text-center">
        <h3 class="font-weight-bold mb-4">결과 요약</h3>
        <p class="text-muted">각 손씻기 방식에 따른 실험 결과를 비교 분석합니다.</p>

        <hr class="my-5" />
        <h4 class="font-weight-bold mt-4 mb-4">WHO 6단계 손씻기 결과</h4>
        <div class="row">
          <div class="col-md-6 mb-4">
            <img src="@/assets/img/cleancheck/who6_1.png" class="img-fluid border-radius-lg shadow" alt="WHO 6단계 결과 1">
          </div>
          <div class="col-md-6 mb-4">
            <img src="@/assets/img/cleancheck/who6_2.png" class="img-fluid border-radius-lg shadow" alt="WHO 6단계 결과 2">
          </div>
        </div>

        <hr class="my-5" />
        <h4 class="font-weight-bold mt-4 mb-4">자유 손씻기 결과</h4>
        <div class="row">
          <div class="col-md-6 mb-4">
            <img src="@/assets/img/cleancheck/free_1.png" class="img-fluid border-radius-lg shadow" alt="자유 손씻기 결과 1">
          </div>
          <div class="col-md-6 mb-4">
            <img src="@/assets/img/cleancheck/free_2.png" class="img-fluid border-radius-lg shadow" alt="자유 손씻기 결과 2">
          </div>
        </div>

        <hr class="my-5" />
        <h4 class="font-weight-bold mt-4 mb-4">지정 손씻기 결과</h4>
        <div class="row align-items-center">
          <div class="col-md-4 mb-4">
            <h5 class="text-muted mb-3">1단계</h5>
            <div class="row">
              <div class="col-12"><img src="@/assets/img/cleancheck/designation1_1.png" class="img-fluid border-radius-md shadow-sm" alt="지정 1단계 결과 1"></div>
            </div>
          </div>
          <div class="col-md-4 mb-4">
            <h5 class="text-muted mb-3">2단계</h5>
            <div class="row">
              <div class="col-12"><img src="@/assets/img/cleancheck/designation2_1.png" class="img-fluid border-radius-md shadow-sm" alt="지정 2단계 결과 1"></div>
            </div>
          </div>
          <div class="col-md-4 mb-4">
            <h5 class="text-muted mb-3">3단계</h5>
            <div class="row">
              <div class="col-12"><img src="@/assets/img/cleancheck/designation3_1.png" class="img-fluid border-radius-md shadow-sm" alt="지정 3단계 결과 1"></div>
            </div>
          </div>
        </div>

        <hr class="my-5" />
        <div class="row align-items-center">
          <div class="col-md-4 mb-4">
            <h5 class="text-muted mb-3">4단계</h5>
            <div class="row">
              <div class="col-12"><img src="@/assets/img/cleancheck/designation4_1.png" class="img-fluid border-radius-md shadow-sm" alt="지정 4단계 결과 1"></div>
            </div>
          </div>
          <div class="col-md-4 mb-4">
            <h5 class="text-muted mb-3">5단계</h5>
            <div class="row">
              <div class="col-12"><img src="@/assets/img/cleancheck/designation5_1.png" class="img-fluid border-radius-md shadow-sm" alt="지정 5단계 결과 1"></div>
            </div>
          </div>
          <div class="col-md-4 mb-4">
            <h5 class="text-muted mb-3">6단계</h5>
            <div class="row">
              <div class="col-12"><img src="@/assets/img/cleancheck/designation6_1.png" class="img-fluid border-radius-md shadow-sm" alt="지정 6단계 결과 1"></div>
            </div>
          </div>
        </div>

      </div>
    </div>

      <hr class="my-5" />

      <div class="row mb-5">
        <div class="col-lg-8 mx-auto">
          <h3 class="font-weight-bold text-center mb-4">데이터 활용 계획</h3>
          <p class="mt-4">
            <strong>1. AI 모델 학습 데이터 구축:</strong>
            수집된 영상과 UV 촬영 결과는 손 위생 평가 AI 모델을 학습시키기 위한 핵심 데이터로 사용됩니다. 객관적인 평가지표를 마련하기 위해 Ground Truth(GT) 데이터를 구축하는 데 활용됩니다.
          </p>
          <p class="mt-3">
            <strong>2. 모델 성능 검증 및 고도화:</strong>
            실측 데이터를 기반으로 AI 모델의 성능을 정밀하게 검증하고, 알고리즘 파라미터를 최적화하여 정확도를 높입니다. 이를 통해 사용자에게 실제로 부족한 부위를 추천하는 등 피드백 시스템을 고도화합니다.
          </p>
          <p class="mt-3">
            <strong>3. 손 위생 데이터 분석 및 시각화:</strong>
            참여자들의 데이터를 종합하여 손 부위별 평균 세정률을 히트맵으로 시각화하고, 반복 참여자의 개선도를 추적 분석하여 교육 효과를 검증합니다.
          </p>
          <p class="mt-3">
            <strong>4. 교육 콘텐츠 및 연구 자료 활용:</strong>
            분석된 결과는 효과적인 손 위생 교육 콘텐츠를 제작하거나, 손 위생 관련 연구 논문을 작성하는 데 중요한 기초 자료로 활용될 수 있습니다.
          </p>
        </div>
      </div>

            <hr class="my-5" />

      <div class="row mb-5">
        <div class="col-lg-8 mx-auto">
          <h3 class="font-weight-bold">데이터 & 개인정보 처리방침</h3>
          <p class="mt-3">
            <strong>수집 항목:</strong> 실험 참여자의 이름, RFID 카드 정보, 손 씻기 영상, UV 촬영 결과 데이터
          </p>
          <p>
            <strong>보존 기간:</strong> 수집된 모든 데이터는 연구 종료 후 3년간 보관되며, 이후 안전하게 파기됩니다. 데이터는 개인을 식별할 수 없는 형태로 통계 및 연구 분석 목적으로만 사용됩니다.
          </p>
        </div>
      </div>
      </div>
  </div>

  <DefaultFooter />
</template>

<style scoped>
/* Optional extra tweak so procedure list items have a subtle background on hover */
.list-group-item:hover {
  background-color: rgba(0, 0, 0, 0.03);
}
</style>