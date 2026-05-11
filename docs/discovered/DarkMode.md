---
title: "护眼模式"
---

# 护眼模式

`护眼`  `夜间模式`  `暗黑模式`  `网页美化`  `全网通用`  `健康`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/DarkMode.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.5.8**　　发现时间：**2026-05-11**　　来源：[XIU2/UserScript](https://github.com/XIU2/UserScript) <Badge type="tip" text="GitHub" />

## 功能介绍

本脚本为所有网站提供护眼模式（夜间/暗黑/深色模式），自动将网页背景变暗，减少用眼疲劳。适合长时间浏览网页的用户使用。B站直播页面不会启用该模式。

## 适用网站

- 全网（除B站直播）

## 使用方法

1. 1. 安装脚本后，刷新任意网页即可自动启用护眼模式。
2. 2. 如需切换或关闭护眼模式，可通过浏览器油猴菜单进行设置。
3. 3. 设置会自动保存，下次访问网页时自动生效。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_registerMenuCommand` | 在浏览器菜单中添加或移除脚本相关的快捷操作。 |
| `GM_unregisterMenuCommand` | 移除已注册的菜单命令，方便管理脚本功能。 |
| `GM_openInTab` | 可在新标签页打开指定链接，便于访问脚本相关页面。 |
| `GM_getValue` | 保存用户的脚本设置，比如是否开启护眼模式。 |
| `GM_setValue` | 修改和存储用户的脚本设置。 |
| `GM_notification` | 在浏览器右下角弹出通知，提示脚本状态或操作结果。 |

## 安全分析

**风险等级**：🟡 LOW　　**安全评分**：84/100　　**分析时间**：2026-05-11

> 该脚本主要用于实现网页暗黑模式，未检测到任何数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS、供应链风险或 WebSocket 使用。仅存在部分未使用或权限较高的 @grant 申请，建议精简权限。整体安全风险极低，适合日常使用。

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
> 脚本申请了 GM_openInTab 权限，但仅用于打开开发者主页或反馈页面，不涉及敏感操作。  
> 位置：@grant 元数据及 window.GM_openInTab 调用  
> 建议：确认 GM_openInTab 仅用于可信外部页面跳转，避免用于打开恶意页面。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM_notification 权限，但未在代码中实际使用。  
> 位置：@grant 元数据  
> 建议：移除未使用的 GM_notification 权限，减少权限面。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/XIU2/UserScript/2de66ae0fb5e64439204b800db29ad925245a357/DarkMode.user.js)*
