import { defineConfig } from 'vitepress'

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
  title: 'OmniRouters Docs',
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
    search
  },
  locales: {
    root: {
      label: '中文',
      lang: 'zh-CN',
      title: 'OmniRouters Docs',
      description: '使用 VitePress 构建的文档站',
      themeConfig: {
        nav: [
          { text: '首页', link: '/' },
          { text: 'API参考', link: '/api/' },
          { text: 'AI应用', link: '/ai-apps/' },
          { text: 'Skills', link: '/skills/' },
          { text: '技术支持', link: '/guide/getting-started' },
          { text: '商务合作', link: '/guide/structure' },
          { text: '法律', link: '/legal/' }
        ],
        sidebar: [
          {
            text: 'AI应用',
            items: [
              { text: 'AI应用概览', link: '/ai-apps/' },
              { text: 'AionUi', link: '/ai-apps/aionui' }
            ]
          },
          {
            text: 'Skills',
            items: [
              { text: 'Skills', link: '/skills/' }
            ]
          },
          {
            text: '指南',
            items: [
              { text: '技术支持', link: '/guide/getting-started' },
              { text: '商务合作', link: '/guide/structure' }
            ]
          },
          {
            text: 'API参考',
            items: [
              { text: 'API 参考', link: '/api/' }
            ]
          },
          {
            text: '法律',
            items: [
              { text: '法律概览', link: '/legal/' },
              { text: '用户协议', link: '/legal/terms' },
              { text: '隐私政策', link: '/legal/privacy' }
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
          copyright: 'Copyright © 2026 OmniRouters Docs'
        }
      }
    },
    en: {
      label: 'EN',
      lang: 'en-US',
      link: '/en/',
      title: 'OmniRouters Docs',
      description: 'Documentation built with VitePress',
      themeConfig: {
        nav: [
          { text: 'Home', link: '/en/' },
          { text: 'API Reference', link: '/en/api/' },
          { text: 'AI Apps', link: '/en/ai-apps/' },
          { text: 'Skills', link: '/en/skills/' },
          { text: 'Support', link: '/en/guide/getting-started' },
          { text: 'Business', link: '/en/guide/structure' },
          { text: 'Legal', link: '/en/legal/' }
        ],
        sidebar: [
          {
            text: 'AI Apps',
            items: [
              { text: 'Overview', link: '/en/ai-apps/' },
              { text: 'AionUi', link: '/en/ai-apps/aionui' }
            ]
          },
          {
            text: 'Skills',
            items: [
              { text: 'Skills', link: '/en/skills/' }
            ]
          },
          {
            text: 'Guide',
            items: [
              { text: 'Support', link: '/en/guide/getting-started' },
              { text: 'Business', link: '/en/guide/structure' }
            ]
          },
          {
            text: 'API Reference',
            items: [
              { text: 'API Reference', link: '/en/api/' }
            ]
          },
          {
            text: 'Legal',
            items: [
              { text: 'Overview', link: '/en/legal/' },
              { text: 'Terms of Service', link: '/en/legal/terms' },
              { text: 'Privacy Policy', link: '/en/legal/privacy' }
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
          copyright: 'Copyright © 2026 OmniRouters Docs'
        }
      }
    }
  }
})
