---
title: "WEXI Veck.io CRACKED by Terra"
---

# WEXI Veck.io CRACKED by Terra



<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/WEXI_Veckio_CRACKED_by_Terra.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.2.1**　　发现时间：**2026-04-20**　　来源：[GreasyFork](https://greasyfork.org/scripts/574026-wexi-veck-io-cracked-by-terra) <Badge type="tip" text="GreasyFork" />　　安装量：**198**　　评分：👍0 / 👎0

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

> This script poses a critical security risk due to remote code execution via fetch and new Function, allowing arbitrary external code to run in the user's browser. It also collects user input in localStorage and deletes IndexedDB databases. Use with extreme caution; do not approve for general use.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：Arbitrary URL via loadscript(url) (fetch)） |
| 隐私采集 | ❌ 检测到（localStorage usage for storing user input） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**⛔ CRITICAL** — Remote Code Execution  
> The script uses fetch to load arbitrary external JavaScript via the loadscript(url) function, then executes it using new Function(code). This allows remote code execution if the URL is attacker-controlled.  
> 位置：loadscript(url) function  
> 建议：Restrict external script loading to trusted, versioned sources. Avoid dynamic code execution from untrusted URLs.

**🔴 HIGH** — Remote Code Execution  
> The script uses new Function(code) to execute fetched code, which is equivalent to eval and poses a high risk of arbitrary code execution.  
> 位置：loadscript(url) function  
> 建议：Avoid using new Function or eval for executing remote code. Use static, vetted scripts.

**🟠 MEDIUM** — Privacy Collection  
> The script reads and writes to localStorage for storing user input (key gate overlay). While not critical, this is a privacy collection vector.  
> 位置：wxKeyGate function  
> 建议：Ensure no sensitive information is stored in localStorage. Consider encrypting or minimizing stored data.

**🟠 MEDIUM** — Sensitive API Usage  
> The script deletes the IndexedDB database 'UnityCache', which may impact game functionality or user data.  
> 位置：indexedDB.deleteDatabase("UnityCache")  
> 建议：Warn users before deleting browser storage. Only delete if necessary and with user consent.

**🟠 MEDIUM** — Supply Chain Risk  
> No supply chain risk detected in @require, but the loadscript function allows arbitrary external code loading, which is a supply chain risk.  
> 位置：loadscript(url) function  
> 建议：Only load scripts from trusted, versioned sources. Avoid dynamic URLs.

**🟡 LOW** — Obfuscation  
> No code obfuscation detected, but the script is incomplete and may be minified or obfuscated in other parts.  
> 位置：General code structure  
> 建议：Review full script for obfuscation or hidden malicious logic.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/574026-wexi-veck-io-cracked-by-terra)*
