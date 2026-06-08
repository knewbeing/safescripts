---
title: "Github 增强 - 高速下载"
---

# Github 增强 - 高速下载

`下载加速`  `Github增强`  `文件管理`  `公益加速`  `开发者工具`  `快捷操作`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/managed/GitHub_20Issue_20Link_20Status.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**2.6.38**　　最后更新：**2026-06-01**

## 功能介绍

本脚本为 Github 提供高速下载功能，支持加速 Git Clone/SSH、Release、Raw、Code(ZIP) 等文件的下载，并可在项目列表中实现单文件快捷下载。通过公益加速源，大幅提升下载速度和体验。

## 适用网站

- Github
- bgithub.xyz

## 使用方法

1. 安装脚本后，访问 Github 网站。
2. 在项目页面或文件列表中，会出现高速下载按钮或菜单。
3. 点击对应按钮即可通过加速源下载文件。
4. 如需自定义加速源或反馈问题，可在菜单中操作。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_registerMenuCommand` | 用于在浏览器菜单中添加自定义命令，方便用户操作。 |
| `GM_unregisterMenuCommand` | 用于移除自定义菜单命令，保持界面整洁。 |
| `GM_openInTab` | 用于在新标签页打开链接，便于下载和浏览。 |
| `GM_getValue` | 用于存储和读取用户的设置或偏好。 |
| `GM_setValue` | 用于保存用户设置或状态信息。 |
| `GM_notification` | 用于在浏览器弹出通知，提醒用户操作结果。 |
| `GM_setClipboard` | 用于复制下载链接到剪贴板，方便用户粘贴使用。 |
| `window.onurlchange` | 用于监听网址变化，确保脚本在页面切换时正常工作。 |

## 安全分析

**风险等级**：🟠 MEDIUM　　**安全评分**：67/100　　**分析时间**：2026-06-08

> The script does not collect user privacy data or perform code obfuscation. Its main risk is redirecting downloads to a large number of third-party proxy services, which could log or process user download requests. There is no evidence of keylogging, clipboard reading, or DOM XSS. The script requests more permissions than strictly necessary, and some proxy endpoints are hosted on less-known domains, introducing supply chain risk. Overall, the script is safe for most users but carries medium risk due to third-party data transmission and supply chain concerns. Users should be aware that their download requests are visible to the proxy operators.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：Multiple public GitHub acceleration proxy services (e.g., gh.h233.eu.org, gh-proxy.org, ghproxy.net, wget.la, etc.)） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**⛔ CRITICAL** — Data Transmission to Third Parties  
> The script rewrites download links to use third-party GitHub acceleration proxy services. This involves redirecting user-initiated downloads to external servers, which may log or process user download requests.  
> 位置：download_url_us, clone_url, raw_url, etc. (proxy list and link rewriting logic)  
> 建议：Clearly inform users of the proxy services used and their privacy policies. Consider allowing users to opt-out or select preferred proxies. Warn users about potential privacy risks when using third-party proxies.

**🟠 MEDIUM** — Permission Overgrant  
> The script requests a large set of @grant permissions, including GM_openInTab, GM_notification, GM_setClipboard, and window.onurlchange, some of which are not strictly necessary for the core download acceleration functionality.  
> 位置：@grant metadata block  
> 建议：Reduce @grant permissions to the minimum required for functionality. Remove unused or unnecessary permissions to minimize attack surface.

**🟠 MEDIUM** — Supply Chain Risk  
> Some acceleration proxy URLs are hosted on less-known or personal domains, which may pose supply chain risks if the proxy operator is compromised or acts maliciously.  
> 位置：download_url_us, clone_url, raw_url, etc. (proxy list)  
> 建议：Prefer well-known, reputable proxy services. Allow users to review and manage the list of proxies. Warn users about the risks of using unknown third-party proxies.

---

*文档由 SafeScripts 自动生成 · [查看原始脚本](https://update.greasyfork.org/scripts/412245/GitHub%20Issue%20Link%20Status.user.js)*
