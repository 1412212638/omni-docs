import { defineConfig } from 'vitepress'

const socialLinks = [
  { icon: 'github', link: 'https://github.com/1412212638/omni-docs' }
]

const search = {
  provider: 'local' as const,
  options: {
    locales: {
      root: {
        translations: {
          button: {
            buttonText: '搜索',
            buttonAriaLabel: '搜索'
          },
          modal: {
            noResultsText: '没有结果',
            resetButtonTitle: '清除查询条件',
            footer: {
              selectText: '选择',
              selectKeyAriaLabel: '回车',
              navigateText: '切换',
              navigateUpKeyAriaLabel: '上箭头',
              navigateDownKeyAriaLabel: '下箭头',
              closeText: '关闭',
              closeKeyAriaLabel: 'esc'
            }
          }
        }
      },
      en: {
        translations: {
          button: {
            buttonText: 'Search',
            buttonAriaLabel: 'Search'
          }
        }
      }
    }
  }
}

export default defineConfig({
  title: 'Omni Docs',
  description: 'OmniRouters documentation',
  lang: 'zh-CN',
  base: '/',
  lastUpdated: true,
  head: [
    ['link', { rel: 'icon', href: '/logo.png' }]
  ],
  themeConfig: {
    logo: {
      src: '/logo.png',
      alt: 'OmniRouters Logo'
    },
    socialLinks,
    search
  },
  locales: {
    root: {
      label: '中文',
      lang: 'zh-CN',
      title: 'Omni Docs',
      description: '使用 VitePress 构建的文档站',
      themeConfig: {
        nav: [
          { text: '首页', link: '/' },
          { text: 'API', link: '/api/' },
          { text: '开始', link: '/guide/getting-started' },
          { text: '商务合作', link: '/guide/structure' }
        ],
        sidebar: [
          {
            text: '指南',
            items: [
              { text: '快速开始', link: '/guide/getting-started' },
              { text: '商务合作', link: '/guide/structure' }
            ]
          },
          {
            text: 'API',
            items: [
              { text: 'API 参考', link: '/api/' }
            ]
          }
        ],
        langMenuLabel: '切换语言',
        darkModeSwitchLabel: '主题',
        docFooter: {
          prev: '上一页',
          next: '下一页'
        },
        outline: {
          label: '本页内容'
        },
        lastUpdated: {
          text: '最后更新于'
        },
        footer: {
          message: 'Built with VitePress',
          copyright: 'Copyright © 2026 Omni Docs'
        }
      }
    },
    en: {
      label: 'EN',
      lang: 'en-US',
      link: '/en/',
      title: 'Omni Docs',
      description: 'Documentation built with VitePress',
      themeConfig: {
        nav: [
          { text: 'Home', link: '/en/' },
          { text: 'API', link: '/en/api/' },
          { text: 'Start', link: '/en/guide/getting-started' },
          { text: 'Business', link: '/en/guide/structure' }
        ],
        sidebar: [
          {
            text: 'Guide',
            items: [
              { text: 'Getting Started', link: '/en/guide/getting-started' },
              { text: 'Business', link: '/en/guide/structure' }
            ]
          },
          {
            text: 'API',
            items: [
              { text: 'API Reference', link: '/en/api/' }
            ]
          }
        ],
        langMenuLabel: 'Change language',
        darkModeSwitchLabel: 'Appearance',
        docFooter: {
          prev: 'Previous page',
          next: 'Next page'
        },
        outline: {
          label: 'On this page'
        },
        lastUpdated: {
          text: 'Last updated'
        },
        footer: {
          message: 'Built with VitePress',
          copyright: 'Copyright © 2026 Omni Docs'
        }
      }
    }
  }
})
