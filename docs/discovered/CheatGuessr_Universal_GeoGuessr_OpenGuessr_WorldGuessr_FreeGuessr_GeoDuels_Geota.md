---
title: "CheatGuessr 通用版｜地理猜谜辅助"
---

# CheatGuessr 通用版｜地理猜谜辅助

`地理游戏`  `辅助工具`  `作弊`  `地图标记`  `社交分享`  `Google地图`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/CheatGuessr_Universal_GeoGuessr_OpenGuessr_WorldGuessr_FreeGuessr_GeoDuels_Geota.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**12.5**　　发现时间：**2026-06-22**　　来源：[GreasyFork](https://greasyfork.org/scripts/572651-cheatguessr-universal-geoguessr-openguessr-worldguessr-freeguessr-geoduels-geotastic) <Badge type="tip" text="GreasyFork" />　　安装量：**6,297**　　评分：👍11 / 👎6

## 功能介绍

本脚本为 GeoGuessr 及类似地理猜谜游戏提供隐蔽式辅助功能。用户可通过按 Tab 键打开设置菜单，在地图上标记位置、将信息发送到 Discord、或直接在 Google 地图中查看当前位置。

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

1. 安装脚本后，进入支持的地理猜谜游戏网站。
2. 按 Tab 键打开脚本的设置菜单。
3. 根据菜单提示，在地图上标记位置或发送信息到 Discord。
4. 可一键在 Google 地图中查看当前位置。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_setValue` | 用于保存脚本的设置和数据。 |
| `GM_getValue` | 用于读取脚本保存的设置和数据。 |
| `GM_deleteValue` | 用于删除脚本保存的设置和数据。 |
| `GM_xmlhttpRequest` | 用于发送网络请求，如将信息发送到 Discord。 |

## 安全分析

**风险等级**：🔴 HIGH　　**安全评分**：52/100　　**分析时间**：2026-06-22

> This script transmits user data (such as map pins or guesses) to third-party servers (notably Discord), which is a critical privacy and data exfiltration risk. It also manipulates DOM security features (sandboxing, anti-cheat) and uses Notification API. While it does not appear to collect sensitive browser data or use obfuscation, the supply chain risk from unpinned @require remains. The overall risk is HIGH and the script is NOT approved for use in sensitive environments.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：discord.com, nominatim.openstreetmap.org） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ⚠️ 使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**⛔ CRITICAL** — Data Exfiltration  
> The script uses GM_xmlhttpRequest and @connect to discord.com and nominatim.openstreetmap.org, which can transmit user data (e.g., map pins, possibly location guesses) to third-party servers. This is a data exfiltration risk, especially for Discord webhooks.  
> 位置：GM_xmlhttpRequest calls and @connect metadata  
> 建议：Limit data transmission to only what is necessary, and clearly inform users what data is sent. Avoid sending sensitive or identifying information.

**🔴 HIGH** — DOM/Frame Policy Manipulation  
> The script disables or bypasses iframe sandboxing and anti-cheat scripts on some platforms, which may weaken security boundaries and is a form of privilege escalation.  
> 位置：Element.prototype.setAttribute proxy and script removal logic  
> 建议：Do not weaken sandboxing or remove anti-cheat scripts unless absolutely necessary and with user consent.

**🟠 MEDIUM** — Sensitive API Usage  
> The script uses Notification API (Notification.permission), which can be abused to send unwanted notifications to the user.  
> 位置：state.notificationPermission and Notification API usage  
> 建议：Request notification permissions only when necessary and provide clear user controls.

**🟠 MEDIUM** — Supply Chain Risk  
> The script uses @require to load msgpack.js from update.greasyfork.org, which is a trusted CDN, but the version is not pinned by hash. This is a supply chain risk if the remote file is compromised.  
> 位置：@require https://update.greasyfork.org/scripts/423602/1005014/msgpack.js  
> 建议：Pin third-party dependencies by hash or use a well-known, immutable CDN.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/572651-cheatguessr-universal-geoguessr-openguessr-worldguessr-freeguessr-geoduels-geotastic)*
