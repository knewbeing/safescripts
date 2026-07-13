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

**风险等级**：⛔ CRITICAL　　**安全评分**：0/100　　**分析时间**：2026-07-13

> 该脚本存在极高安全风险。其核心逻辑为从第三方服务器动态拉取并 eval 执行远程代码，属于严重的远程代码执行和数据外传行为。攻击者可随时更换 payload，导致用户完全失控。强烈不建议使用或信任该脚本。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：https://deadshot-cheat.netlify.app/index.js） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**⛔ CRITICAL** — 远程代码执行 & 数据外传  
> 脚本通过 GM_xmlhttpRequest 向第三方服务器 deadshot-cheat.netlify.app 拉取远程 JS 代码，并在本地缓存后通过 eval 执行，实现远程代码注入和动态更新。  
> 位置：fetchAndCacheCode() 和 patchImports() 中的 eval(customCode)  
> 建议：禁止从不受信任的第三方服务器动态拉取和执行代码。应将所有逻辑本地化，避免远程代码执行。

**⛔ CRITICAL** — 远程代码执行  
> 使用 eval 执行远程拉取的代码，存在极高的远程代码执行风险，攻击者可随时更换 payload。  
> 位置：patchImports() 中的 (0, eval)(customCode)  
> 建议：严禁使用 eval 执行远程代码，所有代码应静态本地化。

**🔴 HIGH** — 代码混淆（潜在）  
> 未检测到明显的代码混淆，但远程拉取的 index.js 可能为混淆代码，无法静态分析。  
> 位置：远程 index.js  
> 建议：所有代码应可审计，禁止混淆和远程加载。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM_xmlhttpRequest、unsafeWindow 等高权限，且实际使用了 GM_xmlhttpRequest 进行远程通信，unsafeWindow 可能被滥用。  
> 位置：元数据 @grant  
> 建议：仅申请实际需要的权限，避免高权限滥用。

**🟠 MEDIUM** — 敏感 API 调用  
> 通过 GM_getValue/GM_setValue 持久化远程拉取的代码，增加持久化攻击窗口。  
> 位置：customCode = GM_getValue('cached_code', null); GM_setValue('cached_code', newCode);  
> 建议：避免持久化存储远程代码，减少攻击面。

**🟠 MEDIUM** — 供应链风险  
> 供应链风险：所有核心逻辑均依赖 deadshot-cheat.netlify.app，且未固定版本或哈希，远程代码可被随时篡改。  
> 位置：CUSTOM_SCRIPT_URL  
> 建议：禁止从不可信第三方加载代码，或需固定版本哈希。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/572110-deadshot-io-esp-memory-aimbot-silent-aimbot-no-recoil)*
