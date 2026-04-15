---
title: HTML5视频音频默认音量
---

# HTML5视频音频默认音量

`视频音频`  `音量控制`  `网页增强`  `用户脚本`  `个性化设置`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/HTML5Volume.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.0.5**　　发现时间：**2026-04-15**　　来源：[XIU2/UserScript](https://github.com/XIU2/UserScript)

## 功能介绍

本脚本自动将网页中的HTML5视频和音频的默认音量调低，避免突然的100%音量吓到用户。它还能为每个网站单独记忆音量设置，方便用户个性化调整。安装后，视频播放时音量会自动应用上次设置的值。

## 适用网站

- 所有支持HTML5视频音频的网站

## 使用方法

1. 安装脚本后，访问任意含HTML5视频或音频的网页。
2. 播放视频或音频时，脚本自动调整音量到上次设置的值。
3. 可通过脚本菜单命令手动调整和保存当前音量。
4. 每个网站的音量设置会被单独记忆，下次访问自动应用。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_registerMenuCommand` | 添加自定义菜单命令，方便用户操作脚本功能。 |
| `GM_unregisterMenuCommand` | 移除自定义菜单命令。 |
| `GM_openInTab` | 在新标签页打开链接或页面。 |
| `GM_getValue` | 读取脚本存储的音量设置。 |
| `GM_setValue` | 保存用户设置的音量值。 |
| `GM_notification` | 显示通知提醒用户操作结果。 |

## 安全分析

::: info 等待分析
安全分析将在下次流水线运行时自动更新。
:::

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/XIU2/UserScript/86f2efed3ac31316f59099bc66116033679aa824/HTML5Volume.user.js)*
