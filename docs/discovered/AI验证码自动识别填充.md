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

**风险等级**：🟠 MEDIUM　　**安全评分**：76/100　　**分析时间**：2026-06-01

> 该脚本主要通过样式和 @require 加载 Vue.js，未见明显的数据外传、隐私采集、远程代码执行或混淆行为。主要风险为供应链风险（未锁定第三方库版本）和权限滥用（申请了未使用的高权限）。如后续代码涉及验证码图片上传到第三方服务器，则需重点关注数据外传和隐私泄露风险。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**🟠 MEDIUM** — Supply Chain Risk  
> 脚本通过 @require 加载了 Vue.js 生产环境版本，虽然为官方 CDN，但未锁定具体哈希，存在供应链污染风险。  
> 位置：@require https://unpkg.com/vue@3.4.38/dist/vue.global.prod.js  
> 建议：建议使用官方 CDN 并锁定具体版本哈希，或使用可信 CDN（如 jsdelivr、cdnjs）并指定精确版本。

**🟠 MEDIUM** — Permission Abuse  
> 脚本申请了 GM_xmlhttpRequest 权限，但在提供的代码片段中未见实际使用。若后续代码存在将验证码图片或页面内容上传到第三方服务器用于 AI 识别，则存在数据外传和隐私泄露风险。  
> 位置：@grant GM_xmlhttpRequest  
> 建议：仅在必要时申请 GM_xmlhttpRequest 权限，并确保所有外发请求目的明确、透明。

**🟠 MEDIUM** — Permission Abuse  
> 脚本申请了 GM_getValue/GM_setValue/GM_registerMenuCommand 等权限，但在当前代码片段中未见实际使用。  
> 位置：@grant GM_getValue, GM_setValue, GM_registerMenuCommand  
> 建议：建议仅申请实际需要的权限，减少权限滥用风险。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/540822-ai%E9%AA%8C%E8%AF%81%E7%A0%81%E8%87%AA%E5%8A%A8%E8%AF%86%E5%88%AB%E5%A1%AB%E5%85%85)*
