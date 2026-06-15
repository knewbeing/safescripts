---
title: "YouTube 改进 – 布局与视频增强"
---

# YouTube 改进 – 布局与视频增强

`YouTube增强`  `视频下载`  `页面美化`  `主题切换`  `快捷操作`  `视频截图`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/YouTube_Improvements_Layout_Video_Enhancer.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.1.5**　　发现时间：**2026-06-15**　　来源：[GreasyFork](https://greasyfork.org/scripts/560618-youtube-improvements-layout-video-enhancer) <Badge type="tip" text="GreasyFork" />　　安装量：**42,645**　　评分：👍25 / 👎8

## 功能介绍

本脚本为 YouTube 提供多项增强功能，包括优化视频详情页布局、支持视频下载、视频截图、主题切换（深色/浅色）、视频快进控制等，提升观看和操作体验。

## 适用网站

- YouTube

## 使用方法

1. 安装脚本后，打开 YouTube 网站。
2. 在视频页面可看到新增功能按钮，如下载、截图、主题切换等。
3. 通过页面按钮或菜单命令使用各项增强功能。
4. 可在用户脚本菜单中调整部分设置或选项。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_registerMenuCommand` | 允许在用户菜单中添加自定义命令，方便快速操作脚本功能。 |
| `GM_openInTab` | 可在新标签页打开指定链接，用于跳转或下载。 |
| `GM.openInTab` | 可在新标签页打开指定链接（新版 API），用于跳转或下载。 |
| `GM_addStyle` | 允许脚本添加自定义样式，优化页面布局和显示效果。 |
| `GM_setValue` | 保存用户设置或脚本数据，方便个性化配置。 |
| `GM_getValue` | 读取用户设置或脚本数据，恢复个性化配置。 |
| `GM_deleteValue` | 删除保存的用户设置或脚本数据，清理无用信息。 |
| `GM_xmlhttpRequest` | 支持跨域网络请求，获取视频资源或相关数据。 |
| `unsafeWindow` | 允许脚本访问网页的原生窗口对象，增强页面交互。 |
| `GM_download` | 实现视频下载功能，直接保存视频到本地。 |
| `GM_setClipboard` | 复制内容到剪贴板，方便用户分享或保存信息。 |
| `GM_addElement` | 向页面添加自定义元素，扩展功能按钮或界面。 |

## 安全分析

::: info 等待分析
安全分析将在下次流水线运行时自动更新。
:::

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/560618-youtube-improvements-layout-video-enhancer)*
