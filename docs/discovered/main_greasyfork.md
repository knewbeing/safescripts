---
title: "GitHub 中文化插件"
---

# GitHub 中文化插件

`界面翻译`  `GitHub优化`  `中文化`  `开发者工具`  `网页增强`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/main_greasyfork.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.9.2.4-2026-06-21**　　发现时间：**2026-07-06**　　来源：[maboloshi/github-chinese](https://github.com/maboloshi/github-chinese) <Badge type="tip" text="GitHub" />

## 功能介绍

本脚本将 GitHub 网站的部分菜单和内容翻译为中文，提升中文用户的使用体验。安装后，界面会自动显示中文，无需手动切换。支持多种 GitHub 相关页面。

## 适用网站

- GitHub
- GitHub Skills
- Gist
- GitHub Status

## 使用方法

1. 1. 安装 Tampermonkey 扩展。
2. 2. 在 Tampermonkey 中添加本脚本。
3. 3. 打开 GitHub 及相关页面，界面会自动显示中文。
4. 4. 可通过脚本菜单调整部分设置。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_xmlhttpRequest` | 用于发送网络请求，获取翻译词库或相关数据。 |
| `GM_getValue` | 用于读取用户设置，如是否启用正则翻译等。 |
| `GM_setValue` | 用于保存用户设置，记住翻译偏好。 |
| `GM_registerMenuCommand` | 用于在脚本菜单中添加自定义功能按钮，方便用户操作。 |
| `GM_unregisterMenuCommand` | 用于移除脚本菜单中的自定义按钮。 |
| `GM_notification` | 用于弹出通知提醒用户脚本相关信息。 |

## 安全分析

::: info 等待分析
安全分析将在下次流水线运行时自动更新。
:::

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/maboloshi/github-chinese/23e7d5030c7a668e26f11a5b927a44b06adc6f6c/main(greasyfork).user.js)*
