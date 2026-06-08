---
title: "GitHub 中文化插件（繁體版）"
---

# GitHub 中文化插件（繁體版）

`界面翻译`  `GitHub增强`  `繁体中文`  `开发者工具`  `多站点支持`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/main_zh-TW.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.9.4-2026-05-21**　　发现时间：**2026-06-08**　　来源：[maboloshi/github-chinese](https://github.com/maboloshi/github-chinese) <Badge type="tip" text="GitHub" />

## 功能介绍

本脚本将 GitHub 网站界面部分菜单和内容翻译为繁体中文，提升中文用户的使用体验。支持多个 GitHub 相关站点，自动替换页面文本。

## 适用网站

- GitHub
- GitHub Skills
- Gist
- GitHub Education
- GitHub Status

## 使用方法

1. 安装脚本后，访问 GitHub 或相关站点。
2. 页面菜单和部分内容会自动显示为繁体中文。
3. 如需切换设置，可在浏览器脚本菜单中操作。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_addStyle` | 用于添加自定义样式，让翻译内容更美观。 |
| `GM_xmlhttpRequest` | 用于发送网络请求，支持调用外部翻译服务。 |
| `GM_getValue` | 用于保存用户设置，如语言偏好等。 |
| `GM_setValue` | 用于存储用户设置，如语言偏好等。 |
| `GM_registerMenuCommand` | 用于在脚本菜单中添加自定义命令，方便用户操作。 |
| `GM_unregisterMenuCommand` | 用于移除脚本菜单中的自定义命令。 |
| `GM_notification` | 用于在页面弹出通知，提醒用户相关信息。 |

## 安全分析

::: info 等待分析
安全分析将在下次流水线运行时自动更新。
:::

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/maboloshi/github-chinese/d2c2ca40f0ae7aae9230e964cb22f827b974124d/main_zh-TW.user.js)*
