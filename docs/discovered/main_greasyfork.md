---
title: "GitHub 中文化插件"
---

# GitHub 中文化插件

`界面翻译`  `GitHub优化`  `中文化`  `开发者工具`  `自动翻译`  `实用增强`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/main_greasyfork.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.9.2-2026-04-12**　　发现时间：**2026-04-27**　　来源：[maboloshi/github-chinese](https://github.com/maboloshi/github-chinese) <Badge type="tip" text="GitHub" />

## 功能介绍

本脚本可以将 GitHub 网站的部分菜单和内容翻译为中文，提升中文用户的使用体验。它会自动检测页面变化并实时翻译相关内容。支持自定义词库和部分界面元素的翻译。

## 适用网站

- GitHub
- GitHub Skills
- GitHub Gist
- GitHub Status

## 使用方法

1. 安装脚本后，访问 GitHub 相关网站页面。
2. 页面菜单和部分内容会自动显示为中文。
3. 如需自定义翻译或调整设置，可通过浏览器的用户脚本菜单操作。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_xmlhttpRequest` | 允许脚本发送网络请求，获取外部数据或词库。 |
| `GM_getValue` | 用于读取用户设置，如是否启用正则翻译等。 |
| `GM_setValue` | 用于保存用户设置，方便个性化配置。 |
| `GM_registerMenuCommand` | 在浏览器菜单中添加自定义操作按钮，便于用户手动操作脚本功能。 |
| `GM_unregisterMenuCommand` | 移除自定义菜单命令，保持菜单整洁。 |
| `GM_notification` | 弹出通知提醒用户脚本操作结果或更新信息。 |

## 安全分析

::: info 等待分析
安全分析将在下次流水线运行时自动更新。
:::

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/maboloshi/github-chinese/8a8ad263685049662a0be449fefeeaa0ded8c083/main(greasyfork).user.js)*
