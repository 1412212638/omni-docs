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
          { text: 'Model API Manual', link: '/api/' },
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
              { text: 'AionUi', link: '/ai-apps/aionui' },
              { text: 'CC Switch', link: '/ai-apps/cc-switch' },
              { text: 'Codex Configuration', link: '/ai-apps/codex' },
              { text: 'Claude Code Configuration', link: '/ai-apps/claude-code' }
            ]
          },
          {
            text: 'Skills',
            items: [
              { text: 'Skills', link: '/skills/' },
              { text: 'OmniRouters Support', link: '/skills/omnirouters' },
            ]
          },
          {
            text: 'Guide',
            items: [
              { text: 'Platform Overview', link: '/guide/overview' },
              { text: 'Quick Start', link: '/guide/quick-start' },
              { text: 'Usage Guide', link: '/guide/usage' },
              { text: 'Support', link: '/guide/getting-started' },
              { text: 'Business', link: '/guide/structure' }
            ]
          },
          {
            text: 'Model API Manual',
            items: [
              { text: 'Model API Manual', link: '/api/' },
              {
                text: 'Large Language Models',
                items: [
                  {
                    text: 'OpenAI Protocol',
                    items: [
                      { text: 'Chat Completions', link: '/api/llm/openai-chat' },
                      { text: 'Responses', link: '/api/llm/openai-responses' },
                      { text: 'Response Operations', link: '/api/llm/openai-operations' }
                    ]
                  },
                  {
                    text: 'Anthropic Protocol',
                    items: [{ text: 'Messages', link: '/api/llm/claude-messages' }]
                  },
                  {
                    text: 'Gemini Protocol',
                    items: [{ text: 'Generate Content', link: '/api/llm/gemini-generate-content' }]
                  },
                  { text: 'Native Protocol Operations', link: '/api/llm/native-protocol-operations' },
                  { text: 'Protocol Comparison', link: '/api/llm/protocol-comparison' }
                ]
              },
              {
                text: 'Image Generation',
                items: [
                  { text: 'Omni-Image API', link: '/api/omni-image' },
                  {
                    text: 'OpenAI',
                    items: [
                      { text: 'GPT Image 1 Mini 生成', link: '/api/image/gpt-image-1-mini' },
                      { text: 'GPT Image 1 Mini 编辑', link: '/api/image/gpt-image-1-mini-edit' },
                      { text: 'GPT Image 1.5 生成', link: '/api/image/gpt-image-1-5' },
                      { text: 'GPT Image 1.5 编辑', link: '/api/image/gpt-image-1-5-edit' },
                      { text: 'GPT Image 1 生成', link: '/api/image/gpt-image-1' },
                      { text: 'GPT Image 1 编辑', link: '/api/image/gpt-image-1-edit' },
                      { text: 'GPT Image 2 生成', link: '/api/image/gpt-image-2' },
                      { text: 'GPT Image 2 编辑', link: '/api/image/gpt-image-2-edit' },
                      { text: 'GPT Image 2.5 Flare 生成', link: '/api/image/gpt-image-2-5-flare' },
                      { text: 'GPT Image 2.5 Flare 编辑', link: '/api/image/gpt-image-2-5-flare-edit' },
                      { text: 'GPT Image 2.5 Sunburst 生成', link: '/api/image/gpt-image-2-5-sunburst' },
                      { text: 'GPT Image 2.5 Sunburst 编辑', link: '/api/image/gpt-image-2-5-sunburst-edit' }
                    ]
                  },
                  {
                    text: 'Google',
                    items: [
                      { text: 'Gemini 2.5 Flash Image', link: '/api/image/gemini-2-5-flash-image' },
                      { text: 'Gemini 3 Pro Image', link: '/api/image/gemini-3-pro-image' },
                      { text: 'Gemini 3.1 Flash Image', link: '/api/image/gemini-3-1-flash-image' }
                    ]
                  },
                  {
                    text: 'X.AI',
                    items: [
                      { text: 'Grok Imagine 生成', link: '/api/image/grok-imagine-image' },
                      { text: 'Grok Imagine 编辑', link: '/api/image/grok-imagine-image-edit' }
                    ]
                  }
                ]
              },
              { text: 'Video Generation', items: [{ text: 'Omni-Video API', link: '/api/omni-video' }] },
              { text: 'Audio Generation', items: [] },
              {
                text: 'Structured Decisions',
                items: [{ text: 'SystemOne', link: '/api/llm/systemone' }]
              },
              { text: 'Apifox Reference', link: 'https://omnirouters.apifox.cn/' }
            ]
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
              { text: 'Service Level Agreement (SLA)', link: '/legal/sla' },
              { text: 'Invoice Notice', link: '/legal/invoicing' },
              {
                text: 'Special Terms for Mainland China Users',
                link: '/legal/mainland-china'
              },
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
          { text: '模型 API 手册', link: '/zh/api/' },
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
              { text: 'AionUi', link: '/zh/ai-apps/aionui' },
              { text: 'CC Switch', link: '/zh/ai-apps/cc-switch' },
              { text: 'Codex 配置教程', link: '/zh/ai-apps/codex' },
              { text: 'Claude Code 配置教程', link: '/zh/ai-apps/claude-code' }
            ]
          },
          {
            text: 'Skills',
            items: [
              { text: 'Skills', link: '/zh/skills/' },
              { text: 'OmniRouters Support', link: '/zh/skills/omnirouters' },
            ]
          },
          {
            text: '指南',
            items: [
              { text: '平台简介', link: '/zh/guide/overview' },
              { text: '快速开始', link: '/zh/guide/quick-start' },
              { text: '使用文档', link: '/zh/guide/usage' },
              { text: '技术支持', link: '/zh/guide/getting-started' },
              { text: '商务合作', link: '/zh/guide/structure' }
            ]
          },
          {
            text: '模型 API 手册',
            items: [
              { text: '模型 API 手册', link: '/zh/api/' },
              {
                text: '大语言模型',
                items: [
                  {
                    text: 'OpenAI 协议',
                    items: [
                      { text: 'Chat Completions', link: '/zh/api/llm/openai-chat' },
                      { text: 'Responses', link: '/zh/api/llm/openai-responses' },
                      { text: 'Responses 扩展操作', link: '/zh/api/llm/openai-operations' }
                    ]
                  },
                  {
                    text: 'Anthropic 协议',
                    items: [{ text: 'Messages', link: '/zh/api/llm/claude-messages' }]
                  },
                  {
                    text: 'Gemini 协议',
                    items: [{ text: 'Generate Content', link: '/zh/api/llm/gemini-generate-content' }]
                  },
                  { text: '原生协议扩展操作', link: '/zh/api/llm/native-protocol-operations' },
                  { text: '协议对比', link: '/zh/api/llm/protocol-comparison' }
                ]
              },
              {
                text: '图片生成',
                items: [
                  { text: 'Omni-Image API', link: '/zh/api/omni-image' },
                  {
                    text: 'OpenAI',
                    items: [
                      { text: 'GPT Image 1 Mini 生成', link: '/zh/api/image/gpt-image-1-mini' },
                      { text: 'GPT Image 1 Mini 编辑', link: '/zh/api/image/gpt-image-1-mini-edit' },
                      { text: 'GPT Image 1.5 生成', link: '/zh/api/image/gpt-image-1-5' },
                      { text: 'GPT Image 1.5 编辑', link: '/zh/api/image/gpt-image-1-5-edit' },
                      { text: 'GPT Image 1 生成', link: '/zh/api/image/gpt-image-1' },
                      { text: 'GPT Image 1 编辑', link: '/zh/api/image/gpt-image-1-edit' },
                      { text: 'GPT Image 2 生成', link: '/zh/api/image/gpt-image-2' },
                      { text: 'GPT Image 2 编辑', link: '/zh/api/image/gpt-image-2-edit' },
                      { text: 'GPT Image 2.5 Flare 生成', link: '/zh/api/image/gpt-image-2-5-flare' },
                      { text: 'GPT Image 2.5 Flare 编辑', link: '/zh/api/image/gpt-image-2-5-flare-edit' },
                      { text: 'GPT Image 2.5 Sunburst 生成', link: '/zh/api/image/gpt-image-2-5-sunburst' },
                      { text: 'GPT Image 2.5 Sunburst 编辑', link: '/zh/api/image/gpt-image-2-5-sunburst-edit' }
                    ]
                  },
                  {
                    text: 'Google',
                    items: [
                      { text: 'Gemini 2.5 Flash Image', link: '/zh/api/image/gemini-2-5-flash-image' },
                      { text: 'Gemini 3 Pro Image', link: '/zh/api/image/gemini-3-pro-image' },
                      { text: 'Gemini 3.1 Flash Image', link: '/zh/api/image/gemini-3-1-flash-image' }
                    ]
                  },
                  {
                    text: 'X.AI',
                    items: [
                      { text: 'Grok Imagine 生成', link: '/zh/api/image/grok-imagine-image' },
                      { text: 'Grok Imagine 编辑', link: '/zh/api/image/grok-imagine-image-edit' }
                    ]
                  }
                ]
              },
              { text: '视频生成', items: [{ text: 'Omni-Video API', link: '/zh/api/omni-video' }] },
              { text: '音频生成', items: [] },
              {
                text: '结构化决策',
                items: [{ text: 'SystemOne', link: '/zh/api/llm/systemone' }]
              },
              { text: 'Apifox 接口参考', link: 'https://omnirouters.apifox.cn/' }
            ]
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
              { text: '服务等级协议（SLA）', link: '/zh/legal/sla' },
              { text: '开票须知', link: '/zh/legal/invoicing' },
              {
                text: '中国内地用户特别约定',
                link: '/zh/legal/mainland-china'
              },
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
