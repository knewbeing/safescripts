import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: 'SafeScripts',
  description: 'Tampermonkey 脚本安全发现、分析与管理站点',
  base: '/safescripts/',

  themeConfig: {
    logo: '🛡️',
    siteTitle: 'SafeScripts',

    nav: [
      { text: '首页', link: '/' },
      { text: '托管脚本', link: '/managed/' },
      { text: '发现脚本', link: '/discovered/' },
      { text: '运行历史', link: '/status/' },
    ],

    sidebar: {
      '/managed/': [
        {
          text: '托管脚本',
          items: [
            { text: '脚本总览', link: '/managed/' },
          ],
        },
      ],
      '/discovered/': [
        {
          text: '发现脚本',
          items: [
            { text: '脚本总览', link: '/discovered/' },
          ],
        },
      ],
      '/status/': [
        {
          text: '运行历史',
          items: [
            { text: '运行记录', link: '/status/' },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/knewbeing/safescripts' },
    ],

    footer: {
      message: '基于 MIT 许可发布',
      copyright: 'Copyright © 2024-present knewbeing',
    },

    search: {
      provider: 'local',
    },

    outline: {
      label: '本页目录',
    },

    docFooter: {
      prev: '上一页',
      next: '下一页',
    },

    lastUpdated: {
      text: '最后更新于',
    },
  },
})

