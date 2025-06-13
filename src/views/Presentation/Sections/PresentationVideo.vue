<script setup>
import { computed } from "vue";

// 외부에서 옵션을 받기 위한 props를 정의합니다.
const props = defineProps({
  videoId: {
    type: String,
    required: true,
  },
  autoplay: {
    type: Boolean,
    default: false,
  },
  mute: {
    type: Boolean,
    default: false,
  },
  loop: {
    type: Boolean,
    default: false,
  },
});

// props 값에 따라 YouTube URL을 동적으로 생성합니다.
const videoUrl = computed(() => {
  let url = `https://www.youtube.com/embed/${props.videoId}`;
  const params = [];

  if (props.autoplay) {
    params.push("autoplay=1");
    if (!props.mute) {
      params.push("mute=1");
    }
  }
  if (props.mute) {
    params.push("mute=1");
  }
  if (props.loop) {
    params.push("loop=1");
    params.push(`playlist=${props.videoId}`);
  }

  if (params.length > 0) {
    url += `?${params.join("&")}`;
  }

  return url;
});
</script>

<template>
  <div class="container mt-sm-5">
    <div class="page-header py-4 my-sm-3 mb-3 border-radius-xl">
      <div class="video-responsive-wrapper">
        <iframe
          class="video-responsive-iframe"
          :src="videoUrl"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  </div>
</template>

<style scoped>
.video-responsive-wrapper {
  position: relative;
  overflow: hidden;
  width: 100%;
  padding-top: 56.25%; /* 16:9 비율 */
  border-radius: 1rem;
}

.video-responsive-iframe {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
}

.page-header {
  background-image: none !important;
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}
</style>