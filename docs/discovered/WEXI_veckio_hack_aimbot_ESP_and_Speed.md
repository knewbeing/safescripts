---
title: "WEXI veck.io hack aimbot, ESP and Speed"
---

# WEXI veck.io hack aimbot, ESP and Speed



<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/WEXI_veckio_hack_aimbot_ESP_and_Speed.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.2**　　发现时间：**2026-04-16**　　来源：[GreasyFork](https://greasyfork.org/scripts/573903-wexi-veck-io-hack-aimbot-esp-and-speed) <Badge type="tip" text="GreasyFork" />　　安装量：**146**　　评分：👍0 / 👎0

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

**风险等级**：⛔ CRITICAL　　**安全评分**：27/100　　**分析时间**：2026-07-27

> 该脚本存在严重安全风险，包括远程代码执行、隐私采集、数据外传（引导用户访问第三方站点获取密钥），以及敏感 API 调用。建议禁止使用或仅在充分了解风险的情况下使用。未发现代码混淆和 DOM XSS 注入，但远程代码执行和隐私采集风险极高。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：https://wexi.qzz.io/key） |
| 隐私采集 | ❌ 检测到（localStorage 存储用户密钥） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**⛔ CRITICAL** — Privacy Collection  
> 脚本通过 localStorage 存储和读取用户输入的密钥，涉及隐私采集。  
> 位置：localStorage.getItem('wx_user_key'), localStorage.setItem('wx_user_key', input)  
> 建议：如需存储敏感信息，建议加密处理并明确告知用户用途。

**⛔ CRITICAL** — Data Transmission  
> 脚本引导用户访问第三方站点（https://wexi.qzz.io/key）获取密钥，存在数据外传和追踪风险。  
> 位置：HTML overlay <a href="https://wexi.qzz.io/key">  
> 建议：避免引导用户访问非官方、未知第三方站点，或明确告知风险。

**🔴 HIGH** — Remote Code Execution  
> 脚本通过 fetch 动态加载并执行远程 JavaScript 代码（loadscript 函数），存在远程代码执行风险。  
> 位置：loadscript(url) 函数  
> 建议：禁止动态加载和执行未固定哈希的远程代码，改为本地静态代码或固定版本 CDN。

**🔴 HIGH** — Remote Code Execution  
> 脚本使用 new Function() 执行远程代码，属于高危远程代码执行方式。  
> 位置：loadscript(url) 函数  
> 建议：避免使用 new Function()，改为安全的模块化加载方式。

**🟠 MEDIUM** — Permission Abuse  
> 脚本未申请任何 @grant 权限，但实际使用 localStorage、indexedDB，权限申请与实际使用不符。  
> 位置：@grant none 与 localStorage/indexedDB  
> 建议：建议根据实际使用申请最小权限，避免权限滥用。

**🟠 MEDIUM** — Sensitive API Usage  
> 脚本删除 UnityCache 数据库，可能影响用户游戏体验或数据完整性。  
> 位置：indexedDB.deleteDatabase("UnityCache")  
> 建议：删除数据库前应征得用户同意，并说明影响。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/573903-wexi-veck-io-hack-aimbot-esp-and-speed)*
