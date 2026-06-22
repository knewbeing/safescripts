---
title: "YouTube 改进 – 布局与视频增强"
---

# YouTube 改进 – 布局与视频增强

`YouTube增强`  `视频下载`  `界面优化`  `主题切换`  `截图工具`  `快捷操作`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/YouTube_Improvements_Layout_Video_Enhancer.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.1.5**　　发现时间：**2026-06-22**　　来源：[GreasyFork](https://greasyfork.org/scripts/560618-youtube-improvements-layout-video-enhancer) <Badge type="tip" text="GreasyFork" />　　安装量：**44,234**　　评分：👍27 / 👎8

## 功能介绍

本脚本为 YouTube 提供多项增强功能，包括优化视频详情页布局、支持视频下载、截图、主题切换（深色/浅色）、视频快进等，提升观看体验。

## 适用网站

- YouTube

## 使用方法

1. 安装脚本后，打开 YouTube 网站。
2. 在视频页面会看到新增的下载、截图、主题切换等按钮。
3. 点击相应按钮即可使用对应功能，如下载视频、切换深色/浅色主题等。
4. 可通过右键菜单或页面工具栏快速访问脚本设置和功能。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_registerMenuCommand` | 添加自定义菜单项，方便用户操作脚本功能。 |
| `GM_openInTab` | 在新标签页打开链接，用于下载或跳转。 |
| `GM.openInTab` | 在新标签页打开链接（新版API），用于下载或跳转。 |
| `GM_addStyle` | 动态添加自定义样式，优化页面布局和显示。 |
| `GM_setValue` | 保存脚本设置或用户偏好。 |
| `GM_getValue` | 读取脚本保存的设置或用户偏好。 |
| `GM_deleteValue` | 删除脚本保存的设置或用户偏好。 |
| `GM_xmlhttpRequest` | 进行网络请求，获取视频资源或数据。 |
| `unsafeWindow` | 访问网页的原生窗口对象，增强与页面的交互。 |
| `GM_download` | 下载文件到本地，如视频或截图。 |
| `GM_setClipboard` | 复制内容到剪贴板，方便用户操作。 |
| `GM_addElement` | 向页面添加自定义元素，如按钮或工具栏。 |

## 安全分析

::: info 等待分析
安全分析将在下次流水线运行时自动更新。
:::

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/560618-youtube-improvements-layout-video-enhancer)*
