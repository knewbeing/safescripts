---
title: "CheatGuessr 通用版｜GeoGuessr 辅助"
---

# CheatGuessr 通用版｜GeoGuessr 辅助

`游戏辅助`  `地图工具`  `GeoGuessr`  `位置分享`  `自动化`  `社交分享`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/CheatGuessr_Universal_GeoGuessr_OpenGuessr_WorldGuessr_FreeGuessr_GeoDuels.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**11.89**　　发现时间：**2026-06-08**　　来源：[GreasyFork](https://greasyfork.org/scripts/572651-cheatguessr-universal-geoguessr-openguessr-worldguessr-freeguessr-geoduels) <Badge type="tip" text="GreasyFork" />　　安装量：**5,315**　　评分：👍7 / 👎5

## 功能介绍

本脚本是一个隐蔽的 GeoGuessr 辅助工具，支持在地图上标点、将位置发送到 Discord、并在 Google 地图中打开当前位置。按 Tab 键即可打开设置菜单，方便进行相关操作。

## 适用网站

- GeoGuessr
- OpenGuessr
- WorldGuessr
- WorldGuessrGame
- FreeGuessr
- GeoDuels
- GuessWhereYouAre

## 使用方法

1. 安装脚本后，进入支持的网站（如 GeoGuessr）。
2. 在游戏页面按 Tab 键打开设置菜单。
3. 根据菜单提示，在地图上标点、发送位置到 Discord，或在 Google 地图中查看当前位置。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_setValue` | 用于保存脚本的设置和数据。 |
| `GM_getValue` | 用于读取脚本保存的设置和数据。 |
| `GM_deleteValue` | 用于删除脚本保存的设置和数据。 |
| `GM_xmlhttpRequest` | 用于发送网络请求，如将位置发送到 Discord 或获取地理信息。 |

## 安全分析

**风险等级**：🔴 HIGH　　**安全评分**：50/100　　**分析时间**：2026-06-08

> This script transmits user map pin/location data to discord.com and nominatim.openstreetmap.org, which constitutes a critical data exfiltration risk. No evidence of privacy-invasive collection (e.g., cookies, keylogging), code obfuscation, or DOM XSS. Notification API is used, which is a medium risk. Permissions are appropriate for declared features. Supply chain risk is low as no @require is used. Overall, the script is high risk due to third-party data transmission.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：discord.com, nominatim.openstreetmap.org） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — Data Exfiltration  
> The script uses GM_xmlhttpRequest and/or fetch to send data to discord.com (likely for the 'send to Discord' feature). This may include map pin data or user actions.  
> 位置：Network requests, feature: sendToDiscord  
> 建议：Ensure only intended, non-sensitive data is sent. Warn users about data transmission to third-party services.

**⛔ CRITICAL** — Data Exfiltration  
> The script requests access to nominatim.openstreetmap.org, likely for reverse geocoding. While this is a public API, user location data (map pins) may be sent.  
> 位置：Network requests, reverse geocoding  
> 建议：Disclose to users that their map pin/location data may be sent to OpenStreetMap servers.

**🟠 MEDIUM** — Sensitive API Usage  
> The script requests Notification API permission and uses Notification.permission, which can be abused for spam or phishing.  
> 位置：Notification API usage  
> 建议：Limit notification usage to essential features and inform users.

**🟡 LOW** — Permission Usage  
> The script requests and uses GM_xmlhttpRequest, a high-privilege API, but only for the two declared domains. No evidence of over-privilege.  
> 位置：@grant and @connect usage  
> 建议：No action needed unless additional domains are added.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/572651-cheatguessr-universal-geoguessr-openguessr-worldguessr-freeguessr-geoduels)*
