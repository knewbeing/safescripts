---
title: "AI验证码自动识别填充"
---

# AI验证码自动识别填充

`验证码`  `自动填写`  `AI识别`  `网页辅助`  `效率提升`  `通用脚本`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/AI验证码自动识别填充.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.2.2**　　发现时间：**2026-06-01**　　来源：[GreasyFork](https://greasyfork.org/scripts/540822-ai%E9%AA%8C%E8%AF%81%E7%A0%81%E8%87%AA%E5%8A%A8%E8%AF%86%E5%88%AB%E5%A1%AB%E5%85%85) <Badge type="tip" text="GreasyFork" />　　安装量：**612**　　评分：👍16 / 👎0

## 功能介绍

本脚本可以自动识别网页上的验证码图片，并将识别结果填入输入框。用户只需点击验证码旁的识别图标，即可触发识别，无需手动输入验证码。

## 适用网站

- 所有网站

## 使用方法

1. 安装脚本后，访问需要输入验证码的网站。
2. 在验证码输入框旁会出现一个识别图标。
3. 点击识别图标，脚本会自动识别并填写验证码。
4. 如有需要，可在浏览器菜单中调整脚本设置。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_addStyle` | 用于添加脚本自定义的样式，让识别图标和界面更美观。 |
| `GM_getValue` | 用于保存和读取脚本设置或识别结果。 |
| `GM_registerMenuCommand` | 用于在浏览器菜单中添加脚本相关的快捷操作。 |
| `GM_setValue` | 用于保存脚本的配置或临时数据。 |
| `GM_xmlhttpRequest` | 用于发送网络请求，识别验证码时与AI服务通信。 |

## 安全分析

**风险等级**：🔴 HIGH　　**安全评分**：50/100　　**分析时间**：2026-07-13

> 该脚本具备验证码自动识别和填充功能，核心逻辑依赖 GM_xmlhttpRequest 发送验证码图片数据到第三方服务器进行 AI 识别，存在数据外传和隐私采集风险。脚本依赖外部 Vue.js 库，存在一定供应链风险。未发现代码混淆和 DOM XSS 问题。建议明确告知用户数据传输目的地，限制为可信 API，最小化权限申请，并固定依赖库版本哈希。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：未知（代码未完整，无法确定）） |
| 隐私采集 | ❌ 检测到（可能读取验证码图片内容（canvas/image）用于识别） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本使用 GM_xmlhttpRequest 进行网络请求，可能将验证码图片或页面内容发送到第三方服务器进行 AI 识别。由于代码不完整，无法确认目标服务器及数据内容。  
> 位置：主逻辑（未完整展示）  
> 建议：明确告知用户数据传输目的地，限制为可信的验证码识别 API，避免发送敏感信息。

**⛔ CRITICAL** — 数据外传  
> 脚本申请了 GM_xmlhttpRequest 权限，具备跨域数据传输能力，存在隐私数据外传风险。  
> 位置：@grant 元数据  
> 建议：仅在必要时申请该权限，并限制为可信 API 域名。

**🟠 MEDIUM** — 供应链风险  
> 脚本未混淆，但存在 @require 加载第三方库（Vue.js），依赖于外部 CDN（unpkg.com），存在供应链风险。  
> 位置：@require https://unpkg.com/vue@3.4.38/dist/vue.global.prod.js  
> 建议：建议使用官方 CDN 并固定具体版本哈希，避免 CDN 污染。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM_getValue/GM_setValue/GM_registerMenuCommand 等权限，但未见全部实际使用，存在权限冗余。  
> 位置：@grant 元数据  
> 建议：仅申请实际使用的权限，减少权限面。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/540822-ai%E9%AA%8C%E8%AF%81%E7%A0%81%E8%87%AA%E5%8A%A8%E8%AF%86%E5%88%AB%E5%A1%AB%E5%85%85)*
