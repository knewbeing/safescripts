---
title: GitHub 中文化插件
---

# GitHub 中文化插件

`界面中文化`  `GitHub`  `翻译`  `用户脚本`  `开发者工具`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/main.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.9.3-2026-04-12**　　发现时间：**2026-04-15**　　来源：[maboloshi/github-chinese](https://github.com/maboloshi/github-chinese)

## 功能介绍

本脚本将 GitHub 及其相关子站点的部分菜单和内容翻译成中文，提升中文用户的使用体验。支持自动翻译简介和界面元素，部分内容实时更新。用户可通过菜单命令管理翻译功能。

## 适用网站

- GitHub
- GitHub Skills
- GitHub Gist
- GitHub Education
- GitHub Status

## 使用方法

1. 安装 Tampermonkey 或其他支持 UserScript 的扩展。
2. 导入并启用本脚本。
3. 访问 GitHub 或相关子站点，界面自动显示中文。
4. 通过浏览器扩展菜单管理翻译设置和功能。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_xmlhttpRequest` | 允许脚本发送跨域网络请求，用于调用翻译接口。 |
| `GM_getValue` | 允许脚本读取本地存储的设置和数据。 |
| `GM_setValue` | 允许脚本保存设置和数据到本地存储。 |
| `GM_registerMenuCommand` | 允许脚本注册自定义菜单命令，方便用户操作。 |
| `GM_unregisterMenuCommand` | 允许脚本注销已注册的菜单命令。 |
| `GM_notification` | 允许脚本显示桌面通知，提示翻译状态等信息。 |

## 安全分析

::: info 等待分析
安全分析将在下次流水线运行时自动更新。
:::

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/maboloshi/github-chinese/2635cb959e88c263108a99e022b3ddd5e9818838/main.user.js)*
