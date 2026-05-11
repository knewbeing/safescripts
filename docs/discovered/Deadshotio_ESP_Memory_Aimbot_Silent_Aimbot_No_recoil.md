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

**风险等级**：⛔ CRITICAL　　**安全评分**：0/100　　**分析时间**：2026-05-11

> 该脚本存在极高安全风险：动态拉取并 eval 执行远程代码，未锁定版本，存在严重的远程代码执行和供应链攻击风险。远程代码可随时更改，可能导致隐私数据泄露、恶意行为注入等。强烈不建议使用。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：https://deadshot-cheat.netlify.app/index.js） |
| 隐私采集 | ❌ 检测到（本地脚本未直接采集隐私数据，但远程 index.js 代码不可控，存在隐私采集风险。） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**⛔ CRITICAL** — 远程代码执行/供应链风险  
> 脚本通过 GM_xmlhttpRequest 动态从 https://deadshot-cheat.netlify.app/index.js 拉取远程代码，并未固定版本或哈希，存在严重供应链风险和远程代码执行风险。  
> 位置：fetchAndCacheCode() 函数  
> 建议：禁止动态加载未固定哈希的远程代码，改为本地集成或使用可信 CDN 并锁定版本。

**⛔ CRITICAL** — 远程代码执行  
> 拉取到的远程代码通过 eval 执行，属于典型的远程代码执行（RCE）高危行为。  
> 位置：mod[TARGET_METHOD] = (...args) => { (0, eval)(customCode); ... }  
> 建议：严禁使用 eval 执行外部代码，尤其是网络获取的内容。

**🔴 HIGH** — 隐私采集风险  
> 脚本未直接采集隐私数据，但远程拉取的 index.js 代码不可控，可能包含隐私采集行为。  
> 位置：远程 index.js  
> 建议：禁止动态加载远程代码，或对远程代码进行严格审计。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 unsafeWindow 权限，增加了与页面直接交互的攻击面。  
> 位置：@grant unsafeWindow  
> 建议：如非必要，移除 unsafeWindow 权限。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM_xmlhttpRequest、GM_setValue、GM_getValue 权限，部分权限仅用于远程代码拉取和本地缓存，存在被滥用风险。  
> 位置：@grant GM_xmlhttpRequest, GM_setValue, GM_getValue  
> 建议：最小化权限申请，仅保留实际需要的权限。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/572110-deadshot-io-esp-memory-aimbot-silent-aimbot-no-recoil)*
