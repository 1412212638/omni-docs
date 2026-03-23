<script setup lang="ts">
const props = withDefaults(defineProps<{ embedUrl?: string }>(), {
  embedUrl: 'https://omnirouters.apifox.cn/'
})
</script>

<template>
  <div class="embed-shell">
    <iframe
      class="embed-frame"
      :src="props.embedUrl"
      title="OmniRouters Apifox Documentation"
      loading="eager"
      referrerpolicy="strict-origin-when-cross-origin"
      allow="clipboard-read; clipboard-write"
    />
  </div>
</template>
