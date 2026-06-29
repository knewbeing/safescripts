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

**风险等级**：🟠 MEDIUM　　**安全评分**：67/100　　**分析时间**：2026-06-29

> KONE + 脚本功能丰富，主要用于 kone.gg 及相关网盘的解码、产品卡片展示、链接健康检查和密码自动填充。代码结构清晰，无混淆和远程代码执行风险。主要安全隐患为 @connect * 带来的数据外传和权限滥用风险，建议收紧 @connect 域名范围。未发现 DOM XSS、代码混淆、远程代码执行等高危问题。密码等敏感信息仅本地存储，未发现外传行为。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：dlsite.com, store.steampowered.com, kio.ac） |
| 隐私采集 | ❌ 检测到（本地存储和读取用户设置和密码列表） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本通过 GM_xmlhttpRequest 访问第三方域名（如 dlsite.com、store.steampowered.com、kio.ac、kiosk.ac 及任意域名 *），用于产品卡片、链接健康检查等功能。虽然用途明确，但存在潜在的数据外传风险，尤其是 @connect * 允许任意域名。  
> 位置：GM_xmlhttpRequest 调用及 @connect * 元数据  
> 建议：限制 @connect 范围，避免 *，仅允许必要的可信域名。确保请求不携带敏感用户数据。

**🟠 MEDIUM** — 隐私采集  
> 脚本使用 GM_getValue/GM_setValue 存储和读取用户设置及密码列表（pwList），但未发现将这些数据外传到第三方服务器。  
> 位置：GM_getValue/GM_setValue 相关代码  
> 建议：确保密码等敏感信息仅本地存储，避免通过网络请求发送。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM_xmlhttpRequest、GM_registerMenuCommand、GM_unregisterMenuCommand、GM_getValue、GM_setValue 权限，均有实际使用，但 @connect * 权限过宽，存在权限滥用风险。  
> 位置：@grant/@connect 元数据  
> 建议：收紧 @connect 权限范围，避免滥用。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/581965-kone)*
