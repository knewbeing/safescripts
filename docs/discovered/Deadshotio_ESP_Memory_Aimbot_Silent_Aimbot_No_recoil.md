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

**风险等级**：⛔ CRITICAL　　**安全评分**：34/100　　**分析时间**：2026-07-27

> 该脚本存在严重安全风险：动态从第三方服务器加载并 eval 执行远程代码，存在数据外传、远程代码执行和供应链污染风险。未对远程代码内容进行任何校验，且申请了高权限。强烈建议禁止使用此脚本，除非能完全审查并信任远程 index.js 内容。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：deadshot-cheat.netlify.app） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**⛔ CRITICAL** — 数据外传 & 远程代码执行  
> 脚本通过 GM_xmlhttpRequest 请求 deadshot-cheat.netlify.app/index.js，并将响应内容作为代码执行（eval），存在数据外传和远程代码执行风险。  
> 位置：fetchAndCacheCode() 和 patchImports()  
> 建议：禁止从非官方、未固定哈希的第三方域名动态加载并执行代码。建议仅使用本地代码或可信 CDN 且固定版本。

**⛔ CRITICAL** — 远程代码执行  
> 使用 eval 执行远程获取的代码，存在极高的远程代码执行风险。  
> 位置：patchImports() -> mod[TARGET_METHOD]  
> 建议：禁止使用 eval 执行动态获取的代码，尤其是来自第三方服务器。

**🟠 MEDIUM** — 供应链风险  
> 未对远程代码内容进行任何校验或哈希验证，存在供应链污染风险。  
> 位置：GM_xmlhttpRequest -> CUSTOM_SCRIPT_URL  
> 建议：建议仅加载固定版本哈希的第三方库，并验证完整性。

**🟠 MEDIUM** — 权限滥用  
> 申请了 GM_xmlhttpRequest、unsafeWindow 等高权限，且实际代码中大量使用，存在权限滥用风险。  
> 位置：元数据 @grant  
> 建议：仅申请实际需要的最低权限，避免高权限滥用。

**🟠 MEDIUM** — 代码混淆（潜在）  
> 代码未混淆，但远程加载的 index.js 可能存在混淆，无法审查其内容。  
> 位置：CUSTOM_SCRIPT_URL  
> 建议：禁止加载未知混淆代码，需审查 index.js 内容。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/572110-deadshot-io-esp-memory-aimbot-silent-aimbot-no-recoil)*
