/*
=========================================================
* Vue Clean Check - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/vue-material-kit-pro
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// Image Assets
// SECTION 1: YOLOv8
import dataset from "@/assets/img/cleancheck/dataset_labeling.png"; // 예시 이미지: 6단계 데이터셋
import map50 from "@/assets/img/cleancheck/map50.png"; // 예시 이미지: 노이즈 억제 개념도
import yolo_last from "@/assets/img/cleancheck/yolo_last.png"; // 예시 이미지: 추가 세척 경고 화면

// SECTION 2: MediaPipe
import holistics from "@/assets/img/cleancheck/holistics.png"; // 예시 이미지: Hands vs Holistic 비교
import filter from "@/assets/img/cleancheck/filter.png"; // 예시 이미지: 보정 알고리즘 전/후
import mediapipelast from "@/assets/img/cleancheck/mediapipelast.png"; // 예시 이미지: 세정 영역 시각화 결과

// SECTION 3: MediaPipe
import desk_app from "@/assets/img/cleancheck/desk_app.png"; // 예시 이미지: Hands vs Holistic 비교
import web_app from "@/assets/img/cleancheck/web_app.png"; // 예시 이미지: 보정 알고리즘 전/후


/*
=========================================================
* Vue Clean Check - v1.0.0
=========================================================

* 이 파일은 존재하지 않는 로컬 이미지 참조로 인한 빌드 오류를 막기 위해
* 외부 URL 플레이스홀더 이미지를 사용하도록 수정되었습니다.
* 실제 이미지가 준비되면 이 URL들을 실제 파일 경로로 교체해주세요.
*/

export default [
  {
    heading: "정확한 동작 분석",
    description:
      "YOLOv8 모델을 통해 WHO가 권장하는 6단계 손씻기 동작을 99.2%의 정확도로 자동 인식합니다.",
    items: [
      {
        image: dataset,
        title: "대규모 자체 데이터셋",
        subtitle: "5,816장의 이미지 직접 촬영 및 라벨링 100 에폭 학습",
        route: "presentation",
        pro: false
      },
      {
        image: map50,
        title: "mAP50 기준 99.2%",
        subtitle: "정확도 평가 및 그에따른 그래프 생성 및 비교",
        route: "presentation",
        pro: false
      },
      {
        image: yolo_last,
        title: "실시간 평가",
        subtitle: "여러 평가 요소 결합",
        route: "presentation",
        pro: false
      }
    ]
  },
  {
    heading: "세정 영역 시각화",
    description:
      "MediaPipe Holistic과 독자적인 보정 알고리즘을 통해 손의 84개 키포인트를 추적하여 어떤 부위를 얼마나 씻었는지 색칠해 보여줍니다.",
    items: [
      {
        image: holistics,
        title: "끊김 없는 손 추적",
        subtitle: "손가락이 가려져도 안정적인 Holistic 채택",
        route: "presentation",
        pro: false
      },
      {
        image: filter,
        title: "3단계 보정 알고리즘",
        subtitle: "Kalman 필터, Wrist-Δ 보간 등으로 정확도 향상",
        route: "presentation",
        pro: false
      },
      {
        image: mediapipelast,
        title: "세정 영역 시각화",
        subtitle: "세척 완료된 부위와 부족한 부위를 직관적으로 표시",
        route: "presentation",
        pro: false
      }
    ]
  },
  {
    heading: "다양한 플랫폼",
    description:
      "여러가지 플랫폼에서 동작할 수 있도록 경량화 및 최적화를 통하여 여러 목적을 가지고 개발 및 어린이 교육용, 병원 전용 등 다양한 시나리오에 맞춰 UI/UX 최적화",
    items: [
      {
        image: desk_app,
        title: "데스크톱 앱",
        subtitle: "기본적으로 Python 기반 측정",
        route: "presentation",
        pro: false
      },
      {
        image: web_app,
        title: "웹 앱",
        subtitle: "체험용 간단한 기능을 탑재",
        route: "presentation",
        pro: false
      },
      {
        image: "https://placehold.co/500x340/63B3ED/fff?text=Comming Soon",
        title: "모바일 앱",
        subtitle: "Flutter를 사용한 모바일 기기 앱",
        route: "presentation",
        pro: false
      }
    ]
  }
];