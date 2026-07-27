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

**风险等级**：⛔ CRITICAL　　**安全评分**：35/100　　**分析时间**：2026-07-27

> This script poses a critical security risk due to its ability to fetch and execute arbitrary remote code via new Function, which can lead to remote code execution and data exfiltration. It also collects user input and stores it in localStorage. Supply chain risks are present due to untrusted code loading. The script should not be approved for use in its current form.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：Arbitrary URL via loadscript(url) (potentially any remote server)） |
| 隐私采集 | ❌ 检测到（localStorage: wx_user_key） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**⛔ CRITICAL** — Remote Code Execution/Data Exfiltration  
> The function loadscript(url) fetches remote JavaScript code from an arbitrary URL and executes it via new Function(code), which is equivalent to eval. This allows remote code execution and potential data exfiltration.  
> 位置：loadscript(url) function  
> 建议：Remove dynamic remote code loading or restrict to trusted, versioned sources. Avoid using new Function or eval for executing fetched code.

**🔴 HIGH** — Remote Code Execution  
> The script uses new Function(code) to execute fetched code, which is a high-risk pattern for remote code execution.  
> 位置：loadscript(url) function  
> 建议：Replace new Function with static, locally-audited code. Never execute arbitrary code from remote sources.

**🟠 MEDIUM** — Supply Chain Risk  
> The script fetches code from arbitrary URLs, which can be abused for supply chain attacks if the URL is not trusted or versioned.  
> 位置：loadscript(url) function  
> 建议：Only load code from official, versioned, and hash-locked sources. Avoid arbitrary URLs.

**🟠 MEDIUM** — Privacy Collection  
> The script accesses localStorage to store and retrieve user input (key gate overlay).  
> 位置：wxKeyGate function  
> 建议：Ensure no sensitive information is stored in localStorage. Do not store authentication keys or secrets.

**🟡 LOW** — Permission/Storage Manipulation  
> The script deletes the IndexedDB database 'UnityCache', which may affect game functionality or user data.  
> 位置：indexedDB.deleteDatabase("UnityCache")  
> 建议：Warn users before deleting local databases. Ensure this action is necessary and safe.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/574026-wexi-veck-io-cracked-by-terra)*
