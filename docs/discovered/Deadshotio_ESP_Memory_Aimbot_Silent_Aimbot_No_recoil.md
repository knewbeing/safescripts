---
title: "Deadshot.io ESP & Memory Aimbot & Silent Aimbot & No recoil"
---

# Deadshot.io ESP & Memory Aimbot & Silent Aimbot & No recoil



<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Deadshotio_ESP_Memory_Aimbot_Silent_Aimbot_No_recoil.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.0.6**　　发现时间：**2026-04-20**　　来源：[GreasyFork](https://greasyfork.org/scripts/572110-deadshot-io-esp-memory-aimbot-silent-aimbot-no-recoil) <Badge type="tip" text="GreasyFork" />　　安装量：**827**　　评分：👍4 / 👎2

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

**风险等级**：⛔ CRITICAL　　**安全评分**：0/100　　**分析时间**：2026-06-22

> This UserScript presents a critical security risk. It dynamically fetches and executes remote JavaScript code using eval(), granting the remote server full control over the user's browser context. This exposes users to arbitrary code execution, data theft, and other severe threats. The use of high-privilege permissions and unpinned remote code further increases the risk. This script should NOT be approved or used in any secure environment.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：https://deadshot-cheat.netlify.app/index.js） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**⛔ CRITICAL** — Remote Code Execution  
> The script fetches and executes remote JavaScript code from https://deadshot-cheat.netlify.app/index.js at runtime using eval(). This is a critical remote code execution risk, as the remote code can be changed at any time and executed with full user privileges.  
> 位置：fetchAndCacheCode() and patchImports() functions  
> 建议：Avoid dynamic code execution from remote sources. Bundle all code with the script and avoid eval(). If remote code is necessary, use integrity checks and fixed versions.

**🔴 HIGH** — Dynamic Code Execution  
> The script uses eval() to execute arbitrary code loaded from a remote server. This is a high-severity security risk.  
> 位置：patchImports() function: (0, eval)(customCode);  
> 建议：Do not use eval() on untrusted or remote code. Refactor to avoid eval() entirely.

**🟠 MEDIUM** — Permission Overuse  
> The script requests GM_xmlhttpRequest and unsafeWindow permissions, which are high-privilege and can be abused if the script or remote code is compromised.  
> 位置：UserScript metadata  
> 建议：Minimize permissions to only those required. Avoid unsafeWindow and GM_xmlhttpRequest unless absolutely necessary.

**🟠 MEDIUM** — Supply Chain Risk  
> The script loads remote code from a non-official domain (deadshot-cheat.netlify.app) without version pinning or integrity verification, introducing supply chain risk.  
> 位置：CUSTOM_SCRIPT_URL and fetchAndCacheCode()  
> 建议：Only load code from trusted, official sources with version pinning and integrity checks.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/572110-deadshot-io-esp-memory-aimbot-silent-aimbot-no-recoil)*
