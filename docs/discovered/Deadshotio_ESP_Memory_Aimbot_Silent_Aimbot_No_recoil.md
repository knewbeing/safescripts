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

**风险等级**：⛔ CRITICAL　　**安全评分**：0/100　　**分析时间**：2026-06-01

> 该脚本存在极高安全风险：动态从第三方服务器拉取并 eval 执行远程代码，属于严重的远程代码执行和数据外传行为，极易被用于注入恶意代码、窃取用户数据或劫持浏览器环境。强烈不建议安装和使用。

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
> 脚本通过 GM_xmlhttpRequest 动态从第三方服务器 deadshot-cheat.netlify.app 拉取并执行远程 JavaScript 代码，存在严重的数据外传和远程代码执行风险。  
> 位置：fetchAndCacheCode() & eval(customCode)  
> 建议：禁止从不受信任的第三方服务器动态加载和执行代码，改为本地集成或固定版本哈希的可信 CDN。

**🔴 HIGH** — 远程代码执行  
> 使用 eval() 执行远程拉取的代码，极易导致任意代码执行（RCE），攻击面极大。  
> 位置：mod[TARGET_METHOD] = (...args) => { (0, eval)(customCode); ... }  
> 建议：严禁使用 eval 执行外部代码，尤其是网络动态获取的内容。

**🟠 MEDIUM** — 权限滥用  
> 申请了 GM_xmlhttpRequest、unsafeWindow 等高权限，且实际使用 GM_xmlhttpRequest 进行远程通信，unsafeWindow 未直接使用但存在滥用风险。  
> 位置：@grant  
> 建议：仅申请实际需要的最低权限，移除未使用的高权限。

**🟠 MEDIUM** — 供应链风险  
> 通过 @connect deadshot-cheat.netlify.app 允许与第三方服务器通信，增加供应链和数据外传风险。  
> 位置：@connect  
> 建议：仅允许可信域名通信，避免第三方动态代码注入。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/572110-deadshot-io-esp-memory-aimbot-silent-aimbot-no-recoil)*
