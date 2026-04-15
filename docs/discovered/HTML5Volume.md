---
title: HTML5 视频音频默认音量
---

# HTML5 视频音频默认音量

`视频音频`  `音量控制`  `用户体验`  `网页增强`  `多站点支持`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/HTML5Volume.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.0.5**　　发现时间：**2026-04-15**　　来源：[XIU2/UserScript](https://github.com/XIU2/UserScript)

## 功能介绍

本脚本自动将网页中的 HTML5 视频和音频的默认音量设置为较低值，避免突然的高音量吓到用户。它还能为不同网站分别记住用户设置的音量，提升观看体验。安装后无需额外操作，自动生效。

## 适用网站

- 所有支持 HTML5 视频音频播放的网站

## 使用方法

1. 安装脚本后，访问任意含有 HTML5 视频或音频的网站。
2. 播放视频或音频时，脚本会自动调整默认音量到安全范围。
3. 用户调整音量后，脚本会记住该网站的音量设置。
4. 无需手动操作，音量设置自动生效并保存。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_registerMenuCommand` | 用于在脚本菜单中注册自定义命令，方便用户操作。 |
| `GM_unregisterMenuCommand` | 用于注销之前注册的菜单命令。 |
| `GM_openInTab` | 允许脚本在新标签页中打开链接。 |
| `GM_getValue` | 用于读取脚本存储的音量设置，实现记忆功能。 |
| `GM_setValue` | 用于保存用户设置的音量值，支持不同网站分别存储。 |
| `GM_notification` | 用于向用户发送通知，提示音量设置状态。 |

## 安全分析

::: info 等待分析
安全分析将在下次流水线运行时自动更新。
:::

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/XIU2/UserScript/86f2efed3ac31316f59099bc66116033679aa824/HTML5Volume.user.js)*
