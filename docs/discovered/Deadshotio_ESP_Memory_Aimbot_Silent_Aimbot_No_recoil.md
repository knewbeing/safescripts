---
title: "deadshot.io 游戏辅助"
---

# deadshot.io 游戏辅助

`游戏辅助`  `自动瞄准`  `透视`  `无后坐力`  `deadshot.io`  `外挂`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Deadshotio_ESP_Memory_Aimbot_Silent_Aimbot_No_recoil.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.0.6**　　发现时间：**2026-04-20**　　来源：[GreasyFork](https://greasyfork.org/scripts/572110-deadshot-io-esp-memory-aimbot-silent-aimbot-no-recoil) <Badge type="tip" text="GreasyFork" />　　安装量：**827**　　评分：👍4 / 👎2

## 功能介绍

本脚本为 deadshot.io 游戏提供辅助功能，包括透视（ESP）、自动瞄准（Aimbot）、无后坐力等。安装后可自动加载最新辅助代码，无需手动更新。适合希望提升游戏体验的玩家使用。

## 适用网站

- deadshot.io

## 使用方法

1. 1. 安装脚本后，打开 deadshot.io 网站。
2. 2. 游戏页面会自动加载辅助功能，无需手动操作。
3. 3. 若辅助未生效，可尝试刷新页面。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `unsafeWindow` | 允许脚本访问和修改页面的全局变量，便于注入辅助功能。 |
| `GM_xmlhttpRequest` | 用于从外部服务器下载最新的辅助代码。 |
| `GM_setValue` | 用于本地保存下载的辅助代码，实现缓存和自动更新。 |
| `GM_getValue` | 用于读取本地缓存的辅助代码，提升加载速度。 |

## 安全分析

**风险等级**：⛔ CRITICAL　　**安全评分**：34/100　　**分析时间**：2026-04-20

> 该脚本存在严重安全风险：1) 动态从第三方服务器加载并执行远程代码，2) 使用 eval 执行未审查代码，3) 权限申请过高，4) 存储和读取远程代码，5) 供应链风险。未检测到隐私采集、代码混淆或 DOM XSS。强烈建议禁止使用该脚本。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：deadshot-cheat.netlify.app） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本通过 GM_xmlhttpRequest 向 deadshot-cheat.netlify.app 发起请求，获取并执行远程 JavaScript 代码。该行为属于数据外传和远程代码执行，且目标为第三方服务器。  
> 位置：fetchAndCacheCode() 函数，GM_xmlhttpRequest 调用  
> 建议：禁止向非官方、未知第三方服务器请求并执行代码。仅允许加载受信任源且固定版本哈希的代码。

**⛔ CRITICAL** — 远程代码执行  
> 脚本动态获取远程代码并通过 eval 执行，属于远程代码执行风险。远程代码可随时更改，可能导致恶意行为。  
> 位置：patchImports() 函数，eval(customCode)  
> 建议：禁止动态 eval 执行远程代码。仅允许本地或受信任源的静态代码。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM_xmlhttpRequest、unsafeWindow 等高权限，且实际使用 GM_xmlhttpRequest 进行远程代码加载。  
> 位置：元数据 @grant  
> 建议：仅申请实际需要的最低权限。避免滥用高权限。

**🟠 MEDIUM** — 敏感 API 调用  
> 脚本通过 GM_getValue/GM_setValue 存储和读取远程代码，存在持久化恶意代码风险。  
> 位置：GM_getValue/GM_setValue 调用  
> 建议：避免存储和读取未经审查的远程代码。

**🟠 MEDIUM** — 供应链风险  
> @require 未使用，但通过自定义 URL 加载第三方代码，且未固定版本哈希，存在供应链风险。  
> 位置：CUSTOM_SCRIPT_URL 变量  
> 建议：仅允许加载受信任源且固定版本哈希的代码。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/572110-deadshot-io-esp-memory-aimbot-silent-aimbot-no-recoil)*
