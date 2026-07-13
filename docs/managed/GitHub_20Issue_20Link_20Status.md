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

**风险等级**：🟡 LOW　　**安全评分**：89/100　　**分析时间**：2026-07-13

> 仅根据元数据分析，未发现明显高危安全风险。未检测到数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS 等问题。存在较多权限申请，建议最小化权限。由于缺少完整代码，无法排查实现层面风险。整体风险较低，但建议补充完整代码以获得更准确的安全评估。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**🟠 MEDIUM** — 代码缺失  
> 未提供完整代码，无法检测实际数据外传、隐私采集、远程代码执行等实现层面风险。仅根据元数据分析。  
> 位置：N/A  
> 建议：建议补充完整代码以进行全面安全审查。

**🟠 MEDIUM** — 权限滥用  
> @grant 权限申请较多（如 GM_openInTab、GM_setClipboard、GM_notification），但无法判断是否全部必要。  
> 位置：元数据 @grant  
> 建议：建议仅申请实际使用的权限，避免权限滥用。

**🟡 LOW** — 供应链风险  
> 未检测到 @require 加载第三方库，供应链风险较低。  
> 位置：元数据 @require  
> 建议：如需加载第三方库，建议使用可信官方 CDN 并固定版本哈希。

---

*文档由 SafeScripts 自动生成 · [查看原始脚本](https://update.greasyfork.org/scripts/412245/GitHub%20Issue%20Link%20Status.user.js)*
