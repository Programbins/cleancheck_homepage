CleanCheck 홈페이지 설명에서 AI 저장소와 홈페이지 저장소 링크를 바로 GitHub 저장소로 연결되도록 수정했습니다. 이제 구글 검색을 거치지 않고 바로 해당 페이지로 이동할 수 있습니다.

-----

# CleanCheck 홈페이지 🌐

> **AI 핵심 저장소:** [https://github.com/chanwoopark11/CleanCheck](https://github.com/chanwoopark11/CleanCheck)  
> **홈페이지 저장소:** [https://github.com/Programbins/cleancheck\_homepage](https://github.com/Programbins/cleancheck_homepage)  
> **라이브 주소:** [https://cleancheck.org](https://cleancheck.org)

CleanCheck는 손 씻기 과정에서 손의 모든 부위가 충분히 세정됐는지 실시간으로 확인해 주는 **AI 서비스**입니다. 현재 보고 계신 홈페이지는 **CleanCheck**를 홍보하고 소개하기 위해 만들어진 정적 웹사이트입니다.

**Vue 3**와 **Vite**를 기반으로 한 단일 페이지 애플리케이션(SPA)으로, Creative-Tim의 **Vue Material Kit** 템플릿을 활용하여 제작되었습니다.

-----

## 🌟 주요 섹션 둘러보기

| 섹션 | 주요 내용 |
|------|-----------|
| **실시간 데모** | YOLO v8 표면 커버리지 및 MediaPipe 동작 추적을 보여주는 GIF |
| **UV 실험 결과** | CleanCheck의 효과를 증명하는 실험 과정 사진과 데이터 테이블 |
| **포스터 & 발표 영상** | 학회 발표에 사용된 포스터 PDF와 3분 발표 영상 |
| **소스 코드 바로가기** | AI 엔진의 핵심이 담긴 저장소 [https://github.com/chanwoopark11/CleanCheck](https://github.com/chanwoopark11/CleanCheck)로 바로 연결 |

-----

## ✨ 홈페이지 특징

  * **반응형 디자인:** 모바일과 데스크톱 환경 모두에 최적화되어 있으며, **다크 모드**를 지원합니다.
  * **순수 프런트엔드:** 별도의 서버 없이 정적 호스팅(Netlify, Cloudflare Pages, Nginx 등)만으로 운영 가능합니다.
  * **쉬운 테마 변경:** Vue Material Kit 컴포넌트와 SCSS 변수를 통해 손쉽게 테마를 변경할 수 있습니다.
  * **CI/CD 친화적:** `/dist` 디렉토리의 정적 파일만으로 간단하게 배포할 수 있습니다.

-----

## 🛠 기술 스택

| 레이어 | 사용 기술 |
|--------|-----------|
| 프런트엔드 | **Vue 3**, **Vite** |
| UI 킷 | Creative-Tim **Vue Material Kit v1.0.2** |
| 애니메이션 | Animate.css + 커스텀 CSS |
| 개발 도구 | ESLint, Prettier, Vitest |
| 배포 | 정적 호스팅 (Nginx/Caddy/Cloudflare 등) |

-----

## 🚀 빠른 시작 가이드

프로젝트를 로컬에서 실행하거나 배포하는 방법은 매우 간단합니다.

```bash
# 1. 저장소 클론
git clone https://github.com/Programbins/cleancheck_homepage.git
cd cleancheck_homepage

# 2. 의존성 설치 (Node 18+ 권장)
npm install   # yarn 이나 pnpm 도 사용 가능합니다.

# 3. 개발 서버 실행
npm run dev   # 웹 브라우저에서 http://localhost:5173 으로 접속하세요.

# 4. 프로덕션 빌드
npm run build     # 빌드 결과물은 `/dist` 디렉토리에 생성됩니다.
npm run preview   # 로컬에서 빌드된 사이트를 미리 볼 수 있습니다 (선택 사항).
```

### Docker / Unraid 배포 예시

```bash
docker build -t cleancheck_homepage .
docker run -d --name cleancheck_site -p 80:80 cleancheck_homepage
```

이 이미지는 alpine-nginx를 기반으로 하여 **50MB 이하의 작은 크기**를 자랑합니다. Unraid 환경에서는 새 컨테이너 생성 시 동일 이미지를 지정하고 포트 80(HTTPS 사용 시 443)만 매핑하면 바로 사용할 수 있습니다.

-----

## 📂 프로젝트 구조

프로젝트의 주요 디렉토리 구조는 다음과 같습니다.

```
├─ public/               # 파비콘, 포스터 PDF, 동영상 등 정적 자산
├─ src/
│  ├─ assets/img/        # 데모 GIF, UV 실험 사진 등 이미지 자산
│  ├─ components/        # Vue Material Kit을 래핑한 커스텀 컴포넌트
│  ├─ layouts/           # 네비게이션 바, 푸터 등 레이아웃 관련 컴포넌트
│  └─ views/             # Home, Demo, Results, About 등 각 페이지 뷰 컴포넌트
├─ vite.config.js        # Vite 설정 파일
└─ Dockerfile            # Docker 이미지 빌드 파일
```

-----

## 🤝 기여 방법

CleanCheck 홈페이지 개선에 기여하고 싶으시다면 다음 단계를 따르세요.

1.  저장소를 포크(Fork)한 후 새로운 기능 브랜치를 생성합니다.
2.  `npm run lint` 명령어로 코드 스타일을 맞춰주세요.
3.  변경 사항에 대한 스크린샷과 설명을 포함하여 Pull Request(PR)를 제출합니다.
4.  버그를 발견했거나 새로운 기능을 제안하고 싶다면 Issues 탭을 이용해주세요.

CleanCheck를 다른 프로젝트에 연동하는 방법에 대한 아이디어가 있다면 Discussions에서 자유롭게 의견을 나눠주세요\!

-----

## 📜 라이선스

  * **홈페이지 코드:** MIT License (저장소 내 `LICENSE` 파일 참조)
  * **CleanCheck AI 모델:** [https://github.com/chanwoopark11/CleanCheck](https://github.com/chanwoopark11/CleanCheck) 저장소의 라이선스 규정을 따릅니다.

-----

## 🙏 감사의 말씀

  * **Creative-Tim** – Vue Material Kit 템플릿 제공
  * **Ultralytics YOLOv8, Google MediaPipe** – 뛰어난 비전 모델 제공
  * CleanCheck 개발 및 테스트에 참여해주신 모든 분들께 진심으로 감사드립니다.

-----

## 💡 아이디어나 문제가 있으신가요?

언제든지 Issue를 남기거나 Discussions에 글을 올려주세요. 함께 깨끗한 손 씻기 문화를 만들어 나갑시다\!