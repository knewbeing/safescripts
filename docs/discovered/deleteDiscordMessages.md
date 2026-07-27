---
title: "批量删除Discord消息"
---

# 批量删除Discord消息

`消息管理`  `批量删除`  `聊天清理`  `Discord`  `隐私保护`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/deleteDiscordMessages.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**5.2.6**　　发现时间：**2026-07-27**　　来源：[victornpb/undiscord](https://github.com/victornpb/undiscord) <Badge type="tip" text="GitHub" />

## 功能介绍

此脚本可以批量删除你在 Discord 频道或私聊中的所有消息，帮助你快速清理聊天记录。操作简单，无需手动逐条删除。

## 适用网站

- Discord

## 使用方法

1. 安装脚本后，打开 Discord 网页版。
2. 进入你想要清理的频道或私聊页面。
3. 界面会出现 Undiscord 工具窗口，按提示操作即可批量删除消息。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `none` | 脚本无需额外权限，仅在网页内运行。 |

## 安全分析

**风险等级**：🟠 MEDIUM　　**安全评分**：50/100　　**分析时间**：2026-07-27

> Undiscord is a bulk message deletion tool for Discord. It transmits user authentication tokens and message deletion requests to Discord's own API endpoints, but does not send data to third-party servers. No code obfuscation, remote code execution, DOM XSS, or supply chain risks detected. The main privacy risk is the extraction of authentication tokens from localStorage. Users should be aware of the potential for token exposure. Overall, the script is transparent and does not abuse permissions.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：discord.com） |
| 隐私采集 | ❌ 检测到（Reads Discord authentication token from localStorage） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — Data Transmission  
> Script sends bulk delete requests to Discord API endpoints using fetch/XMLHttpRequest. All requests are directed to discord.com, no third-party destinations detected.  
> 位置：Bulk deletion logic (fetch/XMLHttpRequest calls)  
> 建议：Ensure only necessary data is sent to Discord API. No user data is transmitted to third-party servers.

**⛔ CRITICAL** — Privacy Collection  
> Script reads user authentication tokens from localStorage to authenticate API requests.  
> 位置：Token extraction logic (localStorage access)  
> 建议：Warn users about the risk of exposing authentication tokens. Do not transmit tokens to third-party servers.

**🔴 HIGH** — Remote Code Execution  
> No evidence of eval, new Function, setTimeout(string), or dynamic script injection. No remote code execution risk detected.  
> 位置：Entire script  
> 建议：Continue to avoid unsafe code execution patterns.

**🔴 HIGH** — Code Obfuscation  
> No code obfuscation detected. Code is readable and not minified/obfuscated.  
> 位置：Entire script  
> 建议：Maintain code transparency for user trust.

**🔴 HIGH** — DOM XSS/Injection  
> No DOM XSS or injection risks detected. User input is not directly inserted into innerHTML/outerHTML.  
> 位置：UI rendering logic  
> 建议：Continue to sanitize any user input if added in future updates.

**🟠 MEDIUM** — Permission Abuse  
> No excessive permissions requested. @grant none is used.  
> 位置：Metadata block  
> 建议：Only request permissions as needed.

**🟠 MEDIUM** — Sensitive API Usage  
> No sensitive browser APIs (geolocation, RTCPeerConnection, MediaDevices, Clipboard API, Notification API) are used.  
> 位置：Entire script  
> 建议：Avoid using sensitive APIs unless absolutely necessary.

**🟠 MEDIUM** — Supply Chain Risk  
> No @require dependencies or supply chain risks detected.  
> 位置：Metadata block  
> 建议：If adding dependencies, use official sources and fixed versions.

**🟡 LOW** — ClickJacking/Iframe Risk  
> No clickjacking or iframe manipulation detected.  
> 位置：UI logic  
> 建议：Avoid creating hidden iframes or modifying frame protection.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/victornpb/undiscord/f73f615aaeceae65d38ad5dd065950f2ed5c6dc8/deleteDiscordMessages.user.js)*
