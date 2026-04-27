---
title: "旁路全部短链接"
---

# 旁路全部短链接

`短链接跳过`  `广告屏蔽`  `自动跳转`  `弹窗拦截`  `自动下载`  `网页优化`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Bypass_All_Shortlinks.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**96.7**　　发现时间：**2026-04-27**　　来源：[GreasyFork](https://greasyfork.org/scripts/431691-bypass-all-shortlinks) <Badge type="tip" text="GreasyFork" />　　安装量：**466,308**　　评分：👍578 / 👎89

## 功能介绍

本脚本可自动跳过各种短链接和跳转页面，直接进入目标网站。它还能绕过 AdFly、烦人的广告、弹窗和提示，自动下载文件、图片和视频（如 YouTube、Flickr），并屏蔽广告拦截检测。

## 适用网站

- 所有网站（除部分主流网站如百度、谷歌、B站、淘宝、微信、支付宝等）

## 使用方法

1. 安装脚本后，访问任何短链接或跳转页面。
2. 脚本会自动跳过中间广告和跳转，直接进入目标页面。
3. 如遇弹窗、广告或下载提示，脚本会自动处理，无需手动操作。
4. 可在浏览器扩展菜单中找到脚本设置或手动触发功能。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_setValue` | 用于保存脚本设置和状态。 |
| `GM_getValue` | 用于读取脚本保存的数据。 |
| `GM_addStyle` | 用于动态添加自定义样式，优化页面显示。 |
| `GM_openInTab` | 用于在新标签页打开目标链接。 |
| `GM_setClipboard` | 用于复制目标链接到剪贴板。 |
| `GM_xmlhttpRequest` | 用于发起网络请求，自动获取跳转目标。 |
| `window.onurlchange` | 用于监听网址变化，自动处理跳转。 |
| `GM_registerMenuCommand` | 用于在浏览器菜单中添加脚本操作入口。 |

## 安全分析

**风险等级**：🔴 HIGH　　**安全评分**：44/100　　**分析时间**：2026-04-27

> The script's core function requires network requests to third-party shortlink domains, which poses a critical risk of data transmission. Several medium risks are present due to permission grants and supply chain concerns. No evidence of privacy collection, code obfuscation, or DOM XSS was found in the metadata and partial code. The script is not approved for use in sensitive environments without further review of the full implementation.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：Third-party shortlink domains (dynamic, based on visited sites), GreasyFork CDN (for @require), Potentially other domains via GM_xmlhttpRequest） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**⛔ CRITICAL** — Data Transmission  
> Script uses GM_xmlhttpRequest to interact with external shortlink domains. While this is core to its function, it may transmit user navigation data and potentially cookies to third-party services.  
> 位置：Main script logic (not fully visible in provided code, but inferred from description and grants)  
> 建议：Ensure only minimal, non-sensitive data is sent. Avoid transmitting cookies or user-identifiable information.

**🟠 MEDIUM** — Permission Abuse  
> Script requests GM_openInTab permission, which allows opening arbitrary URLs in new tabs. This can be abused if not properly controlled.  
> 位置：Metadata block (@grant GM_openInTab)  
> 建议：Restrict usage to only trusted URLs. Remove permission if not strictly necessary.

**🟠 MEDIUM** — Permission Abuse  
> Script requests GM_setClipboard permission, which allows writing to the clipboard. This can be abused for phishing or unwanted clipboard manipulation.  
> 位置：Metadata block (@grant GM_setClipboard)  
> 建议：Limit clipboard writes to explicit user actions. Remove permission if not strictly necessary.

**🟠 MEDIUM** — Permission Abuse  
> Script requests GM_xmlhttpRequest permission, which is necessary for bypassing shortlinks but can be abused for data exfiltration.  
> 位置：Metadata block (@grant GM_xmlhttpRequest)  
> 建议：Ensure all requests are transparent and only target shortlink domains. Avoid sending sensitive data.

**🟠 MEDIUM** — Supply Chain Risk  
> Script uses @require to load MonkeyConfig Mod.js from GreasyFork CDN. While GreasyFork is generally trusted, the version is not pinned with a hash, so supply chain risk exists.  
> 位置：Metadata block (@require https://update.greasyfork.org/scripts/528923/1588272/MonkeyConfig%20Mod.js)  
> 建议：Pin @require to a version hash or use official, immutable CDN links.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/431691-bypass-all-shortlinks)*
