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

**风险等级**：🔴 HIGH　　**安全评分**：49/100　　**分析时间**：2026-07-13

> This script transmits data to third-party services (discord.com and nominatim.openstreetmap.org), which may include game state or location information. It accesses localStorage and uses persistent storage APIs, but does not appear to collect sensitive user data such as cookies, passwords, or clipboard contents. There is no evidence of code obfuscation, DOM XSS, or remote code execution. The script loads a third-party library from a trusted source, but the version is not pinned by hash. Notification API is used, but not abused. Overall, the script poses a HIGH risk due to data exfiltration to third-party services.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：discord.com, nominatim.openstreetmap.org） |
| 隐私采集 | ❌ 检测到（localStorage access via Storage.prototype.setItem, GM_setValue/GM_getValue usage） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ⚠️ 使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**⛔ CRITICAL** — Data Exfiltration  
> The script uses GM_xmlhttpRequest to send data to discord.com (likely via webhook) and nominatim.openstreetmap.org. This can be used to exfiltrate user data, game state, or location information.  
> 位置：GM_xmlhttpRequest usage, @connect metadata  
> 建议：Limit data sent to third-party services, ensure no sensitive or user-identifiable information is transmitted, and inform users of any data sharing.

**🟠 MEDIUM** — Privacy Collection  
> The script reads and writes to localStorage via Storage.prototype.setItem proxying, and uses GM_setValue/GM_getValue for persistent storage. There is no evidence of exfiltration of this data, but local storage access is present.  
> 位置：Storage.prototype.setItem, GM_setValue/GM_getValue  
> 建议：Ensure no sensitive user data is stored or transmitted. Do not store credentials or personal information.

**🟠 MEDIUM** — Sensitive API Usage  
> The script requests Notification API permission and may use Notification API to send notifications to the user.  
> 位置：state.notificationPermission, Notification.permission  
> 建议：Do not abuse Notification API for spam or misleading notifications.

**🟠 MEDIUM** — Supply Chain Risk  
> The script uses @require to load msgpack.js from update.greasyfork.org, which is a trusted CDN, but the version is not pinned by hash.  
> 位置：@require https://update.greasyfork.org/scripts/423602/1005014/msgpack.js  
> 建议：Pin third-party dependencies by version and hash to prevent supply chain attacks.

**🟡 LOW** — Permission Usage  
> The script requests GM_xmlhttpRequest permission, which is used and justified, but also requests GM_setValue, GM_getValue, and GM_deleteValue. All are used, but the script does not request unnecessary high-risk permissions.  
> 位置：@grant metadata  
> 建议：Only request permissions that are strictly necessary.

**🟡 LOW** — DOM/Prototype Modification  
> The script modifies Element.prototype.setAttribute and Storage.prototype.setItem via Proxy, which can have side effects and may break page functionality or introduce compatibility issues.  
> 位置：Element.prototype.setAttribute, Storage.prototype.setItem  
> 建议：Avoid monkey-patching built-in prototypes unless absolutely necessary.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/572651-cheatguessr-universal-geoguessr-openguessr-worldguessr-freeguessr-geoduels-geotastic)*
