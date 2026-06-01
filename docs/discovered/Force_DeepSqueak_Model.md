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

**风险等级**：🟡 LOW　　**安全评分**：89/100　　**分析时间**：2026-06-01

> The script is generally safe. It intercepts and replays up to 5 recent XHR requests, but only to the original domain (character.ai). No third-party data exfiltration, privacy-invasive behavior, or code execution risks were found. The main risk is accidental replay of sensitive or state-changing requests, which is mitigated by user confirmation prompts. Logging of request details to the console could expose sensitive data if present. No obfuscation or supply chain risks detected.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：https://character.ai/*） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**🟠 MEDIUM** — Data Replay Risk  
> The script intercepts and replays up to 5 recent XMLHttpRequests using GM_xmlhttpRequest. All requests are sent only to the original domain (character.ai), and no user data is sent to third-party servers. However, replaying requests could potentially duplicate actions or leak sensitive data if the captured requests contain such information.  
> 位置：XHR interception and replay logic (entire script)  
> 建议：Warn users about the risks of replaying requests, especially if sensitive actions are involved. Ensure users understand the consequences.

**🟡 LOW** — Permission Usage  
> The script requests GM_xmlhttpRequest permission, which is used only for replaying requests to the same domain. No evidence of third-party exfiltration or abuse.  
> 位置：@grant metadata and replay logic  
> 建议：No action needed, but periodically review for scope creep.

**🟡 LOW** — Information Disclosure  
> The script logs captured request details and replay results to the browser console. If sensitive data is present in requests, it may be exposed in the console.  
> 位置：console.log statements throughout replay logic  
> 建议：Consider redacting or minimizing sensitive data in logs.

**🟡 LOW** — Code Clarity  
> The script does not use eval, new Function, or dynamic script injection. No obfuscation detected.  
> 位置：N/A  
> 建议：No action needed.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/543645-force-deepsqueak-model)*
