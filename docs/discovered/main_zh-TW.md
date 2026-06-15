---
title: "GitHub 中文化插件（繁體版）"
---

# GitHub 中文化插件（繁體版）

`界面翻译`  `GitHub增强`  `繁体中文`  `开发者工具`  `网页优化`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/main_zh-TW.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.9.4-2026-06-10**　　发现时间：**2026-06-15**　　来源：[maboloshi/github-chinese](https://github.com/maboloshi/github-chinese) <Badge type="tip" text="GitHub" />

## 功能介绍

本脚本将 GitHub 网站界面部分菜单和内容翻译为繁体中文，提升中文用户的使用体验。支持多种 GitHub 相关子站点，自动翻译页面元素。

## 适用网站

- GitHub
- GitHub Skills
- GitHub Gist
- GitHub Education
- GitHub Status

## 使用方法

1. 安装 Tampermonkey 插件。
2. 在 Tampermonkey 中添加此脚本。
3. 访问 GitHub 及相关子站点，界面会自动显示繁体中文。
4. 如需调整设置，可通过浏览器脚本菜单操作。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_addStyle` | 用于添加自定义样式，美化或调整页面显示效果。 |
| `GM_xmlhttpRequest` | 用于发送网络请求，支持调用外部翻译服务。 |
| `GM_getValue` | 用于读取本地存储的数据，如用户设置。 |
| `GM_setValue` | 用于保存本地数据，如翻译偏好或配置。 |
| `GM_registerMenuCommand` | 用于在脚本菜单中添加自定义命令，方便用户操作。 |
| `GM_unregisterMenuCommand` | 用于移除脚本菜单中的命令。 |
| `GM_notification` | 用于弹出通知，提醒用户脚本相关信息。 |

## 安全分析

::: info 等待分析
安全分析将在下次流水线运行时自动更新。
:::

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/maboloshi/github-chinese/fb43dee96e7ed2042baf37abbcdc847f99d97939/main_zh-TW.user.js)*
