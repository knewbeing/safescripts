---
title: "GitHub 中文化插件"
---

# GitHub 中文化插件

`界面汉化`  `GitHub增强`  `翻译`  `开发者工具`  `多站点支持`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/main.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.9.4-2026-05-17**　　发现时间：**2026-05-18**　　来源：[maboloshi/github-chinese](https://github.com/maboloshi/github-chinese) <Badge type="tip" text="GitHub" />

## 功能介绍

本脚本将 GitHub 及其相关网站的部分界面菜单和内容翻译为中文，提升中文用户的使用体验。支持多站点，部分内容可自动调用翻译引擎。适合希望使用中文浏览 GitHub 的用户。

## 适用网站

- GitHub
- GitHub Skills
- Gist
- GitHub Education
- GitHub Status

## 使用方法

1. 1. 安装脚本后，访问 GitHub 及相关网站页面。
2. 2. 页面部分菜单和内容会自动显示为中文。
3. 3. 如需调整设置，可通过油猴脚本菜单进行操作。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_addStyle` | 用于添加自定义样式，让界面更美观或适配中文。 |
| `GM_xmlhttpRequest` | 用于发送网络请求，如调用翻译接口获取中文内容。 |
| `GM_getValue` | 用于本地存储脚本设置或用户偏好。 |
| `GM_setValue` | 用于保存脚本设置或翻译缓存。 |
| `GM_registerMenuCommand` | 在脚本菜单中添加自定义命令，方便用户操作。 |
| `GM_unregisterMenuCommand` | 用于移除已注册的菜单命令。 |
| `GM_notification` | 用于在浏览器中弹出通知，提醒用户相关信息。 |

## 安全分析

::: info 等待分析
安全分析将在下次流水线运行时自动更新。
:::

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/maboloshi/github-chinese/24da77b46469a5955ee4bb4416c5f41e723ce64b/main.user.js)*
