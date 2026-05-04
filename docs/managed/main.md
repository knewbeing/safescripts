---
title: "GitHub 中文化插件"
---

# GitHub 中文化插件

`界面翻译`  `GitHub增强`  `中文化`  `开发者工具`  `自动翻译`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/managed/main.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.9.3-2026-04-30**　　最后更新：**2026-05-04**

## 功能介绍

本脚本可以将 GitHub 网站的部分菜单和内容翻译为中文，提升中文用户的使用体验。支持多个 GitHub 相关子站点，自动翻译界面元素和简介。

## 适用网站

- GitHub
- GitHub Skills
- GitHub Gist
- GitHub Education
- GitHub Status

## 使用方法

1. 安装脚本后，访问 GitHub 及其相关网站。
2. 界面部分菜单和内容会自动显示为中文。
3. 如需调整翻译设置，可通过浏览器的用户脚本菜单操作。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_xmlhttpRequest` | 用于发送网络请求，获取翻译内容。 |
| `GM_getValue` | 用于保存用户的脚本设置，如是否启用正则翻译。 |
| `GM_setValue` | 用于修改和存储脚本设置。 |
| `GM_registerMenuCommand` | 用于在浏览器菜单中添加自定义操作按钮。 |
| `GM_unregisterMenuCommand` | 用于移除自定义菜单按钮。 |
| `GM_notification` | 用于弹出通知提示用户操作结果。 |

## 安全分析

::: info 等待分析
安全分析将在下次流水线运行时自动更新。
:::

---

*文档由 SafeScripts 自动生成 · [查看原始脚本](https://raw.githubusercontent.com/maboloshi/github-chinese/gh-pages/main.user.js)*
