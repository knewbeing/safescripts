---
title: "GitHub 中文化插件"
---

# GitHub 中文化插件

`界面翻译`  `GitHub优化`  `中文增强`  `开发者工具`  `网页辅助`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/main_greasyfork.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.9.2-2026-05-21**　　发现时间：**2026-06-15**　　来源：[maboloshi/github-chinese](https://github.com/maboloshi/github-chinese) <Badge type="tip" text="GitHub" />

## 功能介绍

本脚本将 GitHub 网站的部分菜单和内容翻译为中文，提升中文用户的使用体验。它自动识别页面变化并实时更新翻译内容。

## 适用网站

- GitHub主站
- GitHub Skills
- GitHub Gist
- GitHub状态页面

## 使用方法

1. 安装 Tampermonkey 扩展。
2. 在 Tampermonkey 中添加此脚本。
3. 访问 GitHub 相关页面，界面会自动显示中文。
4. 如需调整设置，可通过浏览器菜单操作。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_xmlhttpRequest` | 用于发送网络请求，获取外部数据或资源。 |
| `GM_getValue` | 用于读取用户设置或脚本存储的数据。 |
| `GM_setValue` | 用于保存用户设置或脚本存储的数据。 |
| `GM_registerMenuCommand` | 用于在浏览器菜单中添加自定义命令，方便用户操作脚本。 |
| `GM_unregisterMenuCommand` | 用于移除自定义菜单命令。 |
| `GM_notification` | 用于在浏览器显示通知，提醒用户相关信息。 |

## 安全分析

::: info 等待分析
安全分析将在下次流水线运行时自动更新。
:::

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/maboloshi/github-chinese/fb43dee96e7ed2042baf37abbcdc847f99d97939/main(greasyfork).user.js)*
