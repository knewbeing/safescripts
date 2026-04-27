---
title: "GitHub 中文化插件"
---

# GitHub 中文化插件

`界面翻译`  `GitHub增强`  `中文化`  `开发者工具`  `自动翻译`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/main.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.9.3-2026-04-12**　　发现时间：**2026-04-27**　　来源：[maboloshi/github-chinese](https://github.com/maboloshi/github-chinese) <Badge type="tip" text="GitHub" />

## 功能介绍

该脚本将 GitHub 及其相关网站的部分菜单和界面内容翻译为中文，提升中文用户的使用体验。它自动翻译页面上的主要元素，并支持部分内容的自动翻译。

## 适用网站

- GitHub
- GitHub Skills
- GitHub Gist
- GitHub Education
- GitHub Status

## 使用方法

1. 安装脚本后，访问 GitHub 及相关网站。
2. 页面菜单和部分内容会自动显示为中文。
3. 如需调整翻译设置，可通过浏览器的用户脚本菜单操作。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_xmlhttpRequest` | 用于发送网络请求，获取翻译内容。 |
| `GM_getValue` | 用于读取用户设置，如是否启用正则翻译等。 |
| `GM_setValue` | 用于保存用户设置，记住翻译偏好。 |
| `GM_registerMenuCommand` | 用于在浏览器菜单中添加自定义命令，方便用户操作脚本。 |
| `GM_unregisterMenuCommand` | 用于移除自定义菜单命令。 |
| `GM_notification` | 用于弹出通知，提醒用户操作结果或状态。 |

## 安全分析

::: info 等待分析
安全分析将在下次流水线运行时自动更新。
:::

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/maboloshi/github-chinese/8a8ad263685049662a0be449fefeeaa0ded8c083/main.user.js)*
