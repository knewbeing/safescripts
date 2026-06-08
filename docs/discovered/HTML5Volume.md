---
title: "HTML5 视频音频默认音量"
---

# HTML5 视频音频默认音量

`音量控制`  `视频优化`  `音频优化`  `网页增强`  `隐私保护`  `多站点适用`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/HTML5Volume.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.0.5**　　发现时间：**2026-06-08**　　来源：[XIU2/UserScript](https://github.com/XIU2/UserScript) <Badge type="tip" text="GitHub" />

## 功能介绍

本脚本自动将网页中的 HTML5 视频和音频的默认音量设置为较低值，避免被突然的高音量吓到。它还能为每个网站分别记住你调整过的音量，下次访问时自动应用。

## 适用网站

- 所有网站

## 使用方法

1. 安装脚本后，刷新任意含视频或音频的网页。
2. 视频或音频播放时，默认音量会自动降低。
3. 如需调整默认音量，可通过浏览器的用户脚本菜单进行设置。
4. 每个网站的音量设置会自动记忆，无需重复操作。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_registerMenuCommand` | 用于在浏览器菜单中添加自定义操作按钮，方便用户设置音量。 |
| `GM_unregisterMenuCommand` | 用于移除之前添加的菜单按钮，保持菜单整洁。 |
| `GM_openInTab` | 用于在新标签页打开相关链接或设置页面。 |
| `GM_getValue` | 用于读取每个网站保存的音量设置，实现记忆功能。 |
| `GM_setValue` | 用于保存你在每个网站调整过的音量，下次自动应用。 |
| `GM_notification` | 用于在调整音量或操作时弹出通知，提醒用户。 |

## 安全分析

**风险等级**：🟡 LOW　　**安全评分**：89/100　　**分析时间**：2026-06-08

> 该脚本未检测到任何数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS、供应链风险或 WebSocket 使用。所有数据仅本地存储于 localStorage 和 GM 存储。权限申请合理，未发现滥用。整体安全风险极低，适合普通用户使用。

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
> 申请了 GM_openInTab 权限，但仅用于打开反馈页面，无滥用行为。  
> 位置：@grant 元数据与 GM_openInTab 调用  
> 建议：确认仅用于用户交互场景，避免自动化滥用。

**🟡 LOW** — 本地存储  
> 脚本使用 GM_getValue/GM_setValue 和 localStorage 存储音量设置，无敏感信息存储。  
> 位置：GM_getValue/GM_setValue, localStorage  
> 建议：确保不存储敏感/隐私数据。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/XIU2/UserScript/d8fcb017ba7108be3b9813667e63b7f28cbf6424/HTML5Volume.user.js)*
