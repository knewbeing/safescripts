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

**风险等级**：⛔ CRITICAL　　**安全评分**：35/100　　**分析时间**：2026-07-06

> 该脚本存在严重安全风险：动态加载并 eval 执行远程代码，可能导致数据外传、远程代码执行和供应链污染。未发现隐私采集、代码混淆或 DOM XSS，但高权限申请和远程代码执行已足以判定为 CRITICAL 风险。强烈建议不要使用该脚本。

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
> 脚本通过 GM_xmlhttpRequest 向 deadshot-cheat.netlify.app 发起网络请求，动态加载并执行远程 JavaScript 代码，存在数据外传和远程代码执行风险。  
> 位置：fetchAndCacheCode() 函数，GM_xmlhttpRequest 调用  
> 建议：禁止动态加载和执行远程代码，改为本地固定代码或固定版本哈希的第三方库。

**🔴 HIGH** — Remote Code Execution  
> 脚本使用 eval 执行远程获取的代码，存在远程代码执行风险。  
> 位置：patchImports() 函数，(0, eval)(customCode)  
> 建议：避免使用 eval 执行外部代码，改为本地受信任代码。

**🟠 MEDIUM** — Supply Chain Risk  
> 脚本未对远程加载的代码进行任何校验，存在供应链风险。  
> 位置：CUSTOM_SCRIPT_URL 指向非官方 CDN，且未固定版本哈希  
> 建议：仅使用官方 CDN 并固定版本哈希，避免供应链污染。

**🟠 MEDIUM** — Permission Abuse  
> 脚本申请了 GM_xmlhttpRequest、unsafeWindow 等高权限，且实际使用 GM_xmlhttpRequest 进行远程代码加载，权限滥用风险较高。  
> 位置：元数据 @grant  
> 建议：仅申请必要权限，避免高权限滥用。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/572110-deadshot-io-esp-memory-aimbot-silent-aimbot-no-recoil)*
