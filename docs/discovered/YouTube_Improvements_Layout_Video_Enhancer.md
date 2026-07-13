---
title: "YouTube 改进 – 布局与视频增强"
---

# YouTube 改进 – 布局与视频增强

`YouTube增强`  `视频下载`  `界面优化`  `主题切换`  `截图`  `快捷操作`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/YouTube_Improvements_Layout_Video_Enhancer.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.1.5**　　发现时间：**2026-07-06**　　来源：[GreasyFork](https://greasyfork.org/scripts/560618-youtube-improvements-layout-video-enhancer) <Badge type="tip" text="GreasyFork" />　　安装量：**47,306**　　评分：👍30 / 👎8

## 功能介绍

本脚本为 YouTube 提供多项增强功能，包括优化视频详情页布局、支持视频下载、截图、主题切换（深色/浅色）、快进控制等，提升观看体验。

## 适用网站

- YouTube

## 使用方法

1. 安装脚本后，打开 YouTube 网站。
2. 在视频详情页可看到优化布局和新增按钮。
3. 点击下载、截图、主题切换等按钮即可使用对应功能。
4. 可通过右键菜单或页面按钮进行更多操作。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_registerMenuCommand` | 添加自定义菜单项，方便用户操作脚本功能。 |
| `GM_openInTab` | 在新标签页打开链接，便于访问相关内容。 |
| `GM.openInTab` | 在新标签页打开链接，便于访问相关内容（新版API）。 |
| `GM_addStyle` | 动态添加自定义样式，让页面布局更美观。 |
| `GM_setValue` | 保存脚本设置或数据，方便个性化配置。 |
| `GM_getValue` | 读取脚本保存的数据，恢复用户设置。 |
| `GM_deleteValue` | 删除脚本保存的数据，清理设置。 |
| `GM_xmlhttpRequest` | 发送网络请求，获取视频资源或信息。 |
| `unsafeWindow` | 访问网页的原始窗口对象，实现高级交互。 |
| `GM_download` | 下载文件（如视频），实现视频保存功能。 |
| `GM_setClipboard` | 复制内容到剪贴板，方便用户分享或保存信息。 |
| `GM_addElement` | 向页面添加自定义元素，扩展功能界面。 |

## 安全分析

**风险等级**：🟠 MEDIUM　　**安全评分**：68/100　　**分析时间**：2026-07-13

> 该脚本主要用于增强 YouTube 功能，元数据中申请了较多高权限（如 GM_xmlhttpRequest、GM_download、GM_openInTab、unsafeWindow），但在当前代码片段未见实际滥用或隐私数据收集、外传行为。未发现代码混淆、远程代码执行、DOM XSS、供应链风险等高危问题。建议关注后续完整代码实现，确保高权限仅在用户明确操作下使用，避免滥用。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM_xmlhttpRequest 权限，但在提供的代码片段中未见实际使用。若后续代码存在下载视频等功能，需关注是否有向第三方服务器传输用户数据。  
> 位置：元数据 @grant  
> 建议：确保 GM_xmlhttpRequest 仅用于必要的功能，且不得外传用户隐私数据。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM_download 权限，可能被滥用进行恶意下载。  
> 位置：元数据 @grant  
> 建议：仅在用户明确操作时触发下载，避免自动或隐蔽下载。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM_openInTab/GM.openInTab 权限，可能被滥用打开恶意页面。  
> 位置：元数据 @grant  
> 建议：仅在用户明确操作时使用 GM_openInTab，避免自动或隐蔽跳转。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 unsafeWindow 权限，可能导致与页面 JS 互操作时引入安全隐患。  
> 位置：元数据 @grant  
> 建议：仅在确有必要时使用 unsafeWindow，并严格校验数据来源，防止 XSS 注入。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/560618-youtube-improvements-layout-video-enhancer)*
