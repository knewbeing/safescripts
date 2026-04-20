---
title: "GitHub 中文化插件"
---

# GitHub 中文化插件

`界面汉化`  `GitHub增强`  `翻译`  `辅助工具`  `开发者工具`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/main.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.9.3-2026-04-12**　　发现时间：**2026-04-20**　　来源：[maboloshi/github-chinese](https://github.com/maboloshi/github-chinese) <Badge type="tip" text="GitHub" />

## 功能介绍

本脚本将 GitHub 网站的部分菜单和内容翻译为中文，帮助用户更方便地浏览和使用。支持多个 GitHub 相关子站点。部分描述内容可自动调用翻译引擎进行翻译。

## 适用网站

- GitHub官网
- GitHub Skills
- Gist代码片段
- GitHub教育
- GitHub服务状态

## 使用方法

1. 1. 安装脚本后，访问 GitHub 及其相关子站点。
2. 2. 页面菜单和部分内容会自动显示为中文。
3. 3. 如需调整设置，可通过油猴脚本菜单进行操作。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_xmlhttpRequest` | 允许脚本发起跨域网络请求（如调用翻译接口）。 |
| `GM_getValue` | 用于保存用户的脚本设置和偏好。 |
| `GM_setValue` | 用于存储用户的脚本设置和偏好。 |
| `GM_registerMenuCommand` | 在脚本菜单中添加自定义命令，方便用户操作。 |
| `GM_unregisterMenuCommand` | 移除已注册的菜单命令，保持菜单整洁。 |
| `GM_notification` | 在浏览器中弹出通知，提醒用户相关信息。 |

## 安全分析

::: info 等待分析
安全分析将在下次流水线运行时自动更新。
:::

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/maboloshi/github-chinese/65c9b8f5780d7717a15eb3d8238bdd85cd293c92/main.user.js)*
