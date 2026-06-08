---
title: "GitHub 中文化插件"
---

# GitHub 中文化插件

`界面翻译`  `GitHub增强`  `中文化`  `开发者工具`  `实用脚本`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/main.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.9.4-2026-05-21**　　发现时间：**2026-06-08**　　来源：[maboloshi/github-chinese](https://github.com/maboloshi/github-chinese) <Badge type="tip" text="GitHub" />

## 功能介绍

本脚本将 GitHub 网站的部分菜单和内容翻译为中文，提升中文用户的使用体验。支持多个 GitHub 相关子站点，自动翻译界面文本。

## 适用网站

- GitHub
- GitHub Skills
- GitHub Gist
- GitHub Education
- GitHub Status

## 使用方法

1. 安装 Tampermonkey 插件。
2. 在 Tampermonkey 中添加此脚本。
3. 访问 GitHub 及相关子站点，界面会自动显示中文。
4. 如需调整设置，可通过浏览器脚本菜单操作。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_addStyle` | 用于添加自定义样式，优化界面显示效果。 |
| `GM_xmlhttpRequest` | 用于发送网络请求，获取翻译内容。 |
| `GM_getValue` | 用于保存用户设置，如翻译偏好。 |
| `GM_setValue` | 用于存储用户设置，保持个性化配置。 |
| `GM_registerMenuCommand` | 用于在脚本菜单中添加自定义命令，方便用户操作。 |
| `GM_unregisterMenuCommand` | 用于移除脚本菜单中的命令，管理菜单项。 |
| `GM_notification` | 用于弹出通知，提醒用户脚本相关信息。 |

## 安全分析

::: info 等待分析
安全分析将在下次流水线运行时自动更新。
:::

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/maboloshi/github-chinese/d2c2ca40f0ae7aae9230e964cb22f827b974124d/main.user.js)*
