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

**风险等级**：🔴 HIGH　　**安全评分**：60/100　　**分析时间**：2026-06-08

> 该脚本通过大量第三方加速节点实现 Github 文件下载加速，涉及用户下载行为的外部重定向，存在数据外传和供应链风险。未发现隐私采集、代码混淆、远程代码执行或 DOM XSS 风险。建议仅在信任这些加速节点的前提下使用，并关注节点的安全性和可用性。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：https://gh.h233.eu.org, https://rapidgit.jjda.de5.net, https://gh.ddlc.top） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本通过构造大量第三方加速下载链接，将用户的下载请求重定向到非官方 Github 加速节点，涉及大量第三方域名。  
> 位置：download_url_us, clone_url, raw_url 等数组及相关逻辑  
> 建议：仅允许用户自定义可信加速节点，或在文档中明确所有加速节点的归属和隐私政策。

**🟠 MEDIUM** — 供应链风险  
> 部分加速节点为个人或未知运营方，存在供应链风险（如节点被劫持、内容篡改、流量分析等）。  
> 位置：download_url_us, clone_url, raw_url 等数组  
> 建议：建议仅使用官方或知名 CDN 节点，或允许用户自定义节点并默认关闭第三方节点。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM_openInTab、GM_setClipboard、GM_notification 等高权限，但未见明显滥用。  
> 位置：元数据 @grant  
> 建议：建议仅申请实际使用的权限，定期复查权限申请。

---

*文档由 SafeScripts 自动生成 · [查看原始脚本](https://raw.githubusercontent.com/XIU2/UserScript/master/GithubEnhanced-High-Speed-Download.user.js)*
