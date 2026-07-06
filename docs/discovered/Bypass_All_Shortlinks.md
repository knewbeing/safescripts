---
title: "旁路全部短链接"
---

# 旁路全部短链接

`短链接跳过`  `广告屏蔽`  `自动跳转`  `弹窗拦截`  `自动下载`  `网页优化`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Bypass_All_Shortlinks.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**96.7**　　发现时间：**2026-07-06**　　来源：[GreasyFork](https://greasyfork.org/scripts/431691-bypass-all-shortlinks) <Badge type="tip" text="GreasyFork" />　　安装量：**480,203**　　评分：👍589 / 👎89

## 功能介绍

本脚本可自动跳过各种短链接和跳转页面，让你直接访问目标网站。它还能跳过广告页面（如AdFly）、屏蔽广告拦截检测、阻止烦人的弹窗和提示，并支持自动下载文件、图片和视频（如YouTube）。

## 适用网站

- 所有网站（除部分主流网站如B站、淘宝、谷歌、Facebook等）

## 使用方法

1. 1. 安装脚本后，访问任何包含短链接的网站。
2. 2. 脚本会自动跳过短链接和广告页面，无需手动操作。
3. 3. 若遇到弹窗或提示，脚本会自动屏蔽。
4. 4. 下载文件、图片或视频时，脚本会自动处理并下载。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_setValue` | 用于保存脚本设置和状态。 |
| `GM_getValue` | 用于读取脚本保存的数据。 |
| `GM_addStyle` | 用于动态添加自定义样式，优化页面显示。 |
| `GM_openInTab` | 用于在新标签页打开链接，方便跳转。 |
| `GM_setClipboard` | 用于复制目标链接到剪贴板，便于分享或访问。 |
| `GM_xmlhttpRequest` | 用于发送网络请求，自动获取跳转后的真实链接。 |
| `window.onurlchange` | 用于监听网址变化，自动处理跳转。 |
| `GM_registerMenuCommand` | 用于在浏览器菜单中添加脚本功能入口。 |

## 安全分析

**风险等级**：🔴 HIGH　　**安全评分**：34/100　　**分析时间**：2026-07-06

> The script presents significant security risks due to broad URL matching, high-privilege grants, supply chain risk from @require, and likely DOM manipulation. Data exfiltration is possible via GM_xmlhttpRequest. Without full code, the risk of privacy collection and DOM XSS is high. Not recommended for use without further review and restriction.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：Shortlink service domains (varies per site), GreasyFork CDN (for @require), Potentially other domains via GM_xmlhttpRequest） |
| 隐私采集 | ❌ 检测到（Script runs on all sites, can access DOM, cookies, localStorage, sessionStorage., Potential to read form fields, clipboard, or other sensitive data.） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ❌ 存在风险 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**⛔ CRITICAL** — Data Exfiltration  
> The script uses GM_xmlhttpRequest, which can send requests to arbitrary domains. Without full code, it's unclear if user data or cookies are transmitted, but the risk is present.  
> 位置：GM_xmlhttpRequest usage (metadata and likely in main code)  
> 建议：Review all GM_xmlhttpRequest calls to ensure no sensitive user data is sent to third-party domains.

**🔴 HIGH** — Privacy Collection  
> The script matches all URLs (*://*/*), increasing the risk of privacy collection and data exfiltration across all visited sites.  
> 位置：@match *://*/*  
> 建议：Restrict match patterns to only shortlink domains or add domain-specific logic.

**🔴 HIGH** — DOM XSS  
> Potential DOM XSS risk due to the script's purpose (bypassing shortlinks, manipulating DOM, skipping ads/popups). Without full code, it's likely user input or URL parameters are inserted into the DOM.  
> 位置：Main script logic (not fully provided)  
> 建议：Sanitize all user input and URL parameters before inserting into DOM via innerHTML/outerHTML/document.write.

**🟠 MEDIUM** — Permission Abuse  
> The script grants GM_openInTab, GM_setClipboard, and GM_xmlhttpRequest, which are high-privilege APIs. Not all may be necessary for bypassing shortlinks.  
> 位置：@grant section  
> 建议：Remove unused or unnecessary grants to minimize attack surface.

**🟠 MEDIUM** — Supply Chain Risk  
> The script loads a third-party library via @require from GreasyFork CDN. While GreasyFork is generally trusted, the version is not pinned with a hash, so supply chain risk exists.  
> 位置：@require https://update.greasyfork.org/scripts/528923/1588272/MonkeyConfig%20Mod.js  
> 建议：Pin @require to a specific version or hash, and periodically review the library for malicious changes.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/431691-bypass-all-shortlinks)*
