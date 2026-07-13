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

**风险等级**：🔴 HIGH　　**安全评分**：67/100　　**分析时间**：2026-07-13

> The script metadata requests several high-privilege permissions (GM_xmlhttpRequest, GM_openInTab, GM_setClipboard) and loads a remote library without a fixed version, introducing supply chain risk. The actual script code is missing, so a full review is not possible. Based on the metadata, there is a high risk of data exfiltration and permission abuse if the script or its dependencies are compromised. No evidence of privacy collection, obfuscation, or DOM XSS is present in the metadata.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：Third-party shortlink services (varies, based on GM_xmlhttpRequest usage), https://update.greasyfork.org/scripts/528923/1588272/MonkeyConfig%20Mod.js (via @require)） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**⛔ CRITICAL** — Data Exfiltration  
> The script requests GM_xmlhttpRequest permission, which allows arbitrary cross-origin requests. The actual script code is missing, but the permission itself is high risk if misused.  
> 位置：Metadata block (@grant GM_xmlhttpRequest)  
> 建议：Review the script code for actual usage. Limit requests to trusted domains only.

**🟠 MEDIUM** — Supply Chain Risk  
> The script uses @require to load a remote library (MonkeyConfig Mod.js) from update.greasyfork.org without a version hash. This introduces supply chain risk if the remote file is compromised.  
> 位置：Metadata block (@require)  
> 建议：Pin the @require to a specific version or hash, and only use trusted sources.

**🟠 MEDIUM** — Permission Abuse  
> The script requests high-privilege grants such as GM_openInTab and GM_setClipboard, which can be abused if the script is malicious or compromised.  
> 位置：Metadata block (@grant GM_openInTab, GM_setClipboard)  
> 建议：Only request permissions that are strictly necessary for script functionality.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/431691-bypass-all-shortlinks)*
