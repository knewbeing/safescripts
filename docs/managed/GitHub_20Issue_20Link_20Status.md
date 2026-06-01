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

**风险等级**：🟡 LOW　　**安全评分**：89/100　　**分析时间**：2026-06-01

> The script does not collect or transmit user data, does not execute remote code, and does not use obfuscation. It generates download links pointing to third-party acceleration services, but does not itself transmit data to them unless the user clicks the links. There is minor permission over-provisioning. Overall, the script is safe for use, with a low security risk. Users should be aware that using third-party acceleration services may expose their download activity to those services.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**🟠 MEDIUM** — Permission over-provisioning  
> The script requests several GM_* permissions, including GM_openInTab, GM_notification, GM_setClipboard, and window.onurlchange. Not all of these are strictly necessary for the core download link generation functionality.  
> 位置：@grant metadata block  
> 建议：Review and minimize permissions to only those required for core functionality. Remove unnecessary permissions to reduce attack surface.

**🟡 LOW** — Third-party download link generation  
> The script constructs download URLs using a list of public acceleration proxy services. These URLs are used to facilitate high-speed downloads from GitHub. However, the script itself does not send user data, cookies, or page content to these services; it only generates download links for the user to click.  
> 位置：download_url_us, clone_url, clone_ssh_url, raw_url arrays and related logic  
> 建议：Clearly inform users that clicking these links will send requests to third-party acceleration services, and users should be aware of the privacy policy of those services.

---

*文档由 SafeScripts 自动生成 · [查看原始脚本](https://update.greasyfork.org/scripts/412245/GitHub%20Issue%20Link%20Status.user.js)*
