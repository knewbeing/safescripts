---
title: "WEXI veck.io hack aimbot, ESP and Speed"
---

# WEXI veck.io hack aimbot, ESP and Speed



<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/WEXI_veckio_hack_aimbot_ESP_and_Speed.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.2**　　发现时间：**2026-04-16**　　来源：[GreasyFork](https://greasyfork.org/scripts/573903-wexi-veck-io-hack-aimbot-esp-and-speed) <Badge type="tip" text="GreasyFork" />　　安装量：**146**　　评分：👍0 / 👎0

## 功能介绍



## 适用网站

- 通用

## 使用方法

- 请参阅脚本说明

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| — | 无特殊权限 |

## 安全分析

**风险等级**：🔴 HIGH　　**安全评分**：62/100　　**分析时间**：2026-07-13

> This UserScript introduces significant security risks, primarily due to its ability to dynamically load and execute remote code, which could be exploited for remote code execution. It also stores sensitive user keys in localStorage and deletes IndexedDB data, which may impact user privacy and data persistence. The script prompts users to visit an external site for key retrieval, introducing supply chain risk. No direct data exfiltration or obfuscation was detected, and there is no evidence of DOM XSS. The script should not be considered safe for general use.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ❌ 检测到（localStorage used to store user key） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**🔴 HIGH** — Remote Code Execution  
> The script dynamically loads and executes remote JavaScript code using fetch() and new Function(). The URL is not hardcoded in the provided code, but the loadscript function can be called with arbitrary URLs, which is a remote code execution risk.  
> 位置：loadscript(url) function  
> 建议：Avoid dynamic code execution via new Function() and only use trusted, version-pinned @require resources.

**🟠 MEDIUM** — Privacy Collection  
> The script stores and reads a user key in localStorage for authentication. While not directly exfiltrating data, this is a form of local privacy-sensitive data storage.  
> 位置：localStorage.getItem('wx_user_key') and localStorage.setItem('wx_user_key', input)  
> 建议：Minimize storage of sensitive data in localStorage; consider session-based memory storage if possible.

**🟠 MEDIUM** — Sensitive API Usage  
> The script deletes the IndexedDB database 'UnityCache', which may impact user data persistence for the site.  
> 位置：indexedDB.deleteDatabase("UnityCache")  
> 建议：Warn users before deleting site data; only clear caches if necessary.

**🟠 MEDIUM** — Supply Chain Risk  
> The script creates an overlay that prompts the user to visit an external site (https://wexi.qzz.io/key) to obtain a daily key. This is a potential supply chain risk if the external site is compromised.  
> 位置：Overlay HTML and link to https://wexi.qzz.io/key  
> 建议：Ensure the external key provider is trustworthy and uses HTTPS. Consider providing keys in a more secure, verifiable manner.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/573903-wexi-veck-io-hack-aimbot-esp-and-speed)*
