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

**风险等级**：🔴 HIGH　　**安全评分**：75/100　　**分析时间**：2026-07-27

> 该脚本核心功能为自动识别网页验证码并填充，识别过程会将验证码图片通过 GM_xmlhttpRequest 发送到用户自定义的第三方 API 进行识别，存在数据外传风险。未发现隐私采集、远程代码执行、代码混淆、DOM XSS 等高危问题。@require 的 Vue 3 来源可信，未发现供应链风险。整体安全性较高，但因数据外传为核心功能，安全评分为 75，风险等级为 HIGH。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：User-configurable third-party API endpoints (for CAPTCHA recognition)） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本通过 GM_xmlhttpRequest 将验证码图片（base64）发送到用户配置的第三方 API 进行识别，属于数据外传行为。  
> 位置：识别按钮点击事件处理逻辑、API 配置相关代码  
> 建议：确保用户明确知晓数据将发送到第三方服务器，建议默认关闭并提示风险。仅允许可信 API，或增加白名单校验。

**🔴 HIGH** — 远程代码执行  
> 脚本未发现 eval、new Function、setTimeout(string) 等远程代码执行高危用法。  
> 位置：全局代码  
> 建议：无

**🟡 LOW** — 隐私采集  
> 脚本未发现监听键盘输入、读取表单密码字段、读取剪贴板等隐私采集行为。  
> 位置：全局代码  
> 建议：无

**🟡 LOW** — 供应链风险  
> @require 加载了官方 CDN 的 Vue 3，来源可信，且为固定版本。  
> 位置：元数据 @require  
> 建议：无

**🟡 LOW** — 权限滥用  
> 脚本申请了 GM_xmlhttpRequest 权限，实际用于识别 API 调用，未发现权限滥用。  
> 位置：元数据 @grant  
> 建议：无

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/540822-ai%E9%AA%8C%E8%AF%81%E7%A0%81%E8%87%AA%E5%8A%A8%E8%AF%86%E5%88%AB%E5%A1%AB%E5%85%85)*
