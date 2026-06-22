---
title: "Github增强-高速下载"
---

# Github增强-高速下载

`下载加速`  `Github增强`  `文件管理`  `公益加速`  `开发工具`  `便捷操作`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/managed/GithubEnhanced-High-Speed-Download.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**2.6.38**　　最后更新：**2026-06-01**

## 功能介绍

本脚本为 Github 提供高速下载功能，支持加速 Git Clone/SSH、Release、Raw、Code(ZIP) 等文件。用户可在项目列表中快速下载单个文件，提升下载速度，适合经常需要下载 Github 文件的用户。

## 适用网站

- Github
- bgithub加速镜像

## 使用方法

1. 安装脚本后，访问 Github 或 bgithub 镜像网站。
2. 在文件、代码或 Release 页面会出现高速下载按钮。
3. 点击按钮即可通过加速源下载对应文件。
4. 可在浏览器菜单中切换加速源或反馈问题。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_registerMenuCommand` | 用于在浏览器菜单中添加自定义命令，方便用户操作。 |
| `GM_unregisterMenuCommand` | 用于移除自定义菜单命令，保持界面整洁。 |
| `GM_openInTab` | 用于在新标签页打开加速下载链接，便于多任务操作。 |
| `GM_getValue` | 用于保存用户设置，如加速源选择等。 |
| `GM_setValue` | 用于存储用户偏好和配置，提升使用体验。 |
| `GM_notification` | 用于在下载完成或操作时弹出通知，提醒用户。 |
| `GM_setClipboard` | 用于复制下载链接到剪贴板，方便用户粘贴使用。 |
| `window.onurlchange` | 用于监听页面地址变化，确保脚本功能在页面切换时生效。 |

## 安全分析

**风险等级**：🟡 LOW　　**安全评分**：97/100　　**分析时间**：2026-06-22

> 仅根据元数据分析，未发现数据外传、隐私采集、远程代码执行、代码混淆等高风险行为。脚本申请的权限主要为菜单注册、通知、剪贴板操作和本地存储，未见明显滥用。但由于缺少完整代码，无法排除实际运行时的安全风险。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**🟡 LOW** — Code Coverage  
> 未提供完整代码，无法检测到任何实际的安全问题。仅根据元数据分析，未发现明显的高风险行为。  
> 位置：N/A  
> 建议：建议补充完整代码以进行全面安全审查。

---

*文档由 SafeScripts 自动生成 · [查看原始脚本](https://raw.githubusercontent.com/XIU2/UserScript/master/GithubEnhanced-High-Speed-Download.user.js)*
