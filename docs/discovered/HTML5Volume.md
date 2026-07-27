---
title: "HTML5 视频音频默认音量"
---

# HTML5 视频音频默认音量

`音量控制`  `视频优化`  `音频优化`  `网页增强`  `自动化`  `隐私保护`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/HTML5Volume.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.0.5**　　发现时间：**2026-07-27**　　来源：[XIU2/UserScript](https://github.com/XIU2/UserScript) <Badge type="tip" text="GitHub" />

## 功能介绍

本脚本自动将网页上的 HTML5 视频和音频的默认音量调整为较低值，避免被突然的高音量吓到。每个网站的音量设置会被单独记忆，下次访问时自动恢复。

## 适用网站

- 所有网站

## 使用方法

1. 安装脚本后，打开任意包含视频或音频的网页。
2. 播放视频或音频时，默认音量会自动调整为较低值。
3. 如需更改默认音量，可通过脚本菜单进行设置。
4. 每个网站的音量设置会自动保存，无需重复操作。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_registerMenuCommand` | 用于在脚本菜单中添加自定义操作按钮。 |
| `GM_unregisterMenuCommand` | 用于移除脚本菜单中的自定义按钮。 |
| `GM_openInTab` | 用于在新标签页打开链接，方便访问相关页面。 |
| `GM_getValue` | 用于获取已保存的音量设置，实现每站点记忆功能。 |
| `GM_setValue` | 用于保存当前网站的音量设置，下次自动恢复。 |
| `GM_notification` | 用于显示通知，提醒用户音量调整等操作结果。 |

## 安全分析

**风险等级**：🟡 LOW　　**安全评分**：89/100　　**分析时间**：2026-07-27

> 该脚本未检测到任何数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS、敏感 API 调用、供应链风险或 iframe 风险。唯一的安全注意点是申请了部分高权限（GM_openInTab、GM_notification），但实际用途安全或未使用。整体风险极低，推荐使用。

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
> 脚本申请了 GM_openInTab 权限，并在菜单中用于打开反馈页面。该权限可被滥用打开任意页面，但实际用途安全。  
> 位置：GM_openInTab 用于菜单反馈功能  
> 建议：仅用于用户主动操作时打开可信页面，避免自动或隐藏调用。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM_notification 权限，但代码中未实际调用该 API。  
> 位置：元数据 @grant GM_notification  
> 建议：移除未使用的高权限申请，减少攻击面。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/XIU2/UserScript/a4d1659b7d9cdcb5d9e55a81bb14e85e875e3f49/HTML5Volume.user.js)*
