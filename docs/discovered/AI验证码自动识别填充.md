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

**风险等级**：⛔ CRITICAL　　**安全评分**：42/100　　**分析时间**：2026-07-06

> 该脚本存在严重的数据外传和隐私采集风险：验证码图片会被发送到用户配置的第三方API进行识别，可能泄露页面内容和用户隐私。@require 加载的 Vue.js 未固定哈希存在供应链风险。建议仅在信任环境下使用，并警示用户外传风险。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：第三方验证码识别API（用户配置，默认无）） |
| 隐私采集 | ❌ 检测到（验证码图片采集, 页面验证码输入框自动填充） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本通过 GM_xmlhttpRequest 将验证码图片发送到用户配置的第三方识别API进行识别，可能包含敏感页面内容或验证码图片。  
> 位置：识别图标点击事件处理函数，GM_xmlhttpRequest 调用  
> 建议：仅允许用户明确配置可信的API，警示用户数据外传风险，建议默认关闭外传功能。

**⛔ CRITICAL** — 隐私采集  
> 脚本会读取验证码图片并将其发送到外部API，属于隐私采集行为（验证码图片可能包含用户信息或页面特征）。  
> 位置：验证码图片采集与API请求逻辑  
> 建议：告知用户图片内容可能被外部服务收集，建议仅使用可信API。

**🟠 MEDIUM** — 供应链风险  
> @require 加载的 Vue.js 来自 unpkg CDN，未固定版本哈希，存在供应链风险。  
> 位置：@require https://unpkg.com/vue@3.4.38/dist/vue.global.prod.js  
> 建议：建议使用官方 CDN 并固定版本哈希，避免 CDN 污染。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM_xmlhttpRequest 高权限，实际用于外部API请求，权限申请合理但需警惕滥用。  
> 位置：元数据 @grant GM_xmlhttpRequest  
> 建议：确保仅用于验证码识别API，不用于其他敏感数据外传。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/540822-ai%E9%AA%8C%E8%AF%81%E7%A0%81%E8%87%AA%E5%8A%A8%E8%AF%86%E5%88%AB%E5%A1%AB%E5%85%85)*
