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

**风险等级**：🔴 HIGH　　**安全评分**：49/100　　**分析时间**：2026-06-29

> This script transmits map pin/location data to third-party servers (discord.com, nominatim.openstreetmap.org), which is a critical risk if sensitive data is included. It does not appear to collect sensitive user data or credentials, nor does it use obfuscation or dangerous code execution patterns. It uses Notification API and modifies iframe sandboxing, which are medium/low risks. The supply chain risk is moderate due to unpinned @require. Overall, the script is not safe for privacy-sensitive users and should be used with caution.

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
> The script uses GM_xmlhttpRequest and requests to discord.com and nominatim.openstreetmap.org, which are third-party servers. The script can send map pin data or location information to Discord (as described in the metadata and code).  
> 位置：GM_xmlhttpRequest usage, @connect discord.com, @connect nominatim.openstreetmap.org  
> 建议：Ensure no sensitive user data (such as cookies, tokens, or personal information) is sent. Only send minimal necessary data. Inform users clearly about what is sent.

**🟠 MEDIUM** — Sensitive API Usage  
> The script requests Notification permission and can send notifications to the user.  
> 位置：state.notificationPermission, Notification API usage  
> 建议：Do not abuse Notification API. Only send notifications relevant to the script's function.

**🟠 MEDIUM** — Permission Usage  
> The script requests and uses GM_xmlhttpRequest, which is a high-privilege API, but this is justified by the script's features. No evidence of unused high-privilege grants.  
> 位置：@grant GM_xmlhttpRequest  
> 建议：Review and minimize granted permissions. Remove any unused grants.

**🟠 MEDIUM** — Supply Chain Risk  
> The script uses @require to load msgpack.js from update.greasyfork.org, which is a trusted CDN, but the version is not pinned by hash.  
> 位置：@require https://update.greasyfork.org/scripts/423602/1005014/msgpack.js  
> 建议：Pin the required library to a specific version or hash to prevent supply chain attacks.

**🟡 LOW** — ClickJacking / iframe Risk  
> The script modifies Element.prototype.setAttribute to bypass iframe sandboxing on non-GeoGuessr platforms. This can weaken frame protection.  
> 位置：Element.prototype.setAttribute Proxy  
> 建议：Avoid weakening browser security features unless absolutely necessary. Document the reason for this modification.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/572651-cheatguessr-universal-geoguessr-openguessr-worldguessr-freeguessr-geoduels-geotastic)*
