---
title: "GitHub 中文化插件（繁體版）"
---

# GitHub 中文化插件（繁體版）

`界面汉化`  `GitHub增强`  `繁体中文`  `翻译`  `开发者工具`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/main_zh-TW.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.9.3-2026-04-12**　　发现时间：**2026-04-20**　　来源：[maboloshi/github-chinese](https://github.com/maboloshi/github-chinese) <Badge type="tip" text="GitHub" />

## 功能介绍

本脚本将GitHub网站界面中的部分菜单和内容翻译为繁体中文。安装后，用户浏览GitHub相关页面时会自动看到繁体中文界面。适合希望用繁体中文浏览GitHub的用户。

## 适用网站

- GitHub官网
- GitHub Skills
- Gist代码片段
- GitHub教育
- GitHub服务状态

## 使用方法

1. 1. 安装脚本后，打开或刷新GitHub相关页面。
2. 2. 页面菜单和部分内容会自动显示为繁体中文。
3. 3. 如需调整设置，可通过油猴脚本菜单进行操作。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_xmlhttpRequest` | 用于跨域发送网络请求，可能用于获取翻译内容。 |
| `GM_getValue` | 用于读取用户的设置，如是否启用某些翻译规则。 |
| `GM_setValue` | 用于保存用户的设置，记住用户偏好。 |
| `GM_registerMenuCommand` | 在脚本菜单中添加自定义命令，方便用户操作。 |
| `GM_unregisterMenuCommand` | 移除已添加的菜单命令，保持菜单整洁。 |
| `GM_notification` | 在浏览器中弹出通知，提醒用户重要信息。 |

## 安全分析

::: info 等待分析
安全分析将在下次流水线运行时自动更新。
:::

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/maboloshi/github-chinese/65c9b8f5780d7717a15eb3d8238bdd85cd293c92/main_zh-TW.user.js)*
