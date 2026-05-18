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

**风险等级**：⛔ CRITICAL　　**安全评分**：0/100　　**分析时间**：2026-05-18

> 该脚本存在极高安全风险：1）通过 GM_xmlhttpRequest 动态拉取并 eval 执行第三方服务器代码，2）申请高权限（unsafeWindow），3）无任何校验机制，极易被用于后门、数据窃取或远程控制。强烈不建议使用。

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
> 脚本通过 GM_xmlhttpRequest 从第三方服务器 deadshot-cheat.netlify.app 动态拉取并执行远程 JavaScript 代码，存在严重的数据外传和远程代码执行风险。  
> 位置：fetchAndCacheCode -> GM_xmlhttpRequest -> eval(customCode)  
> 建议：禁止从不受信任的第三方服务器动态加载和执行代码，改为本地集成或使用可信 CDN 并固定版本哈希。

**⛔ CRITICAL** — 远程代码执行  
> 脚本使用 eval 执行远程拉取的代码，极易被利用为后门或植入恶意代码。  
> 位置：patchImports -> eval(customCode)  
> 建议：避免使用 eval，尤其是对外部来源的代码。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 unsafeWindow 权限，可能导致页面与脚本间的隔离被打破，增加攻击面。  
> 位置：@grant unsafeWindow  
> 建议：仅在绝对必要时使用 unsafeWindow，并严格限制其用途。

**🟠 MEDIUM** — 供应链风险  
> 脚本未对拉取的远程代码做任何校验（如哈希校验），存在供应链污染风险。  
> 位置：GM_xmlhttpRequest -> eval(customCode)  
> 建议：如必须加载远程代码，应校验哈希并使用可信源。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/572110-deadshot-io-esp-memory-aimbot-silent-aimbot-no-recoil)*
