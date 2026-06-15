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

**风险等级**：🔴 HIGH　　**安全评分**：47/100　　**分析时间**：2026-06-15

> 该脚本通过 GM_xmlhttpRequest 将验证码图片发送到用户配置的第三方 API 进行识别，存在数据外传和隐私采集风险。脚本未混淆，未检测到 DOM XSS，但存在权限滥用和供应链风险。建议限制 API 端点、严格筛选表单字段、并采用更安全的第三方库加载方式。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：User-configurable third-party CAPTCHA recognition API endpoints） |
| 隐私采集 | ❌ 检测到（Reads input fields for CAPTCHA values, Potential to read other form fields if selector is too broad） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**⛔ CRITICAL** — Data Transmission  
> Script uses GM_xmlhttpRequest to send CAPTCHA images to user-configured third-party API endpoints for recognition. This may transmit sensitive page content (CAPTCHA images) to external servers.  
> 位置：GM_xmlhttpRequest usage in CAPTCHA recognition logic  
> 建议：Warn users about privacy risks; restrict API endpoints to trusted services; avoid sending additional user data.

**⛔ CRITICAL** — Privacy Collection  
> Script reads input fields (including those for CAPTCHA) and fills them automatically. If misused or extended, could be leveraged to read other sensitive form fields.  
> 位置：Input field selection and value assignment logic  
> 建议：Restrict field access strictly to CAPTCHA fields; avoid reading password or other sensitive fields.

**🟠 MEDIUM** — Permission Abuse  
> Script requests GM_xmlhttpRequest permission, which is high privilege and could be abused for arbitrary network requests.  
> 位置：@grant GM_xmlhttpRequest in metadata  
> 建议：Limit usage to only necessary API calls; review for potential abuse.

**🟠 MEDIUM** — Supply Chain Risk  
> Script uses @require to load Vue.js from unpkg.com CDN, which is a reputable source but not version-hashed. Supply chain risk if CDN is compromised or version changes.  
> 位置：@require https://unpkg.com/vue@3.4.38/dist/vue.global.prod.js  
> 建议：Use version-hashed URLs or official CDN with integrity checks.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/540822-ai%E9%AA%8C%E8%AF%81%E7%A0%81%E8%87%AA%E5%8A%A8%E8%AF%86%E5%88%AB%E5%A1%AB%E5%85%85)*
