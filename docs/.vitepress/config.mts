import { defineConfig } from 'vitepress'

const search = {
  provider: 'local' as const,
  options: {
    locales: {
      root: {
        translations: {
          button: {
            buttonText: 'Search',
            buttonAriaLabel: 'Search'
          },
          modal: {
            noResultsText: 'No results for this query',
            resetButtonTitle: 'Clear query',
            footer: {
              selectText: 'Select',
              selectKeyAriaLabel: 'enter',
              navigateText: 'Navigate',
              navigateUpKeyAriaLabel: 'up arrow',
              navigateDownKeyAriaLabel: 'down arrow',
              closeText: 'Close',
              closeKeyAriaLabel: 'escape'
            }
          }
        }
      },
      zh: {
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
      }
    }
  }
}

export default defineConfig({
  title: 'OmniRouters Docs',
  description: 'OmniRouters documentation',
  lang: 'en-US',
  base: '/',
  lastUpdated: true,
  rewrites(id) {
    if (id.startsWith('en/')) {
      return id.slice(3)
    }

    return `zh/${id}`
  },
  head: [['link', { rel: 'icon', href: '/logo.png' }]],
  themeConfig: {
    logo: {
      src: '/logo.png',
      alt: 'OmniRouters Logo'
    },
    search
  },
  locales: {
    root: {
      label: 'English',
      lang: 'en-US',
      title: 'OmniRouters Docs',
      description: 'Documentation for OmniRouters',
      themeConfig: {
        nav: [
          { text: 'Home', link: '/' },
          { text: 'API Reference', link: '/api/' },
          { text: 'AI Apps', link: '/ai-apps/' },
          { text: 'Skills', link: '/skills/' },
          { text: 'Support', link: '/guide/getting-started' },
          { text: 'Business', link: '/guide/structure' },
          { text: 'Updates', link: '/changelog/' },
          { text: 'Legal', link: '/legal/' }
        ],
        sidebar: [
          {
            text: 'AI Apps',
            items: [
              { text: 'Overview', link: '/ai-apps/' },
              { text: 'AionUi', link: '/ai-apps/aionui' }
            ]
          },
          {
            text: 'Skills',
            items: [
              { text: 'Skills', link: '/skills/' },
              {
                text: 'OmniRouters Generation',
                link: '/skills/omnirouters-generation'
              },
              { text: 'OmniRouters Video', link: '/skills/omnirouters-video' },
              { text: 'OmniRouters Image', link: '/skills/omnirouters-image' },
              { text: 'OmniRouters Speech', link: '/skills/omnirouters-speech' },
              { text: 'OmniRouters Music', link: '/skills/omnirouters-music' }
            ]
          },
          {
            text: 'Guide',
            items: [
              { text: 'Support', link: '/guide/getting-started' },
              { text: 'Business', link: '/guide/structure' }
            ]
          },
          {
            text: 'API Reference',
            items: [{ text: 'API Reference', link: '/api/' }]
          },
          {
            text: 'Updates',
            items: [{ text: 'Changelog', link: '/changelog/' }]
          },
          {
            text: 'Legal',
            items: [
              { text: 'Overview', link: '/legal/' },
              { text: 'Terms of Service', link: '/legal/terms' },
              { text: 'Privacy Policy', link: '/legal/privacy' },
              {
                text: 'Personal Information Collection Statement',
                link: '/legal/pics'
              },
              { text: 'Data Rights Requests', link: '/legal/data-rights' },
              {
                text: 'Security and Data Breach Notice',
                link: '/legal/security'
              },
              {
                text: 'Billing and Refund Policy',
                link: '/legal/billing-refund'
              },
              { text: 'Invoice Notice', link: '/legal/invoicing' },
              {
                text: 'Acceptable Use Policy',
                link: '/legal/acceptable-use'
              },
              {
                text: 'Subprocessors and Third-Party Categories',
                link: '/legal/subprocessors'
              },
              { text: 'DPA Overview', link: '/legal/dpa' },
              { text: 'AI Usage Notice', link: '/legal/ai-usage' }
            ]
          }
        ],
        langMenuLabel: 'Language',
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
          copyright: 'Copyright 2026 OmniRouters Docs'
        }
      }
    },
    zh: {
      label: '中文',
      lang: 'zh-CN',
      link: '/zh/',
      title: 'OmniRouters Docs',
      description: 'OmniRouters 产品文档',
      themeConfig: {
        nav: [
          { text: '首页', link: '/zh/' },
          { text: 'API参考', link: '/zh/api/' },
          { text: 'AI应用', link: '/zh/ai-apps/' },
          { text: 'Skills', link: '/zh/skills/' },
          { text: '技术支持', link: '/zh/guide/getting-started' },
          { text: '商务合作', link: '/zh/guide/structure' },
          { text: '更新记录', link: '/zh/changelog/' },
          { text: '法律', link: '/zh/legal/' }
        ],
        sidebar: [
          {
            text: 'AI应用',
            items: [
              { text: 'AI应用概览', link: '/zh/ai-apps/' },
              { text: 'AionUi', link: '/zh/ai-apps/aionui' }
            ]
          },
          {
            text: 'Skills',
            items: [
              { text: 'Skills', link: '/zh/skills/' },
              {
                text: 'OmniRouters Generation',
                link: '/zh/skills/omnirouters-generation'
              },
              { text: 'OmniRouters Video', link: '/zh/skills/omnirouters-video' },
              { text: 'OmniRouters Image', link: '/zh/skills/omnirouters-image' },
              { text: 'OmniRouters Speech', link: '/zh/skills/omnirouters-speech' },
              { text: 'OmniRouters Music', link: '/zh/skills/omnirouters-music' }
            ]
          },
          {
            text: '指南',
            items: [
              { text: '技术支持', link: '/zh/guide/getting-started' },
              { text: '商务合作', link: '/zh/guide/structure' }
            ]
          },
          {
            text: 'API参考',
            items: [{ text: 'API参考', link: '/zh/api/' }]
          },
          {
            text: '更新记录',
            items: [{ text: '更新记录', link: '/zh/changelog/' }]
          },
          {
            text: '法律',
            items: [
              { text: '法律概览', link: '/zh/legal/' },
              { text: '用户协议', link: '/zh/legal/terms' },
              { text: '隐私政策', link: '/zh/legal/privacy' },
              {
                text: '个人信息收集声明（PICS）',
                link: '/zh/legal/pics'
              },
              {
                text: '数据权利与访问更正请求',
                link: '/zh/legal/data-rights'
              },
              {
                text: '安全与数据泄露说明',
                link: '/zh/legal/security'
              },
              {
                text: '计费与退款说明',
                link: '/zh/legal/billing-refund'
              },
              { text: '开票须知', link: '/zh/legal/invoicing' },
              {
                text: '可接受使用政策',
                link: '/zh/legal/acceptable-use'
              },
              {
                text: '子处理者与第三方服务类别',
                link: '/zh/legal/subprocessors'
              },
              {
                text: '数据处理附录（DPA）说明',
                link: '/zh/legal/dpa'
              },
              { text: 'AI 使用说明', link: '/zh/legal/ai-usage' }
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
          copyright: 'Copyright 2026 OmniRouters Docs'
        }
      }
    }
  }
})
