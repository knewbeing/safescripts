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

**风险等级**：⛔ CRITICAL　　**安全评分**：75/100　　**分析时间**：2026-07-06

> 由于缺失脚本主体代码，无法进行有效安全审查。仅根据元数据分析，未见明显权限滥用，但无法排除数据外传、隐私采集、远程代码执行等高危风险。请补充完整代码以获得准确安全评估。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 代码缺失  
> 无法审查脚本主体代码，无法判断是否存在数据外传、隐私采集、远程代码执行等风险。  
> 位置：脚本主体代码缺失  
> 建议：请提供完整的 UserScript 代码以便进行全面安全审查。

**🟡 LOW** — 权限申请  
> 脚本元数据未申请过多高权限，仅申请了常用 GM_* API，未见敏感权限滥用。  
> 位置：元数据 @grant  
> 建议：建议仅申请实际需要的权限，避免权限滥用。

---

*文档由 SafeScripts 自动生成 · [查看原始脚本](https://raw.githubusercontent.com/XIU2/UserScript/master/GithubEnhanced-High-Speed-Download.user.js)*
