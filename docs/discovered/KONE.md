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

**风险等级**：⛔ CRITICAL　　**安全评分**：27/100　　**分析时间**：2026-07-06

> 该脚本存在严重的数据外传和隐私采集风险，尤其是 GM_xmlhttpRequest 可向任意域名发送请求，以及密码自动填充功能可能读取敏感表单数据。未检测到明显代码混淆和 DOM XSS，但权限申请较宽泛，存在远程代码执行和供应链风险。建议限制 @connect 域名范围、精简权限申请，并确保敏感数据仅在用户明确操作时处理。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：dlsite.com, store.steampowered.com, kio.ac） |
| 隐私采集 | ❌ 检测到（读取和操作表单字段值（input.value）用于密码自动填充） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本申请了 GM_xmlhttpRequest 权限，并通过 @connect * 允许向任意域名发送网络请求，存在数据外传风险。虽然主要用于链接健康检查和产品卡片预览，但未限制目标域名，理论上可被滥用。  
> 位置：元数据 @grant/@connect，代码中 GM_xmlhttpRequest 使用  
> 建议：将 @connect 限定为实际需要的域名，避免使用通配符 *，并审查所有 GM_xmlhttpRequest 调用，确保不携带敏感用户数据。

**⛔ CRITICAL** — 隐私采集  
> 脚本涉及密码自动填充功能，可能会读取和操作表单字段值（input.value），存在隐私采集风险。虽然主要用于自动填充，但未明确限制用途，理论上可被滥用。  
> 位置：CFG.PW_SITES 配置，自动填充逻辑  
> 建议：确保仅在用户明确操作时读取和填充密码字段，避免自动采集和外传用户输入的敏感信息。

**🔴 HIGH** — 远程代码执行  
> 脚本允许 GM_xmlhttpRequest 向任意域名发送请求，且未对请求内容进行严格限制，存在远程代码执行的供应链风险。  
> 位置：元数据 @connect *  
> 建议：限制 @connect 域名范围，避免供应链污染和远程代码执行风险。

**🔴 HIGH** — 远程代码执行  
> 脚本未使用 eval/new Function/setTimeout(string) 等动态执行代码方式，但部分功能（如 base64 解码）可能被滥用，需注意后续代码更新。  
> 位置：base64/braille decoder 相关逻辑  
> 建议：避免在解码后直接执行用户输入的代码，确保仅用于文本处理。

**🔴 HIGH** — 代码混淆  
> 脚本未检测到明显代码混淆，但部分字符串处理和配置项较多，需关注后续版本是否引入混淆。  
> 位置：CFG 配置、字符串处理  
> 建议：保持代码可读性，避免混淆和压缩。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM_registerMenuCommand、GM_unregisterMenuCommand、GM_getValue、GM_setValue 等权限，部分权限未被充分使用，存在权限滥用风险。  
> 位置：元数据 @grant  
> 建议：仅申请实际需要的权限，移除未使用的高权限。

**🟠 MEDIUM** — 敏感 API 调用  
> 脚本未检测到敏感 API 调用（如 geolocation、RTCPeerConnection、MediaDevices），但涉及剪贴板和表单操作，需关注后续代码更新。  
> 位置：表单自动填充、可能的剪贴板操作  
> 建议：避免读取剪贴板内容，限制表单操作范围。

**🟠 MEDIUM** — 供应链风险  
> 脚本未通过 @require 加载第三方库，供应链风险较低，但 @downloadURL 和 @updateURL 指向 GreasyFork，需关注后续更新来源。  
> 位置：元数据 @downloadURL/@updateURL  
> 建议：确保更新来源可信，避免加载未知代码。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/581965-kone)*
