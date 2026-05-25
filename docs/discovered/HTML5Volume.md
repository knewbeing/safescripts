---
title: "HTML5 视频音频默认音量"
---

# HTML5 视频音频默认音量

`音量控制`  `视频增强`  `音频增强`  `网页优化`  `自动化`  `隐私保护`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/HTML5Volume.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.0.5**　　发现时间：**2026-05-18**　　来源：[XIU2/UserScript](https://github.com/XIU2/UserScript) <Badge type="tip" text="GitHub" />

## 功能介绍

本脚本可自动设置网页中 HTML5 视频和音频的默认音量，避免因默认 100% 音量而被吓到。每个网站的音量设置会被单独记忆，下次访问同一网站时自动应用上次的音量。

## 适用网站

- 所有网站

## 使用方法

1. 安装脚本后，访问任意含有 HTML5 视频或音频的网站。
2. 播放视频或音频时，音量会自动调整为脚本设定的默认值。
3. 如需更改默认音量，可通过油猴脚本菜单进行设置。
4. 每个网站的音量设置会被自动记忆，无需重复调整。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_registerMenuCommand` | 用于在脚本菜单中添加自定义命令，方便用户操作。 |
| `GM_unregisterMenuCommand` | 用于移除之前注册的菜单命令。 |
| `GM_openInTab` | 用于在新标签页打开链接，便于跳转或查看帮助。 |
| `GM_getValue` | 用于读取已保存的音量设置，实现每站点记忆音量。 |
| `GM_setValue` | 用于保存用户的音量设置，实现下次自动应用。 |
| `GM_notification` | 用于在需要时弹出桌面通知，提醒用户相关信息。 |

## 安全分析

**风险等级**：🟡 LOW　　**安全评分**：89/100　　**分析时间**：2026-05-25

> 该脚本未检测到任何数据外传、隐私采集、远程代码执行、代码混淆或 DOM XSS 风险。所有敏感 API 和权限申请均为合理用途，唯一风险为申请了未使用的 GM_notification 权限和 GM_openInTab（仅用于反馈页面）。整体安全性高，建议移除未使用权限以进一步提升安全性。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**🟠 MEDIUM** — Permission Usage  
> 申请了 GM_openInTab 权限，但仅用于打开反馈页面（GitHub 和 GreasyFork），未涉及敏感数据或恶意跳转。  
> 位置：GM_openInTab in menu registration  
> 建议：如无必要可移除该权限，但当前用途安全。

**🟠 MEDIUM** — Permission Usage  
> 脚本申请了 GM_notification 权限，但未在代码中实际使用。  
> 位置：Metadata block (@grant GM_notification)  
> 建议：移除未使用的高权限申请，减少权限滥用风险。

**🟡 LOW** — Permission Usage  
> 脚本申请了 GM_registerMenuCommand 和 GM_unregisterMenuCommand 权限，实际用于菜单功能，符合用途。  
> 位置：Metadata block (@grant GM_registerMenuCommand, GM_unregisterMenuCommand)  
> 建议：无风险，合理使用。

**🟡 LOW** — Permission Usage  
> 脚本申请了 GM_getValue 和 GM_setValue 权限，实际用于存储和读取音量设置，符合用途。  
> 位置：Metadata block (@grant GM_getValue, GM_setValue)  
> 建议：无风险，合理使用。

**🟡 LOW** — Privacy Storage  
> 脚本使用 localStorage 存储当前网站音量，但未外传数据。  
> 位置：volumeChangeEvent, menu registration  
> 建议：无风险，合理使用。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/XIU2/UserScript/de4fcb506ced59aa0c6637ab7c52a2594fa050ed/HTML5Volume.user.js)*
