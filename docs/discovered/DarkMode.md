---
title: "护眼模式"
---

# 护眼模式

`暗黑模式`  `护眼`  `夜间模式`  `全网通用`  `网页美化`  `用户体验`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/DarkMode.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.5.8**　　发现时间：**2026-07-27**　　来源：[XIU2/UserScript](https://github.com/XIU2/UserScript) <Badge type="tip" text="GitHub" />

## 功能介绍

本脚本为全网通用的护眼模式，自动将网页切换为暗色主题，减少眼睛疲劳。适用于夜间浏览或长时间用眼，提升阅读舒适度。

## 适用网站

- 全网（所有网站）
- 不适用于B站直播

## 使用方法

1. 安装脚本后，网页会自动切换为暗色护眼模式。
2. 如需关闭或调整护眼模式，可通过浏览器的用户脚本菜单操作。
3. 设置会自动保存，下次访问网页时自动应用。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_registerMenuCommand` | 允许脚本在浏览器菜单中添加自定义功能按钮。 |
| `GM_unregisterMenuCommand` | 允许脚本移除已添加的菜单按钮。 |
| `GM_openInTab` | 允许脚本在新标签页打开指定链接。 |
| `GM_getValue` | 允许脚本保存用户设置，如护眼模式开关状态。 |
| `GM_setValue` | 允许脚本修改和存储用户设置。 |
| `GM_notification` | 允许脚本在桌面弹出通知，提示用户操作结果。 |

## 安全分析

**风险等级**：🟡 LOW　　**安全评分**：89/100　　**分析时间**：2026-07-27

> 该脚本主要用于页面暗色模式切换，未检测到数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS、敏感 API 调用、供应链风险等高危行为。仅存在未使用权限申请和 GM_openInTab 权限使用，整体安全风险较低。建议移除未使用权限以进一步提升安全性。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM_openInTab 权限，但仅用于打开反馈页面，没有滥用行为。  
> 位置：元数据 @grant GM_openInTab, 代码 window.GM_openInTab  
> 建议：建议仅在需要时申请此权限，并确保目标页面可信。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM_notification 权限，但未在代码中实际使用。  
> 位置：元数据 @grant GM_notification  
> 建议：建议移除未使用的高权限申请，减少攻击面。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/XIU2/UserScript/a4d1659b7d9cdcb5d9e55a81bb14e85e875e3f49/DarkMode.user.js)*
