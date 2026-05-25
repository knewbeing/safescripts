---
title: "旁路全部短链接"
---

# 旁路全部短链接

`短链接跳转`  `广告屏蔽`  `自动下载`  `弹窗拦截`  `网页优化`  `全网适用`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Bypass_All_Shortlinks.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**96.7**　　发现时间：**2026-05-25**　　来源：[GreasyFork](https://greasyfork.org/scripts/431691-bypass-all-shortlinks) <Badge type="tip" text="GreasyFork" />　　安装量：**471,443**　　评分：👍583 / 👎89

## 功能介绍

本脚本可自动跳过各种短链接和跳转页面，直接进入目标网站。它能绕过如AdFly等广告页面，屏蔽烦人的广告、弹窗和提示，并自动下载文件、图片和视频（如YouTube、Flickr）。

## 适用网站

- 全网（除部分主流网站如百度、谷歌、B站、淘宝、微信、支付宝、银行等）

## 使用方法

1. 安装脚本后，访问任何短链接或跳转页面时会自动跳过，无需手动操作。
2. 遇到广告、弹窗或提示时，脚本会自动屏蔽。
3. 如需自动下载文件、图片或视频，按页面提示操作即可。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_setValue` | 用于保存脚本设置或临时数据。 |
| `GM_getValue` | 用于读取脚本保存的数据。 |
| `GM_addStyle` | 用于动态添加自定义样式，优化页面显示。 |
| `GM_openInTab` | 用于在新标签页打开目标链接。 |
| `GM_setClipboard` | 用于复制目标链接到剪贴板。 |
| `GM_xmlhttpRequest` | 用于发送网络请求，自动获取跳转目标或下载资源。 |
| `window.onurlchange` | 用于监听网址变化，自动处理跳转。 |
| `GM_registerMenuCommand` | 用于在浏览器菜单中添加脚本功能入口。 |

## 安全分析

**风险等级**：🔴 HIGH　　**安全评分**：52/100　　**分析时间**：2026-05-25

> The script is designed to bypass shortlink services and grants several high privileges, including GM_xmlhttpRequest, GM_openInTab, and GM_setClipboard. While these are necessary for its functionality, they pose risks if abused. The use of @require from GreasyFork CDN is generally safe, but not version-hashed. No evidence of privacy collection, code obfuscation, or DOM XSS was found in the provided code. The main risk is data transmission to third-party domains and potential permission abuse.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：Shortlink service domains (varies per site), GreasyFork CDN (for @require), Potentially other domains via GM_xmlhttpRequest） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**⛔ CRITICAL** — Data Transmission  
> The script uses GM_xmlhttpRequest, which can send requests to arbitrary domains. While this is necessary for bypassing shortlinks, it can potentially transmit user data depending on implementation.  
> 位置：Main script logic (not fully visible in provided code, but GM_xmlhttpRequest is granted)  
> 建议：Ensure only minimal, non-sensitive data is sent to third-party domains. Review full implementation for data sent.

**🟠 MEDIUM** — Permission Abuse  
> The script grants GM_openInTab, which allows opening new tabs. This can be abused for phishing or unwanted navigation if not properly controlled.  
> 位置：Metadata block (@grant GM_openInTab)  
> 建议：Restrict usage to only trusted URLs and avoid opening tabs automatically without user consent.

**🟠 MEDIUM** — Permission Abuse  
> The script grants GM_setClipboard, which can overwrite clipboard contents. This can be abused for clipboard hijacking.  
> 位置：Metadata block (@grant GM_setClipboard)  
> 建议：Ensure clipboard operations are only performed with explicit user action.

**🟠 MEDIUM** — Supply Chain Risk  
> The script uses @require to load MonkeyConfig Mod.js from GreasyFork CDN. While GreasyFork is generally trusted, the URL is not version-hashed and could be updated without notice.  
> 位置：Metadata block (@require https://update.greasyfork.org/scripts/528923/1588272/MonkeyConfig%20Mod.js)  
> 建议：Use a version-hashed or integrity-checked URL to prevent supply chain attacks.

**🟠 MEDIUM** — Permission Abuse  
> The script grants GM_xmlhttpRequest, which is a high privilege and should be justified. If used for bypassing shortlinks, it is expected, but must be reviewed for abuse.  
> 位置：Metadata block (@grant GM_xmlhttpRequest)  
> 建议：Limit GM_xmlhttpRequest usage to only necessary domains and avoid sending sensitive data.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/431691-bypass-all-shortlinks)*
