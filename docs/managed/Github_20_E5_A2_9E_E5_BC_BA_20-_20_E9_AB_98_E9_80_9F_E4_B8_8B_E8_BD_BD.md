---
title: "Github增强 - 高速下载"
---

# Github增强 - 高速下载

`下载加速`  `Github增强`  `代码管理`  `资源获取`  `公益加速`  `开发工具`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/managed/Github_20_E5_A2_9E_E5_BC_BA_20-_20_E9_AB_98_E9_80_9F_E4_B8_8B_E8_BD_BD.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**2.6.38**　　最后更新：**2026-06-01**

## 功能介绍

本脚本为Github提供高速下载功能，支持加速Git Clone/SSH、Release、Raw、Code(ZIP)等文件的下载，并可在项目列表中快速下载单个文件。通过公益加速源提升下载速度，方便用户获取代码和资源。

## 适用网站

- Github
- bgithub加速镜像

## 使用方法

1. 安装脚本后，访问Github或bgithub加速镜像网站。
2. 在项目页面会出现高速下载按钮或菜单。
3. 点击相关按钮即可通过加速源下载代码、文件或Release资源。
4. 如需更换加速源或反馈问题，可在菜单中操作。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_registerMenuCommand` | 用于在浏览器菜单中添加自定义命令，方便用户操作。 |
| `GM_unregisterMenuCommand` | 用于移除自定义菜单命令，保持菜单整洁。 |
| `GM_openInTab` | 允许脚本在新标签页打开链接，便于下载或查看文件。 |
| `GM_getValue` | 用于存储和读取用户设置，如加速源选择等。 |
| `GM_setValue` | 用于保存用户偏好设置，提升使用体验。 |
| `GM_notification` | 在下载完成或操作时弹出通知，提醒用户。 |
| `GM_setClipboard` | 一键复制下载链接到剪贴板，方便粘贴使用。 |
| `window.onurlchange` | 监听网址变化，确保功能在页面切换时持续有效。 |

## 安全分析

**风险等级**：🟢 SAFE　　**安全评分**：100/100　　**分析时间**：2026-07-13

> 未检测到任何脚本内容，因此未发现安全风险。元数据未显示 @require 远程依赖，也无可疑权限滥用。此脚本当前为安全状态。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 未发现安全问题 ✅

---

*文档由 SafeScripts 自动生成 · [查看原始脚本](https://update.greasyfork.org/scripts/412245/Github%20%E5%A2%9E%E5%BC%BA%20-%20%E9%AB%98%E9%80%9F%E4%B8%8B%E8%BD%BD.user.js)*
