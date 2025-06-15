<!-- src/components/layout/MainNavbar.vue -->
<script setup>
import { RouterLink } from "vue-router";
import { ref, watch } from "vue";
import { useWindowsWidth } from "@/assets/js/useWindowsWidth";

/* 화살표 */
import ArrowDark  from "@/assets/img/down-arrow-dark.svg";
import ArrowWhite from "@/assets/img/down-arrow-white.svg";

/* props */
const props = defineProps({
  transparent: { type: Boolean, default: false },
  light:       { type: Boolean, default: false },
  dark:        { type: Boolean, default: false },
  sticky:      { type: Boolean, default: false },
  darkText:    { type: Boolean, default: false },
});

/* 글자색·아이콘 */
const textDark = ref(props.darkText);
const { type } = useWindowsWidth();
watch(() => type.value, v => (textDark.value = v === "mobile"));

const txt   = () => (props.transparent ? (textDark.value ? "text-dark" : "text-white") : "text-dark");
const arrow = () => (props.transparent && !textDark.value ? ArrowWhite : ArrowDark);

/* 모바일 메뉴 닫기 */
function closeNavbar() {
  document.getElementById("navigation")?.classList.remove("show");
  const t = document.querySelector(".navbar-toggler");
  if (t) { t.setAttribute("aria-expanded", "false"); t.classList.remove("toggled"); }
}
</script>

<template>
  <nav
    class="navbar navbar-expand-lg top-0"
    :class="{
      'z-index-3 w-100 shadow-none navbar-transparent position-absolute my-3': props.transparent,
      'my-3 blur border-radius-lg z-index-3 shadow py-2 start-0 end-0 mx-4 position-absolute mt-4': props.sticky && !props.transparent,
      'navbar-light bg-white py-3': props.light,
      'navbar-dark bg-gradient-dark z-index-3 py-3': props.dark
    }"
  >
    <div :class="props.transparent || props.light || props.dark ? 'container' : 'container-fluid px-0'">
      <!-- 브랜드 -->
      <RouterLink :to="{ name: 'presentation' }" class="navbar-brand font-weight-bolder ms-sm-3" :class="txt()">Clean&nbsp;Check</RouterLink>

      <!-- 햄버거 -->
      <button
        class="navbar-toggler shadow-none ms-2"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navigation"
        aria-controls="navigation"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon mt-2">
          <span class="navbar-toggler-bar bar1"></span>
          <span class="navbar-toggler-bar bar2"></span>
          <span class="navbar-toggler-bar bar3"></span>
        </span>
      </button>

      <!-- 메뉴 -->
      <div class="collapse navbar-collapse w-100 pt-3 pb-2 py-lg-0" id="navigation">
        <ul class="navbar-nav navbar-nav-hover ms-auto">
          <!-- 메인 -->
          <li class="nav-item mx-2">
            <RouterLink :to="{ name: 'presentation' }" class="nav-link ps-2 d-flex align-items-center" :class="txt()" @click="closeNavbar">
              <i class="material-icons opacity-6 me-2 text-md" :class="txt()">home</i> 메인
            </RouterLink>
          </li>

          <!-- 포스터 -->
          <li class="nav-item mx-2">
            <RouterLink :to="{ name: 'poster' }" class="nav-link ps-2 d-flex align-items-center" :class="txt()" @click="closeNavbar">
              <i class="material-icons opacity-6 me-2 text-md" :class="txt()">image</i> 포스터
            </RouterLink>
          </li>

          <!-- 연구 -->
          <li class="nav-item dropdown dropdown-hover mx-2">
            <a class="nav-link ps-2 d-flex align-items-center cursor-pointer" :class="txt()" data-bs-toggle="dropdown">
              <i class="material-icons opacity-6 me-2 text-md" :class="txt()">science</i>
              연구
              <img :src="arrow()" class="arrow ms-2 d-lg-block d-none" />
              <img :src="arrow()" class="arrow ms-1 d-lg-none d-block ms-auto" />
            </a>
            <ul class="dropdown-menu">
              <li>
                <RouterLink class="dropdown-item" :to="{ name: 'uv-experiment' }" @click="closeNavbar">
                  UV 실험
                </RouterLink>
              </li>
              <li>
                <RouterLink class="dropdown-item" :to="{ name: 'research-hw' }" @click="closeNavbar">
                  손 씻기 연구
                </RouterLink>
              </li>
            </ul>
          </li>

          <!-- 기술 -->
          <li class="nav-item dropdown dropdown-hover mx-2">
            <a class="nav-link ps-2 d-flex align-items-center cursor-pointer" :class="txt()" data-bs-toggle="dropdown">
              <i class="material-icons opacity-6 me-2 text-md" :class="txt()">build</i>
              기술
              <img :src="arrow()" class="arrow ms-2 d-lg-block d-none" />
              <img :src="arrow()" class="arrow ms-1 d-lg-none d-block ms-auto" />
            </a>
            <ul class="dropdown-menu">
              <li>
                <RouterLink class="dropdown-item" :to="{ name: 'tech-mediapipe' }" @click="closeNavbar">
                  MediaPipe 설명
                </RouterLink>
              </li>
              <li>
                <RouterLink class="dropdown-item" :to="{ name: 'tech-yolo' }" @click="closeNavbar">
                  YOLO 설명
                </RouterLink>
              </li>
            </ul>
          </li>

          <!-- 손씻기 검사 -->
          <li class="nav-item dropdown dropdown-hover mx-2">
            <a class="nav-link ps-2 d-flex align-items-center cursor-pointer" :class="txt()" data-bs-toggle="dropdown">
              <i class="material-icons opacity-6 me-2 text-md" :class="txt()">clean_hands</i>
              손씻기&nbsp;검사
              <img :src="arrow()" class="arrow ms-2 d-lg-block d-none" />
              <img :src="arrow()" class="arrow ms-1 d-lg-none d-block ms-auto" />
            </a>
            <ul class="dropdown-menu">
              <li>
                <RouterLink class="dropdown-item" :to="{ name: 'handwashing-check' }" @click="closeNavbar">
                  자율&nbsp;손&nbsp;씻기
                </RouterLink>
              </li>
              <li>
                <RouterLink class="dropdown-item" :to="{ name: 'yoloCheck' }" @click="closeNavbar">
                  6단계&nbsp;손&nbsp;씻기
                </RouterLink>
              </li>
            </ul>
          </li>

          <!-- GitHub -->
          <li class="nav-item ms-2">
            <a href="https://github.com/chanwoopark11/CleanCheck" target="_blank" class="nav-link d-flex align-items-center" :class="txt()" @click="closeNavbar">
              <svg width="20" height="20" viewBox="0 0 24 24" class="me-2 opacity-6"
                   :fill="props.transparent && !textDark ? '#fff' : '#344767'">
                <path d="M12 1.27a11 11 0 0 0-3.48 21.46c.55.09.73-.28.73-.55v-1.84c-3.03.64-3.67-1.46-3.67-1.46-.55-1.29-1.28-1.65-1.28-1.65-.92-.65.1-.65.1-.65 1.1 0 1.73 1.1 1.73 1.1.92 1.65 2.57 1.2 3.21.92a2 2 0 0 1 .64-1.47c-2.47-.27-5.04-1.19-5.04-5.5 0-1.1.46-2.1 1.2-2.84a3.76 3.76 0 0 1 0-2.93s.91-.28 3.11 1.1c1.8-.49 3.7-.49 5.5 0 2.1-1.38 3.02-1.1 3.02-1.1a3.76 3.76 0 0 1 0 2.93c.83.74 1.2 1.74 1.2 2.94 0 4.21-2.57 5.13-5.04 5.4.45.37.82.92.82 2.02v3.03c0 .27.1.64.73.55A11 11 0 0 0 12 1.27z"/>
              </svg>
              Github
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>
/* 모바일 드롭다운 간격 + 스크롤바 숨김 */
@media (max-width: 991.98px) {
  .navbar-nav .dropdown-menu {
    margin-top: 0 !important;
    padding: 0.25rem 0 !important;
    overflow-y: auto;
    -ms-overflow-style: none;  /* IE/Edge */
    scrollbar-width: none;     /* Firefox */
  }
  .navbar-nav .dropdown-menu::-webkit-scrollbar { display: none; }
  .navbar-nav .dropdown-menu .dropdown-item { margin: 0 !important; }
}

/* 햄버거 테두리 제거 */
.navbar-toggler { border: none; }
.navbar-toggler .navbar-toggler-icon { background: none; box-shadow: none; }
</style>
