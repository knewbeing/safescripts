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

**风险等级**：🔴 HIGH　　**安全评分**：60/100　　**分析时间**：2026-07-06

> The script intercepts and replays XHR requests, which can potentially transmit sensitive user data externally if not properly scoped. While it appears to only target character.ai, the replay functionality is powerful and could be abused if the captured requests include sensitive information or are to third-party domains. No code obfuscation or DOM XSS risks detected. Supply chain risk is low as no @require is used. Permissions are appropriate but GM_xmlhttpRequest is a high privilege. Overall, the script is functional but carries a high risk due to its data transmission and privacy collection capabilities.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：character.ai (same-origin), Any URL captured via XHR interception (potentially same-origin only)） |
| 隐私采集 | ❌ 检测到（Captures XHR request bodies, headers, and URLs (may include sensitive data depending on original requests)） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — Data Transmission  
> The script intercepts all XMLHttpRequests and allows replaying them using GM_xmlhttpRequest. If the captured requests are to third-party domains, user data could be transmitted externally. However, the script is scoped to character.ai and appears to only replay requests to that domain.  
> 位置：XHR interception and replay logic  
> 建议：Ensure only same-origin requests are replayed. Add domain validation before replaying requests.

**🔴 HIGH** — Privacy Collection  
> The script captures request bodies, headers, and URLs, which may include sensitive user data depending on the original requests. However, it does not capture cookies or localStorage/sessionStorage directly.  
> 位置：XHR interception logic  
> 建议：Review what data is being captured and replayed. Avoid capturing or replaying sensitive information.

**🟠 MEDIUM** — Permission Abuse  
> The script uses GM_xmlhttpRequest for replay, which is a high privilege grant. It is used as intended, but the grant is powerful and could be abused if the script logic changes.  
> 位置：@grant GM_xmlhttpRequest  
> 建议：Limit usage to only necessary domains and requests.

**🟡 LOW** — Obfuscation/Remote Code Execution  
> No evidence of eval, new Function, or dynamic script injection. No code obfuscation detected.  
> 位置：Entire script  
> 建议：Maintain code clarity and avoid obfuscation.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/543645-force-deepsqueak-model)*
