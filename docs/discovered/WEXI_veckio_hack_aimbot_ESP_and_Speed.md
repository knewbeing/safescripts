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

**风险等级**：⛔ CRITICAL　　**安全评分**：35/100　　**分析时间**：2026-05-25

> This script poses critical security risks due to dynamic remote code execution, external data transmission, and storage of sensitive keys in localStorage. It allows arbitrary code to be fetched and executed, which can compromise user privacy and security. Use with extreme caution.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：https://wexi.qzz.io/key, Remote URL via loadscript(url) (dynamic, user-controlled)） |
| 隐私采集 | ❌ 检测到（Stores user access key in localStorage） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**⛔ CRITICAL** — Remote Code Execution  
> The script dynamically loads and executes remote JavaScript code using fetch and new Function, allowing arbitrary code execution from any URL passed to loadscript().  
> 位置：loadscript(url) function  
> 建议：Avoid dynamic code execution from remote sources. Only load trusted, versioned scripts and validate URLs.

**⛔ CRITICAL** — Data Transmission  
> The script references an external key retrieval page (https://wexi.qzz.io/key) and encourages users to visit it, potentially exposing users to phishing or malicious content.  
> 位置：wxKeyGate overlay (Get Daily Key link)  
> 建议：Ensure the external key page is trustworthy and does not collect sensitive information.

**🔴 HIGH** — Privacy Collection  
> The script stores the user-provided access key in localStorage, which is accessible to any script running on the same domain.  
> 位置：localStorage.setItem('wx_user_key', input)  
> 建议：Consider encrypting sensitive keys or using more secure storage mechanisms.

**🔴 HIGH** — Remote Code Execution  
> The script uses new Function to execute fetched code, which is equivalent to eval and poses a high security risk.  
> 位置：loadscript(url) function  
> 建议：Avoid using new Function or eval for executing remote code.

**🟠 MEDIUM** — Sensitive API Usage  
> The script deletes the IndexedDB database 'UnityCache', which may disrupt normal game operation or cause loss of cached data.  
> 位置：indexedDB.deleteDatabase("UnityCache")  
> 建议：Warn users before deleting browser storage and ensure it is necessary.

**🟡 LOW** — Permission Usage  
> The script requests no @grant permissions, but uses localStorage and indexedDB, which are accessible in the page context.  
> 位置：@grant none  
> 建议：Review permission usage and minimize access to sensitive APIs.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/573903-wexi-veck-io-hack-aimbot-esp-and-speed)*
