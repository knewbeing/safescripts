---
title: "CheatGuessr 通用地理猜谜辅助"
---

# CheatGuessr 通用地理猜谜辅助

`地理猜谜`  `游戏辅助`  `地图工具`  `位置分享`  `社交分享`  `自动化`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/CheatGuessr_Universal_GeoGuessr_OpenGuessr_WorldGuessr_FreeGuessr_GeoDuels.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**10.82**　　发现时间：**2026-06-01**　　来源：[GreasyFork](https://greasyfork.org/scripts/572651-cheatguessr-universal-geoguessr-openguessr-worldguessr-freeguessr-geoduels) <Badge type="tip" text="GreasyFork" />　　安装量：**4,667**　　评分：👍5 / 👎3

## 功能介绍

本脚本为地理猜谜类游戏提供隐蔽式辅助功能。用户可通过按 Tab 键打开设置菜单，在地图上标记位置，并可将位置发送到 Discord 或在 Google 地图中打开。适用于多款地理猜谜网站。

## 适用网站

- GeoGuessr
- OpenGuessr
- WorldGuessr
- WorldGuessrGame
- FreeGuessr
- GeoDuels
- GuessWhereYouAre

## 使用方法

1. 安装脚本后，进入支持的地理猜谜网站。
2. 在游戏页面按 Tab 键打开设置菜单。
3. 根据菜单提示，在地图上标记位置。
4. 可选择将位置发送到 Discord 或在 Google 地图中查看。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_setValue` | 用于保存脚本设置和用户数据。 |
| `GM_getValue` | 用于读取脚本设置和用户数据。 |
| `GM_xmlhttpRequest` | 用于与外部网站（如 Discord、地理定位服务）通信，实现发送位置等功能。 |

## 安全分析

**风险等级**：🔴 HIGH　　**安全评分**：37/100　　**分析时间**：2026-06-01

> This script transmits gameplay data to third-party services (discord.com, nominatim.openstreetmap.org), modifies browser prototypes, and bypasses anti-cheat mechanisms on supported platforms. It also requests high-privilege permissions. While there is no evidence of credential theft or keylogging, the script's behavior introduces significant security and ethical risks, especially regarding data exfiltration and anti-detection measures.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：discord.com, nominatim.openstreetmap.org） |
| 隐私采集 | ❌ 检测到（Reads and writes to localStorage via GM_getValue/GM_setValue for hotkeys and toggles., May access gameplay state (map coordinates, address) for Discord sharing and Google Maps opening.） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — Data Exfiltration  
> The script uses GM_xmlhttpRequest and/or fetch to send data to discord.com (e.g., for 'send to Discord' feature). This may include map coordinates, user actions, or other gameplay data.  
> 位置：Functions related to 'sendToDiscord', network requests to discord.com  
> 建议：Ensure only non-sensitive, user-approved data is sent. Inform users clearly about what is transmitted. Do not send cookies or authentication tokens.

**🔴 HIGH** — Prototype Pollution Risk  
> The script modifies Element.prototype.setAttribute and Array.prototype.push via Proxy, which can introduce compatibility or security issues if not carefully handled.  
> 位置：Element.prototype.setAttribute, Array.prototype.push Proxy wrappers  
> 建议：Limit prototype modifications to only necessary cases. Document and test for side effects.

**🔴 HIGH** — Anti-Detection/Anti-Ban Bypass  
> The script disables or bypasses anti-cheat and ban mechanisms on target platforms by patching Storage, gtag, fetch, etc.  
> 位置：Platform-specific code blocks (e.g., WORLDGUESSR, FREEGUESSR)  
> 建议：Such behavior may violate terms of service and can be considered malicious if abused.

**🟠 MEDIUM** — Data Transmission  
> The script sends requests to nominatim.openstreetmap.org for reverse geocoding (address lookup). While this is a public API, it may leak user location or gameplay data.  
> 位置：Network requests to nominatim.openstreetmap.org  
> 建议：Minimize data sent; avoid sending user-identifiable information. Document this behavior for users.

**🟠 MEDIUM** — Sensitive API Usage  
> The script requests Notification API permission and can send browser notifications.  
> 位置：state.notificationPermission, Notification API usage  
> 建议：Limit notification usage to essential events. Do not abuse notifications for spam.

**🟠 MEDIUM** — Permission Overprovision  
> The script requests GM_xmlhttpRequest permission, which is high-privilege and should be justified.  
> 位置：@grant GM_xmlhttpRequest in metadata  
> 建议：Only request this permission if strictly necessary. Remove if not used.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/572651-cheatguessr-universal-geoguessr-openguessr-worldguessr-freeguessr-geoduels)*
