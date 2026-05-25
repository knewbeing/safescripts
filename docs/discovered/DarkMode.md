---
title: "护眼模式"
---

# 护眼模式

`护眼`  `夜间模式`  `深色主题`  `全网适用`  `浏览增强`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/DarkMode.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.5.8**　　发现时间：**2026-05-18**　　来源：[XIU2/UserScript](https://github.com/XIU2/UserScript) <Badge type="tip" text="GitHub" />

## 功能介绍

本脚本为所有网站提供护眼模式，将网页自动切换为夜间深色风格，减轻眼睛疲劳。适合长时间浏览网页的用户使用。支持一键开启或关闭护眼模式。

## 适用网站

- 全网（除B站直播）

## 使用方法

1. 1. 安装脚本后，网页会自动切换为护眼（深色）模式。
2. 2. 如需手动开关护眼模式，可点击浏览器油猴（Tampermonkey）扩展图标，在菜单中选择相关操作。
3. 3. 设置会自动保存，下次访问网页时自动应用。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_registerMenuCommand` | 用于在浏览器菜单中添加或移除自定义功能按钮，方便用户手动控制护眼模式。 |
| `GM_unregisterMenuCommand` | 用于移除已注册的菜单按钮，保持菜单整洁。 |
| `GM_openInTab` | 可在新标签页打开相关链接，如帮助页面或设置说明。 |
| `GM_getValue` | 用于保存和读取用户的护眼模式设置，实现个性化体验。 |
| `GM_setValue` | 用于保存用户的护眼模式开关状态。 |
| `GM_notification` | 用于在切换护眼模式时弹出桌面通知，提醒用户操作结果。 |

## 安全分析

**风险等级**：🟡 LOW　　**安全评分**：89/100　　**分析时间**：2026-05-25

> 该脚本主要用于页面暗色模式切换，未发现数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS、供应链风险等高危行为。仅存在部分权限申请未完全使用，建议优化。整体安全风险低，适合公开使用。

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
> 脚本申请了 GM_openInTab 权限，但仅用于打开反馈页面（github），未发现滥用或敏感数据外传。  
> 位置：元数据 @grant GM_openInTab, 代码 window.GM_openInTab('https:...')  
> 建议：确认 GM_openInTab 仅用于打开可信页面，避免用于恶意跳转。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM_notification 权限，但未在代码中发现实际调用。  
> 位置：元数据 @grant GM_notification  
> 建议：建议移除未使用的高权限申请，减少攻击面。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/XIU2/UserScript/de4fcb506ced59aa0c6637ab7c52a2594fa050ed/DarkMode.user.js)*
