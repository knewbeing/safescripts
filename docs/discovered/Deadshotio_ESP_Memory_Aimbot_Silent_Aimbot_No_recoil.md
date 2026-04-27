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

**风险等级**：⛔ CRITICAL　　**安全评分**：35/100　　**分析时间**：2026-04-27

> 该脚本存在严重安全风险：动态加载并 eval 执行远程代码，目标服务器为非官方第三方域名，存在数据外传、远程代码执行和供应链污染风险。未发现直接隐私采集，但远程代码不可审查，可能存在隐私泄露。强烈建议禁止使用此脚本。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：deadshot-cheat.netlify.app） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**⛔ CRITICAL** — Data Exfiltration & Remote Code Execution  
> 脚本通过 GM_xmlhttpRequest 向 deadshot-cheat.netlify.app 发起网络请求，下载并执行远程 JavaScript 代码，存在数据外传和远程代码执行风险。  
> 位置：fetchAndCacheCode() 函数，CUSTOM_SCRIPT_URL  
> 建议：禁止从非官方、未固定版本哈希的第三方域名动态加载和执行代码。仅允许本地或可信 CDN 固定版本。

**⛔ CRITICAL** — Remote Code Execution  
> 脚本使用 eval 执行远程获取的代码，存在远程代码执行风险，攻击者可随时更换 payload。  
> 位置：patchImports() 函数，mod[TARGET_METHOD] = (...args) => { eval(customCode); }  
> 建议：禁止使用 eval 执行动态获取的代码，避免 RCE。建议采用本地静态代码或固定版本哈希。

**🔴 HIGH** — Remote Code Execution  
> 脚本通过 eval 执行远程代码，属于高度危险的远程代码执行行为。  
> 位置：patchImports() 函数  
> 建议：禁止 eval，采用安全的代码注入方式。

**🔴 HIGH** — Obfuscation (Potential)  
> 脚本未混淆，但远程加载的 index.js 可能存在混淆，无法审查其内容。  
> 位置：CUSTOM_SCRIPT_URL  
> 建议：禁止加载不可审查的混淆代码。

**🟠 MEDIUM** — Supply Chain Risk  
> 脚本未对远程代码来源进行校验（如哈希校验），存在供应链风险。  
> 位置：CUSTOM_SCRIPT_URL，GM_xmlhttpRequest  
> 建议：仅允许加载官方 CDN 且固定版本哈希的第三方库，禁止可变 URL。

**🟠 MEDIUM** — Permission Abuse  
> 脚本申请了 GM_xmlhttpRequest、unsafeWindow 等高权限，但实际用途仅为远程代码加载，存在权限滥用风险。  
> 位置：元数据 @grant  
> 建议：仅申请实际需要的最低权限，避免滥用。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/572110-deadshot-io-esp-memory-aimbot-silent-aimbot-no-recoil)*
