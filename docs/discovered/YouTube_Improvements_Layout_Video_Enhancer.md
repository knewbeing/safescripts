---
title: "YouTube 改进 – 布局与视频增强"
---

# YouTube 改进 – 布局与视频增强

`YouTube增强`  `视频下载`  `界面优化`  `主题切换`  `截图`  `快捷操作`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/YouTube_Improvements_Layout_Video_Enhancer.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.1.5**　　发现时间：**2026-06-29**　　来源：[GreasyFork](https://greasyfork.org/scripts/560618-youtube-improvements-layout-video-enhancer) <Badge type="tip" text="GreasyFork" />　　安装量：**45,802**　　评分：👍28 / 👎8

## 功能介绍

本脚本为 YouTube 提供多项增强功能，包括优化视频详情页布局、支持视频下载、截图、主题切换（深色/浅色）、视频快进控制等，提升观看和操作体验。

## 适用网站

- YouTube

## 使用方法

1. 安装脚本后，打开 YouTube 网站。
2. 在视频页面会看到新增的下载、截图、主题切换等按钮。
3. 点击相应按钮即可使用对应功能，如下载视频、切换深浅主题、截图等。
4. 部分功能可通过右键菜单或快捷键快速操作。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_registerMenuCommand` | 添加自定义菜单项，方便用户操作脚本功能。 |
| `GM_openInTab` | 在新标签页打开链接，便于访问相关内容。 |
| `GM.openInTab` | 在新标签页打开链接（新版 API），便于访问相关内容。 |
| `GM_addStyle` | 动态添加自定义样式，优化页面布局和显示效果。 |
| `GM_setValue` | 保存脚本设置或数据，记忆用户偏好。 |
| `GM_getValue` | 读取脚本保存的数据，恢复用户设置。 |
| `GM_deleteValue` | 删除脚本保存的数据，清理设置。 |
| `GM_xmlhttpRequest` | 进行网络请求，获取视频资源或其他数据。 |
| `unsafeWindow` | 访问网页的原生窗口对象，实现高级交互。 |
| `GM_download` | 下载文件（如视频），实现视频保存功能。 |
| `GM_setClipboard` | 复制内容到剪贴板，方便用户分享或保存信息。 |
| `GM_addElement` | 向页面添加自定义元素，增强界面功能。 |

## 安全分析

::: info 等待分析
安全分析将在下次流水线运行时自动更新。
:::

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/560618-youtube-improvements-layout-video-enhancer)*
