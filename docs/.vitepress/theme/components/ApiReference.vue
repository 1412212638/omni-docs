<script setup lang="ts">
import { onMounted, ref } from 'vue'

declare global {
  interface Window {
    Redoc?: {
      init: (
        specOrSpecUrl: string,
        options?: Record<string, unknown>,
        element?: HTMLElement | null
      ) => void
    }
  }
}

const props = withDefaults(defineProps<{ specUrl?: string }>(), {
  specUrl: '/openapi.yaml'
})

const container = ref<HTMLElement | null>(null)
const errorMessage = ref('')

function loadRedoc() {
  return new Promise<void>((resolve, reject) => {
    if (window.Redoc) {
      resolve()
      return
    }

    const existing = document.querySelector<HTMLScriptElement>('script[data-redoc]')
    if (existing) {
      existing.addEventListener('load', () => resolve(), { once: true })
      existing.addEventListener('error', () => reject(new Error('Failed to load Redoc')), {
        once: true
      })
      return
    }

    const script = document.createElement('script')
    script.src = 'https://cdn.redoc.ly/redoc/latest/bundles/redoc.standalone.js'
    script.async = true
    script.dataset.redoc = 'true'
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('Failed to load Redoc'))
    document.head.appendChild(script)
  })
}

onMounted(async () => {
  try {
    await loadRedoc()
    if (!container.value || !window.Redoc) {
      return
    }

    container.value.innerHTML = ''
    window.Redoc.init(
      props.specUrl,
      {
        hideDownloadButton: false,
        requiredPropsFirst: true,
        pathInMiddlePanel: true,
        expandResponses: '200,201',
        theme: {
          colors: {
            primary: {
              main: '#0f766e'
            }
          }
        }
      },
      container.value
    )
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Failed to load API reference'
  }
})
</script>

<template>
  <div class="openapi-shell">
    <div v-if="errorMessage" class="openapi-placeholder">
      API reference failed to load: {{ errorMessage }}
    </div>
    <div v-else ref="container" class="openapi-container">
      <div class="openapi-placeholder">Loading API reference...</div>
    </div>
  </div>
</template>
