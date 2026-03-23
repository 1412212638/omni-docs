<script setup lang="ts">
import { ref } from 'vue'

const props = withDefaults(defineProps<{ embedUrl?: string }>(), {
  embedUrl: 'https://omnirouters.apifox.cn/'
})

const isLoaded = ref(false)
</script>

<template>
  <div class="embed-shell">
    <div class="embed-frame-wrap">
      <div class="embed-actions">
        <a class="embed-link" :href="props.embedUrl" target="_blank" rel="noreferrer">
          新窗口打开
        </a>
      </div>
      <div v-if="!isLoaded" class="embed-loading">正在加载 Apifox 文档...</div>
      <iframe
        class="embed-frame"
        :class="{ 'is-visible': isLoaded }"
        :src="props.embedUrl"
        title="OmniRouters Apifox Documentation"
        loading="eager"
        referrerpolicy="strict-origin-when-cross-origin"
        allow="clipboard-read; clipboard-write"
        @load="isLoaded = true"
      />
    </div>
  </div>
</template>
