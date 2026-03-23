<script setup lang="ts">
import { onMounted, ref } from 'vue'

declare global {
  interface Window {
    Scalar?: {
      createApiReference: (
        selector: string | HTMLElement,
        configuration: Record<string, unknown>
      ) => void
    }
  }
}

const props = withDefaults(defineProps<{ specUrl?: string }>(), {
  specUrl: '/openapi.yaml'
})

const container = ref<HTMLElement | null>(null)
const errorMessage = ref('')

const scalarCustomCss = `
.dark-mode {
  --scalar-color-accent: #ff5db1;
  --scalar-color-1: rgba(255, 255, 255, 0.96);
  --scalar-color-2: rgba(255, 255, 255, 0.72);
  --scalar-color-3: rgba(255, 255, 255, 0.52);
  --scalar-background-1: #0b0d12;
  --scalar-background-2: #12151d;
  --scalar-background-3: #171b24;
  --scalar-background-accent: rgba(255, 93, 177, 0.12);
  --scalar-border-color: rgba(255, 255, 255, 0.08);
}

.dark-mode .sidebar {
  --scalar-sidebar-background-1: #0f1218;
  --scalar-sidebar-color-1: rgba(255, 255, 255, 0.92);
  --scalar-sidebar-color-2: rgba(255, 255, 255, 0.58);
  --scalar-sidebar-color-active: #ffffff;
  --scalar-sidebar-border-color: rgba(255, 255, 255, 0.06);
  --scalar-sidebar-search-background: rgba(255, 255, 255, 0.04);
  --scalar-sidebar-search-border-color: rgba(255, 255, 255, 0.08);
  --scalar-sidebar-search-color: rgba(255, 255, 255, 0.6);
  --scalar-sidebar-item-hover-background: rgba(255, 255, 255, 0.04);
  --scalar-sidebar-item-active-background: linear-gradient(90deg, rgba(255, 93, 177, 0.18), rgba(255, 93, 177, 0.02));
}

.dark-mode .references-rendered {
  background:
    radial-gradient(circle at top left, rgba(255, 93, 177, 0.10), transparent 28%),
    radial-gradient(circle at top right, rgba(90, 200, 250, 0.10), transparent 22%),
    #0b0d12;
}

.dark-mode .reference-section {
  backdrop-filter: blur(8px);
}

.dark-mode .download-button,
.dark-mode .scalar-button-1,
.dark-mode .scalar-button-c2 {
  border-radius: 12px;
}
`

function loadScalar() {
  return new Promise<void>((resolve, reject) => {
    if (window.Scalar?.createApiReference) {
      resolve()
      return
    }

    const existing = document.querySelector<HTMLScriptElement>('script[data-scalar-api-reference]')
    if (existing) {
      existing.addEventListener('load', () => resolve(), { once: true })
      existing.addEventListener('error', () => reject(new Error('Failed to load Scalar')), {
        once: true
      })
      return
    }

    const script = document.createElement('script')
    script.src = 'https://cdn.jsdelivr.net/npm/@scalar/api-reference'
    script.async = true
    script.dataset.scalarApiReference = 'true'
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('Failed to load Scalar'))
    document.head.appendChild(script)
  })
}

onMounted(async () => {
  try {
    await loadScalar()
    if (!container.value || !window.Scalar?.createApiReference) {
      return
    }

    container.value.innerHTML = ''
    window.Scalar.createApiReference('#scalar-api-reference', {
      url: props.specUrl,
      theme: 'purple',
      layout: 'modern',
      darkMode: true,
      forceDarkModeState: 'dark',
      showSidebar: true,
      showDeveloperTools: 'never',
      hideDarkModeToggle: true,
      defaultOpenFirstTag: true,
      orderRequiredPropertiesFirst: true,
      documentDownloadType: 'direct',
      withDefaultFonts: true,
      customCss: scalarCustomCss,
      metaData: {
        title: 'OmniRouters API Reference',
        description: 'Interactive API reference for OmniRouters'
      }
    })
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Failed to load API reference'
  }
})
</script>

<template>
  <div class="scalar-shell">
    <div v-if="errorMessage" class="openapi-placeholder">
      API reference failed to load: {{ errorMessage }}
    </div>
    <div v-else id="scalar-api-reference" ref="container" class="scalar-container">
      <div class="openapi-placeholder">Loading API reference...</div>
    </div>
  </div>
</template>
