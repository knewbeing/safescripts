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

**风险等级**：⛔ CRITICAL　　**安全评分**：0/100　　**分析时间**：2026-06-29

> 该脚本存在极高安全风险：1) 动态拉取并 eval 执行第三方服务器代码，属于远程代码执行高危行为，远程代码可随时被更换为恶意内容；2) 访问非官方第三方域名，存在数据外传和供应链攻击风险；3) 申请了高权限（unsafeWindow、GM_xmlhttpRequest）。强烈不建议安装和使用本脚本。

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
> 脚本通过 GM_xmlhttpRequest 每次加载时从 https://deadshot-cheat.netlify.app/index.js 拉取远程 JS 代码，并 eval 执行，属于远程代码执行高危行为。远程代码可随时被更换，存在极高后门、恶意代码注入、供应链攻击风险。  
> 位置：GM_xmlhttpRequest + eval(customCode) 组合  
> 建议：禁止从不可信第三方动态拉取并 eval 执行代码。应将所有逻辑本地化，或仅允许可信 CDN 且固定版本哈希。

**⛔ CRITICAL** — Remote Code Execution  
> 脚本使用 eval 执行远程拉取的代码，属于远程代码执行高危行为。  
> 位置：eval(customCode)  
> 建议：严禁 eval 执行远程代码。

**⛔ CRITICAL** — Data Exfiltration  
> 脚本通过 GM_xmlhttpRequest 主动访问第三方服务器 deadshot-cheat.netlify.app，可能外传用户信息（如 Cookie、指纹、页面信息等），且该域名非官方、无信誉保障。  
> 位置：GM_xmlhttpRequest  
> 建议：仅允许访问可信、官方服务器。避免向第三方域名发送任何用户相关数据。

**🔴 HIGH** — Permission Abuse  
> 脚本申请了 unsafeWindow 高权限，允许与页面 JS 互操作，增加攻击面。  
> 位置：@grant unsafeWindow  
> 建议：如无必要，禁止申请 unsafeWindow 权限。

**🟠 MEDIUM** — Permission Abuse  
> 脚本通过 @grant 申请了 GM_xmlhttpRequest、GM_setValue、GM_getValue 等高权限，部分权限未严格限制用途，存在滥用风险。  
> 位置：@grant GM_xmlhttpRequest, GM_setValue, GM_getValue  
> 建议：仅申请实际需要的最小权限。

**🟠 MEDIUM** — Supply Chain Risk  
> 脚本通过 @require 未加载任何第三方库，但通过远程拉取 index.js 动态执行，存在严重供应链风险。该域名为 netlify.app，非官方、无版本锁定，极易被篡改。  
> 位置：GM_xmlhttpRequest + eval(customCode)  
> 建议：禁止从非官方、无版本锁定的第三方域名加载代码。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/572110-deadshot-io-esp-memory-aimbot-silent-aimbot-no-recoil)*
