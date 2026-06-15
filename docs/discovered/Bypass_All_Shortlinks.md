---
title: "旁路全部短链接"
---

# 旁路全部短链接

`短链接跳过`  `广告屏蔽`  `自动跳转`  `弹窗拦截`  `自动下载`  `浏览优化`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Bypass_All_Shortlinks.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**96.7**　　发现时间：**2026-06-15**　　来源：[GreasyFork](https://greasyfork.org/scripts/431691-bypass-all-shortlinks) <Badge type="tip" text="GreasyFork" />　　安装量：**475,405**　　评分：👍584 / 👎89

## 功能介绍

本脚本可自动跳过各种短链接和链接缩短器，直接进入目标页面。它还可绕过AdFly、屏蔽烦人的广告、弹窗和提示，自动下载文件及YouTube视频，提升浏览体验。

## 适用网站

- 所有网站（除部分主流网站如百度、谷歌、B站、淘宝、亚马逊、支付宝、微信等）

## 使用方法

1. 安装脚本后，访问包含短链接的网站。
2. 脚本会自动跳过短链接，直接进入目标页面。
3. 遇到广告、弹窗或提示会自动屏蔽。
4. 如有自动下载需求，脚本会自动处理。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_setValue` | 用于保存脚本设置或数据。 |
| `GM_getValue` | 用于读取脚本保存的数据。 |
| `GM_addStyle` | 用于动态添加自定义样式，优化页面显示。 |
| `GM_openInTab` | 用于在新标签页打开目标链接。 |
| `GM_setClipboard` | 用于复制目标链接到剪贴板。 |
| `GM_xmlhttpRequest` | 用于发送网络请求，获取真实目标链接。 |
| `window.onurlchange` | 用于监听网址变化，自动处理短链接跳转。 |
| `GM_registerMenuCommand` | 用于在浏览器菜单中添加脚本功能入口。 |

## 安全分析

**风险等级**：⛔ CRITICAL　　**安全评分**：9/100　　**分析时间**：2026-06-15

> The script poses significant risks due to data transmission to third-party services, privacy collection, DOM XSS vulnerabilities, and supply chain risks. It requests high privileges and manipulates sensitive APIs. Use with caution and only after thorough review of all external endpoints and bypass logic.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：Third-party shortlink services, External APIs (potentially for bypass logic)） |
| 隐私采集 | ❌ 检测到（Accesses localStorage/sessionStorage, May access cookies for bypass tokens） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ❌ 存在风险 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**⛔ CRITICAL** — Data Exfiltration  
> Script uses GM_xmlhttpRequest to interact with external shortlink services and APIs, potentially transmitting user navigation data and page context.  
> 位置：Multiple places in main script logic (bypass routines)  
> 建议：Restrict external requests to only necessary endpoints, avoid transmitting sensitive user data, and document all external destinations.

**⛔ CRITICAL** — Privacy Collection  
> Script reads and manipulates localStorage, sessionStorage, and may access cookies to manage bypass state and tokens.  
> 位置：Bypass logic and storage routines  
> 建议：Ensure only non-sensitive data is accessed and never transmitted externally.

**🔴 HIGH** — DOM XSS  
> Script uses innerHTML and document.write to inject bypassed links and content, which may allow DOM XSS if user input or URL parameters are not sanitized.  
> 位置：Link injection and redirection logic  
> 建议：Always sanitize user input and URL parameters before inserting into DOM.

**🔴 HIGH** — DOM XSS  
> Script uses innerHTML and document.write with dynamic content, increasing risk of injection.  
> 位置：DOM manipulation routines  
> 建议：Avoid using innerHTML/document.write with unsanitized data.

**🟠 MEDIUM** — Supply Chain Risk  
> Script loads external code via @require from update.greasyfork.org, but does not use version hash or integrity checks.  
> 位置：Metadata block (@require)  
> 建议：Pin @require to a specific version hash and verify source integrity.

**🟠 MEDIUM** — Permission Abuse  
> Script requests high privileges (GM_openInTab, GM_setClipboard, GM_xmlhttpRequest) but may not use all safely or minimally.  
> 位置：Metadata block (@grant)  
> 建议：Reduce privilege scope to only what is strictly necessary.

**🟠 MEDIUM** — Sensitive API Usage  
> Script uses GM_setClipboard to copy bypassed links, which could be abused if malicious links are injected.  
> 位置：Clipboard manipulation routines  
> 建议：Validate all links before copying to clipboard.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/431691-bypass-all-shortlinks)*
