---
title: "GitHub 中文化插件"
---

# GitHub 中文化插件

`界面汉化`  `GitHub增强`  `自动翻译`  `开发者工具`  `多站点支持`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/main.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.9.3-2026-04-30**　　发现时间：**2026-05-11**　　来源：[maboloshi/github-chinese](https://github.com/maboloshi/github-chinese) <Badge type="tip" text="GitHub" />

## 功能介绍

本脚本可以将 GitHub 网站的部分菜单和内容翻译为中文，提升中文用户的使用体验。支持多个 GitHub 相关子站点。部分内容会自动调用翻译引擎进行翻译。

## 适用网站

- GitHub
- GitHub Skills
- Gist
- GitHub Education
- GitHub Status

## 使用方法

1. 安装脚本后，访问 GitHub 及其相关子站点页面。
2. 页面部分菜单和内容会自动显示为中文。
3. 如需调整翻译设置，可通过油猴脚本菜单进行操作。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_xmlhttpRequest` | 用于发送网络请求到翻译接口，实现自动翻译功能。 |
| `GM_getValue` | 用于读取用户的个性化设置，比如是否启用某些功能。 |
| `GM_setValue` | 用于保存用户的个性化设置。 |
| `GM_registerMenuCommand` | 在脚本菜单中添加自定义命令，方便用户操作。 |
| `GM_unregisterMenuCommand` | 用于移除脚本菜单中的自定义命令。 |
| `GM_notification` | 用于在浏览器内弹出通知，提示用户相关信息。 |

## 安全分析

::: info 等待分析
安全分析将在下次流水线运行时自动更新。
:::

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/maboloshi/github-chinese/4319f5e18afd9d23bae2a599a85c082112d57dab/main.user.js)*
