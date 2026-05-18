---
title: "GitHub 中文化插件"
---

# GitHub 中文化插件

`界面汉化`  `GitHub`  `辅助工具`  `翻译`  `开发者工具`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/main_greasyfork.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.9.2-2026-04-30**　　发现时间：**2026-05-18**　　来源：[maboloshi/github-chinese](https://github.com/maboloshi/github-chinese) <Badge type="tip" text="GitHub" />

## 功能介绍

本脚本可将 GitHub 网站的部分菜单和内容翻译为中文，提升中文用户的使用体验。安装后，常见界面元素会自动显示为中文，无需手动切换。适用于主站、Gist、Skills 和状态页面。

## 适用网站

- GitHub
- GitHub Skills
- Gist
- GitHub Status

## 使用方法

1. 1. 安装脚本后，访问 GitHub 及其相关页面。
2. 2. 页面菜单和部分内容会自动显示为中文。
3. 3. 如需调整设置，可通过油猴脚本菜单进行操作。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_xmlhttpRequest` | 用于发起跨域网络请求，获取或同步翻译数据等。 |
| `GM_getValue` | 用于读取本地存储的脚本设置，如是否启用正则翻译等。 |
| `GM_setValue` | 用于保存脚本的设置和用户偏好。 |
| `GM_registerMenuCommand` | 用于在脚本菜单中添加自定义操作按钮，方便用户管理脚本功能。 |
| `GM_unregisterMenuCommand` | 用于移除脚本菜单中的自定义操作按钮。 |
| `GM_notification` | 用于在页面右下角弹出通知，提示用户脚本相关信息。 |

## 安全分析

::: info 等待分析
安全分析将在下次流水线运行时自动更新。
:::

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/maboloshi/github-chinese/24da77b46469a5955ee4bb4416c5f41e723ce64b/main(greasyfork).user.js)*
