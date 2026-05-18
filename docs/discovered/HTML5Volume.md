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

::: info 等待分析
安全分析将在下次流水线运行时自动更新。
:::

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/XIU2/UserScript/de4fcb506ced59aa0c6637ab7c52a2594fa050ed/HTML5Volume.user.js)*
