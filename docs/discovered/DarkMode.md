---
title: "护眼模式"
---

# 护眼模式

`护眼`  `夜间模式`  `暗黑模式`  `全网通用`  `网页美化`  `便捷工具`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/DarkMode.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.5.7**　　发现时间：**2026-04-20**　　来源：[XIU2/UserScript](https://github.com/XIU2/UserScript) <Badge type="tip" text="GitHub" />

## 功能介绍

本脚本为网页提供简单有效的护眼模式（夜间/暗黑/深色模式），可自动将网页背景变为深色，减少用眼疲劳。适用于绝大多数网站，安装后即可生效。

## 适用网站

- 所有网站（除B站直播）

## 使用方法

1. 1. 安装脚本后，网页会自动切换为深色护眼模式。
2. 2. 如需调整或关闭，可通过浏览器油猴菜单进行设置。
3. 3. 访问B站直播页时不会自动启用。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_registerMenuCommand` | 用于在脚本菜单中添加自定义功能按钮，方便用户操作。 |
| `GM_unregisterMenuCommand` | 用于移除已添加的菜单按钮。 |
| `GM_openInTab` | 可在新标签页打开链接，便于查看相关内容或帮助。 |
| `GM_getValue` | 用于保存用户的设置（如开关状态），下次访问自动应用。 |
| `GM_setValue` | 用于存储用户的自定义设置。 |
| `GM_notification` | 可在网页右下角弹出通知，提示操作结果或重要信息。 |

## 安全分析

**风险等级**：🟡 LOW　　**安全评分**：84/100　　**分析时间**：2026-04-20

> 该脚本主要用于页面暗色模式切换，未检测到任何数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS、敏感 API 调用、供应链风险或 iframe 风险。唯一风险为申请了部分未使用或高权限（GM_openInTab、GM_notification），但未被滥用。整体安全性较高，建议移除未使用权限以进一步提升安全性。

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
> 脚本申请了 GM_openInTab 权限，但仅用于打开反馈页面（github），未被滥用。  
> 位置：元数据 @grant GM_openInTab, 代码 window.GM_openInTab('https:...')  
> 建议：确认 GM_openInTab 仅用于可信站点（如 github），避免用于未知或恶意站点。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM_notification 权限，但未在代码中实际使用。  
> 位置：元数据 @grant GM_notification  
> 建议：建议移除未使用的高权限申请，减少攻击面。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/XIU2/UserScript/86f2efed3ac31316f59099bc66116033679aa824/DarkMode.user.js)*
