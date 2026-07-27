---
title: "Torn Toolbox"
---

# Torn Toolbox



<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Torn_Toolbox.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.0.0**　　发现时间：**2026-04-16**　　来源：[GreasyFork](https://greasyfork.org/scripts/573645-torn-toolbox) <Badge type="tip" text="GreasyFork" />　　安装量：**141**　　评分：👍0 / 👎0

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

**风险等级**：⛔ CRITICAL　　**安全评分**：25/100　　**分析时间**：2026-07-27

> 脚本存在敏感数据外传（API Key）、隐私采集（API Key 存储）、第三方域名连接（weav3r.dev）等 CRITICAL 风险。建议加强 API Key 安全、移除未用高权限、限制第三方连接。未检测到代码混淆、DOM XSS、WebSocket、敏感 API 调用等高风险行为。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：api.torn.com, weav3r.dev） |
| 隐私采集 | ❌ 检测到（API Key 采集与存储） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本通过 fetch 向 api.torn.com 发起请求，包含用户 API Key（敏感信息）。  
> 位置：AIO.getMarket() 方法  
> 建议：确保 API Key 仅用于 Torn 官方 API，避免泄露给第三方。建议对 API Key 做本地加密存储。

**⛔ CRITICAL** — 数据外传  
> 脚本元数据声明 @connect weav3r.dev，可能存在后续数据外传或统计行为。  
> 位置：元数据 @connect weav3r.dev  
> 建议：检查所有与 weav3r.dev 的网络请求，确保不携带用户敏感数据。

**⛔ CRITICAL** — 隐私采集  
> 脚本通过 GM_getValue/GM_setValue 存储和读取 API Key，属于敏感信息采集。  
> 位置：AIO.getApiKey()、AIO.set() 方法  
> 建议：建议对 API Key 做本地加密，避免明文存储。确保不会外传。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请 GM.xmlHttpRequest/GM_xmlhttpRequest 高权限，但实际代码未见使用（仅用 fetch）。  
> 位置：元数据 @grant GM.xmlHttpRequest/GM_xmlHttpRequest  
> 建议：移除未使用的高权限申请，减少攻击面。

**🟠 MEDIUM** — 供应链风险  
> 脚本申请 @connect weav3r.dev，但实际代码未见直接请求，存在潜在供应链风险。  
> 位置：元数据 @connect weav3r.dev  
> 建议：仅允许可信域名，避免第三方数据供应链污染。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/573645-torn-toolbox)*
