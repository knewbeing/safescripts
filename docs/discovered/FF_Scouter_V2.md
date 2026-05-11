---
title: "公平战斗评分助手"
---

# 公平战斗评分助手

`游戏辅助`  `Torn`  `战斗分析`  `帮派管理`  `数据展示`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/FF_Scouter_V2.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**2.73**　　发现时间：**2026-05-11**　　来源：[GreasyFork](https://greasyfork.org/scripts/535292-ff-scouter-v2) <Badge type="tip" text="GreasyFork" />　　安装量：**14,637**　　评分：👍3 / 👎0

## 功能介绍

本脚本可在 Torn 游戏网站上，显示你与目标玩家的 Fair Fight 分数预期，以及帮派战争状态。它通过界面提示，让你更好地评估对手和战局。适合活跃参与帮派战斗的玩家使用。

## 适用网站

- Torn 城市（Torn.com）

## 使用方法

1. 1. 安装脚本后，登录 Torn 网站。
2. 2. 浏览玩家或帮派相关页面时，界面会自动显示 Fair Fight 分数和帮派战况。
3. 3. 可通过浏览器扩展菜单手动调整脚本设置。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_xmlhttpRequest` | 允许脚本从外部网站获取数据，用于计算分数和状态。 |
| `GM_setValue` | 保存脚本设置和缓存数据，提升使用体验。 |
| `GM_getValue` | 读取之前保存的设置和数据。 |
| `GM_listValues` | 列出所有已保存的数据键，方便管理缓存。 |
| `GM_deleteValue` | 删除不再需要的缓存或设置数据。 |
| `GM_registerMenuCommand` | 在浏览器扩展菜单中添加自定义命令，便于手动操作脚本功能。 |
| `GM_addStyle` | 为页面添加自定义样式，让分数和状态显示更直观。 |

## 安全分析

**风险等级**：🟡 LOW　　**安全评分**：72/100　　**分析时间**：2026-05-11

> The script communicates with ffscouter.com using GM_xmlhttpRequest, which is declared and expected for its functionality. No evidence of privacy-invasive data collection, code obfuscation, remote code execution, or DOM XSS is present in the provided code. All granted permissions appear to be used appropriately. The main risk is the potential for sensitive data transmission to ffscouter.com, which should be reviewed in detail. Overall, the script is low risk but should be periodically audited for changes.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：ffscouter.com） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — Data Transmission  
> Script uses GM_xmlhttpRequest to communicate with ffscouter.com. While this is declared in @connect, the exact data sent is not visible in the provided code excerpt. If user or page data is sent, this could be a privacy concern.  
> 位置：GM_xmlhttpRequest calls (likely throughout script, but not fully visible in excerpt)  
> 建议：Review all GM_xmlhttpRequest payloads to ensure no sensitive user data (such as cookies, authentication tokens, or personal information) is transmitted. Document what is sent and why.

**🔴 HIGH** — Remote Code Execution  
> No use of eval, new Function, setTimeout(string), setInterval(string), or dynamic script injection detected in the provided code. No @require for remote scripts.  
> 位置：Global scope and all visible functions  
> 建议：Continue to avoid dynamic code execution and remote script loading. If adding @require, pin versions and use trusted sources.

**🔴 HIGH** — Code Obfuscation  
> No evidence of code obfuscation, base64 decoding, or minified/obfuscated code in the provided excerpt.  
> 位置：Global scope and all visible code  
> 建议：Maintain code readability and avoid obfuscation for transparency.

**🔴 HIGH** — DOM XSS  
> No direct insertion of user input or URL parameters into innerHTML/outerHTML without sanitization detected. No document.write usage.  
> 位置：DOM manipulation sections (CSS injection, etc.)  
> 建议：Always sanitize any user-controlled input before inserting into the DOM.

**🟠 MEDIUM** — Privacy Collection  
> The script requests persistent storage permissions (GM_setValue, GM_getValue, etc.) and registers menu commands, but does not appear to access cookies, localStorage, or sessionStorage directly. No evidence of keylogging or clipboard access.  
> 位置：Global scope and function calls  
> 建议：Ensure no future code additions introduce privacy-invasive behaviors. Avoid collecting more data than necessary.

**🟠 MEDIUM** — Permission Usage  
> Script requests several GM_* permissions, but all appear to be used. No evidence of unused high-privilege grants.  
> 位置：@grant metadata and code usage  
> 建议：Periodically audit granted permissions to ensure least privilege.

**🟠 MEDIUM** — Sensitive API Usage  
> No use of geolocation, WebRTC, MediaDevices, or Notification API detected. No clipboard read access.  
> 位置：Global scope and all visible code  
> 建议：Continue to avoid sensitive browser APIs unless strictly necessary.

**🟠 MEDIUM** — Supply Chain Risk  
> @require is not used. No supply chain risk from third-party libraries in the provided code.  
> 位置：@require metadata  
> 建议：If adding dependencies, use official CDNs and pin versions/hashes.

**🟡 LOW** — Clickjacking/Iframe  
> No evidence of frame busting, clickjacking, or hidden iframes for data extraction.  
> 位置：DOM manipulation sections  
> 建议：Continue to avoid iframe-based risks.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/535292-ff-scouter-v2)*
