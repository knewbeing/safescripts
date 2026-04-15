---
layout: home

hero:
  name: "SafeScripts"
  text: "Tampermonkey 脚本管理站"
  tagline: 自动同步、AI 安全分析、一键安装 —— 让每个脚本都透明可信
  actions:
    - theme: brand
      text: 查看托管脚本
      link: /managed/
    - theme: alt
      text: 发现热门脚本
      link: /discovered/

features:
  - icon: 📥
    title: 自动同步
    details: 在 target-repos.json 中配置脚本地址，每天自动拉取最新版本保存到仓库，内容无变化时自动跳过。
  - icon: 🤖
    title: AI 生成说明
    details: 调用 GitHub Models API 自动生成中文功能介绍、适用网站、使用方法和权限说明，无需手动维护文档。
  - icon: 📥
    title: 一键安装
    details: 每个脚本页面提供"安装到 Tampermonkey"按钮，点击即可直接安装，无需手动复制链接。
  - icon: 🛡️
    title: 安全分析
    details: AI 自动检查数据外传、隐私采集、远程代码执行等 7 项安全风险，以风险等级徽章直观展示。
  - icon: 🔍
    title: 热门发现
    details: 每天从 GitHub 搜索流行 Tampermonkey 脚本，经 AI 筛选和安全分析后展示在独立页面。
  - icon: 🚀
    title: 自动发布
    details: 所有步骤完成后自动构建 VitePress 并部署到 GitHub Pages，始终保持最新状态。
---
