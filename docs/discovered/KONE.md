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

**风险等级**：🔴 HIGH　　**安全评分**：42/100　　**分析时间**：2026-07-13

> KONE + 脚本功能丰富，主要用于解码、产品卡片展示、链接健康检查和密码自动填充。安全审查发现：1）存在对任意域名的数据请求（@connect *），可能导致数据外传和供应链风险；2）本地存储用户密码，若与其他脚本共享存储空间存在隐私泄露风险。未发现远程代码执行、代码混淆或 DOM XSS 问题。建议收紧 @connect 权限、加密本地敏感数据存储。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：dlsite.com, store.steampowered.com, kio.ac） |
| 隐私采集 | ❌ 检测到（读取/存储用户密码（pwList）用于自动填充） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本通过 GM_xmlhttpRequest 访问第三方域名（如 dlsite.com、store.steampowered.com、kio.ac、kiosk.ac 及任意域名 *），用于产品卡片、链接健康检查等功能。虽然主要为功能性用途，但存在潜在的数据外传风险，尤其是 @connect * 允许任意域名。  
> 位置：GM_xmlhttpRequest 调用及 @connect * 元数据  
> 建议：限制 @connect 仅允许必要的可信域名，避免 * 通配符，确保请求内容不包含敏感用户数据。

**⛔ CRITICAL** — 隐私采集  
> 脚本读取和存储用户的密码列表（pwList），并自动填充到匹配站点的表单中。虽然未发现外传行为，但本地存储的密码存在被其他脚本读取的风险。  
> 位置：GM_getValue('pwList'), GM_setValue('pwList')  
> 建议：确保密码仅在本地安全存储，避免与其他脚本共享存储空间。建议加密存储。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM_xmlhttpRequest 权限，但未发现未授权的数据上报、统计或追踪行为。  
> 位置：@grant GM_xmlhttpRequest  
> 建议：定期复查网络请求逻辑，防止未来代码变更引入隐私风险。

**🟠 MEDIUM** — 供应链风险  
> 脚本允许 @connect *，存在供应链和外部依赖风险，可能被滥用加载恶意内容。  
> 位置：@connect * 元数据  
> 建议：严格限定 @connect 域名，移除 * 通配符。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/581965-kone)*
