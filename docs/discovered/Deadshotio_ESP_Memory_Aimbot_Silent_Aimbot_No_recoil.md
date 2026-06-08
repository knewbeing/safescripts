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

**风险等级**：⛔ CRITICAL　　**安全评分**：0/100　　**分析时间**：2026-06-08

> 该脚本存在严重安全风险：动态拉取并 eval 执行远程代码，主动与第三方服务器通信，权限申请冗余，且未对远程代码进行校验。极易被用于后门、恶意代码注入或供应链攻击。强烈不建议使用。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：https://deadshot-cheat.netlify.app/index.js） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**⛔ CRITICAL** — 远程代码执行  
> 脚本通过 GM_xmlhttpRequest 动态从 https://deadshot-cheat.netlify.app/index.js 拉取远程 JS 代码，并 eval 执行，属于远程代码执行高危行为。  
> 位置：fetchAndCacheCode() 和 patchImports() 中 (0, eval)(customCode)  
> 建议：禁止动态加载和执行远程代码，改为本地集成或固定版本哈希的 @require。

**⛔ CRITICAL** — 数据外传  
> 脚本通过 GM_xmlhttpRequest 主动访问第三方服务器 deadshot-cheat.netlify.app，可能导致用户信息、环境信息被第三方服务器收集。  
> 位置：fetchAndCacheCode()  
> 建议：仅允许访问可信、必要的服务器，避免向第三方域名发送请求。

**🔴 HIGH** — 远程代码执行  
> 脚本使用 eval 执行远程拉取的代码，极易被利用为后门或植入恶意代码。  
> 位置：patchImports() 中 (0, eval)(customCode)  
> 建议：禁止使用 eval 执行外部代码。

**🟠 MEDIUM** — 供应链风险  
> 脚本未对拉取的远程代码进行任何校验（如哈希校验），存在供应链污染风险。  
> 位置：fetchAndCacheCode()  
> 建议：固定远程代码版本或进行哈希校验，避免供应链攻击。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 unsafeWindow、GM_xmlhttpRequest、GM_setValue、GM_getValue 等高权限，但未见对 unsafeWindow 的直接使用，存在权限冗余。  
> 位置：元数据 @grant  
> 建议：仅申请实际需要的权限，移除未使用的高权限。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/572110-deadshot-io-esp-memory-aimbot-silent-aimbot-no-recoil)*
