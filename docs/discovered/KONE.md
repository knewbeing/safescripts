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

**风险等级**：🟡 LOW　　**安全评分**：64/100　　**分析时间**：2026-06-22

> KONE + 脚本整体安全性较高，未发现代码混淆、远程代码执行、DOM XSS、权限滥用、敏感 API 滥用等高危问题。主要风险在于允许向任意域名发起 GM_xmlhttpRequest 网络请求（@connect *），理论上存在数据外传隐患，但实际代码未发现敏感数据外传。建议限制 @connect 范围并定期复查网络请求逻辑。密码自动填充功能涉及用户密码存储，建议加密存储并提醒用户风险。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：dlsite.com, store.steampowered.com, kio.ac） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本允许向任意域名（@connect *）发起 GM_xmlhttpRequest 网络请求，理论上可外传数据，但实际代码中仅用于站点健康检测和产品卡片功能，未发现敏感数据外传。  
> 位置：元数据 @connect, GM_xmlhttpRequest 使用  
> 建议：限制 @connect 范围，避免 *，并定期复查请求内容。

**🟠 MEDIUM** — 隐私采集  
> 脚本读取和存储用户设置、密码列表等信息到 GM_getValue/GM_setValue，未发现读取 cookie、localStorage、sessionStorage、IndexedDB、表单字段、剪贴板等敏感隐私数据。  
> 位置：GM_getValue/GM_setValue, getPwList/savePwList  
> 建议：确保仅存储必要信息，避免存储明文密码。

**🟡 LOW** — 远程代码执行  
> 脚本未使用 eval、new Function、setTimeout(string)、setInterval(string) 等动态代码执行方式，也未通过 @require 或动态 script 标签加载远程 JS。  
> 位置：全局  
> 建议：保持此安全实践。

**🟡 LOW** — 代码混淆  
> 脚本未发现明显的代码混淆、base64解码执行、字符串数组混淆或高度压缩单行代码。  
> 位置：全局  
> 建议：保持代码可读性，便于安全审计。

**🟡 LOW** — DOM XSS  
> 脚本未发现将用户输入或 URL 参数直接插入 innerHTML/outerHTML，未见 document.write() 注入不可信内容。  
> 位置：全局  
> 建议：继续避免 DOM XSS 风险。

**🟡 LOW** — 权限滥用  
> 脚本申请了 GM_xmlhttpRequest、GM_registerMenuCommand、GM_unregisterMenuCommand、GM_getValue、GM_setValue 权限，均有实际使用，无权限滥用。  
> 位置：元数据 @grant  
> 建议：仅申请实际需要的权限。

**🟡 LOW** — 敏感 API 调用  
> 未发现使用 geolocation、RTCPeerConnection、MediaDevices、Clipboard API、Notification API 等敏感 API。  
> 位置：全局  
> 建议：如需使用敏感 API，需明确告知用户。

**🟡 LOW** — 供应链风险  
> 未使用 @require 加载第三方库，无供应链风险。  
> 位置：元数据 @require  
> 建议：如需引入第三方库，建议使用可信 CDN 并锁定版本。

**🟡 LOW** — ClickJacking/iframe  
> 未发现修改 frame 保护策略或创建隐藏 iframe 用于数据提取。  
> 位置：全局  
> 建议：继续避免 ClickJacking/iframe 风险。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/581965-kone)*
