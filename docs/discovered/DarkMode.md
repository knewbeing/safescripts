---
title: "护眼模式"
---

# 护眼模式

`护眼`  `暗黑模式`  `夜间模式`  `网页美化`  `全网通用`  `用户体验`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/DarkMode.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.5.8**　　发现时间：**2026-06-15**　　来源：[XIU2/UserScript](https://github.com/XIU2/UserScript) <Badge type="tip" text="GitHub" />

## 功能介绍

本脚本为全网提供护眼模式（暗黑/夜间/深色模式），自动将网页背景变暗，减少眼睛疲劳。适用于大多数网站，简单有效。

## 适用网站

- 全网（所有网站）
- 不适用于B站直播

## 使用方法

1. 安装脚本后，网页会自动切换为暗色护眼模式。
2. 如需手动开关或调整，可在浏览器油猴菜单中找到相关命令。
3. 设置会自动保存，下次访问网页无需重复操作。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_registerMenuCommand` | 用于在浏览器菜单中添加脚本功能入口，方便用户操作。 |
| `GM_unregisterMenuCommand` | 用于移除已添加的菜单命令。 |
| `GM_openInTab` | 用于在新标签页打开链接，便于访问相关页面。 |
| `GM_getValue` | 用于保存脚本设置，如护眼模式开关状态。 |
| `GM_setValue` | 用于修改和存储脚本配置。 |
| `GM_notification` | 用于弹出通知提醒用户操作结果或状态。 |

## 安全分析

**风险等级**：🟢 SAFE　　**安全评分**：92/100　　**分析时间**：2026-06-22

> 该脚本主要用于实现网页暗黑模式，未检测到任何数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS、供应链风险或 WebSocket 使用。权限申请合理，未见滥用。整体安全性高。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**🟠 MEDIUM** — 权限申请  
> 脚本申请了 GM_openInTab 权限，但仅用于打开开发者主页或反馈页面，无滥用行为。  
> 位置：@grant 元数据与 window.GM_openInTab 调用  
> 建议：确认仅用于跳转可信页面，避免用于自动化恶意跳转。

**🟡 LOW** — 功能说明  
> 脚本注册了多个菜单项，部分菜单项的默认值为数组或字符串，未见异常。  
> 位置：registerMenuCommand 函数  
> 建议：无安全风险。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/XIU2/UserScript/d8fcb017ba7108be3b9813667e63b7f28cbf6424/DarkMode.user.js)*
