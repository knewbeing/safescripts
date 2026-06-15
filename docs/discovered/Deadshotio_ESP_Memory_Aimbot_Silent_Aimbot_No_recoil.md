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

**风险等级**：⛔ CRITICAL　　**安全评分**：32/100　　**分析时间**：2026-06-15

> 该脚本存在严重安全风险：通过 GM_xmlhttpRequest 向第三方服务器 deadshot-cheat.netlify.app 下载并 eval 执行远程代码，属于数据外传和远程代码执行的高危行为。未固定版本哈希，存在供应链污染风险。申请了未使用的高权限 unsafeWindow。未检测到隐私采集、代码混淆、DOM XSS、WebSocket 使用等其他风险。强烈建议禁止使用该脚本。已判定为 CRITICAL 级别风险。

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
> 位置：GM_xmlhttpRequest 调用和 eval(customCode)  
> 建议：禁止下载和执行远程代码，或仅允许可信源并固定版本哈希。

**🔴 HIGH** — Remote Code Execution  
> 脚本使用 eval() 执行从外部服务器下载的代码，存在远程代码执行风险。  
> 位置：eval(customCode)  
> 建议：避免使用 eval 执行外部代码，改为本地静态代码或受信任的库。

**🟠 MEDIUM** — Supply Chain Risk  
> 脚本通过 GM_xmlhttpRequest 下载远程 JS，且未固定版本哈希，存在供应链风险。  
> 位置：GM_xmlhttpRequest url: https://deadshot-cheat.netlify.app/index.js  
> 建议：仅允许官方 CDN 且固定版本哈希，避免可变 URL。

**🟠 MEDIUM** — Permission Abuse  
> 脚本申请了 unsafeWindow 权限，但实际代码未使用，存在权限滥用风险。  
> 位置：@grant unsafeWindow  
> 建议：移除未使用的高权限申请。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/572110-deadshot-io-esp-memory-aimbot-silent-aimbot-no-recoil)*
