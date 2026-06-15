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

**风险等级**：⛔ CRITICAL　　**安全评分**：34/100　　**分析时间**：2026-06-15

> KONE + 脚本存在严重安全风险，主要体现在数据外传（@connect * 允许任意域名通信）、隐私采集（密码自动填充功能）、远程代码执行风险（理论上可被滥用为远程通信通道）。建议限制网络请求目标、加强密码数据保护、减少权限申请。当前不建议在敏感环境下使用。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：dlsite.com, store.steampowered.com, kio.ac） |
| 隐私采集 | ❌ 检测到（密码自动填充功能涉及读取和存储用户密码, 使用 GM_getValue/GM_setValue 管理密码列表） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — Data Transmission  
> 脚本申请了 GM_xmlhttpRequest 权限，并通过 @connect * 允许向任意域名发送网络请求，存在数据外传风险。虽然主要用于产品卡片预览和链接健康检查，但理论上可向任意第三方服务器发送数据。  
> 位置：元数据 @grant GM_xmlhttpRequest, @connect *  
> 建议：限制 @connect 域名范围，避免允许任意外部通信。审查所有 GM_xmlhttpRequest 调用，确保不携带敏感用户数据。

**⛔ CRITICAL** — Privacy Collection  
> 脚本包含密码自动填充功能，涉及读取和存储用户输入的密码（通过 GM_getValue/GM_setValue 管理密码列表），存在隐私采集风险。  
> 位置：CFG.PW_AUTO, getPwList(), savePwList()  
> 建议：确保密码仅在本地存储且不外传，避免通过网络请求发送密码数据。建议对密码数据加密存储。

**🔴 HIGH** — Remote Code Execution  
> 脚本允许通过 GM_xmlhttpRequest 向任意域名发送请求，理论上可被滥用为远程代码执行通道。  
> 位置：元数据 @connect *  
> 建议：移除 @connect *，仅允许可信域名。审查所有网络请求，避免动态加载和执行外部代码。

**🔴 HIGH** — Obfuscation  
> 脚本未混淆，但部分功能涉及 base64 解码（如 Base64/braille decoder），需警惕混淆代码被插入。  
> 位置：Base64 decoder 相关函数  
> 建议：确保所有解码操作仅针对用户明确输入，不自动执行未知来源代码。

**🟠 MEDIUM** — Permission Abuse  
> 脚本申请了 GM_registerMenuCommand、GM_unregisterMenuCommand、GM_getValue、GM_setValue 等权限，部分权限未被充分使用，存在权限滥用风险。  
> 位置：元数据 @grant  
> 建议：仅申请实际需要的权限，移除未使用的高权限。

**🟠 MEDIUM** — Supply Chain Risk  
> 脚本通过 @require 加载自身更新，但未加载第三方库，供应链风险较低。但 @downloadURL 和 @updateURL 使用 GreasyFork 官方 CDN，可信。  
> 位置：元数据 @downloadURL, @updateURL  
> 建议：如需加载第三方库，务必固定版本哈希并使用官方 CDN。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/581965-kone)*
