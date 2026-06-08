---
title: "GitHub 中文化插件"
---

# GitHub 中文化插件

`界面翻译`  `GitHub增强`  `中文化`  `开发者工具`  `实时翻译`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/main_greasyfork.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.9.2-2026-05-21**　　发现时间：**2026-06-08**　　来源：[maboloshi/github-chinese](https://github.com/maboloshi/github-chinese) <Badge type="tip" text="GitHub" />

## 功能介绍

本脚本可以将 GitHub 网站的部分菜单和内容翻译为中文，提升中文用户的使用体验。它会自动检测页面变化并实时翻译相关界面元素。

## 适用网站

- GitHub
- GitHub Skills
- Gist
- GitHub Status

## 使用方法

1. 安装 Tampermonkey 插件。
2. 在 Tampermonkey 中添加本脚本。
3. 打开 GitHub 及相关页面，界面会自动显示中文。
4. 如需调整设置，可通过浏览器菜单访问脚本选项。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_xmlhttpRequest` | 允许脚本发起跨域网络请求，用于获取外部数据。 |
| `GM_getValue` | 用于读取脚本的本地存储设置，例如翻译选项。 |
| `GM_setValue` | 用于保存脚本的本地存储设置，如用户偏好。 |
| `GM_registerMenuCommand` | 在浏览器菜单中添加自定义命令，方便用户操作脚本。 |
| `GM_unregisterMenuCommand` | 移除自定义菜单命令，保持菜单整洁。 |
| `GM_notification` | 在浏览器中弹出通知，提醒用户相关信息。 |

## 安全分析

::: info 等待分析
安全分析将在下次流水线运行时自动更新。
:::

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/maboloshi/github-chinese/d2c2ca40f0ae7aae9230e964cb22f827b974124d/main(greasyfork).user.js)*
