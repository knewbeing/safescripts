---
title: "KONE增强工具"
---

# KONE增强工具

`社区增强`  `网盘助手`  `自动填充`  `链接检测`  `资源管理`  `信息展示`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/KONE.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**17.3**　　发现时间：**2026-06-15**　　来源：[GreasyFork](https://greasyfork.org/scripts/581965-kone) <Badge type="tip" text="GreasyFork" />　　安装量：**465**　　评分：👍0 / 👎0

## 功能介绍

本脚本为 kone.gg 社区及相关网盘网站提供多项实用功能，包括Base64和盲文解码、DLsite和Steam商品卡片展示、链接健康检测，以及自动填写密码。安装后可提升资源管理和浏览体验。

## 适用网站

- KONE社区
- KIO
- KIOSK
- MEGA网盘
- Transfer.it
- Gofile.io
- Workupload
- Pikpak

## 使用方法

1. 安装脚本后，访问 kone.gg 或相关网盘网站。
2. 在页面上自动显示商品卡片和链接健康状态。
3. 遇到加密内容时，自动或手动进行Base64/盲文解码。
4. 如需自动填写密码，脚本会在相关页面自动完成。
5. 可通过浏览器脚本菜单调整功能设置。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_xmlhttpRequest` | 用于发起跨域网络请求，检测链接状态和获取商品信息。 |
| `GM_registerMenuCommand` | 允许在浏览器菜单中添加自定义操作按钮，方便用户手动触发功能。 |
| `GM_unregisterMenuCommand` | 允许移除自定义菜单命令，管理脚本功能入口。 |
| `GM_getValue` | 用于保存和读取用户的脚本设置，如功能开关。 |
| `GM_setValue` | 用于存储用户偏好和配置，保证个性化体验。 |

## 安全分析

**风险等级**：⛔ CRITICAL　　**安全评分**：42/100　　**分析时间**：2026-07-27

> KONE + 脚本存在较高安全风险，主要体现在数据外传（@connect * 允许任意域名通信）和密码自动填充/存储功能（涉及敏感隐私采集）。未发现远程代码执行、代码混淆、DOM XSS、权限滥用等高风险问题。建议收紧 @connect 域名范围、加强密码存储安全，并持续审查网络请求和敏感数据处理。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：dlsite.com, store.steampowered.com, kio.ac） |
| 隐私采集 | ❌ 检测到（自动填充和存储用户密码, 读取和存储用户配置） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — Data Transmission  
> 脚本申请了 GM_xmlhttpRequest 权限，并通过 @connect * 允许向任意域名发起网络请求，存在数据外传风险。虽然主要用于链接健康检查和产品卡片预览，但理论上可向任意第三方服务器发送数据。  
> 位置：元数据 @grant GM_xmlhttpRequest, @connect *  
> 建议：将 @connect 限定为实际需要的域名，避免允许任意外部通信。审查所有 GM_xmlhttpRequest 调用，确保不发送敏感用户数据。

**⛔ CRITICAL** — Privacy Collection  
> 脚本包含密码自动填充功能，涉及读取和存储用户输入的密码，并可能自动填写到表单。虽然未发现密码外传，但本地存储和自动填充存在隐私采集风险。  
> 位置：CFG.PW_SITES 及 getPwList/savePwList  
> 建议：确保密码仅在本地存储且不外传，建议增加用户提示和加密措施。

**🔴 HIGH** — Privacy Collection  
> 脚本允许 GM_getValue/GM_setValue 存储和读取用户配置及密码列表，涉及敏感信息本地存储。  
> 位置：getPwList/savePwList/CFG  
> 建议：敏感信息如密码应加密存储，避免明文保存。

**🔴 HIGH** — Remote Code Execution  
> 脚本未发现 eval/new Function/setTimeout(string) 等远程代码执行风险，也未动态加载外部 JS，但 @require 未使用，若后续添加需注意。  
> 位置：全局代码审查  
> 建议：避免动态执行字符串代码，若需加载第三方库应固定版本哈希。

**🟡 LOW** — Code Obfuscation  
> 脚本未发现明显代码混淆，但部分变量和配置项较多，代码结构复杂。  
> 位置：全局代码审查  
> 建议：保持代码可读性，避免混淆和压缩。

**🟡 LOW** — DOM XSS  
> 脚本未发现 DOM XSS 风险，未直接将用户输入插入 innerHTML/outerHTML。  
> 位置：全局代码审查  
> 建议：继续保持安全的 DOM 操作，避免插入不可信内容。

**🟡 LOW** — Permission Abuse  
> 脚本申请了 GM_registerMenuCommand/GM_unregisterMenuCommand/GM_getValue/GM_setValue 权限，均实际使用。未发现权限滥用。  
> 位置：元数据 @grant  
> 建议：仅申请实际需要的权限。

**🟡 LOW** — Sensitive API Usage  
> 脚本未调用敏感 API（如 geolocation、RTCPeerConnection、MediaDevices、Clipboard API、Notification API）。  
> 位置：全局代码审查  
> 建议：如需调用敏感 API，需征得用户同意。

**🟡 LOW** — Supply Chain Risk  
> @require 未使用，供应链风险较低。若后续添加第三方库，需固定版本哈希并使用官方 CDN。  
> 位置：元数据 @require  
> 建议：仅使用可信来源并固定版本。

**🟡 LOW** — ClickJacking / iframe Risk  
> 脚本未发现 clickjacking 或 iframe 风险，未修改 frame 保护策略或创建隐藏 iframe。  
> 位置：全局代码审查  
> 建议：避免创建隐藏 iframe 或修改 frame 保护。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/581965-kone)*
