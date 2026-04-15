---
title: GitHub 中文化插件
---

# GitHub 中文化插件

`界面中文化`  `GitHub`  `翻译`  `用户脚本`  `开发者工具`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/main.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.9.3-2026-04-12**　　发现时间：**2026-04-15**　　来源：[maboloshi/github-chinese](https://github.com/maboloshi/github-chinese)

## 功能介绍

本脚本将 GitHub 及其相关子站点的部分菜单和内容翻译成中文，提升中文用户的使用体验。它支持自动翻译页面简介和菜单项，并允许用户自定义翻译功能开关。脚本运行时会自动加载并替换界面文本，无需手动操作。

## 适用网站

- GitHub
- GitHub Skills
- GitHub Gist
- GitHub Education
- GitHub Status

## 使用方法

1. 安装脚本后，访问 GitHub 或其相关子站点。
2. 页面加载时，脚本自动将部分界面内容翻译成中文。
3. 可通过脚本菜单调整翻译功能开关和设置。
4. 无需额外操作，享受中文化的 GitHub 界面体验。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_xmlhttpRequest` | 用于发送跨域网络请求，获取翻译服务的数据 |
| `GM_getValue` | 用于读取脚本保存的用户设置 |
| `GM_setValue` | 用于保存用户的配置和偏好 |
| `GM_registerMenuCommand` | 用于在脚本菜单中注册自定义命令，方便用户操作 |
| `GM_unregisterMenuCommand` | 用于注销已注册的菜单命令 |
| `GM_notification` | 用于向用户显示通知消息 |

## 安全分析

::: info 等待分析
安全分析将在下次流水线运行时自动更新。
:::

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/maboloshi/github-chinese/2635cb959e88c263108a99e022b3ddd5e9818838/main.user.js)*
