---
title: HTML5 视频音频默认音量
---

# HTML5 视频音频默认音量

`视频音频`  `音量控制`  `用户体验`  `网页辅助`  `多站点支持`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/HTML5Volume.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.0.5**　　发现时间：**2026-04-15**　　来源：[XIU2/UserScript](https://github.com/XIU2/UserScript)

## 功能介绍

本脚本自动将网页中的 HTML5 视频和音频的默认音量设置为用户自定义的较低值，避免突然的最大音量吓到用户。它还能为不同网站分别记忆音量设置，提升观看体验。安装后即可自动生效，无需额外操作。

## 适用网站

- 所有支持 HTML5 视频和音频播放的网站

## 使用方法

1. 安装脚本后，访问任意支持 HTML5 视频或音频的网站。
2. 播放视频或音频时，脚本会自动调整默认音量到设定值。
3. 不同网站的音量设置会被自动记忆，无需重复调整。
4. 可通过脚本菜单命令自定义音量大小。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_registerMenuCommand` | 允许在脚本菜单中注册自定义命令，方便用户操作脚本功能。 |
| `GM_unregisterMenuCommand` | 允许注销之前注册的菜单命令，保持菜单整洁。 |
| `GM_openInTab` | 允许脚本在新标签页打开链接，方便跳转相关页面。 |
| `GM_getValue` | 允许脚本读取存储的音量设置，实现不同网站独立记忆音量。 |
| `GM_setValue` | 允许脚本保存用户设置的音量值，保证下次访问时生效。 |
| `GM_notification` | 允许脚本发送桌面通知，提醒用户音量已调整。 |

## 安全分析

::: info 等待分析
安全分析将在下次流水线运行时自动更新。
:::

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/XIU2/UserScript/86f2efed3ac31316f59099bc66116033679aa824/HTML5Volume.user.js)*
