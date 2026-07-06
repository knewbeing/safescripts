---
title: "CheatGuessr 通用版"
---

# CheatGuessr 通用版

`地理猜谜`  `辅助工具`  `地图标记`  `游戏作弊`  `Discord集成`  `Google地图`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/CheatGuessr_Universal_GeoGuessr_OpenGuessr_WorldGuessr_FreeGuessr_GeoDuels_Geota.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**12.5**　　发现时间：**2026-06-29**　　来源：[GreasyFork](https://greasyfork.org/scripts/572651-cheatguessr-universal-geoguessr-openguessr-worldguessr-freeguessr-geoduels-geotastic) <Badge type="tip" text="GreasyFork" />　　安装量：**6,659**　　评分：👍12 / 👎6

## 功能介绍

本脚本为 GeoGuessr 及类似地理猜谜网站提供隐蔽式辅助功能。用户可通过按 Tab 键打开设置菜单，在地图上标记位置、将信息发送到 Discord、并在 Google 地图中查看当前位置。

## 适用网站

- GeoGuessr
- OpenGuessr
- WorldGuessr
- WorldGuessrGame
- FreeGuessr
- GeoDuels
- Geotastic
- GuessWhereYouAre

## 使用方法

1. 安装脚本后，进入支持的地理猜谜网站。
2. 按 Tab 键打开脚本设置菜单。
3. 在地图上标记位置，或选择发送到 Discord、在 Google 地图中查看。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_setValue` | 用于保存脚本设置和用户数据。 |
| `GM_getValue` | 用于读取脚本保存的设置和数据。 |
| `GM_deleteValue` | 用于删除脚本保存的数据。 |
| `GM_xmlhttpRequest` | 用于发送网络请求，如将信息发送到 Discord。 |

## 安全分析

**风险等级**：⛔ CRITICAL　　**安全评分**：34/100　　**分析时间**：2026-07-06

> 该脚本存在严重的数据外传风险，主要通过 GM_xmlhttpRequest 向 discord.com 和 nominatim.openstreetmap.org 发送用户游戏数据和位置信息。虽然未检测到代码混淆和 DOM XSS，但存在隐私采集（如 WebSocket 拦截、存储操作）、敏感 API 调用（通知）、iframe 保护弱化，以及供应链风险（未哈希固定的第三方依赖）。建议严格限制外传数据、加强依赖管理，并避免干扰站点安全机制。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：discord.com, nominatim.openstreetmap.org） |
| 隐私采集 | ❌ 检测到（Hotkey event listeners, LocalStorage/sessionStorage for feature toggles, WebSocket interception for game data） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ⚠️ 使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**⛔ CRITICAL** — Data Exfiltration  
> Script uses GM_xmlhttpRequest to send data to discord.com, likely for sharing map pins or game data. This constitutes data exfiltration to a third-party server.  
> 位置：GM_xmlhttpRequest calls (not fully shown, but @connect discord.com and description indicate usage)  
> 建议：Limit data sent to Discord, ensure no sensitive user information or authentication tokens are transmitted.

**⛔ CRITICAL** — Data Exfiltration  
> Script uses GM_xmlhttpRequest to access nominatim.openstreetmap.org, likely for geocoding. While this is a public API, user location data may be transmitted.  
> 位置：GM_xmlhttpRequest calls (not fully shown, but @connect nominatim.openstreetmap.org and description indicate usage)  
> 建议：Ensure only necessary location data is sent, avoid transmitting user identifiers.

**🟠 MEDIUM** — Privacy Collection  
> Script listens to keyboard events (Tab, Q, G, X, V, T) for feature toggles, but does not appear to log or transmit keystrokes.  
> 位置：Hotkey handling (DEFAULT_HOTKEYS, event listeners)  
> 建议：Ensure no keylogger behavior is introduced; do not transmit input data.

**🟠 MEDIUM** — Privacy Collection  
> Script accesses localStorage and sessionStorage, but only for feature toggles and state. No sensitive data collection detected.  
> 位置：GM_getValue, GM_setValue, Storage.prototype.setItem proxy  
> 建议：Do not store or transmit sensitive user data.

**🟠 MEDIUM** — Sensitive API Usage  
> Script uses Notification API to display notifications to the user.  
> 位置：state.notificationPermission, notify feature  
> 建议：Do not abuse Notification API for spam or phishing.

**🟠 MEDIUM** — Privacy Collection  
> Script uses WebSocket interception to read game data and opponent guesses, but does not transmit this data externally.  
> 位置：WebSocket.prototype.addEventListener proxy  
> 建议：Ensure intercepted data is not sent to third parties.

**🟠 MEDIUM** — Supply Chain Risk  
> Script requires msgpack.js from greasyfork update CDN, which is a trusted source but not version-hashed.  
> 位置：@require https://update.greasyfork.org/scripts/423602/1005014/msgpack.js  
> 建议：Pin third-party dependencies to a specific version hash.

**🟡 LOW** — ClickJacking / iframe Risk  
> Script modifies iframe sandbox attributes and frame protection, potentially weakening clickjacking protections.  
> 位置：Element.prototype.setAttribute proxy  
> 建议：Avoid weakening frame protections unless necessary.

**🟡 LOW** — Site Integrity  
> Script disables cheat detection scripts and modifies Array.prototype.push, which may interfere with site integrity.  
> 位置：Array.prototype.push proxy, script removal  
> 建议：Avoid interfering with site security mechanisms.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/572651-cheatguessr-universal-geoguessr-openguessr-worldguessr-freeguessr-geoduels-geotastic)*
