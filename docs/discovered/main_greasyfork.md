---
title: "GitHub 中文化插件"
---

# GitHub 中文化插件

`界面汉化`  `GitHub增强`  `翻译`  `开发者工具`  `辅助浏览`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/main_greasyfork.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.9.2-2026-04-12**　　发现时间：**2026-04-20**　　来源：[maboloshi/github-chinese](https://github.com/maboloshi/github-chinese) <Badge type="tip" text="GitHub" />

## 功能介绍

本脚本将 GitHub 网站的部分菜单和内容翻译为中文，帮助中文用户更方便地使用和浏览。安装后，常见界面元素会自动显示为中文，无需手动切换。适用于 GitHub 及其相关页面。

## 适用网站

- GitHub官网
- GitHub Skills
- Gist代码片段
- GitHub服务状态

## 使用方法

1. 1. 安装脚本后，访问 GitHub 及相关页面。
2. 2. 页面菜单和部分内容会自动显示为中文。
3. 3. 如需调整设置，可点击油猴脚本菜单进行操作。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_xmlhttpRequest` | 用于发起跨域网络请求，获取或同步翻译词库等数据。 |
| `GM_getValue` | 用于读取用户的设置，如是否启用某些翻译功能。 |
| `GM_setValue` | 用于保存用户的设置，记住自定义选项。 |
| `GM_registerMenuCommand` | 在脚本菜单中添加自定义功能按钮，方便用户操作。 |
| `GM_unregisterMenuCommand` | 移除已添加的菜单按钮，保持菜单整洁。 |
| `GM_notification` | 在页面右下角弹出通知，提醒用户脚本状态或更新信息。 |

## 安全分析

::: info 等待分析
安全分析将在下次流水线运行时自动更新。
:::

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/maboloshi/github-chinese/65c9b8f5780d7717a15eb3d8238bdd85cd293c92/main(greasyfork).user.js)*
