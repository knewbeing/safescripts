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

**风险等级**：🔴 HIGH　　**安全评分**：77/100　　**分析时间**：2026-06-08

> 该脚本未检测到明显的数据外传或隐私采集行为，但存在高度压缩代码（难以直接审查）、供应链风险（@require 未固定哈希）及权限滥用（申请 GM_xmlhttpRequest 未见使用）。建议提供未压缩源码并修正上述问题。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ❌ 检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**🔴 HIGH** — Obfuscation  
> 脚本为高度压缩单行代码，难以直接审查全部逻辑，存在代码混淆风险。  
> 位置：主代码体  
> 建议：建议提供未压缩源码以便全面安全审查。

**🟠 MEDIUM** — Supply Chain Risk  
> 脚本通过 @require 加载了 Vue.js，但未固定具体哈希版本，存在供应链污染风险。  
> 位置：@require https://unpkg.com/vue@3.4.38/dist/vue.global.prod.js  
> 建议：建议使用官方 CDN 并固定具体版本哈希，或自行托管已审核的库文件。

**🟠 MEDIUM** — Permission Abuse  
> 脚本申请了 GM_xmlhttpRequest 权限，但在当前代码片段中未见实际使用。  
> 位置：@grant GM_xmlhttpRequest  
> 建议：如无实际用途，建议移除高权限申请，减少潜在攻击面。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/540822-ai%E9%AA%8C%E8%AF%81%E7%A0%81%E8%87%AA%E5%8A%A8%E8%AF%86%E5%88%AB%E5%A1%AB%E5%85%85)*
