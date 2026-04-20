---
title: "HTML5 视频音频默认音量"
---

# HTML5 视频音频默认音量

`音量控制`  `视频增强`  `音频增强`  `网页优化`  `自动化`  `用户体验`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/HTML5Volume.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.0.5**　　发现时间：**2026-04-20**　　来源：[XIU2/UserScript](https://github.com/XIU2/UserScript) <Badge type="tip" text="GitHub" />

## 功能介绍

本脚本可自动将网页上的 HTML5 视频和音频的默认音量调整为较低值，避免因 100% 音量而被突然吓到。每个网站的音量设置会被单独记忆，下次访问同一网站时自动恢复。

## 适用网站

- 所有网站

## 使用方法

1. 1. 安装脚本后，访问任意含有视频或音频的网页。
2. 2. 播放视频/音频时，音量会自动调整为默认值。
3. 3. 如需更改默认音量，可通过浏览器脚本菜单进行设置。
4. 4. 每个网站的音量设置会被自动记住，无需重复调整。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_registerMenuCommand` | 在脚本菜单中添加自定义命令，方便用户操作。 |
| `GM_unregisterMenuCommand` | 移除已注册的菜单命令，保持菜单整洁。 |
| `GM_openInTab` | 可在新标签页打开相关链接，便于访问设置或帮助。 |
| `GM_getValue` | 保存每个网站的音量设置，实现记忆功能。 |
| `GM_setValue` | 写入每个网站的音量设置，确保下次自动应用。 |
| `GM_notification` | 在需要时弹出桌面通知，提醒用户操作结果。 |

## 安全分析

::: info 等待分析
安全分析将在下次流水线运行时自动更新。
:::

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/XIU2/UserScript/86f2efed3ac31316f59099bc66116033679aa824/HTML5Volume.user.js)*
