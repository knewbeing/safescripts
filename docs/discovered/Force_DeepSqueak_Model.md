---
title: "强制使用 DeepSqueak 模型"
---

# 强制使用 DeepSqueak 模型

`AI聊天`  `模型切换`  `Character.AI`  `增强功能`  `网络请求拦截`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Force_DeepSqueak_Model.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.0**　　发现时间：**2026-05-25**　　来源：[GreasyFork](https://greasyfork.org/scripts/543645-force-deepsqueak-model) <Badge type="tip" text="GreasyFork" />　　安装量：**982**　　评分：👍5 / 👎0

## 功能介绍

本脚本可强制将当前聊天使用的模型切换为最新的 DeepSqueak 模型。它会拦截并记录最近的网络请求，并允许用户重放这些请求，从而实现模型切换。适合希望体验新模型的 Character.AI 用户。

## 适用网站

- Character.AI

## 使用方法

1. 安装脚本后，进入 Character.AI 网站。
2. 在页面右上角或脚本菜单中找到“强制使用 DeepSqueak 模型”命令。
3. 点击该命令，确认后即可切换当前聊天模型为 DeepSqueak。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_registerMenuCommand` | 在菜单中添加自定义命令，方便用户操作脚本功能。 |
| `GM_setValue` | 保存脚本设置或数据，例如请求历史。 |
| `GM_getValue` | 读取脚本保存的数据，如请求历史。 |
| `GM_xmlhttpRequest` | 发送自定义网络请求，支持重放和修改请求内容。 |

## 安全分析

**风险等级**：🔴 HIGH　　**安全评分**：49/100　　**分析时间**：2026-05-25

> The script intercepts and replays XHR requests, which can lead to data exfiltration if requests target third-party endpoints or contain sensitive information. No code obfuscation, DOM XSS, or supply chain risks detected. Permissions are appropriate but should be monitored. User should be warned about replaying potentially sensitive requests.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：character.ai (same-origin, as per @match), Any URL captured by XHR interception (potentially third-party if user interacts with such endpoints)） |
| 隐私采集 | ❌ 检测到（Captures request bodies and headers via XHR interception, which may include sensitive data depending on user actions.） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — Data Exfiltration Risk  
> The script intercepts all XMLHttpRequests and allows replaying them using GM_xmlhttpRequest. If the captured requests target third-party endpoints, user data could be transmitted externally.  
> 位置：XHR interception and replay logic  
> 建议：Restrict replay to known safe endpoints or warn users about potential data exfiltration.

**🟠 MEDIUM** — Potential Privacy Collection  
> The script captures request bodies, headers, and URLs, which may include sensitive information depending on user actions. However, it does not actively read cookies, localStorage, or form fields.  
> 位置：XHR interception logic  
> 建议：Ensure only non-sensitive requests are replayed; add user warnings.

**🟠 MEDIUM** — Permission Usage  
> GM_xmlhttpRequest is granted and used for replaying requests, which is appropriate but could be abused if the script logic changes.  
> 位置：@grant and replay logic  
> 建议：Review permission usage regularly; avoid unnecessary high-privilege grants.

**🟡 LOW** — Obfuscation/Remote Code Execution  
> No evidence of eval, new Function, or dynamic script injection. No code obfuscation detected.  
> 位置：Entire script  
> 建议：Maintain code clarity and avoid dynamic code execution.

**🟡 LOW** — DOM XSS  
> No DOM XSS or injection risks found. User input is not inserted into the DOM.  
> 位置：Entire script  
> 建议：Continue to avoid unsafe DOM manipulation.

**🟡 LOW** — Supply Chain  
> No supply chain risk: no @require or external library usage.  
> 位置：Metadata  
> 建议：If adding dependencies, use official sources and fixed versions.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/543645-force-deepsqueak-model)*
