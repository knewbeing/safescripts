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

**风险等级**：⛔ CRITICAL　　**安全评分**：17/100　　**分析时间**：2026-07-27

> This script poses significant security and privacy risks due to data transmission to third-party servers (discord.com, nominatim.openstreetmap.org), processing of user/game data, and modification of browser prototypes. Supply chain and permission risks are also present. Not recommended for use in sensitive environments.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：discord.com, nominatim.openstreetmap.org） |
| 隐私采集 | ❌ 检测到（Accesses localStorage/sessionStorage, Processes game/user data from WebSocket） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ⚠️ 使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**⛔ CRITICAL** — Data Exfiltration  
> Script sends data to discord.com via GM_xmlhttpRequest, which may include user actions or game data.  
> 位置：GM_xmlhttpRequest usage, @connect discord.com  
> 建议：Limit data sent to Discord, ensure no sensitive user information is transmitted.

**⛔ CRITICAL** — Data Exfiltration  
> Script sends requests to nominatim.openstreetmap.org, likely for geocoding. Potential for user location data leakage.  
> 位置：GM_xmlhttpRequest usage, @connect nominatim.openstreetmap.org  
> 建议：Ensure only necessary location data is sent, avoid transmitting user identifiers.

**⛔ CRITICAL** — Data Exfiltration  
> Script listens to WebSocket messages and processes opponent guesses, which may expose user/game data.  
> 位置：WebSocket.prototype.addEventListener proxy  
> 建议：Do not transmit user/game data externally unless necessary and with user consent.

**🔴 HIGH** — Privacy Collection  
> Script accesses localStorage and sessionStorage, and modifies Storage.prototype.setItem.  
> 位置：Storage.prototype.setItem proxy  
> 建议：Avoid unnecessary access to storage, do not store sensitive data.

**🔴 HIGH** — Code Injection Risk  
> Script applies Proxy to Element.prototype.setAttribute and Array.prototype.push, which may affect page behavior.  
> 位置：Proxy wrappers on DOM prototypes  
> 建议：Avoid modifying global prototypes unless necessary; restrict scope.

**🟠 MEDIUM** — Sensitive API Usage  
> Script uses Notification API to send notifications.  
> 位置：state.notificationPermission, Notification.permission  
> 建议：Ensure notifications are not abused or used for phishing.

**🟠 MEDIUM** — Supply Chain Risk  
> Script uses @require to load msgpack.js from greasyfork update CDN, but does not fix version hash.  
> 位置：@require https://update.greasyfork.org/scripts/423602/1005014/msgpack.js  
> 建议：Pin third-party dependencies to a specific version hash to prevent supply chain attacks.

**🟠 MEDIUM** — Permission Abuse  
> Script requests GM_xmlhttpRequest permission, which is high privilege.  
> 位置：@grant GM_xmlhttpRequest  
> 建议：Limit usage to only required domains; review necessity.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/572651-cheatguessr-universal-geoguessr-openguessr-worldguessr-freeguessr-geoduels-geotastic)*
