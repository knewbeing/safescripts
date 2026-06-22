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

**风险等级**：🔴 HIGH　　**安全评分**：67/100　　**分析时间**：2026-06-22

> 该脚本核心功能为自动识别网页验证码并填充，需将验证码图片数据发送到用户自定义的第三方识别 API，存在数据外传和隐私采集风险。未发现代码混淆、远程代码执行或 DOM XSS 问题。@require 的 Vue.js 依赖未锁定哈希，存在一定供应链风险。总体安全风险较高，建议加强 API 白名单、用户提示和依赖锁定。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：User-configurable third-party API endpoints (for CAPTCHA recognition)） |
| 隐私采集 | ❌ 检测到（读取验证码图片（canvas/image）并发送到外部 API） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本通过 GM_xmlhttpRequest 将验证码图片数据发送到用户自定义的第三方 API（如 OCR/AI 识别服务），存在数据外传风险。  
> 位置：识别按钮点击事件处理逻辑，调用 GM_xmlhttpRequest 发送图片数据到外部 API。  
> 建议：仅允许可信 API 域名，默认关闭外传，增加用户警告和白名单机制。

**🟠 MEDIUM** — 供应链风险  
> @require 加载了 Vue.js 生产环境版本，来源为 unpkg CDN，未锁定具体哈希或版本文件，存在供应链风险。  
> 位置：@require https://unpkg.com/vue@3.4.38/dist/vue.global.prod.js  
> 建议：使用官方 CDN 并锁定具体版本文件或哈希，避免使用 latest 或可变链接。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM_xmlhttpRequest 权限，属于高权限，且部分用户场景下可能未使用。  
> 位置：@grant GM_xmlhttpRequest  
> 建议：仅在确实需要时申请高权限，建议动态检测并最小化权限。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/540822-ai%E9%AA%8C%E8%AF%81%E7%A0%81%E8%87%AA%E5%8A%A8%E8%AF%86%E5%88%AB%E5%A1%AB%E5%85%85)*
