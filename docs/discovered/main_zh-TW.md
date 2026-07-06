---
title: "GitHub 中文化插件（繁體版）"
---

# GitHub 中文化插件（繁體版）

`界面翻译`  `GitHub优化`  `繁体中文`  `开发者工具`  `多站点支持`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/main_zh-TW.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.9.4.4-2026-06-21**　　发现时间：**2026-07-06**　　来源：[maboloshi/github-chinese](https://github.com/maboloshi/github-chinese) <Badge type="tip" text="GitHub" />

## 功能介绍

本脚本将 GitHub 网站界面部分菜单和内容翻译为繁体中文，提升中文用户的使用体验。支持多个 GitHub 相关子站点，自动翻译主要页面元素。

## 适用网站

- GitHub
- GitHub Skills
- GitHub Gist
- GitHub Education
- GitHub Status

## 使用方法

1. 安装脚本后，访问 GitHub 及其相关网站。
2. 页面菜单和部分内容会自动显示为繁体中文。
3. 如需切换语言或调整设置，可通过脚本菜单操作。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_addStyle` | 用于添加自定义样式，让翻译内容更美观。 |
| `GM_xmlhttpRequest` | 允许脚本发送网络请求，获取翻译数据。 |
| `GM_getValue` | 用于保存用户设置，如语言偏好。 |
| `GM_setValue` | 用于存储用户设置，如语言选择。 |
| `GM_registerMenuCommand` | 在脚本菜单中添加自定义操作，方便用户切换功能。 |
| `GM_unregisterMenuCommand` | 移除脚本菜单中的自定义操作。 |
| `GM_notification` | 弹出通知提醒用户操作结果或更新信息。 |

## 安全分析

::: info 等待分析
安全分析将在下次流水线运行时自动更新。
:::

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/maboloshi/github-chinese/23e7d5030c7a668e26f11a5b927a44b06adc6f6c/main_zh-TW.user.js)*
