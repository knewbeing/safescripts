---
title: "Github增强 - 高速下载"
---

# Github增强 - 高速下载

`下载加速`  `Github增强`  `文件管理`  `公益加速`  `开发者工具`  `快捷操作`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/GithubEnhanced-High-Speed-Download.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**2.6.38**　　发现时间：**2026-06-22**　　来源：[XIU2/UserScript](https://github.com/XIU2/UserScript) <Badge type="tip" text="GitHub" />

## 功能介绍

本脚本为Github提供高速下载功能，包括Git Clone/SSH、Release、Raw、Code(ZIP)等文件，并支持项目列表单文件快捷下载。通过公益加速源，提升下载速度，方便用户获取所需资源。

## 适用网站

- Github
- bgithub加速镜像

## 使用方法

1. 安装脚本后，访问Github相关页面。
2. 在文件、代码、Release等页面会出现高速下载按钮。
3. 点击按钮即可通过加速源下载所需文件。
4. 如需切换加速源或反馈问题，可在浏览器菜单中操作。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_registerMenuCommand` | 用于在浏览器菜单中添加自定义命令，方便用户操作。 |
| `GM_unregisterMenuCommand` | 用于移除自定义菜单命令。 |
| `GM_openInTab` | 用于在新标签页打开加速下载链接。 |
| `GM_getValue` | 用于保存用户设置，如加速源选择。 |
| `GM_setValue` | 用于存储用户偏好和配置。 |
| `GM_notification` | 用于弹出通知提醒用户操作结果。 |
| `GM_setClipboard` | 用于复制下载链接到剪贴板，方便用户粘贴使用。 |
| `window.onurlchange` | 用于监听网址变化，确保脚本在页面切换时正常工作。 |

## 安全分析

**风险等级**：🔴 HIGH　　**安全评分**：50/100　　**分析时间**：2026-06-22

> The script does not contain code execution, XSS, or obfuscation risks, and does not collect cookies or sensitive browser data. However, it rewrites download links to route through a large number of third-party CDN/proxy services, which introduces significant privacy and supply chain risks. User download activity and repository/file URLs are exposed to these external services. The script should be considered HIGH risk unless all endpoints are trusted and users are made aware of the privacy implications.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：Multiple third-party CDN/proxy services (e.g., gh.h233.eu.org, gh-proxy.org, ghproxy.net, wget.la, etc.)） |
| 隐私采集 | ❌ 检测到（Download URLs (repository/file info) sent to third-party proxies） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**⛔ CRITICAL** — Data Transmission  
> The script rewrites download links to route through a large number of third-party CDN/proxy services, which may result in user-initiated downloads being sent to these external servers. This exposes user download activity and potentially the URLs of files being accessed.  
> 位置：download_url_us, clone_url, raw_url arrays and related link rewriting logic  
> 建议：Warn users about the privacy implications and allow disabling or customizing proxy endpoints. Prefer well-known, trusted proxies and document their privacy policies.

**⛔ CRITICAL** — Privacy Collection  
> The script does not appear to collect or transmit cookies, form data, or other sensitive user data, nor does it listen to keyboard events or access browser fingerprinting APIs. However, the download URLs may contain repository or file information, which could be considered sensitive in some contexts.  
> 位置：General script logic  
> 建议：Document what information is sent to third-party proxies and allow users to opt out.

**🟠 MEDIUM** — Supply Chain Risk  
> The script relies on a large number of third-party CDN/proxy endpoints, many of which are not official or well-known. This introduces supply chain risk, as these endpoints could be compromised or log user activity.  
> 位置：download_url_us, clone_url, raw_url arrays  
> 建议：Allow users to review and select proxy endpoints. Prefer official or widely trusted endpoints. Regularly audit the list for safety.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/XIU2/UserScript/d8fcb017ba7108be3b9813667e63b7f28cbf6424/GithubEnhanced-High-Speed-Download.user.js)*
