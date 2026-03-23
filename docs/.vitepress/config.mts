import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: 'Omni Docs',
  description: '使用 VitePress 构建的文档站',
  base: '/omni-docs/',
  lastUpdated: true,
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '开始', link: '/guide/getting-started' },
      { text: '结构', link: '/guide/structure' }
    ],
    sidebar: [
      {
        text: '指南',
        items: [
          { text: '快速开始', link: '/guide/getting-started' },
          { text: '项目结构', link: '/guide/structure' }
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/1412212638/omni-docs' }
    ],
    footer: {
      message: 'Built with VitePress',
      copyright: 'Copyright © 2026 Omni Docs'
    },
    search: {
      provider: 'local'
    }
  }
})
