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

**风险等级**：🟠 MEDIUM　　**安全评分**：50/100　　**分析时间**：2026-06-29

> 该脚本的主要安全风险在于验证码图片的外传能力。用户可自定义识别 API，若配置为恶意第三方，验证码图片（可能包含部分页面信息）将被上传，存在隐私泄露风险。未发现隐私采集、远程代码执行、代码混淆、DOM XSS 等高危问题。依赖的第三方库来源可信。建议仅配置可信的验证码识别服务，谨防数据泄露。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：User-configurable third-party API endpoint (for CAPTCHA recognition)） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本通过 GM_xmlhttpRequest 将验证码图片（base64）发送到用户配置的第三方 API 进行识别。该 API 地址可由用户自定义，默认无外传，但如配置为第三方服务则存在数据外传风险。  
> 位置：识别按钮点击事件处理逻辑、API 请求部分  
> 建议：仅使用可信的验证码识别 API，避免配置为恶意或不受信任的第三方服务。

**⛔ CRITICAL** — 数据外传  
> 脚本申请了 GM_xmlhttpRequest 权限，并允许用户自定义识别 API，存在将页面验证码图片外传的能力。  
> 位置：@grant GM_xmlhttpRequest, 设置界面、API 配置逻辑  
> 建议：限制 API 配置范围，或增加 API 白名单机制。

**🟡 LOW** — 隐私采集  
> 脚本未检测到对页面 cookie、localStorage、sessionStorage、IndexedDB、剪贴板、表单密码等敏感信息的读取。  
> 位置：全局代码  
> 建议：保持现状，勿增加隐私采集行为。

**🟡 LOW** — 供应链风险  
> @require 加载了官方 CDN 的 Vue 3.4.38，来源可信，且为固定版本。  
> 位置：@require 元数据  
> 建议：保持现状，确保依赖来源安全。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/540822-ai%E9%AA%8C%E8%AF%81%E7%A0%81%E8%87%AA%E5%8A%A8%E8%AF%86%E5%88%AB%E5%A1%AB%E5%85%85)*
