---
title: "护眼模式"
---

# 护眼模式

`护眼`  `暗黑模式`  `夜间模式`  `网页美化`  `全网通用`  `便捷切换`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/DarkMode.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.5.8**　　发现时间：**2026-06-08**　　来源：[XIU2/UserScript](https://github.com/XIU2/UserScript) <Badge type="tip" text="GitHub" />

## 功能介绍

本脚本为所有网站提供护眼模式，将网页背景变为暗色，减少眼睛疲劳。适用于夜间浏览或长时间使用电脑时保护视力。安装后可通过菜单随时开启或关闭暗黑模式。

## 适用网站

- 全网（所有网站）
- 不适用于B站直播

## 使用方法

1. 安装脚本后，网页会自动切换为暗色护眼模式。
2. 如需关闭或重新开启，可点击浏览器的脚本菜单进行切换。
3. 设置会自动保存，下次访问网页会保持当前模式。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_registerMenuCommand` | 用于在浏览器菜单中添加脚本功能入口，方便用户操作。 |
| `GM_unregisterMenuCommand` | 用于移除菜单入口，管理脚本功能显示。 |
| `GM_openInTab` | 用于在新标签页打开相关链接或帮助页面。 |
| `GM_getValue` | 用于保存用户的暗黑模式偏好设置。 |
| `GM_setValue` | 用于记录和切换用户的暗黑模式状态。 |
| `GM_notification` | 用于在切换模式时弹出提示通知。 |

## 安全分析

**风险等级**：🟢 SAFE　　**安全评分**：89/100　　**分析时间**：2026-06-08

> 该脚本主要用于实现网页暗黑模式，未检测到任何数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS、供应链风险或 WebSocket 使用。权限申请合理，未发现高危行为。整体安全性高。

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
> 申请了 GM_openInTab 权限，但仅用于打开开发者主页或反馈页面，未发现滥用。  
> 位置：@grant 元数据与 window.GM_openInTab 调用  
> 建议：确认仅用于跳转可信页面，避免用于恶意跳转。

**🟡 LOW** — 敏感 API 调用  
> 脚本通过 GM_getValue/GM_setValue 存储和读取用户设置，但未涉及敏感信息。  
> 位置：多处 GM_getValue/GM_setValue 调用  
> 建议：确保不存储敏感隐私数据。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/XIU2/UserScript/d8fcb017ba7108be3b9813667e63b7f28cbf6424/DarkMode.user.js)*
