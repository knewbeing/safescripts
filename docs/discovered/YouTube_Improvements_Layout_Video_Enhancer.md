---
title: "YouTube 改进 – 布局与视频增强"
---

# YouTube 改进 – 布局与视频增强

`YouTube增强`  `视频下载`  `界面优化`  `主题切换`  `快捷操作`  `视频工具`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/YouTube_Improvements_Layout_Video_Enhancer.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.1.4**　　发现时间：**2026-05-11**　　来源：[GreasyFork](https://greasyfork.org/scripts/560618-youtube-improvements-layout-video-enhancer) <Badge type="tip" text="GreasyFork" />　　安装量：**34,749**　　评分：👍21 / 👎8

## 功能介绍

本脚本为 YouTube 增加多项实用功能，包括优化视频详情页布局、支持视频下载、视频截图、深色/浅色主题切换、视频快进控制等，提升观看体验。安装后，用户可直接在 YouTube 页面上使用这些增强功能，无需额外软件。

## 适用网站

- YouTube

## 使用方法

1. 1. 安装脚本后，打开 YouTube 网站。
2. 2. 在视频页面会看到新增的下载、截图、主题切换等按钮。
3. 3. 点击相应按钮即可使用对应功能，如下载视频、截图或切换深浅主题。
4. 4. 可通过脚本菜单进行更多个性化设置。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_registerMenuCommand` | 添加自定义菜单命令，方便用户手动触发脚本功能。 |
| `GM_openInTab` | 在新标签页打开指定链接，便于访问相关内容。 |
| `GM.openInTab` | 在新标签页打开指定链接（兼容不同脚本管理器）。 |
| `GM_addStyle` | 动态添加自定义样式，美化或调整页面布局。 |
| `GM_setValue` | 保存用户设置或脚本数据，实现个性化配置。 |
| `GM_getValue` | 读取已保存的用户设置或脚本数据。 |
| `GM_deleteValue` | 删除已保存的用户设置或脚本数据。 |
| `GM_xmlhttpRequest` | 进行跨域网络请求，用于下载视频等功能。 |
| `unsafeWindow` | 允许脚本访问网页的原始 window 对象，增强操作能力。 |
| `GM_download` | 实现视频下载功能，直接保存视频到本地。 |
| `GM_setClipboard` | 将内容复制到剪贴板，方便用户快速获取信息。 |
| `GM_addElement` | 向页面动态添加元素，实现更多交互功能。 |

## 安全分析

::: info 等待分析
安全分析将在下次流水线运行时自动更新。
:::

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/560618-youtube-improvements-layout-video-enhancer)*
