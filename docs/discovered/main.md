---
title: "GitHub 中文化插件"
---

# GitHub 中文化插件

`界面翻译`  `GitHub增强`  `中文本地化`  `开发者工具`  `自动翻译`  `网页优化`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/main.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.9.4.4-2026-06-21**　　发现时间：**2026-07-06**　　来源：[maboloshi/github-chinese](https://github.com/maboloshi/github-chinese) <Badge type="tip" text="GitHub" />

## 功能介绍

本脚本将 GitHub 及其相关网站的部分菜单和界面内容翻译为中文，提升中文用户的使用体验。支持自动翻译和界面本地化。

## 适用网站

- GitHub
- GitHub Skills
- GitHub Gist
- GitHub Education
- GitHub Status

## 使用方法

1. 安装脚本后，打开 GitHub 或相关网站。
2. 页面菜单和部分内容会自动显示为中文。
3. 如需切换或调整翻译设置，可通过浏览器脚本菜单操作。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_addStyle` | 用于添加或修改页面的自定义样式。 |
| `GM_xmlhttpRequest` | 用于发送网络请求，获取翻译内容。 |
| `GM_getValue` | 用于读取用户设置或脚本数据。 |
| `GM_setValue` | 用于保存用户设置或脚本数据。 |
| `GM_registerMenuCommand` | 用于在浏览器菜单中添加自定义命令，方便用户操作。 |
| `GM_unregisterMenuCommand` | 用于移除自定义菜单命令。 |
| `GM_notification` | 用于在浏览器中弹出通知，提示用户操作结果。 |

## 安全分析

::: info 等待分析
安全分析将在下次流水线运行时自动更新。
:::

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/maboloshi/github-chinese/23e7d5030c7a668e26f11a5b927a44b06adc6f6c/main.user.js)*
