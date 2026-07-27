---
title: "YouTube增强+"
---

# YouTube增强+

`YouTube增强`  `视频下载`  `界面优化`  `标签切换`  `评论管理`  `播放列表`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/YouTube.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**2.5.1**　　发现时间：**2026-06-01**　　来源：[GreasyFork](https://greasyfork.org/scripts/537017-youtube) <Badge type="tip" text="GreasyFork" />　　安装量：**5,118**　　评分：👍24 / 👎1

## 功能介绍

本脚本为YouTube页面添加标签视图，方便切换信息、评论、视频、播放列表等内容，并提供视频下载及其他增强功能。让用户操作更便捷，体验更丰富。

## 适用网站

- YouTube主站
- YouTube音乐
- YouTube Studio
- Google活动记录

## 使用方法

1. 安装脚本后，打开YouTube相关页面。
2. 页面会出现新的标签视图，方便切换不同内容。
3. 在视频页面可直接下载视频或音频。
4. 根据需要调整脚本设置，享受更多功能。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_addStyle` | 用于页面添加自定义样式，优化界面显示。 |
| `GM_getValue` | 用于读取脚本设置或用户偏好。 |
| `GM_setValue` | 用于保存脚本设置或用户偏好。 |
| `GM_addValueChangeListener` | 用于监听设置变化，实时更新页面效果。 |
| `GM_xmlhttpRequest` | 用于跨域请求数据，如下载视频或获取信息。 |
| `unsafeWindow` | 允许脚本访问和操作网页的全局对象，增强功能。 |
| `GM_addElement` | 用于向页面添加自定义元素，如按钮或标签。 |

## 安全分析

**风险等级**：🔴 HIGH　　**安全评分**：47/100　　**分析时间**：2026-07-27

> 脚本允许向多个第三方域名发送网络请求，部分为非官方服务，存在数据外传风险。未发现隐私采集、代码混淆或 DOM XSS，但权限申请较高，且依赖第三方库存在供应链风险。建议限制网络请求目标、精简权限申请，并定期审查依赖库安全。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：api.livecounts.io, livecounts.io, cnv.cx） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本通过 GM_xmlhttpRequest 允许向多个第三方域名发送网络请求，部分域名（如 mp3yt.is、cnv.cx、supabase.co）为非官方服务，可能涉及用户数据外传风险。  
> 位置：元数据 @connect  
> 建议：限制请求目标，仅允许必要的官方 API；避免向未知第三方域名发送用户数据。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请 GM_xmlhttpRequest 高权限，但未明确限制用途，存在滥用风险。  
> 位置：元数据 @grant  
> 建议：仅申请实际需要的权限，避免高权限滥用。

**🟠 MEDIUM** — 权限滥用  
> 脚本通过 unsafeWindow 访问页面上下文，可能导致与页面脚本交互产生安全隐患。  
> 位置：元数据 @grant  
> 建议：避免使用 unsafeWindow，或严格限制其用途。

**🟠 MEDIUM** — 供应链风险  
> 脚本通过 @require 加载多个第三方库，虽然均为 jsdelivr CDN 且固定版本，但仍存在供应链风险。  
> 位置：元数据 @require  
> 建议：定期审查依赖库安全，确保 CDN 官方可信且版本固定。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/537017-youtube)*
