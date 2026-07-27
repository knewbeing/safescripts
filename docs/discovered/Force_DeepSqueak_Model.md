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

**风险等级**：🟠 MEDIUM　　**安全评分**：76/100　　**分析时间**：2026-07-27

> The script intercepts and replays XHR requests within the character.ai domain, modifying PATCH requests to force a specific model type. No evidence of third-party data exfiltration, code obfuscation, or DOM XSS. However, replaying captured requests may inadvertently transmit sensitive data or cause unintended actions. The script does not access cookies, localStorage, or browser fingerprint APIs. Supply chain risk is minimal as no external libraries are loaded. Overall, the script is reasonably safe for its intended purpose but users should be aware of potential risks when replaying requests.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：character.ai (same as page origin), Any endpoint previously captured by XHR interception (but only within character.ai domain)） |
| 隐私采集 | ❌ 检测到（Captures XHR request headers and body, which may include user data depending on the site’s API usage.） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**🟠 MEDIUM** — Data Replay Risk  
> The script intercepts and replays XHR requests using GM_xmlhttpRequest. All replayed requests target the same origin (character.ai), but replaying PATCH requests with modified payloads could cause unintended side effects or data duplication.  
> 位置：Replay Logic (replayLastRequests function)  
> 建议：Warn users about potential risks and ensure replayed requests do not leak sensitive data or cause destructive actions.

**🟠 MEDIUM** — Data Transmission  
> GM_xmlhttpRequest is granted and used, but only for same-origin requests. No evidence of third-party data exfiltration.  
> 位置：GM_xmlhttpRequest usage  
> 建议：Monitor for any future changes that might allow requests to external domains.

**🟠 MEDIUM** — Privacy Collection  
> The script overrides XMLHttpRequest methods to capture request details, including headers and body. If sensitive data is transmitted via XHR, it will be stored in xhrHistory and potentially replayed.  
> 位置：XHR Interception  
> 建议：Ensure captured data does not include sensitive information such as authentication tokens or user credentials.

**🟡 LOW** — Permission Usage  
> The script requests GM_xmlhttpRequest permission, which is used appropriately. No evidence of unused high-risk permissions.  
> 位置：Metadata (@grant)  
> 建议：Remove unused permissions if not needed in future versions.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/543645-force-deepsqueak-model)*
