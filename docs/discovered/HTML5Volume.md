---
title: "HTML5 视频音频默认音量"
---

# HTML5 视频音频默认音量

`音量控制`  `视频增强`  `音频增强`  `网页通用`  `用户体验`  `自动记忆`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/HTML5Volume.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.0.5**　　发现时间：**2026-05-11**　　来源：[XIU2/UserScript](https://github.com/XIU2/UserScript) <Badge type="tip" text="GitHub" />

## 功能介绍

本脚本可让所有网站上的 HTML5 视频和音频默认音量不再是 100%，避免突然被大音量吓到。它还能为每个网站分别记住你调整过的音量，下次访问自动恢复。

## 适用网站

- 所有网站

## 使用方法

1. 安装脚本后，访问任意含有 HTML5 视频或音频的网站。
2. 播放视频或音频时，音量会自动设为默认值（非100%）。
3. 你可以手动调整音量，脚本会记住该网站的设置。
4. 如需更改默认音量，可通过油猴菜单进行设置。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_registerMenuCommand` | 用于在脚本菜单中添加自定义命令，方便用户设置音量。 |
| `GM_unregisterMenuCommand` | 用于移除脚本菜单中的自定义命令。 |
| `GM_openInTab` | 用于在新标签页中打开链接，可能用于帮助或设置页面。 |
| `GM_getValue` | 用于读取已保存的音量设置，实现每站点记忆。 |
| `GM_setValue` | 用于保存你在每个网站调整的音量设置。 |
| `GM_notification` | 用于在需要时弹出通知提示用户。 |

## 安全分析

::: info 等待分析
安全分析将在下次流水线运行时自动更新。
:::

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/XIU2/UserScript/2de66ae0fb5e64439204b800db29ad925245a357/HTML5Volume.user.js)*
