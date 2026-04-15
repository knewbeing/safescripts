---
title: GitHub 中文化插件
---

# GitHub 中文化插件

`GitHub`  `中文化`  `界面翻译`  `用户脚本`  `开发者工具`  `翻译辅助`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/main.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.9.3-2026-04-12**　　发现时间：**2026-04-15**　　来源：[maboloshi/github-chinese](https://github.com/maboloshi/github-chinese)

## 功能介绍

本脚本将 GitHub 及其相关子站点的部分菜单和内容翻译成中文，提升中文用户的使用体验。支持自动翻译简介和界面文本，部分内容实时更新。用户可通过菜单命令进行配置和通知管理。

## 适用网站

- GitHub
- GitHub Skills
- GitHub Gist
- GitHub Education
- GitHub Status

## 使用方法

1. 安装 Tampermonkey 或其他支持的用户脚本管理器。
2. 导入并启用本脚本。
3. 访问 GitHub 或其相关子站点，界面自动显示中文。
4. 通过脚本菜单命令调整翻译设置或查看通知。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_xmlhttpRequest` | 用于发送跨域请求获取翻译内容。 |
| `GM_getValue` | 用于读取脚本的本地配置和状态。 |
| `GM_setValue` | 用于保存脚本的本地配置和状态。 |
| `GM_registerMenuCommand` | 用于注册右键菜单命令，方便用户操作。 |
| `GM_unregisterMenuCommand` | 用于注销右键菜单命令。 |
| `GM_notification` | 用于显示桌面通知提醒用户。 |

## 安全分析

::: info 等待分析
安全分析将在下次流水线运行时自动更新。
:::

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/maboloshi/github-chinese/2635cb959e88c263108a99e022b3ddd5e9818838/main.user.js)*
