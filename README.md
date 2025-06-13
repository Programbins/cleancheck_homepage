-----

# CleanCheck 홈페이지 🌐

> **저장소:** [`Programbins/cleancheck_homepage`](https://www.google.com/search?q=%5Bhttps://github.com/Programbins/cleancheck_homepage%5D\(https://github.com/Programbins/cleancheck_homepage\))  
> **목적:** **CleanCheck** (핸드워시 AI 평가 도구) 홍보·소개용 정적 웹사이트  
> **라이브 주소:** [https://cleancheck.org](https://cleancheck.org)  
> **핵심 AI 저장소:** [`chanwoopark11/CleanCheck`](https://www.google.com/search?q=%5Bhttps://github.com/chanwoopark11/CleanCheck%5D\(https://github.com/chanwoopark11/CleanCheck\))

CleanCheck는 손 씻기 과정에서 손의 모든 부위가 충분히 세정됐는지 실시간으로 확인해 주는 AI 서비스입니다.  
본 사이트는 **Vue 3 + Vite** 기반 단일 페이지 애플리케이션(SPA)이며 Creative-Tim의 **Vue Material Kit** 템플릿을 활용해 제작됐습니다.

| 섹션 | 주요 내용 |
|------|-----------|
| **실시간 데모** | YOLO v8 표면 커버리지 & MediaPipe 동작 추적 GIF |
| **UV 실험 결과** | 실험 과정 사진 + 데이터 테이블 |
| **포스터 & 발표 영상** | 학회용 포스터 PDF와 3분 발표 영상 |
| **소스 코드 바로가기** | AI 엔진 저장소 [`chanwoopark11/CleanCheck`](https://www.google.com/search?q=%5Bhttps://github.com/chanwoopark11/CleanCheck%5D\(https://github.com/chanwoopark11/CleanCheck\)) |

-----

## ✨ 특징

  - **반응형 디자인** – 모바일·데스크톱 모두 최적화, 다크 모드 지원
  - **순수 프런트엔드** – 정적 호스팅만으로 서비스 가능 (Netlify, Cloudflare Pages, Nginx 등)
  - **쉬운 테마 변경** – Vue Material Kit 컴포넌트 + SCSS 변수
  - **CI/CD 친화적** – `/dist` 정적 파일 한 번으로 배포 완료

-----

## 🛠 기술 스택

| 레이어 | 사용 기술 |
|--------|-----------|
| 프런트엔드 | Vue 3, Vite |
| UI 킷 | Creative-Tim Vue Material Kit v1.0.2 |
| 애니메이션 | Animate.css + 커스텀 CSS |
| 개발 도구 | ESLint, Prettier, Vitest |
| 배포 | 정적 호스팅 (Nginx/Caddy/Cloudflare 등) |

-----

## 🚀 빠른 시작

```bash
# 1. 클론
git clone https://github.com/Programbins/cleancheck_homepage.git
cd cleancheck_homepage

# 2. 의존성 설치 (Node 18+ 권장)
npm install   # yarn / pnpm도 가능

# 3. 개발 서버 실행
npm run dev   # http://localhost:5173

# 4. 프로덕션 빌드
npm run build     # 결과물은 /dist
npm run preview   # 로컬 미리보기 (선택)
```

### Docker / Unraid 예시

```bash
docker build -t cleancheck_homepage .
docker run -d --name cleancheck_site -p 80:80 cleancheck_homepage
```

alpine-nginx 베이스라 이미지 크기가 50 MB 이하입니다.  
Unraid에서는 새 컨테이너를 만들 때 동일 이미지를 지정하고 포트 80(HTTPS 사용 시 443)만 매핑하면 됩니다.

-----

## 📂 프로젝트 구조

```
├─ public/               # 정적 자산 (favicon, poster.pdf, video.mp4 등)
├─ src/
│  ├─ assets/img/        # 데모 GIF, UV 실험 사진
│  ├─ components/        # 커스텀 Vue Material Kit 래퍼
│  ├─ layouts/           # 네브바, 푸터
│  └─ views/             # Home, Demo, Results, About 등
├─ vite.config.js
└─ Dockerfile
```

-----

## 🤝 기여 방법

1.  저장소 포크 후 기능 브랜치를 만듭니다.
2.  `npm run lint`로 코드 스타일을 맞춥니다.
3.  스크린샷·설명을 포함해 PR을 제출해주세요.
4.  버그 제보·기능 제안은 Issues 탭을 이용해 주세요.

CleanCheck를 다른 프로젝트에 연동하고 싶다면 Discussions에서 의견을 나눠주세요\!

-----

## 📜 라이선스

  * 홈페이지 코드 : MIT License (파일 LICENSE 참조)
  * CleanCheck AI 모델 : `chanwoopark11/CleanCheck`의 라이선스 규정 준수

-----

## 🙏 감사의 말

  * Creative-Tim – Vue Material Kit
  * Ultralytics YOLOv8, Google MediaPipe – 비전 모델
  * CleanCheck 개발·테스트에 참여해 주신 모든 분들께 감사합니다.

-----

## 💡 아이디어가 있거나 문제를 발견하셨나요?

Issue를 남기거나 Discussions에 글을 남겨 주세요. 클린한 손 씻기를 함께 만들어갑시다\!

-----