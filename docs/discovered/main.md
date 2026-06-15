---
title: "GitHub 中文化插件"
---

# GitHub 中文化插件

`界面翻译`  `GitHub优化`  `中文增强`  `开发者工具`  `自动翻译`  `用户体验`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/main.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.9.4-2026-06-10**　　发现时间：**2026-06-15**　　来源：[maboloshi/github-chinese](https://github.com/maboloshi/github-chinese) <Badge type="tip" text="GitHub" />

## 功能介绍

本脚本将 GitHub 及相关页面的部分菜单和内容翻译为中文，提升中文用户的使用体验。支持多种 GitHub 子站点，自动翻译界面文本。

## 适用网站

- GitHub
- GitHub Skills
- GitHub Gist
- GitHub Education
- GitHub Status

## 使用方法

1. 安装脚本后，访问 GitHub 及相关页面。
2. 页面部分英文菜单和内容会自动显示为中文。
3. 如需调整翻译设置，可通过浏览器脚本菜单操作。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_addStyle` | 用于添加自定义样式，让翻译内容更美观。 |
| `GM_xmlhttpRequest` | 用于请求翻译服务，将英文内容翻译成中文。 |
| `GM_getValue` | 用于保存用户设置，如翻译偏好。 |
| `GM_setValue` | 用于存储用户设置，如语言选择。 |
| `GM_registerMenuCommand` | 用于在脚本菜单中添加功能按钮，方便用户操作。 |
| `GM_unregisterMenuCommand` | 用于移除菜单按钮，管理脚本功能入口。 |
| `GM_notification` | 用于弹出通知，提醒用户翻译结果或操作提示。 |

## 安全分析

::: info 等待分析
安全分析将在下次流水线运行时自动更新。
:::

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/maboloshi/github-chinese/fb43dee96e7ed2042baf37abbcdc847f99d97939/main.user.js)*
